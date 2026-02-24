import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Map, Package, Truck, Wifi, WifiOff, DollarSign, Clock, CheckCircle2, AlertTriangle, Navigation, Phone, Star, Battery, Signal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { RiderAPI } from '@/lib/rider-api';
import { staggerContainer, staggerItem } from '@/lib/motion';
const RiderDashboard = () => {
    const navigate = useNavigate();
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    // State management
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isOnDuty, setIsOnDuty] = useState(false);
    const [rider, setRider] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({
        pending: 0,
        completed: 0,
        failed: 0,
        cod: 0,
        todayEarnings: 0
    });
    const [loading, setLoading] = useState(true);
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [currentTime, setCurrentTime] = useState(new Date());
    // Load rider data on component mount
    useEffect(() => {
        loadRiderData();
        // Set up real-time updates
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            updateBatteryLevel();
        }, 30000); // Update every 30 seconds
        // Network status listeners
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            clearInterval(interval);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    const loadRiderData = async () => {
        try {
            setLoading(true);
            // Load rider profile
            const riderProfile = await RiderAPI.getRiderProfile();
            if (riderProfile) {
                setRider(riderProfile);
                setIsOnDuty(riderProfile.duty_status === 'on_duty');
                // Load rider tasks
                const riderTasks = await RiderAPI.getRiderTasks(riderProfile.id);
                setTasks(riderTasks);
                // Load statistics
                const riderStats = await RiderAPI.getRiderStats(riderProfile.id);
                setStats(riderStats);
            }
        }
        catch (error) {
            console.error('Error loading rider data:', error);
            toast({
                title: t('rider.error'),
                description: "Failed to load rider data",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const updateBatteryLevel = async () => {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                setBatteryLevel(Math.round(battery.level * 100));
            }
            catch (error) {
                // Fallback for browsers that don't support battery API
                setBatteryLevel(Math.floor(Math.random() * 30) + 70); // 70-100%
            }
        }
    };
    const toggleDutyStatus = async () => {
        if (!rider)
            return;
        const newStatus = isOnDuty ? 'off_duty' : 'on_duty';
        const success = await RiderAPI.updateDutyStatus(rider.id, newStatus);
        if (success) {
            setIsOnDuty(!isOnDuty);
            toast({
                title: isOnDuty ? t('rider.offDuty') : t('rider.onDuty'),
                description: isOnDuty ? "You are now off duty" : "You are now on duty",
            });
        }
    };
    const getNextTask = () => {
        return tasks.find(task => task.status === 'assigned' || task.status === 'pending');
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-MM', {
            style: 'currency',
            currency: 'MMK',
            minimumFractionDigits: 0
        }).format(amount);
    };
    const formatTime = (date) => {
        return date.toLocaleTimeString(language === 'my' ? 'my-MM' : 'en-MM', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12)
            return t('rider.morning');
        if (hour < 17)
            return t('rider.afternoon');
        if (hour < 20)
            return t('rider.evening');
        return t('rider.night');
    };
    const nextTask = getNextTask();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-navy-600", children: t('rider.loading') })] }) }));
    }
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "min-h-screen bg-gradient-to-br from-navy-50 to-gold-50 pb-20", children: [_jsx(motion.div, { variants: staggerItem, className: "bg-white shadow-sm border-b", children: _jsxs("div", { className: "px-4 py-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center", children: _jsx(Truck, { className: "w-6 h-6 text-gold-500" }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-lg font-bold text-navy-900", children: [getGreeting(), ", ", rider?.full_name?.split(' ')[0] || 'Rider'] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [t('rider.zone'), ": ", rider?.zone || 'Downtown-A'] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-muted-foreground", children: [_jsx(Battery, { className: `w-4 h-4 ${batteryLevel > 20 ? 'text-success' : 'text-error'}` }), _jsxs("span", { children: [batteryLevel, "%"] }), _jsx(Signal, { className: "w-4 h-4" })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/rider/notifications'), className: "relative", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full text-xs" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [isOnline ? _jsx(Wifi, { className: "w-4 h-4 text-success" }) : _jsx(WifiOff, { className: "w-4 h-4 text-error" }), _jsx("span", { className: "text-sm font-medium", children: isOnline ? t('rider.online') : t('rider.offline') })] }), _jsx(Button, { onClick: toggleDutyStatus, className: `px-6 py-2 rounded-full text-sm font-bold transition-all ${isOnDuty
                                        ? 'bg-success text-white shadow-lg'
                                        : 'bg-muted text-muted-foreground hover:bg-gold-500 hover:text-white'}`, children: isOnDuty ? t('rider.onDuty') : t('rider.startRoute') })] })] }) }), _jsxs("div", { className: "px-4 py-6 space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-2 gap-4", children: [_jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", onClick: () => navigate('/rider/tasks?filter=pending'), children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(Package, { className: "w-6 h-6 text-warning" }) }), _jsx("div", { className: "text-2xl font-bold text-navy-900", children: stats.pending }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.pending') })] }) }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(CheckCircle2, { className: "w-6 h-6 text-success" }) }), _jsx("div", { className: "text-2xl font-bold text-navy-900", children: stats.completed }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.completed') })] }) }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(AlertTriangle, { className: "w-6 h-6 text-error" }) }), _jsx("div", { className: "text-2xl font-bold text-navy-900", children: stats.failed }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.failed') })] }) }), _jsx(Card, { className: "glass-card cursor-pointer hover:shadow-lg transition-all", onClick: () => navigate('/rider/wallet'), children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-2", children: _jsx(DollarSign, { className: "w-6 h-6 text-gold-500" }) }), _jsx("div", { className: "text-lg font-bold text-navy-900", children: formatCurrency(stats.cod) }), _jsx("div", { className: "text-xs text-muted-foreground", children: t('rider.codBalance') })] }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "glass-card bg-gradient-to-r from-gold-500/10 to-gold-600/10 border-gold-200", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: t('rider.todayEarnings') }), _jsx("p", { className: "text-2xl font-bold text-gold-600", children: formatCurrency(stats.todayEarnings) })] }), _jsx("div", { className: "w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center", children: _jsx(Star, { className: "w-6 h-6 text-gold-500" }) })] }) }) }) }), nextTask && (_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card border-info/20 bg-info/5", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-lg flex items-center space-x-2", children: [_jsx(Navigation, { className: "w-5 h-5 text-info" }), _jsx("span", { children: t('rider.nextTask') })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-medium", children: ["#", nextTask.task_code] }), _jsx(Badge, { className: `${nextTask.priority === 'urgent' ? 'bg-error text-white' :
                                                        nextTask.priority === 'express' ? 'bg-warning text-white' :
                                                            'bg-muted text-muted-foreground'}`, children: t(`rider.${nextTask.priority}`) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Package, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: nextTask.customer_name })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Map, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-sm text-muted-foreground", children: nextTask.delivery_address })] }), nextTask.cod_amount > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(DollarSign, { className: "w-4 h-4 text-gold-500" }), _jsxs("span", { className: "text-sm font-medium text-gold-600", children: [t('rider.cod'), ": ", formatCurrency(nextTask.cod_amount)] })] })), nextTask.sla_time && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "w-4 h-4 text-warning" }), _jsxs("span", { className: "text-sm text-warning", children: [t('rider.time'), ": ", new Date(nextTask.sla_time).toLocaleTimeString(language === 'my' ? 'my-MM' : 'en-MM', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })] })] }))] }), _jsxs("div", { className: "flex space-x-2 pt-2", children: [_jsxs(Button, { onClick: () => navigate(`/rider/job/${nextTask.id}`), className: "flex-1 bg-info hover:bg-info/90", children: [_jsx(Package, { className: "w-4 h-4 mr-2" }), t('rider.start')] }), _jsx(Button, { variant: "outline", onClick: () => window.open(`tel:${nextTask.customer_phone}`), className: "px-4", children: _jsx(Phone, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", onClick: () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextTask.delivery_address)}`), className: "px-4", children: _jsx(Navigation, { className: "w-4 h-4" }) })] })] })] }) })), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: t('rider.quickActions') }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { variant: "outline", onClick: () => navigate('/rider/tasks'), className: "h-16 flex-col space-y-2", children: [_jsx(Package, { className: "w-6 h-6" }), _jsx("span", { className: "text-sm", children: t('rider.tasks') })] }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/rider/map'), className: "h-16 flex-col space-y-2", children: [_jsx(Map, { className: "w-6 h-6" }), _jsx("span", { className: "text-sm", children: t('rider.map') })] }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/rider/wallet'), className: "h-16 flex-col space-y-2", children: [_jsx(DollarSign, { className: "w-6 h-6" }), _jsx("span", { className: "text-sm", children: t('rider.wallet') })] }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/rider/profile'), className: "h-16 flex-col space-y-2", children: [_jsx(Truck, { className: "w-6 h-6" }), _jsx("span", { className: "text-sm", children: t('rider.profile') })] })] }) })] }) }), rider && (_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center space-x-2", children: [_jsx(Star, { className: "w-5 h-5 text-gold-500" }), _jsx("span", { children: t('rider.performance') })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-navy-900", children: rider.rating.toFixed(1) }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.rating') })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-navy-900", children: rider.total_deliveries }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.totalJobs') })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-success", children: [rider.total_deliveries > 0 ? Math.round((rider.successful_deliveries / rider.total_deliveries) * 100) : 0, "%"] }), _jsx("div", { className: "text-sm text-muted-foreground", children: t('rider.successRate') })] })] }) })] }) }))] })] }));
};
export default RiderDashboard;
