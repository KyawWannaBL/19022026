import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Truck, Clock, AlertTriangle, Phone, MessageSquare, Users, Package, Navigation, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { staggerContainer, staggerItem } from '@/lib/motion';
const DispatchControlPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [systemStatus, setSystemStatus] = useState('online');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [emergencyMode, setEmergencyMode] = useState(false);
    const [activeFleet, setActiveFleet] = useState(127);
    const [inTransit, setInTransit] = useState(89);
    const [pendingOrders, setPendingOrders] = useState(23);
    const [activeAlerts, setActiveAlerts] = useState(3);
    const fleetVehicles = [
        { id: 'R001', type: 'rider', name: 'Rider R001', status: 'delivering', location: 'Downtown', eta: '15min', position: { x: 45, y: 30 } },
        { id: 'D003', type: 'driver', name: 'Driver D003', status: 'loading', location: 'Warehouse A', position: { x: 20, y: 60 } },
        { id: 'R007', type: 'rider', name: 'Rider R007', status: 'break', location: 'Central Hub', position: { x: 60, y: 45 } },
        { id: 'R005', type: 'rider', name: 'Rider R005', status: 'delivering', location: 'Airport Road', position: { x: 80, y: 20 } }
    ];
    const dispatchQueue = [
        { id: 'BE2026001', priority: 'high', route: 'Yangon → Mandalay', status: 'pending' },
        { id: 'BE2026002', priority: 'normal', route: 'Downtown → Airport', status: 'pending' }
    ];
    const systemAlerts = [
        { id: 'alert1', type: 'breakdown', message: 'Vehicle R007 - Breakdown', severity: 'critical' },
        { id: 'alert2', type: 'delay', message: 'Delivery Delay - Order #BE001', severity: 'warning' },
        { id: 'alert3', type: 'traffic', message: 'Traffic Update - Route A', severity: 'info' }
    ];
    const liveUpdates = [
        { id: 1, type: 'delivery', message: 'R001 completed delivery #BE2026001', time: '2 minutes ago' },
        { id: 2, type: 'route', message: 'D003 assigned new optimized route', time: '5 minutes ago' },
        { id: 3, type: 'pickup', message: 'R005 assigned pickup #BE2026003', time: '8 minutes ago' }
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const toggleEmergencyMode = () => {
        setEmergencyMode(!emergencyMode);
        toast({
            title: emergencyMode ? "Emergency Mode Disabled" : "Emergency Mode Activated",
            description: emergencyMode ? "System returned to normal operation" : "All units notified of emergency protocol",
            variant: emergencyMode ? "default" : "destructive",
        });
    };
    const autoAssignOrder = (orderId) => {
        toast({
            title: "Order Assigned",
            description: `Order ${orderId} has been automatically assigned to available rider`,
        });
    };
    const broadcastMessage = () => {
        toast({
            title: "Message Broadcasted",
            description: "Alert sent to all active fleet members",
        });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivering':
                return 'bg-success';
            case 'loading':
                return 'bg-info';
            case 'break':
                return 'bg-warning';
            case 'available':
                return 'bg-muted';
            case 'offline':
                return 'bg-error';
            default:
                return 'bg-muted';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'delivering':
                return 'Delivering';
            case 'loading':
                return 'Loading';
            case 'break':
                return 'Break';
            case 'available':
                return 'Available';
            case 'offline':
                return 'Offline';
            default:
                return status;
        }
    };
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'high':
                return _jsx(Badge, { className: "bg-error text-white", children: "HIGH" });
            case 'normal':
                return _jsx(Badge, { className: "bg-info text-white", children: "NORMAL" });
            case 'low':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: "LOW" });
            default:
                return _jsx(Badge, { variant: "outline", children: priority.toUpperCase() });
        }
    };
    const getAlertIcon = (type) => {
        switch (type) {
            case 'breakdown':
                return _jsx(AlertTriangle, { className: "w-4 h-4" });
            case 'delay':
                return _jsx(Clock, { className: "w-4 h-4" });
            case 'traffic':
                return _jsx(Navigation, { className: "w-4 h-4" });
            case 'emergency':
                return _jsx(Shield, { className: "w-4 h-4" });
            default:
                return _jsx(AlertTriangle, { className: "w-4 h-4" });
        }
    };
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Radio, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Dispatch Control Center" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time Operations Command" })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full animate-pulse" }), _jsx("span", { className: "text-sm font-medium", children: "System Online" })] }), _jsx("div", { className: "text-right", children: _jsx("div", { className: "font-mono text-lg font-bold", children: currentTime.toLocaleTimeString() }) }), _jsxs(Button, { onClick: toggleEmergencyMode, variant: emergencyMode ? "destructive" : "outline", className: emergencyMode ? "animate-pulse" : "", children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), "EMERGENCY"] })] })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Fleet" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: activeFleet })] }), _jsx(Users, { className: "h-8 w-8 text-info" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "In Transit" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: inTransit })] }), _jsx(Truck, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Pending" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: pendingOrders })] }), _jsx(Package, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Alerts" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: activeAlerts })] }), _jsx(AlertTriangle, { className: "h-8 w-8 text-error" })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Fleet Status" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: fleetVehicles.map((vehicle) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${getStatusColor(vehicle.status)}` }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: vehicle.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [getStatusText(vehicle.status), " - ", vehicle.eta ? `ETA ${vehicle.eta}` : vehicle.location] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Phone, { className: "w-4 h-4" }) })] }, vehicle.id))) }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Dispatch Queue" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: dispatchQueue.map((order) => (_jsxs("div", { className: "p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("span", { className: "font-medium", children: ["Order #", order.id] }), getPriorityBadge(order.priority)] }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: order.route }), _jsx(Button, { size: "sm", className: "w-full", onClick: () => autoAssignOrder(order.id), children: "Auto Assign" })] }, order.id))) }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Communications" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { className: "w-full", onClick: broadcastMessage, children: [_jsx(MessageSquare, { className: "w-4 h-4 mr-2" }), "Broadcast All"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(Phone, { className: "w-4 h-4 mr-2" }), "Emergency Call"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(AlertTriangle, { className: "w-4 h-4 mr-2" }), "Send Alert"] })] }) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Live Fleet Tracking" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "relative bg-muted/20 rounded-lg h-64 overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50", children: [_jsx("div", { className: "absolute top-1/2 left-0 right-0 h-1 bg-gray-300" }), _jsx("div", { className: "absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300" }), fleetVehicles.map((vehicle) => (_jsx("div", { className: "absolute transform -translate-x-1/2 -translate-y-1/2", style: {
                                                            left: `${vehicle.position.x}%`,
                                                            top: `${vehicle.position.y}%`
                                                        }, children: _jsx("div", { className: `w-3 h-3 rounded-full ${getStatusColor(vehicle.status)} border-2 border-white shadow-lg` }) }, vehicle.id))), _jsx("div", { className: "absolute top-[60%] left-[20%] transform -translate-x-1/2 -translate-y-1/2", children: _jsx("div", { className: "w-4 h-4 bg-purple-500 rounded border-2 border-white shadow-lg" }) }), _jsx("div", { className: "absolute top-[40%] left-[80%] transform -translate-x-1/2 -translate-y-1/2", children: _jsx("div", { className: "w-4 h-4 bg-purple-500 rounded border-2 border-white shadow-lg" }) })] }), _jsx("div", { className: "absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs", children: _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full" }), _jsx("span", { children: "Active Delivery" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-info rounded-full" }), _jsx("span", { children: "En Route" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-warning rounded-full" }), _jsx("span", { children: "Pickup" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded" }), _jsx("span", { children: "Warehouse" })] })] }) })] }) })] }) }), _jsxs(motion.div, { variants: staggerItem, className: "space-y-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Avg Delivery Time" }), _jsx("p", { className: "text-xl font-bold", children: "23 min" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Success Rate" }), _jsx("p", { className: "text-xl font-bold", children: "98.5%" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Fleet Utilization" }), _jsx("p", { className: "text-xl font-bold", children: "87%" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Fuel Savings" }), _jsx("p", { className: "text-xl font-bold text-success", children: "15%" })] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Active Alerts" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: systemAlerts.map((alert) => (_jsxs("div", { className: "flex items-center space-x-3 p-3 border rounded-lg", children: [_jsx("div", { className: `p-1 rounded ${alert.severity === 'critical' ? 'bg-error/10 text-error' :
                                                            alert.severity === 'warning' ? 'bg-warning/10 text-warning' :
                                                                'bg-info/10 text-info'}`, children: getAlertIcon(alert.type) }), _jsx("span", { className: "text-sm", children: alert.message })] }, alert.id))) }) })] })] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Live Updates" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: liveUpdates.map((update) => (_jsxs("div", { className: "flex items-center space-x-4 p-3 border rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full animate-pulse" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: update.message }), _jsx("p", { className: "text-xs text-muted-foreground", children: update.time })] })] }, update.id))) }) })] }) })] }));
};
export default DispatchControlPage;
