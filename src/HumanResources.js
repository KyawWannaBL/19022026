import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { useQuery } from '@tanstack/react-query';
import { Users, UserPlus, DollarSign, Briefcase, TrendingUp, Search, Filter, MoreHorizontal, Mail, Calendar, Download, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';
const HumanResources = () => {
    const { user: currentUser } = useAuth();
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('directory');
    // Translations
    const t = {
        en: {
            title: 'Human Resources',
            subtitle: 'Manage employee lifecycle, payroll, and performance.',
            addEmployee: 'Add Employee',
            totalStaff: 'Total Staff',
            activeRiders: 'Active Riders',
            pendingPayroll: 'Pending Payroll',
            openPositions: 'Open Positions',
            directory: 'Staff Directory',
            payroll: 'Payroll Management',
            recruitment: 'Recruitment',
            performance: 'Performance',
            searchPlaceholder: 'Search by name, ID or role...',
            name: 'Name',
            role: 'Role',
            dept: 'Department',
            status: 'Status',
            hired: 'Hired Date',
            actions: 'Actions',
            salary: 'Salary',
            bonus: 'Bonus',
            lastPaid: 'Last Paid',
            viewProfile: 'View Profile',
            editDetails: 'Edit Details',
            terminate: 'Terminate Contract',
        },
        my: {
            title: 'လူ့စွမ်းအားအရင်းအမြစ်',
            subtitle: 'ဝန်ထမ်းစီမံခန့်ခွဲမှု၊ လစာနှင့် စွမ်းဆောင်ရည်များကို စီမံပါ။',
            addEmployee: 'ဝန်ထမ်းအသစ်ထည့်ရန်',
            totalStaff: 'စုစုပေါင်းဝန်ထမ်း',
            activeRiders: 'အလုပ်လုပ်နေသော Rider များ',
            pendingPayroll: 'ပေးရန်ကျန်လစာ',
            openPositions: 'လစ်လပ်ရာထူးများ',
            directory: 'ဝန်ထမ်းစာရင်း',
            payroll: 'လစာစီမံခန့်ခွဲမှု',
            recruitment: 'အလုပ်ခေါ်ယူခြင်း',
            performance: 'စွမ်းဆောင်ရည်',
            searchPlaceholder: 'အမည်၊ ID သို့မဟုတ် ရာထူးဖြင့် ရှာဖွေရန်...',
            name: 'အမည်',
            role: 'ရာထူး',
            dept: 'ဌာန',
            status: 'အခြေအနေ',
            hired: 'ခန့်အပ်သည့်နေ့',
            actions: 'ဆောင်ရွက်ချက်များ',
            salary: 'လစာ',
            bonus: 'အပိုဆု',
            lastPaid: 'နောက်ဆုံးပေးခဲ့သည့်နေ့',
            viewProfile: 'ကိုယ်ရေးအချက်အလက်ကြည့်ရန်',
            editDetails: 'ပြင်ဆင်ရန်',
            terminate: 'အလုပ်မှရပ်စဲရန်',
        }
    };
    const content = language === 'my' ? t.my : t.en;
    // Data Fetching
    const { data: staffData, isLoading } = useQuery({
        queryKey: ['staff-profiles'],
        queryFn: async () => {
            const response = await logisticsAPI.getProfiles();
            return response.data;
        }
    });
    const filteredStaff = useMemo(() => {
        if (!staffData)
            return [];
        return staffData.filter(staff => staff.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [staffData, searchTerm]);
    const stats = [
        { label: content.totalStaff, value: staffData?.length || 0, icon: Users, color: 'text-blue-500' },
        { label: content.activeRiders, value: staffData?.filter(s => s.role === 'RIDER').length || 0, icon: Briefcase, color: 'text-luxury-gold' },
        { label: content.pendingPayroll, value: '$12,450', icon: DollarSign, color: 'text-green-500' },
        { label: content.openPositions, value: '8', icon: TrendingUp, color: 'text-purple-500' },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight font-heading text-foreground", children: content.title }), _jsx("p", { className: "text-muted-foreground mt-1", children: content.subtitle })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Reports"] }), _jsxs(Button, { className: "bg-luxury-gold text-black hover:bg-luxury-gold/90 font-bold", children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), content.addEmployee] })] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, idx) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card border-none", children: _jsxs(CardContent, { className: "p-6 flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.label }), _jsx("p", { className: "text-2xl font-bold font-mono", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-full bg-white/5 ${stat.color}`, children: _jsx(stat.icon, { className: "h-6 w-6" }) })] }) }) }, idx))) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full space-y-6", children: [_jsxs(TabsList, { className: "bg-card/50 border border-white/5 p-1 rounded-xl h-12", children: [_jsx(TabsTrigger, { value: "directory", className: "data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6", children: content.directory }), _jsx(TabsTrigger, { value: "payroll", className: "data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6", children: content.payroll }), _jsx(TabsTrigger, { value: "recruitment", className: "data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6", children: content.recruitment }), _jsx(TabsTrigger, { value: "performance", className: "data-[state=active]:bg-luxury-gold data-[state=active]:text-black px-6", children: content.performance })] }), _jsx(TabsContent, { value: "directory", className: "space-y-4", children: _jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsx(CardTitle, { children: content.directory }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: content.searchPlaceholder, className: "pl-10 bg-white/5 border-white/10", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", className: "border-white/10", children: _jsx(Filter, { className: "h-4 w-4" }) })] })] }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-white/5", children: [_jsx(TableHead, { className: "text-muted-foreground", children: content.name }), _jsx(TableHead, { className: "text-muted-foreground", children: content.role }), _jsx(TableHead, { className: "text-muted-foreground", children: content.dept }), _jsx(TableHead, { className: "text-muted-foreground", children: content.status }), _jsx(TableHead, { className: "text-muted-foreground", children: content.hired }), _jsx(TableHead, { className: "text-right text-muted-foreground", children: content.actions })] }) }), _jsx(TableBody, { children: isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(TableRow, { className: "animate-pulse", children: _jsx(TableCell, { colSpan: 6, className: "h-16 bg-white/5 rounded-md my-2" }) }, i)))) : filteredStaff.map((staff) => (_jsxs(TableRow, { className: "border-white/5 hover:bg-white/5 transition-colors group", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10 border border-luxury-gold/20", children: [_jsx(AvatarImage, { src: staff.profile_image_url }), _jsx(AvatarFallback, { className: "bg-luxury-gold/10 text-luxury-gold", children: staff.full_name.charAt(0) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: staff.full_name }), _jsx("div", { className: "text-xs text-muted-foreground font-mono", children: staff.employee_id || 'EMP-000' })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "border-luxury-gold/20 text-luxury-gold bg-luxury-gold/5", children: staff.role }) }), _jsx(TableCell, { className: "text-muted-foreground", children: staff.department || 'Operations' }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `h-2 w-2 rounded-full ${staff.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}` }), _jsx("span", { className: "text-sm", children: staff.status })] }) }), _jsx(TableCell, { className: "text-muted-foreground font-mono", children: staff.hire_date ? new Date(staff.hire_date).toLocaleDateString() : '2025-01-15' }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-white/10", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48 bg-luxury-obsidian border-white/10", children: [_jsx(DropdownMenuLabel, { children: "Options" }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Mail, { className: "mr-2 h-4 w-4" }), " Email Staff"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), " ", content.viewProfile] }), _jsx(DropdownMenuSeparator, { className: "bg-white/5" }), _jsx(DropdownMenuItem, { className: "text-destructive cursor-pointer", children: content.terminate })] })] }) })] }, staff.id))) })] }) })] }) }), _jsx(TabsContent, { value: "payroll", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "luxury-card border-none lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Payroll History - Feb 2026" }), _jsx(CardDescription, { children: "Review and process salary payments for the current month." })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-white/5", children: [_jsx(TableHead, { children: content.name }), _jsx(TableHead, { children: content.salary }), _jsx(TableHead, { children: content.bonus }), _jsx(TableHead, { children: "Total" }), _jsx(TableHead, { children: content.status })] }) }), _jsx(TableBody, { children: [1, 2, 3, 4, 5].map((i) => (_jsxs(TableRow, { className: "border-white/5", children: [_jsxs(TableCell, { className: "font-medium", children: ["Staff Member ", i] }), _jsx(TableCell, { className: "font-mono", children: "$1,200.00" }), _jsx(TableCell, { className: "font-mono text-green-500", children: "+$150.00" }), _jsx(TableCell, { className: "font-mono font-bold", children: "$1,350.00" }), _jsx(TableCell, { children: _jsx(Badge, { className: i % 2 === 0 ? 'bg-green-500/20 text-green-500 border-none' : 'bg-yellow-500/20 text-yellow-500 border-none', children: i % 2 === 0 ? 'Paid' : 'Pending' }) })] }, i))) })] }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none bg-gradient-to-br from-luxury-gold/10 to-transparent", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-luxury-gold", children: "Payroll Summary" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Total Base Salary" }), _jsx("span", { className: "font-mono", children: "$45,000.00" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Total Bonuses" }), _jsx("span", { className: "font-mono text-green-500", children: "$3,450.00" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Taxes & Deductions" }), _jsx("span", { className: "font-mono text-destructive", children: "-$4,200.00" })] }), _jsx("div", { className: "h-px bg-white/10 my-2" }), _jsxs("div", { className: "flex justify-between text-lg font-bold", children: [_jsx("span", { children: "Net Disbursement" }), _jsx("span", { className: "text-luxury-gold", children: "$44,250.00" })] }), _jsx(Button, { className: "w-full bg-luxury-gold text-black mt-4", children: "Process Batch Payment" })] })] }), _jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Upcoming Deadlines" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Clock, { className: "h-5 w-5 text-luxury-gold mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Tax Filing (Q1)" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Feb 28, 2026" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Calendar, { className: "h-5 w-5 text-blue-500 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Annual Bonus Review" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "March 15, 2026" })] })] })] })] })] })] }) }), _jsx(TabsContent, { value: "recruitment", children: _jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Open Requisitions" }), _jsx(CardDescription, { children: "Active job postings and candidate pipelines." })] }), _jsx(Button, { size: "sm", className: "bg-white/5 border border-white/10 text-white hover:bg-white/10", children: "Post New Job" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ['Senior Logistics Coordinator', 'Dispatch Lead', 'Operations Analyst'].map((job, i) => (_jsxs(Card, { className: "bg-white/5 border-white/5 p-5 space-y-4 hover:border-luxury-gold/30 transition-all cursor-pointer", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(Badge, { className: "bg-blue-500/20 text-blue-500 border-none", children: "Full-Time" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Posted 3d ago" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg", children: job }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Operations Department \u2022 Yangon HQ" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex -space-x-2", children: [[1, 2, 3].map(j => (_jsx(Avatar, { className: "h-7 w-7 border-2 border-background", children: _jsxs(AvatarFallback, { className: "text-[10px] bg-muted", children: ["C", j] }) }, j))), _jsx("div", { className: "h-7 w-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-muted-foreground border-2 border-background", children: "+12" })] }), _jsx("span", { className: "text-xs font-medium", children: "15 Applicants" })] })] }, i))) }) })] }) }), _jsx(TabsContent, { value: "performance", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "luxury-card border-none", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Top Performing Riders" }), _jsx(CardDescription, { children: "Based on delivery success rate and customer ratings." })] }), _jsx(CardContent, { className: "space-y-6", children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-xl font-bold font-mono text-luxury-gold", children: ["#0", i] }), _jsx(Avatar, { className: "h-12 w-12 border-2 border-luxury-gold/20", children: _jsxs(AvatarFallback, { children: ["R", i] }) }), _jsxs("div", { children: [_jsxs("p", { className: "font-bold", children: ["Rider Name ", i] }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(CheckCircle2, { className: "h-3 w-3 text-green-500" }), _jsx("span", { children: "98.2% Success Rate" })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-lg font-bold font-mono", children: "4.9" }), _jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Avg Rating" })] })] }, i))) })] }), _jsxs(Card, { className: "luxury-card border-none", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "KPI Compliance Tracking" }), _jsx(CardDescription, { children: "Overall department performance vs monthly targets." })] }), _jsxs(CardContent, { className: "space-y-8", children: [['Logistics', 'Warehouse', 'Customer Service', 'Finance'].map((dept, i) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "font-medium", children: dept }), _jsxs("span", { className: "text-sm font-mono", children: [80 + i * 5, "%"] })] }), _jsx("div", { className: "w-full bg-white/5 h-2 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${80 + i * 5}%` }, transition: { duration: 1.5, ease: "easeOut" }, className: `h-full rounded-full ${80 + i * 5 > 90 ? 'bg-green-500' : 80 + i * 5 > 85 ? 'bg-luxury-gold' : 'bg-blue-500'}` }) })] }, i))), _jsxs("div", { className: "pt-4 flex items-center gap-4", children: [_jsxs("div", { className: "p-4 rounded-2xl bg-white/5 flex-1 text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Avg Performance" }), _jsx("p", { className: "text-2xl font-bold text-luxury-gold", children: "88.4%" })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-white/5 flex-1 text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-1", children: "Target Variance" }), _jsx("p", { className: "text-2xl font-bold text-green-500", children: "+3.2%" })] })] })] })] })] }) })] })] }));
};
export default HumanResources;
