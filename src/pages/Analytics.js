import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Truck, AlertCircle, Download, Filter, ArrowUpRight, ArrowDownRight, BarChart3, PieChart as PieChartIcon, Target, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend, } from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/assets/images';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const REVENUE_FORECAST_DATA = [
    { name: 'Jan', revenue: 42000, forecast: 40000 },
    { name: 'Feb', revenue: 45000, forecast: 44000 },
    { name: 'Mar', revenue: 48000, forecast: 49000 },
    { name: 'Apr', revenue: 52000, forecast: 53000 },
    { name: 'May', revenue: 51000, forecast: 56000 },
    { name: 'Jun', revenue: 59000, forecast: 61000 },
    { name: 'Jul', revenue: 64000, forecast: 65000 },
    { name: 'Aug', revenue: 68000, forecast: 70000 },
    { name: 'Sep', revenue: 72000, forecast: 74000 },
    { name: 'Oct', revenue: 75000, forecast: 78000 },
    { name: 'Nov', revenue: 82000, forecast: 85000 },
    { name: 'Dec', revenue: 95000, forecast: 98000 },
];
const BRANCH_PERFORMANCE = [
    { id: 'BR-001', name: 'Downtown Hub', volume: 12450, efficiency: 98.4, growth: 12.5 },
    { id: 'BR-002', name: 'Westside Logistics', volume: 9820, efficiency: 96.2, growth: -2.1 },
    { id: 'BR-003', name: 'Airport Cargo Terminal', volume: 15600, efficiency: 99.1, growth: 18.4 },
    { id: 'BR-004', name: 'East Harbor Port', volume: 11200, efficiency: 94.8, growth: 5.2 },
    { id: 'BR-005', name: 'North Industrial Park', volume: 8400, efficiency: 97.5, growth: 8.9 },
];
const STATUS_DISTRIBUTION = [
    { name: 'Delivered', value: 4500, color: 'oklch(0.62 0.18 150)' },
    { name: 'In Transit', value: 2100, color: 'oklch(0.65 0.2 50)' },
    { name: 'Pending', value: 800, color: 'oklch(0.55 0.15 25)' },
    { name: 'Exception', value: 200, color: 'oklch(0.6 0.25 25)' },
];
const HOURLY_VOLUME = [
    { hour: '08:00', count: 120 },
    { hour: '10:00', count: 240 },
    { hour: '12:00', count: 310 },
    { hour: '14:00', count: 280 },
    { hour: '16:00', count: 450 },
    { hour: '18:00', count: 390 },
    { hour: '20:00', count: 180 },
];
function MetricsCard({ title, value, icon: Icon, trend, description }) {
    return (_jsxs(Card, { className: "luxury-card overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("div", { className: "rounded-full bg-primary/10 p-2", children: _jsx(Icon, { className: "h-4 w-4 text-primary" }) })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono", children: value }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [trend && (_jsxs("span", { className: `flex items-center text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-destructive'}`, children: [trend.isPositive ? _jsx(ArrowUpRight, { className: "h-3 w-3 mr-1" }) : _jsx(ArrowDownRight, { className: "h-3 w-3 mr-1" }), trend.value, "%"] })), _jsx("p", { className: "text-xs text-muted-foreground", children: description || 'vs last month' })] })] })] }));
}
export default function Analytics() {
    const { language } = useLanguage();
    const [timeRange, setTimeRange] = useState('12M');
    const t = useMemo(() => ({
        en: {
            title: 'Operational Intelligence',
            subtitle: 'Comprehensive performance analytics and revenue forecasting for 2026.',
            revenue: 'Total Revenue',
            onTime: 'On-Time Delivery',
            volume: 'Operational Volume',
            exceptions: 'Delivery Exceptions',
            revenueTrend: 'Revenue Trends & Forecasting',
            revenueDesc: 'Actual vs Predicted revenue growth (USD)',
            distribution: 'Volume Distribution',
            peakHours: 'Peak Operating Hours',
            peakDesc: 'Shipment processing volume per hour',
            branchMatrix: 'Branch Efficiency Matrix',
            branchDesc: 'Comparative operational performance across major hubs',
            export: 'Export Report',
            filter: 'Filter',
        },
        my: {
            title: 'လုပ်ငန်းလည်ပတ်မှု အချက်အလက်များ',
            subtitle: '၂၀၂၆ ခုနှစ်အတွက် စွမ်းဆောင်ရည်ပိုင်းခြားစိတ်ဖြာချက်နှင့် ဝင်ငွေခန့်မှန်းချက်များ။',
            revenue: 'စုစုပေါင်းဝင်ငွေ',
            onTime: 'အချိန်မှန်ပို့ဆောင်မှု',
            volume: 'လုပ်ငန်းပမာဏ',
            exceptions: 'ပို့ဆောင်မှုပြဿနာများ',
            revenueTrend: 'ဝင်ငွေလမ်းကြောင်းနှင့် ခန့်မှန်းချက်',
            revenueDesc: 'အမှန်တကယ်နှင့် ခန့်မှန်းထားသော ဝင်ငွေတိုးတက်မှု (USD)',
            distribution: 'ပမာဏခွဲဝေမှု',
            peakHours: 'အလုပ်အများဆုံးအချိန်များ',
            peakDesc: 'တစ်နာရီလျှင် ပါဆယ်လ်ကိုင်တွယ်မှုပမာဏ',
            branchMatrix: 'ဌာနခွဲများ၏ စွမ်းဆောင်ရည်',
            branchDesc: 'အဓိကအချက်အချာဌာနများ၏ စွမ်းဆောင်ရည်နှိုင်းယှဉ်ချက်',
            export: 'အစီရင်ခံစာထုတ်ယူရန်',
            filter: 'စစ်ထုတ်ရန်',
        }
    }[language]), [language]);
    return (_jsxs("div", { className: "flex flex-col gap-6 p-6 pb-24", children: [_jsxs("div", { className: "flex flex-col justify-between gap-4 md:flex-row md:items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-heading text-3xl font-bold tracking-tight text-foreground", children: t.title }), _jsx("p", { className: "text-muted-foreground", children: t.subtitle })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("div", { className: "flex overflow-hidden rounded-lg border border-border bg-card shadow-sm", children: ['1M', '3M', '6M', '12M'].map((range) => (_jsx("button", { onClick: () => setTimeRange(range), className: `px-4 py-2 text-xs font-bold transition-all ${timeRange === range
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-muted'}`, children: range }, range))) }), _jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [_jsx(Filter, { className: "h-4 w-4" }), t.filter] }), _jsxs(Button, { size: "sm", className: "luxury-button h-9 px-4 py-0 text-[9px] gap-2", children: [_jsx(Download, { className: "h-4 w-4" }), t.export] })] })] }), _jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [_jsx(MetricsCard, { title: t.revenue, value: formatCurrency(845230, 'USD'), icon: DollarSign, trend: { value: 12.5, isPositive: true } }), _jsx(MetricsCard, { title: t.onTime, value: "98.4%", icon: Target, trend: { value: 0.8, isPositive: true } }), _jsx(MetricsCard, { title: t.volume, value: "145,200", icon: Truck, trend: { value: 4.2, isPositive: true } }), _jsx(MetricsCard, { title: t.exceptions, value: "42", icon: AlertCircle, trend: { value: 15.4, isPositive: false } })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "col-span-1 lg:col-span-2", children: _jsxs(Card, { className: "luxury-card h-full", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: t.revenueTrend }), _jsx(CardDescription, { children: t.revenueDesc })] }), _jsx(TrendingUp, { className: "h-5 w-5 text-primary" })] }), _jsx(CardContent, { className: "h-[400px] w-full pt-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: REVENUE_FORECAST_DATA, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "colorRevenue", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--primary)", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "var(--primary)", stopOpacity: 0 })] }), _jsxs("linearGradient", { id: "colorForecast", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--chart-2)", stopOpacity: 0.1 }), _jsx("stop", { offset: "95%", stopColor: "var(--chart-2)", stopOpacity: 0 })] })] }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `$${value / 1000}k` }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }, itemStyle: { fontSize: '12px', fontWeight: 'bold' } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "var(--primary)", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorRevenue)" }), _jsx(Area, { type: "monotone", dataKey: "forecast", stroke: "var(--chart-2)", strokeWidth: 2, strokeDasharray: "5 5", fillOpacity: 1, fill: "url(#colorForecast)" })] }) }) })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, children: _jsxs(Card, { className: "luxury-card h-full flex flex-col", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: t.distribution }), _jsx(PieChartIcon, { className: "h-5 w-5 text-muted-foreground" })] }), _jsxs(CardContent, { className: "flex-1", children: [_jsx("div", { className: "h-[300px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: STATUS_DISTRIBUTION, cx: "50%", cy: "50%", innerRadius: 70, outerRadius: 100, paddingAngle: 8, dataKey: "value", children: STATUS_DISTRIBUTION.map((entry, index) => (_jsx(Cell, { fill: entry.color, stroke: "none" }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' } }), _jsx(Legend, { verticalAlign: "bottom", height: 36, iconType: "circle", wrapperStyle: { fontSize: '11px', paddingTop: '20px' } })] }) }) }), _jsxs("div", { className: "mt-6 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Top Sector: Standard" }), _jsx("span", { className: "font-bold", children: "85% Efficiency" })] }), _jsx("div", { className: "h-1.5 w-full rounded-full bg-muted overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: '85%' }, transition: { duration: 1.5, ease: "easeOut" }, className: "h-full bg-primary shadow-[0_0_10px_rgba(212,175,55,0.4)]" }) })] })] })] }) })] }), _jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, children: _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: t.peakHours }), _jsx(CardDescription, { children: t.peakDesc })] }), _jsx(BarChart3, { className: "h-5 w-5 text-muted-foreground" })] }), _jsx(CardContent, { className: "h-[300px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: HOURLY_VOLUME, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "hour", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false }), _jsx(Tooltip, { cursor: { fill: 'var(--muted)', opacity: 0.2 }, contentStyle: { backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' } }), _jsx(Bar, { dataKey: "count", fill: "var(--primary)", radius: [6, 6, 0, 0], barSize: 40 })] }) }) })] }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, children: _jsxs(Card, { className: "luxury-card overflow-hidden h-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: t.branchMatrix }), _jsx(CardDescription, { children: t.branchDesc })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-sm", children: [_jsx("thead", { className: "bg-muted/50 text-muted-foreground", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 font-bold uppercase tracking-wider text-[10px]", children: "Branch Name" }), _jsx("th", { className: "px-6 py-4 font-bold uppercase tracking-wider text-[10px]", children: "Volume" }), _jsx("th", { className: "px-6 py-4 font-bold uppercase tracking-wider text-[10px]", children: "Efficiency" }), _jsx("th", { className: "px-6 py-4 font-bold uppercase tracking-wider text-[10px]", children: "Growth" })] }) }), _jsx("tbody", { className: "divide-y divide-border", children: BRANCH_PERFORMANCE.map((branch) => (_jsxs("tr", { className: "hover:bg-muted/30 transition-colors group", children: [_jsx("td", { className: "px-6 py-4 font-semibold text-foreground", children: branch.name }), _jsx("td", { className: "px-6 py-4 font-mono", children: branch.volume.toLocaleString() }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-1.5 w-16 rounded-full bg-muted overflow-hidden", children: _jsx("div", { className: "h-full bg-primary", style: { width: `${branch.efficiency}%` } }) }), _jsxs("span", { className: "font-bold", children: [branch.efficiency, "%"] })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs(Badge, { variant: branch.growth >= 0 ? 'default' : 'destructive', className: "gap-1 px-2", children: [branch.growth >= 0 ? _jsx(ArrowUpRight, { className: "h-3 w-3" }) : _jsx(ArrowDownRight, { className: "h-3 w-3" }), Math.abs(branch.growth), "%"] }) })] }, branch.id))) })] }) })] }) })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(motion.div, { whileHover: { y: -5 }, className: "relative h-72 overflow-hidden rounded-[2rem] border border-border group", children: [_jsx("img", { src: IMAGES.DASHBOARD_ANALYTICS_3, alt: "Global Logistics View", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }), _jsxs("div", { className: "absolute bottom-0 left-0 p-8", children: [_jsx(Badge, { className: "mb-3 bg-primary/90 text-primary-foreground font-bold tracking-[0.2em] text-[10px]", children: "NETWORK EXPANSION" }), _jsx("h4", { className: "font-heading text-2xl font-bold text-foreground mb-1", children: "APAC Transit Corridor" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Live efficiency tracking for the New Silk Road route across 12 countries." }), _jsxs(Button, { variant: "link", className: "text-primary p-0 h-auto mt-4 font-bold text-xs uppercase tracking-widest", children: ["View Details ", _jsx(ArrowUpRight, { className: "ml-1 h-3 w-3" })] })] })] }), _jsxs(motion.div, { whileHover: { y: -5 }, className: "relative h-72 overflow-hidden rounded-[2rem] border border-border group", children: [_jsx("img", { src: IMAGES.DASHBOARD_ANALYTICS_4, alt: "Predictive Analytics", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" }), _jsxs("div", { className: "absolute bottom-0 left-0 p-8", children: [_jsx(Badge, { className: "mb-3 bg-accent text-accent-foreground font-bold tracking-[0.2em] text-[10px]", children: "AI INSIGHTS" }), _jsx("h4", { className: "font-heading text-2xl font-bold text-foreground mb-1", children: "Autonomous Optimization" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Predictive modeling reduced fuel costs by 18.2% in the last fiscal quarter." }), _jsxs(Button, { variant: "link", className: "text-primary p-0 h-auto mt-4 font-bold text-xs uppercase tracking-widest", children: ["Access Models ", _jsx(ArrowUpRight, { className: "ml-1 h-3 w-3" })] })] })] })] }), _jsx("div", { className: "mt-4 flex justify-center", children: _jsxs(Button, { className: "luxury-button px-12 group", children: ["Generate Full BI Report", _jsx(FileText, { className: "ml-2 h-4 w-4 transition-transform group-hover:rotate-12" })] }) })] }));
}
