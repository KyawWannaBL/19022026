import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users as UsersIcon, UserPlus, Search, Edit, Shield, Activity, MapPin, MoreHorizontal } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { USER_ROLES, formatDate } from '@/lib/index';
import { StatusBadge } from '@/components/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
const MOCK_USERS = [
    {
        id: 'u1',
        name: 'Admin User',
        email: 'admin@britium2026.com',
        role: 'SUPER_ADMIN',
        branch: 'Yangon HQ',
        phone: '+95 912345678',
        lastLogin: '2026-02-19T10:30:00Z',
    },
    {
        id: 'u2',
        name: 'Aye Aye',
        email: 'aye.aye@britium2026.com',
        role: 'OPERATIONS_ADMIN',
        branch: 'Mandalay Hub',
        phone: '+95 923456789',
        lastLogin: '2026-02-19T08:15:00Z',
    },
    {
        id: 'u3',
        name: 'Min Thu',
        email: 'min.thu@britium2026.com',
        role: 'RIDER',
        branch: 'Yangon South',
        phone: '+95 934567890',
        lastLogin: '2026-02-18T17:45:00Z',
    },
    {
        id: 'u4',
        name: 'Khin Khin',
        email: 'khin.khin@britium2026.com',
        role: 'WAREHOUSE_STAFF',
        branch: 'Yangon Central',
        phone: '+95 945678901',
        lastLogin: '2026-02-19T09:00:00Z',
    },
    {
        id: 'u5',
        name: 'Zarni',
        email: 'zarni@britium2026.com',
        role: 'DISPATCHER',
        branch: 'Naypyidaw',
        phone: '+95 956789012',
        lastLogin: '2026-02-19T11:20:00Z',
    },
];
export default function Users() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const [users, setUsers] = useState(MOCK_USERS);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'WAREHOUSE_STAFF',
        branch: '',
    });
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = roleFilter === 'all' || user.role === roleFilter;
            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);
    const handleCreateUser = () => {
        if (!formData.name || !formData.email) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }
        const newUser = {
            id: `u${Date.now()}`,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            branch: formData.branch,
            phone: formData.phone,
            lastLogin: new Date().toISOString(),
        };
        setUsers((prev) => [newUser, ...prev]);
        setIsCreateDialogOpen(false);
        resetForm();
        toast({
            title: "User Created",
            description: `${formData.name} has been successfully added.`,
        });
    };
    const handleUpdateUser = () => {
        if (!selectedUser)
            return;
        setUsers((prev) => prev.map((u) => u.id === selectedUser.id
            ? { ...u, ...formData, id: selectedUser.id }
            : u));
        setIsEditDialogOpen(false);
        resetForm();
        toast({
            title: "User Updated",
            description: "User permissions and info have been updated.",
        });
    };
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'WAREHOUSE_STAFF',
            branch: '',
        });
        setSelectedUser(null);
    };
    const openEditDialog = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            role: user.role,
            branch: user.branch || '',
        });
        setIsEditDialogOpen(true);
    };
    return (_jsxs("div", { className: "space-y-8 p-6 animate-in fade-in duration-500", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "font-heading text-3xl font-bold tracking-tight text-foreground", children: "User Management" }), _jsx("p", { className: "text-muted-foreground", children: "Manage staff roles, access permissions, and branch assignments for 2026 operations." })] }), _jsxs(Dialog, { open: isCreateDialogOpen, onOpenChange: setIsCreateDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "luxury-button h-12", children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), "Add New Staff"] }) }), _jsxs(DialogContent, { className: "luxury-glass border-border sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-heading text-xl", children: "Create System User" }), _jsx(DialogDescription, { children: "Onboard new personnel to the Britium Logistics network." })] }), _jsxs("div", { className: "grid gap-6 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "name", className: "text-right text-xs font-bold uppercase tracking-widest", children: "Name" }), _jsx(Input, { id: "name", placeholder: "Full Name", value: formData.name, onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })), className: "col-span-3 bg-background/50" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "email", className: "text-right text-xs font-bold uppercase tracking-widest", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "staff@britium.com", value: formData.email, onChange: (e) => setFormData((prev) => ({ ...prev, email: e.target.value })), className: "col-span-3 bg-background/50" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "role", className: "text-right text-xs font-bold uppercase tracking-widest", children: "Role" }), _jsxs(Select, { value: formData.role, onValueChange: (val) => setFormData((prev) => ({ ...prev, role: val })), children: [_jsx(SelectTrigger, { className: "col-span-3 bg-background/50", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: Object.values(USER_ROLES).map((role) => (_jsx(SelectItem, { value: role, children: role.replace(/_/g, ' ') }, role))) })] })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "branch", className: "text-right text-xs font-bold uppercase tracking-widest", children: "Branch" }), _jsx(Input, { id: "branch", placeholder: "Hub Location", value: formData.branch, onChange: (e) => setFormData((prev) => ({ ...prev, branch: e.target.value })), className: "col-span-3 bg-background/50" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsCreateDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleCreateUser, children: "Provision User" })] })] })] })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest", children: "Total Personnel" }), _jsx(UsersIcon, { className: "h-4 w-4 text-primary" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold font-mono", children: users.length }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Active across 12 branches" })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest", children: "Admins" }), _jsx(Shield, { className: "h-4 w-4 text-primary" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold font-mono", children: users.filter((u) => u.role.includes('ADMIN')).length }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "System controllers" })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest", children: "Online Now" }), _jsx(Activity, { className: "h-4 w-4 text-green-500" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold font-mono", children: Math.floor(users.length * 0.8) }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Real-time activity" })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-xs font-bold uppercase tracking-widest", children: "System Health" }), _jsx(Activity, { className: "h-4 w-4 text-primary" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold font-mono", children: "99.9%" }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Access stability" })] })] })] }), _jsxs(Card, { className: "luxury-card overflow-hidden", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "font-heading text-xl", children: "Staff Directory" }), _jsx(CardDescription, { children: "Filter and manage access for the entire workforce." })] }), _jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center", children: [_jsxs("div", { className: "relative w-full sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), _jsx(Input, { placeholder: "Search name or email...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-background/50" })] }), _jsxs(Select, { value: roleFilter, onValueChange: setRoleFilter, children: [_jsx(SelectTrigger, { className: "w-full sm:w-48 bg-background/50", children: _jsx(SelectValue, { placeholder: "Role" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Roles" }), Object.values(USER_ROLES).map((role) => (_jsx(SelectItem, { value: role, children: role.replace(/_/g, ' ') }, role)))] })] })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[300px] text-xs font-bold uppercase tracking-widest", children: "User Identity" }), _jsx(TableHead, { className: "text-xs font-bold uppercase tracking-widest", children: "Authorization" }), _jsx(TableHead, { className: "text-xs font-bold uppercase tracking-widest", children: "Assignment" }), _jsx(TableHead, { className: "text-xs font-bold uppercase tracking-widest", children: "Status / Last Activity" }), _jsx(TableHead, { className: "text-right text-xs font-bold uppercase tracking-widest", children: "Control" })] }) }), _jsx(TableBody, { children: filteredUsers.length > 0 ? (filteredUsers.map((user) => (_jsxs(TableRow, { className: "group hover:bg-muted/30 transition-colors", children: [_jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Avatar, { className: "h-10 w-10 border border-border group-hover:border-primary/50 transition-colors", children: [_jsx(AvatarImage, { src: user.avatarUrl }), _jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold", children: user.name.split(' ').map((n) => n[0]).join('').toUpperCase() })] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-foreground", children: user.name }), _jsx("p", { className: "text-xs text-muted-foreground font-mono", children: user.email })] })] }) }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: user.role, type: "user" }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(MapPin, { className: "mr-1.5 h-3.5 w-3.5" }), user.branch || 'Global'] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "text-foreground font-medium", children: "Active" }), _jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-tighter", children: ["Last: ", formatDate(user.lastLogin || '')] })] }) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:text-primary hover:bg-primary/10", onClick: () => openEditDialog(user), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:text-destructive hover:bg-destructive/10", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }) })] }, user.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-32 text-center text-muted-foreground", children: "No staff members match the selected criteria." }) })) })] }) }) })] }), _jsx(Dialog, { open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, children: _jsxs(DialogContent, { className: "luxury-glass border-border sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "font-heading text-xl", children: "Modify User Authorization" }), _jsxs(DialogDescription, { children: ["Update role, contact details, or branch for ", selectedUser?.name, "."] })] }), _jsxs("div", { className: "grid gap-6 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { className: "text-right text-xs font-bold uppercase tracking-widest", children: "Name" }), _jsx(Input, { value: formData.name, onChange: (e) => setFormData((prev) => ({ ...prev, name: e.target.value })), className: "col-span-3 bg-background/50" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { className: "text-right text-xs font-bold uppercase tracking-widest", children: "Role" }), _jsxs(Select, { value: formData.role, onValueChange: (val) => setFormData((prev) => ({ ...prev, role: val })), children: [_jsx(SelectTrigger, { className: "col-span-3 bg-background/50", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: Object.values(USER_ROLES).map((role) => (_jsx(SelectItem, { value: role, children: role.replace(/_/g, ' ') }, role))) })] })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { className: "text-right text-xs font-bold uppercase tracking-widest", children: "Phone" }), _jsx(Input, { value: formData.phone, onChange: (e) => setFormData((prev) => ({ ...prev, phone: e.target.value })), className: "col-span-3 bg-background/50" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { className: "text-right text-xs font-bold uppercase tracking-widest", children: "Branch" }), _jsx(Input, { value: formData.branch, onChange: (e) => setFormData((prev) => ({ ...prev, branch: e.target.value })), className: "col-span-3 bg-background/50" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsEditDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleUpdateUser, children: "Commit Changes" })] })] }) })] }));
}
