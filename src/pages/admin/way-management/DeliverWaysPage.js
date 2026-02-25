import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Truck, Calendar, Clock, MoreVertical, Eye, Edit2, CheckCircle2, AlertCircle, ChevronRight, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { deliveryWaysAPI } from '@/lib/api';
// Mock Data for Delivery Ways
const MOCK_DELIVERY_WAYS = [
    {
        id: "WAY-2026-001",
        trackingId: "BR-9921882",
        merchant: "Global Electronics",
        receiverName: "U Kyaw Zay Yar",
        destinationTownship: "Yangon, Hlaing Tsp",
        status: "in_transit",
        driver: "Ko Aung Gyi",
        scheduledDate: "2026-02-04",
        priority: "high",
        cod: "45,000 MMK"
    },
    {
        id: "WAY-2026-002",
        trackingId: "BR-9921883",
        merchant: "Lotus Fashion",
        receiverName: "Daw Hla Hla",
        destinationTownship: "Mandalay, Chan Aye Thar San",
        status: "pending",
        driver: "Ko Min Min",
        scheduledDate: "2026-02-04",
        priority: "normal",
        cod: "12,500 MMK"
    },
    {
        id: "WAY-2026-003",
        trackingId: "BR-9921884",
        merchant: "K-Mart Mart",
        receiverName: "Mg Zaw Win",
        destinationTownship: "Naypyidaw, Zabuthiri",
        status: "out_for_delivery",
        driver: "Ko Tun Tun",
        scheduledDate: "2026-02-04",
        priority: "urgent",
        cod: "89,000 MMK"
    },
    {
        id: "WAY-2026-004",
        trackingId: "BR-9921885",
        merchant: "Tech City",
        receiverName: "Ma Phyu Phyu",
        destinationTownship: "Taunggyi, Southern Shan",
        status: "delivered",
        driver: "Ko Soe Lin",
        scheduledDate: "2026-02-03",
        priority: "normal",
        cod: "0 MMK"
    },
    {
        id: "WAY-2026-005",
        trackingId: "BR-9921886",
        merchant: "Beauty Secret",
        receiverName: "Daw Khin Swe",
        destinationTownship: "Bago, Town Center",
        status: "failed",
        driver: "Ko Kyaw",
        scheduledDate: "2026-02-04",
        priority: "normal",
        cod: "23,000 MMK"
    }
];
const DeliverWaysPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState('');
    const [deliveryWays, setDeliveryWays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Load delivery ways data
    useEffect(() => {
        const loadDeliveryWays = async () => {
            try {
                setLoading(true);
                const response = await deliveryWaysAPI.list();
                if (response.success && response.data) {
                    setDeliveryWays(response.data);
                }
                else {
                    setError(response.error || 'Failed to load delivery ways');
                }
            }
            catch (err) {
                setError('Failed to load delivery ways');
                console.error('Error loading delivery ways:', err);
            }
            finally {
                setLoading(false);
            }
        };
        loadDeliveryWays();
    }, []);
    // Filter delivery ways based on search query
    const filteredDeliveryWays = deliveryWays.filter(way => way.awb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        way.pickup_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        way.delivery_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (way.rider_name && way.rider_name.toLowerCase().includes(searchQuery.toLowerCase())));
    const getStatusBadge = (status) => {
        switch (status) {
            case 'delivered':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: t('tracking.delivered') });
            case 'in_transit':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: t('tracking.inTransit') });
            case 'out_for_delivery':
                return _jsx(Badge, { className: "bg-gold-500/10 text-gold-600 border-gold-500/20", children: t('tracking.outForDelivery') });
            case 'pending':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: t('common.pending') });
            case 'failed':
                return _jsx(Badge, { variant: "destructive", children: t('tracking.failed') });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    return (_jsxs("div", { className: "min-h-screen p-4 md:p-8 space-y-8 bg-background", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900", children: t('way.deliverWays') }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? "Manage active delivery routes and track real-time shipment status."
                                    : "လက်ရှိ ပို့ဆောင်မှု လမ်းကြောင်းများနှင့် အချိန်နှင့်တပြေးညီ အခြေအနေများကို စီမံခန့်ခွဲပါ။" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-gold-400/50 text-gold-600 hover:bg-gold-50", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Button, { className: "luxury-button", children: [_jsx(Truck, { className: "mr-2 h-4 w-4" }), t('way.createDeliveryPickup')] })] })] }), _jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "lotus-card border-none shadow-lg", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gold-200/80 uppercase tracking-wider", children: t('dashboard.totalOrders') }), _jsx("h3", { className: "text-3xl font-bold text-white mt-1", children: deliveryWays.length.toLocaleString() })] }), _jsx("div", { className: "p-3 bg-gold-500/20 rounded-xl", children: _jsx(Truck, { className: "h-6 w-6 text-gold-400" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-gold-300/60", children: [_jsx(CheckCircle2, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: "+12% from yesterday" })] })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: t('dashboard.pendingDeliveries') }), _jsx("h3", { className: "text-3xl font-bold text-navy-900 mt-1", children: deliveryWays.filter(w => w.status === 'pending').length })] }), _jsx("div", { className: "p-3 bg-warning/10 rounded-xl", children: _jsx(Clock, { className: "h-6 w-6 text-warning" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-warning", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: "8 urgent deliveries" })] })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: t('tracking.inTransit') }), _jsx("h3", { className: "text-3xl font-bold text-navy-900 mt-1", children: deliveryWays.filter(w => w.status === 'in_transit').length })] }), _jsx("div", { className: "p-3 bg-info/10 rounded-xl", children: _jsx(MapPin, { className: "h-6 w-6 text-info" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-info", children: [_jsx(Truck, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: "12 trucks active" })] })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: t('dashboard.completedDeliveries') }), _jsx("h3", { className: "text-3xl font-bold text-navy-900 mt-1", children: deliveryWays.filter(w => w.status === 'delivered').length })] }), _jsx("div", { className: "p-3 bg-success/10 rounded-xl", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-success" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-success", children: [_jsx(CheckCircle2, { className: "h-3 w-3 mr-1" }), _jsxs("span", { children: [deliveryWays.length > 0 ? ((deliveryWays.filter(w => w.status === 'delivered').length / deliveryWays.length) * 100).toFixed(1) : 0, "% success rate"] })] })] }) }) })] }), _jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "space-y-4", children: [_jsxs(Card, { className: "glass-card overflow-hidden border-navy-100", children: [_jsx(CardHeader, { className: "pb-3 border-b border-navy-50", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(Truck, { className: "mr-2 h-5 w-5 text-gold-500" }), t('way.management')] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto", children: [_jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search') + "...", className: "pl-10 bg-muted/30 border-navy-100 focus:border-gold-400", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), t('common.filter')] })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: t('tracking.awb') }), _jsx(TableHead, { children: t('merchant.title') }), _jsx(TableHead, { children: t('order.customer') }), _jsx(TableHead, { children: t('tracking.location') }), _jsx(TableHead, { children: t('deliveryman.name') }), _jsx(TableHead, { children: t('tracking.status') }), _jsx(TableHead, { className: "text-right", children: t('common.total') }), _jsx(TableHead, { className: "w-[50px]" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 8, className: "text-center py-8", children: _jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500" }), _jsxs("span", { className: "ml-2", children: [t('common.loading'), "..."] })] }) }) })) : error ? (_jsx(TableRow, { children: _jsxs(TableCell, { colSpan: 8, className: "text-center py-8 text-destructive", children: [_jsx(AlertCircle, { className: "h-8 w-8 mx-auto mb-2" }), _jsx("p", { children: error })] }) })) : filteredDeliveryWays.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 8, className: "text-center py-8 text-muted-foreground", children: searchQuery ? t('common.noSearchResults') : t('common.noData') }) })) : (filteredDeliveryWays.map((way) => (_jsxs(TableRow, { className: "hover:bg-navy-50/30 transition-colors", children: [_jsx(TableCell, { className: "font-mono font-medium text-navy-900", children: way.awb }), _jsx(TableCell, { className: "font-medium", children: way.pickup_address.split(',')[0] || 'N/A' }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: way.delivery_address.split(',')[0] || 'Customer' }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Delivery Address" })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center text-sm", children: [_jsx(MapPin, { className: "h-3.5 w-3.5 mr-1 text-gold-500" }), way.delivery_address] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-xs", children: way.rider_name ? way.rider_name.split(' ').map(n => n[0]).join('') : 'N/A' }), _jsx("span", { className: "text-sm", children: way.rider_name || 'Unassigned' })] }) }), _jsx(TableCell, { children: getStatusBadge(way.status) }), _jsx(TableCell, { className: "text-right font-mono text-navy-700 font-semibold", children: way.cod_amount ? `${way.cod_amount.toLocaleString()} MMK` : `${way.delivery_fee.toLocaleString()} MMK` }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), t('common.view')] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Edit2, { className: "mr-2 h-4 w-4" }), t('common.edit')] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive", children: [_jsx(AlertCircle, { className: "mr-2 h-4 w-4" }), t('common.cancel')] })] })] }) })] }, way.id)))) })] }) }) })] }), _jsxs("div", { className: "flex items-center justify-between px-2", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", _jsx("span", { className: "font-medium", children: "1-5" }), " of ", _jsx("span", { className: "font-medium", children: "124" }), " ways"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-gold-500 text-navy-900 border-gold-600", children: "1" }), _jsx(Button, { variant: "outline", size: "sm", children: "2" }), _jsx(Button, { variant: "outline", size: "sm", children: "3" }), _jsx(Button, { variant: "outline", size: "sm", children: t('common.next') })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10", children: [_jsxs(Card, { className: "glass-card col-span-1 border-navy-100", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-base flex items-center", children: [_jsx(Calendar, { className: "mr-2 h-5 w-5 text-gold-500" }), language === 'en' ? "Upcoming Pickups" : "လာမည့် ကောက်ယူမှုများ"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [[1, 2, 3].map((i) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-navy-50/50 hover:bg-navy-100/50 transition-colors cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-white rounded-md shadow-sm", children: _jsx(MapPin, { className: "h-4 w-4 text-navy-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-navy-900", children: "Sein Gay Har Center" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "14:30 PM \u2022 5 items" })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-navy-300" })] }, i))), _jsxs(Button, { variant: "link", className: "w-full text-gold-600 font-semibold", children: [t('common.view'), " ", t('common.all')] })] })] }), _jsxs(Card, { className: "glass-card col-span-1 lg:col-span-2 border-navy-100", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-base flex items-center", children: [_jsx(Truck, { className: "mr-2 h-5 w-5 text-gold-500" }), language === 'en' ? "Fleet Status Overview" : "ယာဉ်အုပ်စု အခြေအနေ အနှစ်ချုပ်"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
                                            { label: 'Active', val: 24, color: 'text-success' },
                                            { label: 'Idle', val: 5, color: 'text-muted-foreground' },
                                            { label: 'Repair', val: 2, color: 'text-destructive' },
                                            { label: 'Off-duty', val: 12, color: 'text-navy-400' }
                                        ].map((status, idx) => (_jsxs("div", { className: "text-center p-4 rounded-xl bg-white border border-navy-50", children: [_jsx("p", { className: `text-2xl font-bold ${status.color}`, children: status.val }), _jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase", children: status.label })] }, idx))) }), _jsxs("div", { className: "mt-6 p-4 rounded-lg bg-navy-900 text-white flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Truck, { className: "h-6 w-6 text-gold-400 animate-float" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold", children: "Optimizing Routes..." }), _jsx("p", { className: "text-xs text-gold-300/60", children: "AI-powered route optimization is active" })] })] }), _jsxs(Button, { size: "sm", className: "bg-gold-500 text-navy-900 hover:bg-gold-600", children: [t('common.view'), " Map"] })] })] })] })] })] }));
};
export default DeliverWaysPage;
