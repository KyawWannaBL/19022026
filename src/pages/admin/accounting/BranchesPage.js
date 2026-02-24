import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Plus, Filter, TrendingUp, Wallet, ArrowRightLeft, MoreVertical, ChevronRight, ArrowUpRight, ArrowDownRight, MapPin, Users, DollarSign, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguageContext } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
// Mock Data for Branch Accounting
const BRANCH_STATS = [
    {
        id: 'B001',
        name: 'Yangon Central',
        city: 'Yangon',
        manager: 'U Kyaw Zeya',
        balance: 45250000,
        monthlyIncome: 12500000,
        monthlyExpense: 4200000,
        efficiency: 94,
        status: 'active'
    },
    {
        id: 'B002',
        name: 'Mandalay Hub',
        city: 'Mandalay',
        manager: 'Daw Aye Myint',
        balance: 32100000,
        monthlyIncome: 8400000,
        monthlyExpense: 3100000,
        efficiency: 88,
        status: 'active'
    },
    {
        id: 'B003',
        name: 'Naypyidaw Office',
        city: 'Naypyidaw',
        manager: 'U Soe Win',
        balance: 18500000,
        monthlyIncome: 4500000,
        monthlyExpense: 2200000,
        efficiency: 91,
        status: 'active'
    },
    {
        id: 'B004',
        name: 'Taunggyi Station',
        city: 'Taunggyi',
        manager: 'Daw Phyu Phyu',
        balance: 12400000,
        monthlyIncome: 3100000,
        monthlyExpense: 1800000,
        efficiency: 85,
        status: 'inactive'
    }
];
const PERFORMANCE_DATA = [
    { name: 'Jan', income: 45000, expense: 32000 },
    { name: 'Feb', income: 52000, expense: 34000 },
    { name: 'Mar', income: 48000, expense: 31000 },
    { name: 'Apr', income: 61000, expense: 38000 },
    { name: 'May', income: 55000, expense: 35000 },
    { name: 'Jun', income: 67000, expense: 41000 },
];
const BranchesPage = () => {
    const { language } = useLanguageContext();
    const t = (key) => translations[language][key] || key;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-navy-900 dark:text-gold-400 font-myanmar", children: t('accounting.branches') }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? 'Manage branch-level financial allocation and monitor performance metrics.'
                                    : 'ဒါနခွဲအလိုက် ငွေကြေးခွဲဝေမှုနှင့် စွမ်းဆောင်ရည်များကို စီမံခန့်ခွဲပါ။' })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "luxury-button", children: [_jsx(ArrowRightLeft, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Inter-Branch Transfer' : 'ဒါနခွဲအချင်းချင်း ငွေလွှဲရန်'] }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px] lotus-card text-foreground", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-gold-500", children: language === 'en' ? 'Transfer Funds' : 'ငွေလွှဲရန်' }), _jsx(DialogDescription, { className: "text-navy-200", children: language === 'en' ? 'Move operational funds between branch accounts.' : 'ဒါနခွဲအကောင့်များအကြား လုပ်ငန်းသုံးငွေများ လွှဲပြောင်းပါ။' })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "from", children: language === 'en' ? 'From Branch' : 'ပေးပို့မည့် ဒါနခွဲ' }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "from", className: "bg-navy-800 border-gold-400/30", children: _jsx(SelectValue, { placeholder: "Select source branch" }) }), _jsx(SelectContent, { children: BRANCH_STATS.map(b => (_jsx(SelectItem, { value: b.id, children: b.name }, b.id))) })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "to", children: language === 'en' ? 'To Branch' : 'လက်ခံမည့် ဒါနခွဲ' }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "to", className: "bg-navy-800 border-gold-400/30", children: _jsx(SelectValue, { placeholder: "Select target branch" }) }), _jsx(SelectContent, { children: BRANCH_STATS.map(b => (_jsx(SelectItem, { value: b.id, children: b.name }, b.id))) })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "amount", children: language === 'en' ? 'Amount (MMK)' : 'ပမာဏ (ကျပ်)' }), _jsx(Input, { id: "amount", type: "number", placeholder: "0.00", className: "bg-navy-800 border-gold-400/30" })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", className: "luxury-button w-full", children: t('common.confirm') }) })] })] }), _jsxs(Button, { variant: "outline", className: "border-gold-400/50 text-gold-500 hover:bg-gold-500/10", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), t('common.add')] })] })] }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "lotus-card overflow-hidden group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-navy-300", children: language === 'en' ? 'Total Branch Liquidity' : 'ဒါနခွဲစုစုပေါင်း လက်ကျန်ငွေ' }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-gold-400 font-mono", children: "108,250,000" })] }), _jsx("div", { className: "p-3 rounded-xl bg-gold-500/10 text-gold-500 group-hover:scale-110 transition-transform", children: _jsx(Wallet, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex items-center mt-4 text-sm text-success", children: [_jsx(ArrowUpRight, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: "+12.5% from last month" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "lotus-card overflow-hidden group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-navy-300", children: language === 'en' ? 'Active Branches' : 'အသုံးပြုနေသော ဒါနခွဲများ' }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-gold-400 font-mono", children: "24" })] }), _jsx("div", { className: "p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform", children: _jsx(Building2, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex items-center mt-4 text-sm text-navy-400", children: [_jsx(Users, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: "3 new stations in 2026" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "lotus-card overflow-hidden group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-navy-300", children: language === 'en' ? 'Avg Branch Margin' : 'ဒါနခွဲ ပျမ်းမျှအမြတ်' }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-gold-400 font-mono", children: "32.4%" })] }), _jsx("div", { className: "p-3 rounded-xl bg-success/10 text-success group-hover:scale-110 transition-transform", children: _jsx(TrendingUp, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex items-center mt-4 text-sm text-success", children: [_jsx(ArrowUpRight, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: "Steady growth" })] })] }) }) }), _jsx(motion.div, { variants: itemVariants, children: _jsx(Card, { className: "lotus-card overflow-hidden group", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-navy-300", children: language === 'en' ? 'Pending Settlements' : 'စောင့်ဆိုင်းနေသော ငွေစာရင်းများ' }), _jsx("h3", { className: "text-2xl font-bold mt-1 text-gold-400 font-mono", children: "14,200,000" })] }), _jsx("div", { className: "p-3 rounded-xl bg-warning/10 text-warning group-hover:scale-110 transition-transform", children: _jsx(DollarSign, { className: "w-6 h-6" }) })] }), _jsxs("div", { className: "flex items-center mt-4 text-sm text-destructive", children: [_jsx(ArrowDownRight, { className: "w-4 h-4 mr-1" }), _jsx("span", { children: "5 high-value audits" })] })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 border-none shadow-xl bg-card/50 backdrop-blur-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: language === 'en' ? 'Branch Financial Overview' : 'ဒါနခွဲ ငွေကြေးအနှစ်ချုပ်' }), _jsx(CardDescription, { children: language === 'en' ? 'Current standing and operational health of all branches.' : 'ဒါနခွဲအားလုံး၏ လက်ရှိအခြေအနေနှင့် ငွေကြေးကျန်းမာမှု။' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('common.search'), className: "pl-9 w-[200px] bg-background border-border/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent", children: [_jsx(TableHead, { children: language === 'en' ? 'Branch Details' : 'ဒါနခွဲ အချက်အလက်' }), _jsx(TableHead, { children: language === 'en' ? 'Financial Status' : 'ငွေကြေး အခြေအနေ' }), _jsx(TableHead, { children: language === 'en' ? 'Monthly Flow' : 'လစဉ် စီးဆင်းမှု' }), _jsx(TableHead, { children: language === 'en' ? 'Efficiency' : 'စွမ်းဆောင်ရည်' }), _jsx(TableHead, { className: "text-right", children: t('warehouse.action') })] }) }), _jsx(TableBody, { children: BRANCH_STATS.map((branch) => (_jsxs(TableRow, { className: "group hover:bg-muted/50 transition-colors", children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-bold text-navy-900 dark:text-gold-100", children: branch.name }), _jsxs("div", { className: "flex items-center text-xs text-muted-foreground mt-1", children: [_jsx(MapPin, { className: "w-3 h-3 mr-1" }), " ", branch.city] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "font-mono font-medium", children: [branch.balance.toLocaleString(), " MMK"] }), _jsx(Badge, { variant: branch.status === 'active' ? 'default' : 'secondary', className: branch.status === 'active' ? 'bg-success/20 text-success border-success/30 w-fit mt-1' : 'w-fit mt-1', children: branch.status === 'active' ? t('common.active') : t('common.inactive') })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center text-xs text-success", children: [_jsx(ArrowUpRight, { className: "w-3 h-3 mr-1" }), " ", branch.monthlyIncome.toLocaleString()] }), _jsxs("div", { className: "flex items-center text-xs text-destructive", children: [_jsx(ArrowDownRight, { className: "w-3 h-3 mr-1" }), " ", branch.monthlyExpense.toLocaleString()] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-full bg-muted rounded-full h-1.5 max-w-[60px]", children: _jsx("div", { className: "bg-gold-500 h-1.5 rounded-full", style: { width: `${branch.efficiency}%` } }) }), _jsxs("span", { className: "text-xs font-medium", children: [branch.efficiency, "%"] })] }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-gold-500/10", children: _jsx(MoreVertical, { className: "h-4 w-4 text-gold-500" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "lotus-card border-gold-400/30", children: [_jsx(DropdownMenuLabel, { children: t('warehouse.action') }), _jsx(DropdownMenuSeparator, { className: "bg-gold-400/20" }), _jsxs(DropdownMenuItem, { className: "hover:bg-gold-500/20", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'View Ledger' : 'စာရင်းစာအုပ်ကြည့်ရန်'] }), _jsxs(DropdownMenuItem, { className: "hover:bg-gold-500/20", children: [_jsx(TrendingUp, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Profit Report' : 'အမြတ်အစွန်း အစီရင်ခံစာ'] }), _jsxs(DropdownMenuItem, { className: "text-destructive hover:bg-destructive/20", children: [_jsx(ChevronRight, { className: "w-4 h-4 mr-2" }), language === 'en' ? 'Deactivate Branch' : 'ဒါနခွဲရပ်ဆိုင်းရန်'] })] })] }) })] }, branch.id))) })] }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-none shadow-xl bg-card/50 backdrop-blur-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: language === 'en' ? 'Performance Trend' : 'စွမ်းဆောင်ရည် လမ်းကြောင်း' }), _jsx(CardDescription, { children: language === 'en' ? 'Income vs Expense (Last 6 Months)' : 'ဝင်ငွေနှင့် ကုန်ကျစရိတ် (နောက်ဆုံး ၆ လ)' })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "h-[240px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: PERFORMANCE_DATA, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)", vertical: false }), _jsx(XAxis, { dataKey: "name", stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#94a3b8", fontSize: 12, tickLine: false, axisLine: false }), _jsx(Tooltip, { contentStyle: { backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(234, 179, 8, 0.3)', borderRadius: '8px' }, itemStyle: { fontSize: '12px' } }), _jsx(Bar, { dataKey: "income", fill: "#EAB308", radius: [4, 4, 0, 0], barSize: 20 }), _jsx(Bar, { dataKey: "expense", fill: "#334155", radius: [4, 4, 0, 0], barSize: 20 })] }) }) }), _jsxs("div", { className: "flex items-center justify-center gap-6 mt-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-gold-500" }), _jsx("span", { className: "text-xs text-muted-foreground", children: t('accounting.income') })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-navy-800 dark:bg-navy-200" }), _jsx("span", { className: "text-xs text-muted-foreground", children: t('accounting.expense') })] })] })] })] }), _jsxs(Card, { className: "border-none shadow-xl bg-gradient-to-br from-navy-900 to-navy-800 text-gold-400 overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg", children: language === 'en' ? 'Top Branch' : 'အကောင်းဆုံး ဒါနခွဲ' }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-gold-500 rounded-lg text-navy-900", children: _jsx(Building2, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "Yangon Central" }), _jsx("p", { className: "text-xs opacity-70", children: "Branch #B001" })] })] }), _jsx(Badge, { className: "bg-gold-500/20 text-gold-400 border-gold-400/50", children: "#1 Performance" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: language === 'en' ? 'Target Achievement' : 'ရည်မှန်းချက် ပြည့်မီမှု' }), _jsx("span", { children: "98%" })] }), _jsx("div", { className: "w-full bg-white/10 rounded-full h-2", children: _jsx("div", { className: "bg-gold-500 h-2 rounded-full", style: { width: '98%' } }) })] }), _jsx(Button, { variant: "outline", className: "w-full border-gold-400/30 text-gold-400 hover:bg-gold-400/10 mt-2", children: language === 'en' ? 'View Full Analytics' : 'အသေးစိတ် စာရင်းကြည့်ရန်' })] })] })] })] })] }));
};
export default BranchesPage;
