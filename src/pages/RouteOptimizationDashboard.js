import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Navigation, MapPin, Route, Zap, Clock, Fuel, CheckCircle, Play, Square, Eye, RefreshCw, Plus, Trash2, Edit, Download, Upload, Calculator, TrendingUp, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RouteOptimizationDashboard() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('ROUTES');
    const [routes, setRoutes] = useState([]);
    const [vehicleProfiles, setVehicleProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    // Route creation/editing state
    const [routeForm, setRouteForm] = useState({
        route_name: '',
        waypoints: [],
        optimization_settings: {
            optimize_for: 'DISTANCE',
            avoid_tolls: false,
            avoid_highways: false,
            vehicle_type: 'CAR',
            max_working_hours: 8,
            break_duration: 30
        }
    });
    // Waypoint form state
    const [waypointForm, setWaypointForm] = useState({
        address: '',
        lat: 0,
        lng: 0,
        type: 'DELIVERY',
        priority: 1,
        service_duration: 15
    });
    useEffect(() => {
        loadRouteData();
    }, []);
    const loadRouteData = async () => {
        try {
            setLoading(true);
            const [routesRes, vehiclesRes] = await Promise.all([
                advancedFeaturesAPI.getOptimizedRoutes(),
                advancedFeaturesAPI.getVehicleProfiles()
            ]);
            if (routesRes.success)
                setRoutes(routesRes.data || []);
            if (vehiclesRes.success)
                setVehicleProfiles(vehiclesRes.data || []);
        }
        catch (error) {
            console.error('Error loading route data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const createRoute = async () => {
        if (!routeForm.route_name || !routeForm.waypoints || routeForm.waypoints.length < 2) {
            alert(language === 'my'
                ? 'လမ်းကြောင်း အမည်နှင့် အနည်းဆုံး ဝေးပွိုင့် ၂ ခု လိုအပ်ပါသည်'
                : 'Route name and at least 2 waypoints are required');
            return;
        }
        try {
            setLoading(true);
            const response = await advancedFeaturesAPI.createRoute(routeForm);
            if (response.success) {
                await loadRouteData();
                setRouteForm({
                    route_name: '',
                    waypoints: [],
                    optimization_settings: {
                        optimize_for: 'DISTANCE',
                        avoid_tolls: false,
                        avoid_highways: false,
                        vehicle_type: 'CAR',
                        max_working_hours: 8,
                        break_duration: 30
                    }
                });
                alert(language === 'my'
                    ? 'လမ်းကြောင်းကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ'
                    : 'Route created successfully');
            }
        }
        catch (error) {
            console.error('Error creating route:', error);
            alert(language === 'my'
                ? 'လမ်းကြောင်း ဖန်တီးမှု မအောင်မြင်ပါ'
                : 'Failed to create route');
        }
        finally {
            setLoading(false);
        }
    };
    const optimizeRoute = async (routeId) => {
        try {
            setLoading(true);
            const response = await advancedFeaturesAPI.updateRouteStatus(routeId, 'OPTIMIZED');
            if (response.success) {
                await loadRouteData();
                alert(language === 'my'
                    ? 'လမ်းကြောင်းကို အကောင်းဆုံးပြုလုပ်ပြီးပါပြီ'
                    : 'Route optimized successfully');
            }
        }
        catch (error) {
            console.error('Error optimizing route:', error);
            alert(language === 'my'
                ? 'လမ်းကြောင်း အကောင်းဆုံးပြုလုပ်မှု မအောင်မြင်ပါ'
                : 'Route optimization failed');
        }
        finally {
            setLoading(false);
        }
    };
    const startRoute = async (routeId) => {
        try {
            const response = await advancedFeaturesAPI.startRoute(routeId);
            if (response.success) {
                await loadRouteData();
                alert(language === 'my'
                    ? 'လမ်းကြောင်းကို စတင်ပြီးပါပြီ'
                    : 'Route started successfully');
            }
        }
        catch (error) {
            console.error('Error starting route:', error);
        }
    };
    const completeRoute = async (routeId) => {
        try {
            const response = await advancedFeaturesAPI.completeRoute(routeId);
            if (response.success) {
                await loadRouteData();
                alert(language === 'my'
                    ? 'လမ်းကြောင်းကို ပြီးစီးပြီးပါပြီ'
                    : 'Route completed successfully');
            }
        }
        catch (error) {
            console.error('Error completing route:', error);
        }
    };
    const addWaypoint = () => {
        if (!waypointForm.address) {
            alert(language === 'my' ? 'လိပ်စာ လိုအပ်ပါသည်' : 'Address is required');
            return;
        }
        const newWaypoint = {
            id: Date.now().toString(),
            address: waypointForm.address,
            lat: waypointForm.lat || 0,
            lng: waypointForm.lng || 0,
            type: waypointForm.type || 'DELIVERY',
            priority: waypointForm.priority || 1,
            service_duration: waypointForm.service_duration || 15,
            status: 'PENDING'
        };
        setRouteForm({
            ...routeForm,
            waypoints: [...(routeForm.waypoints || []), newWaypoint]
        });
        setWaypointForm({
            address: '',
            lat: 0,
            lng: 0,
            type: 'DELIVERY',
            priority: 1,
            service_duration: 15
        });
    };
    const removeWaypoint = (waypointId) => {
        setRouteForm({
            ...routeForm,
            waypoints: routeForm.waypoints?.filter(w => w.id !== waypointId) || []
        });
    };
    const calculateRouteMetrics = (route) => {
        const metrics = route.route_metrics;
        const vehicle = vehicleProfiles.find(v => v.vehicle_type === route.optimization_settings.vehicle_type);
        return {
            distance: `${metrics.total_distance.toFixed(1)} km`,
            duration: `${Math.floor(metrics.total_duration / 60)}h ${metrics.total_duration % 60}m`,
            fuel: `${metrics.estimated_fuel.toFixed(1)} L`,
            cost: `$${metrics.estimated_cost.toFixed(2)}`,
            co2: `${metrics.carbon_footprint.toFixed(1)} kg CO₂`,
            efficiency: `${metrics.efficiency_score}%`
        };
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'PLANNED':
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
            case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getWaypointIcon = (type) => {
        switch (type) {
            case 'PICKUP': return _jsx(Upload, { className: "w-4 h-4 text-blue-500" });
            case 'DELIVERY': return _jsx(Download, { className: "w-4 h-4 text-green-500" });
            case 'DEPOT': return _jsx(MapPin, { className: "w-4 h-4 text-purple-500" });
            default: return _jsx(MapPin, { className: "w-4 h-4 text-gray-500" });
        }
    };
    const filteredRoutes = routes.filter(route => {
        const matchesSearch = route.route_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || route.status === filterStatus;
        return matchesSearch && matchesStatus;
    });
    const renderRoutesTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx(Input, { placeholder: language === 'my' ? 'လမ်းကြောင်း ရှာရန်...' : 'Search routes...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-64" }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အခြေအနေအားလုံး' : 'All Status' }), _jsx("option", { value: "DRAFT", children: language === 'my' ? 'မူကြမ်း' : 'Draft' }), _jsx("option", { value: "PLANNED", children: language === 'my' ? 'စီစဉ်ထား' : 'Planned' }), _jsx("option", { value: "IN_PROGRESS", children: language === 'my' ? 'လုပ်ဆောင်နေ' : 'In Progress' }), _jsx("option", { value: "COMPLETED", children: language === 'my' ? 'ပြီးစီး' : 'Completed' }), _jsx("option", { value: "CANCELLED", children: language === 'my' ? 'ပယ်ဖျက်' : 'Cancelled' })] })] }), _jsxs(Button, { onClick: () => setActiveTab('OPTIMIZE'), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'လမ်းကြောင်းအသစ်' : 'New Route'] })] }) }) }), _jsx("div", { className: "grid gap-4", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(RefreshCw, { className: "w-8 h-8 animate-spin mx-auto mb-2" }), _jsx("p", { children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : filteredRoutes.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Route, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'လမ်းကြောင်း မရှိပါ' : 'No routes found' })] }) })) : (filteredRoutes.map((route) => {
                    const metrics = calculateRouteMetrics(route);
                    return (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Navigation, { className: "w-5 h-5 text-blue-500" }), _jsx("span", { className: "font-medium text-lg", children: route.route_name }), _jsx(Badge, { className: getStatusColor(route.status), children: language === 'my'
                                                            ? route.status === 'DRAFT' ? 'မူကြမ်း'
                                                                : route.status === 'PLANNED' ? 'စီစဉ်ထား'
                                                                    : route.status === 'IN_PROGRESS' ? 'လုပ်ဆောင်နေ'
                                                                        : route.status === 'COMPLETED' ? 'ပြီးစီး'
                                                                            : 'ပယ်ဖျက်'
                                                            : route.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-4 mb-3", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ခရီးအကွာအဝေး' : 'Distance' }), _jsx("div", { className: "font-medium text-blue-600", children: metrics.distance })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ကြာချိန်' : 'Duration' }), _jsx("div", { className: "font-medium text-green-600", children: metrics.duration })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'လောင်စာဆီ' : 'Fuel' }), _jsx("div", { className: "font-medium text-orange-600", children: metrics.fuel })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ကုန်ကျစရိတ်' : 'Cost' }), _jsx("div", { className: "font-medium text-purple-600", children: metrics.cost })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'CO₂ ထုတ်လွှတ်မှု' : 'CO₂' }), _jsx("div", { className: "font-medium text-red-600", children: metrics.co2 })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ထိရောက်မှု' : 'Efficiency' }), _jsx("div", { className: "font-medium text-indigo-600", children: metrics.efficiency })] })] }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsxs("span", { children: [route.waypoints.length, " ", language === 'my' ? 'ဝေးပွိုင့်' : 'waypoints'] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" }), _jsxs("span", { children: [route.waypoints.filter(w => w.status === 'COMPLETED').length, " ", language === 'my' ? 'ပြီးစီး' : 'completed'] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-4 h-4 text-blue-500" }), _jsxs("span", { children: [route.waypoints.filter(w => w.status === 'PENDING').length, " ", language === 'my' ? 'စောင့်ဆိုင်း' : 'pending'] })] })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-600 mb-1", children: [_jsx("span", { children: language === 'my' ? 'တိုးတက်မှု' : 'Progress' }), _jsxs("span", { children: [Math.round((route.waypoints.filter(w => w.status === 'COMPLETED').length / route.waypoints.length) * 100), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-300", style: {
                                                                width: `${(route.waypoints.filter(w => w.status === 'COMPLETED').length / route.waypoints.length) * 100}%`
                                                            } }) })] })] }), _jsxs("div", { className: "flex gap-2", children: [route.status === 'DRAFT' && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => optimizeRoute(route.id), disabled: loading, children: _jsx(Zap, { className: "w-4 h-4" }) })), route.status === 'PLANNED' && (_jsx(Button, { size: "sm", onClick: () => startRoute(route.id), children: _jsx(Play, { className: "w-4 h-4" }) })), route.status === 'IN_PROGRESS' && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => completeRoute(route.id), children: _jsx(Square, { className: "w-4 h-4" }) })), _jsx(Button, { size: "sm", variant: "outline", onClick: () => setSelectedRoute(route), children: _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }) }, route.id));
                })) })] }));
    const renderOptimizeTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-5 h-5" }), language === 'my' ? 'လမ်းကြောင်းအသစ် ဖန်တီးရန်' : 'Create New Route'] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: [language === 'my' ? 'လမ်းကြောင်း အမည်' : 'Route Name', " *"] }), _jsx(Input, { value: routeForm.route_name, onChange: (e) => setRouteForm({ ...routeForm, route_name: e.target.value }), placeholder: language === 'my' ? 'အမည် ထည့်ပါ' : 'Enter route name', required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ယာဉ် အမျိုးအစား' : 'Vehicle Type' }), _jsxs("select", { value: routeForm.optimization_settings?.vehicle_type, onChange: (e) => setRouteForm({
                                                ...routeForm,
                                                optimization_settings: {
                                                    ...routeForm.optimization_settings,
                                                    vehicle_type: e.target.value
                                                }
                                            }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "CAR", children: language === 'my' ? 'ကား' : 'Car' }), _jsx("option", { value: "TRUCK", children: language === 'my' ? 'ထရပ်ကား' : 'Truck' }), _jsx("option", { value: "MOTORCYCLE", children: language === 'my' ? 'မော်တော်ဆိုင်ကယ်' : 'Motorcycle' }), _jsx("option", { value: "BICYCLE", children: language === 'my' ? 'စက်ဘီး' : 'Bicycle' })] })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5" }), language === 'my' ? 'အကောင်းဆုံးပြုလုပ်မှု ဆက်တင်များ' : 'Optimization Settings'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'အကောင်းဆုံးပြုလုပ်ရန်' : 'Optimize For' }), _jsxs("select", { value: routeForm.optimization_settings?.optimize_for, onChange: (e) => setRouteForm({
                                                    ...routeForm,
                                                    optimization_settings: {
                                                        ...routeForm.optimization_settings,
                                                        optimize_for: e.target.value
                                                    }
                                                }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "DISTANCE", children: language === 'my' ? 'ခရီးအကွာအဝေး' : 'Distance' }), _jsx("option", { value: "TIME", children: language === 'my' ? 'အချိန်' : 'Time' }), _jsx("option", { value: "FUEL", children: language === 'my' ? 'လောင်စာဆီ' : 'Fuel' }), _jsx("option", { value: "COST", children: language === 'my' ? 'ကုန်ကျစရိတ်' : 'Cost' })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'အများဆုံး အလုပ်ချိန် (နာရီ)' : 'Max Working Hours' }), _jsx(Input, { type: "number", value: routeForm.optimization_settings?.max_working_hours, onChange: (e) => setRouteForm({
                                                    ...routeForm,
                                                    optimization_settings: {
                                                        ...routeForm.optimization_settings,
                                                        max_working_hours: parseInt(e.target.value)
                                                    }
                                                }), min: "1", max: "24" })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: routeForm.optimization_settings?.avoid_tolls, onChange: (e) => setRouteForm({
                                                    ...routeForm,
                                                    optimization_settings: {
                                                        ...routeForm.optimization_settings,
                                                        avoid_tolls: e.target.checked
                                                    }
                                                }) }), _jsx("span", { className: "text-sm", children: language === 'my' ? 'အခကြေးငွေ လမ်းများ ရှောင်ရန်' : 'Avoid Tolls' })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: routeForm.optimization_settings?.avoid_highways, onChange: (e) => setRouteForm({
                                                    ...routeForm,
                                                    optimization_settings: {
                                                        ...routeForm.optimization_settings,
                                                        avoid_highways: e.target.checked
                                                    }
                                                }) }), _jsx("span", { className: "text-sm", children: language === 'my' ? 'အဝေးပြေး လမ်းများ ရှောင်ရန်' : 'Avoid Highways' })] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5" }), language === 'my' ? 'ဝေးပွိုင့်များ ထည့်ရန်' : 'Add Waypoints'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: [language === 'my' ? 'လိပ်စာ' : 'Address', " *"] }), _jsx(Input, { value: waypointForm.address, onChange: (e) => setWaypointForm({ ...waypointForm, address: e.target.value }), placeholder: language === 'my' ? 'လိပ်စာ ထည့်ပါ' : 'Enter address' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'အမျိုးအစား' : 'Type' }), _jsxs("select", { value: waypointForm.type, onChange: (e) => setWaypointForm({ ...waypointForm, type: e.target.value }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "PICKUP", children: language === 'my' ? 'ပစ္စည်းယူ' : 'Pickup' }), _jsx("option", { value: "DELIVERY", children: language === 'my' ? 'ပို့ဆောင်' : 'Delivery' }), _jsx("option", { value: "WAYPOINT", children: language === 'my' ? 'ဝေးပွိုင့်' : 'Waypoint' }), _jsx("option", { value: "DEPOT", children: language === 'my' ? 'ဂိုဒေါင်' : 'Depot' })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ဝန်ဆောင်မှုချိန် (မိနစ်)' : 'Service Time (min)' }), _jsx(Input, { type: "number", value: waypointForm.service_duration, onChange: (e) => setWaypointForm({ ...waypointForm, service_duration: parseInt(e.target.value) }), min: "0" })] })] }), _jsxs(Button, { onClick: addWaypoint, disabled: !waypointForm.address, children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ဝေးပွိုင့် ထည့်မည်' : 'Add Waypoint'] })] })] }), routeForm.waypoints && routeForm.waypoints.length > 0 && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [language === 'my' ? 'ဝေးပွိုင့်များ' : 'Waypoints', " (", routeForm.waypoints.length, ")"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: routeForm.waypoints.map((waypoint, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium", children: index + 1 }), getWaypointIcon(waypoint.type), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: waypoint.address }), _jsxs("div", { className: "text-sm text-gray-600", children: [waypoint.type, " \u2022 ", waypoint.service_duration, " min"] })] })] }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => removeWaypoint(waypoint.id), children: _jsx(Trash2, { className: "w-4 h-4" }) })] }, waypoint.id))) }) })] })), _jsx("div", { className: "flex justify-end", children: _jsxs(Button, { onClick: createRoute, disabled: loading || !routeForm.route_name || !routeForm.waypoints || routeForm.waypoints.length < 2, size: "lg", children: [loading ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(Route, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'လမ်းကြောင်း ဖန်တီးမည်' : 'Create Route'] }) })] }));
    const renderAnalyticsTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: routes.length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စုစုပေါင်း လမ်းကြောင်း' : 'Total Routes' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: routes.filter(r => r.status === 'COMPLETED').length }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ပြီးစီးပြီး' : 'Completed' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-orange-600", children: [routes.reduce((sum, r) => sum + r.route_metrics.total_distance, 0).toFixed(0), " km"] }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စုစုပေါင်း ခရီးအကွာအဝေး' : 'Total Distance' })] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [routes.reduce((sum, r) => sum + r.route_metrics.estimated_fuel, 0).toFixed(0), " L"] }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စုစုပေါင်း လောင်စာဆီ' : 'Total Fuel' })] }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5" }), language === 'my' ? 'စွမ်းဆောင်ရည် ခွဲခြမ်းစိတ်ဖြာမှု' : 'Performance Analytics'] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center py-8", children: [_jsx(TrendingUp, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: language === 'my'
                                        ? 'ခွဲခြမ်းစိတ်ဖြာမှု ဒေတာ လုဒ်လုပ်နေသည်...'
                                        : 'Loading analytics data...' })] }) })] })] }));
    const renderSettingsTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Fuel, { className: "w-5 h-5" }), language === 'my' ? 'ယာဉ် ပရိုဖိုင်များ' : 'Vehicle Profiles'] }), _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ပရိုဖိုင်အသစ်' : 'Add Profile'] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: vehicleProfiles.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Fuel, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'ယာဉ် ပရိုဖိုင် မရှိပါ' : 'No vehicle profiles found' })] })) : (vehicleProfiles.map((profile) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium", children: profile.vehicle_type }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("span", { children: [language === 'my' ? 'လောင်စာဆီ သုံးစွဲမှု:' : 'Fuel consumption:', " ", profile.fuel_consumption, " L/100km"] }), _jsxs("span", { className: "ml-4", children: [language === 'my' ? 'အများဆုံး ဝန်:' : 'Max capacity:', " ", profile.max_capacity, " kg"] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }, profile.id)))) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "w-5 h-5" }), language === 'my' ? 'မူလ ဆက်တင်များ' : 'Default Settings'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မူလ လောင်စာဆီ စျေးနှုန်း (လီတာ)' : 'Default Fuel Price (per liter)' }), _jsx(Input, { type: "number", step: "0.01", placeholder: "1.50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မူလ လုပ်ခ (နာရီ)' : 'Default Labor Cost (per hour)' }), _jsx(Input, { type: "number", step: "0.01", placeholder: "15.00" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မူလ ဝန်ဆောင်မှုချိန် (မိနစ်)' : 'Default Service Time (minutes)' }), _jsx(Input, { type: "number", placeholder: "15" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မူလ အလုပ်ချိန် (နာရီ)' : 'Default Working Hours' }), _jsx(Input, { type: "number", placeholder: "8" })] })] }), _jsx(Button, { children: language === 'my' ? 'ဆက်တင်များ သိမ်းဆည်းမည်' : 'Save Settings' })] })] })] }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: language === 'my' ? 'လမ်းကြောင်း အကောင်းဆုံးပြုလုပ်မှု' : 'Route Optimization' }), _jsxs(Button, { onClick: loadRouteData, disabled: loading, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}` }), language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh'] })] }), _jsx("div", { className: "flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg", children: [
                    { key: 'ROUTES', label: language === 'my' ? 'လမ်းကြောင်းများ' : 'Routes', icon: Route },
                    { key: 'OPTIMIZE', label: language === 'my' ? 'အကောင်းဆုံးပြုလုပ်ရန်' : 'Optimize', icon: Zap },
                    { key: 'ANALYTICS', label: language === 'my' ? 'ခွဲခြမ်းစိတ်ဖြာမှု' : 'Analytics', icon: TrendingUp },
                    { key: 'SETTINGS', label: language === 'my' ? 'ဆက်တင်များ' : 'Settings', icon: Calculator }
                ].map(({ key, label, icon: Icon }) => (_jsxs("button", { onClick: () => setActiveTab(key), className: `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === key
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), label] }, key))) }), activeTab === 'ROUTES' && renderRoutesTab(), activeTab === 'OPTIMIZE' && renderOptimizeTab(), activeTab === 'ANALYTICS' && renderAnalyticsTab(), activeTab === 'SETTINGS' && renderSettingsTab(), selectedRoute && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-4xl max-h-[90vh] overflow-y-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: selectedRoute.route_name }), _jsx(Button, { variant: "ghost", onClick: () => setSelectedRoute(null), children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-4", children: Object.entries(calculateRouteMetrics(selectedRoute)).map(([key, value]) => (_jsxs("div", { className: "text-center p-3 bg-gray-50 rounded", children: [_jsx("div", { className: "font-medium", children: value }), _jsx("div", { className: "text-xs text-gray-600 capitalize", children: key })] }, key))) }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-3", children: language === 'my' ? 'ဝေးပွိုင့်များ' : 'Waypoints' }), _jsx("div", { className: "space-y-2", children: selectedRoute.waypoints.map((waypoint, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 border rounded", children: [_jsx("div", { className: "flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium", children: index + 1 }), getWaypointIcon(waypoint.type), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium", children: waypoint.address }), _jsxs("div", { className: "text-sm text-gray-600", children: [waypoint.type, " \u2022 ", waypoint.service_duration, " min"] })] }), _jsx(Badge, { className: getStatusColor(waypoint.status), children: language === 'my'
                                                            ? waypoint.status === 'PENDING' ? 'စောင့်ဆိုင်း'
                                                                : waypoint.status === 'ARRIVED' ? 'ရောက်ရှိ'
                                                                    : waypoint.status === 'IN_PROGRESS' ? 'လုပ်ဆောင်နေ'
                                                                        : waypoint.status === 'COMPLETED' ? 'ပြီးစီး'
                                                                            : 'မအောင်မြင်'
                                                            : waypoint.status })] }, waypoint.id))) })] })] })] }) }))] }));
}
