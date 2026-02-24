import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Shield, Search, FileText, User as UserIcon, Activity, Download, RefreshCw, Eye, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { format } from 'date-fns';
const AuditLogs = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [resourceFilter, setResourceFilter] = useState('all');
    const [selectedLog, setSelectedLog] = useState(null);
    // Translations dictionary
    const dict = {
        en: {
            title: 'System Audit Logs',
            subtitle: 'Track system activity, security events, and compliance across the platform.',
            searchPlaceholder: 'Search by user or action...',
            action: 'Action',
            resource: 'Resource',
            user: 'User',
            timestamp: 'Timestamp',
            details: 'Details',
            ipAddress: 'IP Address',
            export: 'Export CSV',
            refresh: 'Refresh',
            noLogs: 'No audit logs found matching criteria.',
            metadata: 'Metadata',
            all: 'All Types'
        },
        my: {
            title: 'စနစ်စစ်ဆေးမှု မှတ်တမ်းများ',
            subtitle: 'ပလက်ဖောင်းတစ်လျှောက် စနစ်လှုပ်ရှားမှု၊ လုံခြုံရေးနှင့် လိုက်နာမှုများကို ခြေရာခံပါ။',
            searchPlaceholder: 'အသုံးပြုသူ သို့မဟုတ် လုပ်ဆောင်ချက်ဖြင့် ရှာဖွေပါ...',
            action: 'လုပ်ဆောင်ချက်',
            resource: 'အရင်းအမြစ်',
            user: 'အသုံးပြုသူ',
            timestamp: 'အချိန်',
            details: 'အသေးစိတ်',
            ipAddress: 'IP လိပ်စာ',
            export: 'CSV ထုတ်ယူရန်',
            refresh: 'အသစ်ပြန်လုပ်ရန်',
            noLogs: 'ကိုက်ညီသော မှတ်တမ်းများ မတွေ့ပါ။',
            metadata: 'အချက်အလက်များ',
            all: 'အားလုံး'
        }
    };
    const l = language === 'my' ? dict.my : dict.en;
    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const filters = {
                limit: 100
            };
            if (actionFilter !== 'all')
                filters.action = actionFilter;
            if (resourceFilter !== 'all')
                filters.resource_type = resourceFilter;
            const { data, error } = await logisticsAPI.getAuditLogs(filters);
            if (error)
                throw error;
            setLogs(data || []);
        }
        catch (error) {
            console.error('Error fetching audit logs:', error);
            toast.error('Failed to load audit logs');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchLogs();
    }, [actionFilter, resourceFilter]);
    const getActionBadge = (action) => {
        const a = action.toLowerCase();
        if (a.includes('create') || a.includes('add'))
            return _jsx(Badge, { className: "bg-green-500/20 text-green-500 border-green-500/30", children: "CREATE" });
        if (a.includes('delete') || a.includes('remove'))
            return _jsx(Badge, { variant: "destructive", children: "DELETE" });
        if (a.includes('update') || a.includes('edit'))
            return _jsx(Badge, { className: "bg-blue-500/20 text-blue-500 border-blue-500/30", children: "UPDATE" });
        if (a.includes('login') || a.includes('auth'))
            return _jsx(Badge, { className: "bg-luxury-gold/20 text-luxury-gold border-luxury-gold/30", children: "SECURITY" });
        return _jsx(Badge, { variant: "outline", children: action.toUpperCase() });
    };
    const filteredLogs = logs.filter(log => log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.resource_type?.toLowerCase().includes(searchQuery.toLowerCase()));
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-foreground flex items-center gap-3", children: [_jsx(Shield, { className: "w-8 h-8 text-luxury-gold" }), l.title] }), _jsx("p", { className: "text-muted-foreground mt-1", children: l.subtitle })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "border-luxury-gold/20 hover:bg-luxury-gold/10", onClick: fetchLogs, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}` }), l.refresh] }), _jsxs(Button, { variant: "outline", size: "sm", className: "border-luxury-gold/20 hover:bg-luxury-gold/10", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), l.export] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Total Events" }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: logs.length })] }), _jsx(Activity, { className: "w-8 h-8 text-luxury-gold opacity-50" })] }) }) }), _jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Security Alerts" }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-destructive", children: logs.filter(log => log.action.toLowerCase().includes('auth')).length })] }), _jsx(Shield, { className: "w-8 h-8 text-destructive opacity-50" })] }) }) }), _jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Active Users" }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: new Set(logs.map(log => log.user_id)).size })] }), _jsx(UserIcon, { className: "w-8 h-8 text-primary opacity-50" })] }) }) }), _jsx(Card, { className: "luxury-card", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "System Health" }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-green-500", children: "Operational" })] }), _jsx(AlertCircle, { className: "w-8 h-8 text-green-500 opacity-50" })] }) }) })] }), _jsx(Card, { className: "luxury-card border-luxury-gold/10", children: _jsxs(CardContent, { className: "p-4 flex flex-col md:flex-row gap-4 items-end", children: [_jsxs("div", { className: "flex-1 space-y-1.5 w-full", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: l.searchPlaceholder }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: l.searchPlaceholder, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-background/50 border-luxury-gold/20 focus:border-luxury-gold" })] })] }), _jsxs("div", { className: "w-full md:w-48 space-y-1.5", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: l.action }), _jsxs(Select, { value: actionFilter, onValueChange: setActionFilter, children: [_jsx(SelectTrigger, { className: "bg-background/50 border-luxury-gold/20", children: _jsx(SelectValue, { placeholder: "Filter Action" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: l.all }), _jsx(SelectItem, { value: "LOGIN", children: "Login Events" }), _jsx(SelectItem, { value: "CREATE", children: "Creation" }), _jsx(SelectItem, { value: "UPDATE", children: "Modification" }), _jsx(SelectItem, { value: "DELETE", children: "Deletion" })] })] })] }), _jsxs("div", { className: "w-full md:w-48 space-y-1.5", children: [_jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: l.resource }), _jsxs(Select, { value: resourceFilter, onValueChange: setResourceFilter, children: [_jsx(SelectTrigger, { className: "bg-background/50 border-luxury-gold/20", children: _jsx(SelectValue, { placeholder: "Filter Resource" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: l.all }), _jsx(SelectItem, { value: "SHIPMENT", children: "Shipments" }), _jsx(SelectItem, { value: "USER", children: "Users" }), _jsx(SelectItem, { value: "MERCHANT", children: "Merchants" }), _jsx(SelectItem, { value: "FINANCE", children: "Finance" })] })] })] })] }) }), _jsx(Card, { className: "luxury-card overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30", children: _jsxs(TableRow, { className: "border-luxury-gold/10", children: [_jsx(TableHead, { className: "w-[180px]", children: l.timestamp }), _jsx(TableHead, { children: l.user }), _jsx(TableHead, { children: l.action }), _jsx(TableHead, { children: l.resource }), _jsx(TableHead, { children: l.ipAddress }), _jsx(TableHead, { className: "text-right", children: l.details })] }) }), _jsx(TableBody, { children: isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(TableRow, { className: "animate-pulse border-luxury-gold/5", children: _jsx(TableCell, { colSpan: 6, className: "h-12 bg-muted/10" }) }, i)))) : filteredLogs.length > 0 ? (filteredLogs.map((log) => (_jsxs(TableRow, { className: "hover:bg-luxury-gold/5 border-luxury-gold/5 transition-colors group", children: [_jsx(TableCell, { className: "font-mono text-xs", children: format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss') }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: log.user?.full_name || 'System' }), _jsx("span", { className: "text-xs text-muted-foreground", children: log.user?.email || 'automated-task' })] }) }), _jsx(TableCell, { children: getActionBadge(log.action) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: log.resource_type }), _jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [log.resource_id?.substring(0, 8), "..."] })] }) }), _jsx(TableCell, { className: "font-mono text-xs text-muted-foreground", children: log.ip_address || 'Internal' }), _jsx(TableCell, { className: "text-right", children: _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:text-luxury-gold hover:bg-luxury-gold/10", onClick: () => setSelectedLog(log), children: _jsx(Eye, { className: "w-4 h-4" }) }) }), _jsxs(DialogContent, { className: "luxury-card border-luxury-gold/20 max-w-2xl", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-luxury-gold flex items-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5" }), l.metadata] }), _jsxs(DialogDescription, { children: ["Complete event trace for log ID: ", selectedLog?.id] })] }), _jsx(ScrollArea, { className: "h-[400px] w-full rounded-md border border-luxury-gold/10 bg-black/40 p-4", children: _jsx("pre", { className: "text-xs font-mono text-luxury-gold/80 whitespace-pre-wrap", children: JSON.stringify(selectedLog, null, 2) }) })] })] }) })] }, log.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-32 text-center text-muted-foreground italic", children: l.noLogs }) })) })] }) }) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mt-4 px-2", children: [_jsx("p", { children: "\u00A9 2026 Britium Express. All system actions are cryptographically logged." }), _jsx("p", { children: "Retention Policy: 365 Days" })] })] }));
};
export default AuditLogs;
