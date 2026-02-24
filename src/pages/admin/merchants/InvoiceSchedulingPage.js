import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Search, Plus, Settings2, ChevronRight, FileText, AlertCircle, CheckCircle2, Filter, MoreVertical, ArrowRightLeft, Save } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
const InvoiceSchedulingPage = () => {
    const { language } = useLanguageContext();
    const t = (key) => translations[language][key] || key;
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // Mock data for scheduling
    const [schedules, setSchedules] = useState([
        {
            id: 'INV-SCH-001',
            merchantName: 'Royal Silk Textiles',
            cycle: 'Weekly',
            nextDate: '2026-02-09',
            lastInvoiced: '2026-02-02',
            status: 'Active',
            autoGenerate: true,
            paymentTerms: 'Net 7',
            dayOfWeek: 'Monday'
        },
        {
            id: 'INV-SCH-002',
            merchantName: 'Elite Electronics',
            cycle: 'Monthly',
            nextDate: '2026-03-01',
            lastInvoiced: '2026-02-01',
            status: 'Active',
            autoGenerate: true,
            paymentTerms: 'Net 15',
            dayOfMonth: 1
        },
        {
            id: 'INV-SCH-003',
            merchantName: 'Grace Fashion Hub',
            cycle: 'Bi-Weekly',
            nextDate: '2026-02-15',
            lastInvoiced: '2026-02-01',
            status: 'Paused',
            autoGenerate: false,
            paymentTerms: 'Net 3',
            dayOfWeek: 'Sunday'
        },
        {
            id: 'INV-SCH-004',
            merchantName: 'Myanmar Organic Foods',
            cycle: 'Daily',
            nextDate: '2026-02-05',
            lastInvoiced: '2026-02-04',
            status: 'Active',
            autoGenerate: true,
            paymentTerms: 'Due on Receipt',
            dayOfWeek: 'Everyday'
        }
    ]);
    const filteredSchedules = schedules.filter(s => s.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-primary font-display", children: t('merchant.invoiceScheduling') }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? 'Automate and manage recurring billing cycles for your merchants.'
                                    : 'ကုန်သည်များအတွက် ပုံမှန်ငွေတောင်းခံလွှာများကို အလိုအလျောက် စီမံခန့်ခွဲပါ။' })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(Dialog, { open: isCreateModalOpen, onOpenChange: setIsCreateModalOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "luxury-button group", children: [_jsx(Plus, { className: "mr-2 h-4 w-4 transition-transform group-hover:rotate-90" }), t('common.add')] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px] border-gold-400/30 lotus-card", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-gold-400", children: [t('merchant.addNew'), " Schedule"] }), _jsx(DialogDescription, { className: "text-navy-200", children: "Set up a new automated billing cycle for a merchant." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "merchant", children: "Merchant Name" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-navy-900/50 border-navy-700", children: _jsx(SelectValue, { placeholder: "Select Merchant" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "Royal Silk Textiles" }), _jsx(SelectItem, { value: "2", children: "Elite Electronics" }), _jsx(SelectItem, { value: "3", children: "Grace Fashion Hub" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "cycle", children: "Billing Cycle" }), _jsxs(Select, { defaultValue: "weekly", children: [_jsx(SelectTrigger, { className: "bg-navy-900/50 border-navy-700", children: _jsx(SelectValue, { placeholder: "Select Cycle" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "daily", children: "Daily" }), _jsx(SelectItem, { value: "weekly", children: "Weekly" }), _jsx(SelectItem, { value: "biweekly", children: "Bi-Weekly" }), _jsx(SelectItem, { value: "monthly", children: "Monthly" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "terms", children: "Payment Terms" }), _jsxs(Select, { defaultValue: "net7", children: [_jsx(SelectTrigger, { className: "bg-navy-900/50 border-navy-700", children: _jsx(SelectValue, { placeholder: "Select Terms" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "due", children: "Due on Receipt" }), _jsx(SelectItem, { value: "net3", children: "Net 3" }), _jsx(SelectItem, { value: "net7", children: "Net 7" }), _jsx(SelectItem, { value: "net15", children: "Net 15" })] })] })] })] }), _jsxs("div", { className: "flex items-center justify-between p-4 rounded-lg bg-navy-800/50 border border-gold-400/20", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(Label, { children: "Auto-Generate Invoice" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Invoices will be created automatically on the due date." })] }), _jsx(Switch, { defaultChecked: true })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsCreateModalOpen(false), children: t('common.cancel') }), _jsx(Button, { className: "bg-gold-500 hover:bg-gold-600 text-navy-900", children: t('common.save') })] })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Clock, { className: "h-6 w-6 text-gold-500" }) }), _jsx(Badge, { variant: "secondary", className: "bg-gold-500/20 text-gold-400", children: "Active" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Total Active Schedules" }), _jsx("h3", { className: "text-2xl font-bold text-foreground", children: "42" })] })] }) }), _jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: _jsx(Calendar, { className: "h-6 w-6 text-primary" }) }) }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Next Run Date" }), _jsx("h3", { className: "text-2xl font-bold text-foreground", children: "Feb 05, 2026" })] })] }) }), _jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { className: "p-2 bg-success/10 rounded-lg", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-success" }) }) }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Successfully Automated" }), _jsx("h3", { className: "text-2xl font-bold text-foreground", children: "98.5%" })] })] }) }), _jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("div", { className: "p-2 bg-destructive/10 rounded-lg", children: _jsx(AlertCircle, { className: "h-6 w-6 text-destructive" }) }) }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Pending Manual Review" }), _jsx("h3", { className: "text-2xl font-bold text-foreground", children: "03" })] })] }) })] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search') + " merchant or schedule ID...", className: "pl-10 bg-card border-border", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Button, { variant: "outline", className: "border-gold-400/20", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), t('common.filter')] }), _jsxs(Button, { variant: "outline", className: "border-gold-400/20", children: [_jsx(Settings2, { className: "mr-2 h-4 w-4" }), "Config"] })] }), _jsx(Card, { className: "border-gold-400/10 shadow-xl bg-card/50 backdrop-blur-sm", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: "Schedule ID" }), _jsx(TableHead, { children: t('merchant.name') }), _jsx(TableHead, { children: "Billing Cycle" }), _jsx(TableHead, { children: "Last Run" }), _jsx(TableHead, { children: "Next Run" }), _jsx(TableHead, { children: "Auto-Gen" }), _jsx(TableHead, { children: t('common.status') }), _jsx(TableHead, { className: "text-right", children: t('warehouse.action') })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: 'popLayout', children: filteredSchedules.map((schedule) => (_jsxs(motion.tr, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.95 }, className: "group hover:bg-muted/30 transition-colors", children: [_jsx(TableCell, { className: "font-mono text-xs font-semibold text-primary", children: schedule.id }), _jsx(TableCell, { className: "font-medium", children: schedule.merchantName }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-3.5 w-3.5 text-gold-500" }), schedule.cycle] }) }), _jsx(TableCell, { className: "text-muted-foreground", children: schedule.lastInvoiced }), _jsx(TableCell, { className: "font-semibold", children: schedule.nextDate }), _jsx(TableCell, { children: _jsx(Switch, { checked: schedule.autoGenerate }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", className: schedule.status === 'Active'
                                                    ? "bg-success/10 text-success hover:bg-success/20"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80", children: schedule.status }) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-gold-500/10 hover:text-gold-500", children: _jsx(FileText, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-primary/10", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] }) })] }, schedule.id))) }) })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "lotus-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2 text-gold-400", children: [_jsx(ArrowRightLeft, { className: "h-5 w-5" }), "Manual Override"] }), _jsx(CardDescription, { children: "Instantly generate an invoice for a merchant outside the schedule." })] }), _jsxs(CardContent, { className: "flex gap-4", children: [_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-navy-900/50 border-navy-700 flex-1", children: _jsx(SelectValue, { placeholder: "Select Merchant" }) }), _jsx(SelectContent, { children: schedules.map(s => (_jsx(SelectItem, { value: s.id, children: s.merchantName }, s.id))) })] }), _jsx(Button, { className: "bg-gold-500 text-navy-900 hover:bg-gold-600", children: "Generate Now" })] })] }), _jsxs(Card, { className: "lotus-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2 text-gold-400", children: [_jsx(Save, { className: "h-5 w-5" }), "Global Billing Policy"] }), _jsx(CardDescription, { children: "Update standard billing parameters across all merchants." })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Auto-lock invoices after 24h" }), _jsx(Switch, { defaultChecked: true })] }), _jsx("div", { className: "mt-4", children: _jsxs(Button, { variant: "link", className: "p-0 text-gold-500 hover:text-gold-400 h-auto", children: ["Manage Global Settings ", _jsx(ChevronRight, { className: "ml-1 h-4 w-4" })] }) })] })] })] })] }));
};
export default InvoiceSchedulingPage;
