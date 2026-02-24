import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, Filter, ShieldCheck, Activity, Edit2, Trash2, Mail, Building2, BadgeCheck, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
const UserManagement = () => {
    const { user: currentUser } = useAuth();
    const { t } = useLanguage();
    // State
    const [users, setUsers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    // Modal States
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isActivityOpen, setIsActivityOpen] = useState(false);
    const [userActivity, setUserActivity] = useState([]);
    // Load initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [usersRes, branchesRes] = await Promise.all([
                    logisticsAPI.getProfiles(),
                    logisticsAPI.getBranches()
                ]);
                if (usersRes.data)
                    setUsers(usersRes.data);
                if (branchesRes.branches)
                    setBranches(branchesRes.branches);
            }
            catch (error) {
                console.error('Failed to fetch user management data:', error);
                toast.error('Failed to load system users');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    // Filtered Users
    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const matchesSearch = u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.employee_id?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || u.role === roleFilter;
            const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, searchQuery, roleFilter, statusFilter]);
    const fetchUserActivity = async (userId) => {
        try {
            const { data } = await logisticsAPI.getAuditLogs({ user_id: userId, limit: 10 });
            setUserActivity(data || []);
            setIsActivityOpen(true);
        }
        catch (error) {
            toast.error('Could not load user activity');
        }
    };
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'inactive': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };
    const getRoleBadge = (role) => {
        const luxuryGoldStyle = "bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20";
        const secondaryStyle = "bg-secondary text-secondary-foreground border-border";
        const isAdmin = ['SUPER_ADMIN', 'APP_OWNER', 'OPERATIONS_ADMIN'].includes(role);
        return (_jsx(Badge, { className: `font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 ${isAdmin ? luxuryGoldStyle : secondaryStyle}`, children: role.replace('_', ' ') }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 space-y-8", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight flex items-center gap-3", children: [_jsx(Users, { className: "w-8 h-8 text-luxury-gold" }), "User Management"] }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage enterprise accounts, roles, and system access control." })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(Button, { onClick: () => setIsAddUserOpen(true), className: "luxury-button", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Create Account"] }) })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
                    { label: 'Total Users', value: users.length, icon: Users, color: 'text-primary' },
                    { label: 'Active Staff', value: users.filter(u => u.status === 'active').length, icon: BadgeCheck, color: 'text-emerald-500' },
                    { label: 'Pending Access', value: users.filter(u => u.status === 'pending').length, icon: Lock, color: 'text-amber-500' },
                    { label: 'Privileged Roles', value: users.filter(u => ['SUPER_ADMIN', 'APP_OWNER'].includes(u.role)).length, icon: ShieldCheck, color: 'text-luxury-gold' },
                ].map((stat, i) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: stat.label }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-full bg-background/50 border border-border ${stat.color}`, children: _jsx(stat.icon, { className: "w-5 h-5" }) })] }) }) }, i))) }), _jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { className: "border-b border-border/50 pb-6", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 justify-between", children: [_jsxs("div", { className: "relative w-full md:w-96", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search by name, email or ID...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10 bg-background/50 border-border focus:ring-luxury-gold" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs(Select, { value: roleFilter, onValueChange: setRoleFilter, children: [_jsxs(SelectTrigger, { className: "w-[160px] bg-background/50 border-border", children: [_jsx(Filter, { className: "w-3 h-3 mr-2" }), _jsx(SelectValue, { placeholder: "All Roles" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Roles" }), _jsx(SelectItem, { value: "SUPER_ADMIN", children: "Super Admin" }), _jsx(SelectItem, { value: "RIDER", children: "Rider" }), _jsx(SelectItem, { value: "WAREHOUSE_MANAGER", children: "Warehouse" }), _jsx(SelectItem, { value: "CUSTOMER_SERVICE", children: "Support" }), _jsx(SelectItem, { value: "MERCHANT", children: "Merchant" })] })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { className: "w-[140px] bg-background/50 border-border", children: _jsx(SelectValue, { placeholder: "Status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" }), _jsx(SelectItem, { value: "pending", children: "Pending" })] })] })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-[600px] w-full", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/30 sticky top-0 z-10", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[300px]", children: "User Identity" }), _jsx(TableHead, { children: "Role & Access" }), _jsx(TableHead, { children: "Department / Branch" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Last Activity" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: isLoading ? (Array.from({ length: 5 }).map((_, i) => (_jsx(TableRow, { className: "animate-pulse", children: _jsx(TableCell, { colSpan: 6, className: "h-16 bg-muted/10" }) }, i)))) : filteredUsers.length > 0 ? (filteredUsers.map((u) => (_jsxs(TableRow, { className: "hover:bg-muted/20 transition-colors group", children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center border border-luxury-gold/30 text-luxury-gold font-bold", children: u.full_name.charAt(0) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: u.full_name }), _jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Mail, { className: "w-3 h-3" }), " ", u.email] })] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col gap-1", children: [getRoleBadge(u.role), _jsxs("span", { className: "text-[10px] text-muted-foreground uppercase font-mono", children: ["ID: ", u.employee_id || 'N/A'] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: u.department || 'Operations' }), _jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Building2, { className: "w-3 h-3" }), " ", u.branch?.name || 'Central Office'] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: getStatusColor(u.status), children: u.status }) }), _jsx(TableCell, { children: _jsx("span", { className: "text-xs font-mono text-muted-foreground", children: u.updated_at ? new Date(u.updated_at).toLocaleDateString() : 'Never' }) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "hover:text-luxury-gold", onClick: () => fetchUserActivity(u.id), children: _jsx(Activity, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "hover:text-luxury-gold", children: _jsx(Edit2, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "hover:text-destructive", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, u.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-64 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Users, { className: "w-12 h-12 mb-2 opacity-20" }), _jsx("p", { children: "No users found matching your filters" }), _jsx(Button, { variant: "link", onClick: () => { setRoleFilter('all'); setStatusFilter('all'); setSearchQuery(''); }, children: "Clear all filters" })] }) }) })) })] }) }) })] }), _jsx(Dialog, { open: isAddUserOpen, onOpenChange: setIsAddUserOpen, children: _jsxs(DialogContent, { className: "max-w-2xl bg-card border-border", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-2xl font-bold flex items-center gap-2", children: [_jsx(UserPlus, { className: "text-luxury-gold" }), "Register New System Account"] }), _jsx(DialogDescription, { children: "Create a new user profile with specific role-based access permissions." })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-mono uppercase text-muted-foreground", children: "Full Legal Name" }), _jsx(Input, { placeholder: "e.g. John Doe", className: "bg-background border-border" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-mono uppercase text-muted-foreground", children: "Work Email Address" }), _jsx(Input, { placeholder: "john.doe@britium.com", className: "bg-background border-border" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-mono uppercase text-muted-foreground", children: "Primary Role" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-background border-border", children: _jsx(SelectValue, { placeholder: "Select a role" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "OPERATIONS_ADMIN", children: "Operations Admin" }), _jsx(SelectItem, { value: "WAREHOUSE_MANAGER", children: "Warehouse Manager" }), _jsx(SelectItem, { value: "SUBSTATION_MANAGER", children: "Substation Manager" }), _jsx(SelectItem, { value: "RIDER", children: "Delivery Rider" }), _jsx(SelectItem, { value: "DATA_ENTRY", children: "Data Entry Clerk" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-mono uppercase text-muted-foreground", children: "Assigned Branch" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-background border-border", children: _jsx(SelectValue, { placeholder: "Select location" }) }), _jsx(SelectContent, { children: branches.map(b => (_jsxs(SelectItem, { value: b.id, children: [b.name, " (", b.code, ")"] }, b.id))) })] })] }), _jsxs("div", { className: "space-y-2 col-span-2", children: [_jsx("label", { className: "text-xs font-mono uppercase text-muted-foreground", children: "Initial Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { type: "password", className: "pl-10 bg-background border-border", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] })] })] }), _jsxs(DialogFooter, { className: "gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsAddUserOpen(false), className: "border-border", children: "Cancel" }), _jsx(Button, { className: "luxury-button", onClick: () => { toast.success('Account creation initiated'); setIsAddUserOpen(false); }, children: "Confirm & Create" })] })] }) }), _jsx(Dialog, { open: isActivityOpen, onOpenChange: setIsActivityOpen, children: _jsxs(DialogContent, { className: "max-w-md bg-card border-border", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "text-luxury-gold" }), "User Activity Monitor"] }) }), _jsx(ScrollArea, { className: "h-[400px] pr-4", children: _jsx("div", { className: "space-y-4", children: userActivity.length > 0 ? (userActivity.map((log, i) => (_jsxs("div", { className: "p-3 rounded-lg bg-muted/30 border border-border/50 relative overflow-hidden", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("span", { className: "text-xs font-mono text-luxury-gold uppercase tracking-tighter", children: log.action }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(log.timestamp).toLocaleString() })] }), _jsxs("p", { className: "text-sm mt-1", children: [log.resource_type, ": Accessing system resources"] }), _jsx("div", { className: "absolute left-0 top-0 w-1 h-full bg-luxury-gold/50" })] }, i)))) : (_jsx("div", { className: "h-32 flex items-center justify-center text-muted-foreground text-sm", children: "No recent activity recorded for this user" })) }) }), _jsx(Button, { className: "w-full mt-4 border-border", variant: "outline", onClick: () => setIsActivityOpen(false), children: "Close Monitor" })] }) })] }));
};
export default UserManagement;
