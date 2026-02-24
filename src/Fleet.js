import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Fuel, Wrench, Navigation2, Search, Filter, Activity, Users, Map as MapIcon, List, Calendar, AlertTriangle, Zap, ChevronRight, Plus } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { useLanguage } from '@/contexts/LanguageContext';
import { FleetStatus } from '@/components/FleetStatus';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
const MOCK_VEHICLES = [
    {
        id: 'V-001',
        plateNumber: 'NY-8829-TR',
        type: 'TRUCK',
        status: 'ACTIVE',
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        assignedRiderId: 'R-101',
        fuelLevel: 82,
        lastService: '2026-01-15',
    },
    {
        id: 'V-002',
        plateNumber: 'CA-2210-VN',
        type: 'VAN',
        status: 'ACTIVE',
        currentLocation: { lat: 34.0522, lng: -118.2437 },
        assignedRiderId: 'R-105',
        fuelLevel: 45,
        lastService: '2025-12-10',
    },
    {
        id: 'V-003',
        plateNumber: 'TX-4491-MC',
        type: 'MOTORCYCLE',
        status: 'IN_USE',
        currentLocation: { lat: 29.7604, lng: -95.3698 },
        assignedRiderId: 'R-112',
        fuelLevel: 95,
        lastService: '2026-02-01',
    },
    {
        id: 'V-004',
        plateNumber: 'FL-3382-TR',
        type: 'TRUCK',
        status: 'MAINTENANCE',
        currentLocation: { lat: 25.7617, lng: -80.1918 },
        fuelLevel: 12,
        lastService: '2026-02-16',
    },
    {
        id: 'V-005',
        plateNumber: 'IL-5563-VN',
        type: 'VAN',
        status: 'ACTIVE',
        currentLocation: { lat: 41.8781, lng: -87.6298 },
        assignedRiderId: 'R-120',
        fuelLevel: 68,
        lastService: '2026-01-20',
    },
];
const MetricsCard = ({ title, value, icon: Icon, trend }) => (_jsx(Card, { className: "luxury-card overflow-hidden", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: title }), _jsx("h3", { className: "text-2xl font-bold font-mono", children: value }), trend && (_jsxs("div", { className: `flex items-center gap-1 mt-2 text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`, children: [_jsx("span", { children: trend.isPositive ? '↑' : '↓' }), _jsxs("span", { children: [trend.value, "% vs last month"] })] }))] }), _jsx("div", { className: "p-3 rounded-xl bg-primary/10 border border-primary/20", children: _jsx(Icon, { className: "w-5 h-5 text-primary" }) })] }) }) }));
const MapMock = () => (_jsxs("div", { className: "relative w-full h-[600px] bg-muted rounded-2xl overflow-hidden border border-border group", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity transition-transform duration-[2000ms] group-hover:scale-105", style: { backgroundImage: `url(${IMAGES.DELIVERY_FLEET_3})` } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/40" }), MOCK_VEHICLES.map((v, i) => (_jsx(motion.div, { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: i * 0.1, type: 'spring', stiffness: 200 }, className: "absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/marker z-10", style: {
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
            }, children: _jsxs("div", { className: "relative flex flex-col items-center", children: [_jsx("div", { className: `p-2 rounded-full shadow-luxury border-2 transition-all duration-300 group-hover/marker:scale-125 ${v.status === 'MAINTENANCE' ? 'bg-destructive border-destructive-foreground' : 'bg-primary border-primary-foreground'}`, children: _jsx(Truck, { className: "w-4 h-4 text-primary-foreground" }) }), _jsxs("div", { className: "mt-2 bg-card/90 backdrop-blur-md px-3 py-1 rounded-lg border border-border text-[10px] font-mono whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all shadow-xl", children: [_jsx("div", { className: "font-bold", children: v.plateNumber }), _jsxs("div", { className: "text-muted-foreground", children: [v.fuelLevel, "% Fuel Remaining"] })] })] }) }, v.id))), _jsxs("div", { className: "absolute bottom-6 right-6 flex flex-col gap-3 z-20", children: [_jsx(Button, { size: "icon", variant: "secondary", className: "rounded-xl luxury-glass hover:bg-primary/20", children: _jsx(Zap, { className: "w-4 h-4" }) }), _jsx(Button, { size: "icon", variant: "secondary", className: "rounded-xl luxury-glass hover:bg-primary/20", children: _jsx(Navigation2, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "absolute top-6 left-6 bg-background/95 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl z-20", children: [_jsx("h4", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3", children: "Real-time Fleet Status" }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" }), _jsx("span", { className: "text-xs font-semibold", children: "42 Active Vehicles" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]" }), _jsx("span", { className: "text-xs font-semibold", children: "5 In Maintenance" })] })] })] })] }));
export default function Fleet() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('map');
    const filteredVehicles = MOCK_VEHICLES.filter(v => v.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto w-full min-h-screen bg-background text-foreground", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6", children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, children: [_jsx(Badge, { variant: "outline", className: "mb-3 border-primary/30 text-primary bg-primary/10 px-3 py-1 rounded-full", children: "Enterprise Logistics 2026" }), _jsx("h1", { className: "text-4xl font-extrabold tracking-tight text-foreground font-heading", children: "Fleet Management" }), _jsx("p", { className: "text-muted-foreground mt-2 max-w-xl", children: "Advanced asset monitoring, predictive maintenance, and real-time operational efficiency control center." })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "outline", className: "luxury-glass border-border hover:border-primary/50 gap-2 h-11", children: [_jsx(Wrench, { className: "w-4 h-4" }), "Maintenance Hub"] }), _jsxs(Button, { className: "luxury-button gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), "Register Asset"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(MetricsCard, { title: "Active Fleet", value: "42", icon: Truck, trend: { value: 4, isPositive: true } }), _jsx(MetricsCard, { title: "Fuel Efficiency", value: "78.4%", icon: Fuel, trend: { value: 1.2, isPositive: true } }), _jsx(MetricsCard, { title: "In Maintenance", value: "05", icon: AlertTriangle, trend: { value: 2, isPositive: false } }), _jsx(MetricsCard, { title: "Drivers Online", value: "38", icon: Users, trend: { value: 12, isPositive: true } })] }), _jsxs(Tabs, { defaultValue: "map", className: "w-full space-y-8", onValueChange: setActiveTab, children: [_jsxs("div", { className: "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6", children: [_jsxs(TabsList, { className: "bg-card/50 border border-border p-1 rounded-xl luxury-glass", children: [_jsxs(TabsTrigger, { value: "map", className: "gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [_jsx(MapIcon, { className: "w-4 h-4" }), "Live Tracking"] }), _jsxs(TabsTrigger, { value: "inventory", className: "gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [_jsx(List, { className: "w-4 h-4" }), "Asset Inventory"] }), _jsxs(TabsTrigger, { value: "maintenance", className: "gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [_jsx(Calendar, { className: "w-4 h-4" }), "Schedule"] })] }), _jsxs("div", { className: "flex items-center gap-3 w-full lg:w-auto", children: [_jsxs("div", { className: "relative flex-1 lg:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search by plate, ID or rider...", className: "pl-10 h-11 bg-card/50 border-border focus:border-primary/50 transition-all rounded-xl", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", className: "h-11 w-11 rounded-xl luxury-glass border-border", children: _jsx(Filter, { className: "w-4 h-4" }) })] })] }), _jsxs(AnimatePresence, { mode: "wait", children: [_jsx(TabsContent, { value: "map", className: "mt-0 focus-visible:outline-none", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("div", { className: "lg:col-span-8 shadow-luxury", children: _jsx(MapMock, {}) }), _jsx("div", { className: "lg:col-span-4", children: _jsxs(Card, { className: "h-[600px] luxury-card flex flex-col", children: [_jsxs(CardHeader, { className: "border-b border-border/50 pb-6", children: [_jsxs(CardTitle, { className: "text-xl flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: _jsx(Activity, { className: "w-5 h-5 text-primary" }) }), "Active Feed"] }), _jsx(CardDescription, { children: "Real-time vehicle telemetry stream" })] }), _jsx(CardContent, { className: "p-0 flex-1 overflow-hidden", children: _jsx(ScrollArea, { className: "h-full", children: _jsx("div", { className: "p-6 space-y-4", children: filteredVehicles.map((vehicle) => (_jsxs("div", { className: "p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-background border border-border group-hover:bg-primary/5", children: _jsx(Truck, { className: "w-4 h-4 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold font-mono text-sm", children: vehicle.plateNumber }), _jsxs("p", { className: "text-[10px] text-muted-foreground", children: [vehicle.type, " \u2022 ID: ", vehicle.id] })] })] }), _jsx(StatusBadge, { status: vehicle.status, type: "user", size: "sm" })] }), _jsxs("div", { className: "flex items-center gap-4 mt-4", children: [_jsx("div", { className: "flex-1 h-1 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: `h-full transition-all duration-1000 ${vehicle.fuelLevel < 20 ? 'bg-destructive' : 'bg-primary'}`, style: { width: `${vehicle.fuelLevel}%` } }) }), _jsxs("span", { className: "text-[10px] font-mono font-bold", children: [vehicle.fuelLevel, "%"] })] })] }, vehicle.id))) }) }) }), _jsx("div", { className: "p-4 border-t border-border/50 bg-muted/20", children: _jsxs(Button, { variant: "ghost", className: "w-full text-primary hover:bg-primary/10 gap-2 group text-xs uppercase tracking-widest font-bold", children: ["Full Analytics", _jsx(ChevronRight, { className: "w-4 h-4 transition-transform group-hover:translate-x-1" })] }) })] }) })] }) }), _jsx(TabsContent, { value: "inventory", className: "mt-0 focus-visible:outline-none", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: _jsx(FleetStatus, { vehicles: filteredVehicles, realTimeUpdates: true }) }) }), _jsx(TabsContent, { value: "maintenance", className: "mt-0 focus-visible:outline-none", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, className: "relative rounded-3xl overflow-hidden border border-border h-[500px] flex items-center justify-center bg-card/50 shadow-luxury", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-overlay", style: { backgroundImage: `url(${IMAGES.WAREHOUSE_OPS_5})` } }), _jsxs("div", { className: "relative z-10 text-center space-y-6 p-8", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20", children: _jsx(Calendar, { className: "w-10 h-10 text-primary" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-2xl font-bold font-heading", children: "Maintenance Intelligence" }), _jsx("p", { className: "text-muted-foreground max-w-md mx-auto", children: "Our AI-driven maintenance scheduler predicts vehicle failure 48 hours in advance using historical telemetry and real-time sensor data." })] }), _jsx(Button, { className: "luxury-button", children: "Launch Scheduler" })] })] }) })] })] }), _jsxs("footer", { className: "flex flex-col md:flex-row justify-between items-center gap-4 py-8 border-t border-border/50 mt-12 text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]", children: [_jsx("p", { children: "\u00A9 2026 FleetOps Intelligence System \u2022 BRT-OS v4.2.0" }), _jsxs("div", { className: "flex gap-8 items-center", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" }), "GPS Satellite Uplink Active"] }), _jsx("span", { children: "Last Sync: 2026-02-19 12:44:10" })] })] })] }));
}
