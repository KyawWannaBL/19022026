import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TrendingUp, Activity, Clock, Truck, Target, Download, Calendar as CalendarIcon, ChevronDown, Filter, MapPin, CheckCircle2, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { fadeInUp, staggerContainer } from '@/lib/motion';
const PerformanceReportPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [dateRange, setDateRange] = useState('last30');
    // Mock Data for 2026 Performance
    const performanceTrends = [
        { name: 'Jan', success: 94, target: 95, time: 22 },
        { name: 'Feb', success: 96, target: 95, time: 20 },
        { name: 'Mar', success: 93, target: 95, time: 24 },
        { name: 'Apr', success: 95, target: 95, time: 21 },
        { name: 'May', success: 97, target: 95, time: 19 },
        { name: 'Jun', success: 98, target: 95, time: 18 },
    ];
    const branchPerformance = [
        { name: 'Yangon Central', score: 98, efficiency: 95, volume: 12400 },
        { name: 'Mandalay Hub', score: 92, efficiency: 88, volume: 8500 },
        { name: 'Naypyidaw East', score: 89, efficiency: 84, volume: 4200 },
        { name: 'Taunggyi Station', score: 94, efficiency: 91, volume: 3100 },
        { name: 'Bago Branch', score: 86, efficiency: 79, volume: 2800 },
    ];
    const efficiencyMetrics = [
        { name: 'Sorting', value: 85, color: 'var(--gold-500)' },
        { name: 'Dispatch', value: 92, color: 'var(--navy-600)' },
        { name: 'Transit', value: 78, color: 'var(--gold-400)' },
        { name: 'Last Mile', value: 96, color: 'var(--navy-800)' },
    ];
    const kpis = [
        {
            title: 'Delivery Success Rate',
            value: '95.8%',
            change: '+2.4%',
            trend: 'up',
            icon: CheckCircle2,
            description: 'Percentage of successful first-attempt deliveries',
            color: 'text-success'
        },
        {
            title: 'Avg. Delivery Time',
            value: '18.4 hrs',
            change: '-1.2 hrs',
            trend: 'up',
            icon: Clock,
            description: 'Average time from pickup to final delivery',
            color: 'text-info'
        },
        {
            title: 'Fleet Utilization',
            value: '88.2%',
            change: '+5.1%',
            trend: 'up',
            icon: Truck,
            description: 'Active vehicle capacity usage across all zones',
            color: 'text-gold'
        },
        {
            title: 'On-Time Pickup',
            value: '92.5%',
            change: '-0.8%',
            trend: 'down',
            icon: Target,
            description: 'Percentage of pickups completed within window',
            color: 'text-warning'
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-950 dark:text-gold-400", children: t('reports.performanceReport') }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Real-time operational KPIs and system efficiency metrics for 2026" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "border-gold-400/50 hover:bg-gold-50", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), t('common.export'), _jsx(ChevronDown, { className: "w-4 h-4 ml-2 opacity-50" })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuItem, { className: "cursor-pointer", children: t('reports.exportPdf') }), _jsx(DropdownMenuItem, { className: "cursor-pointer", children: t('reports.exportExcel') })] })] }), _jsxs(Button, { className: "luxury-button", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), t('common.filter')] })] })] }), _jsx(Card, { className: "border-gold-400/20 shadow-sm", children: _jsxs(CardContent, { className: "p-4 flex flex-wrap items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("span", { className: "text-sm font-medium", children: [t('reports.dateRange'), ":"] }), _jsx("span", { className: "sr-only", children: "Date Range Selector" }), _jsxs(Select, { value: dateRange, onValueChange: setDateRange, children: [_jsx(SelectTrigger, { className: "w-[180px] h-9 border-none bg-muted/50", children: _jsx(SelectValue, { placeholder: "Select period" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "today", children: "Today" }), _jsx(SelectItem, { value: "yesterday", children: "Yesterday" }), _jsx(SelectItem, { value: "last7", children: "Last 7 Days" }), _jsx(SelectItem, { value: "last30", children: "Last 30 Days" }), _jsx(SelectItem, { value: "last90", children: "Last 3 Months" }), _jsx(SelectItem, { value: "custom", children: "Custom Range" })] })] })] }), _jsx(Separator, { orientation: "vertical", className: "h-8 hidden md:block" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-muted-foreground" }), _jsx("span", { className: "text-sm font-medium", children: "Branch:" }), _jsxs(Select, { defaultValue: "all", children: [_jsx(SelectTrigger, { className: "w-[180px] h-9 border-none bg-muted/50", children: _jsx(SelectValue, { placeholder: "All Branches" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Branches" }), _jsx(SelectItem, { value: "yangon", children: "Yangon Hub" }), _jsx(SelectItem, { value: "mandalay", children: "Mandalay Hub" })] })] })] }), _jsxs("div", { className: "ml-auto hidden lg:flex items-center gap-2 text-xs text-muted-foreground italic", children: [_jsx(Activity, { className: "w-3 h-3 text-gold-500 animate-pulse" }), "Last updated: 2026-02-04 05:15:20"] })] }) }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: kpis.map((kpi, index) => (_jsx(motion.div, { variants: fadeInUp, children: _jsx(Card, { className: "lotus-card border-none overflow-hidden group hover:scale-[1.02] transition-transform", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: `p-3 rounded-xl bg-white/10 text-gold-400 group-hover:bg-gold-500/20 transition-colors`, children: _jsx(kpi.icon, { className: "w-6 h-6" }) }), _jsx(Badge, { variant: "outline", className: `border-none bg-white/5 ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`, children: kpi.change })] }), _jsxs("div", { className: "mt-4 space-y-1", children: [_jsx("h3", { className: "text-sm font-medium text-gold-200/70", children: kpi.title }), _jsx("p", { className: "text-3xl font-bold text-white font-mono tracking-tight", children: kpi.value }), _jsx("p", { className: "text-xs text-gold-100/40 line-clamp-1", children: kpi.description })] })] }) }) }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(Card, { className: "lg:col-span-2 border-gold-400/20", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: t('dashboard.overview') }), _jsx(CardDescription, { children: "Monthly success rate vs Target performance" })] }), _jsx(Tabs, { defaultValue: "success", className: "w-[200px]", children: _jsxs(TabsList, { className: "grid grid-cols-2 h-8", children: [_jsx(TabsTrigger, { value: "success", className: "text-xs", children: "Success" }), _jsx(TabsTrigger, { value: "time", className: "text-xs", children: "Time" })] }) })] }), _jsx(CardContent, { className: "h-[400px] w-full pt-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: performanceTrends, margin: { top: 20, right: 30, left: 0, bottom: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(0,0,0,0.05)" }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: '#64748b', fontSize: 12 } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: '#64748b', fontSize: 12 }, unit: "%" }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }, itemStyle: { color: '#fbbf24' } }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "success", stroke: "#eab308", strokeWidth: 3, dot: { r: 4, fill: '#eab308' }, activeDot: { r: 6, strokeWidth: 0 }, name: "Delivery Success" }), _jsx(Line, { type: "monotone", dataKey: "target", stroke: "#1e293b", strokeWidth: 2, strokeDasharray: "5 5", dot: false, name: "Benchmark Target" })] }) }) })] }), _jsxs(Card, { className: "border-gold-400/20", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Operational Efficiency" }), _jsx(CardDescription, { children: "Department-wise performance" })] }), _jsxs(CardContent, { className: "space-y-6", children: [efficiencyMetrics.map((metric, idx) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "font-medium", children: metric.name }), _jsxs("span", { className: "font-mono font-bold", children: [metric.value, "%"] })] }), _jsx(Progress, { value: metric.value, className: "h-2" })] }, idx))), _jsx(Separator, { className: "my-6" }), _jsxs("div", { className: "bg-muted/30 p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-success" }), _jsx("span", { className: "text-sm font-semibold", children: "Performance Insight" })] }), _jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Last mile efficiency is at an all-time high of 96%. Warehouse sorting needs optimization in Mandalay branch to meet the 90% benchmark." })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10", children: [_jsxs(Card, { className: "border-gold-400/20 overflow-hidden", children: [_jsx(CardHeader, { className: "bg-muted/30", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: "Branch Performance Ranking" }), _jsx(BarChart3, { className: "w-5 h-5 text-gold-500" })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-muted/50 text-muted-foreground font-medium border-b border-border", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-left", children: "Branch Name" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Volume" }), _jsx("th", { className: "px-6 py-4 text-center", children: "Score" }), _jsx("th", { className: "px-6 py-4 text-right", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-border", children: branchPerformance.map((branch, idx) => (_jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [_jsx("td", { className: "px-6 py-4 font-medium", children: branch.name }), _jsx("td", { className: "px-6 py-4 text-center font-mono", children: branch.volume.toLocaleString() }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "w-16 h-2 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${branch.score > 90 ? 'bg-success' : branch.score > 85 ? 'bg-warning' : 'bg-destructive'}`, style: { width: `${branch.score}%` } }) }), _jsx("span", { className: "font-bold w-8", children: branch.score })] }) }), _jsx("td", { className: "px-6 py-4 text-right", children: _jsx(Badge, { variant: "outline", className: branch.score > 90 ? 'border-success text-success' : 'border-warning text-warning', children: branch.score > 90 ? 'Excellent' : branch.score > 85 ? 'Good' : 'Review' }) })] }, idx))) })] }) }) })] }), _jsxs(Card, { className: "border-gold-400/20", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Service Volume Distribution" }), _jsx(CardDescription, { children: "Allocation of shipments by service category" })] }), _jsxs(CardContent, { className: "h-[300px]", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: [
                                                { name: 'Domestic Express', value: 4500 },
                                                { name: 'International', value: 1200 },
                                                { name: 'Same Day', value: 2800 },
                                                { name: 'COD Service', value: 3900 },
                                            ], layout: "vertical", margin: { left: 40 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", horizontal: true, vertical: false, stroke: "rgba(0,0,0,0.05)" }), _jsx(XAxis, { type: "number", hide: true }), _jsx(YAxis, { dataKey: "name", type: "category", axisLine: false, tickLine: false, tick: { fill: '#64748b', fontSize: 12 } }), _jsx(Tooltip, { cursor: { fill: 'transparent' }, contentStyle: { backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' } }), _jsx(Bar, { dataKey: "value", radius: [0, 4, 4, 0], barSize: 32, children: [
                                                        { name: 'Domestic Express', value: 4500 },
                                                        { name: 'International', value: 1200 },
                                                        { name: 'Same Day', value: 2800 },
                                                        { name: 'COD Service', value: 3900 },
                                                    ].map((entry, index) => (_jsx(Cell, { fill: index % 2 === 0 ? '#1e293b' : '#eab308' }, `cell-${index}`))) })] }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [_jsxs("div", { className: "p-3 bg-navy-50 dark:bg-navy-900/50 rounded-lg", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1", children: "Total Volume" }), _jsx("p", { className: "text-xl font-bold font-mono", children: "12,400" })] }), _jsxs("div", { className: "p-3 bg-gold-50 dark:bg-gold-900/10 rounded-lg", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1", children: "Market Share" }), _jsx("p", { className: "text-xl font-bold font-mono text-gold-600", children: "+12.5%" })] })] })] })] })] })] }));
};
export default PerformanceReportPage;
