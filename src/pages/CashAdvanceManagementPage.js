import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Download, DollarSign, User, CheckCircle2, Clock, AlertTriangle, Loader2, CreditCard, TrendingUp, Users, RefreshCw } from 'lucide-react';
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
import { CashAdvancesAPI, FormUtils } from '@/lib/forms-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const CashAdvanceManagementPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [advances, setAdvances] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isRepayDialogOpen, setIsRepayDialogOpen] = useState(false);
    const [selectedAdvance, setSelectedAdvance] = useState(null);
    const [repayAmount, setRepayAmount] = useState('');
    const [formData, setFormData] = useState({
        deliveryman_id: '',
        deliveryman_name: '',
        amount: '',
        purpose: '',
        advance_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    // Mock deliverymen data - in real app, this would come from API
    const mockDeliverymen = [
        { id: '1', name: 'Ko Aung Myat' },
        { id: '2', name: 'Ma Thida' },
        { id: '3', name: 'U Kyaw Win' },
        { id: '4', name: 'Daw Mya Mya' },
        { id: '5', name: 'Ko Zaw Zaw' }
    ];
    // Load cash advances with real-time updates
    const loadCashAdvances = useCallback(async (showRefreshToast = false) => {
        try {
            setLoading(true);
            const result = await CashAdvancesAPI.getAll({
                status: filterStatus !== 'all' ? filterStatus : undefined
            });
            setAdvances(result.data);
            setSummary(result.summary);
            if (showRefreshToast) {
                toast({
                    title: "Success",
                    description: "Cash advances refreshed successfully",
                });
            }
        }
        catch (error) {
            console.error('Error loading cash advances:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to load cash advances",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    }, [filterStatus, toast]);
    // Refresh data manually
    const handleRefresh = async () => {
        setRefreshing(true);
        await loadCashAdvances(true);
        setRefreshing(false);
    };
    useEffect(() => {
        loadCashAdvances();
    }, [loadCashAdvances]);
    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            loadCashAdvances();
        }, 30000);
        return () => clearInterval(interval);
    }, [loadCashAdvances]);
    const filteredAdvances = advances.filter(advance => {
        const matchesSearch = advance.advance_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            advance.deliveryman_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            advance.purpose?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Auto-fill deliveryman name when ID is selected
        if (field === 'deliveryman_id') {
            const deliveryman = mockDeliverymen.find(d => d.id === value);
            if (deliveryman) {
                setFormData(prev => ({ ...prev, deliveryman_name: deliveryman.name }));
            }
        }
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
            const validation = await CashAdvancesAPI.validate(formData);
            setFormErrors(validation.errors);
            return validation.isValid;
        }
        catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    };
    const handleCreateAdvance = async () => {
        try {
            setSubmitting(true);
            const isValid = await validateForm();
            if (!isValid) {
                return;
            }
            const advanceData = {
                deliveryman_id: formData.deliveryman_id,
                deliveryman_name: formData.deliveryman_name,
                amount: parseFloat(formData.amount),
                purpose: formData.purpose,
                advance_date: formData.advance_date,
                due_date: formData.due_date,
                status: 'active'
            };
            await CashAdvancesAPI.create(advanceData);
            toast({
                title: "Success",
                description: "Cash advance created successfully",
            });
            setIsCreateDialogOpen(false);
            resetForm();
            // Reload data to show new advance
            await loadCashAdvances();
        }
        catch (error) {
            console.error('Error creating cash advance:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to create cash advance",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleRepayAdvance = async () => {
        if (!selectedAdvance || !repayAmount)
            return;
        try {
            setSubmitting(true);
            const amount = parseFloat(repayAmount);
            if (isNaN(amount) || amount <= 0) {
                toast({
                    title: "Error",
                    description: "Please enter a valid repayment amount",
                    variant: "destructive",
                });
                return;
            }
            const outstanding = getOutstandingAmount(selectedAdvance);
            if (amount > outstanding) {
                toast({
                    title: "Error",
                    description: "Repayment amount cannot exceed outstanding balance",
                    variant: "destructive",
                });
                return;
            }
            await CashAdvancesAPI.repay(selectedAdvance.id, amount);
            toast({
                title: "Success",
                description: `Repayment of ${FormUtils.formatCurrency(amount)} recorded successfully`,
            });
            setIsRepayDialogOpen(false);
            setSelectedAdvance(null);
            setRepayAmount('');
            // Reload data to show updated advance
            await loadCashAdvances();
        }
        catch (error) {
            console.error('Error recording repayment:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to record repayment",
                variant: "destructive",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    const handleExportAdvances = async () => {
        try {
            const csvContent = await CashAdvancesAPI.export({
                status: filterStatus !== 'all' ? filterStatus : undefined
            });
            FormUtils.downloadFile(csvContent, `cash_advances_export_${new Date().toISOString().split('T')[0]}.csv`);
            toast({
                title: "Success",
                description: "Cash advances exported successfully",
            });
        }
        catch (error) {
            console.error('Error exporting cash advances:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to export cash advances",
                variant: "destructive",
            });
        }
    };
    const resetForm = () => {
        setFormData({
            deliveryman_id: '',
            deliveryman_name: '',
            amount: '',
            purpose: '',
            advance_date: new Date().toISOString().split('T')[0],
            due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        setFormErrors({});
    };
    const openRepayDialog = (advance) => {
        setSelectedAdvance(advance);
        setRepayAmount('');
        setIsRepayDialogOpen(true);
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return _jsxs(Badge, { className: "status-transit", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), "Active"] });
            case 'repaid':
                return _jsxs(Badge, { className: "status-delivered", children: [_jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }), "Repaid"] });
            case 'written_off':
                return _jsxs(Badge, { className: "status-failed", children: [_jsx(AlertTriangle, { className: "w-3 h-3 mr-1" }), "Written Off"] });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getOutstandingAmount = (advance) => {
        return advance.amount - (advance.repaid_amount || 0);
    };
    if (loading && advances.length === 0) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[400px]", children: _jsxs("div", { className: "text-center", children: [_jsx(Loader2, { className: "w-8 h-8 animate-spin text-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading cash advances..." })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(CreditCard, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Cash Advance Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage cash advances for deliverymen" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: refreshing, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}` }), "Refresh"] }), _jsxs(Button, { variant: "outline", onClick: handleExportAdvances, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Report"] }), _jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "btn-premium", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "New Cash Advance"] }) }), _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create Cash Advance" }) }), _jsx(CashAdvanceForm, { formData: formData, formErrors: formErrors, deliverymen: mockDeliverymen, onInputChange: handleInputChange, onSubmit: handleCreateAdvance, onCancel: () => {
                                                    setIsCreateDialogOpen(false);
                                                    resetForm();
                                                }, submitting: submitting })] })] })] })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Advanced" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: FormUtils.formatCurrency(summary.totalAdvanced || 0) })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-gold-500" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Repaid" }), _jsx("p", { className: "text-2xl font-bold text-success", children: FormUtils.formatCurrency(summary.totalRepaid || 0) })] }), _jsx(CheckCircle2, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Outstanding" }), _jsx("p", { className: "text-2xl font-bold text-warning", children: FormUtils.formatCurrency(summary.outstanding || 0) })] }), _jsx(Clock, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Advances" }), _jsx("p", { className: "text-2xl font-bold text-info", children: summary.activeAdvances || 0 })] }), _jsx(Users, { className: "h-8 w-8 text-info" })] }) }) })] }), _jsxs(motion.div, { variants: staggerItem, className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search cash advances...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }), _jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [_jsx(SelectTrigger, { className: "w-full sm:w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "repaid", children: "Repaid" }), _jsx(SelectItem, { value: "written_off", children: "Written Off" })] })] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Advance #" }), _jsx(TableHead, { children: "Deliveryman" }), _jsx(TableHead, { children: "Amount" }), _jsx(TableHead, { children: "Repaid" }), _jsx(TableHead, { children: "Outstanding" }), _jsx(TableHead, { children: "Purpose" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { children: filteredAdvances.map((advance) => (_jsxs(motion.tr, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "hover:bg-muted/50", children: [_jsx(TableCell, { className: "font-medium", children: advance.advance_number }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { children: advance.deliveryman_name })] }) }), _jsx(TableCell, { className: "font-semibold", children: FormUtils.formatCurrency(advance.amount) }), _jsx(TableCell, { className: "text-success", children: FormUtils.formatCurrency(advance.repaid_amount || 0) }), _jsx(TableCell, { className: "font-semibold text-warning", children: FormUtils.formatCurrency(getOutstandingAmount(advance)) }), _jsx(TableCell, { className: "max-w-xs truncate", children: advance.purpose }), _jsx(TableCell, { children: FormUtils.formatDate(advance.advance_date) }), _jsx(TableCell, { children: getStatusBadge(advance.status) }), _jsx(TableCell, { children: _jsx("div", { className: "flex items-center space-x-2", children: advance.status === 'active' && getOutstandingAmount(advance) > 0 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => openRepayDialog(advance), className: "text-success hover:text-success", children: _jsx(DollarSign, { className: "w-4 h-4" }) })) }) })] }, advance.id))) }) })] }), filteredAdvances.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(CreditCard, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: searchQuery || filterStatus !== 'all'
                                            ? 'No cash advances found matching your criteria'
                                            : 'No cash advances created yet' })] }))] }) }) }), _jsx(Dialog, { open: isRepayDialogOpen, onOpenChange: setIsRepayDialogOpen, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Record Repayment" }) }), selectedAdvance && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-muted/50 rounded-lg", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Advance Details" }), _jsx("p", { className: "font-semibold", children: selectedAdvance.advance_number }), _jsx("p", { className: "text-sm", children: selectedAdvance.deliveryman_name }), _jsxs("p", { className: "text-sm", children: ["Outstanding: ", FormUtils.formatCurrency(getOutstandingAmount(selectedAdvance))] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "repayAmount", children: "Repayment Amount (MMK)" }), _jsx(Input, { id: "repayAmount", type: "number", step: "0.01", value: repayAmount, onChange: (e) => setRepayAmount(e.target.value), max: getOutstandingAmount(selectedAdvance) })] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx(Button, { variant: "outline", onClick: () => {
                                                setIsRepayDialogOpen(false);
                                                setSelectedAdvance(null);
                                                setRepayAmount('');
                                            }, disabled: submitting, children: "Cancel" }), _jsx(Button, { onClick: handleRepayAdvance, disabled: submitting, className: "btn-premium", children: submitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Recording..."] })) : ('Record Repayment') })] })] }))] }) })] }));
};
const CashAdvanceForm = ({ formData, formErrors, deliverymen, onInputChange, onSubmit, onCancel, submitting }) => {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "deliveryman_id", children: "Deliveryman" }), _jsxs(Select, { value: formData.deliveryman_id, onValueChange: (value) => onInputChange('deliveryman_id', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select deliveryman" }) }), _jsx(SelectContent, { children: deliverymen.map((deliveryman) => (_jsx(SelectItem, { value: deliveryman.id, children: deliveryman.name }, deliveryman.id))) })] }), formErrors.deliveryman_id && (_jsx("p", { className: "text-sm text-error", children: formErrors.deliveryman_id }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "amount", children: "Amount (MMK)" }), _jsx(Input, { id: "amount", type: "number", step: "0.01", value: formData.amount, onChange: (e) => onInputChange('amount', e.target.value), className: formErrors.amount ? 'border-error' : '' }), formErrors.amount && (_jsx("p", { className: "text-sm text-error", children: formErrors.amount }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "purpose", children: "Purpose" }), _jsx(Textarea, { id: "purpose", value: formData.purpose, onChange: (e) => onInputChange('purpose', e.target.value), rows: 3 })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "advance_date", children: "Advance Date" }), _jsx(Input, { id: "advance_date", type: "date", value: formData.advance_date, onChange: (e) => onInputChange('advance_date', e.target.value), className: formErrors.advance_date ? 'border-error' : '' }), formErrors.advance_date && (_jsx("p", { className: "text-sm text-error", children: formErrors.advance_date }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "due_date", children: "Due Date" }), _jsx(Input, { id: "due_date", type: "date", value: formData.due_date, onChange: (e) => onInputChange('due_date', e.target.value) })] })] }), _jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [_jsx(Button, { variant: "outline", onClick: onCancel, disabled: submitting, children: "Cancel" }), _jsx(Button, { onClick: onSubmit, disabled: submitting, className: "btn-premium", children: submitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }), "Creating..."] })) : ('Create Advance') })] })] }));
};
export default CashAdvanceManagementPage;
