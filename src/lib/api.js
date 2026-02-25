/**
 * Britium Express API Service
 * Comprehensive API integration for all BE app pages functionality
 * © 2026 Britium Express Logistics System
 */
import { supabase } from '@/integrations/supabase/client';
// Base API class
class BaseAPI {
    async callEdgeFunction(functionName, path, options = {}) {
        try {
            const { data, error } = await supabase.functions.invoke(functionName, {
                body: {
                    path,
                    method: options.method || 'GET',
                    ...options.body
                }
            });
            if (error) {
                console.error(`Edge function error (${functionName}):`, error);
                return { success: false, error: error.message };
            }
            return data;
        }
        catch (error) {
            console.error(`API call failed (${functionName}):`, error);
            return { success: false, error: error.message };
        }
    }
}
// Delivery Ways API
export class DeliveryWaysAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'delivery-ways/list');
    }
    async get(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `delivery-ways/get/${id}`);
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'delivery-ways/create', {
            method: 'POST',
            body: data
        });
    }
    async update(id, data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `delivery-ways/update/${id}`, {
            method: 'PUT',
            body: data
        });
    }
    async delete(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `delivery-ways/delete/${id}`, {
            method: 'DELETE'
        });
    }
}
// Merchants API
export class MerchantsAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'merchants/list');
    }
    async get(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `merchants/get/${id}`);
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'merchants/create', {
            method: 'POST',
            body: data
        });
    }
    async update(id, data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `merchants/update/${id}`, {
            method: 'PUT',
            body: data
        });
    }
    async delete(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `merchants/delete/${id}`, {
            method: 'DELETE'
        });
    }
}
// Deliverymen API
export class DeliverymenAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'deliverymen/list');
    }
    async get(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `deliverymen/get/${id}`);
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'deliverymen/create', {
            method: 'POST',
            body: data
        });
    }
    async update(id, data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `deliverymen/update/${id}`, {
            method: 'PUT',
            body: data
        });
    }
    async delete(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `deliverymen/delete/${id}`, {
            method: 'DELETE'
        });
    }
}
// Broadcast Messages API
export class BroadcastMessagesAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'broadcast-messages/list');
    }
    async get(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `broadcast-messages/get/${id}`);
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'broadcast-messages/create', {
            method: 'POST',
            body: data
        });
    }
    async update(id, data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `broadcast-messages/update/${id}`, {
            method: 'PUT',
            body: data
        });
    }
    async send(id, totalRecipients) {
        return this.callEdgeFunction('be_notifications_2026_02_04_05_03', 'send-broadcast', {
            method: 'POST',
            body: { messageId: id, total_receiverNames: totalRecipients }
        });
    }
    async delete(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `broadcast-messages/delete/${id}`, {
            method: 'DELETE'
        });
    }
}
// System Settings API
export class SystemSettingsAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'system-settings/list');
    }
    async get(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `system-settings/get/${id}`);
    }
    async update(id, data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `system-settings/update/${id}`, {
            method: 'PUT',
            body: data
        });
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'system-settings/create', {
            method: 'POST',
            body: data
        });
    }
}
// Failed Deliveries API
export class FailedDeliveriesAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'failed-deliveries/list');
    }
    async resolve(id, resolutionNotes) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `failed-deliveries/resolve/${id}`, {
            method: 'PUT',
            body: { resolution_notes: resolutionNotes }
        });
    }
}
// Return Shipments API
export class ReturnShipmentsAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'return-shipments/list');
    }
    async updateStatus(id, returnStatus, refundStatus) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `return-shipments/update-status/${id}`, {
            method: 'PUT',
            body: { return_status: returnStatus, refund_status: refundStatus }
        });
    }
}
// Cash Advances API
export class CashAdvancesAPI extends BaseAPI {
    async list() {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'cash-advances/list');
    }
    async create(data) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', 'cash-advances/create', {
            method: 'POST',
            body: data
        });
    }
    async approve(id) {
        return this.callEdgeFunction('be_data_management_2026_02_04_05_03', `cash-advances/approve/${id}`, {
            method: 'PUT'
        });
    }
}
// Reporting API
export class ReportingAPI extends BaseAPI {
    async generateDeliveryReport(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', `delivery/generate?${queryParams}`);
    }
    async generateMerchantReport(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', `merchant/generate?${queryParams}`);
    }
    async generateFinancialReport(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', `financial/generate?${queryParams}`);
    }
    async generatePerformanceReport(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', `performance/generate?${queryParams}`);
    }
    async generateCustomReport(reportConfig) {
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', 'custom/generate', {
            method: 'POST',
            body: { reportConfig }
        });
    }
    async getDashboardData(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        return this.callEdgeFunction('be_reporting_2026_02_04_05_03', `dashboard/generate?${queryParams}`);
    }
}
// Notifications API
export class NotificationsAPI extends BaseAPI {
    async sendEmail(emailData) {
        return this.callEdgeFunction('be_notifications_2026_02_04_05_03', 'send-email', {
            method: 'POST',
            body: emailData
        });
    }
    async sendNotification(notificationData) {
        return this.callEdgeFunction('be_notifications_2026_02_04_05_03', 'send-notification', {
            method: 'POST',
            body: notificationData
        });
    }
    async getTemplates() {
        return this.callEdgeFunction('be_notifications_2026_02_04_05_03', 'get-templates');
    }
    async createTemplate(templateData) {
        return this.callEdgeFunction('be_notifications_2026_02_04_05_03', 'create-template', {
            method: 'POST',
            body: templateData
        });
    }
}
// Export API instances
export const deliveryWaysAPI = new DeliveryWaysAPI();
export const merchantsAPI = new MerchantsAPI();
export const deliverymenAPI = new DeliverymenAPI();
export const broadcastMessagesAPI = new BroadcastMessagesAPI();
export const systemSettingsAPI = new SystemSettingsAPI();
export const failedDeliveriesAPI = new FailedDeliveriesAPI();
export const returnShipmentsAPI = new ReturnShipmentsAPI();
export const cashAdvancesAPI = new CashAdvancesAPI();
export const reportingAPI = new ReportingAPI();
export const notificationsAPI = new NotificationsAPI();
// Export all APIs as a single object
export const api = {
    deliveryWays: deliveryWaysAPI,
    merchants: merchantsAPI,
    deliverymen: deliverymenAPI,
    broadcastMessages: broadcastMessagesAPI,
    systemSettings: systemSettingsAPI,
    failedDeliveries: failedDeliveriesAPI,
    returnShipments: returnShipmentsAPI,
    cashAdvances: cashAdvancesAPI,
    reporting: reportingAPI,
    notifications: notificationsAPI
};
export default api;
