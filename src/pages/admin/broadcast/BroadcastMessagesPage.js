import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Send, History, Bell, Users, CheckCircle, Clock, Search, Plus, Filter, MoreVertical, Eye, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
const BroadcastMessagesPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    // Mock data for recent broadcasts
    const recentBroadcasts = [
        {
            id: 'BC-001',
            title: 'New Service Zone: Mandalay',
            content: 'We are excited to announce our expansion into Mandalay...',
            receiverNames: t('broadcast.allUsers'),
            status: 'Sent',
            date: '2026-02-03 14:30',
            reach: '1,240',
        },
        {
            id: 'BC-002',
            title: 'Merchant System Maintenance',
            content: 'Scheduled maintenance for the merchant portal tonight...',
            receiverNames: t('broadcast.merchants'),
            status: 'Scheduled',
            date: '2026-02-05 22:00',
            reach: '450',
        },
        {
            id: 'BC-003',
            title: 'Rider Incentive Program Update',
            content: 'New commission rates for express deliveries starting...',
            receiverNames: t('broadcast.deliverymen'),
            status: 'Sent',
            date: '2026-02-01 09:15',
            reach: '890',
        },
        {
            id: 'BC-004',
            title: 'Chinese New Year Holiday Notice',
            content: 'Operational hours during the upcoming holiday period...',
            receiverNames: t('broadcast.customers'),
            status: 'Draft',
            date: '2026-02-04 05:15',
            reach: '0',
        },
    ];
    const stats = [
        {
            label: t('broadcast.title'),
            value: '156',
            icon: Bell,
            color: 'text-gold-500',
            bg: 'bg-gold-500/10',
        },
        {
            label: t('broadcast.scheduledMessages'),
            value: '12',
            icon: Clock,
            color: 'text-info',
            bg: 'bg-info/10',
        },
        {
            label: 'Total Recipients',
            value: '12.4k',
            icon: Users,
            color: 'text-success',
            bg: 'bg-success/10',
        },
        {
            label: 'Success Rate',
            value: '99.8%',
            icon: CheckCircle,
            color: 'text-primary',
            bg: 'bg-primary/10',
        },
    ];
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900", children: t('broadcast.title') }), _jsxs("p", { className: "text-muted-foreground", children: [t('broadcast.messageContent'), " & Notifications"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { asChild: true, variant: "outline", className: "border-gold-500 text-gold-600 hover:bg-gold-50", children: _jsxs(Link, { to: ROUTE_PATHS.BROADCAST_MESSAGE_HISTORY, children: [_jsx(History, { className: "mr-2 h-4 w-4" }), t('broadcast.messageHistory')] }) }), _jsx(Button, { asChild: true, className: "luxury-button", children: _jsxs(Link, { to: ROUTE_PATHS.BROADCAST_SEND_MESSAGE, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), t('broadcast.sendMessage')] }) })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "lotus-glow transition-all duration-300 hover:shadow-lg border-gold-400/20", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-navy-900", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-xl ${stat.bg}`, children: _jsx(stat.icon, { className: `h-6 w-6 ${stat.color}` }) })] }) }) }) }, index))) }), _jsxs(Card, { className: "border-none shadow-xl bg-white/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "pb-4 border-b", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: t('broadcast.messageHistory') }), _jsx(CardDescription, { children: "Review and manage your system-wide announcements" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search'), className: "pl-10 bg-muted/50 border-none focus-visible:ring-gold-500" })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[100px]", children: "ID" }), _jsx(TableHead, { children: t('common.date') }), _jsx(TableHead, { children: t('broadcast.messageContent') }), _jsx(TableHead, { children: t('broadcast.receiverNames') }), _jsx(TableHead, { children: t('tracking.status') }), _jsx(TableHead, { className: "text-right", children: "Reach" }), _jsx(TableHead, { className: "w-[50px]" })] }) }), _jsx(TableBody, { children: recentBroadcasts.map((bc) => (_jsxs(TableRow, { className: "hover:bg-navy-50/30 transition-colors", children: [_jsx(TableCell, { className: "font-mono text-xs font-bold", children: bc.id }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Calendar, { className: "h-3 w-3 text-muted-foreground" }), bc.date] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold text-navy-900", children: bc.title }), _jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[300px]", children: bc.content })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "bg-navy-50 text-navy-700 border-navy-200", children: bc.receiverNames }) }), _jsx(TableCell, { children: _jsx(Badge, { className: `
                        ${bc.status === 'Sent'
                                                        ? 'bg-success/10 text-success border-success/20'
                                                        : bc.status === 'Scheduled'
                                                            ? 'bg-info/10 text-info border-info/20'
                                                            : 'bg-muted text-muted-foreground border-border'}
                      `, children: bc.status }) }), _jsx(TableCell, { className: "text-right font-medium", children: bc.reach }), _jsx(TableCell, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Eye, { className: "mr-2 h-4 w-4" }), t('common.view')] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), "Resend"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer text-destructive", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), t('common.delete')] })] })] }) })] }, bc.id))) })] }) }), _jsxs("div", { className: "p-4 border-t flex items-center justify-between text-sm text-muted-foreground", children: [_jsx("p", { children: "Showing 1 to 4 of 156 entries" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: t('common.previous') }), _jsx(Button, { variant: "outline", size: "sm", children: t('common.next') })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6 flex items-start gap-4", children: [_jsx("div", { className: "p-3 rounded-full bg-gold-500/20", children: _jsx(Bell, { className: "h-6 w-6 text-gold-400" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold text-gold-400 mb-1", children: "Broadcast Best Practices" }), _jsx("p", { className: "text-navy-100 text-sm opacity-80", children: "Keep your messages concise and actionable. Use clear subject lines to improve open rates across the network." })] })] }) }), _jsx(Card, { className: "lotus-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6 flex items-start gap-4", children: [_jsx("div", { className: "p-3 rounded-full bg-navy-500/20", children: _jsx(Users, { className: "h-6 w-6 text-navy-200" }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-bold text-navy-200 mb-1", children: "Segmentation Power" }), _jsx("p", { className: "text-navy-100 text-sm opacity-80", children: "Target specific user groups to ensure high relevance. Deliverymen care about route updates, while merchants care about billing." })] })] }) })] })] }));
};
export default BroadcastMessagesPage;
