import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Package, ArrowDownToLine, ArrowUpFromLine, Boxes, ScanLine, LayoutDashboard, ClipboardList, CheckCircle2, Clock, Search, AlertCircle, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { formatDate, formatWeight } from '@/lib/index';
import { QRScanner } from '@/components/QRScanner';
import { StatusBadge } from '@/components/StatusBadge';
import { IMAGES } from '@/assets/images';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
// Mock data for warehouse inventory (Context: Feb 2026)
const MOCK_INVENTORY = [
    {
        id: '1',
        trackingNumber: 'BRT-2026-882931',
        senderName: 'Global Tech Corp',
        senderAddress: '123 Innovation Way, San Jose, CA',
        senderPhone: '+1 555-0102',
        receiverName: 'Alice Johnson',
        receiverAddress: '456 Oak St, Seattle, WA',
        receiverPhone: '+1 555-0199',
        origin: 'San Jose, CA',
        destination: 'Seattle, WA',
        status: 'AT_HUB',
        weight: 12.5,
        dimensions: '30x20x15 cm',
        created_at: '2026-02-15T10:00:00Z',
        updated_at: '2026-02-16T14:30:00Z',
        estimated_delivery: '2026-02-18T17:00:00Z',
        isPriority: true,
    },
    {
        id: '2',
        trackingNumber: 'BRT-2026-112044',
        senderName: 'Green Energy Ltd',
        senderAddress: '789 Solar Rd, Austin, TX',
        senderPhone: '+1 555-0204',
        receiverName: 'Bob Smith',
        receiverAddress: '321 Pine Ln, Portland, OR',
        receiverPhone: '+1 555-0288',
        origin: 'Austin, TX',
        destination: 'Portland, OR',
        status: 'AT_HUB',
        weight: 45.2,
        dimensions: '100x80x60 cm',
        created_at: '2026-02-16T09:15:00Z',
        updated_at: '2026-02-17T08:00:00Z',
        estimated_delivery: '2026-02-19T12:00:00Z',
        isPriority: false,
    },
    {
        id: '3',
        trackingNumber: 'BRT-2026-554109',
        senderName: 'Precision Tools Inc',
        senderAddress: '55 Industrial Blvd, Chicago, IL',
        senderPhone: '+1 555-0311',
        receiverName: 'Charlie Davis',
        receiverAddress: '777 Maple Dr, Denver, CO',
        receiverPhone: '+1 555-0377',
        origin: 'Chicago, IL',
        destination: 'Denver, CO',
        status: 'AT_HUB',
        weight: 2.8,
        dimensions: '15x10x5 cm',
        created_at: '2026-02-17T07:45:00Z',
        updated_at: '2026-02-17T11:20:00Z',
        estimated_delivery: '2026-02-18T10:00:00Z',
        isPriority: true,
    }
];
export default function Warehouse() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const handleScan = (code) => {
        setScanResult(code);
        setIsScanning(false);
        // Process scanned code logic here (e.g., fetch details, update state)
    };
    const filteredInventory = MOCK_INVENTORY.filter(item => item.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "flex flex-col gap-6 p-6 min-h-screen bg-background", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground font-heading", children: "Warehouse Operations" }), _jsx("p", { className: "text-muted-foreground", children: "Manage inventory, receiving, and dispatching for Branch #WA-042 (North Seattle Hub)" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Dialog, { open: isScanning, onOpenChange: setIsScanning, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-primary hover:bg-primary/90 shadow-lg luxury-button px-6", children: [_jsx(ScanLine, { className: "mr-2 h-4 w-4" }), "Scan QR Code"] }) }), _jsxs(DialogContent, { className: "sm:max-w-md luxury-glass border-primary/20", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "font-heading text-xl", children: "Warehouse Scanner" }) }), _jsx("div", { className: "aspect-square relative rounded-2xl overflow-hidden bg-black/40 border border-white/10", children: _jsx(QRScanner, { onScan: handleScan }) }), _jsx("p", { className: "text-center text-sm text-muted-foreground mt-4", children: "Position the tracking QR code within the frame to process inbound/outbound" })] })] }), _jsxs(Button, { variant: "outline", className: "border-border/50", children: [_jsx(ClipboardList, { className: "mr-2 h-4 w-4" }), "Stock Count"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                    { title: 'Total Inventory', value: MOCK_INVENTORY.length, icon: Boxes, trend: 12, pos: true },
                    { title: 'Inbound Today', value: 24, icon: ArrowDownToLine, trend: 5, pos: true },
                    { title: 'Pending Dispatch', value: 8, icon: ArrowUpFromLine, trend: 2, pos: false },
                    { title: 'Storage Capacity', value: '78%', icon: LayoutDashboard, trend: null }
                ].map((metric, i) => (_jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: _jsx(metric.icon, { className: "h-5 w-5 text-primary" }) }), metric.trend !== null && (_jsxs("div", { className: `flex items-center text-xs font-bold ${metric.pos ? 'text-green-500' : 'text-destructive'}`, children: [metric.pos ? _jsx(TrendingUp, { className: "h-3 w-3 mr-1" }) : _jsx(TrendingDown, { className: "h-3 w-3 mr-1" }), metric.trend, "%"] }))] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: metric.title }), _jsx("h3", { className: "text-2xl font-bold mt-1 font-mono", children: metric.value })] })] }) }, i))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: _jsxs(Card, { className: "border-border/50 shadow-sm luxury-glass", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "font-heading", children: "Shipment Management" }), _jsx(CardDescription, { children: "Monitor and process shipments currently at this hub" })] }), _jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search tracking or receiver...", className: "pl-9 bg-background/50 border-border/40", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "inventory", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6 bg-muted/20 p-1 rounded-xl", children: [_jsx(TabsTrigger, { value: "inventory", className: "rounded-lg", children: "In-Stock" }), _jsx(TabsTrigger, { value: "receiving", className: "rounded-lg", children: "Receiving" }), _jsx(TabsTrigger, { value: "dispatch", className: "rounded-lg", children: "Dispatch" })] }), _jsx(TabsContent, { value: "inventory", children: _jsxs("div", { className: "rounded-xl border border-border/40 overflow-hidden", children: [_jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[160px]", children: "Tracking ID" }), _jsx(TableHead, { children: "Receiver" }), _jsx(TableHead, { children: "Weight" }), _jsx(TableHead, { children: "Arrived At" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Action" })] }) }), _jsx(TableBody, { children: filteredInventory.map((item) => (_jsxs(TableRow, { className: "hover:bg-primary/5 transition-colors border-border/20", children: [_jsx(TableCell, { className: "font-mono font-medium text-primary", children: item.trackingNumber }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium text-foreground", children: item.receiverName }), _jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[150px]", children: item.receiverAddress })] }) }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatWeight(item.weight || 0) }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatDate(item.updated_at || '') }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: item.status, type: "shipment" }) }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-primary/10", children: _jsx(ChevronRight, { className: "h-4 w-4" }) }) })] }, item.id))) })] }), filteredInventory.length === 0 && (_jsx("div", { className: "py-12 text-center text-muted-foreground", children: "No shipments found matching your search." }))] }) }), _jsx(TabsContent, { value: "receiving", children: _jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/40 rounded-2xl bg-muted/5", children: [_jsx("div", { className: "bg-primary/10 p-5 rounded-full mb-4", children: _jsx(ArrowDownToLine, { className: "h-10 w-10 text-primary" }) }), _jsx("h3", { className: "text-xl font-bold font-heading", children: "Ready for Inbound Receiving" }), _jsx("p", { className: "text-muted-foreground max-w-sm mb-8 mt-2", children: "Scan incoming shipment QR codes to verify contents and assign storage locations within the hub." }), _jsxs(Button, { onClick: () => setIsScanning(true), className: "luxury-button px-8", children: [_jsx(ScanLine, { className: "mr-2 h-4 w-4" }), "Open Hub Scanner"] })] }) }), _jsx(TabsContent, { value: "dispatch", children: _jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border/40 rounded-2xl bg-muted/5", children: [_jsx("div", { className: "bg-accent/10 p-5 rounded-full mb-4", children: _jsx(ArrowUpFromLine, { className: "h-10 w-10 text-primary" }) }), _jsx("h3", { className: "text-xl font-bold font-heading", children: "Outbound Dispatch Prep" }), _jsx("p", { className: "text-muted-foreground max-w-sm mb-8 mt-2", children: "Consolidate shipments for specific routes and assign them to riders or line-haul vehicles." }), _jsxs(Button, { variant: "secondary", className: "px-8 border border-border/40", children: [_jsx(Package, { className: "mr-2 h-4 w-4" }), "Create Manifest"] })] }) })] }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-border/50 overflow-hidden luxury-glass", children: [_jsxs("div", { className: "h-36 w-full relative", children: [_jsx("img", { src: IMAGES.WAREHOUSE_OPS_2, alt: "Warehouse facility", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }), _jsxs("div", { className: "absolute bottom-4 left-4", children: [_jsx(Badge, { className: "bg-green-500/80 hover:bg-green-600 mb-2 border-none backdrop-blur-sm", children: "Facility Active" }), _jsx("h4", { className: "font-bold text-lg text-white font-heading", children: "North Seattle Hub (WA-042)" })] })] }), _jsxs(CardContent, { className: "pt-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Current Shift" }), _jsx("span", { className: "font-medium", children: "Morning Operations" })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Active Staff" }), _jsx("span", { className: "font-medium", children: "12 Personnel" })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Daily Efficiency" }), _jsx("span", { className: "text-primary font-bold", children: "94.2%" })] }), _jsxs("div", { className: "pt-4 border-t border-border/40", children: [_jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground mb-3 font-bold", children: "Last Stock Sync: 4m ago" }), _jsx(Button, { variant: "outline", size: "sm", className: "w-full text-xs h-9", children: "View Facility Settings" })] })] })] }), _jsxs(Card, { className: "border-border/50 luxury-glass", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg flex items-center font-heading", children: [_jsx(Clock, { className: "mr-2 h-4 w-4 text-primary" }), "Recent Hub Logs"] }) }), _jsxs(CardContent, { className: "space-y-5", children: [[
                                                { id: 1, type: 'INBOUND', msg: 'BRT-2026-9901 received', time: '5m ago', icon: CheckCircle2, color: 'text-green-500' },
                                                { id: 2, type: 'DISPATCH', msg: 'Rider R-44 departed', time: '12m ago', icon: ArrowUpFromLine, color: 'text-primary' },
                                                { id: 3, type: 'ALERT', msg: 'Storage Row C nearly full', time: '28m ago', icon: AlertCircle, color: 'text-amber-500' },
                                                { id: 4, type: 'INBOUND', msg: 'BRT-2026-1120 processed', time: '45m ago', icon: CheckCircle2, color: 'text-green-500' }
                                            ].map((log) => (_jsxs("div", { className: "flex gap-3 items-start text-sm group cursor-default", children: [_jsx("div", { className: `mt-1 p-1 rounded-full bg-muted/40 ${log.color}`, children: _jsx(log.icon, { className: "h-3 w-3" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-foreground group-hover:text-primary transition-colors", children: log.msg }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60", children: log.type }), _jsxs("span", { className: "text-[10px] text-muted-foreground", children: ["\u2022 ", log.time] })] })] })] }, log.id))), _jsx(Button, { variant: "ghost", className: "w-full text-xs text-muted-foreground hover:text-primary mt-2 font-semibold", children: "View Full Audit Trail" })] })] }), _jsxs("div", { className: "rounded-2xl overflow-hidden relative h-44 group shadow-xl", children: [_jsx("img", { src: IMAGES.WAREHOUSE_OPS_2, alt: "Logistics cargo", className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" }), _jsx("div", { className: "absolute inset-0 bg-primary/30 mix-blend-multiply group-hover:bg-primary/20 transition-colors" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6 text-center", children: _jsxs("div", { className: "bg-background/90 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/10", children: [_jsx("p", { className: "text-[10px] font-bold text-primary uppercase tracking-widest mb-1", children: "Future Ready" }), _jsx("p", { className: "text-sm font-bold text-foreground font-heading", children: "Smart Sorting System 2.0" }), _jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Launching Q2 2026" })] }) })] })] })] }), _jsx(AnimatePresence, { children: scanResult && (_jsxs(motion.div, { initial: { opacity: 0, y: 50, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 50, scale: 0.95 }, className: "fixed bottom-8 left-1/2 -translate-x-1/2 bg-card border border-primary/30 shadow-2xl rounded-2xl p-5 flex items-center gap-6 z-50 min-w-[320px] luxury-glass", children: [_jsx("div", { className: "h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20", children: _jsx(CheckCircle2, { className: "h-7 w-7 text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-bold font-heading", children: "Shipment Identified" }), _jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: scanResult })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setScanResult(null), className: "text-muted-foreground hover:text-foreground", children: "Dismiss" }), _jsx(Button, { size: "sm", className: "luxury-button px-4 py-2 text-[10px]", children: "Process Now" })] })] })) })] }));
}
