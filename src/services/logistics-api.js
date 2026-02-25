import { supabase } from '@/integrations/supabase/client';
// Data service class for API interactions
export class LogisticsDataService {
    static instance;
    baseUrl = '/functions/v1/logistics_management_api_2026_02_19_13_00';
    static getInstance() {
        if (!LogisticsDataService.instance) {
            LogisticsDataService.instance = new LogisticsDataService();
        }
        return LogisticsDataService.instance;
    }
    async makeRequest(action, method = 'GET', body, params) {
        const url = new URL(this.baseUrl, window.location.origin);
        url.searchParams.set('action', action);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
        }
        const { data: { session } } = await supabase.auth.getSession();
        const response = await fetch(url.toString(), {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.access_token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    // Shipment operations
    async createShipment(shipmentData) {
        return await this.makeRequest('create_shipment', 'POST', shipmentData);
    }
    async updateShipmentStatus(shipmentId, status, locationOrAdditionalData, updatedBy, notes) {
        // Handle both old and new signatures
        if (typeof locationOrAdditionalData === 'string') {
            // Old signature: (shipmentId, status, location, updatedBy, notes)
            return await this.makeRequest('update_shipment_status', 'POST', {
                shipment_id: shipmentId,
                status,
                location: locationOrAdditionalData,
                updated_by: updatedBy,
                notes
            });
        }
        else {
            // New signature: (shipmentId, status, additionalData)
            console.log('Updating shipment status:', shipmentId, status, locationOrAdditionalData);
            return { success: true };
        }
    }
    async getShipments(filters) {
        return await this.makeRequest('get_shipments', 'GET', undefined, filters);
    }
    async getShipmentTracking(shipmentId, awbNumber) {
        const params = {};
        if (shipmentId)
            params.shipment_id = shipmentId;
        if (awbNumber)
            params.awb_number = awbNumber;
        return await this.makeRequest('get_shipment_tracking', 'GET', undefined, params);
    }
    // Rate calculation
    async calculateShippingRate(fromState, toState, weight, serviceType = 'STANDARD') {
        return await this.makeRequest('calculate_shipping_rate', 'POST', {
            from_state: fromState,
            to_state: toState,
            weight,
            service_type: serviceType
        });
    }
    // Dashboard metrics
    async getDashboardMetrics(userId, branchId, dateFrom, dateTo) {
        const params = {};
        if (userId)
            params.user_id = userId;
        if (branchId)
            params.branch_id = branchId;
        if (dateFrom)
            params.date_from = dateFrom;
        if (dateTo)
            params.date_to = dateTo;
        return await this.makeRequest('get_dashboard_metrics', 'GET', undefined, params);
    }
    // COD collection
    async recordCODCollection(shipmentId, collectedBy, amount, paymentMethod) {
        return await this.makeRequest('record_cod_collection', 'POST', {
            shipment_id: shipmentId,
            collected_by: collectedBy,
            amount,
            payment_method: paymentMethod
        });
    }
    // Location data
    async getLocations() {
        return await this.makeRequest('get_locations');
    }
    // Branch data
    async getBranches() {
        return await this.makeRequest('get_branches');
    }
    // Customer operations
    async createCustomer(customerData) {
        return await this.makeRequest('create_customer', 'POST', customerData);
    }
    // Merchant operations
    async createMerchant(merchantData) {
        return await this.makeRequest('create_merchant', 'POST', merchantData);
    }
    // Vehicle operations
    async getVehicles(branchId, status) {
        const params = {};
        if (branchId)
            params.branch_id = branchId;
        if (status)
            params.status = status;
        return await this.makeRequest('get_vehicles', 'GET', undefined, params);
    }
    async updateVehicleTracking(trackingData) {
        return await this.makeRequest('update_vehicle_tracking', 'POST', trackingData);
    }
    // Notification operations
    async getNotifications(userId, unreadOnly = false, limit = 50) {
        return await this.makeRequest('get_notifications', 'GET', undefined, {
            user_id: userId,
            unread_only: unreadOnly.toString(),
            limit: limit.toString()
        });
    }
    async markNotificationRead(notificationId) {
        return await this.makeRequest('mark_notification_read', 'POST', {
            notification_id: notificationId
        });
    }
    // Direct Supabase operations for complex queries
    async getProfiles(filters) {
        let query = supabase
            .from('profiles_2026_02_19_13_00')
            .select(`
        *,
        branch:branch_id(name, code)
      `)
            .order('createdAt', { ascending: false });
        if (filters?.role)
            query = query.eq('role', filters.role);
        if (filters?.branch_id)
            query = query.eq('branch_id', filters.branch_id);
        if (filters?.status)
            query = query.eq('status', filters.status);
        return await query;
    }
    async getTransactions(filters) {
        let query = supabase
            .from('transactions_2026_02_19_13_00')
            .select(`
        *,
        merchant:merchant_id(business_name, contact_person),
        customer:customer_id(full_name, phone),
        collected_by:collected_by(full_name),
        branch:branch_id(name, code)
      `)
            .order('createdAt', { ascending: false });
        if (filters?.transaction_type)
            query = query.eq('transaction_type', filters.transaction_type);
        if (filters?.status)
            query = query.eq('status', filters.status);
        if (filters?.merchant_id)
            query = query.eq('merchant_id', filters.merchant_id);
        if (filters?.customer_id)
            query = query.eq('customer_id', filters.customer_id);
        if (filters?.date_from)
            query = query.gte('createdAt', filters.date_from);
        if (filters?.date_to)
            query = query.lte('createdAt', filters.date_to);
        return await query;
    }
    async getInventory(branchId) {
        let query = supabase
            .from('inventory_2026_02_19_13_00')
            .select(`
        *,
        branch:branch_id(name, code)
      `)
            .order('item_name', { ascending: true });
        if (branchId)
            query = query.eq('branch_id', branchId);
        return await query;
    }
    async getAuditLogs(filters) {
        let query = supabase
            .from('audit_logs_2026_02_19_13_00')
            .select(`
        *,
        user:user_id(full_name, email),
        branch:branch_id(name, code)
      `)
            .order('timestamp', { ascending: false });
        if (filters?.user_id)
            query = query.eq('user_id', filters.user_id);
        if (filters?.action)
            query = query.eq('action', filters.action);
        if (filters?.resource_type)
            query = query.eq('resource_type', filters.resource_type);
        if (filters?.date_from)
            query = query.gte('timestamp', filters.date_from);
        if (filters?.date_to)
            query = query.lte('timestamp', filters.date_to);
        if (filters?.limit)
            query = query.limit(filters.limit);
        return await query;
    }
}
// Export singleton instance
export const logisticsAPI = LogisticsDataService.getInstance();
