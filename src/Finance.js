import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp, TrendingDown, Search, Download, Plus, Wallet, ArrowUpRight, FileText, Filter, Calendar, RefreshCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency, formatDate } from '@/lib/index.ts';
import { StatusBadge } from '@/components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
export default function Finance() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: 'INCOME',
        amount: '',
        description: '',
        category: '',
        reference: '',
        shipmentId: ''
    });
    useEffect(() => {
        loadFinancialData();
    }, []);
    const loadFinancialData = async () => {
        try {
            setLoading(true);
            // Simulate API delay for 2026 data
            await new Promise(resolve => setTimeout(resolve, 800));
            const mockTransactions = [
                {
                    id: '1',
                    type: 'COD_COLLECTION',
                    amount: 450000,
                    description: 'COD Collection - Shipment #BRT-2026-001234',
                    category: 'Delivery Revenue',
                    date: '2026-02-19T10:30:00Z',
                    status: 'COMPLETED',
                    reference: 'COD-001234',
                    shipmentId: 'BRT-2026-001234',
                    createdBy: 'rider-001'
                },
                {
                    id: '2',
                    type: 'INCOME',
                    amount: 85000,
                    description: 'Shipping Fee - Express Delivery',
                    category: 'Shipping Revenue',
                    date: '2026-02-19T09:15:00Z',
                    status: 'COMPLETED',
                    reference: 'INV-2026-0234',
                    createdBy: 'system'
                },
                {
                    id: '3',
                    type: 'EXPENSE',
                    amount: 25000,
                    description: 'Fuel Cost - Vehicle Maintenance',
                    category: 'Operations',
                    date: '2026-02-18T18:00:00Z',
                    status: 'COMPLETED',
                    reference: 'EXP-2026-0156',
                    createdBy: 'admin-001'
                },
                {
                    id: '4',
                    type: 'PAYMENT',
                    amount: 1200000,
                    description: 'Rider Commission Batch Payment',
                    category: 'Payroll',
                    date: '2026-02-18T16:30:00Z',
                    status: 'PENDING',
                    reference: 'PAY-2026-0089',
                    createdBy: 'hr-001'
                },
                {
                    id: '5',
                    type: 'INCOME',
                    amount: 2500000,
                    description: 'Monthly Subscription - Enterprise Client',
                    category: 'Subscription Revenue',
                    date: '2026-02-17T14:20:00Z',
                    status: 'COMPLETED',
                    reference: 'SUB-2026-0045',
                    createdBy: 'system'
                }
            ];
            setTransactions(mockTransactions);
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to load financial records",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const summary = useMemo(() => {
        const revenue = transactions
            .filter(t => ['INCOME', 'COD_COLLECTION'].includes(t.type) && t.status === 'COMPLETED')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => ['EXPENSE', 'PAYMENT'].includes(t.type) && t.status === 'COMPLETED')
            .reduce((sum, t) => sum + t.amount, 0);
        const codCollections = transactions
            .filter(t => t.type === 'COD_COLLECTION' && t.status === 'COMPLETED')
            .reduce((sum, t) => sum + t.amount, 0);
        const pendingPayments = transactions
            .filter(t => t.status === 'PENDING')
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            totalRevenue: revenue,
            totalExpenses: expenses,
            netProfit: revenue - expenses,
            codCollections,
            pendingPayments,
            monthlyGrowth: 14.2
        };
    }, [transactions]);
    const handleCreateTransaction = () => {
        if (!formData.amount || !formData.description)
            return;
        const newTransaction = {
            id: Date.now().toString(),
            type: formData.type,
            amount: parseFloat(formData.amount),
            description: formData.description,
            category: formData.category || 'General',
            date: new Date().toISOString(),
            status: 'COMPLETED',
            reference: formData.reference || `TXN-${Date.now()}`,
            shipmentId: formData.shipmentId || undefined,
            createdBy: 'Admin'
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setIsCreateDialogOpen(false);
        resetForm();
        toast({
            title: "Transaction Created",
            description: "Financial record has been successfully updated.",
        });
    };
    const resetForm = () => {
        setFormData({
            type: 'INCOME',
            amount: '',
            description: '',
            category: '',
            reference: '',
            shipmentId: ''
        });
    };
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.reference?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || t.type === typeFilter;
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });
    if (loading) {
        return (_jsx("div", { className: "flex h-[60vh] w-full items-center justify-center", children: _jsx(RefreshCcw, { className: "h-8 w-8 animate-spin text-primary" }) }));
    }
    return (_jsxs("div", { className: "space-y-8 pb-12", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight text-foreground font-heading", children: "Finance Center" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Enterprise revenue tracking and financial oversight for 2026" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-border hover:bg-muted", children: [_jsx(Download, { className: "mr-2 h-4 w-4 text-primary" }), "Export PDF"] }), _jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "luxury-button bg-primary text-primary-foreground", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Entry"] }) }), _jsxs(DialogContent, { className: "luxury-glass border-border/50 sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-2xl font-heading", children: "Record Transaction" }), _jsx(DialogDescription, { children: "Manual financial entry for logistics operations." })] }), _jsxs("div", { className: "grid gap-6 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Type" }), _jsxs(Select, { value: formData.type, onValueChange: (v) => setFormData(p => ({ ...p, type: v })), children: [_jsx(SelectTrigger, { className: "bg-background/50 border-border/50", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "INCOME", children: "Income" }), _jsx(SelectItem, { value: "EXPENSE", children: "Expense" }), _jsx(SelectItem, { value: "COD_COLLECTION", children: "COD Collection" }), _jsx(SelectItem, { value: "PAYMENT", children: "Payment" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Amount (MMK)" }), _jsx(Input, { type: "number", value: formData.amount, onChange: (e) => setFormData(p => ({ ...p, amount: e.target.value })), className: "bg-background/50 border-border/50", placeholder: "0.00" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Description" }), _jsx(Input, { value: formData.description, onChange: (e) => setFormData(p => ({ ...p, description: e.target.value })), className: "bg-background/50 border-border/50", placeholder: "Brief details about the transaction" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Category" }), _jsx(Input, { value: formData.category, onChange: (e) => setFormData(p => ({ ...p, category: e.target.value })), className: "bg-background/50 border-border/50", placeholder: "e.g. Fuel, Payroll" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Reference (Optional)" }), _jsx(Input, { value: formData.reference, onChange: (e) => setFormData(p => ({ ...p, reference: e.target.value })), className: "bg-background/50 border-border/50", placeholder: "INV-000" })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "ghost", onClick: () => setIsCreateDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleCreateTransaction, className: "bg-primary text-primary-foreground", children: "Confirm Entry" })] })] })] })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { className: "luxury-card relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: _jsx(DollarSign, { className: "h-12 w-12" }) }), _jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { className: "text-xs uppercase tracking-widest font-semibold", children: "Total Revenue" }), _jsx(CardTitle, { className: "text-3xl font-mono text-primary", children: formatCurrency(summary.totalRevenue) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-green-500 font-medium", children: [_jsx(ArrowUpRight, { className: "h-3 w-3" }), _jsxs("span", { children: [summary.monthlyGrowth, "% growth this month"] })] }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { className: "text-xs uppercase tracking-widest font-semibold", children: "Operating Expenses" }), _jsx(CardTitle, { className: "text-3xl font-mono text-destructive", children: formatCurrency(summary.totalExpenses) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(TrendingDown, { className: "h-3 w-3" }), _jsx("span", { children: "-2.4% vs last period" })] }) })] }), _jsxs(Card, { className: "luxury-card border-l-4 border-l-primary", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { className: "text-xs uppercase tracking-widest font-semibold", children: "Net Profit" }), _jsx(CardTitle, { className: "text-3xl font-mono", children: formatCurrency(summary.netProfit) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-primary font-medium", children: [_jsx(TrendingUp, { className: "h-3 w-3" }), _jsx("span", { children: "Profit margin 32%" })] }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { className: "text-xs uppercase tracking-widest font-semibold", children: "COD Collections" }), _jsx(CardTitle, { className: "text-3xl font-mono", children: formatCurrency(summary.codCollections) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(Wallet, { className: "h-3 w-3" }), _jsx("span", { children: "Awaiting settlement" })] }) })] })] }), _jsxs(Card, { className: "luxury-card border-none shadow-none", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-2xl font-heading", children: "Transaction History" }), _jsx(CardDescription, { children: "Comprehensive ledger of all financial movements" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search ledger...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-9 bg-background/50" })] }), _jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [_jsx(SelectTrigger, { className: "w-[140px] bg-background/50", children: _jsx(SelectValue, { placeholder: "Type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Types" }), _jsx(SelectItem, { value: "INCOME", children: "Income" }), _jsx(SelectItem, { value: "EXPENSE", children: "Expense" }), _jsx(SelectItem, { value: "COD_COLLECTION", children: "COD" }), _jsx(SelectItem, { value: "PAYMENT", children: "Payment" })] })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[140px] bg-background/50", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "COMPLETED", children: "Completed" }), _jsx(SelectItem, { value: "PENDING", children: "Pending" })] })] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "rounded-xl overflow-hidden border border-border/30", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[120px]", children: "Date" }), _jsx(TableHead, { children: "Reference" }), _jsx(TableHead, { children: "Details" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { className: "text-right", children: "Amount" }), _jsx(TableHead, { className: "text-center", children: "Status" })] }) }), _jsx(TableBody, { children: filteredTransactions.length > 0 ? (filteredTransactions.map((tx) => (_jsxs(TableRow, { className: "hover:bg-muted/20 transition-colors", children: [_jsx(TableCell, { className: "font-mono text-xs", children: formatDate(tx.date).split(',')[0] }), _jsx(TableCell, { className: "font-semibold text-xs", children: _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(FileText, { className: "h-3 w-3 text-primary" }), tx.reference] }) }), _jsxs(TableCell, { className: "max-w-[300px]", children: [_jsx("p", { className: "text-sm font-medium line-clamp-1", children: tx.description }), tx.shipmentId && (_jsxs("span", { className: "text-[10px] text-muted-foreground", children: ["Shipment: ", tx.shipmentId] }))] }), _jsx(TableCell, { children: _jsx("span", { className: "px-2 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-tighter", children: tx.category }) }), _jsx(TableCell, { className: "text-right font-mono", children: _jsxs("span", { className: ['EXPENSE', 'PAYMENT'].includes(tx.type) ? 'text-destructive' : 'text-primary', children: [['EXPENSE', 'PAYMENT'].includes(tx.type) ? '-' : '+', formatCurrency(tx.amount)] }) }), _jsx(TableCell, { className: "text-center", children: _jsx(StatusBadge, { status: tx.status, type: "payment", size: "sm" }) })] }, tx.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-24 text-center text-muted-foreground italic", children: "No financial records match your filters." }) })) })] }) }) })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Awaiting Settlement" })] }), _jsx(CardDescription, { children: "Merchant payments scheduled for the next 48 hours" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [1, 2].map(i => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/20", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-bold", children: ["Merchant Settlement Batch #", 1024 + i] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Due: Feb ", 20 + i, ", 2026"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-mono font-bold", children: formatCurrency(2400000 * i) }), _jsx("p", { className: "text-[10px] text-primary", children: "Processing" })] })] }, i))) }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "h-5 w-5 text-primary" }), _jsx(CardTitle, { children: "Expense Distribution" })] }), _jsx(CardDescription, { children: "Top categories for Q1 2026" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: ['Fuel & Logistics', 'Payroll', 'Maintenance', 'Marketing'].map((cat, idx) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs font-medium", children: [_jsx("span", { children: cat }), _jsxs("span", { children: [45 - idx * 10, "%"] })] }), _jsx("div", { className: "h-1.5 w-full bg-muted rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${45 - idx * 10}%` }, className: "h-full bg-primary", transition: { duration: 1, delay: idx * 0.1 } }) })] }, cat))) }) })] })] })] }));
}
