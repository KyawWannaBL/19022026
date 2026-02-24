import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowUpCircle, ArrowDownCircle, Package, Phone, Navigation, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { RiderAPI } from '@/lib/rider-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const RiderTaskList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('delivery');
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [rider, setRider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    useEffect(() => {
        loadData();
        // Check for filter from URL params
        const filter = searchParams.get('filter');
        if (filter === 'pending') {
            setStatusFilter('pending');
        }
    }, [searchParams]);
    useEffect(() => {
        filterTasks();
    }, [tasks, activeTab, searchQuery, statusFilter]);
    const loadData = async () => {
        try {
            setLoading(true);
            // Load rider profile
            const riderProfile = await RiderAPI.getRiderProfile();
            if (riderProfile) {
                setRider(riderProfile);
                // Load all tasks
                const allTasks = await RiderAPI.getRiderTasks(riderProfile.id);
                setTasks(allTasks);
            }
        }
        catch (error) {
            console.error('Error loading tasks:', error);
            toast({
                title: t('rider.error'),
                description: "Failed to load tasks",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const filterTasks = () => {
        let filtered = tasks.filter(task => task.type === activeTab);
        // Apply status filter
        if (statusFilter !== 'all') {
            if (statusFilter === 'pending') {
                filtered = filtered.filter(task => ['pending', 'assigned'].includes(task.status));
            }
            else {
                filtered = filtered.filter(task => task.status === statusFilter);
            }
        }
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(task => task.task_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.delivery_address.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Sort by priority and time
        filtered.sort((a, b) => {
            // Priority order: urgent > express > normal
            const priorityOrder = { urgent: 3, express: 2, normal: 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            // Then by SLA time
            if (a.sla_time && b.sla_time) {
                return new Date(a.sla_time).getTime() - new Date(b.sla_time).getTime();
            }
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setFilteredTasks(filtered);
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
            case 'assigned':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: t('rider.pending') });
            case 'in_progress':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: t('rider.inProgress') });
            case 'completed':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: t('rider.completed') });
            case 'failed':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: t('rider.failed') });
            case 'cancelled':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: t('rider.cancelled') });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'urgent':
                return _jsx(Badge, { className: "bg-error text-white animate-pulse", children: t('rider.urgent') });
            case 'express':
                return _jsx(Badge, { className: "bg-warning text-white", children: t('rider.express') });
            case 'normal':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: t('rider.normal') });
            default:
                return _jsx(Badge, { variant: "outline", children: priority });
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-MM', {
            style: 'currency',
            currency: 'MMK',
            minimumFractionDigits: 0
        }).format(amount);
    };
    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString(language === 'my' ? 'my-MM' : 'en-MM', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const getTaskIcon = (type) => {
        switch (type) {
            case 'pickup':
                return _jsx(ArrowUpCircle, { className: "w-5 h-5 text-info" });
            case 'delivery':
                return _jsx(ArrowDownCircle, { className: "w-5 h-5 text-success" });
            case 'return':
                return _jsx(RefreshCw, { className: "w-5 h-5 text-warning" });
            default:
                return _jsx(Package, { className: "w-5 h-5 text-muted-foreground" });
        }
    };
    const getTaskCounts = () => {
        const counts = {
            pickup: tasks.filter(t => t.type === 'pickup' && ['pending', 'assigned', 'in_progress'].includes(t.status)).length,
            delivery: tasks.filter(t => t.type === 'delivery' && ['pending', 'assigned', 'in_progress'].includes(t.status)).length,
            return: tasks.filter(t => t.type === 'return' && ['pending', 'assigned', 'in_progress'].includes(t.status)).length
        };
        return counts;
    };
    const taskCounts = getTaskCounts();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-navy-600", children: t('rider.loading') })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 pb-20", children: [_jsx(motion.div, { variants: staggerItem, className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center", children: _jsx(Package, { className: "w-5 h-5 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-lg font-bold text-navy-900", children: t('rider.tasks') }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [filteredTasks.length, " ", t('rider.tasks').toLowerCase()] })] })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: loadData, disabled: loading, children: _jsx(RefreshCw, { className: `w-4 h-4 ${loading ? 'animate-spin' : ''}` }) })] }) }) }), _jsxs("div", { className: "px-4 py-6 space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { placeholder: `${t('rider.search')}...`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" }), _jsx(Package, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: statusFilter === 'all' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('all'), children: t('rider.all') }), _jsx(Button, { variant: statusFilter === 'pending' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('pending'), children: t('rider.pending') }), _jsx(Button, { variant: statusFilter === 'in_progress' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('in_progress'), children: t('rider.inProgress') }), _jsx(Button, { variant: statusFilter === 'completed' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('completed'), children: t('rider.completed') })] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-white", children: [_jsxs(TabsTrigger, { value: "pickup", className: "flex items-center space-x-2", children: [_jsx(ArrowUpCircle, { className: "w-4 h-4" }), _jsx("span", { children: t('rider.pickup') }), taskCounts.pickup > 0 && (_jsx(Badge, { className: "ml-1 bg-info text-white text-xs", children: taskCounts.pickup }))] }), _jsxs(TabsTrigger, { value: "delivery", className: "flex items-center space-x-2", children: [_jsx(ArrowDownCircle, { className: "w-4 h-4" }), _jsx("span", { children: t('rider.delivery') }), taskCounts.delivery > 0 && (_jsx(Badge, { className: "ml-1 bg-success text-white text-xs", children: taskCounts.delivery }))] }), _jsxs(TabsTrigger, { value: "return", className: "flex items-center space-x-2", children: [_jsx(RefreshCw, { className: "w-4 h-4" }), _jsx("span", { children: t('rider.return') }), taskCounts.return > 0 && (_jsx(Badge, { className: "ml-1 bg-warning text-white text-xs", children: taskCounts.return }))] })] }), _jsx(TabsContent, { value: activeTab, className: "mt-6", children: _jsxs("div", { className: "space-y-4", children: [filteredTasks.map((task) => (_jsx(motion.div, { variants: staggerItem, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-gold-500", onClick: () => navigate(`/rider/job/${task.id}`), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getTaskIcon(task.type), _jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-navy-900", children: ["#", task.task_code] }), _jsx("p", { className: "text-sm text-muted-foreground", children: task.customer_name })] })] }), _jsxs("div", { className: "flex flex-col items-end space-y-1", children: [getPriorityBadge(task.priority), getStatusBadge(task.status)] })] }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-3", children: [task.cod_amount > 0 && (_jsxs(Badge, { className: "bg-gold-500/10 text-gold-600 border-gold-200", children: [t('rider.cod'), ": ", formatCurrency(task.cod_amount)] })), task.is_fragile && (_jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: t('rider.fragile') })), task.delivery_fee > 0 && (_jsxs(Badge, { className: "bg-success/10 text-success border-success/20", children: ["+", formatCurrency(task.delivery_fee)] }))] }), _jsxs("div", { className: "flex items-start space-x-2 mb-3", children: [_jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" }), _jsx("p", { className: "text-sm text-muted-foreground flex-1", children: task.type === 'pickup' ? task.pickup_address : task.delivery_address })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4 text-sm text-muted-foreground", children: [task.sla_time && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { children: formatTime(task.sla_time) })] })), task.weight_kg && (_jsxs("span", { children: [task.weight_kg, "kg"] }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    window.open(`tel:${task.customer_phone}`);
                                                                                }, children: _jsx(Phone, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: (e) => {
                                                                                    e.stopPropagation();
                                                                                    const address = task.type === 'pickup' ? task.pickup_address : task.delivery_address;
                                                                                    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
                                                                                }, children: _jsx(Navigation, { className: "w-4 h-4" }) }), task.status === 'assigned' && (_jsx(Button, { size: "sm", className: "bg-info hover:bg-info/90", children: t('rider.start') })), task.status === 'in_progress' && (_jsx(Button, { size: "sm", className: "bg-success hover:bg-success/90", children: t('rider.finish') })), task.status === 'completed' && (_jsx(CheckCircle2, { className: "w-5 h-5 text-success" })), task.status === 'failed' && (_jsx(XCircle, { className: "w-5 h-5 text-error" }))] })] }), task.notes && (_jsx("div", { className: "mt-3 p-2 bg-muted/50 rounded text-sm", children: _jsxs("p", { className: "text-muted-foreground", children: ["\"", task.notes, "\""] }) }))] }) }) }, task.id))), filteredTasks.length === 0 && (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Package, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-navy-900 mb-2", children: t('rider.noTasks') }), _jsx("p", { className: "text-muted-foreground", children: statusFilter === 'all'
                                                                    ? `No ${activeTab} tasks available.`
                                                                    : `No ${statusFilter} ${activeTab} tasks found.` })] }) }) }))] }) })] }) })] })] }));
};
export default RiderTaskList;
