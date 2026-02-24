import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Package, Users, Clock, DollarSign, Activity, Target, Award, Calendar, Download, RefreshCw, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { staggerContainer, staggerItem } from '@/lib/motion';
// Advanced analytics data
const ANALYTICS_DATA = {
    overview: {
        totalOrders: 12847,
        totalRevenue: 2847500000,
        activeRiders: 156,
        deliveryRate: 98.7,
        avgDeliveryTime: 28,
        customerSatisfaction: 4.8
    },
    trends: {
        orders: [
            { name: 'Mon', orders: 1200, revenue: 2400000, deliveries: 1180 },
            { name: 'Tue', orders: 1350, revenue: 2700000, deliveries: 1320 },
            { name: 'Wed', orders: 1100, revenue: 2200000, deliveries: 1080 },
            { name: 'Thu', orders: 1450, revenue: 2900000, deliveries: 1420 },
            { name: 'Fri', orders: 1600, revenue: 3200000, deliveries: 1580 },
            { name: 'Sat', orders: 1800, revenue: 3600000, deliveries: 1750 },
            { name: 'Sun', orders: 1400, revenue: 2800000, deliveries: 1380 }
        ]
    },
    statusDistribution: [
        { name: 'Delivered', value: 8547, color: '#10b981' },
        { name: 'In Transit', value: 2156, color: '#3b82f6' },
        { name: 'Pending', value: 1842, color: '#f59e0b' },
        { name: 'Failed', value: 302, color: '#ef4444' }
    ],
    topPerformers: [
        { name: 'Ko Aung Myat', deliveries: 245, rating: 4.9, earnings: 1250000 },
        { name: 'Ma Thida Oo', deliveries: 189, rating: 4.8, earnings: 980000 },
        { name: 'Ko Zaw Win', deliveries: 156, rating: 4.7, earnings: 780000 },
        { name: 'Ma Khin Myo', deliveries: 134, rating: 4.6, earnings: 670000 }
    ],
    realtimeMetrics: {
        ordersToday: 1247,
        activeDeliveries: 89,
        avgResponseTime: '2.3s',
        systemUptime: '99.9%'
    }
};
const AdvancedDashboardPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
    const [isLive, setIsLive] = useState(true);
    const [metrics, setMetrics] = useState(ANALYTICS_DATA);
    // Simulate real-time updates
    useEffect(() => {
        if (!isLive)
            return;
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                realtimeMetrics: {
                    ...prev.realtimeMetrics,
                    ordersToday: prev.realtimeMetrics.ordersToday + Math.floor(Math.random() * 3),
                    activeDeliveries: Math.max(50, prev.realtimeMetrics.activeDeliveries + Math.floor(Math.random() * 6) - 3)
                }
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, [isLive]);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MMK',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount).replace('MMK', 'MMK ');
    };
    const MetricCard = ({ title, value, change, icon: Icon, trend, color = "navy" }) => (_jsx(Card, { className: "delivery-card hover-lift border-none shadow-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: title }), _jsx("p", { className: "text-3xl font-bold text-navy-900", children: typeof value === 'number' && value > 1000 ? value.toLocaleString() : value }), change && (_jsxs("div", { className: `flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}`, children: [trend === 'up' ? (_jsx(TrendingUp, { className: "h-4 w-4" })) : trend === 'down' ? (_jsx(TrendingDown, { className: "h-4 w-4" })) : null, _jsx("span", { className: "font-medium", children: change })] }))] }), _jsx("div", { className: `p-4 rounded-2xl ${color === 'gold' ? 'bg-gold-500/10' :
                            color === 'success' ? 'bg-success/10' :
                                color === 'warning' ? 'bg-warning/10' :
                                    color === 'error' ? 'bg-error/10' :
                                        'bg-navy-500/10'}`, children: _jsx(Icon, { className: `h-8 w-8 ${color === 'gold' ? 'text-gold-500' :
                                color === 'success' ? 'text-success' :
                                    color === 'warning' ? 'text-warning' :
                                        color === 'error' ? 'text-error' :
                                            'text-navy-500'}` }) })] }) }) }));
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 via-white to-gold-50/20", children: [_jsx(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "mobile-padding py-8 border-b border-navy-100", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6", children: [_jsxs(motion.div, { variants: staggerItem, children: [_jsx("h1", { className: "text-4xl font-bold font-display text-gradient-navy", children: "Delivery Analytics" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Real-time insights and performance metrics" })] }), _jsxs(motion.div, { variants: staggerItem, className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full animate-pulse" }), _jsx("span", { className: "text-sm font-medium text-success", children: "Live Data" })] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), "Last 7 days"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export"] }), _jsxs(Button, { size: "sm", className: "btn-premium", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Refresh"] })] })] }) }), _jsxs("div", { className: "mobile-padding py-8 space-y-8", children: [_jsxs(motion.div, { variants: staggerContainer, className: "dashboard-grid", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Total Orders", value: metrics.overview.totalOrders, change: "+12.5%", trend: "up", icon: Package, color: "navy" }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Revenue", value: formatCurrency(metrics.overview.totalRevenue), change: "+8.2%", trend: "up", icon: DollarSign, color: "gold" }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Active Riders", value: metrics.overview.activeRiders, change: "+5.1%", trend: "up", icon: Users, color: "success" }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Delivery Rate", value: `${metrics.overview.deliveryRate}%`, change: "+0.3%", trend: "up", icon: Target, color: "success" }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Avg Delivery Time", value: `${metrics.overview.avgDeliveryTime}min`, change: "-2.1min", trend: "up", icon: Clock, color: "warning" }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(MetricCard, { title: "Customer Rating", value: metrics.overview.customerSatisfaction, change: "+0.1", trend: "up", icon: Award, color: "gold" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl font-bold", children: "Orders & Revenue Trend" }), _jsx(Badge, { variant: "outline", className: "bg-success/10 text-success border-success/20", children: "+15.2% vs last week" })] }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: metrics.trends.orders, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "ordersGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })] }), _jsxs("linearGradient", { id: "revenueGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#f59e0b", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#f59e0b", stopOpacity: 0 })] })] }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }), _jsx(XAxis, { dataKey: "name", stroke: "#64748b" }), _jsx(YAxis, { stroke: "#64748b" }), _jsx(Tooltip, { contentStyle: {
                                                                backgroundColor: 'white',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '12px',
                                                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                                            } }), _jsx(Area, { type: "monotone", dataKey: "orders", stroke: "#3b82f6", strokeWidth: 3, fillOpacity: 1, fill: "url(#ordersGradient)" })] }) }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: "Delivery Status Distribution" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(RechartsPieChart, { children: [_jsx(Pie, { data: metrics.statusDistribution, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 120, paddingAngle: 5, dataKey: "value", children: metrics.statusDistribution.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                                                                backgroundColor: 'white',
                                                                border: '1px solid #e2e8f0',
                                                                borderRadius: '12px',
                                                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                                            } }), _jsx(Legend, {})] }) }) })] }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "lotus-card text-white", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-white", children: "Real-time Operations" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "h-5 w-5 text-gold-400" }), _jsx("span", { className: "text-gold-200 text-sm", children: "Live Updates" })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: metrics.realtimeMetrics.ordersToday }), _jsx("div", { className: "text-gold-200 text-sm", children: "Orders Today" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: metrics.realtimeMetrics.activeDeliveries }), _jsx("div", { className: "text-gold-200 text-sm", children: "Active Deliveries" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: metrics.realtimeMetrics.avgResponseTime }), _jsx("div", { className: "text-gold-200 text-sm", children: "Avg Response" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-gold-400 mb-2", children: metrics.realtimeMetrics.systemUptime }), _jsx("div", { className: "text-gold-200 text-sm", children: "System Uptime" })] })] }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl font-bold", children: "Top Performing Riders" }), _jsx(Button, { variant: "outline", size: "sm", children: "View All" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: metrics.topPerformers.map((rider, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-navy-50 rounded-xl hover-lift", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-400 rounded-full flex items-center justify-center text-navy-900 font-bold", children: ["#", index + 1] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-navy-900", children: rider.name }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-muted-foreground", children: [_jsxs("span", { children: [rider.deliveries, " deliveries"] }), _jsxs("span", { children: ["\u2605 ", rider.rating] })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-bold text-navy-900", children: formatCurrency(rider.earnings) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "This month" })] })] }, index))) }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: "Performance Insights" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Peak Hours" }), _jsx(Badge, { className: "bg-success/10 text-success", children: "12PM - 2PM" })] }), _jsx(Progress, { value: 85, className: "h-2" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "85% of daily orders" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Popular Areas" }), _jsx(Badge, { className: "bg-info/10 text-info", children: "Downtown" })] }), _jsx(Progress, { value: 72, className: "h-2" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "72% delivery concentration" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Customer Retention" }), _jsx(Badge, { className: "bg-gold-500/10 text-gold-600", children: "94.2%" })] }), _jsx(Progress, { value: 94, className: "h-2" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Monthly retention rate" })] })] }) })] }) })] }), _jsx(Button, { className: "fab", children: _jsx(Bell, { className: "h-6 w-6" }) })] }));
};
export default AdvancedDashboardPage;
