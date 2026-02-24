import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, MoreVertical, Phone, MapPin, Bike, Star, CheckCircle2, Clock, AlertCircle, Download, Eye, Edit3, DollarSign, UserX } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { staggerContainer, staggerItem } from '@/lib/motion';
// Mock Data for Deliverymen
const MOCK_DELIVERYMEN = [
    {
        id: 'DM001',
        name: 'Aung Kyaw',
        phone: '09-778899001',
        vehicle: 'Motorcycle (YGN-1A/1234)',
        zone: 'Kamayut',
        status: 'active',
        onDuty: true,
        rating: 4.8,
        completedDeliveries: 1240,
        successRate: '98.5%',
        lastActive: '2026-02-04 10:15',
    },
    {
        id: 'DM002',
        name: 'Min Thu',
        phone: '09-778899002',
        vehicle: 'Motorcycle (YGN-2B/5678)',
        zone: 'Sanchaung',
        status: 'active',
        onDuty: false,
        rating: 4.5,
        completedDeliveries: 850,
        successRate: '96.2%',
        lastActive: '2026-02-03 18:30',
    },
    {
        id: 'DM003',
        name: 'Kyaw Zin',
        phone: '09-778899003',
        vehicle: 'Van (YGN-3C/9012)',
        zone: 'Hlaing',
        status: 'inactive',
        onDuty: false,
        rating: 4.2,
        completedDeliveries: 420,
        successRate: '94.0%',
        lastActive: '2026-01-28 14:20',
    },
    {
        id: 'DM004',
        name: 'Thura Tun',
        phone: '09-778899004',
        vehicle: 'Motorcycle (YGN-4D/3456)',
        zone: 'Mayangone',
        status: 'active',
        onDuty: true,
        rating: 4.9,
        completedDeliveries: 2100,
        successRate: '99.1%',
        lastActive: '2026-02-04 11:05',
    },
    {
        id: 'DM005',
        name: 'Zayar Myo',
        phone: '09-778899005',
        vehicle: 'Motorcycle (YGN-5E/7890)',
        zone: 'Kamayut',
        status: 'active',
        onDuty: true,
        rating: 4.7,
        completedDeliveries: 1560,
        successRate: '97.8%',
        lastActive: '2026-02-04 09:45',
    }
];
const DeliverymanListPage = () => {
    const navigate = useNavigate();
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [zoneFilter, setZoneFilter] = useState('all');
    const filteredDeliverymen = useMemo(() => {
        return MOCK_DELIVERYMEN.filter(dm => {
            const matchesSearch = dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dm.phone.includes(searchQuery) ||
                dm.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || dm.status === statusFilter;
            const matchesZone = zoneFilter === 'all' || dm.zone === zoneFilter;
            return matchesSearch && matchesStatus && matchesZone;
        });
    }, [searchQuery, statusFilter, zoneFilter]);
    const stats = {
        total: MOCK_DELIVERYMEN.length,
        active: MOCK_DELIVERYMEN.filter(dm => dm.status === 'active').length,
        onDuty: MOCK_DELIVERYMEN.filter(dm => dm.onDuty).length,
        avgRating: (MOCK_DELIVERYMEN.reduce((acc, curr) => acc + curr.rating, 0) / MOCK_DELIVERYMEN.length).toFixed(1)
    };
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-[1600px] mx-auto", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900 dark:text-gold-400 font-display", children: t('deliveryman.list') }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en' ? 'Manage and monitor your delivery personnel performance' : 'ပို့ဆောင်သူများ၏ စွမ်းဆောင်ရည်ကို စီမံခန့်ခွဲပြီး စောင့်ကြည့်ပါ' })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-navy-200 text-navy-700 hover:bg-navy-50", onClick: () => { }, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Button, { className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20", onClick: () => navigate(ROUTE_PATHS.DELIVERYMAN_ADD_NEW), children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), t('deliveryman.addNew')] })] })] }), _jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "border-none shadow-md bg-white/50 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Riders" }), _jsx("h3", { className: "text-2xl font-bold text-navy-900", children: stats.total })] }), _jsx("div", { className: "p-3 bg-navy-100 rounded-xl text-navy-600", children: _jsx(Bike, { className: "h-6 w-6" }) })] }) }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "border-none shadow-md bg-white/50 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Now" }), _jsx("h3", { className: "text-2xl font-bold text-success", children: stats.active })] }), _jsx("div", { className: "p-3 bg-success/10 rounded-xl text-success", children: _jsx(CheckCircle2, { className: "h-6 w-6" }) })] }) }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "border-none shadow-md bg-white/50 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "On Duty" }), _jsx("h3", { className: "text-2xl font-bold text-info", children: stats.onDuty })] }), _jsx("div", { className: "p-3 bg-info/10 rounded-xl text-info", children: _jsx(Clock, { className: "h-6 w-6" }) })] }) }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "border-none shadow-md bg-white/50 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Avg. Rating" }), _jsxs("h3", { className: "text-2xl font-bold text-gold-600", children: [stats.avgRating, " / 5.0"] })] }), _jsx("div", { className: "p-3 bg-gold-100 rounded-xl text-gold-600", children: _jsx(Star, { className: "h-6 w-6 fill-current" }) })] }) }) }) })] }), _jsx(Card, { className: "border-none shadow-sm", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search') + "...", className: "pl-10 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[150px] bg-muted/30 border-none", children: _jsx(SelectValue, { placeholder: t('deliveryman.status') }) }), _jsxs(SelectContent, { children: [_jsxs(SelectItem, { value: "all", children: [t('common.all'), " Status"] }), _jsx(SelectItem, { value: "active", children: t('common.active') }), _jsx(SelectItem, { value: "inactive", children: t('common.inactive') })] })] }), _jsxs(Select, { value: zoneFilter, onValueChange: setZoneFilter, children: [_jsx(SelectTrigger, { className: "w-[150px] bg-muted/30 border-none", children: _jsx(SelectValue, { placeholder: t('deliveryman.zone') }) }), _jsxs(SelectContent, { children: [_jsxs(SelectItem, { value: "all", children: [t('common.all'), " Zones"] }), _jsx(SelectItem, { value: "Kamayut", children: "Kamayut" }), _jsx(SelectItem, { value: "Sanchaung", children: "Sanchaung" }), _jsx(SelectItem, { value: "Hlaing", children: "Hlaing" }), _jsx(SelectItem, { value: "Mayangone", children: "Mayangone" })] })] }), _jsxs(Button, { variant: "outline", className: "border-none bg-muted/30 hover:bg-muted/50", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), t('common.filter')] })] })] }) }) }), _jsxs(Card, { className: "border-none shadow-xl overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50/50", children: _jsxs(TableRow, { className: "hover:bg-transparent", children: [_jsx(TableHead, { className: "w-[250px] font-semibold text-navy-900", children: t('deliveryman.name') }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: t('deliveryman.vehicle') }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: t('deliveryman.zone') }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: t('deliveryman.status') }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: "Rating" }), _jsx(TableHead, { className: "font-semibold text-navy-900 text-right", children: t('deliveryman.completedDeliveries') }), _jsx(TableHead, { className: "w-[80px]" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredDeliverymen.map((dm) => (_jsxs(motion.tr, { layout: true, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "group hover:bg-navy-50/30 transition-colors", children: [_jsx(TableCell, { className: "py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center font-bold text-navy-700 shadow-inner", children: dm.name.charAt(0) }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-navy-900", children: dm.name }), _jsxs("div", { className: "text-xs text-muted-foreground font-mono flex items-center gap-1", children: [_jsx(Phone, { className: "h-3 w-3" }), " ", dm.phone] })] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bike, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: dm.vehicle })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: dm.zone })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx(Badge, { variant: dm.status === 'active' ? 'outline' : 'secondary', className: `w-fit rounded-md ${dm.status === 'active'
                                                                    ? 'border-success/30 bg-success/10 text-success'
                                                                    : 'bg-muted text-muted-foreground'}`, children: dm.status === 'active' ? t('common.active') : t('common.inactive') }), dm.onDuty && (_jsxs("span", { className: "flex items-center gap-1.5 text-[10px] text-info font-bold uppercase tracking-wider", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-info animate-pulse" }), "On Duty"] }))] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "h-4 w-4 fill-gold-500 text-gold-500" }), _jsx("span", { className: "font-medium", children: dm.rating }), _jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: ["(", dm.successRate, ")"] })] }) }), _jsx(TableCell, { className: "text-right", children: _jsx("span", { className: "font-mono font-bold", children: dm.completedDeliveries.toLocaleString() }) }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => { }, className: "cursor-pointer", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), t('common.view'), " Profile"] }), _jsxs(DropdownMenuItem, { onClick: () => { }, className: "cursor-pointer", children: [_jsx(Edit3, { className: "mr-2 h-4 w-4" }), t('common.edit'), " Info"] }), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.DELIVERYMAN_CASH_ADVANCE), className: "cursor-pointer text-gold-600 focus:text-gold-600 focus:bg-gold-50", children: [_jsx(DollarSign, { className: "mr-2 h-4 w-4" }), "Manage Cash Advance"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => { }, className: "cursor-pointer text-destructive focus:text-destructive", children: [_jsx(UserX, { className: "mr-2 h-4 w-4" }), "Deactivate Account"] })] })] }) })] }, dm.id))) }) })] }) }), _jsxs("div", { className: "p-4 border-t bg-muted/10 flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", _jsx("span", { className: "font-medium text-navy-900", children: filteredDeliverymen.length }), " of ", _jsx("span", { className: "font-medium text-navy-900", children: stats.total }), " deliverymen"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, className: "h-8", children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", disabled: true, className: "h-8", children: t('common.next') })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "border-none shadow-md", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Star, { className: "h-5 w-5 text-gold-500" }), "Top Performers"] }) }), _jsx(CardContent, { className: "space-y-4", children: MOCK_DELIVERYMEN.sort((a, b) => b.rating - a.rating).slice(0, 3).map((dm, idx) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-navy-50/50", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-sm font-bold text-navy-400", children: ["#", idx + 1] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-navy-900", children: dm.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: dm.zone })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-bold text-gold-600", children: [dm.rating, " Stars"] }), _jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: [dm.successRate, " Success"] })] })] }, dm.id))) })] }), _jsxs(Card, { className: "border-none shadow-md", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-warning" }), "Status Alerts"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/10", children: [_jsx(Clock, { className: "h-5 w-5 text-warning mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-warning-foreground", children: "Inactive Rider: Kyaw Zin" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Last active 7 days ago. Consider deactivating or re-engaging." })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-success mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-success-foreground", children: "High Traffic: Kamayut Zone" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "3 riders currently on duty. Operations running smoothly." })] })] })] })] })] })] }));
};
export default DeliverymanListPage;
