import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ChevronRight, MapPin, Package, TrendingUp, Truck, Users, Search, Filter, Download } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuditFeed } from '@/components/AuditFeed';
import { FleetStatus } from '@/components/FleetStatus';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IMAGES } from '@/assets/images';
import { staggerContainer, staggerItem } from '@/lib/motion';
const MOCK_EXCEPTIONS = [
    {
        id: 'SHP-001',
        trackingNumber: 'BRT-2026-948271',
        senderName: 'Yangon Electronics',
        receiverName: 'U Kyaw Zay Yar',
        origin: 'Yangon',
        destination: 'Mandalay',
        status: 'EXCEPTION',
        priority: 'HIGH',
        created_at: '2026-02-18T10:30:00Z',
        metadata: { reason: 'Address Unreachable' }
    },
    {
        id: 'SHP-002',
        trackingNumber: 'BRT-2026-112345',
        senderName: 'Elite Fashion',
        receiverName: 'Daw Aye Myat',
        origin: 'Bago',
        destination: 'Taunggyi',
        status: 'EXCEPTION',
        priority: 'MEDIUM',
        created_at: '2026-02-19T08:15:00Z',
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
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
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
            value: formatCurrency(45200000, 'MMK'),
            change: '+8.2%',
            icon: _jsx(TrendingUp, { className: "h-5 w-5 text-luxury-gold" }),
            description: 'Month to date'
        }
    ], []);
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground p-6 space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Supervisor Command Center" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time operational oversight for branch performance and delivery integrity." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-luxury-gold/30 hover:border-luxury-gold", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Report"] }), _jsxs(Button, { className: "bg-luxury-gold text-luxury-obsidian hover:bg-luxury-dark-gold", children: [_jsx(Activity, { className: "mr-2 h-4 w-4" }), "Live View"] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "luxury-card border-none shadow-luxury overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" }), _jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2 space-y-0", children: [_jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("div", { className: "p-2 rounded-full bg-secondary/50", children: stat.icon })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stat.value }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("span", { className: `text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`, children: stat.change }), _jsx("p", { className: "text-xs text-muted-foreground", children: stat.description })] })] })] }) }, idx))) }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [_jsxs("div", { className: "xl:col-span-2 space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Shipment Exceptions" }), _jsx(CardDescription, { children: "Shipments flagged for delays or processing errors." })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-64", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search AWB...", className: "pl-9 bg-secondary/30 border-none", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "secondary", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }), _jsx(CardContent, { children: _jsx("div", { className: "relative overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left", children: [_jsx("thead", { className: "text-xs text-muted-foreground uppercase bg-secondary/50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3", children: "AWB / Tracking" }), _jsx("th", { className: "px-4 py-3", children: "Route" }), _jsx("th", { className: "px-4 py-3", children: "Reason" }), _jsx("th", { className: "px-4 py-3", children: "Status" }), _jsx("th", { className: "px-4 py-3", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-border", children: MOCK_EXCEPTIONS.map((shipment) => (_jsxs("tr", { className: "hover:bg-secondary/20 transition-colors", children: [_jsxs("td", { className: "px-4 py-4", children: [_jsx("div", { className: "font-mono font-bold text-luxury-gold", children: shipment.trackingNumber }), _jsx("div", { className: "text-xs text-muted-foreground", children: shipment.senderName })] }), _jsxs("td", { className: "px-4 py-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { children: shipment.origin }), _jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { children: shipment.destination })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: formatDate(shipment.created_at || '') })] }), _jsx("td", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center gap-2 text-destructive font-medium", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), shipment.metadata?.reason] }) }), _jsx("td", { className: "px-4 py-4", children: _jsx(StatusBadge, { status: shipment.status, type: "shipment", size: "sm" }) }), _jsx("td", { className: "px-4 py-4", children: _jsx(Button, { variant: "ghost", size: "sm", className: "hover:text-luxury-gold", children: "Investigate" }) })] }, shipment.id))) })] }) }) })] }), _jsxs(Card, { className: "luxury-card border-none overflow-hidden h-[400px] relative", children: [_jsx("img", { src: IMAGES.DASHBOARD_ANALYTICS_4, className: "absolute inset-0 w-full h-full object-cover opacity-20 grayscale", alt: "Fleet Map" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }), _jsxs("div", { className: "absolute top-4 left-4 z-10", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-luxury-gold" }), "Branch Coverage Map"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Visualizing active delivery clusters in 2026." })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-2 px-6 py-4 luxury-glass rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-center gap-4 mb-4", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-luxury-gold animate-pulse" }), _jsx("span", { className: "text-sm font-medium", children: "Live Tracking System Online" })] }), _jsx(Button, { variant: "outline", className: "border-luxury-gold text-luxury-gold", children: "Initialize High-Resolution Map" })] }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: "Fleet Overview" }), _jsx(StatusBadge, { status: "ACTIVE", type: "user", size: "sm" })] }) }), _jsx(CardContent, { children: _jsx(FleetStatus, { vehicles: MOCK_VEHICLES, realTimeUpdates: true }) })] }), _jsxs(Card, { className: "luxury-card border-none", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardTitle, { className: "text-lg", children: "System Security & Audit" }), _jsx(CardDescription, { children: "Recent administrative and operational actions." })] }), _jsx(CardContent, { className: "max-h-[500px] overflow-y-auto", children: _jsx(AuditFeed, { maxEntries: 8 }) })] }), _jsxs(Card, { className: "luxury-card border-none bg-gradient-to-br from-luxury-gold/10 to-transparent", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), "Staffing Capacity"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Active Riders" }), _jsx("span", { className: "font-bold", children: "28 / 35" })] }), _jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-luxury-gold w-[80%]" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Warehouse Load" }), _jsx("span", { className: "font-bold", children: "92%" })] }), _jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-destructive w-[92%]" }) })] })] })] })] })] })] }));
}
