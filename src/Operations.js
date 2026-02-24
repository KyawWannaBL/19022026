import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, MapPin, Search, QrCode, Activity, Filter, RefreshCw, ArrowUpRight, ShieldCheck, X } from 'lucide-react';
import { IMAGES } from '@/assets/images';
import { formatDate } from '@/lib/index';
import { QRScanner } from '@/components/QRScanner';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { RoutePlanner } from '@/components/RoutePlanner';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const MOCK_SHIPMENTS = [
    {
        id: 'SHP-001',
        awb_number: 'LGT-2026-882910',
        pickup_address: {
            name: 'Global Tech Solutions',
            address: '123 Innovation Dr, San Jose, CA',
            phone: '+1 555-0101'
        },
        delivery_address: {
            name: 'Apex Retailers',
            address: '456 Commerce St, New York, NY',
            phone: '+1 555-0102'
        },
        package_details: {
            weight: 45.5,
            dimensions: '60x40x40 cm',
            description: 'Tech Equipment'
        },
        status: 'IN_TRANSIT',
        priority: 'urgent',
        created_at: '2026-02-15T08:30:00Z',
        trackingNumber: 'LGT-2026-882910',
        receiverName: 'Apex Retailers'
    },
    {
        id: 'SHP-002',
        awb_number: 'LGT-2026-119283',
        pickup_address: {
            name: 'BioHealth Corp',
            address: '789 Medical Plaza, Boston, MA',
            phone: '+1 555-0201'
        },
        delivery_address: {
            name: 'City Hospital',
            address: '321 Care Blvd, Chicago, IL',
            phone: '+1 555-0202'
        },
        package_details: {
            weight: 12.2,
            dimensions: '30x30x30 cm',
            description: 'Medical Supplies'
        },
        status: 'AT_HUB',
        priority: 'standard',
        created_at: '2026-02-16T10:00:00Z',
        trackingNumber: 'LGT-2026-119283',
        receiverName: 'City Hospital'
    },
    {
        id: 'SHP-003',
        awb_number: 'LGT-2026-554321',
        pickup_address: {
            name: 'Fast Fashion Ltd',
            address: '55 Style Ave, Los Angeles, CA',
            phone: '+1 555-0301'
        },
        delivery_address: {
            name: 'Urban Outfitters',
            address: '99 Main St, Seattle, WA',
            phone: '+1 555-0302'
        },
        package_details: {
            weight: 5.8,
            dimensions: '20x20x20 cm',
            description: 'Fashion Items'
        },
        status: 'OUT_FOR_DELIVERY',
        priority: 'urgent',
        created_at: '2026-02-17T06:15:00Z',
        trackingNumber: 'LGT-2026-554321',
        receiverName: 'Urban Outfitters'
    }
];
const MOCK_VEHICLES = [
    {
        id: 'VEH-001',
        plateNumber: 'LGT-2026-X1',
        type: 'TRUCK',
        status: 'ACTIVE',
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        fuelLevel: 85,
        lastService: '2026-01-10',
    },
    {
        id: 'VEH-002',
        plateNumber: 'LGT-2026-V5',
        type: 'VAN',
        status: 'IN_USE',
        currentLocation: { lat: 34.0522, lng: -118.2437 },
        assignedRiderId: 'RIDER-44',
        fuelLevel: 42,
        lastService: '2026-02-05',
    }
];
const MetricsCard = ({ title, value, icon: Icon, trend }) => (_jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1", children: title }), _jsx("h3", { className: "text-2xl font-bold font-mono", children: value }), trend && (_jsxs("div", { className: `flex items-center gap-1 mt-2 text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`, children: [_jsx(ArrowUpRight, { className: `w-3 h-3 ${!trend.isPositive && 'rotate-90'}` }), trend.isPositive ? '+' : '-', trend.value, "%", _jsx("span", { className: "text-muted-foreground ml-1", children: "vs last month" })] }))] }), _jsx("div", { className: "p-3 bg-primary/10 rounded-xl", children: _jsx(Icon, { className: "w-5 h-5 text-primary" }) })] }) }) }));
export default function Operations() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('shipments');
    const { t } = useLanguage();
    const filteredShipments = MOCK_SHIPMENTS.filter(s => (s.trackingNumber?.includes(searchQuery) || s.receiverName?.toLowerCase().includes(searchQuery.toLowerCase())));
    const handleScan = (code) => {
        setSearchQuery(code);
        setIsScannerOpen(false);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [_jsxs("div", { className: "relative h-72 w-full overflow-hidden", children: [_jsx("img", { src: IMAGES.WAREHOUSE_OPS_4, alt: "Operations Center", className: "hero-background object-cover" }), _jsx("div", { className: "hero-overlay" }), _jsx("div", { className: "relative z-10 h-full flex flex-col justify-end p-8 md:p-12", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(Activity, { className: "w-4 h-4 text-primary animate-pulse" }), _jsx("span", { className: "text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold", children: "System Status: Optimal" })] }), _jsx("h1", { className: "text-4xl md:text-5xl font-bold tracking-tight text-foreground font-heading", children: "Mission Control" }), _jsx("p", { className: "text-muted-foreground max-w-xl mt-3 text-sm md:text-base", children: "Integrated operational dashboard for real-time fleet management, shipment fulfillment, and automated logistics orchestration in 2026." })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", className: "luxury-glass border-white/10", children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Sync Nodes"] }), _jsxs(Button, { className: "luxury-button", onClick: () => setIsScannerOpen(true), children: [_jsx(QrCode, { className: "w-4 h-4 mr-2" }), "Quick Scan"] })] })] }) })] }), _jsxs("main", { className: "flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", children: [_jsx(MetricsCard, { title: "Active Shipments", value: "1,284", icon: Package, trend: { value: 12, isPositive: true } }), _jsx(MetricsCard, { title: "Fleet Utilization", value: "94.2%", icon: Truck, trend: { value: 2.5, isPositive: true } }), _jsx(MetricsCard, { title: "System Uptime", value: "99.99%", icon: ShieldCheck })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx("div", { className: "lg:col-span-3 space-y-6", children: _jsxs(Tabs, { defaultValue: "shipments", className: "w-full", onValueChange: setActiveTab, children: [_jsxs("div", { className: "flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6", children: [_jsxs(TabsList, { className: "bg-muted/50 p-1 luxury-glass rounded-xl overflow-x-auto", children: [_jsx(TabsTrigger, { value: "shipments", className: "rounded-lg", children: "Shipments" }), _jsx(TabsTrigger, { value: "fleet", className: "rounded-lg", children: "Fleet Status" }), _jsx(TabsTrigger, { value: "routes", className: "rounded-lg", children: "Global Map" }), _jsx(TabsTrigger, { value: "route-planning", className: "rounded-lg", children: "Route Planner" }), _jsx(TabsTrigger, { value: "qr-tools", className: "rounded-lg", children: "QR Tools" })] }), _jsxs("div", { className: "relative w-full xl:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search AWB, receiver...", className: "pl-10 luxury-glass", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsxs(TabsContent, { value: "shipments", className: "mt-0 space-y-4 outline-none", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Package, { className: "w-5 h-5 text-primary" }), "Priority Fulfillment Queue"] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs font-mono", children: [_jsx(Filter, { className: "w-3.5 h-3.5 mr-2" }), "FILTERS"] })] }), _jsx("div", { className: "grid grid-cols-1 gap-3", children: filteredShipments.length > 0 ? (filteredShipments.map((shipment) => (_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, className: "luxury-card p-5 group hover:border-primary/20", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between gap-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10", children: _jsx(Package, { className: "w-6 h-6 text-primary" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-1", children: [_jsx("span", { className: "text-sm font-bold font-mono", children: shipment.awb_number }), _jsx(StatusBadge, { status: shipment.status, type: "shipment", size: "sm" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(MapPin, { className: "w-3 h-3 text-primary/60" }), _jsxs("span", { children: ["From: ", shipment.pickup_address?.name] })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(ArrowUpRight, { className: "w-3 h-3 text-primary/60" }), _jsxs("span", { children: ["To: ", shipment.delivery_address?.name] })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Truck, { className: "w-3 h-3 text-primary/60" }), _jsxs("span", { children: ["Weight: ", shipment.package_details?.weight, "kg"] })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(RefreshCw, { className: "w-3 h-3 text-primary/60" }), _jsxs("span", { children: ["Updated: ", formatDate(shipment.created_at || '')] })] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2 self-end md:self-center", children: [_jsx(Button, { variant: "outline", size: "sm", className: "h-8 text-[10px] font-mono tracking-wider", children: "TRACK" }), _jsx(Button, { size: "sm", className: "h-8 text-[10px] font-mono tracking-wider", children: "DETAILS" })] })] }) }, shipment.id)))) : (_jsxs("div", { className: "luxury-card p-16 text-center border-dashed", children: [_jsx(Search, { className: "w-12 h-12 text-muted-foreground/30 mx-auto mb-4" }), _jsx("h4", { className: "font-bold", children: "No Operational Records" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try adjusting filters or searching for specific AWB IDs." })] })) })] }), _jsx(TabsContent, { value: "fleet", className: "mt-0 outline-none", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: MOCK_VEHICLES.map((vehicle) => (_jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold font-mono", children: vehicle.plateNumber }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [vehicle.type, " \u2022 ID: ", vehicle.id] })] }), _jsx(StatusBadge, { status: vehicle.status, type: "delivery", size: "sm" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Fuel Level" }), _jsxs("span", { className: "font-mono", children: [vehicle.fuelLevel, "%"] })] }), _jsx("div", { className: "h-1.5 w-full bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: `h-full rounded-full ${vehicle.fuelLevel > 20 ? 'bg-primary' : 'bg-destructive'}`, style: { width: `${vehicle.fuelLevel}%` } }) }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border/50 text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Rider" }), _jsx("span", { className: "font-medium", children: vehicle.assignedRiderId || 'Unassigned' })] })] }), _jsx(Button, { variant: "outline", size: "sm", className: "w-full mt-4 h-8 text-[10px] font-mono", children: "VIEW TELEMETRY" })] }) }, vehicle.id))) }) }), _jsx(TabsContent, { value: "routes", className: "mt-0 outline-none", children: _jsxs(Card, { className: "relative h-[600px] overflow-hidden group luxury-card", children: [_jsx("img", { src: IMAGES.DELIVERY_FLEET_2, alt: "Fleet Map Visualization", className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-background/30 backdrop-blur-[1px]" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "luxury-glass p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md text-center", children: [_jsx(MapPin, { className: "w-10 h-10 text-primary mx-auto mb-4 animate-bounce" }), _jsx("h4", { className: "font-bold text-2xl font-heading", children: "Live Geospatial Network" }), _jsx("p", { className: "text-sm text-muted-foreground mt-3 mb-6 leading-relaxed", children: "Interactive satellite tracking for all active assets in the 2026 fleet network. Access requires Level 3 clearance and secure gateway authentication." }), _jsx(Button, { className: "luxury-button px-8", children: "AUTHENTICATE ACCESS" })] }) }), _jsx("div", { className: "absolute bottom-6 left-6 luxury-glass p-3 rounded-xl border border-white/5 text-[10px] font-mono", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), "SECURE LINK: ", formatDate(new Date().toISOString())] }) })] }) }), _jsx(TabsContent, { value: "route-planning", className: "mt-0 outline-none", children: _jsx("div", { className: "luxury-card", children: _jsx(RoutePlanner, { onOptimize: (optimized) => console.log('Optimized:', optimized) }) }) }), _jsx(TabsContent, { value: "qr-tools", className: "mt-0 space-y-6 outline-none", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [_jsx(QrCode, { className: "w-4 h-4 text-primary" }), "Operations Scanner"] }), _jsx(CardDescription, { className: "text-xs", children: "Validate shipment manifests and package tags" })] }), _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-10", children: [_jsx("div", { className: "w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10", children: _jsx(QrCode, { className: "w-10 h-10 text-primary" }) }), _jsx("p", { className: "text-sm text-center text-muted-foreground max-w-[240px] mb-6", children: "Use the high-speed laser or camera scanner to process shipments." }), _jsx(Button, { className: "luxury-button px-10", onClick: () => setIsScannerOpen(true), children: "ACTIVATE SCANNER" })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [_jsx(Package, { className: "w-4 h-4 text-primary" }), "Manifest Tag Generator"] }), _jsx(CardDescription, { className: "text-xs", children: "Create secure tracking identifiers" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Asset Identifier" }), _jsx(Input, { placeholder: "Enter AWB or Parcel ID", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "luxury-glass" })] }), searchQuery ? (_jsxs("div", { className: "p-6 luxury-glass rounded-2xl flex flex-col items-center justify-center", children: [_jsx(QRCodeGenerator, { data: searchQuery, size: 180 }), _jsx("p", { className: "text-[10px] font-mono mt-4 text-primary", children: searchQuery })] })) : (_jsxs("div", { className: "h-[238px] flex flex-col items-center justify-center border border-dashed rounded-2xl border-white/10", children: [_jsx(QrCode, { className: "w-12 h-12 text-muted-foreground/20 mb-3" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Awaiting ID input..." })] }))] }) })] })] }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card overflow-hidden border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-xs font-mono uppercase tracking-[0.2em] text-primary", children: "Quick Execution" }) }), _jsxs(CardContent, { className: "grid gap-3 pt-4", children: [_jsxs(Button, { variant: "outline", className: "luxury-glass justify-start h-auto py-4 px-5 border-white/5", children: [_jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-bold text-sm", children: "New Shipment" }), _jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Register domestic/air cargo" })] }), _jsx(ArrowUpRight, { className: "w-3 h-3 ml-auto text-primary/40" })] }), _jsxs(Button, { variant: "outline", className: "luxury-glass justify-start h-auto py-4 px-5 border-white/5", children: [_jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-bold text-sm", children: "Assign Fleet" }), _jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Dispatch pending manifests" })] }), _jsx(ArrowUpRight, { className: "w-3 h-3 ml-auto text-primary/40" })] }), _jsxs(Button, { variant: "outline", className: "luxury-glass justify-start h-auto py-4 px-5 border-white/5", children: [_jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-bold text-sm", children: "Log Exception" }), _jsx("div", { className: "text-[10px] text-muted-foreground mt-1", children: "Report system or transit error" })] }), _jsx(ArrowUpRight, { className: "w-3 h-3 ml-auto text-primary/40" })] })] })] }), _jsxs(Card, { className: "bg-primary text-primary-foreground luxury-card border-none shadow-primary/20", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Activity, { className: "w-4 h-4" }), _jsx(CardTitle, { className: "text-sm uppercase tracking-widest font-mono", children: "Operational Alert" })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-xs mb-5 leading-relaxed opacity-90", children: "Congestion detected at Southeast Hub 4B. Rerouting algorithms engaged. Estimated delay for outbound parcels: 28 mins." }), _jsxs(Button, { variant: "secondary", size: "sm", className: "w-full text-[10px] font-mono tracking-wider h-9", children: ["VIEW INCIDENT REPORT", _jsx(ArrowUpRight, { className: "w-3 h-3 ml-2" })] })] })] }), _jsxs("div", { className: "p-6 luxury-card", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Activity, { className: "w-4 h-4 text-emerald-500" }), _jsx("span", { className: "text-xs font-mono font-bold uppercase tracking-widest", children: "Live Event Feed" })] }), _jsx("div", { className: "space-y-5", children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "flex gap-4 items-start", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_var(--primary)]" }), _jsxs("div", { children: [_jsxs("p", { className: "text-[11px] leading-snug font-medium", children: ["LGT-2026-00", i, "88 arrived at Hub Central"] }), _jsxs("span", { className: "text-[10px] font-mono text-muted-foreground opacity-60", children: [i * 2, " mins ago"] })] })] }, i))) }), _jsx(Button, { variant: "link", className: "text-[10px] font-mono p-0 mt-6 h-auto text-primary", children: "VIEW FULL AUDIT LOG" })] })] })] })] }), _jsx(AnimatePresence, { children: isScannerOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4", children: _jsx(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, className: "w-full max-w-lg", children: _jsxs(Card, { className: "luxury-glass border-white/10 overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between border-b border-white/5 pb-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "font-heading text-xl", children: "Optical Asset Scanner" }), _jsx(CardDescription, { className: "text-xs", children: "Align tracking code within the tactical frame" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full hover:bg-white/10", onClick: () => setIsScannerOpen(false), children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs(CardContent, { className: "p-0 relative aspect-square bg-black", children: [_jsx(QRScanner, { onScan: handleScan, onError: (err) => console.error(err) }), _jsx("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center", children: _jsxs("div", { className: "w-64 h-64 border-2 border-primary/40 rounded-3xl relative", children: [_jsx("div", { className: "absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" }), _jsx("div", { className: "absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" }), _jsx(motion.div, { animate: { top: ["0%", "100%", "0%"] }, transition: { duration: 3, repeat: Infinity, ease: "linear" }, className: "absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_15px_var(--primary)]" })] }) })] }), _jsxs("div", { className: "p-6 text-center border-t border-white/5 bg-black/40", children: [_jsx("p", { className: "text-[10px] font-mono text-muted-foreground tracking-widest mb-4", children: "SUPPORTED STANDARDS: LGT-SECURE, ISO-2026, BRT-INTL" }), _jsx(Button, { variant: "outline", className: "luxury-glass px-8", onClick: () => setIsScannerOpen(false), children: "TERMINATE SESSION" })] })] }) }) })) }), _jsx("footer", { className: "mt-20 border-t border-border/40 py-8 px-8 bg-black/20", children: _jsxs("div", { className: "max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20", children: _jsx(Package, { className: "w-4 h-4 text-primary" }) }), _jsx("p", { className: "text-[11px] font-mono text-muted-foreground uppercase tracking-widest", children: "\u00A9 2026 Enterprise Logistics Platform \u2022 Secure Node: OPS-YGN-01" })] }), _jsxs("div", { className: "flex items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest", children: [_jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Security Protocol" }), _jsx("a", { href: "#", className: "hover:text-primary transition-colors", children: "Terms of Operation" }), _jsx(Badge, { variant: "outline", className: "font-mono border-white/5 text-[9px] py-0 h-5 px-2", children: "v4.0.2-LATEST" })] })] }) })] }));
}
