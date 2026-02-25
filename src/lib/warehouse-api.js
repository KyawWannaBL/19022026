import { supabase } from '@/integrations/supabase/client';
// Warehouse API Class
export class WarehouseAPI {
    // Get warehouse user profile
    static async getWarehouseUser(userId) {
        try {
            const { data, error } = await supabase
                .from('warehouse_users_2026_02_04_15_54')
                .select('*')
                .eq('user_id', userId || (await supabase.auth.getUser()).data.user?.id)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Error fetching warehouse user:', error);
            return null;
        }
    }
    // Get warehouse station
    static async getWarehouseStation(stationId) {
        try {
            const { data, error } = await supabase
                .from('warehouse_stations_2026_02_04_15_54')
                .select('*')
                .eq('id', stationId)
                .single();
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error('Error fetching warehouse station:', error);
            return null;
        }
    }
    // Get all stations
    static async getAllStations() {
        try {
            const { data, error } = await supabase
                .from('warehouse_stations_2026_02_04_15_54')
                .select('*')
                .eq('is_active', true)
                .order('station_name');
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching stations:', error);
            return [];
        }
    }
    // Scan QR Code
    static async scanQRCode(qrCode) {
        try {
            // First, check if it's a valid QR code
            const { data: qrData, error: qrError } = await supabase
                .from('qr_codes_2026_02_04_15_54')
                .select('*')
                .eq('qr_code', qrCode)
                .eq('is_active', true)
                .single();
            if (qrError || !qrData) {
                return { success: false, message: 'Invalid or expired QR code' };
            }
            // Update scan count
            await supabase
                .from('qr_codes_2026_02_04_15_54')
                .update({
                scan_count: qrData.scan_count + 1,
                last_scanned_at: new Date().toISOString(),
                last_scanned_by: (await supabase.auth.getUser()).data.user?.id
            })
                .eq('id', qrData.id);
            // Get the referenced data
            if (qrData.qr_type === 'parcel') {
                const { data: parcelData, error: parcelError } = await supabase
                    .from('warehouse_parcels_2026_02_04_15_54')
                    .select('*')
                    .eq('id', qrData.reference_id)
                    .single();
                if (parcelError)
                    throw parcelError;
                return { success: true, data: parcelData, type: 'parcel' };
            }
            else if (qrData.qr_type === 'manifest') {
                const { data: manifestData, error: manifestError } = await supabase
                    .from('warehouse_manifests_2026_02_04_15_54')
                    .select('*')
                    .eq('id', qrData.reference_id)
                    .single();
                if (manifestError)
                    throw manifestError;
                return { success: true, data: manifestData, type: 'manifest' };
            }
            return { success: false, message: 'Unsupported QR code type' };
        }
        catch (error) {
            console.error('Error scanning QR code:', error);
            return { success: false, message: 'Failed to scan QR code' };
        }
    }
    // Get parcels by station
    static async getParcelsByStation(stationId, status) {
        try {
            let query = supabase
                .from('warehouse_parcels_2026_02_04_15_54')
                .select('*')
                .eq('current_station_id', stationId)
                .order('createdAt', { ascending: false });
            if (status) {
                query = query.eq('status', status);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching parcels:', error);
            return [];
        }
    }
    // Update parcel status with operation logging
    static async updateParcelStatus(parcelId, newStatus, operationType, additionalData) {
        try {
            const user = await this.getWarehouseUser();
            if (!user)
                throw new Error('User not found');
            // Get current parcel data
            const { data: currentParcel, error: parcelError } = await supabase
                .from('warehouse_parcels_2026_02_04_15_54')
                .select('*')
                .eq('id', parcelId)
                .single();
            if (parcelError)
                throw parcelError;
            // Update parcel
            const updateData = {
                status: newStatus,
                updated_at: new Date().toISOString()
            };
            if (additionalData?.sortBin)
                updateData.sort_bin = additionalData.sortBin;
            if (additionalData?.routeCode)
                updateData.route_code = additionalData.routeCode;
            const { error: updateError } = await supabase
                .from('warehouse_parcels_2026_02_04_15_54')
                .update(updateData)
                .eq('id', parcelId);
            if (updateError)
                throw updateError;
            // Log operation
            await supabase
                .from('warehouse_operations_2026_02_04_15_54')
                .insert([{
                    operation_type: operationType,
                    parcel_id: parcelId,
                    station_id: user.station_id,
                    user_id: user.id,
                    qr_code_scanned: additionalData?.qrCodeScanned,
                    scan_method: additionalData?.scanMethod || 'manual_entry',
                    scan_location: additionalData?.scanLocation,
                    from_status: currentParcel.status,
                    to_status: newStatus,
                    sort_bin: additionalData?.sortBin,
                    route_code: additionalData?.routeCode,
                    notes: additionalData?.notes
                }]);
            return true;
        }
        catch (error) {
            console.error('Error updating parcel status:', error);
            return false;
        }
    }
    // Get warehouse operations
    static async getOperations(stationId, limit = 50) {
        try {
            const { data, error } = await supabase
                .from('warehouse_operations_2026_02_04_15_54')
                .select('*')
                .eq('station_id', stationId)
                .order('createdAt', { ascending: false })
                .limit(limit);
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching operations:', error);
            return [];
        }
    }
    // Create manifest
    static async createManifest(manifestData) {
        try {
            const user = await this.getWarehouseUser();
            if (!user)
                throw new Error('User not found');
            // Generate manifest number
            const manifestNumber = `MF${Date.now()}`;
            const manifestQRCode = `QR_${manifestNumber}`;
            const { data, error } = await supabase
                .from('warehouse_manifests_2026_02_04_15_54')
                .insert([{
                    ...manifestData,
                    manifest_number: manifestNumber,
                    manifest_qr_code: manifestQRCode,
                    created_by: user.id
                }])
                .select()
                .single();
            if (error)
                throw error;
            // Create QR code entry
            await supabase
                .from('qr_codes_2026_02_04_15_54')
                .insert([{
                    qr_code: manifestQRCode,
                    qr_type: 'manifest',
                    reference_id: data.id,
                    reference_table: 'warehouse_manifests_2026_02_04_15_54',
                    qr_data: {
                        manifest_number: manifestNumber,
                        type: 'manifest',
                        createdAt: data.createdAt
                    }
                }]);
            return data.id;
        }
        catch (error) {
            console.error('Error creating manifest:', error);
            return null;
        }
    }
    // Get manifests by station
    static async getManifestsByStation(stationId) {
        try {
            const { data, error } = await supabase
                .from('warehouse_manifests_2026_02_04_15_54')
                .select('*')
                .eq('origin_station_id', stationId)
                .order('createdAt', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error fetching manifests:', error);
            return [];
        }
    }
    // Add parcel to manifest
    static async addParcelToManifest(manifestId, parcelId) {
        try {
            const user = await this.getWarehouseUser();
            if (!user)
                throw new Error('User not found');
            // Add to manifest items
            const { error: itemError } = await supabase
                .from('warehouse_manifest_items_2026_02_04_15_54')
                .insert([{
                    manifest_id: manifestId,
                    parcel_id: parcelId,
                    scanned_at: new Date().toISOString(),
                    scanned_by: user.id
                }]);
            if (itemError)
                throw itemError;
            // Update parcel manifest_id
            const { error: parcelError } = await supabase
                .from('warehouse_parcels_2026_02_04_15_54')
                .update({
                manifest_id: manifestId,
                status: 'manifested',
                updated_at: new Date().toISOString()
            })
                .eq('id', parcelId);
            if (parcelError)
                throw parcelError;
            return true;
        }
        catch (error) {
            console.error('Error adding parcel to manifest:', error);
            return false;
        }
    }
    // Create customer acknowledgment
    static async createCustomerAcknowledgment(acknowledgmentData) {
        try {
            const { error } = await supabase
                .from('customer_acknowledgments_2026_02_04_15_54')
                .insert([acknowledgmentData]);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error creating customer acknowledgment:', error);
            return false;
        }
    }
    // Get warehouse statistics
    static async getWarehouseStats(stationId) {
        try {
            // Get parcel counts by status
            const { data: parcels } = await supabase
                .from('warehouse_parcels_2026_02_04_15_54')
                .select('status')
                .eq('current_station_id', stationId);
            // Get today's operations count
            const today = new Date().toISOString().split('T')[0];
            const { data: operations } = await supabase
                .from('warehouse_operations_2026_02_04_15_54')
                .select('id')
                .eq('station_id', stationId)
                .gte('createdAt', today + 'T00:00:00.000Z')
                .lt('createdAt', today + 'T23:59:59.999Z');
            const stats = {
                totalParcels: parcels?.length || 0,
                inbound: parcels?.filter(p => p.status === 'inbound_received').length || 0,
                sorting: parcels?.filter(p => p.status === 'sorting').length || 0,
                sorted: parcels?.filter(p => p.status === 'sorted').length || 0,
                manifested: parcels?.filter(p => p.status === 'manifested').length || 0,
                outbound: parcels?.filter(p => p.status === 'out_for_delivery').length || 0,
                todayOperations: operations?.length || 0
            };
            return stats;
        }
        catch (error) {
            console.error('Error fetching warehouse stats:', error);
            return {
                totalParcels: 0,
                inbound: 0,
                sorting: 0,
                sorted: 0,
                manifested: 0,
                outbound: 0,
                todayOperations: 0
            };
        }
    }
}
export default WarehouseAPI;
