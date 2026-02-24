import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Truck, DollarSign, Calendar, Filter, Download, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
const REVENUE_DATA = [
    { name: 'Jan', revenue: 4500, volume: 120 },
    { name: 'Feb', revenue: 5200, volume: 145 },
    { name: 'Mar', revenue: 4800, volume: 132 },
    { name: 'Apr', revenue: 6100, volume: 180 },
    { name: 'May', revenue: 5900, volume: 175 },
    { name: 'Jun', revenue: 7200, volume: 210 },
    { name: 'Jul', revenue: 8400, volume: 250 },
];
const STATUS_DATA = [
    { name: 'Delivered', value: 65, color: 'oklch(0.62 0.18 150)' },
    { name: 'In Transit', value: 20, color: 'oklch(0.65 0.2 50)' },
    { name: 'Pending', value: 10, color: 'oklch(0.55 0.15 25)' },
    { name: 'Exception', value: 5, color: 'oklch(0.6 0.25 25)' },
];
const MerchantAnalytics = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [metrics, setMetrics] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7d');
    useEffect(() => {
        const fetchMetrics = async () => {
            setIsLoading(true);
            try {
                const response = await logisticsAPI.getDashboardMetrics(user?.id);
                if (response.success) {
                    setMetrics(response.metrics);
                }
            }
            catch (error) {
                console.error('Failed to fetch analytics:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchMetrics();
    }, [user?.id, timeRange]);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Business Analytics" }), _jsx("p", { className: "text-muted-foreground", children: "Comprehensive performance insights for 2026 operations" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [_jsxs(SelectTrigger, { className: "w-[160px] luxury-glass", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4 text-primary" }), _jsx(SelectValue, { placeholder: "Select Range" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "24h", children: "Last 24 Hours" }), _jsx(SelectItem, { value: "7d", children: "Last 7 Days" }), _jsx(SelectItem, { value: "30d", children: "Last 30 Days" }), _jsx(SelectItem, { value: "90d", children: "Last Quarter" })] })] }), _jsxs(Button, { variant: "outline", className: "luxury-glass border-primary/20 hover:border-primary/50", children: [_jsx(Download, { className: "mr-2 h-4 w-4 text-primary" }), "Export Report"] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                    {
                        label: 'Total Shipments',
                        value: metrics?.total_shipments || 0,
                        change: '+12.5%',
                        trend: 'up',
                        icon: Package,
                        color: 'text-primary'
                    },
                    {
                        label: 'Total Revenue',
                        value: formatCurrency(metrics?.total_revenue || 0),
                        change: '+8.2%',
                        trend: 'up',
                        icon: DollarSign,
                        color: 'text-chart-5'
                    },
                    {
                        label: 'Delivery Rate',
                        value: `${metrics?.delivery_rate || 0}%`,
                        change: '+2.4%',
                        trend: 'up',
                        icon: Activity,
                        color: 'text-chart-4'
                    },
                    {
                        label: 'COD Collected',
                        value: formatCurrency(metrics?.cod_collected || 0),
                        change: '-1.5%',
                        trend: 'down',
                        icon: Truck,
                        color: 'text-chart-2'
                    }
                ].map((item, index) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card overflow-hidden group hover:scale-[1.02] transition-transform duration-300", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: `p-3 rounded-2xl bg-primary/10 ${item.color}`, children: _jsx(item.icon, { size: 24 }) }), _jsxs("div", { className: `flex items-center gap-1 text-sm font-medium ${item.trend === 'up' ? 'text-chart-5' : 'text-destructive'}`, children: [item.change, item.trend === 'up' ? _jsx(ArrowUpRight, { size: 14 }) : _jsx(ArrowDownRight, { size: 14 })] })] }), _jsxs("div", { className: "mt-4 space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase tracking-wider", children: item.label }), isLoading ? (_jsx(Skeleton, { className: "h-8 w-24" })) : (_jsx("h3", { className: "text-2xl font-bold", children: item.value }))] })] }) }) }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx(motion.div, { variants: fadeInUp, initial: "initial", animate: "animate", className: "lg:col-span-2", children: _jsxs(Card, { className: "luxury-card h-full", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-8", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: "Revenue & Volume Trends" }), _jsx(CardDescription, { children: "Monthly growth performance for the current fiscal year" })] }), _jsx(TrendingUp, { className: "text-primary h-5 w-5" })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[400px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: REVENUE_DATA, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorRevenue", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--color-luxury-gold)", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "var(--color-luxury-gold)", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)", vertical: false }), _jsx(XAxis, { dataKey: "name", stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#888888", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `$${value}` }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'rgba(11, 12, 16, 0.95)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px' }, itemStyle: { color: '#D4AF37' } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "var(--color-luxury-gold)", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorRevenue)" }), _jsx(Area, { type: "monotone", dataKey: "volume", stroke: "#6366f1", strokeWidth: 2, strokeDasharray: "5 5", fill: "transparent" })] }) }) }) })] }) }), _jsxs(motion.div, { variants: fadeInUp, initial: "initial", animate: "animate", className: "space-y-8", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-xl", children: "Shipment Status" }), _jsx(CardDescription, { children: "Distribution of active shipments" })] }), _jsx(CardContent, { className: "flex flex-col items-center", children: _jsx("div", { className: "h-[250px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: STATUS_DATA, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: STATUS_DATA.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'rgba(11, 12, 16, 0.95)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px' } }), _jsx(Legend, { verticalAlign: "bottom", height: 36 })] }) }) }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl", children: "Operational Insights" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Package, { className: "text-primary", size: 20 }), _jsx("span", { className: "text-sm font-medium", children: "Peak Shipping Hour" })] }), _jsx("span", { className: "text-sm font-bold", children: "14:00 - 16:00" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Truck, { className: "text-primary", size: 20 }), _jsx("span", { className: "text-sm font-medium", children: "Avg. Delivery Time" })] }), _jsx("span", { className: "text-sm font-bold", children: "1.2 Days" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Filter, { className: "text-primary", size: 20 }), _jsx("span", { className: "text-sm font-medium", children: "Regional Focus" })] }), _jsx("span", { className: "text-sm font-bold", children: "Yangon Central" })] })] })] })] })] }), _jsxs(motion.div, { variants: fadeInUp, initial: "initial", animate: "animate", className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Top Customers" }), _jsx(CardDescription, { children: "Most frequent receivers by volume" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: [1, 2, 3].map((_, i) => (_jsxs("div", { className: "flex items-center justify-between group", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary border border-primary/20", children: i + 1 }), _jsxs("div", { children: [_jsxs("p", { className: "font-semibold", children: ["Client Alpha ", i + 1] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Yangon, Myanmar" })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "font-bold", children: [150 - (i * 30), " Units"] }), _jsx("p", { className: "text-xs text-chart-5", children: "+15% monthly" })] })] }, i))) }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Regional Performance" }), _jsx(CardDescription, { children: "Volume distribution across states" })] }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: [
                                            { region: 'Yangon', value: 850 },
                                            { region: 'Mandalay', value: 420 },
                                            { region: 'Naypyidaw', value: 290 },
                                            { region: 'Bago', value: 180 },
                                            { region: 'Shan', value: 150 },
                                        ], children: [_jsx(XAxis, { dataKey: "region", stroke: "#888888", fontSize: 12, axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'rgba(11, 12, 16, 0.95)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px' } }), _jsx(Bar, { dataKey: "value", fill: "var(--color-luxury-gold)", radius: [4, 4, 0, 0], barSize: 40 })] }) }) })] })] })] }));
};
export default MerchantAnalytics;
