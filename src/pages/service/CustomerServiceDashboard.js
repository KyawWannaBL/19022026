import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MessageSquare, LifeBuoy, TrendingUp, AlertCircle, Clock, CheckCircle2, Search, Filter, ChevronRight, ShieldAlert, Zap, BarChart3, Smile } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
const CustomerServiceDashboard = () => {
    const { user, legacyUser } = useAuth();
    const [activeTab, setActiveTab] = useState('tickets');
    // Mock data representing 2026 AI-augmented service metrics
    const serviceMetrics = {
        avgResponseTime: '1m 42s',
        resolvedToday: 142,
        activeChats: 8,
        satisfactionScore: 4.8,
        escalationRate: '2.4%'
    };
    const mockTickets = [
        {
            id: 'TCK-2026-8812',
            subject: 'Delayed Shipment - Electronics',
            customer: 'Sarah Jenkins',
            priority: 'High',
            status: 'Open',
            sentiment: 'Frustrated',
            time: '12m ago',
            assignedTo: 'Me'
        },
        {
            id: 'TCK-2026-8815',
            subject: 'Address Modification Request',
            customer: 'Global Tech Corp',
            priority: 'Medium',
            status: 'Pending',
            sentiment: 'Neutral',
            time: '45m ago',
            assignedTo: 'Unassigned'
        },
        {
            id: 'TCK-2026-8818',
            subject: 'Damaged Parcel Claim',
            customer: 'Mike Ross',
            priority: 'Critical',
            status: 'Escalated',
            sentiment: 'Angry',
            time: '2h ago',
            assignedTo: 'Senior Lead'
        },
        {
            id: 'TCK-2026-8820',
            subject: 'COD Refund Status',
            customer: 'Amanda Lee',
            priority: 'Low',
            status: 'Open',
            sentiment: 'Curious',
            time: '5m ago',
            assignedTo: 'Me'
        }
    ];
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-destructive/20 text-destructive border-destructive/30';
            case 'High': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
            case 'Medium': return 'bg-primary/20 text-primary border-primary/30';
            default: return 'bg-muted text-muted-foreground';
        }
    };
    const getSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'Frustrated': return _jsx(Smile, { className: "w-4 h-4 text-orange-500 rotate-180" });
            case 'Angry': return _jsx(AlertCircle, { className: "w-4 h-4 text-destructive" });
            case 'Neutral': return _jsx(Smile, { className: "w-4 h-4 text-muted-foreground" });
            default: return _jsx(Smile, { className: "w-4 h-4 text-primary" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", children: "Service Command Center" }), _jsxs("p", { className: "text-muted-foreground mt-1 flex items-center gap-2", children: [_jsx(Zap, { className: "w-4 h-4 text-primary" }), "AI-Assisted Support Intelligence Dashboard \u2022 Feb 11, 2026"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "gap-2", children: [_jsx(Filter, { className: "w-4 h-4" }), "Filters"] }), _jsxs(Button, { className: "gap-2 shadow-lg shadow-primary/20", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), "Go to Live Chat"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Avg. Response Time" }), _jsx("p", { className: "text-2xl font-bold font-mono", children: serviceMetrics.avgResponseTime })] }), _jsx("div", { className: "p-3 bg-primary/10 rounded-xl", children: _jsx(Clock, { className: "w-6 h-6 text-primary" }) })] }), _jsxs("div", { className: "mt-4", children: [_jsx(Progress, { value: 85, className: "h-1" }), _jsx("p", { className: "text-[10px] mt-2 text-primary", children: "Top 5% of industry average" })] })] }) }), _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Resolved Today" }), _jsx("p", { className: "text-2xl font-bold font-mono", children: serviceMetrics.resolvedToday })] }), _jsx("div", { className: "p-3 bg-emerald-500/10 rounded-xl", children: _jsx(CheckCircle2, { className: "w-6 h-6 text-emerald-500" }) })] }), _jsxs("div", { className: "mt-4 flex items-center gap-2 text-emerald-500", children: [_jsx(TrendingUp, { className: "w-4 h-4" }), _jsx("span", { className: "text-xs font-medium", children: "+12% from yesterday" })] })] }) }), _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Active Chats" }), _jsx("p", { className: "text-2xl font-bold font-mono", children: serviceMetrics.activeChats })] }), _jsx("div", { className: "p-3 bg-blue-500/10 rounded-xl", children: _jsx(MessageSquare, { className: "w-6 h-6 text-blue-500" }) })] }), _jsx("div", { className: "mt-4", children: _jsxs("div", { className: "flex -space-x-2", children: [[1, 2, 3, 4].map((i) => (_jsx(Avatar, { className: "border-2 border-background w-6 h-6", children: _jsxs(AvatarFallback, { className: "text-[10px]", children: ["U", i] }) }, i))), _jsx("div", { className: "w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold border-2 border-background", children: "+4" })] }) })] }) }), _jsx(Card, { className: "card-modern", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Escalation Rate" }), _jsx("p", { className: "text-2xl font-bold font-mono", children: serviceMetrics.escalationRate })] }), _jsx("div", { className: "p-3 bg-orange-500/10 rounded-xl", children: _jsx(ShieldAlert, { className: "w-6 h-6 text-orange-500" }) })] }), _jsx("div", { className: "mt-4", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Target: < 3.0%" }) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs(TabsList, { className: "bg-muted/50 p-1", children: [_jsxs(TabsTrigger, { value: "tickets", className: "gap-2", children: [_jsx(LifeBuoy, { className: "w-4 h-4" }), "Tickets"] }), _jsxs(TabsTrigger, { value: "escalations", className: "gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-orange-500" }), "Escalations"] }), _jsxs(TabsTrigger, { value: "resolved", className: "gap-2", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), "Resolved"] })] }), _jsxs("div", { className: "relative hidden md:block w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search tickets or AWB...", className: "pl-10 h-9 bg-muted/30 border-none" })] })] }), _jsx(TabsContent, { value: "tickets", className: "m-0", children: _jsx(Card, { className: "card-glass border-none shadow-none", children: _jsxs(Table, { className: "table-modern", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Ticket ID" }), _jsx(TableHead, { children: "Subject & Sentiment" }), _jsx(TableHead, { children: "Priority" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Time" }), _jsx(TableHead, { className: "text-right" })] }) }), _jsx(TableBody, { children: mockTickets.map((ticket) => (_jsxs(TableRow, { className: "group cursor-pointer hover:bg-muted/30", children: [_jsx(TableCell, { className: "font-mono text-xs font-semibold", children: ticket.id }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium truncate max-w-[200px]", children: ticket.subject }), _jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [getSentimentIcon(ticket.sentiment), _jsxs("span", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: ["AI Sentiment: ", ticket.sentiment] })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: getPriorityColor(ticket.priority), children: ticket.priority }) }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: ticket.customer }), _jsx(TableCell, { className: "text-sm text-muted-foreground", children: ticket.time }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }) })] }, ticket.id))) })] }) }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "card-modern overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-4 h-4 text-primary" }), _jsx(CardTitle, { className: "text-base", children: "Agent Performance" })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "SLA Adherence" }), _jsx("span", { className: "font-bold", children: "98.2%" })] }), _jsx(Progress, { value: 98, className: "h-1.5 bg-emerald-500/10", children: _jsx("div", { className: "h-full bg-emerald-500 rounded-full", style: { width: '98.2%' } }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Daily Resolution Target" }), _jsx("span", { className: "font-bold", children: "142/200" })] }), _jsx(Progress, { value: 71, className: "h-1.5 bg-blue-500/10", children: _jsx("div", { className: "h-full bg-blue-500 rounded-full", style: { width: '71%' } }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-muted-foreground", children: "Knowledge Base Contribution" }), _jsx("span", { className: "font-bold", children: "4 High Impact" })] }), _jsx(Progress, { value: 40, className: "h-1.5 bg-orange-500/10", children: _jsx("div", { className: "h-full bg-orange-500 rounded-full", style: { width: '40%' } }) })] })] })] }), _jsxs(Card, { className: "card-modern bg-primary/5 border-primary/20", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [_jsx(Zap, { className: "w-4 h-4 text-primary" }), "AI Quick-Insight"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("p", { className: "text-xs leading-relaxed text-muted-foreground", children: ["Spike in ", _jsx("span", { className: "text-primary font-medium", children: "Address Modification" }), " tickets detected from ", _jsx("span", { className: "text-foreground font-semibold", children: "North District" }), ". Likely due to recent mapping updates in the delivery app."] }), _jsx(Button, { variant: "secondary", size: "sm", className: "w-full text-xs", children: "View Suggested FAQ Update" })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base", children: "Critical Escalations" }) }), _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-[200px]", children: [1, 2, 3].map((i) => (_jsxs("div", { className: "p-4 flex items-start gap-3 border-b border-border/50 last:border-none", children: [_jsx("div", { className: "p-2 bg-destructive/10 rounded-lg", children: _jsx(ShieldAlert, { className: "w-4 h-4 text-destructive" }) }), _jsxs("div", { className: "space-y-1", children: [_jsxs("p", { className: "text-sm font-semibold", children: ["Payment Dispute #X", i, "2"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Waiting for Finance Admin approval for 4h" }), _jsx(Button, { variant: "link", className: "p-0 h-auto text-[10px] text-primary", children: "View Details" })] })] }, i))) }) })] })] })] })] }));
};
export default CustomerServiceDashboard;
