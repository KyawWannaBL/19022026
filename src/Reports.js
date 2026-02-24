import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Download, TrendingUp, DollarSign, Package, Truck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatDate } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
// Mock Data for 2026 Logistics Performance
const REVENUE_DATA = [
    { name: 'Jan 2026', revenue: 45000000, costs: 32000000 },
    { name: 'Feb 2026', revenue: 52000000, costs: 35000000 },
    { name: 'Mar 2026', revenue: 48000000, costs: 31000000 },
    { name: 'Apr 2026', revenue: 61000000, costs: 38000000 },
    { name: 'May 2026', revenue: 55000000, costs: 36000000 },
    { name: 'Jun 2026', revenue: 67000000, costs: 41000000 },
];
const SHIPMENT_VOLUME = [
    { name: 'Yangon', value: 4500 },
    { name: 'Mandalay', value: 2800 },
    { name: 'Naypyidaw', value: 1200 },
    { name: 'Taunggyi', value: 900 },
    { name: 'Bago', value: 600 },
];
const COLORS = ['#D4AF37', '#B8941F', '#8A6E14', '#5E4B0E', '#3D3109'];
const RECENT_TRANSACTIONS = [
    { id: 'REP-001', date: '2026-02-19', type: 'Revenue', amount: 1250000, status: 'Completed', branch: 'Yangon Central' },
    { id: 'REP-002', date: '2026-02-18', type: 'COD Payout', amount: 850000, status: 'Processing', branch: 'Mandalay Hub' },
    { id: 'REP-003', date: '2026-02-18', type: 'Fleet Fuel', amount: 450000, status: 'Completed', branch: 'Naypyidaw' },
    { id: 'REP-004', date: '2026-02-17', type: 'Revenue', amount: 2100000, status: 'Completed', branch: 'Yangon Central' },
    { id: 'REP-005', date: '2026-02-17', type: 'Maintenance', amount: 120000, status: 'Completed', branch: 'Taunggyi' },
];
export default function Reports() {
    const { language } = useLanguage();
    const [timeframe, setTimeframe] = useState('monthly');
    const t = {
        en: {
            title: 'Enterprise Intelligence Reports',
            subtitle: 'Comprehensive financial and operational performance analysis for fiscal year 2026.',
            export: 'Export Report',
            financial: 'Financial',
            operations: 'Operations',
            performance: 'Performance',
            compliance: 'Compliance',
            revenueSummary: 'Revenue Summary',
            shipmentVolume: 'Shipment Volume by Region',
            recentActivity: 'Recent Financial Activity',
            stats: {
                totalRevenue: 'Total Revenue',
                totalShipments: 'Total Shipments',
                successRate: 'Delivery Success Rate',
                activeFleet: 'Active Fleet Utilization'
            }
        },
        my: {
            title: 'လုပ်ငန်းဆိုင်ရာ အစီရင်ခံစာများ',
            subtitle: '၂၀၂၆ ဘဏ္ဍာရေးနှစ်အတွက် ငွေကြေးနှင့် လုပ်ငန်းဆောင်ရွက်မှု ခွဲခြမ်းစိတ်ဖြာချက်များ။',
            export: 'အစီရင်ခံစာ ထုတ်ယူရန်',
            financial: 'ဘဏ္ဍာရေး',
            operations: 'လုပ်ငန်းလည်ပတ်မှု',
            performance: 'စွမ်းဆောင်ရည်',
            compliance: 'လိုက်နာမှု',
            revenueSummary: 'ဝင်ငွေအကျဉ်းချုပ်',
            shipmentVolume: 'တိုင်းဒေသကြီးအလိုက် ပို့ဆောင်မှုပမာဏ',
            recentActivity: 'မကြာသေးမီက ငွေကြေးလှုပ်ရှားမှုများ',
            stats: {
                totalRevenue: 'စုစုပေါင်းဝင်ငွေ',
                totalShipments: 'စုစုပေါင်းပို့ဆောင်မှု',
                successRate: 'အောင်မြင်မှုနှုန်း',
                activeFleet: 'ယာဉ်အုပ်စု အသုံးပြုမှု'
            }
        }
    };
    const currentT = t[language] || t.en;
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground font-heading", children: currentT.title }), _jsx("p", { className: "text-muted-foreground", children: currentT.subtitle })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Select, { defaultValue: "2026", children: [_jsx(SelectTrigger, { className: "w-[120px] bg-card border-border", children: _jsx(SelectValue, { placeholder: "Year" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "2026", children: "2026" }), _jsx(SelectItem, { value: "2025", children: "2025" })] })] }), _jsxs(Button, { className: "luxury-button h-10 px-6", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), currentT.export] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                    { label: currentT.stats.totalRevenue, value: '328.4M', change: '+12.5%', icon: DollarSign, trend: 'up' },
                    { label: currentT.stats.totalShipments, value: '10,842', change: '+8.2%', icon: Package, trend: 'up' },
                    { label: currentT.stats.successRate, value: '98.4%', change: '-0.2%', icon: TrendingUp, trend: 'down' },
                    { label: currentT.stats.activeFleet, value: '84%', change: '+4.1%', icon: Truck, trend: 'up' },
                ].map((metric, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, children: _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: _jsx(metric.icon, { className: "h-5 w-5 text-primary" }) }), _jsxs("div", { className: `flex items-center text-xs font-medium ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`, children: [metric.change, metric.trend === 'up' ? _jsx(ArrowUpRight, { className: "h-3 w-3 ml-1" }) : _jsx(ArrowDownRight, { className: "h-3 w-3 ml-1" })] })] }), _jsxs("div", { className: "mt-4 space-y-1", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: metric.label }), _jsx("p", { className: "text-2xl font-bold font-mono", children: metric.value })] })] }) }) }, i))) }), _jsxs(Tabs, { defaultValue: "financial", className: "w-full space-y-6", children: [_jsxs(TabsList, { className: "bg-card border border-border p-1 rounded-xl h-auto", children: [_jsx(TabsTrigger, { value: "financial", className: "rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: currentT.financial }), _jsx(TabsTrigger, { value: "operations", className: "rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: currentT.operations }), _jsx(TabsTrigger, { value: "performance", className: "rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: currentT.performance }), _jsx(TabsTrigger, { value: "compliance", className: "rounded-lg py-2 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: currentT.compliance })] }), _jsxs(TabsContent, { value: "financial", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 luxury-card overflow-hidden", children: [_jsxs(CardHeader, { className: "border-b border-border/50", children: [_jsxs(CardTitle, { className: "text-lg", children: [currentT.revenueSummary, " (2026)"] }), _jsx(CardDescription, { children: "Monthly comparison of gross revenue vs operational costs" })] }), _jsx(CardContent, { className: "pt-6 h-[400px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: REVENUE_DATA, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorRevenue", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "var(--primary)", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "var(--primary)", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255,255,255,0.05)" }), _jsx(XAxis, { dataKey: "name", stroke: "#71717a", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#71717a", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `${(value / 1000000).toFixed(0)}M` }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#0B0C10', border: '1px solid #27272a', borderRadius: '12px' }, formatter: (value) => [formatCurrency(value), 'MMK'] }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "var(--primary)", fillOpacity: 1, fill: "url(#colorRevenue)", strokeWidth: 3 }), _jsx(Area, { type: "monotone", dataKey: "costs", stroke: "#71717a", fillOpacity: 0.1, fill: "#71717a", strokeWidth: 2, strokeDasharray: "5 5" })] }) }) })] }), _jsxs(Card, { className: "luxury-card overflow-hidden", children: [_jsxs(CardHeader, { className: "border-b border-border/50", children: [_jsx(CardTitle, { className: "text-lg", children: currentT.shipmentVolume }), _jsx(CardDescription, { children: "Active delivery volume across hubs" })] }), _jsxs(CardContent, { className: "pt-6 h-[400px]", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: SHIPMENT_VOLUME, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 5, dataKey: "value", children: SHIPMENT_VOLUME.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#0B0C10', border: '1px solid #27272a', borderRadius: '12px' } })] }) }), _jsx("div", { className: "space-y-2 mt-4", children: SHIPMENT_VOLUME.map((item, i) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: COLORS[i] } }), _jsx("span", { className: "text-muted-foreground", children: item.name })] }), _jsx("span", { className: "font-mono font-medium", children: item.value })] }, item.name))) })] })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between border-b border-border/50", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: currentT.recentActivity }), _jsx(CardDescription, { children: "Audit trail for financial settlements and payouts" })] }), _jsx(Button, { variant: "outline", size: "sm", className: "border-border hover:bg-muted", children: "View All" })] }), _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/50", children: [_jsx(TableHead, { className: "w-[120px] text-muted-foreground", children: "ID" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Date" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Type" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Branch" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Amount" }), _jsx(TableHead, { className: "text-right text-muted-foreground", children: "Status" })] }) }), _jsx(TableBody, { children: RECENT_TRANSACTIONS.map((tx) => (_jsxs(TableRow, { className: "border-border/50 hover:bg-primary/5 transition-colors", children: [_jsx(TableCell, { className: "font-mono text-xs", children: tx.id }), _jsx(TableCell, { className: "text-sm", children: formatDate(tx.date) }), _jsx(TableCell, { className: "text-sm", children: tx.type }), _jsx(TableCell, { className: "text-sm", children: tx.branch }), _jsx(TableCell, { className: "font-mono font-medium", children: formatCurrency(tx.amount) }), _jsx(TableCell, { className: "text-right", children: _jsx("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`, children: tx.status }) })] }, tx.id))) })] }) })] })] }), _jsxs(TabsContent, { value: "operations", className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "luxury-card h-[300px] flex flex-col items-center justify-center text-center p-8", children: [_jsx(Package, { className: "h-12 w-12 text-primary/40 mb-4" }), _jsx("h3", { className: "text-xl font-semibold", children: "Operations Report" }), _jsx("p", { className: "text-muted-foreground max-w-xs mt-2", children: "Detailed analysis of package flow, bottleneck detection, and delivery latency metrics." }), _jsx(Button, { variant: "outline", className: "mt-6 border-primary/30", children: "Download PDF" })] }), _jsxs(Card, { className: "luxury-card h-[300px] flex flex-col items-center justify-center text-center p-8", children: [_jsx(Truck, { className: "h-12 w-12 text-primary/40 mb-4" }), _jsx("h3", { className: "text-xl font-semibold", children: "Fleet Maintenance" }), _jsx("p", { className: "text-muted-foreground max-w-xs mt-2", children: "Fuel consumption efficiency, maintenance schedules, and vehicle downtime reports." }), _jsx(Button, { variant: "outline", className: "mt-6 border-primary/30", children: "Download PDF" })] })] }), _jsx(TabsContent, { value: "performance", className: "flex items-center justify-center h-[400px] border border-dashed border-border rounded-2xl", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx(TrendingUp, { className: "h-16 w-16 text-muted-foreground/20 mx-auto" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-xl font-medium", children: "Performance Benchmarks" }), _jsx("p", { className: "text-muted-foreground", children: "Advanced analytics module is generating quarterly performance scores." })] }), _jsx(Button, { disabled: true, className: "opacity-50 cursor-not-allowed", children: "Generating Report..." })] }) }), _jsx(TabsContent, { value: "compliance", className: "space-y-6", children: _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Compliance & Safety Audit" }), _jsx(CardDescription, { children: "Quarterly audit results for safety protocols and regulatory compliance in 2026." })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: [
                                            { title: 'Dangerous Goods Handling', score: '99.2%', status: 'Pass' },
                                            { title: 'Driver Hours Regulation', score: '97.5%', status: 'Pass' },
                                            { title: 'Warehouse Safety Standards', score: '92.1%', status: 'Warning' },
                                            { title: 'Data Privacy & GDPR (MM)', score: '100%', status: 'Pass' },
                                        ].map((item, idx) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: item.title }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Score: ", item.score] })] }), _jsx("span", { className: `px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Pass' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`, children: item.status })] }, idx))) }) })] }) })] })] }));
}
