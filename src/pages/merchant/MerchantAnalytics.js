import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, } from 'recharts';
import { TrendingUp, Package, DollarSign, CheckCircle2, AlertCircle, ChevronRight, Filter, Download, BrainCircuit, Users, Calendar, Target, } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_TOWNSHIPS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Mock Data for 2026 Merchant Insights
const REVENUE_DATA = [
    { name: 'Sep', revenue: 12500, orders: 420 },
    { name: 'Oct', revenue: 15200, orders: 480 },
    { name: 'Nov', revenue: 21000, orders: 650 },
    { name: 'Dec', revenue: 28500, orders: 890 },
    { name: 'Jan', revenue: 24200, orders: 720 },
    { name: 'Feb', revenue: 26800, orders: 780 },
];
const DELIVERY_PERFORMANCE = [
    { name: 'Delivered', value: 85, color: 'oklch(0.65 0.15 180)' },
    { name: 'In Transit', value: 10, color: 'oklch(0.55 0.18 245)' },
    { name: 'Failed/NDR', value: 5, color: 'oklch(0.55 0.22 25)' },
];
const TOWNSHIP_DATA = MOCK_TOWNSHIPS.map(t => ({
    township: t,
    volume: Math.floor(Math.random() * 500) + 100,
    revenue: Math.floor(Math.random() * 5000) + 1000,
}));
const TOP_CUSTOMERS = [
    { name: 'Quantum Retail Group', orders: 124, spent: '$12,400', growth: '+12%' },
    { name: 'Nexus Logistics Co', orders: 98, spent: '$9,800', growth: '+8%' },
    { name: 'Solaris E-commerce', orders: 86, spent: '$8,200', growth: '+15%' },
    { name: 'Apex Electronics', orders: 74, spent: '$7,100', growth: '-2%' },
];
const PREDICTIVE_INSIGHTS = [
    {
        title: 'Peak Season Forecast',
        description: 'Predicted 24% volume increase in North District next month.',
        type: 'positive',
        icon: _jsx(TrendingUp, { className: "w-4 h-4 text-green-500" }),
    },
    {
        title: 'NDR Risk Alert',
        description: 'Solaris E-commerce orders showing 12% higher risk of delivery failure.',
        type: 'warning',
        icon: _jsx(AlertCircle, { className: "w-4 h-4 text-amber-500" }),
    },
    {
        title: 'Revenue Projection',
        description: 'Projected Q1 revenue: $82,400 based on current momentum.',
        type: 'neutral',
        icon: _jsx(Target, { className: "w-4 h-4 text-blue-500" }),
    },
];
const MerchantAnalytics = () => {
    const { user, legacyUser } = useAuth();
    const [timeRange, setTimeRange] = useState('6m');
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };
    return (_jsx("div", { className: "min-h-screen bg-background p-4 md:p-8", children: _jsxs(motion.div, { initial: "hidden", animate: "visible", variants: containerVariants, className: "max-w-7xl mx-auto space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Merchant Analytics" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time performance insights for 2026 operations" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [_jsxs(SelectTrigger, { className: "w-[160px] bg-card", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2 opacity-50" }), _jsx(SelectValue, { placeholder: "Select range" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "7d", children: "Last 7 Days" }), _jsx(SelectItem, { value: "30d", children: "Last 30 Days" }), _jsx(SelectItem, { value: "6m", children: "Last 6 Months" }), _jsx(SelectItem, { value: "1y", children: "Last Year" })] })] }), _jsxs(Button, { variant: "outline", className: "btn-modern", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg", children: _jsx(DollarSign, { className: "w-6 h-6 text-primary" }) }), _jsx(Badge, { className: "bg-green-500/10 text-green-600 border-none", children: "+18.2%" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase", children: "Total Revenue" }), _jsx("h2", { className: "text-2xl font-bold font-mono mt-1", children: "$26,800.00" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-blue-500/10 rounded-lg", children: _jsx(Package, { className: "w-6 h-6 text-blue-500" }) }), _jsx(Badge, { className: "bg-blue-500/10 text-blue-600 border-none", children: "780 Items" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase", children: "Monthly Shipments" }), _jsx("h2", { className: "text-2xl font-bold font-mono mt-1", children: "3,420" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-green-500/10 rounded-lg", children: _jsx(CheckCircle2, { className: "w-6 h-6 text-green-500" }) }), _jsx(Badge, { className: "bg-green-500/10 text-green-600 border-none", children: "96.4%" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase", children: "Success Rate" }), _jsx("h2", { className: "text-2xl font-bold font-mono mt-1", children: "SLA Grade A" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "p-2 bg-amber-500/10 rounded-lg", children: _jsx(AlertCircle, { className: "w-6 h-6 text-amber-500" }) }), _jsx(Badge, { variant: "destructive", className: "border-none", children: "14 NDRs" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground uppercase", children: "Exceptions" }), _jsx("h2", { className: "text-2xl font-bold font-mono mt-1", children: "2.1% Risk" })] })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Revenue & Volume Trends" }), _jsx(CardDescription, { children: "Performance comparison over time" })] }), _jsx(CardContent, { className: "h-[400px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: REVENUE_DATA, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorRev", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--primary)", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "var(--primary)", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "oklch(0.91 0.01 245)" }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false }), _jsx(YAxis, { axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }, itemStyle: { color: 'var(--primary)' } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "var(--primary)", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorRev)" })] }) }) })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "card-modern h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Delivery Distribution" }) }), _jsxs(CardContent, { className: "h-[250px] flex items-center justify-center", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: DELIVERY_PERFORMANCE, innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: DELIVERY_PERFORMANCE.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "space-y-2 ml-4", children: DELIVERY_PERFORMANCE.map((item) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }), _jsxs("span", { className: "text-xs font-medium", children: [item.name, " (", item.value, "%)"] })] }, item.name))) })] })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "card-modern h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Volume by Township" }) }), _jsx(CardContent, { className: "h-[250px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: TOWNSHIP_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "oklch(0.91 0.01 245)" }), _jsx(XAxis, { dataKey: "township", axisLine: false, tickLine: false, fontSize: 10 }), _jsx(YAxis, { axisLine: false, tickLine: false }), _jsx(Tooltip, { cursor: { fill: 'var(--muted)' } }), _jsx(Bar, { dataKey: "volume", fill: "var(--primary)", radius: [4, 4, 0, 0] })] }) }) })] }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "card-glass border-primary/20", children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(BrainCircuit, { className: "w-5 h-5 text-primary" }), "AI Logi-Sense Insights"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [PREDICTIVE_INSIGHTS.map((insight, idx) => (_jsx("div", { className: "p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-colors", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-1", children: insight.icon }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: insight.title }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: insight.description })] })] }) }, idx))), _jsx(Button, { variant: "outline", className: "w-full text-xs", children: "Generate Full AI Report" })] })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5 text-primary" }), "Top Customers"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-4", children: TOP_CUSTOMERS.map((customer, idx) => (_jsxs("div", { className: "flex items-center justify-between group cursor-pointer", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold", children: customer.name.charAt(0) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium group-hover:text-primary transition-colors", children: customer.name }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [customer.orders, " Orders"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-mono", children: customer.spent }), _jsx("p", { className: `text-xs ${customer.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`, children: customer.growth })] })] }, idx))) }), _jsxs(Button, { variant: "ghost", className: "w-full mt-4 text-xs flex items-center justify-center gap-1", children: ["View All Customers", _jsx(ChevronRight, { className: "w-3 h-3" })] })] })] }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "card-modern bg-gradient-to-br from-primary/5 to-transparent border-primary/10", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "p-2 bg-primary text-primary-foreground rounded-lg", children: _jsx(Filter, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", children: "Quick Analytics" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Filter by region or category" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "Electronics" }), _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "Fashion" }), _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "North Hub" }), _jsx(Button, { variant: "outline", size: "sm", className: "text-xs", children: "South Hub" })] })] }) }) })] })] })] }) }));
};
export default MerchantAnalytics;
