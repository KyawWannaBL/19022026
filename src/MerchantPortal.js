import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Upload, BarChart3, FileText, Search, DollarSign, Clock, ArrowUpRight, ChevronRight, Filter, Download, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate, formatCurrency } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { DataEntryForm } from '@/components/DataEntryForm';
import { ShippingCalculator } from '@/components/ShippingCalculator';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { IMAGES } from '@/assets/images';
// Mock data for the Merchant Portal
const MOCK_ANALYTICS = [
    { name: 'Mon', shipments: 45, revenue: 125000 },
    { name: 'Tue', shipments: 52, revenue: 148000 },
    { name: 'Wed', shipments: 48, revenue: 132000 },
    { name: 'Thu', shipments: 61, revenue: 185000 },
    { name: 'Fri', shipments: 55, revenue: 162000 },
    { name: 'Sat', shipments: 32, revenue: 95000 },
    { name: 'Sun', shipments: 28, revenue: 78000 },
];
const MOCK_SHIPMENTS = [
    {
        id: 'SHP-001',
        awb_number: 'BRT-2026-992831',
        receiverName: 'Kyaw Zayar',
        destinationTownship: 'Mandalay',
        status: 'IN_TRANSIT',
        cod_amount: 45000,
        createdAt: '2026-02-18T10:30:00Z',
    },
    {
        id: 'SHP-002',
        awb_number: 'BRT-2026-881273',
        receiverName: 'Hnin Phyu',
        destinationTownship: 'Yangon',
        status: 'DELIVERED',
        cod_amount: 0,
        createdAt: '2026-02-17T14:20:00Z',
    },
    {
        id: 'SHP-003',
        awb_number: 'BRT-2026-773412',
        receiverName: 'Aung Ko',
        destinationTownship: 'Naypyidaw',
        status: 'PENDING',
        cod_amount: 120000,
        createdAt: '2026-02-19T08:15:00Z',
    },
];
const MOCK_INVOICES = [
    { id: 'INV-1024', date: '2026-02-15', amount: 850000, status: 'PAID' },
    { id: 'INV-1025', date: '2026-02-19', amount: 420000, status: 'PENDING' },
];
export default function MerchantPortal() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('dashboard');
    const handleShipmentSubmit = (data) => {
        console.log('Shipment Created:', data);
        setActiveTab('shipments');
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground pb-20", children: [_jsxs("section", { className: "relative h-[250px] flex items-center overflow-hidden", children: [_jsx("img", { src: IMAGES.DASHBOARD_ANALYTICS_3, className: "absolute inset-0 w-full h-full object-cover opacity-20", alt: "Dashboard background" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" }), _jsx("div", { className: "container mx-auto px-6 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx(Badge, { variant: "outline", className: "mb-4 border-primary text-primary px-3 py-1 uppercase tracking-widest text-[10px]", children: "Merchant Hub 2026" }), _jsxs("h1", { className: "text-4xl md:text-5xl font-heading font-bold mb-2", children: ["Welcome back, ", _jsx("span", { className: "text-primary", children: "Global Traders Co." })] }), _jsx("p", { className: "text-muted-foreground max-w-lg", children: "Manage your logistics pipeline, track revenue, and scale your business with Britium Enterprise." })] }) })] }), _jsxs("div", { className: "container mx-auto px-6 -mt-10 relative z-20", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8", children: [_jsx(StatCard, { icon: _jsx(Package, { className: "w-5 h-5" }), label: "Active Shipments", value: "142", trend: "+12%" }), _jsx(StatCard, { icon: _jsx(DollarSign, { className: "w-5 h-5" }), label: "COD Pending", value: formatCurrency(1245000), trend: "+5.4%" }), _jsx(StatCard, { icon: _jsx(Clock, { className: "w-5 h-5" }), label: "Pickup Pending", value: "8", trend: "-2" }), _jsx(StatCard, { icon: _jsx(ArrowUpRight, { className: "w-5 h-5" }), label: "Success Rate", value: "98.2%", trend: "+0.5%" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-30 border-b", children: [_jsxs(TabsList, { className: "bg-muted/50 p-1 rounded-xl", children: [_jsxs(TabsTrigger, { value: "dashboard", className: "rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), " Overview"] }), _jsxs(TabsTrigger, { value: "shipments", className: "rounded-lg", children: [_jsx(Package, { className: "w-4 h-4 mr-2" }), " My Shipments"] }), _jsxs(TabsTrigger, { value: "create", className: "rounded-lg", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), " Create New"] }), _jsxs(TabsTrigger, { value: "financials", className: "rounded-lg", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), " Invoices"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "rounded-full", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), " Feb 2026"] }), _jsxs(Button, { className: "luxury-button py-2 px-6 h-9", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), " Export Report"] })] })] }), _jsxs(AnimatePresence, { mode: "wait", children: [_jsx(TabsContent, { value: "dashboard", className: "m-0", children: _jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 luxury-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Shipment Volume" }), _jsx(CardDescription, { children: "Daily performance overview for the current week" })] }), _jsx(Badge, { variant: "secondary", children: "Live 2026" })] }) }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: MOCK_ANALYTICS, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)" }), _jsx(XAxis, { dataKey: "name", stroke: "#888", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#888", fontSize: 12, tickLine: false, axisLine: false }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#1A1D23', border: '1px solid #D4AF37', borderRadius: '12px' }, itemStyle: { color: '#D4AF37' } }), _jsx(Bar, { dataKey: "shipments", fill: "var(--color-primary)", radius: [4, 4, 0, 0] })] }) }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Quick Calculator" }) }), _jsx(CardContent, { children: _jsx(ShippingCalculator, { embedded: true }) })] }), _jsx(Card, { className: "bg-primary/5 border-primary/20 luxury-card", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "p-3 bg-primary rounded-xl text-primary-foreground", children: _jsx(Plus, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold", children: "Bulk Upload" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Upload CSV/Excel to create bulk orders" })] })] }), _jsxs(Button, { className: "w-full variant-outline bg-transparent border-primary/50 text-primary hover:bg-primary/10", children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), " Select Files"] })] }) })] })] }) }), _jsx(TabsContent, { value: "shipments", className: "m-0", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10 bg-background border-none shadow-none", placeholder: "Search tracking ID, receiver name..." })] }), _jsxs(Button, { variant: "outline", className: "rounded-xl", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), " Filter"] })] }), _jsx(Card, { className: "luxury-card overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Tracking ID" }), _jsx(TableHead, { children: "Recipient" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "COD Amount" }), _jsx(TableHead, { children: "Date Created" }), _jsx(TableHead, { className: "text-right", children: "Action" })] }) }), _jsx(TableBody, { children: MOCK_SHIPMENTS.map((shipment) => (_jsxs(TableRow, { className: "hover:bg-muted/30", children: [_jsx(TableCell, { className: "font-mono text-xs font-bold", children: shipment.awb }), _jsx(TableCell, { children: shipment.receiverName }), _jsx(TableCell, { children: shipment.destinationTownship }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: shipment.status || '', type: "shipment" }) }), _jsx(TableCell, { children: shipment.cod_amount ? formatCurrency(shipment.cod_amount) : '-' }), _jsx(TableCell, { children: formatDate(shipment.createdAt || '') }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }) })] }, shipment.id))) })] }) })] }) }), _jsx(TabsContent, { value: "create", className: "m-0", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, className: "max-w-4xl mx-auto", children: _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Register New Shipment" }), _jsx(CardDescription, { children: "Enter receiverName details and package dimensions to generate a tracking ID" })] }), _jsx(CardContent, { children: _jsx(DataEntryForm, { onSubmit: handleShipmentSubmit, mode: "create" }) })] }) }) }), _jsx(TabsContent, { value: "financials", className: "m-0", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 luxury-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Invoices & Settlements" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Invoice #" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Amount" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Download" })] }) }), _jsx(TableBody, { children: MOCK_INVOICES.map((inv) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-bold", children: inv.id }), _jsx(TableCell, { children: inv.date }), _jsx(TableCell, { children: formatCurrency(inv.amount) }), _jsx(TableCell, { children: _jsx(Badge, { variant: inv.status === 'PAID' ? 'default' : 'outline', className: inv.status === 'PAID' ? 'bg-success text-success-foreground' : '', children: inv.status }) }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Download, { className: "w-4 h-4" }) }) })] }, inv.id))) })] }) })] }), _jsxs(Card, { className: "luxury-card bg-primary text-primary-foreground", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Wallet Balance" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm opacity-80", children: "Available for Payout" }), _jsx("h2", { className: "text-4xl font-bold", children: formatCurrency(2840000) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Pending Settlement" }), _jsx("span", { children: formatCurrency(120000) })] }), _jsx("div", { className: "w-full h-1 bg-white/20 rounded-full", children: _jsx("div", { className: "w-[70%] h-full bg-white rounded-full" }) })] }), _jsx(Button, { className: "w-full bg-white text-primary hover:bg-white/90 font-bold uppercase tracking-widest text-[10px]", children: "Request Withdrawal" })] })] })] }) })] })] })] })] }));
}
function StatCard({ icon, label, value, trend }) {
    const isPositive = trend.startsWith('+');
    return (_jsx(Card, { className: "luxury-card hover:translate-y-[-4px]", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "p-2 bg-primary/10 text-primary rounded-lg", children: icon }), _jsx(Badge, { variant: "secondary", className: `text-[10px] ${isPositive ? 'text-success' : 'text-muted-foreground'}`, children: trend })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-1", children: label }), _jsx("h3", { className: "text-2xl font-bold tracking-tight", children: value })] }) }));
}
