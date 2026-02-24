import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, Plus, MoreVertical, CheckCircle2, Clock, AlertCircle, ArrowUpRight, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeInUp, staggerContainer, hoverLift } from '@/lib/motion';
// Mock Data
const RECEIPT_DATA = [
    {
        id: "RCP-2026-001",
        merchant: "Golden Mandalay Shop",
        date: "2026-02-01",
        amount: 1250000,
        status: "paid",
        type: "COD Settlement",
        invoiceRef: "INV-2026-442"
    },
    {
        id: "RCP-2026-002",
        merchant: "Yangon Tech Hub",
        date: "2026-02-02",
        amount: 450000,
        status: "pending",
        type: "Shipping Fees",
        invoiceRef: "INV-2026-445"
    },
    {
        id: "RCP-2026-003",
        merchant: "Elite Fashion MM",
        date: "2026-01-28",
        amount: 890000,
        status: "paid",
        type: "COD Settlement",
        invoiceRef: "INV-2026-430"
    },
    {
        id: "RCP-2026-004",
        merchant: "Organic Bites",
        date: "2026-02-03",
        amount: 120000,
        status: "overdue",
        type: "Monthly Subscription",
        invoiceRef: "INV-2026-448"
    },
    {
        id: "RCP-2026-005",
        merchant: "Star Electronics",
        date: "2026-02-04",
        amount: 2300000,
        status: "paid",
        type: "COD Settlement",
        invoiceRef: "INV-2026-450"
    }
];
const MerchantReceiptsPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState("");
    const getStatusBadge = (status) => {
        switch (status) {
            case 'paid':
                return _jsx(Badge, { className: "bg-success/20 text-success border-success/30 hover:bg-success/30", children: t('common.completed') });
            case 'pending':
                return _jsx(Badge, { className: "bg-warning/20 text-warning border-warning/30 hover:bg-warning/30", children: t('common.pending') });
            case 'overdue':
                return _jsx(Badge, { className: "bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30", children: "Overdue" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const filteredReceipts = RECEIPT_DATA.filter(r => r.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.id.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "w-full space-y-8 p-6 md:p-8", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-950 dark:text-gold-400 font-myanmar", children: t('merchant.receipts') }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage merchant payments, generated invoices, and digital receipts for \u00A9 2026 operations." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-gold-500/50 text-gold-600 hover:bg-gold-50", children: [_jsx(Printer, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Button, { className: "luxury-button", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Generate Invoice"] })] })] }), _jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(motion.div, { variants: fadeInUp, children: _jsx(Card, { className: "lotus-card border-none", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-gold-400/80 uppercase tracking-wider", children: "Total Paid" }), _jsx("h3", { className: "text-2xl font-bold text-white mt-1", children: "4.44M Ks" })] }), _jsx("div", { className: "p-3 bg-gold-500/20 rounded-xl", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-gold-400" }) })] }), _jsxs("div", { className: "mt-4 flex items-center text-xs text-gold-300", children: [_jsx(ArrowUpRight, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: "+12% from last month" })] })] }) }) }), _jsx(motion.div, { variants: fadeInUp, children: _jsx(Card, { className: "bg-white dark:bg-navy-900 border border-border shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Pending" }), _jsx("h3", { className: "text-2xl font-bold text-navy-950 dark:text-white mt-1", children: "0.45M Ks" })] }), _jsx("div", { className: "p-3 bg-warning/10 rounded-xl", children: _jsx(Clock, { className: "h-6 w-6 text-warning" }) })] }), _jsx("div", { className: "mt-4 flex items-center text-xs text-muted-foreground", children: _jsx("span", { children: "4 invoices awaiting payment" }) })] }) }) }), _jsx(motion.div, { variants: fadeInUp, children: _jsx(Card, { className: "bg-white dark:bg-navy-900 border border-border shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Overdue" }), _jsx("h3", { className: "text-2xl font-bold text-destructive mt-1", children: "0.12M Ks" })] }), _jsx("div", { className: "p-3 bg-destructive/10 rounded-xl", children: _jsx(AlertCircle, { className: "h-6 w-6 text-destructive" }) })] }), _jsx("div", { className: "mt-4 flex items-center text-xs text-destructive", children: _jsx("span", { children: "Urgent attention required" }) })] }) }) }), _jsx(motion.div, { variants: fadeInUp, children: _jsx(Card, { className: "bg-white dark:bg-navy-900 border border-border shadow-sm", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Receipts Today" }), _jsx("h3", { className: "text-2xl font-bold text-navy-950 dark:text-white mt-1", children: "24" })] }), _jsx("div", { className: "p-3 bg-primary/10 rounded-xl", children: _jsx(FileText, { className: "h-6 w-6 text-primary" }) })] }), _jsx("div", { className: "mt-4 flex items-center text-xs text-success", children: _jsx("span", { children: "System synchronized" }) })] }) }) })] }), _jsxs(Card, { className: "border-border/50 shadow-xl", children: [_jsx(CardHeader, { className: "border-b border-border/50 bg-muted/30", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-xl", children: [t('merchant.receipts'), " History"] }), _jsx(CardDescription, { children: "Search and manage all merchant financial documentation" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search') + "...", className: "pl-9 bg-background", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }) }), _jsxs(CardContent, { className: "p-0", children: [_jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [_jsx("div", { className: "px-6 py-2 border-b border-border/50", children: _jsxs(TabsList, { className: "bg-transparent gap-6 h-12", children: [_jsx(TabsTrigger, { value: "all", className: "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0", children: t('common.all') }), _jsx(TabsTrigger, { value: "paid", className: "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0", children: t('common.completed') }), _jsx(TabsTrigger, { value: "pending", className: "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0", children: t('common.pending') }), _jsx(TabsTrigger, { value: "overdue", className: "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold-500 rounded-none px-0", children: "Overdue" })] }) }), _jsx(TabsContent, { value: "all", className: "m-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent bg-muted/20", children: [_jsx(TableHead, { className: "w-[150px]", children: "Receipt ID" }), _jsx(TableHead, { children: t('merchant.name') }), _jsx(TableHead, { children: t('common.date') }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Invoice Ref" }), _jsx(TableHead, { className: "text-right", children: t('order.amount') }), _jsx(TableHead, { children: t('merchant.status') }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredReceipts.map((receipt) => (_jsxs(TableRow, { className: "hover:bg-muted/30 transition-colors group", children: [_jsx(TableCell, { className: "font-mono text-sm font-semibold text-primary", children: receipt.id }), _jsx(TableCell, { className: "font-medium", children: receipt.merchant }), _jsx(TableCell, { className: "text-muted-foreground", children: receipt.date }), _jsx(TableCell, { children: _jsx("span", { className: "text-xs px-2 py-1 bg-primary/5 text-primary rounded-md border border-primary/10", children: receipt.type }) }), _jsx(TableCell, { className: "text-blue-600 hover:underline cursor-pointer", children: receipt.invoiceRef }), _jsxs(TableCell, { className: "text-right font-bold", children: [receipt.amount.toLocaleString(), " Ks"] }), _jsx(TableCell, { children: getStatusBadge(receipt.status) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-gold-50 hover:text-gold-600", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-gold-50 hover:text-gold-600", children: _jsx(Download, { className: "h-4 w-4" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Options" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Send via Email" }), _jsx(DropdownMenuItem, { children: "Print Receipt" }), _jsx(DropdownMenuItem, { className: "text-destructive", children: "Void Receipt" })] })] })] }) })] }, receipt.id))) })] }) })] }), filteredReceipts.length === 0 && (_jsxs("div", { className: "py-12 text-center", children: [_jsx(FileText, { className: "h-12 w-12 text-muted-foreground mx-auto opacity-20" }), _jsx("h3", { className: "mt-4 text-lg font-medium", children: "No receipts found" }), _jsx("p", { className: "text-muted-foreground", children: "Try adjusting your search or filters." })] }))] })] }), _jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(motion.div, { variants: hoverLift, children: _jsx(Card, { className: "bg-navy-900 text-white overflow-hidden group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-bold text-gold-400", children: "Invoicing Schedule" }), _jsx("p", { className: "text-sm text-navy-200", children: "Configure automated invoice generation cycles for merchants." })] }), _jsx(ArrowUpRight, { className: "h-5 w-5 text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })] }), _jsx(Button, { variant: "link", className: "text-gold-500 p-0 mt-4 hover:text-gold-400", children: "Configure Now" })] }) }) }), _jsx(motion.div, { variants: hoverLift, children: _jsx(Card, { className: "bg-white dark:bg-navy-900 border border-border shadow-sm group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-bold text-navy-950 dark:text-white", children: "Financial Audit Logs" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "View all modifications to financial documents and records." })] }), _jsx(ArrowUpRight, { className: "h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })] }), _jsx(Button, { variant: "link", className: "text-primary p-0 mt-4", children: "View Logs" })] }) }) }), _jsx(motion.div, { variants: hoverLift, children: _jsx(Card, { className: "bg-white dark:bg-navy-900 border border-border shadow-sm group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-lg font-bold text-navy-950 dark:text-white", children: "Bank Integration" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Manage connections with local banks for automated settlement." })] }), _jsx(ArrowUpRight, { className: "h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })] }), _jsx(Button, { variant: "link", className: "text-primary p-0 mt-4", children: "Manage Banks" })] }) }) })] }), _jsx("footer", { className: "text-center py-6 border-t border-border/30", children: _jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-tighter", children: "\u00A9 2026 Britium Express Logistics System. All financial documentation is cryptographically signed and stored securely." }) })] }));
};
export default MerchantReceiptsPage;
