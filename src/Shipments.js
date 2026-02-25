import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Package, Truck, CheckCircle, AlertTriangle, Search, Filter, Plus, MoreVertical, Eye, Edit3, Trash2, ArrowUpRight, Download, QrCode, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SHIPMENT_STATUS, formatDate, formatCurrency } from '@/lib/index';
import { StatusBadge } from '@/components/StatusBadge';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { DataEntryForm } from '@/components/DataEntryForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { IMAGES } from '@/assets/images';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs) {
    return twMerge(clsx(inputs));
}
// Local Metrics Card Component
const MetricCard = ({ title, value, icon: Icon, trend }) => (_jsxs("div", { className: "luxury-card p-6 flex flex-col gap-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary/10 text-primary", children: _jsx(Icon, { className: "w-5 h-5" }) }), trend && (_jsxs("div", { className: cn("flex items-center gap-1 text-xs font-medium", trend.positive ? "text-emerald-500" : "text-destructive"), children: [trend.positive ? _jsx(TrendingUp, { className: "w-3 h-3" }) : _jsx(TrendingDown, { className: "w-3 h-3" }), trend.value, "%"] }))] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: title }), _jsx("h3", { className: "text-2xl font-bold font-mono mt-1", children: value })] })] }));
// Mock data for 2026 enterprise logistics context
const MOCK_SHIPMENTS = [
    {
        id: 'shp_1',
        awb: 'BRT-2026-882931',
        senderName: 'Global Tech Solutions',
        receiverName: 'Apex Retail Group',
        origin: 'San Francisco, CA',
        destinationTownship: 'New York, NY',
        status: 'IN_TRANSIT',
        weight: 12.5,
        cod_amount: 0,
        isPriority: true,
        createdAt: '2026-02-15T09:30:00Z',
        updated_at: '2026-02-17T14:20:00Z',
    },
    {
        id: 'shp_2',
        awb: 'BRT-2026-441029',
        senderName: 'BioHealth Labs',
        receiverName: 'Metropolitan Hospital',
        origin: 'Boston, MA',
        destinationTownship: 'Chicago, IL',
        status: 'OUT_FOR_DELIVERY',
        weight: 2.4,
        cod_amount: 150000,
        isPriority: true,
        createdAt: '2026-02-16T08:15:00Z',
        updated_at: '2026-02-17T18:45:00Z',
    },
    {
        id: 'shp_3',
        awb: 'BRT-2026-115532',
        senderName: 'Craft & Co.',
        receiverName: 'Lifestyle Stores',
        origin: 'Portland, OR',
        destinationTownship: 'Seattle, WA',
        status: 'DELIVERED',
        weight: 5.8,
        cod_amount: 45000,
        isPriority: false,
        createdAt: '2026-02-14T10:00:00Z',
        updated_at: '2026-02-16T15:30:00Z',
    },
    {
        id: 'shp_4',
        awb: 'BRT-2026-992011',
        senderName: 'AutoParts Direct',
        receiverName: 'QuickFix Garage',
        origin: 'Detroit, MI',
        destinationTownship: 'Phoenix, AZ',
        status: 'EXCEPTION',
        weight: 45.0,
        cod_amount: 890000,
        isPriority: false,
        createdAt: '2026-02-13T14:45:00Z',
        updated_at: '2026-02-17T10:10:00Z',
    },
    {
        id: 'shp_5',
        awb: 'BRT-2026-334001',
        senderName: 'Green Tech',
        receiverName: 'Solar Solutions',
        origin: 'Austin, TX',
        destinationTownship: 'Denver, CO',
        status: 'PENDING',
        weight: 18.2,
        cod_amount: 0,
        isPriority: false,
        createdAt: '2026-02-17T16:00:00Z',
        updated_at: '2026-02-17T16:00:00Z',
    }
];
export default function Shipments() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isQROpen, setIsQROpen] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const filteredShipments = useMemo(() => {
        return MOCK_SHIPMENTS.filter(shipment => {
            const matchesSearch = (shipment.awb?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (shipment.senderName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (shipment.receiverName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
            if (activeTab === 'all')
                return matchesSearch;
            return matchesSearch && shipment.status === activeTab;
        });
    }, [searchTerm, activeTab]);
    const stats = useMemo(() => ({
        total: MOCK_SHIPMENTS.length,
        active: MOCK_SHIPMENTS.filter(s => s.status !== 'DELIVERED' && s.status !== 'CANCELLED').length,
        delivered: MOCK_SHIPMENTS.filter(s => s.status === 'DELIVERED').length,
        exceptions: MOCK_SHIPMENTS.filter(s => s.status === 'EXCEPTION').length,
    }), []);
    const handleOpenQR = (shipment) => {
        setSelectedShipment(shipment);
        setIsQROpen(true);
    };
    const handleCreateShipment = (data) => {
        console.log('New Shipment Data:', data);
        setIsCreateOpen(false);
    };
    return (_jsxs("div", { className: "flex flex-col gap-8 w-full", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground font-heading", children: "Shipment Management" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["Managing lifecycle and tracking for ", stats.total, " total shipments in 2026."] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "luxury-glass border-border", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), " Export Data"] }), _jsxs(Button, { onClick: () => setIsCreateOpen(true), className: "luxury-button py-2 px-6 h-auto", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), " New Shipment"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(MetricCard, { title: "Total Shipments", value: stats.total, icon: Package, trend: { value: 12.5, positive: true } }), _jsx(MetricCard, { title: "Active Transits", value: stats.active, icon: Truck }), _jsx(MetricCard, { title: "Delivered", value: stats.delivered, icon: CheckCircle, trend: { value: 4.2, positive: true } }), _jsx(MetricCard, { title: "Exceptions", value: stats.exceptions, icon: AlertTriangle, trend: { value: 1.1, positive: false } })] }), _jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-4", children: [_jsxs("div", { className: "relative w-full lg:max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search by ID, Sender, or Recipient...", className: "pl-10 h-11 luxury-glass border-border", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full lg:w-auto", children: _jsxs(TabsList, { className: "grid grid-cols-3 lg:flex h-11 bg-secondary/50 p-1 border border-border", children: [_jsx(TabsTrigger, { value: "all", className: "px-6", children: "All" }), _jsx(TabsTrigger, { value: SHIPMENT_STATUS.IN_TRANSIT, className: "px-6", children: "In Transit" }), _jsx(TabsTrigger, { value: SHIPMENT_STATUS.EXCEPTION, className: "px-6", children: "Exceptions" })] }) }), _jsx("div", { className: "ml-auto flex items-center gap-2", children: _jsx(Button, { variant: "outline", size: "icon", className: "h-11 w-11 luxury-glass border-border", children: _jsx(Filter, { className: "w-4 h-4" }) }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "luxury-card overflow-hidden border border-border", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30", children: _jsxs(TableRow, { className: "hover:bg-transparent", children: [_jsx(TableHead, { className: "w-[180px] font-semibold", children: "Tracking ID" }), _jsx(TableHead, { className: "font-semibold", children: "Route" }), _jsx(TableHead, { className: "font-semibold", children: "Status" }), _jsx(TableHead, { className: "font-semibold", children: "COD Amount" }), _jsx(TableHead, { className: "font-semibold", children: "Last Updated" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsxs(TableBody, { children: [_jsx(AnimatePresence, { mode: "popLayout", children: filteredShipments.map((shipment) => (_jsxs(TableRow, { className: "hover:bg-primary/5 transition-colors group border-b border-border/50 last:border-0", children: [_jsxs(TableCell, { className: "font-mono font-bold text-primary", children: [shipment.awb, shipment.isPriority && (_jsx("span", { className: "ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-500 border border-amber-500/30", children: "PRIORITY" }))] }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsx("span", { children: shipment.senderName }), _jsx(ArrowUpRight, { className: "w-3 h-3 text-muted-foreground" }), _jsx("span", { children: shipment.destinationTownship })] }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["To: ", shipment.receiverName] })] }) }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: shipment.status, type: "shipment" }) }), _jsx(TableCell, { className: "font-mono text-sm", children: shipment.cod_amount && shipment.cod_amount > 0 ? formatCurrency(shipment.cod_amount) : 'Prepaid' }), _jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatDate(shipment.updated_at || shipment.createdAt || '') }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "opacity-40 group-hover:opacity-100 transition-opacity", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56 luxury-glass border-border", children: [_jsx(DropdownMenuLabel, { children: "Shipment Controls" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), " View Timeline"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Edit3, { className: "w-4 h-4 mr-2" }), " Update Status"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-primary", onClick: () => handleOpenQR(shipment), children: [_jsx(QrCode, { className: "w-4 h-4 mr-2" }), " Print QR Label"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive", children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), " Cancel Order"] })] })] }) })] }, shipment.id))) }), filteredShipments.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-64 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center gap-2 opacity-50", children: [_jsx(Package, { className: "w-12 h-12" }), _jsx("p", { className: "text-sm", children: "No shipments found matching your filters." })] }) }) }))] })] }) }), _jsxs("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "luxury-card overflow-hidden relative group h-48 border border-border", children: [_jsx("img", { src: IMAGES.PACKAGE_TRACKING_1, alt: "Precision Tracking", className: "w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" }), _jsxs("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent p-8 flex flex-col justify-center", children: [_jsx("h4", { className: "text-lg font-bold", children: "AI-Powered Logistics" }), _jsx("p", { className: "text-sm text-muted-foreground max-w-xs mt-2", children: "Our 2026 fleet tracking system uses real-time telemetry to predict potential delivery delays before they happen." })] })] }), _jsxs("div", { className: "luxury-card p-8 flex flex-col justify-center border border-border bg-primary/5", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "p-3 rounded-full bg-primary/20 text-primary", children: _jsx(CheckCircle, { className: "w-6 h-6" }) }), _jsx("h4", { className: "text-lg font-bold", children: "System Status: Normal" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "All nodes in the regional distribution network are reporting optimal efficiency. No major weather exceptions reported for active routes." })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8 border-t border-border/50", children: [_jsx("p", { children: "\u00A9 2026 Britium Enterprise. Logistical Precision." }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("a", { href: "#", className: "hover:text-primary", children: "Global Operations" }), _jsx("a", { href: "#", className: "hover:text-primary", children: "Privacy Protocol" }), _jsx("a", { href: "#", className: "hover:text-primary", children: "v4.2.0-stable" })] })] }), _jsx(Dialog, { open: isCreateOpen, onOpenChange: setIsCreateOpen, children: _jsx(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto luxury-glass border-border p-0", children: _jsxs("div", { className: "p-8", children: [_jsxs(DialogHeader, { className: "mb-6", children: [_jsx(DialogTitle, { className: "text-2xl font-bold font-heading", children: "Register New Shipment" }), _jsx(DialogDescription, { children: "Enter the shipment details for the 2026 logistics network." })] }), _jsx(DataEntryForm, { mode: "create", onSubmit: handleCreateShipment })] }) }) }), _jsx(Dialog, { open: isQROpen, onOpenChange: setIsQROpen, children: _jsxs(DialogContent, { className: "sm:max-w-md luxury-glass border-border", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Shipment Label (QR)" }), _jsx(DialogDescription, { children: "Scan or print this label for tracking identification." })] }), _jsx("div", { className: "flex flex-col items-center justify-center p-8 gap-6", children: selectedShipment && (_jsxs(_Fragment, { children: [_jsx(QRCodeGenerator, { data: selectedShipment.awb || '', size: 240, label: selectedShipment.awb }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "font-bold text-lg", children: selectedShipment.awb }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["To: ", selectedShipment.receiverName] })] })] })) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsQROpen(false), children: "Close" }), _jsx(Button, { onClick: () => window.print(), children: "Print Label" })] })] }) })] }));
}
