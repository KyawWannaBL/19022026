import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Download, Edit, Trash2, DollarSign, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle, Loader2, FileText, RefreshCw } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { VouchersAPI, FormUtils } from '@/lib/forms-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const VoucherManagementPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [vouchers, setVouchers] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [formData, setFormData] = useState({
        voucher_type: 'income',
        amount: '',
        description: '',
        reference_number: '',
        transaction_date: new Date().toISOString().split('T')[0]
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    // Load vouchers with real-time updates
    const loadVouchers = useCallback(async (showRefreshToast = false) => {
        try {
            setLoading(true);
            const result = await VouchersAPI.getAll({
                type: filterType !== 'all' ? filterType : undefined,
                status: filterStatus !== 'all' ? filterStatus : undefined
            });
            setVouchers(result.data);
            setSummary(result.summary);
            if (showRefreshToast) {
                toast({
                    title: "Success",
                    description: "Vouchers refreshed successfully",
                });
            }
        }
        catch (error) {
            console.error('Error loading vouchers:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to load vouchers",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    }, [filterType, filterStatus, toast]);
    // Refresh data manually
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadVouchers(true);
        setRefreshing(false);
    };
    useEffect(() => {
        loadVouchers();
    }, [loadVouchers]);
    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            loadVouchers();
        }, 30000);
        return () => clearInterval(interval);
    }, [loadVouchers]);
    const filteredVouchers = vouchers.filter(voucher => {
        const matchesSearch = voucher.voucher_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            voucher.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            voucher.reference_number?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field
        if (formErrors[field]) {
            setFormErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };
    const validateForm = async () => {
        try {
            const validation = await VouchersAPI.validate(formData);
            setFormErrors(validation.errors);
            return validation.isValid;
        }
        catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    };
    const handleCreateVoucher = async () => {
        try {
            setSubmitting(true);
            const isValid = await validateForm();
            if (!isValid) {
                return;
            }
            const voucherData = {
                voucher_type: formData.voucher_type,
                amount: parseFloat(formData.amount),
                description: formData.description,
                reference_number: formData.reference_number,
                transaction_date: formData.transaction_date,
                status: 'pending'
            };
            await VouchersAPI.create(voucherData);
            toast({
                title: "Success",
                description: "Voucher created successfully",
            });
            setIsCreateDialogOpen(false);
            resetForm();
            // Reload data to show new voucher
            await loadVouchers();
        }
        catch (error) {
            console.error('Error creating voucher:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create voucher",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleEditVoucher = async () => {
        if (!selectedVoucher)
            return;
        try {
            setSubmitting(true);
            const isValid = await validateForm();
            if (!isValid) {
                return;
            }
            const updates = {
                voucher_type: formData.voucher_type,
                amount: parseFloat(formData.amount),
                description: formData.description,
                reference_number: formData.reference_number,
                transaction_date: formData.transaction_date
            };
            await VouchersAPI.update(selectedVoucher.id, updates);
            toast({
                title: "Success",
                description: "Voucher updated successfully",
            });
            setIsEditDialogOpen(false);
            setSelectedVoucher(null);
            resetForm();
            // Reload data to show updated voucher
            await loadVouchers();
        }
        catch (error) {
            console.error('Error updating voucher:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to update voucher",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleDeleteVoucher = async (voucher) => {
        if (!confirm('Are you sure you want to delete this voucher?'))
            return;
        try {
            await VouchersAPI.delete(voucher.id);
            toast({
                title: "Success",
                description: "Voucher deleted successfully",
            });
            // Reload data to reflect deletion
            await loadVouchers();
        }
        catch (error) {
            console.error('Error deleting voucher:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to delete voucher",
                variant: "destructive",
            });
        }
    };
    const handleApproveVoucher = async (voucher) => {
        try {
            await VouchersAPI.update(voucher.id, { status: 'approved' });
            toast({
                title: "Success",
                description: "Voucher approved successfully",
            });
            // Reload data to show updated status
            await loadVouchers();
        }
        catch (error) {
            console.error('Error approving voucher:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to approve voucher",
                variant: "destructive",
            });
        }
    };
    const handleExportVouchers = async () => {
        try {
            const csvContent = await VouchersAPI.export({
                type: filterType !== 'all' ? filterType : undefined,
                status: filterStatus !== 'all' ? filterStatus : undefined
            });
            FormUtils.downloadFile(csvContent, `vouchers_export_${new Date().toISOString().split('T')[0]}.csv`);
            toast({
                title: "Success",
                description: "Vouchers exported successfully",
            });
        }
        catch (error) {
            console.error('Error exporting vouchers:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to export vouchers",
                variant: "destructive",
            });
        }
    };
    const resetForm = () => {
        setFormData({
            voucher_type: 'income',
            amount: '',
            description: '',
            reference_number: '',
            transaction_date: new Date().toISOString().split('T')[0]
        });
        setFormErrors({});
    };
    const openEditDialog = (voucher) => {
        setSelectedVoucher(voucher);
        setFormData({
            voucher_type: voucher.voucher_type,
            amount: voucher.amount.toString(),
            description: voucher.description || '',
            reference_number: voucher.reference_number || '',
            transaction_date: voucher.transaction_date
        });
        setIsEditDialogOpen(true);
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return _jsxs(Badge, { className: "status-delivered", children: [_jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }), "Approved"] });
            case 'pending':
                return _jsxs(Badge, { className: "status-pending", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), "Pending"] });
            case 'rejected':
                return _jsxs(Badge, { className: "status-failed", children: [_jsx(XCircle, { className: "w-3 h-3 mr-1" }), "Rejected"] });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'income':
                return _jsx(TrendingUp, { className: "w-4 h-4 text-success" });
            case 'expense':
                return _jsx(TrendingDown, { className: "w-4 h-4 text-error" });
            case 'transfer':
                return _jsx(DollarSign, { className: "w-4 h-4 text-info" });
            default:
                return _jsx(FileText, { className: "w-4 h-4" });
        }
    };
    if (loading && vouchers.length === 0) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "w-8 h-8 animate-spin text-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading vouchers..." })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(FileText, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Voucher Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage income, expense, and transfer vouchers" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: refreshing, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}` }), "Refresh"] }), _jsxs(Button, { variant: "outline", onClick: handleExportVouchers, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Report"] }), _jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "btn-premium", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Voucher"] }) }), _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create New Voucher" }) }), _jsx(VoucherForm, { formData: formData, formErrors: formErrors, onInputChange: handleInputChange, onSubmit: handleCreateVoucher, onCancel: () => {
                                                    setIsCreateDialogOpen(false);
                                                    resetForm();
                                                }, submitting: submitting, submitLabel: "Create Voucher" })] })] })] })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Revenue" }), _jsx("p", { className: "text-2xl font-bold text-success", children: FormUtils.formatCurrency(summary.totalIncome || 0) })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Expenses" }), _jsx("p", { className: "text-2xl font-bold text-error", children: FormUtils.formatCurrency(summary.totalExpense || 0) })] }), _jsx(TrendingDown, { className: "h-8 w-8 text-error" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Net Profit" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: FormUtils.formatCurrency(summary.netProfit || 0) })] }), _jsx(DollarSign, { className: "h-8 w-8 text-gold-500" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Pending Collections" }), _jsx("p", { className: "text-2xl font-bold text-warning", children: FormUtils.formatCurrency(summary.pendingAmount || 0) })] }), _jsx(Clock, { className: "h-8 w-8 text-warning" })] }) }) })] }), _jsxs(motion.div, { variants: staggerItem, className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search vouchers...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }), _jsxs(Select, { value: filterType, onValueChange: setFilterType, children: [_jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Types" }), _jsx(SelectItem, { value: "income", children: "Income" }), _jsx(SelectItem, { value: "expense", children: "Expense" }), _jsx(SelectItem, { value: "transfer", children: "Transfer" })] })] }), _jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [_jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "approved", children: "Approved" }), _jsx(SelectItem, { value: "rejected", children: "Rejected" })] })] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Voucher #" }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Amount" }), _jsx(TableHead, { children: "Description" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { children: filteredVouchers.map((voucher) => (_jsxs(motion.tr, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "hover:bg-muted/50", children: [_jsx(TableCell, { className: "font-medium", children: voucher.voucher_number }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [getTypeIcon(voucher.voucher_type), _jsx("span", { className: "capitalize", children: voucher.voucher_type })] }) }), _jsx(TableCell, { className: "font-semibold", children: FormUtils.formatCurrency(voucher.amount) }), _jsx(TableCell, { className: "max-w-xs truncate", children: voucher.description }), _jsx(TableCell, { children: FormUtils.formatDate(voucher.transaction_date) }), _jsx(TableCell, { children: getStatusBadge(voucher.status) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => openEditDialog(voucher), children: _jsx(Edit, { className: "w-4 h-4" }) }), voucher.status === 'pending' && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleApproveVoucher(voucher), className: "text-success hover:text-success", children: _jsx(CheckCircle2, { className: "w-4 h-4" }) })), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteVoucher(voucher), className: "text-error hover:text-error", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, voucher.id))) }) })] }), filteredVouchers.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: searchQuery || filterType !== 'all' || filterStatus !== 'all'
                                            ? 'No vouchers found matching your criteria'
                                            : 'No vouchers created yet' })] }))] }) }) }), _jsx(Dialog, { open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Edit Voucher" }) }), _jsx(VoucherForm, { formData: formData, formErrors: formErrors, onInputChange: handleInputChange, onSubmit: handleEditVoucher, onCancel: () => {
                                setIsEditDialogOpen(false);
                                setSelectedVoucher(null);
                                resetForm();
                            }, submitting: submitting, submitLabel: "Update Voucher" })] }) })] }));
};
const VoucherForm = ({ formData, formErrors, onInputChange, onSubmit, onCancel, submitting, submitLabel }) => {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "voucher_type", children: "Voucher Type" }), _jsxs(Select, { value: formData.voucher_type, onValueChange: (value) => onInputChange('voucher_type', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "income", children: "Income" }), _jsx(SelectItem, { value: "expense", children: "Expense" }), _jsx(SelectItem, { value: "transfer", children: "Transfer" })] })] }), formErrors.voucher_type && (_jsx("p", { className: "text-sm text-error", children: formErrors.voucher_type }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "amount", children: "Amount (MMK)" }), _jsx(Input, { id: "amount", type: "number", step: "0.01", value: formData.amount, onChange: (e) => onInputChange('amount', e.target.value), className: formErrors.amount ? 'border-error' : '' }), formErrors.amount && (_jsx("p", { className: "text-sm text-error", children: formErrors.amount }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Textarea, { id: "description", value: formData.description, onChange: (e) => onInputChange('description', e.target.value), className: formErrors.description ? 'border-error' : '', rows: 3 }), formErrors.description && (_jsx("p", { className: "text-sm text-error", children: formErrors.description }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "reference_number", children: "Reference Number (Optional)" }), _jsx(Input, { id: "reference_number", value: formData.reference_number, onChange: (e) => onInputChange('reference_number', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "transaction_date", children: "Transaction Date" }), _jsx(Input, { id: "transaction_date", type: "date", value: formData.transaction_date, onChange: (e) => onInputChange('transaction_date', e.target.value), className: formErrors.transaction_date ? 'border-error' : '' }), formErrors.transaction_date && (_jsx("p", { className: "text-sm text-error", children: formErrors.transaction_date }))] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx(Button, { variant: "outline", onClick: onCancel, disabled: submitting, children: "Cancel" }), _jsx(Button, { onClick: onSubmit, disabled: submitting, className: "btn-premium", children: submitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Saving..."] })) : (submitLabel) })] })] }));
};
export default VoucherManagementPage;
