import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, TrendingUp, Users, ShoppingBag, DollarSign, Download, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { motion } from 'framer-motion';
// Mock Merchant Data
const MOCK_MERCHANTS = [
    {
        id: 'M001',
        name: 'Glory Fashion Hub',
        owner: 'Daw Aye Aye',
        phone: '09-777123456',
        email: 'contact@gloryfashion.mm',
        address: 'No. 123, Pyay Road, Yangon',
        status: 'active',
        registrationDate: '2025-11-15',
        totalOrders: 1250,
        revenue: 15450000,
        performance: 'excellent',
    },
    {
        id: 'M002',
        name: 'Tech Zone Myanmar',
        owner: 'U Kyaw Zwa',
        phone: '09-444987654',
        email: 'info@techzone.com',
        address: '34th Street, Mandalay',
        status: 'active',
        registrationDate: '2026-01-10',
        totalOrders: 450,
        revenue: 8900000,
        performance: 'good',
    },
    {
        id: 'M003',
        name: 'Pure Organic Foods',
        owner: 'Ma Thida',
        phone: '09-222333444',
        email: 'pure@organic.mm',
        address: 'Bagan Road, Taunggyi',
        status: 'inactive',
        registrationDate: '2024-05-20',
        totalOrders: 2100,
        revenue: 45000000,
        performance: 'needs_review',
    },
    {
        id: 'M004',
        name: 'Home Decor Express',
        owner: 'U Min Hein',
        phone: '09-555666777',
        email: 'admin@homedecor.com',
        address: 'Kabar Aye Pagoda Rd, Yangon',
        status: 'active',
        registrationDate: '2026-02-01',
        totalOrders: 15,
        revenue: 1200000,
        performance: 'new',
    }
];
const MerchantListPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredMerchants = useMemo(() => {
        return MOCK_MERCHANTS.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.phone.includes(searchQuery) ||
                m.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter]);
    const stats = [
        {
            title: t('common.total'),
            value: MOCK_MERCHANTS.length,
            icon: Users,
            color: 'text-navy-900',
            bg: 'bg-navy-50'
        },
        {
            title: t('common.active'),
            value: MOCK_MERCHANTS.filter(m => m.status === 'active').length,
            icon: CheckCircle2,
            color: 'text-success',
            bg: 'bg-success/10'
        },
        {
            title: t('merchant.totalOrders'),
            value: MOCK_MERCHANTS.reduce((acc, curr) => acc + curr.totalOrders, 0).toLocaleString(),
            icon: ShoppingBag,
            color: 'text-gold-600',
            bg: 'bg-gold-50'
        },
        {
            title: t('merchant.revenue'),
            value: `${MOCK_MERCHANTS.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString()} MMK`,
            icon: DollarSign,
            color: 'text-info',
            bg: 'bg-info/10'
        }
    ];
    const getPerformanceBadge = (perf) => {
        switch (perf) {
            case 'excellent':
                return _jsx(Badge, { className: "bg-success/20 text-success border-success/30", children: "Excellent" });
            case 'good':
                return _jsx(Badge, { className: "bg-info/20 text-info border-info/30", children: "Good" });
            case 'needs_review':
                return _jsx(Badge, { className: "bg-destructive/20 text-destructive border-destructive/30", children: "Review Needed" });
            case 'new':
                return _jsx(Badge, { className: "bg-gold-500/20 text-gold-600 border-gold-500/30", children: "New" });
            default:
                return _jsx(Badge, { variant: "outline", children: "Standard" });
        }
    };
    return (_jsxs("div", { className: "space-y-6 p-6 pb-20 animate-fade-in-up", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900", children: t('merchant.list') }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage and monitor your business partners" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(Download, { className: "h-4 w-4" }), t('common.export')] }), _jsxs(Button, { onClick: () => navigate(ROUTE_PATHS.MERCHANT_ADD_NEW), className: "gap-2 bg-gold-500 text-navy-900 hover:bg-gold-600 border-none", children: [_jsx(Plus, { className: "h-4 w-4" }), t('merchant.addNew')] })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "border-gold-500/20 shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.title }), _jsx("h3", { className: `text-2xl font-bold mt-1 ${stat.color}`, children: stat.value })] }), _jsx("div", { className: `p-3 rounded-xl ${stat.bg}`, children: _jsx(stat.icon, { className: `h-6 w-6 ${stat.color}` }) })] }) }) }) }, index))) }), _jsxs(Card, { className: "border-navy-100", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Filter, { className: "h-5 w-5 text-gold-500" }), t('common.filter')] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search'), className: "pl-10 border-navy-100 focus:border-gold-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "border-navy-100", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active Only" }), _jsx(SelectItem, { value: "inactive", children: "Inactive Only" })] })] }), _jsx(Button, { variant: "outline", className: "border-navy-100", onClick: () => { setSearchQuery(''); setStatusFilter('all'); }, children: t('common.reset') })] })] }), _jsx(Card, { className: "border-navy-100 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "text-navy-900 font-bold w-[300px]", children: t('merchant.name') }), _jsx(TableHead, { className: "text-navy-900 font-bold", children: t('merchant.status') }), _jsx(TableHead, { className: "text-navy-900 font-bold", children: t('merchant.totalOrders') }), _jsx(TableHead, { className: "text-navy-900 font-bold", children: t('merchant.revenue') }), _jsx(TableHead, { className: "text-navy-900 font-bold", children: "Performance" }), _jsx(TableHead, { className: "text-navy-900 font-bold text-right", children: t('warehouse.action') })] }) }), _jsx(TableBody, { children: filteredMerchants.length > 0 ? (filteredMerchants.map((merchant) => (_jsxs(TableRow, { className: "hover:bg-navy-50/50 transition-colors group", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "text-navy-900 font-bold flex items-center gap-2", children: [merchant.name, _jsx("span", { className: "text-[10px] bg-navy-100 px-1.5 py-0.5 rounded text-navy-500 font-mono", children: merchant.id })] }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Phone, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { className: "text-xs text-muted-foreground", children: merchant.phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[200px]", children: merchant.address })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: merchant.status === 'active' ? 'default' : 'secondary', className: merchant.status === 'active' ? 'bg-success text-white' : 'bg-muted', children: merchant.status.toUpperCase() }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ShoppingBag, { className: "h-4 w-4 text-navy-300" }), _jsx("span", { className: "font-semibold", children: merchant.totalOrders.toLocaleString() })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-bold text-navy-900", children: merchant.revenue.toLocaleString() }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: "MMK" })] }) }), _jsx(TableCell, { children: getPerformanceBadge(merchant.performance) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsxs(DropdownMenuItem, { onClick: () => navigate(`${ROUTE_PATHS.MERCHANT_LIST}/${merchant.id}`), children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), t('common.view'), " Details"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), t('common.edit')] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.MERCHANT_FINANCIAL_CENTER), children: [_jsx(DollarSign, { className: "mr-2 h-4 w-4" }), t('merchant.financialCenter')] }), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.MERCHANT_RECEIPTS), children: [_jsx(TrendingUp, { className: "mr-2 h-4 w-4" }), t('merchant.receipts')] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-destructive", children: [_jsx(XCircle, { className: "mr-2 h-4 w-4" }), "Deactivate Account"] })] })] }) })] }, merchant.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-32 text-center text-muted-foreground", children: "No merchants found matching your search." }) })) })] }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", _jsx("span", { className: "font-medium", children: filteredMerchants.length }), " of ", _jsx("span", { className: "font-medium", children: MOCK_MERCHANTS.length }), " merchants"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.next') })] })] })] }));
};
export default MerchantListPage;
