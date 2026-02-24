import { supabase } from '@/integrations/supabase/client';
// Advanced Features API Service
class AdvancedFeaturesService {
    baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/advanced_features_api_2026_02_19_15_00`;
    async makeRequest(action, data = {}) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(`${this.baseUrl}?action=${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_ANON_KEY}`,
                },
                body: JSON.stringify({ action, ...data }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(`Advanced Features API Error (${action}):`, error);
            throw error;
        }
    }
    // QR Code Operations
    async generateQRCode(qrType, referenceId, referenceType, data = {}) {
        return this.makeRequest('generate_qr_code', {
            qr_type: qrType,
            reference_id: referenceId,
            reference_type: referenceType,
            data,
        });
    }
    async scanQRCode(qrCode, scannedBy, metadata = {}) {
        return this.makeRequest('scan_qr_code', {
            qr_code: qrCode,
            scanned_by: scannedBy,
            scan_metadata: metadata,
        });
    }
    async getQRCodes(filters = {}) {
        return this.makeRequest('get_qr_codes', filters);
    }
    // GPS Tracking Operations
    async recordGPSLocation(locationData) {
        return this.makeRequest('record_gps_location', locationData);
    }
    async getGPSTracking(filters = {}) {
        return this.makeRequest('get_gps_tracking', filters);
    }
    async getLiveLocations() {
        return this.makeRequest('get_live_locations');
    }
    // Electronic Signature Operations
    async saveSignature(signatureData) {
        return this.makeRequest('save_signature', signatureData);
    }
    async getSignatures(filters = {}) {
        return this.makeRequest('get_signatures', filters);
    }
    async verifySignature(signatureId, verificationStatus, verifiedBy) {
        return this.makeRequest('verify_signature', {
            signature_id: signatureId,
            verification_status: verificationStatus,
            verified_by: verifiedBy,
        });
    }
    // Route Optimization Operations
    async optimizeRoute(routeData) {
        return this.makeRequest('optimize_route', routeData);
    }
    async getRoutes(filters = {}) {
        return this.makeRequest('get_routes', filters);
    }
    async updateRouteStatus(routeId, status, actualDuration) {
        return this.makeRequest('update_route_status', {
            route_id: routeId,
            status,
            actual_duration: actualDuration,
        });
    }
    // Real-time Events
    async getRealtimeEvents(filters = {}) {
        return this.makeRequest('get_realtime_events', filters);
    }
    async createEvent(eventData) {
        return this.makeRequest('create_event', eventData);
    }
    // Geofencing
    async checkGeofence(latitude, longitude, deviceId) {
        return this.makeRequest('check_geofence', {
            latitude,
            longitude,
            device_id: deviceId,
        });
    }
    async getGeofences(filters = {}) {
        return this.makeRequest('get_geofences', filters);
    }
    // Additional methods for comprehensive feature support
    async processScan(scanData) {
        return this.makeRequest('process_scan', scanData);
    }
    async updateQRStatus(qrId, status) {
        return this.makeRequest('update_qr_status', { qr_id: qrId, status });
    }
    async getScanHistory(filters = {}) {
        return this.makeRequest('get_scan_history', filters);
    }
    async getGPSDevices(filters = {}) {
        return this.makeRequest('get_gps_devices', filters);
    }
    async updateGPSLocation(deviceId, location) {
        return this.makeRequest('update_gps_location', { device_id: deviceId, ...location });
    }
    async createGeofence(geofenceData) {
        return this.makeRequest('create_geofence', geofenceData);
    }
    async getGeofenceAlerts(filters = {}) {
        return this.makeRequest('get_geofence_alerts', filters);
    }
    async acknowledgeAlert(alertId, userId) {
        return this.makeRequest('acknowledge_alert', { alert_id: alertId, user_id: userId });
    }
    async getSignatureTemplates(filters = {}) {
        return this.makeRequest('get_signature_templates', filters);
    }
    async getOptimizedRoutes(filters = {}) {
        return this.makeRequest('get_optimized_routes', filters);
    }
    async createRoute(routeData) {
        return this.makeRequest('create_route', routeData);
    }
    async startRoute(routeId) {
        return this.makeRequest('start_route', { route_id: routeId });
    }
    async completeRoute(routeId) {
        return this.makeRequest('complete_route', { route_id: routeId });
    }
    async getVehicleProfiles(filters = {}) {
        return this.makeRequest('get_vehicle_profiles', filters);
    }
}
// Export singleton instance
export const advancedFeaturesAPI = new AdvancedFeaturesService();
