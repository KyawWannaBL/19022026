import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useFirebaseAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Truck, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, MapPin, BarChart3, Settings, Bell, Plus, Eye, ArrowUpRight, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
export default function EnhancedDashboard() {
    const { user } = useAuth();
    const { t, language } = useLanguageContext();
    const [stats, setStats] = useState({
        totalShipments: 0,
        pendingShipments: 0,
        deliveredShipments: 0,
        inTransitShipments: 0,
        totalRevenue: 0,
        activeRiders: 0,
        activeMerchants: 0,
        overdueShipments: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadDashboardData();
    }, [user]);
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            // Load shipment statistics
            const { data: shipments, error: shipmentsError } = await supabase
                .from('shipments')
                .select('status, total_amount, created_at');
            if (shipmentsError)
                throw shipmentsError;
            // Load user statistics
            const { data: users, error: usersError } = await supabase
                .from('users')
                .select('role, status');
            if (usersError)
                throw usersError;
            // Load merchant statistics
            const { data: merchants, error: merchantsError } = await supabase
                .from('merchants')
                .select('is_active, current_balance');
            if (merchantsError)
                throw merchantsError;
            // Calculate statistics
            const totalShipments = shipments?.length || 0;
            const pendingShipments = shipments?.filter(s => s.status === 'pending').length || 0;
            const deliveredShipments = shipments?.filter(s => s.status === 'delivered').length || 0;
            const inTransitShipments = shipments?.filter(s => ['picked_up', 'in_transit', 'out_for_delivery'].includes(s.status)).length || 0;
            const totalRevenue = shipments?.reduce((sum, s) => sum + (s.total_amount || 0), 0) || 0;
            const activeRiders = users?.filter(u => u.role === 'rider' && u.status === 'active').length || 0;
            const activeMerchants = merchants?.filter(m => m.is_active).length || 0;
            const overdueShipments = 0; // Calculate based on delivery dates
            setStats({
                totalShipments,
                pendingShipments,
                deliveredShipments,
                inTransitShipments,
                totalRevenue,
                activeRiders,
                activeMerchants,
                overdueShipments
            });
            // Generate recent activity (mock data for now)
            setRecentActivity([
                {
                    id: '1',
                    type: 'shipment_created',
                    title: 'New shipment created',
                    description: 'Way ID: BE001234 from Golden Shop',
                    timestamp: '2 minutes ago',
                    status: 'info'
                },
                {
                    id: '2',
                    type: 'shipment_delivered',
                    title: 'Shipment delivered',
                    description: 'Way ID: BE001230 delivered successfully',
                    timestamp: '15 minutes ago',
                    status: 'success'
                },
                {
                    id: '3',
                    type: 'merchant_registered',
                    title: 'New merchant registered',
                    description: 'Tech Store Myanmar joined the platform',
                    timestamp: '1 hour ago',
                    status: 'info'
                }
            ]);
        }
        catch (error) {
            console.error('Error loading dashboard data:', error);
            toast({
                title: "Error Loading Dashboard",
                description: error.message || "Failed to load dashboard data",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return language === 'en' ? 'Good Morning' : 'မင်္ဂလာပါ';
        }
        else if (hour < 18) {
            return language === 'en' ? 'Good Afternoon' : 'နေ့လည်ပိုင်း မင်္ဂလာပါ';
        }
        else {
            return language === 'en' ? 'Good Evening' : 'ညနေပိုင်း မင်္ဂလာပါ';
        }
    };
    const getActivityIcon = (type) => {
        switch (type) {
            case 'shipment_created':
                return _jsx(Plus, { className: "w-4 h-4" });
            case 'shipment_delivered':
                return _jsx(CheckCircle, { className: "w-4 h-4" });
            case 'merchant_registered':
                return _jsx(Users, { className: "w-4 h-4" });
            case 'rider_assigned':
                return _jsx(Truck, { className: "w-4 h-4" });
            default:
                return _jsx(Activity, { className: "w-4 h-4" });
        }
    };
    const getActivityColor = (status) => {
        switch (status) {
            case 'success':
                return 'text-green-600 bg-green-100';
            case 'warning':
                return 'text-yellow-600 bg-yellow-100';
            case 'info':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };
    if (loading) {
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-1/3 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [...Array(4)].map((_, i) => (_jsx("div", { className: "h-32 bg-gray-200 rounded" }, i))) })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "flex flex-col md:flex-row md:items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight", children: [getGreeting(), ", ", user?.full_name, "!"] }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? `Welcome to your ${user?.role.replace('_', ' ')} dashboard`
                                    : `သင့်${user?.role} ဒက်ရှ်ဘုတ်သို့ ကြိုဆိုပါသည်` })] }), _jsxs("div", { className: "flex items-center gap-2 mt-4 md:mt-0", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Bell, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Notifications' : 'အကြောင်းကြားချက်များ'] }), _jsxs(Button, { size: "sm", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Quick Action' : 'လျင်မြန်သော လုပ်ဆောင်ချက်'] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: language === 'en' ? 'Total Shipments' : 'စုစုပေါင်း ပို့ဆောင်မှုများ' }), _jsx(Package, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.totalShipments.toLocaleString() }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [_jsx(TrendingUp, { className: "inline w-3 h-3 mr-1 text-green-600" }), "+12% from last month"] })] })] }), _jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: language === 'en' ? 'In Transit' : 'သယ်ယူနေဆဲ' }), _jsx(Truck, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.inTransitShipments.toLocaleString() }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [_jsx(Activity, { className: "inline w-3 h-3 mr-1 text-blue-600" }), "Active deliveries"] })] })] }), _jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: language === 'en' ? 'Revenue' : 'ဝင်ငွေ' }), _jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: [stats.totalRevenue.toLocaleString(), " MMK"] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [_jsx(TrendingUp, { className: "inline w-3 h-3 mr-1 text-green-600" }), "+8% from last month"] })] })] }), _jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: language === 'en' ? 'Active Riders' : 'လက်ရှိ ပို့ဆောင်သူများ' }), _jsx(Users, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: stats.activeRiders }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [_jsx(CheckCircle, { className: "inline w-3 h-3 mr-1 text-green-600" }), "All online"] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "lg:col-span-2", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-5 h-5" }), language === 'en' ? 'Recent Activity' : 'လတ်တလော လုပ်ဆောင်ချက်များ'] }), _jsx(CardDescription, { children: language === 'en' ? 'Latest updates from your system' : 'သင့်စနစ်မှ နောက်ဆုံး အပ်ဒိတ်များ' })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: recentActivity.map((activity) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors", children: [_jsx("div", { className: `p-2 rounded-full ${getActivityColor(activity.status)}`, children: getActivityIcon(activity.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-sm", children: activity.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: activity.description }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activity.timestamp })] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Eye, { className: "w-4 h-4" }) })] }, activity.id))) }) })] }) }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.3 }, className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: language === 'en' ? 'Quick Actions' : 'လျင်မြန်သော လုပ်ဆောင်ချက်များ' }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Create Shipment' : 'ပို့ဆောင်မှု ဖန်တီးရန်'] }), _jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Track Package' : 'ပါဆယ် ခြေရာခံရန်'] }), _jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'View Reports' : 'အစီရင်ခံစာများ ကြည့်ရန်'] }), _jsxs(Button, { className: "w-full justify-start", variant: "outline", children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'System Settings' : 'စနစ် ဆက်တင်များ'] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: language === 'en' ? 'System Status' : 'စနစ် အခြေအနေ' }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: language === 'en' ? 'Database' : 'ဒေတာဘေ့စ်' }), _jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [_jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), language === 'en' ? 'Online' : 'အွန်လိုင်း'] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: language === 'en' ? 'Payment Gateway' : 'ငွေပေးချေမှု စနစ်' }), _jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [_jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), language === 'en' ? 'Active' : 'လုပ်ဆောင်နေဆဲ'] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: language === 'en' ? 'SMS Service' : 'SMS ဝန်ဆောင်မှု' }), _jsxs(Badge, { variant: "outline", className: "text-yellow-600 border-yellow-600", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), language === 'en' ? 'Maintenance' : 'ပြုပြင်နေဆဲ'] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: language === 'en' ? 'Tracking API' : 'ခြေရာခံ API' }), _jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [_jsx(CheckCircle, { className: "w-3 h-3 mr-1" }), language === 'en' ? 'Operational' : 'လုပ်ဆောင်နေဆဲ'] })] })] })] }), stats.overdueShipments > 0 && (_jsxs(Card, { className: "border-orange-200 bg-orange-50", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg text-orange-800 flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-5 h-5" }), language === 'en' ? 'Attention Required' : 'အာရုံစိုက်ရန် လိုအပ်သည်'] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-orange-700", children: language === 'en'
                                                    ? `${stats.overdueShipments} shipments are overdue for delivery`
                                                    : `ပို့ဆောင်မှု ${stats.overdueShipments} ခု သတ်မှတ်ချိန်ကျော်လွန်နေပါသည်` }), _jsxs(Button, { size: "sm", className: "mt-2", variant: "outline", children: [_jsx(ArrowUpRight, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'View Details' : 'အသေးစိတ် ကြည့်ရန်'] })] })] }))] })] })] }));
}
