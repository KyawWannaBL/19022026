import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Filter, MoreVertical, ShieldCheck, Users as UsersIcon, UserCheck, Truck, Building2, Mail, Phone, Edit2, Trash2, Power } from 'lucide-react';
import { USER_ROLES } from '@/lib/index';
import { mockUsers, mockBranches } from '@/data/index';
import { useEnterpriseUsers } from '@/hooks/useEnterpriseUsers';
import { useEnterpriseBranches } from '@/hooks/useEnterpriseBranches';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { staggerContainer, staggerItem } from '@/lib/motion';
export default function Users() {
    const { data: users = [], isLoading: usersLoading } = useEnterpriseUsers();
    const { data: branches = [] } = useEnterpriseBranches();
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case USER_ROLES.SUPER_ADMIN:
            case USER_ROLES.ADMIN:
                return 'destructive';
            case USER_ROLES.MERCHANT:
                return 'outline';
            case USER_ROLES.RIDER:
                return 'secondary';
            case USER_ROLES.WAREHOUSE:
                return 'default';
            default:
                return 'outline';
        }
    };
    const getBranchName = (branchId) => {
        if (!branchId)
            return 'N/A';
        return mockBranches.find(b => b.id === branchId)?.name || 'Unknown Branch';
        return branches.find(b => b.id === branchId)?.name || 'Unknown Branch';
    };
    const columns = [
        {
            header: 'User',
            accessorKey: 'fullName',
            cell: (row) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "h-9 w-9 border border-border", children: [_jsx(AvatarImage, { src: row.avatarUrl, alt: row.fullName }), _jsx(AvatarFallback, { className: "bg-primary/10 text-primary", children: row.fullName.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium text-foreground", children: row.fullName }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["ID: ", row.id] })] })] })),
        },
        {
            header: 'Contact Information',
            accessorKey: 'email',
            cell: (row) => (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-sm", children: [_jsx(Mail, { className: "h-3.5 w-3.5 text-muted-foreground" }), _jsx("span", { children: row.email })] }), row.phoneNumber && (_jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [_jsx(Phone, { className: "h-3 w-3" }), _jsx("span", { children: row.phoneNumber })] }))] })),
        },
        {
            header: 'Role & Permissions',
            accessorKey: 'role',
            cell: (row) => (_jsx(Badge, { variant: getRoleBadgeVariant(row.role), className: "capitalize font-medium", children: row.role.replace(/_/g, ' ') })),
        },
        {
            header: 'Assigned Branch',
            accessorKey: 'branchId',
            cell: (row) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Building2, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-sm", children: getBranchName(row.branchId) })] })),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (row) => (_jsx(Badge, { className: row.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20'
                    : 'bg-muted text-muted-foreground', children: row.status })),
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: (row) => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreVertical, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuLabel, { children: "User Actions" }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Edit2, { className: "mr-2 h-4 w-4" }), " Edit Profile"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(ShieldCheck, { className: "mr-2 h-4 w-4" }), " Permissions"] }), _jsxs(DropdownMenuItem, { className: "cursor-pointer", children: [_jsx(Power, { className: "mr-2 h-4 w-4" }), " ", row.status === 'active' ? 'Deactivate' : 'Activate'] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-destructive cursor-pointer", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), " Delete User"] })] })] })),
        },
    ];
    const filteredUsers = mockUsers.filter(user => {
        const filteredUsers = users.filter(user => {
            const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
        const stats = [
            {
                title: 'Total Users',
                value: mockUsers.length,
                value: users.length,
                icon: _jsx(UsersIcon, { className: "h-5 w-5" }),
                color: 'text-primary',
                bg: 'bg-primary/10',
            },
            {
                title: 'Active Accounts',
                value: mockUsers.filter(u => u.status === 'active').length,
                value: users.filter(u => u.status === 'active').length,
                icon: _jsx(UserCheck, { className: "h-5 w-5" }),
                color: 'text-emerald-600',
                bg: 'bg-emerald-500/10',
            },
            {
                title: 'Active Riders',
                value: mockUsers.filter(u => u.role === USER_ROLES.RIDER).length,
                value: users.filter(u => u.role === USER_ROLES.RIDER).length,
                icon: _jsx(Truck, { className: "h-5 w-5" }),
                color: 'text-orange-600',
                bg: 'bg-orange-500/10',
            },
            {
                title: 'Administrators',
                value: mockUsers.filter(u => u.role === USER_ROLES.SUPER_ADMIN || u.role === USER_ROLES.ADMIN).length,
                value: users.filter(u => u.role === USER_ROLES.SUPER_ADMIN || u.role === USER_ROLES.ADMIN).length,
                icon: _jsx(ShieldCheck, { className: "h-5 w-5" }),
                color: 'text-blue-600',
                bg: 'bg-blue-500/10',
            },
        ];
        return (_jsxs("div", { className: "flex flex-col gap-8 p-6 md:p-10", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "User Management" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Manage system access, roles, and branch assignments for Britium Express employees and partners." })] }), _jsxs(Button, { className: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95", children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Add New User"] })] }), _jsx(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((stat, index) => (_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "overflow-hidden border-border/50 hover:border-primary/50 transition-colors group shadow-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.title }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`, children: stat.icon })] }) }) }) }, index))) }), _jsxs(Card, { className: "border-border/50 shadow-md bg-card/50 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "border-b border-border/50", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: "System Users" }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search by name or email...", className: "pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/20", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "h-4 w-4 text-muted-foreground" }), _jsxs("select", { className: "bg-background/50 border border-border/50 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20", value: roleFilter, onChange: (e) => setRoleFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Roles" }), Object.values(USER_ROLES).map(role => (_jsx("option", { value: role, children: role.replace(/_/g, ' ').toUpperCase() }, role)))] })] })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: _jsx(DataTable, { columns: columns, data: filteredUsers, searchPlaceholder: "Filter users..." }) }) })] }), _jsx("div", { className: "mt-auto pt-8 border-t border-border/50 text-center text-sm text-muted-foreground", children: _jsx("p", { children: "\u00A9 2026 Britium Express Logistics System. All rights reserved." }) })] }));
    });
}
