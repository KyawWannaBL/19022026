import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Download, ArrowUpRight, ArrowDownLeft, Eye, Calendar, FileText, MoreHorizontal, CheckCircle2, Clock, Building2 } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from '@/components/ui/dialog';
// Mock Data for 2026 Financial Transactions
const MOCK_TRANSACTIONS = [
    {
        id: 'TX-2026-001',
        type: 'income',
        category: 'Delivery Fees',
        amount: 1250000,
        date: '2026-02-03T10:30:00Z',
        description: 'Bulk delivery payment from Merchant: Elite Fashion',
        referenceNumber: 'INV-78921',
        branchId: 'Yangon North',
    },
    {
        id: 'TX-2026-002',
        type: 'expense',
        category: 'Fuel',
        amount: 450000,
        date: '2026-02-03T14:15:00Z',
        description: 'Weekly fuel allowance for Rider Team A',
        referenceNumber: 'EXP-4401',
        branchId: 'Mandalay Central',
    },
    {
        id: 'TX-2026-003',
        type: 'income',
        category: 'COD Commission',
        amount: 85000,
        date: '2026-02-02T09:00:00Z',
        description: 'Commission from Batch #445 COD collections',
        referenceNumber: 'COD-REC-002',
        branchId: 'Yangon South',
    },
    {
        id: 'TX-2026-004',
        type: 'expense',
        category: 'Maintenance',
        amount: 120000,
        date: '2026-02-01T16:45:00Z',
        description: 'Vehicle repair - Plate No. YGN-9902',
        referenceNumber: 'MAINT-092',
        branchId: 'Bago Station',
    },
    {
        id: 'TX-2026-005',
        type: 'income',
        category: 'Warehouse Storage',
        amount: 3200000,
        date: '2026-02-01T11:20:00Z',
        description: 'Monthly storage fee - Global Electronics',
        referenceNumber: 'INV-78955',
        branchId: 'Yangon North',
    },
    {
        id: 'TX-2026-006',
        type: 'expense',
        category: 'Utilities',
        amount: 280000,
        date: '2026-01-31T10:00:00Z',
        description: 'Electricity bill for Mandalay Hub',
        referenceNumber: 'UTIL-JAN-02',
        branchId: 'Mandalay Central',
    }
];
const TransactionsListPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedTx, setSelectedTx] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const filteredTransactions = useMemo(() => {
        return MOCK_TRANSACTIONS.filter(tx => {
            const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tx.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'all' || tx.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, filterType]);
    const stats = useMemo(() => {
        const income = MOCK_TRANSACTIONS
            .filter(tx => tx.type === 'income')
            .reduce((acc, curr) => acc + curr.amount, 0);
        const expense = MOCK_TRANSACTIONS
            .filter(tx => tx.type === 'expense')
            .reduce((acc, curr) => acc + curr.amount, 0);
        return { income, expense, balance: income - expense };
    }, []);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-MM', {
            style: 'currency',
            currency: 'MMK',
            minimumFractionDigits: 0,
        }).format(amount);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(language === 'my' ? 'my-MM' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const handleViewDetails = (tx) => {
        setSelectedTx(tx);
        setIsDetailOpen(true);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900", children: t('accounting.transactions') }), _jsxs("p", { className: "text-muted-foreground mt-1", children: [t('dashboard.overview'), " \u2014 Financial Records for Feb 2026"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-gold-400 text-gold-600 hover:bg-gold-50", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), t('common.export')] }), _jsxs(Button, { className: "bg-navy-900 text-gold-400 hover:bg-navy-800", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), t('common.add')] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: _jsx(Card, { className: "border-l-4 border-l-success shadow-sm", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: t('accounting.income') }), _jsx("h2", { className: "text-2xl font-bold text-success mt-1", children: formatCurrency(stats.income) })] }), _jsx("div", { className: "p-3 bg-success/10 rounded-full", children: _jsx(ArrowUpRight, { className: "h-6 w-6 text-success" }) })] }) }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: _jsx(Card, { className: "border-l-4 border-l-destructive shadow-sm", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: t('accounting.expense') }), _jsx("h2", { className: "text-2xl font-bold text-destructive mt-1", children: formatCurrency(stats.expense) })] }), _jsx("div", { className: "p-3 bg-destructive/10 rounded-full", children: _jsx(ArrowDownLeft, { className: "h-6 w-6 text-destructive" }) })] }) }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: _jsx(Card, { className: "border-l-4 border-l-gold-500 shadow-sm bg-navy-900 text-white", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gold-300/80 uppercase tracking-wider", children: t('accounting.balance') }), _jsx("h2", { className: "text-2xl font-bold text-gold-400 mt-1", children: formatCurrency(stats.balance) })] }), _jsx("div", { className: "p-3 bg-gold-400/20 rounded-full", children: _jsx(CheckCircle2, { className: "h-6 w-6 text-gold-400" }) })] }) }) }) })] }), _jsx(Card, { className: "border-border/50", children: _jsxs(CardContent, { className: "p-4 flex flex-col md:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search') + " (ID, Reference, Description)...", className: "pl-10 h-10", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [_jsxs(SelectTrigger, { className: "w-[150px] h-10", children: [_jsx(Filter, { className: "mr-2 h-4 w-4 text-muted-foreground" }), _jsx(SelectValue, { placeholder: "Type" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: t('common.all') }), _jsx(SelectItem, { value: "income", children: t('accounting.income') }), _jsx(SelectItem, { value: "expense", children: t('accounting.expense') })] })] }), _jsxs(Button, { variant: "outline", className: "h-10", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), t('reports.dateRange')] }), _jsx(Button, { variant: "ghost", className: "h-10 text-muted-foreground", onClick: () => { setSearchTerm(''); setFilterType('all'); }, children: t('common.reset') })] })] }) }), _jsxs(Card, { className: "border-border/50 overflow-hidden", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: t('common.date') }), _jsx(TableHead, { children: "Reference" }), _jsx(TableHead, { className: "hidden md:table-cell", children: "Category" }), _jsx(TableHead, { className: "hidden lg:table-cell", children: t('accounting.branches') }), _jsx(TableHead, { children: t('tracking.status') }), _jsx(TableHead, { className: "text-right", children: t('order.amount') }), _jsx(TableHead, { className: "text-center w-[80px]", children: t('warehouse.action') })] }) }), _jsx(TableBody, { children: filteredTransactions.length > 0 ? (filteredTransactions.map((tx) => (_jsxs(TableRow, { className: "hover:bg-muted/30 transition-colors", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: new Date(tx.date).toLocaleDateString() }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-mono text-xs text-navy-600", children: tx.id }), _jsx("span", { className: "text-sm text-muted-foreground", children: tx.referenceNumber })] }) }), _jsx(TableCell, { className: "hidden md:table-cell", children: _jsx(Badge, { variant: "outline", className: "bg-navy-50 text-navy-700 border-navy-100", children: tx.category }) }), _jsx(TableCell, { className: "hidden lg:table-cell", children: _jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(Building2, { className: "mr-1.5 h-3 w-3" }), tx.branchId] }) }), _jsx(TableCell, { children: _jsx(Badge, { className: tx.type === 'income'
                                                        ? "bg-success/15 text-success hover:bg-success/20 border-none"
                                                        : "bg-destructive/15 text-destructive hover:bg-destructive/20 border-none", children: tx.type === 'income' ? t('accounting.income') : t('accounting.expense') }) }), _jsxs(TableCell, { className: `text-right font-semibold ${tx.type === 'income' ? 'text-success' : 'text-destructive'}`, children: [tx.type === 'income' ? '+' : '-', " ", formatCurrency(tx.amount)] }), _jsx(TableCell, { className: "text-center", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: t('warehouse.action') }), _jsxs(DropdownMenuItem, { onClick: () => handleViewDetails(tx), children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), " ", t('common.view')] }), _jsxs(DropdownMenuItem, { children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), " ", t('reports.exportPdf')] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { className: "text-destructive", children: t('common.delete') })] })] }) })] }, tx.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, className: "h-48 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Clock, { className: "h-10 w-10 mb-2 opacity-20" }), _jsx("p", { children: t('common.none') })] }) }) })) })] }) }), _jsxs("div", { className: "p-4 border-t flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Showing ", filteredTransactions.length, " of ", MOCK_TRANSACTIONS.length, " transactions"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-navy-900 text-white", children: "1" }), _jsx(Button, { variant: "outline", size: "sm", children: t('common.next') })] })] })] }), _jsx(Dialog, { open: isDetailOpen, onOpenChange: setIsDetailOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px] border-gold-400/20 shadow-2xl", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-navy-900 flex items-center gap-2", children: [_jsx(FileText, { className: "h-5 w-5 text-gold-500" }), "Transaction Details"] }), _jsxs(DialogDescription, { children: ["Complete breakdown of financial record ", selectedTx?.id] })] }), selectedTx && (_jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Type" }), _jsx(Badge, { className: selectedTx.type === 'income' ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20", children: selectedTx.type.toUpperCase() })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Reference No." }), _jsx("p", { className: "font-mono font-semibold", children: selectedTx.referenceNumber })] })] }), _jsxs("div", { className: "p-4 bg-muted/30 rounded-lg space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Amount" }), _jsx("span", { className: `text-lg font-bold ${selectedTx.type === 'income' ? 'text-success' : 'text-destructive'}`, children: formatCurrency(selectedTx.amount) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Date" }), _jsx("span", { className: "text-sm font-medium", children: formatDate(selectedTx.date) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Branch" }), _jsx("span", { className: "text-sm font-medium", children: selectedTx.branchId })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-semibold", children: "Description" }), _jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: selectedTx.description })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-semibold", children: "Category" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Badge, { variant: "secondary", children: selectedTx.category }), selectedTx.shipmentId && _jsxs(Badge, { variant: "outline", children: ["Shipment: ", selectedTx.shipmentId] })] })] })] })), _jsxs(DialogFooter, { className: "flex-col sm:flex-row gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsDetailOpen(false), className: "w-full sm:w-auto", children: t('common.close') }), _jsxs(Button, { className: "bg-navy-900 text-gold-400 hover:bg-navy-800 w-full sm:w-auto", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " ", t('reports.exportPdf')] })] })] }) }), _jsx("div", { className: "pt-10 border-t border-border/40 text-center", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "\u00A9 2026 Britium Express Logistics System. All rights reserved. Myanmar \u2022 Singapore \u2022 Thailand" }) })] }));
};
export default TransactionsListPage;
