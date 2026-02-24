import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
export function useAdvancedLogistics() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // GPS Tracking Functions
    const updateGPSLocation = useCallback(async (location) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('gps_tracking_realtime_2026_02_18_18_00', {
                body: location
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update GPS location';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const getTrackingData = useCallback(async (deviceId, routeId, hours = 24) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                action: 'track',
                ...(deviceId && { device_id: deviceId }),
                ...(routeId && { route_id: routeId }),
                hours: hours.toString()
            });
            const { data, error } = await supabase.functions.invoke('gps_tracking_realtime_2026_02_18_18_00', {
                body: {},
                method: 'GET'
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tracking data';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    // Route Optimization Functions
    const optimizeRoute = useCallback(async (request) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('advanced_route_optimizer_2026_02_18_18_00', {
                body: request
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to optimize route';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    // Electronic Signature Functions
    const captureSignature = useCallback(async (signatureData) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('signature_data_automation_2026_02_18_18_00', {
                body: {
                    ...signatureData,
                    device_info: {
                        user_agent: navigator.userAgent,
                        platform: navigator.platform,
                        timestamp: new Date().toISOString()
                    }
                }
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to capture signature';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const getSignatures = useCallback(async (parcelId, riderId, limit = 50) => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                action: 'signatures',
                ...(parcelId && { parcel_id: parcelId }),
                ...(riderId && { rider_id: riderId }),
                limit: limit.toString()
            });
            const { data, error } = await supabase.functions.invoke('signature_data_automation_2026_02_18_18_00', {
                body: {},
                method: 'GET'
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch signatures';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    // Data Entry Automation Functions
    const processDataEntry = useCallback(async (sourceType, sourceData, options) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('signature_data_automation_2026_02_18_18_00', {
                body: {
                    source_type: sourceType,
                    source_data: sourceData,
                    source_file: options?.sourceFile,
                    target_table: options?.targetTable,
                    auto_apply: options?.autoApply || false
                }
            });
            if (error)
                throw error;
            return data;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to process data entry';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    // Real-time Subscriptions
    const subscribeToGPSUpdates = useCallback((callback) => {
        const channel = supabase
            .channel('gps_tracking')
            .on('broadcast', { event: 'gps_update' }, callback)
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    const subscribeToGeofenceAlerts = useCallback((callback) => {
        const channel = supabase
            .channel('geofence_alerts')
            .on('broadcast', { event: 'geofence_alert' }, callback)
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    // Utility Functions
    const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }, []);
    const getCurrentLocation = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    }, []);
    const watchLocation = useCallback((callback) => {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser');
        }
        const watchId = navigator.geolocation.watchPosition(callback, (error) => {
            console.error('Geolocation error:', error);
            setError(`Geolocation error: ${error.message}`);
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
        });
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);
    return {
        // State
        isLoading,
        error,
        // GPS Tracking
        updateGPSLocation,
        getTrackingData,
        subscribeToGPSUpdates,
        subscribeToGeofenceAlerts,
        // Route Optimization
        optimizeRoute,
        // Electronic Signatures
        captureSignature,
        getSignatures,
        // Data Entry Automation
        processDataEntry,
        // Utilities
        calculateDistance,
        getCurrentLocation,
        watchLocation,
        // Clear error
        clearError: () => setError(null)
    };
}
