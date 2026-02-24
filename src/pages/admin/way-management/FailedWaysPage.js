import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RotateCcw, PackageMinus, Search, Filter, Eye, MoreVertical, User, MapPin, Phone, ArrowUpRight, Download, History } from 'lucide-react';
import { SHIPMENT_STATUSES } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Card, CardContent, } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
// Mock Data for Failed Deliveries
const MOCK_FAILED_WAYS = [
    {
        id: 'FW-10293',
        trackingId: 'BRT-2026-0001',
        merchant: 'Elite Electronics',
        customer: 'Daw Myint Myint',
        phone: '09-777888999',
        address: 'No. 123, Pyay Road, Kamayut Tsp, Yangon',
        failedReason: 'Customer Unavailable',
        failedAttempts: 2,
        lastAttempt: '2026-02-04 09:30 AM',
        codAmount: 45000,
        status: SHIPMENT_STATUSES.FAILED,
    },
    {
        id: 'FW-10294',
        trackingId: 'BRT-2026-0005',
        merchant: 'Fashion Hub MM',
        customer: 'U Kyaw Swar',
        phone: '09-444555666',
        address: 'Bldg 5, Room 102, Hledan, Yangon',
        failedReason: 'Wrong Address',
        failedAttempts: 1,
        lastAttempt: '2026-02-04 10:15 AM',
        codAmount: 28000,
        status: SHIPMENT_STATUSES.FAILED,
    },
    {
        id: 'FW-10295',
        trackingId: 'BRT-2026-0012',
        merchant: 'Nature Beauty',
        customer: 'Ma Su Mon',
        phone: '09-111222333',
        address: '34th Street, Kyauktada Tsp, Yangon',
        failedReason: 'Rejected by Customer',
        failedAttempts: 1,
        lastAttempt: '2026-02-03 04:45 PM',
        codAmount: 15500,
        status: SHIPMENT_STATUSES.FAILED,
    },
    {
        id: 'FW-10296',
        trackingId: 'BRT-2026-0018',
        merchant: 'Tech Zone',
        customer: 'U Ba Maung',
        phone: '09-999000111',
        address: 'No. 45, Insein Road, Hlaing Tsp, Yangon',
        failedReason: 'Incomplete Address',
        failedAttempts: 3,
        lastAttempt: '2026-02-04 11:00 AM',
        codAmount: 125000,
        status: SHIPMENT_STATUSES.FAILED,
    },
];
const FailedWaysPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState('');
    const [reasonFilter, setReasonFilter] = useState('all');
    const [selectedWay, setSelectedWay] = useState(null);
    const [isRetryDialogOpen, setIsRetryDialogOpen] = useState(false);
    const filteredWays = useMemo(() => {
        return MOCK_FAILED_WAYS.filter((way) => {
            const matchesSearch = way.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                way.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                way.merchant.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesReason = reasonFilter === 'all' || way.failedReason === reasonFilter;
            return matchesSearch && matchesReason;
        });
    }, [searchQuery, reasonFilter]);
    const stats = [
        {
            label: language === 'en' ? 'Total Failed Today' : 'ယနေ့ မအောင်မြင်မှု စုစုပေါင်း',
            value: '24',
            icon: AlertCircle,
            color: 'text-destructive',
            bg: 'bg-destructive/10'
        },
        {
            label: language === 'en' ? 'Retries in Progress' : 'ပြန်လည်ပို့ဆောင်ဆဲ',
            value: '12',
            icon: RotateCcw,
            color: 'text-info',
            bg: 'bg-info/10'
        },
        {
            label: language === 'en' ? 'Returned to Merchant' : 'ကုန်သည်ထံ ပြန်ပို့ပြီး',
            value: '08',
            icon: PackageMinus,
            color: 'text-warning',
            bg: 'bg-warning/10'
        },
        {
            label: language === 'en' ? 'Success Rate After Retry' : 'ပြန်ပို့ပြီး အောင်မြင်မှုနှုန်း',
            value: '68%',
            icon: ArrowUpRight,
            color: 'text-success',
            bg: 'bg-success/10'
        },
    ];
    const handleRetry = (way) => {
        setSelectedWay(way);
        setIsRetryDialogOpen(true);
    };
    return (_jsxs("div", { className: "min-h-screen p-4 md:p-8 space-y-8 bg-background", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-8 h-8 text-destructive" }), t('way.failedWays')] }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? 'Manage failed delivery attempts and schedule retries or returns.'
                                    : 'မအောင်မြင်သော ပို့ဆောင်မှုများကို စီမံခန့်ခွဲပြီး ပြန်လည်ပို့ဆောင်ရန် သို့မဟုတ် ပြန်ပို့ရန် စီစဉ်ပါ။' })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(Download, { className: "w-4 h-4" }), t('common.export')] }), _jsxs(Button, { className: "luxury-button gap-2", children: [_jsx(History, { className: "w-4 h-4" }), language === 'en' ? 'Retry All' : 'အားလုံးကို ပြန်ပို့ရန်'] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "lotus-card overflow-hidden group hover:scale-[1.02] transition-transform", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: `p-3 rounded-xl ${stat.bg} ${stat.color}`, children: _jsx(stat.icon, { className: "w-6 h-6" }) }), _jsxs(Badge, { variant: "secondary", className: "bg-gold-500/10 text-gold-600 border-gold-400/20", children: ["+12% ", language === 'en' ? 'Today' : 'ယနေ့'] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("p", { className: "text-2xl font-bold mt-1 text-foreground", children: stat.value })] })] }) }) }, idx))) }), _jsx(Card, { className: "border-border shadow-sm", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 w-full", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" }), _jsx(Input, { placeholder: t('common.search') + " (ID, Merchant, Customer)...", className: "pl-10 h-11", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex gap-2 w-full md:w-auto", children: [_jsxs(Select, { value: reasonFilter, onValueChange: setReasonFilter, children: [_jsxs(SelectTrigger, { className: "w-full md:w-[200px] h-11", children: [_jsx(Filter, { className: "w-4 h-4 mr-2 text-muted-foreground" }), _jsx(SelectValue, { placeholder: t('common.filter') })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: t('common.all') }), _jsx(SelectItem, { value: "Customer Unavailable", children: "Customer Unavailable" }), _jsx(SelectItem, { value: "Wrong Address", children: "Wrong Address" }), _jsx(SelectItem, { value: "Rejected by Customer", children: "Rejected by Customer" }), _jsx(SelectItem, { value: "Incomplete Address", children: "Incomplete Address" })] })] }), _jsx(Button, { variant: "outline", className: "h-11 px-6 border-gold-500/30 text-gold-600", children: t('common.filter') })] })] }) }) }), _jsxs(Card, { className: "overflow-hidden border-border", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: t('tracking.trackingNumber') }), _jsx(TableHead, { children: t('order.merchant') }), _jsx(TableHead, { children: t('order.customer') }), _jsx(TableHead, { children: language === 'en' ? 'Failure Reason' : 'မအောင်မြင်ရသည့်အကြောင်းအရင်း' }), _jsx(TableHead, { children: language === 'en' ? 'Attempts' : 'ကြိုးစားမှုအကြိမ်ရေ' }), _jsx(TableHead, { children: t('common.date') }), _jsx(TableHead, { className: "text-right", children: t('common.view') })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredWays.map((way) => (_jsxs(motion.tr, { layout: true, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "group hover:bg-muted/30 transition-colors", children: [_jsx(TableCell, { className: "font-mono font-bold text-navy-900", children: way.trackingId }), _jsx(TableCell, { className: "font-medium", children: way.merchant }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: way.customer }), _jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Phone, { className: "w-3 h-3" }), " ", way.phone] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "bg-destructive/5 text-destructive border-destructive/20", children: way.failedReason }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-1", children: [Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: `w-2 h-2 rounded-full ${i < way.failedAttempts ? 'bg-destructive' : 'bg-muted'}` }, i))), _jsxs("span", { className: "text-xs ml-1", children: [way.failedAttempts, "/3"] })] }) }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: way.lastAttempt }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuLabel, { children: t('common.view') }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'View Details' : 'အသေးစိတ်ကြည့်ရန်'] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => handleRetry(way), children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2 text-success" }), language === 'en' ? 'Retry Delivery' : 'ပြန်လည်ပို့ဆောင်ရန်'] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive focus:bg-destructive/10", children: [_jsx(PackageMinus, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Return to Sender' : 'ပေးပို့သူထံပြန်ပို့ရန်'] })] })] }) })] }, way.id))) }) })] }) }), filteredWays.length === 0 && (_jsxs("div", { className: "p-12 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4", children: _jsx(Search, { className: "w-8 h-8 text-muted-foreground" }) }), _jsx("h3", { className: "text-lg font-semibold", children: language === 'en' ? 'No records found' : 'ရှာဖွေမှုမတွေ့ရှိပါ' }), _jsx("p", { className: "text-muted-foreground", children: language === 'en' ? 'Try adjusting your search or filters.' : 'ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှုများကို ပြင်ဆင်ကြည့်ပါ။' })] }))] }), _jsx(Dialog, { open: isRetryDialogOpen, onOpenChange: setIsRetryDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(RotateCcw, { className: "w-5 h-5 text-success" }), language === 'en' ? 'Schedule Retry Delivery' : 'ပို့ဆောင်မှု ပြန်လည်စီစဉ်ရန်'] }), _jsx(DialogDescription, { children: language === 'en'
                                        ? `Assign a new slot or rider for ${selectedWay?.trackingId}`
                                        : `${selectedWay?.trackingId} အတွက် ပို့ဆောင်သူအသစ် သို့မဟုတ် အချိန်အသစ် သတ်မှတ်ပါ။` })] }), selectedWay && (_jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { className: "bg-muted/30 p-4 rounded-lg border border-border space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(User, { className: "w-4 h-4 mt-1 text-gold-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: selectedWay.customer }), _jsx("p", { className: "text-xs text-muted-foreground", children: selectedWay.phone })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPin, { className: "w-4 h-4 mt-1 text-gold-600" }), _jsx("p", { className: "text-xs", children: selectedWay.address })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: language === 'en' ? 'Retry Date' : 'ပြန်ပို့မည့်ရက်' }), _jsx(Input, { type: "date", className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: language === 'en' ? 'Time Slot' : 'အချိန်အပိုင်းအခြား' }), _jsxs(Select, { defaultValue: "morning", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Time" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "morning", children: "Morning (9:00 - 12:00)" }), _jsx(SelectItem, { value: "afternoon", children: "Afternoon (13:00 - 17:00)" }), _jsx(SelectItem, { value: "evening", children: "Evening (18:00 - 21:00)" })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: language === 'en' ? 'Assign Rider' : 'ပို့ဆောင်သူ သတ်မှတ်ရန်' }), _jsxs(Select, { defaultValue: "rider-1", children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Rider" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "rider-1", children: "U Kyaw Gyi (Yangon Central)" }), _jsx(SelectItem, { value: "rider-2", children: "Ko Zaw (Kamayut District)" }), _jsx(SelectItem, { value: "rider-3", children: "Maung Maung (Hledan Area)" })] })] })] })] })), _jsxs(DialogFooter, { className: "gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsRetryDialogOpen(false), children: t('common.cancel') }), _jsx(Button, { className: "luxury-button", onClick: () => setIsRetryDialogOpen(false), children: language === 'en' ? 'Confirm Retry' : 'ပြန်ပို့ရန် အတည်ပြုသည်' })] })] }) })] }));
};
export default FailedWaysPage;
