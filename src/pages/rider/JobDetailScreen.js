import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Navigation, ChevronLeft, Package, AlertTriangle, MapPin, Clock, DollarSign, User, FileText, CheckCircle2, XCircle, Star, Weight, Ruler } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { RiderAPI } from '@/lib/rider-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const JobDetailScreen = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    useEffect(() => {
        if (jobId) {
            loadTaskDetails();
        }
    }, [jobId]);
    const loadTaskDetails = async () => {
        if (!jobId)
            return;
        try {
            setLoading(true);
            const taskData = await RiderAPI.getTask(jobId);
            if (taskData) {
                setTask(taskData);
            }
            else {
                toast({
                    title: t('rider.error'),
                    description: "Task not found",
                    variant: "destructive",
                });
                navigate('/rider/tasks');
            }
        }
        catch (error) {
            console.error('Error loading task:', error);
            toast({
                title: t('rider.error'),
                description: "Failed to load task details",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleCall = () => {
        if (task?.customer_phone) {
            window.open(`tel:${task.customer_phone}`);
        }
    };
    const handleSMS = () => {
        if (task?.customer_phone) {
            const message = `Hello ${task.customer_name}, I am your Britium Express rider. I will be delivering your package #${task.task_code} soon.`;
            window.open(`sms:${task.customer_phone}?body=${encodeURIComponent(message)}`);
        }
    };
    const handleMap = () => {
        if (task) {
            const address = task.type === 'pickup' ? task.pickup_address : task.delivery_address;
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
        }
    };
    const handleStartTask = async () => {
        if (!task)
            return;
        try {
            setUpdating(true);
            const success = await RiderAPI.updateTaskStatus(task.id, 'in_progress');
            if (success) {
                setTask({ ...task, status: 'in_progress', started_at: new Date().toISOString() });
                toast({
                    title: t('rider.success'),
                    description: "Task started successfully",
                });
            }
        }
        catch (error) {
            toast({
                title: t('rider.error'),
                description: "Failed to start task",
                variant: "destructive",
            });
        }
        finally {
            setUpdating(false);
        }
    };
    const handleCompleteTask = () => {
        if (!task)
            return;
        if (task.type === 'delivery') {
            navigate(`/rider/delivery-confirm/${task.id}`);
        }
        else if (task.type === 'pickup') {
            navigate(`/rider/pickup-confirm/${task.id}`);
        }
    };
    const handleReportProblem = () => {
        if (task) {
            navigate(`/rider/exception/${task.id}`);
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
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
            case 'assigned':
                return 'text-warning';
            case 'in_progress':
                return 'text-info';
            case 'completed':
                return 'text-success';
            case 'failed':
                return 'text-error';
            default:
                return 'text-muted-foreground';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent':
                return 'bg-error text-white';
            case 'express':
                return 'bg-warning text-white';
            case 'normal':
                return 'bg-muted text-muted-foreground';
            default:
                return 'bg-muted text-muted-foreground';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-navy-600", children: t('rider.loading') })] }) }));
    }
    if (!task) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Package, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-navy-600", children: "Task not found" }), _jsx(Button, { onClick: () => navigate('/rider/tasks'), className: "mt-4", children: t('rider.back') })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 pb-20", children: [_jsx(motion.div, { variants: staggerItem, className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "px-4 py-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate(-1), className: "p-2 -ml-2", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h1", { className: "text-lg font-bold text-navy-900", children: [t('rider.job'), " #", task.task_code] }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx(Badge, { className: getPriorityColor(task.priority), children: t(`rider.${task.priority}`) }), _jsx("span", { className: `text-sm font-medium ${getStatusColor(task.status)}`, children: t(`rider.${task.status}`) })] })] })] }) }) }), _jsxs("div", { className: "px-4 py-6 space-y-6", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card overflow-hidden", children: _jsxs("div", { className: "h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative", children: [_jsxs("div", { className: "text-center", children: [_jsx(MapPin, { className: "w-12 h-12 text-blue-500 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Interactive Map View" })] }), _jsxs(Button, { onClick: handleMap, className: "absolute bottom-4 right-4 bg-white/90 text-navy-900 hover:bg-white", children: [_jsx(Navigation, { className: "w-4 h-4 mr-2" }), t('rider.navigate')] })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: t('rider.customer') })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-navy-900", children: task.customer_name }), _jsx("p", { className: "text-muted-foreground", children: task.customer_phone })] }), _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" }), _jsx("p", { className: "text-sm text-muted-foreground", children: task.type === 'pickup' ? task.pickup_address : task.delivery_address })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { onClick: handleCall, className: "flex-1 bg-success hover:bg-success/90", children: [_jsx(Phone, { className: "w-4 h-4 mr-2" }), t('rider.phone')] }), _jsxs(Button, { onClick: handleSMS, variant: "outline", className: "flex-1", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), t('rider.sms')] })] })] })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Package, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: t('rider.packageDetails') })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [task.cod_amount > 0 && (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gold-50 rounded-lg border border-gold-200", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(DollarSign, { className: "w-5 h-5 text-gold-600" }), _jsx("span", { className: "font-medium", children: t('rider.cod') })] }), _jsx("span", { className: "text-xl font-bold text-gold-600", children: formatCurrency(task.cod_amount) })] })), task.delivery_fee > 0 && (_jsxs("div", { className: "flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Star, { className: "w-5 h-5 text-success" }), _jsx("span", { className: "font-medium", children: t('rider.earnings') })] }), _jsxs("span", { className: "text-lg font-bold text-success", children: ["+", formatCurrency(task.delivery_fee)] })] })), task.sla_time && (_jsxs("div", { className: "flex items-center justify-between p-3 bg-info/10 rounded-lg border border-info/20", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "w-5 h-5 text-info" }), _jsx("span", { className: "font-medium", children: t('rider.time') })] }), _jsx("span", { className: "text-lg font-bold text-info", children: formatTime(task.sla_time) })] })), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [task.weight_kg && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Weight, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("span", { className: "text-sm", children: [task.weight_kg, " kg"] })] })), task.dimensions && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Ruler, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: task.dimensions })] }))] }), task.is_fragile && (_jsxs("div", { className: "flex items-center space-x-2 p-3 bg-error/10 rounded-lg border border-error/20", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-error" }), _jsx("span", { className: "font-medium text-error", children: t('rider.fragile') })] })), task.notes && (_jsx("div", { className: "p-3 bg-muted/50 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(FileText, { className: "w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium text-sm mb-1", children: [t('rider.notes'), ":"] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["\"", task.notes, "\""] })] })] }) })), task.special_instructions && (_jsx("div", { className: "p-3 bg-warning/10 rounded-lg border border-warning/20", children: _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-warning mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium text-sm mb-1", children: [t('rider.specialInstructions'), ":"] }), _jsx("p", { className: "text-sm text-warning", children: task.special_instructions })] })] }) }))] })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "grid grid-cols-4 gap-2", children: [_jsxs(Button, { onClick: handleReportProblem, variant: "outline", className: "col-span-1 bg-error/10 text-error border-error/20 hover:bg-error/20 py-6 flex flex-col items-center justify-center text-xs", children: [_jsx(XCircle, { className: "w-5 h-5 mb-1" }), t('rider.problem')] }), _jsx(Button, { onClick: task.status === 'assigned' ? handleStartTask : handleCompleteTask, disabled: updating || !['assigned', 'in_progress'].includes(task.status), className: "col-span-3 py-6 text-lg font-bold shadow-lg", children: updating ? (_jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" })) : task.status === 'assigned' ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5 mr-2" }), task.type === 'delivery' ? t('rider.startDelivery') : t('rider.startPickup')] })) : task.status === 'in_progress' ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5 mr-2" }), task.type === 'delivery' ? t('rider.confirmDelivery') : t('rider.confirmPickup')] })) : task.status === 'completed' ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5 mr-2" }), t('rider.completed')] })) : (_jsxs(_Fragment, { children: [_jsx(XCircle, { className: "w-5 h-5 mr-2" }), t('rider.failed')] })) })] }) }) }) }), (task.assigned_at || task.started_at || task.completed_at) && (_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: t('rider.timeline') })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [task.assigned_at && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-info rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: t('rider.assigned') }), _jsx("p", { className: "text-xs text-muted-foreground", children: new Date(task.assigned_at).toLocaleString(language === 'my' ? 'my-MM' : 'en-MM') })] })] })), task.started_at && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-warning rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: t('rider.started') }), _jsx("p", { className: "text-xs text-muted-foreground", children: new Date(task.started_at).toLocaleString(language === 'my' ? 'my-MM' : 'en-MM') })] })] })), task.completed_at && (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: t('rider.completed') }), _jsx("p", { className: "text-xs text-muted-foreground", children: new Date(task.completed_at).toLocaleString(language === 'my' ? 'my-MM' : 'en-MM') })] })] }))] }) })] }) }))] })] }));
};
export default JobDetailScreen;
