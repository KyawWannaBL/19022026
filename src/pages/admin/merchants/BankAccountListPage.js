import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Download, MoreHorizontal, CreditCard, Building2, Wallet, CheckCircle2, Clock, ExternalLink, Edit2, Trash2, ShieldCheck } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
const MOCK_ACCOUNTS = [
    {
        id: 'BA-001',
        merchantName: 'Golden Lotus Trading',
        merchantId: 'M-1029',
        bankName: 'KBZ Bank',
        accountName: 'U Kyaw Zeya',
        accountNumber: '102-301-445920192',
        branch: 'Yangon Main',
        type: 'Bank',
        status: 'Active',
        isDefault: true,
        verifiedAt: '2026-01-15',
    },
    {
        id: 'BA-002',
        merchantName: 'Royal Silk Fashion',
        merchantId: 'M-5521',
        bankName: 'CB Bank',
        accountName: 'Daw Aye Aye Myint',
        accountNumber: '0012-6005-0012-9988',
        branch: 'Mandalay Central',
        type: 'Bank',
        status: 'Active',
        isDefault: true,
        verifiedAt: '2025-12-20',
    },
    {
        id: 'BA-003',
        merchantName: 'Smart Gadgets MM',
        merchantId: 'M-8843',
        bankName: 'Wave Money',
        accountName: 'U Hla Win',
        accountNumber: '09798822114',
        branch: 'Digital Wallet',
        type: 'Wallet',
        status: 'Pending',
        isDefault: true,
    },
    {
        id: 'BA-004',
        merchantName: 'Smart Gadgets MM',
        merchantId: 'M-8843',
        bankName: 'AYA Bank',
        accountName: 'Smart Gadgets Co., Ltd.',
        accountNumber: '200-112-990088',
        branch: 'Hledan Branch',
        type: 'Bank',
        status: 'Inactive',
        isDefault: false,
    },
    {
        id: 'BA-005',
        merchantName: 'Elite Organics',
        merchantId: 'M-3321',
        bankName: 'KBZPay',
        accountName: 'Elite Organics Business',
        accountNumber: '09445566778',
        branch: 'Digital Wallet',
        type: 'Wallet',
        status: 'Active',
        isDefault: true,
        verifiedAt: '2026-02-01',
    }
];
const BankAccountListPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const filteredAccounts = useMemo(() => {
        return MOCK_ACCOUNTS.filter(acc => {
            const matchesSearch = acc.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                acc.accountNumber.includes(searchQuery) ||
                acc.bankName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || acc.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter]);
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return _jsx(Badge, { className: "bg-success/15 text-success border-success/30", children: t('common.active') });
            case 'Inactive':
                return _jsx(Badge, { className: "bg-destructive/15 text-destructive border-destructive/30", children: t('common.inactive') });
            case 'Pending':
                return _jsx(Badge, { className: "bg-warning/15 text-warning border-warning/30", children: t('common.pending') });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-950", children: t('merchant.bankAccountList') }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage financial profiles and disbursement channels for all registered merchants." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-gold-500/50 text-gold-600 hover:bg-gold-50", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "luxury-button", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), t('common.add')] }) }), _jsxs(DialogContent, { className: "sm:max-w-[525px] lotus-card text-white border-gold-400/30", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-gold-400 text-xl font-bold", children: "Add New Bank Account" }), _jsx(DialogDescription, { className: "text-navy-200", children: "Enter the banking details for the merchant to enable financial settlements." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "merchant", className: "text-right text-navy-100", children: "Merchant" }), _jsx("div", { className: "col-span-3", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-full bg-navy-800 border-gold-400/20", children: _jsx(SelectValue, { placeholder: "Select Merchant" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "m1", children: "Golden Lotus Trading" }), _jsx(SelectItem, { value: "m2", children: "Royal Silk Fashion" })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "bank", className: "text-right text-navy-100", children: "Bank Name" }), _jsx(Input, { id: "bank", placeholder: "e.g. KBZ Bank", className: "col-span-3 bg-navy-800 border-gold-400/20" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "accName", className: "text-right text-navy-100", children: "Account Name" }), _jsx(Input, { id: "accName", className: "col-span-3 bg-navy-800 border-gold-400/20" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "accNum", className: "text-right text-navy-100", children: "Account Number" }), _jsx(Input, { id: "accNum", className: "col-span-3 bg-navy-800 border-gold-400/20" })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", className: "luxury-button w-full", children: t('common.save') }) })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { className: "border-l-4 border-l-navy-800", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Total Accounts" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "1,248" })] }), _jsx("div", { className: "p-3 bg-navy-50 rounded-full text-navy-800", children: _jsx(CreditCard, { className: "h-6 w-6" }) })] }) }) }), _jsx(Card, { className: "border-l-4 border-l-success", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Verified Banks" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "1,192" })] }), _jsx("div", { className: "p-3 bg-success/10 rounded-full text-success", children: _jsx(ShieldCheck, { className: "h-6 w-6" }) })] }) }) }), _jsx(Card, { className: "border-l-4 border-l-warning", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: "Pending Verification" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "56" })] }), _jsx("div", { className: "p-3 bg-warning/10 rounded-full text-warning", children: _jsx(Clock, { className: "h-6 w-6" }) })] }) }) })] }), _jsxs(Card, { className: "shadow-sm border-navy-100", children: [_jsx(CardHeader, { className: "border-b border-navy-50", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4 justify-between", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search'), className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsxs(SelectTrigger, { className: "w-[160px]", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), _jsx(SelectValue, { placeholder: "Status" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: t('common.all') }), _jsx(SelectItem, { value: "active", children: t('common.active') }), _jsx(SelectItem, { value: "pending", children: t('common.pending') }), _jsx(SelectItem, { value: "inactive", children: t('common.inactive') })] })] }) })] }) }), _jsxs(CardContent, { className: "p-0", children: [_jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[250px] font-semibold text-navy-900", children: t('merchant.name') }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: "Bank / Provider" }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: "Account Details" }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: "Type" }), _jsx(TableHead, { className: "font-semibold text-navy-900", children: t('common.status') }), _jsx(TableHead, { className: "text-right font-semibold text-navy-900", children: "Actions" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: 'popLayout', children: filteredAccounts.map((account) => (_jsxs(motion.tr, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "group hover:bg-navy-50/30 transition-colors border-b border-navy-50", children: [_jsx(TableCell, { className: "py-4", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold text-navy-950", children: account.merchantName }), _jsx("span", { className: "text-xs text-muted-foreground font-mono", children: account.merchantId })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-navy-100 rounded-lg text-navy-700", children: account.type === 'Bank' ? _jsx(Building2, { className: "h-4 w-4" }) : _jsx(Wallet, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: account.bankName }), _jsx("span", { className: "text-xs text-muted-foreground", children: account.branch })] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-mono text-sm font-semibold", children: account.accountNumber }), _jsx("span", { className: "text-xs text-muted-foreground", children: account.accountName }), account.isDefault && (_jsxs("span", { className: "inline-flex items-center mt-1 text-[10px] text-gold-600 font-bold uppercase tracking-tighter", children: [_jsx(CheckCircle2, { className: "h-2.5 w-2.5 mr-1" }), " Default"] }))] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", className: "font-normal", children: account.type }) }), _jsxs(TableCell, { children: [getStatusBadge(account.status), account.verifiedAt && (_jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: ["Verified: ", account.verifiedAt] }))] }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-navy-100", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-navy-600" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuLabel, { children: "Account Actions" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Edit2, { className: "mr-2 h-4 w-4" }), " ", t('common.edit')] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(ShieldCheck, { className: "mr-2 h-4 w-4" }), " Verify Details"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(ExternalLink, { className: "mr-2 h-4 w-4" }), " View Merchant"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive focus:bg-destructive/10", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), " ", t('common.delete')] })] })] }) })] }, account.id))) }) })] }), filteredAccounts.length === 0 && (_jsxs("div", { className: "p-12 text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center p-4 bg-muted rounded-full mb-4", children: _jsx(CreditCard, { className: "h-8 w-8 text-muted-foreground" }) }), _jsx("h3", { className: "text-lg font-semibold text-navy-950", children: "No bank accounts found" }), _jsx("p", { className: "text-muted-foreground", children: "Try adjusting your search or filters to find what you're looking for." }), _jsx(Button, { variant: "link", className: "mt-2 text-gold-600 font-semibold", onClick: () => { setSearchQuery(''); setStatusFilter('all'); }, children: "Clear all filters" })] }))] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [_jsx("span", { className: "font-semibold", children: "Related Management:" }), _jsxs("a", { href: ROUTE_PATHS.MERCHANT_LIST, className: "hover:text-gold-600 transition-colors flex items-center gap-1", children: [_jsx(MoreHorizontal, { className: "h-3 w-3" }), " Merchant Directory"] }), _jsxs("a", { href: ROUTE_PATHS.MERCHANT_FINANCIAL_CENTER, className: "hover:text-gold-600 transition-colors flex items-center gap-1", children: [_jsx(Wallet, { className: "h-3 w-3" }), " Financial Center"] }), _jsxs("a", { href: ROUTE_PATHS.ACCOUNTING_BANKS, className: "hover:text-gold-600 transition-colors flex items-center gap-1", children: [_jsx(Building2, { className: "h-3 w-3" }), " Corporate Banks"] })] })] }));
};
export default BankAccountListPage;
