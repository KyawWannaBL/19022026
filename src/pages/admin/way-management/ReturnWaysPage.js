import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, RotateCcw, CheckCircle2, Clock, Package, ArrowLeftRight, MoreHorizontal, Eye, FileText, Undo2, AlertCircle } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
const ReturnWaysPage = () => {
    const { language } = useLanguageContext();
    const t = (key) => translations[language][key] || key;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    // Mock Data for Return Shipments
    const returnParcels = [
        {
            id: 'RET-2026-001',
            trackingNo: 'BE88492011',
            merchant: 'Elite Electronics',
            customer: 'Kyaw Zayar',
            reason: 'Damaged Item',
            returnDate: '2026-02-01',
            status: 'pending',
            amount: 45000,
            branch: 'Yangon Central'
        },
        {
            id: 'RET-2026-002',
            trackingNo: 'BE88492015',
            merchant: 'Beauty Bloom',
            customer: 'Su Su Lwin',
            reason: 'Wrong Color',
            returnDate: '2026-02-02',
            status: 'processing',
            amount: 12500,
            branch: 'Mandalay Station'
        },
        {
            id: 'RET-2026-003',
            trackingNo: 'BE88492022',
            merchant: 'Urban Fashion',
            customer: 'Min Thu',
            reason: 'Customer Refused',
            returnDate: '2026-02-03',
            status: 'completed',
            amount: 32000,
            branch: 'Yangon Central'
        },
        {
            id: 'RET-2026-004',
            trackingNo: 'BE88492030',
            merchant: 'Tech Zone',
            customer: 'Aung Myo',
            reason: 'Function Failure',
            returnDate: '2026-02-03',
            status: 'returned_to_merchant',
            amount: 158000,
            branch: 'Nay Pyi Taw'
        }
    ];
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return _jsx(Badge, { variant: "outline", className: "bg-yellow-500/10 text-yellow-600 border-yellow-200", children: t('common.pending') });
            case 'processing':
                return _jsx(Badge, { variant: "outline", className: "bg-blue-500/10 text-blue-600 border-blue-200", children: language === 'en' ? 'Processing' : 'လုပ်ဆောင်နေဆဲ' });
            case 'completed':
                return _jsx(Badge, { variant: "outline", className: "bg-green-500/10 text-green-600 border-green-200", children: t('common.completed') });
            case 'returned_to_merchant':
                return _jsx(Badge, { variant: "outline", className: "bg-purple-500/10 text-purple-600 border-purple-200", children: language === 'en' ? 'Returned to Merchant' : 'ကုန်သည်ထံပြန်ပို့ပြီး' });
            default:
                return _jsx(Badge, { children: status });
        }
    };
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900 myanmar-text", children: t('way.returnWays') }), _jsx("p", { className: "text-muted-foreground", children: language === 'en' ? 'Manage and track returned parcels and merchant refunds.' : 'ပြန်ပို့ပါဆယ်များနှင့် ကုန်သည်ငွေပြန်အမ်းမှုများကို စီမံခန့်ခွဲရန်။' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", className: "border-gold-400 text-navy-900", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Button, { className: "luxury-button", children: [_jsx(Undo2, { className: "mr-2 h-4 w-4" }), language === 'en' ? 'Process Batch Return' : 'အုပ်စုလိုက်ပြန်ပို့ရန်'] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: _jsx(Card, { className: "lotus-card border-none shadow-xl", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gold-400", children: language === 'en' ? 'Total Returns' : 'စုစုပေါင်း ပြန်ပို့မှု' }), _jsx("h3", { className: "text-2xl font-bold text-white", children: "128" })] }), _jsx("div", { className: "p-3 bg-gold-500/20 rounded-xl", children: _jsx(RotateCcw, { className: "h-6 w-6 text-gold-500" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-green-400", children: [_jsx(CheckCircle2, { className: "h-3 w-3 mr-1" }), _jsxs("span", { children: ["+5% ", language === 'en' ? 'from last month' : 'ပြီးခဲ့သောလထက်'] })] })] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: _jsx(Card, { className: "bg-white border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: language === 'en' ? 'Pending Processing' : 'လုပ်ဆောင်ရန်ကျန်' }), _jsx("h3", { className: "text-2xl font-bold text-navy-900", children: "14" })] }), _jsx("div", { className: "p-3 bg-yellow-50 rounded-xl", children: _jsx(Clock, { className: "h-6 w-6 text-yellow-600" }) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-4", children: language === 'en' ? 'Action required for 5 items' : '၅ ခုအတွက် လုပ်ဆောင်ရန်လိုအပ်သည်' })] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: _jsx(Card, { className: "bg-white border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: language === 'en' ? 'In Warehouse' : 'ဂိုဒေါင်ရောက်' }), _jsx("h3", { className: "text-2xl font-bold text-navy-900", children: "42" })] }), _jsx("div", { className: "p-3 bg-blue-50 rounded-xl", children: _jsx(Package, { className: "h-6 w-6 text-blue-600" }) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-4", children: language === 'en' ? 'Awaiting merchant pickup' : 'ကုန်သည်ကောက်ယူရန် စောင့်ဆိုင်းနေသည်' })] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, children: _jsx(Card, { className: "bg-white border-navy-100 shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: language === 'en' ? 'Completed Returns' : 'ပြီးစီးသော ပြန်ပို့မှု' }), _jsx("h3", { className: "text-2xl font-bold text-navy-900", children: "72" })] }), _jsx("div", { className: "p-3 bg-green-50 rounded-xl", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-green-600" }) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-4", children: language === 'en' ? 'Successfully returned to merchant' : 'ကုန်သည်ထံ အောင်မြင်စွာပြန်ပို့ပြီး' })] }) }) })] }), _jsxs(Card, { className: "border-navy-100 shadow-lg", children: [_jsx(CardHeader, { className: "pb-0", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full md:w-auto", children: _jsxs(TabsList, { className: "bg-navy-50", children: [_jsx(TabsTrigger, { value: "all", children: t('common.all') }), _jsx(TabsTrigger, { value: "pending", children: t('common.pending') }), _jsx(TabsTrigger, { value: "processing", children: language === 'en' ? 'In Progress' : 'ဆောင်ရွက်ဆဲ' }), _jsx(TabsTrigger, { value: "returned", children: language === 'en' ? 'Returned' : 'ပြန်ပို့ပြီး' })] }) }), _jsxs("div", { className: "flex items-center gap-2 w-full md:w-auto", children: [_jsxs("div", { className: "relative flex-1 md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search'), className: "pl-9 bg-white", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4 text-navy-900" }) })] })] }) }), _jsxs(CardContent, { className: "pt-6", children: [_jsx("div", { className: "rounded-md border border-navy-100 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "font-bold", children: t('tracking.trackingNumber') }), _jsx(TableHead, { className: "font-bold", children: t('merchant.name') }), _jsx(TableHead, { className: "font-bold", children: language === 'en' ? 'Reason' : 'အကြောင်းပြချက်' }), _jsx(TableHead, { className: "font-bold", children: language === 'en' ? 'Return Date' : 'ပြန်ပို့သည့်ရက်' }), _jsx(TableHead, { className: "font-bold", children: t('order.amount') }), _jsx(TableHead, { className: "font-bold", children: t('tracking.status') }), _jsx(TableHead, { className: "text-right", children: language === 'en' ? 'Actions' : 'လုပ်ဆောင်ချက်' })] }) }), _jsx(TableBody, { children: returnParcels.map((parcel) => (_jsxs(TableRow, { className: "hover:bg-navy-50/30 transition-colors", children: [_jsx(TableCell, { className: "font-mono font-medium", children: parcel.trackingNo }), _jsx(TableCell, { children: parcel.merchant }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1.5 text-destructive" }), parcel.reason] }) }), _jsx(TableCell, { children: parcel.returnDate }), _jsxs(TableCell, { className: "font-semibold", children: [parcel.amount.toLocaleString(), " Ks"] }), _jsx(TableCell, { children: getStatusBadge(parcel.status) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuLabel, { children: t('common.view') }), _jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), " ", language === 'en' ? 'Details' : 'အသေးစိတ်'] }), _jsxs(DropdownMenuItem, { children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), " ", language === 'en' ? 'Print Return Label' : 'ပြန်ပို့လိပ်စာထုတ်ရန်'] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-gold-600", children: [_jsx(ArrowLeftRight, { className: "mr-2 h-4 w-4" }), " ", language === 'en' ? 'Process Refund' : 'ငွေပြန်အမ်းရန်'] }), _jsxs(DropdownMenuItem, { className: "text-green-600", children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), " ", language === 'en' ? 'Mark as Returned' : 'ပြန်ပို့ပြီးအဖြစ်သတ်မှတ်'] })] })] }) })] }, parcel.id))) })] }) }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: language === 'en'
                                            ? `Showing ${returnParcels.length} of 128 results`
                                            : `ရလဒ် ၁၂၈ ခုအနက် ${returnParcels.length} ခုကို ပြသနေသည်` }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", children: t('common.next') })] })] })] })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx("div", { className: "hidden" }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "myanmar-text", children: language === 'en' ? 'Confirm Return Delivery' : 'ပြန်ပို့မှု ပို့ဆောင်ခြင်းကို အတည်ပြုရန်' }), _jsx(DialogDescription, { children: language === 'en' ? 'Verify parcel details before handing over to the merchant.' : 'ကုန်သည်ထံသို့ မလွှဲပြောင်းမီ ပါဆယ်အသေးစိတ်ကို စစ်ဆေးပါ။' })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "merchant", className: "text-right", children: t('merchant.name') }), _jsx(Input, { id: "merchant", value: "Elite Electronics", className: "col-span-3", disabled: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "tracking", className: "text-right", children: t('tracking.trackingNumber') }), _jsx(Input, { id: "tracking", value: "BE88492011", className: "col-span-3", disabled: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "condition", className: "text-right", children: language === 'en' ? 'Condition' : 'အခြေအနေ' }), _jsxs(Select, { defaultValue: "good", children: [_jsx(SelectTrigger, { className: "col-span-3", children: _jsx(SelectValue, { placeholder: "Select condition" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "good", children: "Good / Original" }), _jsx(SelectItem, { value: "opened", children: "Opened Box" }), _jsx(SelectItem, { value: "damaged", children: "Damaged" })] })] })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", className: "luxury-button w-full", children: t('common.confirm') }) })] })] }), _jsx("div", { className: "text-center pt-8", children: _jsx("p", { className: "text-xs text-muted-foreground opacity-50", children: "\u00A9 2026 Britium Express Logistics System. All Rights Reserved." }) })] }));
};
export default ReturnWaysPage;
