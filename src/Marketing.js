import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Megaphone, TrendingUp, Users, Target, BarChart3, Calendar, Plus, Search, Filter, ArrowUpRight, MessageSquare, Mail, Share2, Percent, Gift, ChevronRight } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
const CAMPAIGN_DATA = [
    { name: 'Summer Delivery', reach: 4500, conversion: 12.5, roi: 3.2, status: 'Active', type: 'Email' },
    { name: 'Merchant Welcome', reach: 1200, conversion: 28.4, roi: 5.1, status: 'Active', type: 'System' },
    { name: 'New Year Special', reach: 8900, conversion: 8.2, roi: 2.1, status: 'Completed', type: 'SMS' },
    { name: 'Loyalty Program', reach: 3400, conversion: 15.7, roi: 4.5, status: 'Active', type: 'Social' },
];
const ACQUISITION_DATA = [
    { month: 'Jan', organic: 400, referral: 240, paid: 200 },
    { month: 'Feb', organic: 300, referral: 139, paid: 221 },
    { month: 'Mar', organic: 200, referral: 980, paid: 229 },
    { month: 'Apr', organic: 278, referral: 390, paid: 200 },
    { month: 'May', organic: 189, referral: 480, paid: 218 },
    { month: 'Jun', organic: 239, referral: 380, paid: 250 },
];
const CUSTOMER_SEGMENTS = [
    { name: 'VIP Merchants', value: 400, color: '#D4AF37' },
    { name: 'E-commerce', value: 300, color: '#B8941F' },
    { name: 'Retailers', value: 300, color: '#1A1D23' },
    { name: 'Individual', value: 200, color: '#454545' },
];
const Marketing = () => {
    const { user } = useAuth();
    const { language, t } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');
    const isMyanmar = language === 'my';
    const metrics = [
        {
            title: isMyanmar ? 'စုစုပေါင်း ကမ်ပိန်းများ' : 'Total Campaigns',
            value: '24',
            change: '+12%',
            icon: Megaphone,
            color: 'text-luxury-gold'
        },
        {
            title: isMyanmar ? 'ပြောင်းလဲမှုနှုန်း' : 'Conversion Rate',
            value: '18.4%',
            change: '+2.4%',
            icon: Target,
            color: 'text-green-500'
        },
        {
            title: isMyanmar ? 'အသစ်ရရှိသော ဖောက်သည်များ' : 'New Customers',
            value: '1,284',
            change: '+8%',
            icon: Users,
            color: 'text-blue-500'
        },
        {
            title: isMyanmar ? 'ရင်းနှီးမြှုပ်နှံမှု အကျိုးအမြတ်' : 'Marketing ROI',
            value: '4.2x',
            change: '+0.5x',
            icon: TrendingUp,
            color: 'text-luxury-gold'
        }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-foreground flex items-center gap-3", children: [_jsx(Megaphone, { className: "w-8 h-8 text-luxury-gold" }), isMyanmar ? 'စျေးကွက်မြှင့်တင်ရေး ဒိုင်ခွက်' : 'Marketing Command Center'] }), _jsx("p", { className: "text-muted-foreground mt-1", children: isMyanmar ? 'ကမ်ပိန်းများနှင့် ဖောက်သည်ခွဲခြမ်းစိတ်ဖြာမှုကို စီမံခန့်ခွဲပါ' : 'Manage campaigns and customer growth analytics' })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-luxury-gold/20 hover:bg-luxury-gold/10", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), isMyanmar ? 'အစီရင်ခံစာထုတ်ရန်' : 'Export Report'] }), _jsxs(Button, { className: "luxury-button shadow-luxury", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), isMyanmar ? 'ကမ်ပိန်းအသစ်' : 'New Campaign'] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: metrics.map((metric, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: `p-3 rounded-2xl bg-muted/50 ${metric.color}`, children: _jsx(metric.icon, { className: "w-6 h-6" }) }), _jsx(Badge, { variant: "secondary", className: "bg-green-500/10 text-green-500 border-none font-mono", children: metric.change })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: metric.title }), _jsx("h3", { className: "text-2xl font-bold mt-1 font-mono", children: metric.value })] })] }) }) }, idx))) }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full space-y-6", onValueChange: setActiveTab, children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs(TabsList, { className: "bg-muted/50 border border-border/50 p-1 rounded-xl", children: [_jsx(TabsTrigger, { value: "overview", className: "rounded-lg px-6", children: isMyanmar ? 'ခြုံငုံသုံးသပ်ချက်' : 'Overview' }), _jsx(TabsTrigger, { value: "campaigns", className: "rounded-lg px-6", children: isMyanmar ? 'ကမ်ပိန်းများ' : 'Campaigns' }), _jsx(TabsTrigger, { value: "tools", className: "rounded-lg px-6", children: isMyanmar ? 'ကိရိယာများ' : 'Tools' })] }) }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: isMyanmar ? 'ဖောက်သည်ရရှိမှု အခြေအနေ' : 'Customer Acquisition Growth' }), _jsx(CardDescription, { children: isMyanmar ? 'လအလိုက် ရရှိမှုလမ်းကြောင်းများ' : 'Acquisition channels performance over time' })] }), _jsx(CardContent, { className: "h-[350px] pt-0", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: ACQUISITION_DATA, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorOrganic", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#D4AF37", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#D4AF37", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "rgba(255,255,255,0.05)" }), _jsx(XAxis, { dataKey: "month", axisLine: false, tickLine: false }), _jsx(YAxis, { axisLine: false, tickLine: false }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#0B0C10', borderColor: '#D4AF37', color: '#FAF9F6' }, itemStyle: { color: '#D4AF37' } }), _jsx(Area, { type: "monotone", dataKey: "organic", stroke: "#D4AF37", fillOpacity: 1, fill: "url(#colorOrganic)", strokeWidth: 3 }), _jsx(Area, { type: "monotone", dataKey: "referral", stroke: "#454545", fillOpacity: 0, strokeWidth: 2 })] }) }) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: isMyanmar ? 'ဖောက်သည် အပိုင်းကဏ္ဍများ' : 'Customer Segments' }), _jsx(CardDescription, { children: isMyanmar ? 'လုပ်ငန်းအမျိုးအစားအလိုက် ခွဲခြားမှု' : 'Distribution by business type' })] }), _jsxs(CardContent, { className: "h-[300px] flex flex-col items-center justify-center", children: [_jsx(ResponsiveContainer, { width: "100%", height: "80%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: CUSTOMER_SEGMENTS, innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: CUSTOMER_SEGMENTS.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "w-full grid grid-cols-2 gap-2 mt-4 text-xs", children: CUSTOMER_SEGMENTS.map((segment, idx) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: segment.color } }), _jsx("span", { className: "text-muted-foreground", children: segment.name })] }, idx))) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: isMyanmar ? 'အီးမေးလ် ပေးပို့မှု' : 'Email Campaigns' }), _jsx(Mail, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono", children: "92.4%" }), _jsx("p", { className: "text-xs text-muted-foreground", children: isMyanmar ? 'ဖွင့်ကြည့်နှုန်း (Delivery rate)' : 'Average delivery rate' }), _jsx(Progress, { value: 92.4, className: "h-1.5 mt-4" })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: isMyanmar ? 'SMS ပေးပို့မှု' : 'SMS Marketing' }), _jsx(MessageSquare, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono", children: "12,400" }), _jsx("p", { className: "text-xs text-muted-foreground", children: isMyanmar ? 'ယခုလ ပေးပို့ပြီးအရေအတွက်' : 'Messages sent this month' }), _jsxs("div", { className: "flex items-center gap-2 mt-4 text-green-500 text-xs font-mono", children: [_jsx(ArrowUpRight, { className: "w-3 h-3" }), " +15.2%"] })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: isMyanmar ? 'လူမှုကွန်ရက် မျှဝေမှု' : 'Social Engagement' }), _jsx(Share2, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono", children: "8.5k" }), _jsx("p", { className: "text-xs text-muted-foreground", children: isMyanmar ? 'စုစုပေါင်း တုံ့ပြန်မှု' : 'Total social interactions' }), _jsxs("div", { className: "flex items-center gap-2 mt-4 text-luxury-gold text-xs font-mono", children: [_jsx(TrendingUp, { className: "w-3 h-3" }), " ", isMyanmar ? 'အကောင်းဆုံး' : 'Trending'] })] })] })] })] }), _jsx(TabsContent, { value: "campaigns", className: "space-y-6", children: _jsxs(Card, { className: "luxury-card overflow-hidden", children: [_jsxs("div", { className: "p-4 border-b border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/20", children: [_jsxs("div", { className: "relative w-full md:w-96", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: isMyanmar ? 'ရှာဖွေပါ...' : 'Search campaigns...', className: "pl-10 bg-background" })] }), _jsxs("div", { className: "flex items-center gap-2 w-full md:w-auto", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), " Filter"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), " Date"] })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left", children: [_jsx("thead", { className: "bg-muted/30 text-muted-foreground font-medium border-b border-border/50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'ကမ်ပိန်းအမည်' : 'Campaign Name' }), _jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'အမျိုးအစား' : 'Channel' }), _jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'ရောက်ရှိမှု' : 'Reach' }), _jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'ပြောင်းလဲမှု' : 'Conv. %' }), _jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'ROI' : 'ROI' }), _jsx("th", { className: "px-6 py-4", children: isMyanmar ? 'အခြေအနေ' : 'Status' }), _jsx("th", { className: "px-6 py-4 text-right" })] }) }), _jsx("tbody", { className: "divide-y divide-border/30", children: CAMPAIGN_DATA.map((campaign, i) => (_jsxs("tr", { className: "hover:bg-muted/10 transition-colors group", children: [_jsx("td", { className: "px-6 py-4 font-medium", children: campaign.name }), _jsx("td", { className: "px-6 py-4", children: _jsx(Badge, { variant: "outline", className: "font-mono uppercase text-[10px]", children: campaign.type }) }), _jsx("td", { className: "px-6 py-4 font-mono", children: campaign.reach.toLocaleString() }), _jsxs("td", { className: "px-6 py-4 font-mono", children: [campaign.conversion, "%"] }), _jsxs("td", { className: "px-6 py-4 font-mono", children: [campaign.roi, "x"] }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${campaign.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}` }), _jsx("span", { className: "text-xs", children: campaign.status })] }) }), _jsx("td", { className: "px-6 py-4 text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }) })] }, i))) })] }) })] }) }), _jsx(TabsContent, { value: "tools", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
                            {
                                title: isMyanmar ? 'ပရိုမိုးရှင်း ကုဒ်များ' : 'Promo Code Generator',
                                desc: isMyanmar ? 'ဖောက်သည်များအတွက် လျှော့စျေးကုဒ်များ ဖန်တီးပါ' : 'Generate and manage discount codes for customers.',
                                icon: Percent
                            },
                            {
                                title: isMyanmar ? 'စာတိုအမြောက်အမြား ပေးပို့ခြင်း' : 'SMS Bulk Blast',
                                desc: isMyanmar ? 'ဖောက်သည်အားလုံးထံ SMS သတင်းစကားများ ပေးပို့ပါ' : 'Send promotional SMS to targeted customer segments.',
                                icon: MessageSquare
                            },
                            {
                                title: isMyanmar ? 'အီးမေးလ် ဒီဇိုင်းရေးဆွဲခြင်း' : 'Email Designer',
                                desc: isMyanmar ? 'လှပသော အီးမေးလ်ပုံစံများကို ဖန်တီးပါ' : 'Create professional email templates with drag & drop.',
                                icon: Mail
                            },
                            {
                                title: isMyanmar ? 'လက်ဆောင်ပေးခြင်း အစီအစဉ်' : 'Loyalty Rewards',
                                desc: isMyanmar ? 'သစ္စာရှိဖောက်သည်များအတွက် အမှတ်ပေးစနစ်' : 'Manage points and rewards for frequent shippers.',
                                icon: Gift
                            },
                            {
                                title: isMyanmar ? 'ပစ်မှတ်ထားသော စာရင်းများ' : 'Targeted Lists',
                                desc: isMyanmar ? 'အပြုအမူအလိုက် ဖောက်သည်စာရင်းများ ခွဲခြားပါ' : 'Segment customers based on shipping frequency.',
                                icon: Users
                            },
                            {
                                title: isMyanmar ? 'ကြော်ငြာ ကိရိယာများ' : 'Ad Management',
                                desc: isMyanmar ? 'ပြင်ပကြော်ငြာ ကမ်ပိန်းများကို စောင့်ကြည့်ပါ' : 'Monitor external social and search ad campaigns.',
                                icon: Share2
                            }
                        ].map((tool, idx) => (_jsx(motion.div, { whileHover: { y: -5 }, transition: springPresets.snappy, children: _jsxs(Card, { className: "luxury-card h-full flex flex-col", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center mb-4", children: _jsx(tool.icon, { className: "w-6 h-6 text-luxury-gold" }) }), _jsx(CardTitle, { className: "text-lg", children: tool.title }), _jsx(CardDescription, { children: tool.desc })] }), _jsx(CardContent, { className: "mt-auto", children: _jsx(Button, { className: "w-full variant-outline border-luxury-gold/20 hover:bg-luxury-gold/10", children: isMyanmar ? 'အသုံးပြုမည်' : 'Open Tool' }) })] }) }, idx))) })] }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, className: "p-6 rounded-3xl bg-luxury-gold/5 border border-luxury-gold/10 flex flex-col md:flex-row items-center gap-6", children: [_jsx("div", { className: "p-4 rounded-full bg-luxury-gold/20", children: _jsx(TrendingUp, { className: "w-8 h-8 text-luxury-gold" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-lg font-bold text-luxury-gold", children: isMyanmar ? 'AI စျေးကွက်သုံးသပ်ချက်' : 'AI Marketing Insight' }), _jsx("p", { className: "text-sm text-muted-foreground", children: isMyanmar
                                    ? 'သင်၏ ပြီးခဲ့သော အပတ်က အီးမေးလ်ကမ်ပိန်းသည် ပုံမှန်ထက် ၂၀% ပိုမိုအောင်မြင်ခဲ့ပါသည်။ လာမည့်အပတ်တွင် ပို့ဆောင်ခလျှော့စျေးများ ထပ်မံပြုလုပ်ရန် အကြံပြုပါသည်။'
                                    : 'Your email campaigns saw a 20% uplift last week. We recommend doubling down on referral incentives for the upcoming merchant onboarding phase.' })] }), _jsxs(Button, { variant: "link", className: "text-luxury-gold", children: [isMyanmar ? 'အသေးစိတ်ကြည့်ရန်' : 'View Full Insights', " ", _jsx(ChevronRight, { className: "ml-2 w-4 h-4" })] })] }), _jsxs("footer", { className: "text-center text-xs text-muted-foreground py-10 border-t border-border/20", children: ["\u00A9 2026 Britium Express Logistics. ", isMyanmar ? 'မူပိုင်ခွင့်အားလုံးရယူထားသည်။' : 'All rights reserved.'] })] }));
};
export default Marketing;
