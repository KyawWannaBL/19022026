import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Calendar, Clock, Search, Plus, Filter, MoreVertical, ChevronRight, ArrowRight, Activity, Navigation, ShieldCheck } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
const TransitRoutePage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState('');
    // Mock data for transit routes
    const transitRoutes = [
        {
            id: 'TR-2026-001',
            name: 'Yangon - Mandalay Express',
            origin: 'Yangon Main Hub',
            destination: 'Mandalay Distribution Center',
            vehicle: 'HINO-500 (YGN-1A/4582)',
            driver: 'Kyaw Zeya',
            status: 'In Transit',
            departure: '2026-02-04 06:00 AM',
            arrival: '2026-02-04 04:00 PM',
            loadFactor: 85,
        },
        {
            id: 'TR-2026-002',
            name: 'Naypyidaw Connector',
            origin: 'Yangon Main Hub',
            destination: 'Naypyidaw Station',
            vehicle: 'ISUZU-FTR (YGN-2B/9912)',
            driver: 'Aung Myo',
            status: 'Scheduled',
            departure: '2026-02-05 08:00 AM',
            arrival: '2026-02-05 02:00 PM',
            loadFactor: 0,
        },
        {
            id: 'TR-2026-003',
            name: 'Bago Region Distribution',
            origin: 'Yangon Main Hub',
            destination: 'Bago Branch',
            vehicle: 'TOYOTA-DYNA (YGN-3C/1123)',
            driver: 'Min Thant',
            status: 'Active',
            departure: 'Daily 09:00 AM',
            arrival: 'Daily 12:00 PM',
            loadFactor: 92,
        },
        {
            id: 'TR-2026-004',
            name: 'Taunggyi Highlands',
            origin: 'Mandalay Hub',
            destination: 'Taunggyi Station',
            vehicle: 'HINO-700 (MDY-4D/7788)',
            driver: 'Zaw Win',
            status: 'Maintenance',
            departure: 'Tues/Fri 05:00 AM',
            arrival: 'Tues/Fri 06:00 PM',
            loadFactor: 0,
        },
    ];
    const stats = [
        { label: 'Active Routes', value: '12', icon: Navigation, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Vehicles in Transit', value: '8', icon: Truck, color: 'text-gold-500', bg: 'bg-gold-500/10' },
        { label: 'Average Load Factor', value: '78%', icon: Activity, color: 'text-success', bg: 'bg-success/10' },
        { label: 'Safety Incidents', value: '0', icon: ShieldCheck, color: 'text-destructive', bg: 'bg-destructive/10' },
    ];
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900", children: t('way.transitRoute') }), _jsx("p", { className: "text-muted-foreground", children: "Manage long-haul transit lines, vehicle assignments, and schedules." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-gold-400 text-navy-900", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), "View Calendar"] }), _jsxs(Button, { className: "bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), t('common.add'), " New Route"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: idx * 0.1 }, children: _jsx(Card, { className: "border-none shadow-sm lotus-card overflow-hidden group", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gold-400/80 uppercase tracking-wider", children: stat.label }), _jsx("p", { className: "text-2xl font-bold text-white mt-1 font-mono", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`, children: _jsx(stat.icon, { className: `h-6 w-6 ${stat.color}` }) })] }) }) }) }, idx))) }), _jsx(Card, { className: "border-border shadow-sm", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 w-full", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search routes, vehicles, or drivers...", className: "pl-10 w-full", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex items-center gap-2 w-full md:w-auto", children: [_jsxs(Select, { defaultValue: "all", children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "transit", children: "In Transit" }), _jsx(SelectItem, { value: "maintenance", children: "Maintenance" })] })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), t('common.filter')] })] })] }) }) }), _jsxs(Card, { className: "border-border shadow-lg overflow-hidden", children: [_jsxs(CardHeader, { className: "bg-muted/30 border-b", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-gold-600" }), "Linehaul Route Registry"] }), _jsx(CardDescription, { children: "Comprehensive list of all branch-to-branch transit connections" })] }), _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "font-bold", children: "Route & ID" }), _jsx(TableHead, { className: "font-bold", children: "Connection Path" }), _jsx(TableHead, { className: "font-bold", children: "Vehicle & Driver" }), _jsx(TableHead, { className: "font-bold", children: "Schedule" }), _jsx(TableHead, { className: "font-bold text-center", children: "Load" }), _jsx(TableHead, { className: "font-bold", children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: transitRoutes.map((route) => (_jsxs(TableRow, { className: "hover:bg-muted/30 transition-colors group", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-navy-900", children: route.name }), _jsx("span", { className: "text-xs text-muted-foreground font-mono", children: route.id })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("span", { className: "font-semibold", children: route.origin }), _jsx(ArrowRight, { className: "h-3 w-3 text-gold-600" }), _jsx("span", { className: "font-semibold", children: route.destination })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col text-sm", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Truck, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { children: route.vehicle })] }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Driver: ", route.driver] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col text-sm", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { children: route.departure })] }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["ETA: ", route.arrival] })] }) }), _jsx(TableCell, { className: "text-center", children: _jsxs("div", { className: "flex flex-col items-center gap-1", children: [_jsx("div", { className: "w-16 h-1.5 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gold-500", style: { width: `${route.loadFactor}%` } }) }), _jsxs("span", { className: "text-[10px] font-mono font-bold", children: [route.loadFactor, "%"] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { className: `rounded-md font-semibold ${route.status === 'In Transit' ? 'bg-info/20 text-info border-info/30' :
                                                        route.status === 'Active' ? 'bg-success/20 text-success border-success/30' :
                                                            route.status === 'Scheduled' ? 'bg-warning/20 text-warning border-warning/30' :
                                                                'bg-destructive/20 text-destructive border-destructive/30'}`, variant: "outline", children: route.status }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-gold-500/10", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Activity, { className: "mr-2 h-4 w-4" }), " Tracking Details"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Edit Schedule"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Truck, { className: "mr-2 h-4 w-4" }), " Change Vehicle"] }), _jsx(DropdownMenuItem, { className: "cursor-pointer text-destructive", children: "Deactivate Route" })] })] }) })] }, route.id))) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 border-border shadow-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Regional Route Network" }), _jsx(CardDescription, { children: "Real-time visualization of transit corridor performance" })] }), _jsx(CardContent, { className: "h-[300px] flex items-center justify-center bg-muted/20 rounded-b-xl border-t", children: _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Navigation, { className: "h-12 w-12 text-muted-foreground mx-auto animate-pulse" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Interactive Transit Map Loading..." })] }) })] }), _jsxs(Card, { className: "border-border shadow-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Upcoming Maintenance" }), _jsx(CardDescription, { children: "Scheduled vehicle service alerts" })] }), _jsx(CardContent, { className: "space-y-4", children: [1, 2].map((i) => (_jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg bg-muted/40", children: [_jsx("div", { className: "p-2 bg-destructive/10 rounded-lg", children: _jsx(ShieldCheck, { className: "h-4 w-4 text-destructive" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: "HINO-700 (MDY-4D/7788)" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Engine diagnostics required by 2026-02-10" }), _jsxs(Button, { variant: "link", size: "sm", className: "h-auto p-0 text-gold-600 text-xs", children: ["Schedule Now ", _jsx(ChevronRight, { className: "h-3 w-3" })] })] })] }, i))) })] })] })] }));
};
export default TransitRoutePage;
