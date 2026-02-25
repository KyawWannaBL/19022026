import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ChevronRight, MapPin, Package, TrendingUp, Truck, Users, Search, Download } from 'lucide-react';
import { formatCurrency, formatDate, } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuditFeed } from '@/components/AuditFeed';
import { FleetStatus } from '@/components/FleetStatus'; // Changed to named import
import { StatusBadge } from '@/components/StatusBadge'; // Changed to named import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IMAGES } from '@/assets/images';
import { springPresets, staggerContainer, staggerItem } from '@/lib/motion';
const MOCK_EXCEPTIONS = [
    {
        id: 'SHP-001',
        awb: 'BRT-2026-948271',
        senderName: 'Yangon Electronics',
        receiverName: 'U Kyaw Zay Yar',
        origin: 'Yangon',
        destinationTownship: 'Mandalay',
        status: 'EXCEPTION',
        priority: 'HIGH',
        createdAt: '2026-02-18T10:30:00Z',
        metadata: { reason: 'Address Unreachable' }
    },
    {
        id: 'SHP-002',
        awb: 'BRT-2026-112345',
        senderName: 'Elite Fashion',
        receiverName: 'Daw Aye Myat',
        origin: 'Bago',
        destinationTownship: 'Taunggyi',
        status: 'EXCEPTION',
        priority: 'MEDIUM',
        createdAt: '2026-02-19T08:15:00Z',
        metadata: { reason: 'Weather Delay' }
    }
];
const MOCK_VEHICLES = [
    {
        id: 'V-101',
        plateNumber: 'YGN-7721',
        type: 'TRUCK',
        status: 'ACTIVE',
        currentLocation: { lat: 16.8661, lng: 96.1951 },
        fuelLevel: 85,
        lastService: '2026-01-15'
    },
    {
        id: 'V-102',
        plateNumber: 'MDY-4490',
        type: 'VAN',
        status: 'IN_USE',
        currentLocation: { lat: 21.9588, lng: 96.0891 },
        fuelLevel: 42,
        lastService: '2026-02-01'
    }
];
export default function SupervisorDashboard() {
    const { language } = useLanguage(); // Assuming useLanguage returns language string or object
    const [searchQuery, setSearchQuery] = useState('');
    // 1. Fixed Search Logic
    const filteredExceptions = useMemo(() => {
        return MOCK_EXCEPTIONS.filter(s => s.awb.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.senderName?.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);
    const stats = useMemo(() => [
        {
            label: 'Total Shipments',
            value: '1,284',
            change: '+12.5%',
            icon: _jsx(Package, { className: "h-5 w-5 text-luxury-gold" }),
            description: 'Active for Feb 2026'
        },
        {
            label: 'Active Routes',
            value: '42',
            change: '+3',
            icon: _jsx(Truck, { className: "h-5 w-5 text-luxury-gold" }),
            description: 'Currently monitored'
        },
        {
            label: 'Critical Exceptions',
            value: '08',
            change: '-2',
            icon: _jsx(AlertTriangle, { className: "h-5 w-5 text-destructive" }),
            description: 'Immediate action required'
        },
        {
            label: 'Operational Revenue',
            value: formatCurrency(45200000),
            change: '+8.2%',
            icon: _jsx(TrendingUp, { className: "h-5 w-5 text-luxury-gold" }),
            description: 'Month to date'
        }
    ], []);
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground p-6 space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Supervisor Command Center" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time operational oversight and delivery integrity." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-luxury-gold/30 hover:border-luxury-gold", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Report"] }), _jsxs(Button, { className: "bg-luxury-gold text-black hover:bg-luxury-gold/90 font-bold", children: [_jsx(Activity, { className: "mr-2 h-4 w-4" }), "Live View"] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "luxury-card border-none shadow-xl overflow-hidden relative bg-card/50 backdrop-blur-sm", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" }), _jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2 space-y-0", children: [_jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("div", { className: "p-2 rounded-full bg-secondary/50", children: stat.icon })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stat.value }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("span", { className: `text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`, children: stat.change }), _jsx("p", { className: "text-xs text-muted-foreground", children: stat.description })] })] })] }) }, idx))) }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [_jsxs("div", { className: "xl:col-span-2 space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none bg-card/30", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Shipment Exceptions" }), _jsx(CardDescription, { children: "Flagged for delays or processing errors." })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: "relative w-64", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search AWB...", className: "pl-9 bg-secondary/30 border-none focus-visible:ring-luxury-gold/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) })] }), _jsx(CardContent, { children: _jsx("div", { className: "relative overflow-x-auto rounded-xl", children: _jsxs("table", { className: "w-full text-sm text-left", children: [_jsx("thead", { className: "text-xs text-muted-foreground uppercase bg-secondary/50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3", children: "AWB / Tracking" }), _jsx("th", { className: "px-4 py-3", children: "Route" }), _jsx("th", { className: "px-4 py-3", children: "Reason" }), _jsx("th", { className: "px-4 py-3", children: "Status" }), _jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-white/5", children: filteredExceptions.map((shipment) => (_jsxs("tr", { className: "hover:bg-secondary/20 transition-colors", children: [_jsxs("td", { className: "px-4 py-4", children: [_jsx("div", { className: "font-mono font-bold text-luxury-gold", children: shipment.awb }), _jsx("div", { className: "text-xs text-muted-foreground", children: shipment.senderName })] }), _jsxs("td", { className: "px-4 py-4 text-xs", children: [_jsxs("div", { className: "flex items-center gap-1 font-medium", children: [_jsx("span", { children: shipment.senderName }), _jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { children: shipment.destinationTownship })] }), _jsx("div", { className: "text-muted-foreground", children: formatDate(shipment.createdAt || '') })] }), _jsx("td", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center gap-2 text-destructive font-medium text-xs", children: [_jsx(AlertTriangle, { className: "h-3 w-3" }), shipment.metadata?.reason] }) }), _jsx("td", { className: "px-4 py-4", children: _jsx(StatusBadge, { status: shipment.status, size: "sm" }) }), _jsx("td", { className: "px-4 py-4 text-right", children: _jsx(Button, { variant: "ghost", size: "sm", className: "hover:text-luxury-gold hover:bg-luxury-gold/10", children: "Investigate" }) })] }, shipment.id))) })] }) }) })] }), _jsxs(Card, { className: "luxury-card border-none overflow-hidden h-[400px] relative bg-card/30", children: [_jsx("img", { src: IMAGES.DASHBOARD_ANALYTICS_4, className: "absolute inset-0 w-full h-full object-cover opacity-10 grayscale", alt: "Fleet Map" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }), _jsxs("div", { className: "absolute top-6 left-6 z-10", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-luxury-gold" }), "Branch Coverage Map"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Active delivery clusters for Yangon & Mandalay." })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-4 px-8 py-6 luxury-glass rounded-2xl border border-white/10 shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" }), _jsx("span", { className: "text-sm font-semibold tracking-wider", children: "GPS LINK ACTIVE" })] }), _jsx(Button, { className: "bg-transparent border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-black transition-all duration-300 px-8", children: "Open Interactive Map" })] }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none bg-card/30", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: "Fleet Status" }), _jsx(StatusBadge, { status: "ACTIVE", size: "sm" })] }) }), _jsx(CardContent, { children: _jsx(FleetStatus, { vehicles: MOCK_VEHICLES }) })] }), _jsxs(Card, { className: "luxury-card border-none bg-card/30", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: "System Audit" }), _jsx(CardDescription, { children: "Recent administrative actions." })] }), _jsx(CardContent, { children: _jsx(AuditFeed, { maxEntries: 5 }) })] }), _jsxs(Card, { className: "luxury-card border-none bg-gradient-to-br from-luxury-gold/15 to-transparent border border-luxury-gold/10", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2 uppercase tracking-widest opacity-70", children: [_jsx(Users, { className: "h-4 w-4" }), "Branch Capacity"] }) }), _jsxs(CardContent, { className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-[10px] uppercase font-bold tracking-tighter", children: [_jsx("span", { className: "text-muted-foreground", children: "Active Riders" }), _jsx("span", { className: "text-luxury-gold", children: "28 / 35" })] }), _jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden border border-white/5", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: '80%' }, transition: springPresets.slow, className: "h-full bg-luxury-gold" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-[10px] uppercase font-bold tracking-tighter", children: [_jsx("span", { className: "text-muted-foreground", children: "Warehouse Load" }), _jsx("span", { className: "text-destructive", children: "92%" })] }), _jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden border border-white/5", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: '92%' }, transition: springPresets.slow, className: "h-full bg-destructive" }) })] })] })] })] })] })] }));
}
