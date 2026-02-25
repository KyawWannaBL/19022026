import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Truck, User, Battery, Signal, AlertTriangle, CheckCircle, Zap, Shield, Activity, Eye, RefreshCw, Map } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPSTracker } from '@/components/GPSTracker';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function GPSTrackingDashboard() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('LIVE');
    const [devices, setDevices] = useState([]);
    const [geofences, setGeofences] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [mapCenter, setMapCenter] = useState({ lat: 16.8661, lng: 96.1951 }); // Yangon, Myanmar
    useEffect(() => {
        loadGPSData();
        const interval = setInterval(loadGPSData, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);
    const loadGPSData = async () => {
        try {
            setLoading(true);
            const [devicesRes, geofencesRes, alertsRes, routesRes] = await Promise.all([
                advancedFeaturesAPI.getGPSDevices(),
                advancedFeaturesAPI.getGeofences(),
                advancedFeaturesAPI.getGeofenceAlerts(),
                advancedFeaturesAPI.getRoutes()
            ]);
            if (devicesRes.success)
                setDevices(devicesRes.data || []);
            if (geofencesRes.success)
                setGeofences(geofencesRes.data || []);
            if (alertsRes.success)
                setAlerts(alertsRes.data || []);
            if (routesRes.success)
                setRoutes(routesRes.data || []);
        }
        catch (error) {
            console.error('Error loading GPS data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const updateDeviceLocation = async (deviceId, location) => {
        try {
            await advancedFeaturesAPI.updateGPSLocation(deviceId, location);
            await loadGPSData();
        }
        catch (error) {
            console.error('Error updating device location:', error);
        }
    };
    const acknowledgeAlert = async (alertId) => {
        try {
            await advancedFeaturesAPI.acknowledgeAlert(alertId, 'current_user');
            await loadGPSData();
            alert(language === 'my'
                ? 'သတိပေးချက်ကို အသိအမှတ်ပြုပြီးပါပြီ'
                : 'Alert acknowledged successfully');
        }
        catch (error) {
            console.error('Error acknowledging alert:', error);
        }
    };
    const createGeofence = async (geofenceData) => {
        try {
            const response = await advancedFeaturesAPI.createGeofence(geofenceData);
            if (response.success) {
                await loadGPSData();
                alert(language === 'my'
                    ? 'ဂျီယိုဖန်စ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ'
                    : 'Geofence created successfully');
            }
        }
        catch (error) {
            console.error('Error creating geofence:', error);
        }
    };
    const optimizeRoute = async (routeId) => {
        try {
            setLoading(true);
            const response = await advancedFeaturesAPI.updateRouteStatus(routeId, 'OPTIMIZED');
            if (response.success) {
                await loadGPSData();
                alert(language === 'my'
                    ? 'လမ်းကြောင်းကို အကောင်းဆုံးပြုလုပ်ပြီးပါပြီ'
                    : 'Route optimized successfully');
            }
        }
        catch (error) {
            console.error('Error optimizing route:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'ONLINE':
            case 'ACTIVE':
            case 'IN_PROGRESS': return 'bg-green-100 text-green-800';
            case 'OFFLINE':
            case 'INACTIVE':
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'PLANNED':
            case 'PENDING': return 'bg-blue-100 text-blue-800';
            case 'COMPLETED': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getDeviceIcon = (type) => {
        switch (type) {
            case 'VEHICLE': return _jsx(Truck, { className: "w-4 h-4" });
            case 'RIDER': return _jsx(User, { className: "w-4 h-4" });
            case 'MOBILE': return _jsx(MapPin, { className: "w-4 h-4" });
            default: return _jsx(MapPin, { className: "w-4 h-4" });
        }
    };
    const getBatteryIcon = (level) => {
        if (!level)
            return _jsx(Battery, { className: "w-4 h-4 text-gray-400" });
        if (level > 50)
            return _jsx(Battery, { className: "w-4 h-4 text-green-500" });
        if (level > 20)
            return _jsx(Battery, { className: "w-4 h-4 text-yellow-500" });
        return _jsx(Battery, { className: "w-4 h-4 text-red-500" });
    };
    const getSignalIcon = (strength) => {
        if (!strength)
            return _jsx(Signal, { className: "w-4 h-4 text-gray-400" });
        if (strength > 70)
            return _jsx(Signal, { className: "w-4 h-4 text-green-500" });
        if (strength > 40)
            return _jsx(Signal, { className: "w-4 h-4 text-yellow-500" });
        return _jsx(Signal, { className: "w-4 h-4 text-red-500" });
    };
    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.device_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.assigned_to.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || device.status === filterStatus;
        return matchesSearch && matchesStatus;
    });
    const renderLiveTrackingTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Map, { className: "w-5 h-5" }), language === 'my' ? 'တိုက်ရိုက်ခြေရာခံမြေပုံ' : 'Live Tracking Map'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "bg-gray-100 rounded-lg h-96 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Map, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: language === 'my'
                                            ? 'မြေပုံ ဒေတာ လုဒ်လုပ်နေသည်...'
                                            : 'Loading map data...' }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: language === 'my'
                                            ? `${devices.filter(d => d.status === 'ONLINE').length} ကိရိယာ အွန်လိုင်းရှိ`
                                            : `${devices.filter(d => d.status === 'ONLINE').length} devices online` })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: devices.filter(d => d.status === 'ONLINE').length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'အွန်လိုင်း' : 'Online' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: devices.filter(d => d.status === 'OFFLINE').length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'အော့ဖ်လိုင်း' : 'Offline' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: routes.filter(r => r.status === 'IN_PROGRESS').length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'လုပ်ဆောင်နေသော လမ်းကြောင်း' : 'Active Routes' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: alerts.filter(a => !a.acknowledged).length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'သတိပေးချက်များ' : 'Alerts' })] }) }) })] })] }));
    const renderDevicesTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Input, { placeholder: language === 'my' ? 'ကိရိယာ ID ရှာရန်...' : 'Search device ID...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အခြေအနေအားလုံး' : 'All Status' }), _jsx("option", { value: "ONLINE", children: language === 'my' ? 'အွန်လိုင်း' : 'Online' }), _jsx("option", { value: "OFFLINE", children: language === 'my' ? 'အော့ဖ်လိုင်း' : 'Offline' }), _jsx("option", { value: "INACTIVE", children: language === 'my' ? 'မလုပ်ဆောင်' : 'Inactive' })] })] }) }) }), _jsx("div", { className: "grid gap-4", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(RefreshCw, { className: "w-8 h-8 animate-spin mx-auto mb-2" }), _jsx("p", { children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : filteredDevices.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(MapPin, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'GPS ကိရိယာ မရှိပါ' : 'No GPS devices found' })] }) })) : (filteredDevices.map((device) => (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [getDeviceIcon(device.device_type), _jsx("span", { className: "font-medium", children: device.device_id }), _jsx(Badge, { className: getStatusColor(device.status), children: language === 'my'
                                                        ? device.status === 'ONLINE' ? 'အွန်လိုင်း'
                                                            : device.status === 'OFFLINE' ? 'အော့ဖ်လိုင်း'
                                                                : 'မလုပ်ဆောင်'
                                                        : device.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'သတ်မှတ်ထား:' : 'Assigned:' }), _jsx("span", { className: "ml-1 font-medium", children: device.assigned_to })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'အမျိုးအစား:' : 'Type:' }), _jsx("span", { className: "ml-1", children: device.device_type })] }), device.speed !== undefined && (_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'အမြန်နှုန်း:' : 'Speed:' }), _jsxs("span", { className: "ml-1", children: [device.speed, " km/h"] })] })), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'နောက်ဆုံးအပ်ဒိတ်:' : 'Last Update:' }), _jsx("span", { className: "ml-1", children: new Date(device.last_location.timestamp).toLocaleTimeString() })] })] }), _jsxs("div", { className: "flex items-center gap-4 mt-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [getBatteryIcon(device.battery_level), _jsx("span", { className: "text-xs", children: device.battery_level ? `${device.battery_level}%` : 'N/A' })] }), _jsxs("div", { className: "flex items-center gap-1", children: [getSignalIcon(device.signal_strength), _jsx("span", { className: "text-xs", children: device.signal_strength ? `${device.signal_strength}%` : 'N/A' })] }), device.last_location.accuracy && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3 text-blue-500" }), _jsxs("span", { className: "text-xs", children: ["\u00B1", device.last_location.accuracy, "m"] })] }))] }), device.last_location.address && (_jsxs("div", { className: "mt-2 text-xs text-gray-500", children: [_jsx(MapPin, { className: "w-3 h-3 inline mr-1" }), device.last_location.address] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => setSelectedDevice(device), children: _jsx(Eye, { className: "w-4 h-4" }) }), device.status === 'ONLINE' && (_jsx(GPSTracker, { deviceId: device.device_id, onLocationUpdate: (location) => updateDeviceLocation(device.id, location) }))] })] }) }) }, device.id)))) })] }));
    const renderGeofencesTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "w-5 h-5" }), language === 'my' ? 'ဂျီယိုဖန်စ် ဇုန်များ' : 'Geofence Zones'] }), _jsx(Button, { children: language === 'my' ? 'ဇုန်အသစ်ဖန်တီး' : 'Create Zone' })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: geofences.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Shield, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'ဂျီယိုဖန်စ် ဇုန် မရှိပါ' : 'No geofence zones found' })] })) : (geofences.map((zone) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium", children: zone.name }), _jsx(Badge, { className: getStatusColor(zone.status), children: language === 'my'
                                                        ? zone.status === 'ACTIVE' ? 'အသက်ဝင်နေ' : 'မလုပ်ဆောင်'
                                                        : zone.status })] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("span", { children: [language === 'my' ? 'အမျိုးအစား:' : 'Type:', " ", zone.type] }), _jsxs("span", { className: "ml-4", children: [language === 'my' ? 'အချင်းဝက်:' : 'Radius:', " ", zone.coordinates.radius, "m"] })] }), _jsxs("div", { className: "flex items-center gap-4 mt-1 text-xs", children: [zone.entry_alerts && (_jsx("span", { className: "text-green-600", children: language === 'my' ? 'ဝင်ရောက်သတိပေးချက်' : 'Entry Alerts' })), zone.exit_alerts && (_jsx("span", { className: "text-red-600", children: language === 'my' ? 'ထွက်ခွာသတိပေးချက်' : 'Exit Alerts' }))] })] }), _jsx("div", { className: "flex gap-2", children: _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Eye, { className: "w-4 h-4" }) }) })] }, zone.id)))) }) })] }) }));
    const renderRoutesTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Navigation, { className: "w-5 h-5" }), language === 'my' ? 'လမ်းကြောင်း စီမံခန့်ခွဲမှု' : 'Route Management'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: routes.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Navigation, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'လမ်းကြောင်း မရှိပါ' : 'No routes found' })] })) : (routes.map((route) => (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "font-medium", children: route.route_name }), _jsx(Badge, { className: getStatusColor(route.status), children: language === 'my'
                                                                ? route.status === 'PLANNED' ? 'စီစဉ်ထား'
                                                                    : route.status === 'IN_PROGRESS' ? 'လုပ်ဆောင်နေ'
                                                                        : route.status === 'COMPLETED' ? 'ပြီးစီး'
                                                                            : 'ပယ်ဖျက်'
                                                                : route.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'ကိရိယာ:' : 'Device:' }), _jsx("span", { className: "ml-1 font-medium", children: route.assigned_device })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'ခရီးအကွာအဝေး:' : 'Distance:' }), _jsxs("span", { className: "ml-1", children: [route.total_distance, " km"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'ခန့်မှန်းချိန်:' : 'Est. Duration:' }), _jsxs("span", { className: "ml-1", children: [Math.round(route.estimated_duration / 60), " min"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'လောင်စာဆီ:' : 'Fuel Est:' }), _jsxs("span", { className: "ml-1", children: [route.fuel_estimation, "L"] })] })] }), _jsxs("div", { className: "mt-2", children: [_jsxs("span", { className: "text-sm text-gray-600", children: [language === 'my' ? 'ဝေးပွိုင့်များ:' : 'Waypoints:', " ", route.waypoints.length] }), _jsx("div", { className: "flex gap-1 mt-1", children: route.waypoints.map((waypoint, index) => (_jsx("div", { className: `w-3 h-3 rounded-full ${waypoint.status === 'COMPLETED' ? 'bg-green-500' :
                                                                    waypoint.status === 'ARRIVED' ? 'bg-blue-500' : 'bg-gray-300'}`, title: waypoint.address }, waypoint.id))) })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => optimizeRoute(route.id), disabled: loading || route.status !== 'PLANNED', children: _jsx(Zap, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }) }, route.id)))) }) })] }) }));
    const renderAlertsTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-5 h-5" }), language === 'my' ? 'ဂျီယိုဖန်စ် သတိပေးချက်များ' : 'Geofence Alerts'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: alerts.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(AlertTriangle, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'သတိပေးချက် မရှိပါ' : 'No alerts found' })] })) : (alerts.map((alert) => (_jsx("div", { className: `p-3 border rounded ${alert.acknowledged ? 'bg-gray-50' : 'bg-yellow-50 border-yellow-200'}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(AlertTriangle, { className: `w-4 h-4 ${alert.alert_type === 'VIOLATION' ? 'text-red-500' :
                                                            alert.alert_type === 'ENTRY' ? 'text-green-500' : 'text-blue-500'}` }), _jsx("span", { className: "font-medium", children: language === 'my'
                                                            ? alert.alert_type === 'ENTRY' ? 'ဝင်ရောက်မှု'
                                                                : alert.alert_type === 'EXIT' ? 'ထွက်ခွာမှု'
                                                                    : 'ချိုးဖောက်မှု'
                                                            : alert.alert_type }), alert.acknowledged && (_jsx(Badge, { variant: "secondary", children: language === 'my' ? 'အသိအမှတ်ပြုပြီး' : 'Acknowledged' }))] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsx("div", { children: _jsxs("span", { children: [language === 'my' ? 'ကိရိယာ:' : 'Device:', " ", alert.device_id] }) }), _jsx("div", { children: _jsxs("span", { children: [language === 'my' ? 'အချိန်:' : 'Time:', " ", new Date(alert.timestamp).toLocaleString()] }) }), alert.acknowledged_by && (_jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [language === 'my' ? 'အသိအမှတ်ပြုသူ:' : 'Acknowledged by:', " ", alert.acknowledged_by, alert.acknowledged_at && ` at ${new Date(alert.acknowledged_at).toLocaleString()}`] }))] })] }), !alert.acknowledged && (_jsxs(Button, { size: "sm", variant: "outline", onClick: () => acknowledgeAlert(alert.id), children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-1" }), language === 'my' ? 'အသိအမှတ်ပြု' : 'Acknowledge'] }))] }) }, alert.id)))) }) })] }) }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: language === 'my' ? 'GPS ခြေရာခံစနစ်' : 'GPS Tracking System' }), _jsxs(Button, { onClick: loadGPSData, disabled: loading, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}` }), language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh'] })] }), _jsx("div", { className: "flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg", children: [
                    { key: 'LIVE', label: language === 'my' ? 'တိုက်ရိုက်' : 'Live', icon: Activity },
                    { key: 'DEVICES', label: language === 'my' ? 'ကိရိယာများ' : 'Devices', icon: MapPin },
                    { key: 'GEOFENCES', label: language === 'my' ? 'ဂျီယိုဖန်စ်' : 'Geofences', icon: Shield },
                    { key: 'ROUTES', label: language === 'my' ? 'လမ်းကြောင်း' : 'Routes', icon: Navigation },
                    { key: 'ALERTS', label: language === 'my' ? 'သတိပေးချက်' : 'Alerts', icon: AlertTriangle }
                ].map(({ key, label, icon: Icon }) => (_jsxs("button", { onClick: () => setActiveTab(key), className: `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === key
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), label, key === 'ALERTS' && alerts.filter(a => !a.acknowledged).length > 0 && (_jsx(Badge, { variant: "destructive", className: "ml-1 px-1 py-0 text-xs", children: alerts.filter(a => !a.acknowledged).length }))] }, key))) }), activeTab === 'LIVE' && renderLiveTrackingTab(), activeTab === 'DEVICES' && renderDevicesTab(), activeTab === 'GEOFENCES' && renderGeofencesTab(), activeTab === 'ROUTES' && renderRoutesTab(), activeTab === 'ALERTS' && renderAlertsTab()] }));
}
