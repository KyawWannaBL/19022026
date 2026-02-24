import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ShieldAlert, FileWarning, Printer, ScanFace, TrendingUp, AlertTriangle, Clock, Search, ChevronRight, Eye, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const AuditDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const stats = [
        { label: 'Security Alerts', value: '12', icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
        { label: 'Reprint Requests', value: '45', icon: Printer, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Missing TTs', value: '08', icon: FileWarning, color: 'text-warning', bg: 'bg-warning/10' },
        { label: 'Compliance Score', value: '98.4%', icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
    ];
    const alerts = [
        {
            id: 'AL-1092',
            type: 'FRAUD_SUSPECT',
            severity: 'high',
            message: 'Tamper Tag used out of sequence in Batch-2026-041',
            timestamp: '2026-02-11 14:22:10',
            entityId: 'TT-009281',
            user: 'Rider: J. Doe'
        },
        {
            id: 'AL-1088',
            type: 'GEODEFENCE_VIOLATION',
            severity: 'medium',
            message: 'Warehouse drop-off scan 1.2km outside perimeter',
            timestamp: '2026-02-11 12:15:45',
            entityId: 'AWB-8827110',
            user: 'Rider: K. Smith'
        },
        {
            id: 'AL-1085',
            type: 'EXCESSIVE_REPRINTS',
            severity: 'low',
            message: 'Label printed 4 times for single shipment',
            timestamp: '2026-02-11 10:05:12',
            entityId: 'AWB-9912003',
            user: 'DES: M. Chen'
        }
    ];
    const exceptions = [
        {
            id: 'EXC-221',
            category: 'Condition',
            description: 'Major damage found at WH receiving vs Pickup photo',
            ttId: 'TT-88122',
            status: 'Investigation',
            date: '2026-02-11'
        },
        {
            id: 'EXC-219',
            category: 'TT Missing',
            description: 'Arrived at WH without physical Tamper Tag',
            ttId: 'TT-77192',
            status: 'Supervisor Review',
            date: '2026-02-11'
        }
    ];
    return (_jsxs("div", { className: "space-y-8 pb-12", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Audit & Security Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time oversight of operations and fraud detection metrics." })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", className: "btn-modern", children: [_jsx(FileWarning, { className: "mr-2 h-4 w-4" }), "Export Report"] }), _jsxs(Button, { className: "btn-modern bg-primary", children: [_jsx(ScanFace, { className: "mr-2 h-4 w-4" }), "Run Manual Audit"] })] })] }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: stats.map((stat, i) => (_jsx(Card, { className: "card-modern overflow-hidden", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-xl ${stat.bg}`, children: _jsx(stat.icon, { className: `h-6 w-6 ${stat.color}` }) })] }) }) }, i))) }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [_jsxs(Card, { className: "lg:col-span-2 card-modern", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Security Alerts" }), _jsx(CardDescription, { children: "Suspicious activity flagged by system logic" })] }), _jsxs(Badge, { variant: "outline", className: "bg-destructive/5 text-destructive border-destructive/20", children: [_jsx(AlertTriangle, { className: "mr-1 h-3 w-3" }), alerts.length, " Active"] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-4", children: alerts.map((alert) => (_jsxs("div", { className: "flex items-start gap-4 p-4 rounded-xl border border-border/50 hover:bg-muted/30 transition-colors", children: [_jsx("div", { className: `mt-1 p-2 rounded-lg ${alert.severity === 'high' ? 'bg-destructive/10 text-destructive' : alert.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`, children: _jsx(ShieldAlert, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-semibold text-sm", children: alert.type }), _jsx("span", { className: "text-xs text-muted-foreground", children: alert.timestamp })] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: alert.message }), _jsxs("div", { className: "flex items-center gap-4 mt-3", children: [_jsx("div", { className: "flex items-center gap-1.5", children: _jsx(Badge, { variant: "secondary", className: "text-[10px] font-mono", children: alert.entityId }) }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx("span", { className: "font-medium", children: "User:" }), " ", alert.user] })] })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "shrink-0", children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] }, alert.id))) }), _jsx(Button, { variant: "ghost", className: "w-full mt-4 text-primary text-sm font-medium", children: "View All Security Alerts" })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Operational Health" }), _jsx(CardDescription, { children: "Live station & route metrics" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "TT Registration Lag" }), _jsx("span", { className: "font-medium", children: "12 min avg" })] }), _jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-success w-[85%]" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Label Activation Rate" }), _jsx("span", { className: "font-medium", children: "99.2%" })] }), _jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-primary w-[99%]" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "WH Scan Accuracy" }), _jsx("span", { className: "font-medium", children: "94.5%" })] }), _jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-warning w-[94%]" }) })] }), _jsxs("div", { className: "pt-4 border-t border-border", children: [_jsx("h4", { className: "text-sm font-semibold mb-3", children: "Station Load" }), _jsx("div", { className: "space-y-3", children: ['North Hub', 'Central WH', 'East Substation'].map((station) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs", children: station }), _jsx(Badge, { variant: "secondary", className: "text-[10px]", children: "OPTIMAL" })] }, station))) })] })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Exception Logs" }), _jsx(CardDescription, { children: "Discrepancies found during node reconciliation" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search logs...", className: "pl-9 bg-muted/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Select, { defaultValue: "all", children: [_jsx(SelectTrigger, { className: "w-[140px] bg-muted/50", children: _jsx(SelectValue, { placeholder: "Category" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Types" }), _jsx(SelectItem, { value: "damage", children: "Damage" }), _jsx(SelectItem, { value: "missing", children: "Missing TT" }), _jsx(SelectItem, { value: "shortage", children: "Shortage" })] })] })] })] }) }), _jsxs(CardContent, { children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Log ID" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { children: "Description" }), _jsx(TableHead, { children: "Tamper Tag" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: exceptions.map((exc) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono font-medium text-xs", children: exc.id }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "bg-muted/50", children: exc.category }) }), _jsx(TableCell, { className: "max-w-xs truncate text-sm text-muted-foreground", children: exc.description }), _jsx(TableCell, { className: "font-mono text-xs", children: exc.ttId }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-warning animate-pulse" }), _jsx("span", { className: "text-xs", children: exc.status })] }) }), _jsx(TableCell, { className: "text-xs text-muted-foreground", children: exc.date }), _jsxs(TableCell, { className: "text-right", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 px-2", children: [_jsx(Eye, { className: "h-4 w-4 mr-1" }), " View"] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-destructive", children: [_jsx(Lock, { className: "h-4 w-4 mr-1" }), " Block"] })] })] }, exc.id))) })] }), _jsxs("div", { className: "flex items-center justify-between mt-4 text-xs text-muted-foreground", children: [_jsx("span", { children: "Showing 2 of 12 active exceptions" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", children: "Next" })] })] })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsx(Card, { className: "card-modern border-primary/20 bg-primary/5", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 rounded-xl bg-primary text-primary-foreground", children: _jsx(TrendingUp, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold", children: "Fraud Score Summary" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Overall risk index is ", _jsx("span", { className: "text-success font-semibold", children: "LOW (1.2)" }), " based on current cycle analysis."] })] }), _jsx(Button, { variant: "link", className: "ml-auto text-primary", children: "Detailed Analytics" })] }) }), _jsx(Card, { className: "card-modern border-warning/20 bg-warning/5", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 rounded-xl bg-warning text-warning-foreground", children: _jsx(Clock, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold", children: "SLA Compliance Watch" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Substation reconciliation lagging in ", _jsx("span", { className: "text-destructive font-semibold", children: "3 nodes" }), "."] })] }), _jsx(Button, { variant: "link", className: "ml-auto text-warning", children: "Investigate" })] }) })] })] }));
};
export default AuditDashboard;
