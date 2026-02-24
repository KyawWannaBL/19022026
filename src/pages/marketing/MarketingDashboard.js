import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TrendingUp, Users, Target, Megaphone, BarChart3, Plus, Filter, Download, ArrowUpRight, ArrowDownRight, Search, MoreVertical, Mail, MessageSquare, Bell, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
const CAMPAIGN_DATA = [
    { name: 'Jan', conversion: 4000, reach: 24000, spend: 2400 },
    { name: 'Feb', conversion: 3000, reach: 13980, spend: 2210 },
    { name: 'Mar', conversion: 2000, reach: 98000, spend: 2290 },
    { name: 'Apr', conversion: 2780, reach: 39080, spend: 2000 },
    { name: 'May', conversion: 1890, reach: 48000, spend: 2181 },
    { name: 'Jun', conversion: 2390, reach: 38000, spend: 2500 },
    { name: 'Jul', conversion: 3490, reach: 43000, spend: 2100 },
];
const SEGMENT_DATA = [
    { name: 'Power Users', value: 400, color: 'var(--primary)' },
    { name: 'Casual', value: 300, color: 'var(--chart-2)' },
    { name: 'At Risk', value: 150, color: 'var(--destructive)' },
    { name: 'New Leads', value: 200, color: 'var(--chart-4)' },
];
const ACTIVE_CAMPAIGNS = [
    {
        id: 'CMP-001',
        title: 'Spring Logistics Expo 2026',
        type: 'Event',
        status: 'Running',
        progress: 65,
        leads: 1240,
        budget: '$15,000',
        roi: '+12.5%',
    },
    {
        id: 'CMP-002',
        title: 'New Merchant Onboarding Boost',
        type: 'Email',
        status: 'Active',
        progress: 82,
        leads: 3500,
        budget: '$5,000',
        roi: '+24.1%',
    },
    {
        id: 'CMP-003',
        title: 'Last-Mile Efficiency Promo',
        type: 'Social',
        status: 'Scheduled',
        progress: 0,
        leads: 0,
        budget: '$8,500',
        roi: 'N/A',
    },
];
const MarketingDashboard = () => {
    const { user, legacyUser } = useAuth();
    const [timeRange, setTimeRange] = useState('7d');
    const stats = [
        {
            label: 'Total Conversion',
            value: '24.8%',
            change: '+4.3%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-primary',
        },
        {
            label: 'Active Segments',
            value: '12',
            change: '+2',
            trend: 'up',
            icon: Layers,
            color: 'text-chart-2',
        },
        {
            label: 'Avg. CAC',
            value: '$12.45',
            change: '-$1.20',
            trend: 'down',
            icon: Target,
            color: 'text-chart-5',
        },
        {
            label: 'Marketing ROI',
            value: '4.2x',
            change: '+0.8x',
            trend: 'up',
            icon: BarChart3,
            color: 'text-primary',
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Marketing Dashboard" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["Welcome back, ", legacyUser?.name || 'Specialist', ". Here's your strategy performance for Feb 2026."] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Select, { value: timeRange, onValueChange: setTimeRange, children: [_jsx(SelectTrigger, { className: "w-[140px]", children: _jsx(SelectValue, { placeholder: "Select Range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "24h", children: "Last 24 Hours" }), _jsx(SelectItem, { value: "7d", children: "Last 7 Days" }), _jsx(SelectItem, { value: "30d", children: "Last 30 Days" }), _jsx(SelectItem, { value: "90d", children: "Last Quarter" })] })] }), _jsxs(Button, { className: "btn-modern bg-primary text-primary-foreground", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " New Campaign"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, idx) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: idx * 0.1 }, children: _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: `p-2 rounded-lg bg-muted/50 ${stat.color}`, children: _jsx(stat.icon, { className: "h-5 w-5" }) }), _jsxs("div", { className: `flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`, children: [stat.trend === 'up' ? _jsx(ArrowUpRight, { className: "h-3 w-3 mr-1" }) : _jsx(ArrowDownRight, { className: "h-3 w-3 mr-1" }), stat.change] })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value })] })] }) }) }, stat.label))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(Card, { className: "lg:col-span-2 card-modern", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Conversion Funnel" }), _jsx(CardDescription, { children: "Performance tracking across multiple channels" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", children: _jsx(Download, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }), _jsx(CardContent, { className: "h-[400px] mt-4", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: CAMPAIGN_DATA, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorConv", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--primary)", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "var(--primary)", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "var(--border)" }), _jsx(XAxis, { dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `${value / 1000}k` }), _jsx(Tooltip, { contentStyle: {
                                                    backgroundColor: 'var(--card)',
                                                    borderColor: 'var(--border)',
                                                    borderRadius: 'var(--radius)',
                                                    color: 'var(--foreground)'
                                                } }), _jsx(Area, { type: "monotone", dataKey: "reach", stroke: "var(--primary)", fillOpacity: 1, fill: "url(#colorConv)", strokeWidth: 2 }), _jsx(Area, { type: "monotone", dataKey: "conversion", stroke: "var(--chart-2)", fillOpacity: 0.1, fill: "var(--chart-2)", strokeWidth: 2 })] }) }) })] }), _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Audience Segmentation" }), _jsx(CardDescription, { children: "Current customer tier distribution" })] }), _jsxs(CardContent, { className: "h-[300px] flex flex-col items-center justify-center", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: SEGMENT_DATA, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: SEGMENT_DATA.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "grid grid-cols-2 gap-4 w-full mt-4", children: SEGMENT_DATA.map((s) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: s.color } }), _jsx("span", { className: "text-xs text-muted-foreground font-medium", children: s.name })] }, s.name))) })] })] })] }), _jsxs(Tabs, { defaultValue: "campaigns", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-muted/50 p-1", children: [_jsx(TabsTrigger, { value: "campaigns", children: "Active Campaigns" }), _jsx(TabsTrigger, { value: "tools", children: "Marketing Tools" }), _jsx(TabsTrigger, { value: "segments", children: "Customer Segments" })] }), _jsx(TabsContent, { value: "campaigns", children: _jsxs(Card, { className: "card-modern", children: [_jsxs("div", { className: "p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "relative w-full sm:w-72", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10", placeholder: "Search campaigns..." })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Bulk Actions" }), _jsx(Button, { variant: "outline", size: "sm", children: "Export CSV" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-muted/30", children: [_jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Campaign" }), _jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Status" }), _jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Performance" }), _jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Budget" }), _jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Leads" }), _jsx("th", { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-border/50", children: ACTIVE_CAMPAIGNS.map((campaign) => (_jsxs("tr", { className: "hover:bg-muted/20 transition-colors", children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: campaign.title }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [campaign.type, " \u2022 ", campaign.id] })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsx(Badge, { variant: campaign.status === 'Running' ? 'default' : campaign.status === 'Active' ? 'secondary' : 'outline', children: campaign.status }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "w-32", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("span", { className: "text-xs font-medium", children: [campaign.progress, "%"] }), _jsx("span", { className: "text-[10px] text-green-500 font-bold", children: campaign.roi })] }), _jsx(Progress, { value: campaign.progress, className: "h-1.5" })] }) }), _jsx("td", { className: "px-6 py-4 font-mono text-sm", children: campaign.budget }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-muted-foreground" }), _jsx("span", { className: "font-medium", children: campaign.leads.toLocaleString() })] }) }), _jsx("td", { className: "px-6 py-4 text-right", children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) })] }, campaign.id))) })] }) })] }) }), _jsx(TabsContent, { value: "tools", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                                { name: 'Email Marketing', icon: Mail, desc: 'Design and automate email workflows', color: 'bg-blue-500' },
                                { name: 'Push Notifications', icon: Bell, desc: 'Real-time alerts for mobile users', color: 'bg-orange-500' },
                                { name: 'Customer Chat', icon: MessageSquare, desc: 'Engage visitors with AI-powered chat', color: 'bg-green-500' },
                                { name: 'A/B Testing', icon: BarChart3, desc: 'Validate campaign variants', color: 'bg-purple-500' },
                                { name: 'Brand Assets', icon: Megaphone, desc: 'Manage logos, banners, and media', color: 'bg-pink-500' },
                                { name: 'API Integrations', icon: Target, desc: 'Connect 3rd party marketing stacks', color: 'bg-indigo-500' },
                            ].map((tool, idx) => (_jsx(Card, { className: "card-modern group cursor-pointer hover:border-primary/50", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: `w-12 h-12 rounded-xl ${tool.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`, children: _jsx(tool.icon, { className: "h-6 w-6" }) }), _jsx("h4", { className: "font-bold text-lg", children: tool.name }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: tool.desc }), _jsxs(Button, { variant: "link", className: "p-0 h-auto mt-4 group-hover:text-primary transition-colors", children: ["Launch Tool ", _jsx(ArrowUpRight, { className: "ml-1 h-3 w-3" })] })] }) }, idx))) }) })] })] }));
};
export default MarketingDashboard;
