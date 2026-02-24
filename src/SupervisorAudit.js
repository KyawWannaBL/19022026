import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, FileSearch, CheckCircle2, Filter, Download, Search, Clock, TrendingUp, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { staggerContainer, staggerItem } from '@/lib/motion';
const SupervisorAudit = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [auditLogs, setAuditLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAction, setFilterAction] = useState('all');
    useEffect(() => {
        const fetchAuditData = async () => {
            try {
                setIsLoading(true);
                const { data } = await logisticsAPI.getAuditLogs({
                    limit: 50,
                    resource_type: filterAction === 'all' ? undefined : filterAction
                });
                if (data) {
                    setAuditLogs(data);
                }
            }
            catch (error) {
                console.error('Failed to fetch audit logs:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchAuditData();
    }, [filterAction]);
    const stats = [
        {
            title: 'Compliance Rate',
            value: '98.4%',
            change: '+2.1%',
            icon: ShieldCheck,
            color: 'text-luxury-gold',
        },
        {
            title: 'System Health',
            value: 'Optimal',
            change: '100% Uptime',
            icon: Activity,
            color: 'text-green-500',
        },
        {
            title: 'Active Audits',
            value: '12',
            change: '4 Pending',
            icon: FileSearch,
            color: 'text-blue-500',
        },
        {
            title: 'Security Alerts',
            value: '0',
            change: 'Last 24h',
            icon: ShieldAlert,
            color: 'text-destructive',
        },
    ];
    const filteredLogs = auditLogs.filter(log => log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource_type.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground font-heading", children: "Supervisor Audit System" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Real-time compliance monitoring and operational oversight for 2026 Q1." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "luxury-card border-border hover:bg-accent", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Report"] }), _jsx(Button, { className: "luxury-button", children: "Generate Audit" })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.title }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value }), _jsxs("p", { className: "text-xs text-green-500 flex items-center mt-1", children: [_jsx(TrendingUp, { className: "mr-1 h-3 w-3" }), stat.change] })] }), _jsx("div", { className: `p-3 rounded-full bg-background/50 ${stat.color}`, children: _jsx(stat.icon, { className: "h-6 w-6" }) })] }) }) }) }, idx))) }), _jsxs(Tabs, { defaultValue: "logs", className: "space-y-6", children: [_jsxs(TabsList, { className: "luxury-glass p-1 h-12 inline-flex items-center justify-start bg-card/30 border border-white/5", children: [_jsx(TabsTrigger, { value: "logs", className: "data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-6", children: "Audit Logs" }), _jsx(TabsTrigger, { value: "compliance", className: "data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-6", children: "Compliance Checks" }), _jsx(TabsTrigger, { value: "performance", className: "data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md px-6", children: "Performance Monitoring" })] }), _jsx(TabsContent, { value: "logs", className: "space-y-6", children: _jsxs(Card, { className: "luxury-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Activity Trail" }), _jsx(CardDescription, { children: "Comprehensive log of all system interactions and data mutations." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search actions or users...", className: "pl-10 w-[250px] bg-background/50", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Select, { value: filterAction, onValueChange: setFilterAction, children: [_jsxs(SelectTrigger, { className: "w-[180px] bg-background/50", children: [_jsx(Filter, { className: "mr-2 h-4 w-4 text-muted-foreground" }), _jsx(SelectValue, { placeholder: "Resource Type" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Resources" }), _jsx(SelectItem, { value: "shipment", children: "Shipments" }), _jsx(SelectItem, { value: "finance", children: "Financials" }), _jsx(SelectItem, { value: "user", children: "User Management" })] })] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "rounded-lg border border-border overflow-hidden bg-background/20", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: "Timestamp" }), _jsx(TableHead, { children: "User" }), _jsx(TableHead, { children: "Action" }), _jsx(TableHead, { children: "Resource" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Details" })] }) }), _jsx(TableBody, { children: isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-12 text-center animate-pulse bg-muted/10" }) }, i)))) : filteredLogs.length > 0 ? (filteredLogs.map((log) => (_jsxs(TableRow, { className: "hover:bg-accent/5 transition-colors", children: [_jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: new Date(log.timestamp).toLocaleString() }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold", children: log.user?.full_name?.charAt(0) || 'U' }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: log.user?.full_name }), _jsx("p", { className: "text-xs text-muted-foreground", children: log.user?.email })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "uppercase text-[10px] tracking-widest", children: log.action }) }), _jsx(TableCell, { children: _jsx("span", { className: "text-sm font-medium", children: log.resource_type }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" }), _jsx("span", { className: "text-xs font-semibold", children: "Success" })] }) }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-luxury-gold hover:text-luxury-gold/80", children: "View Trace" }) })] }, log.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-32 text-center text-muted-foreground", children: "No audit logs found matching your criteria." }) })) })] }) }) })] }) }), _jsx(TabsContent, { value: "compliance", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "luxury-card col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Compliance Checklist" }), _jsx(CardDescription, { children: "Verification status for regulatory and safety standards." })] }), _jsx(CardContent, { className: "space-y-4", children: [
                                                { task: 'Bi-annual Vehicle Inspection', status: 'Completed', date: '2026-02-15' },
                                                { task: 'Rider Background Verification', status: 'In Progress', date: '2026-02-18' },
                                                { task: 'Data Privacy Compliance Audit', status: 'Completed', date: '2026-01-20' },
                                                { task: 'Hazardous Materials Training', status: 'Pending', date: '2026-03-01' },
                                            ].map((item, i) => (_jsxs("div", { className: "flex items-center justify-between p-4 rounded-xl border border-border bg-background/30 hover:bg-background/50 transition-all", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `p-2 rounded-lg ${item.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`, children: item.status === 'Completed' ? _jsx(CheckCircle2, { className: "h-5 w-5" }) : _jsx(Clock, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: item.task }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Next review: ", item.date] })] })] }), _jsx(Badge, { variant: item.status === 'Completed' ? 'default' : 'secondary', className: item.status === 'Completed' ? 'bg-green-600/20 text-green-500 hover:bg-green-600/30' : '', children: item.status })] }, i))) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Risk Overview" }), _jsx(CardDescription, { children: "AI-driven risk scoring based on recent anomalies." })] }), _jsxs(CardContent, { className: "flex flex-col items-center justify-center pt-6 pb-10", children: [_jsxs("div", { className: "relative h-40 w-40 flex items-center justify-center rounded-full border-8 border-primary/20", children: [_jsx("div", { className: "absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow" }), _jsxs("div", { className: "text-center", children: [_jsx("span", { className: "text-4xl font-bold", children: "12" }), _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Risk Score" })] })] }), _jsxs("div", { className: "mt-8 space-y-2 w-full", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Safety Protocols" }), _jsx("span", { className: "text-green-500", children: "94%" })] }), _jsx("div", { className: "w-full h-1 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-green-500 w-[94%]" }) }), _jsxs("div", { className: "flex justify-between text-sm pt-2", children: [_jsx("span", { children: "Data Integrity" }), _jsx("span", { className: "text-luxury-gold", children: "88%" })] }), _jsx("div", { className: "w-full h-1 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-luxury-gold w-[88%]" }) })] })] })] })] }) }), _jsx(TabsContent, { value: "performance", children: _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Regional Performance Metrics" }), _jsx(CardDescription, { children: "Comparative analysis of substation and rider efficiency." })] }), _jsx(CardContent, { className: "h-[400px] flex items-center justify-center text-muted-foreground", children: _jsxs("div", { className: "text-center", children: [_jsx(Activity, { className: "h-12 w-12 mx-auto mb-4 opacity-20" }), _jsx("p", { children: "Advanced performance charts are loading from the Britium Analytics Engine..." })] }) })] }) })] }), _jsxs("div", { className: "flex items-center justify-center gap-2 py-6 border-t border-border/50 opacity-50", children: [_jsx(ShieldCheck, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs uppercase tracking-[0.2em] font-medium", children: "Secure Audit Environment \u2022 Session Active \u2022 \u00A9 2026 Britium Express" })] })] }));
};
export default SupervisorAudit;
