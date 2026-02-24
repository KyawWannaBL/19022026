import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Bell, Plus, Search, BarChart3, Calendar, MoreVertical, Eye, Trash2, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
// Constants for the Obsidian & Gold Theme
const GOLD = "#D4AF37";
const GOLD_GRADIENT = "linear-gradient(135deg, #D4AF37 0%, #F1D279 50%, #B8860B 100%)";
const springPresets = {
    gentle: { type: "spring", stiffness: 100, damping: 15 },
};
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: springPresets.gentle },
};
const CampaignManager = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const campaigns = [
        {
            id: 1,
            name: 'Q1 Premium Loyalty Drive',
            type: 'email',
            status: 'active',
            reach: 12500,
            conversion: 4.8,
            progress: 65,
            lastModified: '2h ago',
            description: 'Exclusive rewards for high-volume merchants and logistics partners.'
        },
        {
            id: 2,
            name: 'Flash Weekend SMS',
            type: 'sms',
            status: 'scheduled',
            reach: 45000,
            conversion: 0,
            progress: 0,
            lastModified: '5h ago',
            description: 'Instant notification for weekend delivery surge discounts.'
        },
        {
            id: 3,
            name: 'App Retention Push',
            type: 'push',
            status: 'completed',
            reach: 8200,
            conversion: 12.4,
            progress: 100,
            lastModified: '1d ago',
            description: 'Re-engagement campaign for inactive courier app users.'
        }
    ];
    const filteredCampaigns = campaigns.filter(c => {
        const matchesTab = activeTab === 'all' || c.type === activeTab;
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });
    return (_jsxs("div", { className: "min-h-screen bg-[#050505] text-white p-6 lg:p-10", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", children: [_jsxs("div", { children: [_jsxs(motion.h1, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "text-4xl font-serif font-bold tracking-tight mb-2", children: ["Campaign ", _jsx("span", { style: { color: GOLD }, children: "Manager" })] }), _jsx("p", { className: "text-white/50 text-sm max-w-md", children: "Orchestrate high-impact marketing across the Britium logistics network." })] }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, children: _jsxs(Button, { className: "h-12 px-6 rounded-full font-bold shadow-lg hover:opacity-90 transition-all border-none", style: { background: GOLD_GRADIENT, color: '#000' }, children: [_jsx(Plus, { className: "w-5 h-5 mr-2" }), "Create Campaign"] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: [
                    { label: 'Total Reach', value: '65.7k', icon: Users, trend: '+12%' },
                    { label: 'Avg. Conversion', value: '8.2%', icon: BarChart3, trend: '+2.4%' },
                    { label: 'Active Tasks', value: '14', icon: Zap, trend: 'Stable' }
                ].map((stat, i) => (_jsx(Card, { className: "bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden", children: _jsxs(CardContent, { className: "p-6 relative", children: [_jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: _jsx(stat.icon, { size: 48, color: GOLD }) }), _jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1", children: stat.label }), _jsxs("div", { className: "flex items-baseline gap-3", children: [_jsx("h3", { className: "text-3xl font-mono font-bold text-white", children: stat.value }), _jsx("span", { className: "text-xs text-emerald-400 font-bold", children: stat.trend })] })] }) }, i))) }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-4 justify-between items-center mb-8", children: [_jsx(Tabs, { defaultValue: "all", className: "w-full lg:w-auto", onValueChange: setActiveTab, children: _jsx(TabsList, { className: "bg-white/5 border border-white/10 p-1 rounded-full h-12", children: ['all', 'email', 'sms', 'push'].map((tab) => (_jsx(TabsTrigger, { value: tab, className: "rounded-full px-6 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black capitalize transition-all", children: tab }, tab))) }) }), _jsxs("div", { className: "relative w-full lg:w-96 group", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#D4AF37] transition-colors" }), _jsx(Input, { placeholder: "Search elite campaigns...", className: "pl-12 h-12 bg-white/5 border-white/10 rounded-full focus-visible:ring-[#D4AF37]/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: _jsx(AnimatePresence, { mode: 'popLayout', children: filteredCampaigns.map((campaign) => (_jsx(motion.div, { variants: staggerItem, layout: true, children: _jsxs(Card, { className: "group relative overflow-hidden bg-white/5 border-white/10 backdrop-blur-2xl hover:border-[#D4AF37]/40 transition-all duration-500 rounded-[1.5rem]", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), _jsxs("div", { className: "p-6 relative z-10", children: [_jsxs("div", { className: "flex justify-between items-start mb-6", children: [_jsx("div", { className: "p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] ring-1 ring-[#D4AF37]/20", children: campaign.type === 'email' ? _jsx(Mail, { size: 20 }) : campaign.type === 'sms' ? _jsx(MessageSquare, { size: 20 }) : _jsx(Bell, { size: 20 }) }), _jsx(Badge, { variant: "outline", className: "border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] font-mono text-[10px] tracking-widest uppercase py-1", children: campaign.status })] }), _jsx("h3", { className: "text-xl font-serif font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors", children: campaign.name }), _jsx("p", { className: "text-xs text-white/50 mb-6 leading-relaxed line-clamp-2", children: campaign.description }), _jsxs("div", { className: "grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mb-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] uppercase tracking-tighter text-[#D4AF37] font-bold mb-1 opacity-70", children: "Reach" }), _jsx("p", { className: "text-xl font-mono text-white", children: campaign.reach.toLocaleString() })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] uppercase tracking-tighter text-[#D4AF37] font-bold mb-1 opacity-70", children: "Conversion" }), _jsxs("p", { className: "text-xl font-mono text-white", children: [campaign.conversion, "%"] })] })] }), _jsxs("div", { className: "space-y-2 mb-6", children: [_jsxs("div", { className: "flex justify-between text-[10px] uppercase tracking-widest font-bold", children: [_jsx("span", { className: "text-white/40", children: "Campaign Progress" }), _jsxs("span", { className: "text-[#D4AF37]", children: [campaign.progress, "%"] })] }), _jsx("div", { className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${campaign.progress}%` }, className: "h-full rounded-full", style: { background: GOLD_GRADIENT } }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-[10px] text-white/30 flex items-center gap-1 uppercase font-bold tracking-tighter", children: [_jsx(Clock, { size: 12 }), " ", campaign.lastModified] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "text-white/50 hover:text-white rounded-full", children: _jsx(MoreVertical, { size: 18 }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "bg-[#121212] border-white/10 text-white shadow-2xl", children: [_jsxs(DropdownMenuItem, { className: "gap-2 focus:bg-white/10 focus:text-[#D4AF37] cursor-pointer", children: [_jsx(Eye, { size: 14 }), " View Insights"] }), _jsxs(DropdownMenuItem, { className: "gap-2 focus:bg-white/10 focus:text-[#D4AF37] cursor-pointer", children: [_jsx(Calendar, { size: 14 }), " Schedule"] }), _jsxs(DropdownMenuItem, { className: "gap-2 text-destructive focus:bg-destructive/10 cursor-pointer", children: [_jsx(Trash2, { size: 14 }), " Delete"] })] })] })] })] })] }) }, campaign.id))) }) }), filteredCampaigns.length === 0 && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "py-32 text-center", children: [_jsx("div", { className: "inline-flex p-6 rounded-full bg-white/5 border border-white/10 mb-6", children: _jsx(Search, { className: "w-10 h-10 text-white/20" }) }), _jsx("h3", { className: "text-2xl font-serif font-bold mb-2", children: "No Match Found" }), _jsx("p", { className: "text-white/40 mb-8 max-w-sm mx-auto text-sm", children: "We couldn't find any elite campaigns matching your criteria. Try refining your search." }), _jsx(Button, { variant: "outline", className: "rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10", onClick: () => { setSearchQuery(''); setActiveTab('all'); }, children: "Reset Filters" })] }))] }));
};
export default CampaignManager;
