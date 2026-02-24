import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, UserCheck, Search, Save, RotateCcw, ChevronRight, AlertCircle, Truck, Users, DollarSign, Warehouse, Settings, Trash2, Database } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
// Permission Definitions
const PERMISSION_GROUPS = [
    {
        id: 'shipments',
        label: 'Shipment Operations',
        icon: Truck,
        permissions: ['view_shipments', 'create_shipment', 'edit_shipment', 'cancel_shipment', 'track_realtime', 'manage_pod']
    },
    {
        id: 'finance',
        label: 'Financial Management',
        icon: DollarSign,
        permissions: ['view_revenue', 'manage_rates', 'collect_cod', 'finance_audit', 'process_refunds', 'export_financials']
    },
    {
        id: 'warehouse',
        label: 'Warehouse & Inventory',
        icon: Warehouse,
        permissions: ['receive_goods', 'dispatch_orders', 'inventory_audit', 'tag_assignment', 'label_activation', 'substation_ops']
    },
    {
        id: 'users',
        label: 'User & Staff Control',
        icon: Users,
        permissions: ['view_staff', 'edit_staff', 'manage_roles', 'hr_records', 'payroll_access', 'audit_logs']
    },
    {
        id: 'system',
        label: 'System Configuration',
        icon: Settings,
        permissions: ['branch_settings', 'api_configuration', 'maintenance_mode', 'security_policies', 'backup_management']
    }
];
const APP_ROLES = [
    { id: 'APP_OWNER', name: 'Application Owner', level: 100, color: 'text-luxury-gold' },
    { id: 'SUPER_ADMIN', name: 'Super Administrator', level: 90, color: 'text-red-500' },
    { id: 'OPERATIONS_ADMIN', name: 'Operations Admin', level: 80, color: 'text-blue-500' },
    { id: 'SUPERVISOR', name: 'Supervisor', level: 70, color: 'text-green-500' },
    { id: 'WAREHOUSE_MANAGER', name: 'Warehouse Manager', level: 60, color: 'text-purple-500' },
    { id: 'SUBSTATION_MANAGER', name: 'Substation Manager', level: 60, color: 'text-indigo-500' },
    { id: 'HR_ADMIN', name: 'HR Administrator', level: 50, color: 'text-pink-500' },
    { id: 'FINANCE_STAFF', name: 'Finance Staff', level: 50, color: 'text-emerald-500' },
    { id: 'RIDER', name: 'Delivery Rider', level: 20, color: 'text-orange-500' },
    { id: 'MERCHANT', name: 'Merchant', level: 15, color: 'text-cyan-500' },
    { id: 'CUSTOMER', name: 'Customer', level: 10, color: 'text-slate-500' }
];
export default function RoleManagement() {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const { toast } = useToast();
    const [selectedRole, setSelectedRole] = useState(APP_ROLES[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    // Mock state for permissions per role
    const [rolePermissions, setRolePermissions] = useState({
        APP_OWNER: PERMISSION_GROUPS.flatMap(g => g.permissions),
        SUPER_ADMIN: PERMISSION_GROUPS.flatMap(g => g.permissions).filter(p => p !== 'maintenance_mode'),
        RIDER: ['view_shipments', 'track_realtime', 'manage_pod', 'label_activation'],
        MERCHANT: ['view_shipments', 'create_shipment', 'view_revenue'],
    });
    const filteredRoles = useMemo(() => {
        return APP_ROLES.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.id.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);
    const togglePermission = (roleId, permission) => {
        setRolePermissions(prev => {
            const current = prev[roleId] || [];
            if (current.includes(permission)) {
                return { ...prev, [roleId]: current.filter(p => p !== permission) };
            }
            else {
                return { ...prev, [roleId]: [...current, permission] };
            }
        });
    };
    const handleSave = async () => {
        setIsSaving(true);
        try {
            // In a real app, this would be an API call to update role templates
            // await logisticsAPI.updateRolePermissions(selectedRole.id, rolePermissions[selectedRole.id]);
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast({
                title: "Changes Saved",
                description: `Permissions for ${selectedRole.name} have been updated successfully.`,
                variant: "default",
            });
        }
        catch (error) {
            toast({
                title: "Save Failed",
                description: "There was an error updating permissions.",
                variant: "destructive",
            });
        }
        finally {
            setIsSaving(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-foreground flex items-center gap-3", children: [_jsx(Shield, { className: "w-8 h-8 text-luxury-gold" }), "Role & Permissions"] }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Configure access control levels and functional permissions for all system roles." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", onClick: () => window.location.reload(), className: "border-luxury-gold/20 hover:border-luxury-gold/50", children: [_jsx(RotateCcw, { className: "w-4 h-4 mr-2" }), "Reset Defaults"] }), _jsxs(Button, { onClick: handleSave, disabled: isSaving, className: "bg-luxury-gold text-black hover:bg-luxury-gold/90 font-bold", children: [isSaving ? _jsx(Database, { className: "w-4 h-4 mr-2 animate-spin" }) : _jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Changes"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsxs(Card, { className: "lg:col-span-4 luxury-card overflow-hidden flex flex-col", children: [_jsx("div", { className: "p-4 border-b border-border bg-card/50", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search roles...", className: "pl-10 bg-background/50 border-border", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) }), _jsx(ScrollArea, { className: "flex-1 h-[600px]", children: _jsx("div", { className: "p-2 space-y-1", children: filteredRoles.map((role) => (_jsxs("button", { onClick: () => setSelectedRole(role), className: `w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${selectedRole.id === role.id
                                            ? 'bg-luxury-gold/10 border border-luxury-gold/30 shadow-lg'
                                            : 'hover:bg-white/5 border border-transparent'}`, children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `p-2 rounded-lg bg-background/80 shadow-inner ${selectedRole.id === role.id ? 'text-luxury-gold' : 'text-muted-foreground'}`, children: _jsx(Shield, { className: "w-5 h-5" }) }), _jsxs("div", { className: "text-left", children: [_jsx("p", { className: `font-semibold tracking-wide ${selectedRole.id === role.id ? 'text-luxury-gold' : 'text-foreground'}`, children: role.name }), _jsxs("p", { className: "text-xs text-muted-foreground uppercase tracking-tighter", children: ["Level ", role.level, " \u2022 ", role.id] })] })] }), _jsx(ChevronRight, { className: `w-4 h-4 transition-transform ${selectedRole.id === role.id ? 'translate-x-1 text-luxury-gold' : 'text-muted-foreground opacity-0 group-hover:opacity-100'}` })] }, role.id))) }) })] }), _jsxs("div", { className: "lg:col-span-8 space-y-6", children: [_jsxs(Card, { className: "luxury-card p-6 border-luxury-gold/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-luxury-gold/20 flex items-center justify-center", children: _jsx(Lock, { className: "w-6 h-6 text-luxury-gold" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold", children: [selectedRole.name, " Permissions"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Grant or revoke functional access for this role." })] })] }), _jsx(Badge, { variant: "outline", className: "border-luxury-gold/30 text-luxury-gold px-3 py-1", children: "System Role" })] }), _jsxs(Tabs, { defaultValue: "shipments", className: "w-full", children: [_jsx(TabsList, { className: "grid grid-cols-2 md:grid-cols-5 bg-background/50 p-1 rounded-xl h-auto gap-1", children: PERMISSION_GROUPS.map(group => (_jsxs(TabsTrigger, { value: group.id, className: "data-[state=active]:bg-luxury-gold data-[state=active]:text-black py-2 text-xs md:text-sm", children: [_jsx(group.icon, { className: "w-4 h-4 mr-2 hidden md:inline-block" }), group.id.charAt(0).toUpperCase() + group.id.slice(1)] }, group.id))) }), PERMISSION_GROUPS.map(group => (_jsx(TabsContent, { value: group.id, className: "mt-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: group.permissions.map(permission => {
                                                        const isEnabled = (rolePermissions[selectedRole.id] || []).includes(permission);
                                                        return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: `flex items-center justify-between p-4 rounded-xl border transition-colors ${isEnabled ? 'bg-luxury-gold/5 border-luxury-gold/20' : 'bg-background/20 border-border'}`, children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-semibold capitalize", children: permission.replace(/_/g, ' ') }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Allow role to ", permission.replace(/_/g, ' '), " across the system."] })] }), _jsx(Switch, { checked: isEnabled, onCheckedChange: () => togglePermission(selectedRole.id, permission), className: "data-[state=checked]:bg-luxury-gold" })] }, permission));
                                                    }) }) }, group.id)))] })] }), _jsxs(Card, { className: "luxury-card p-6 bg-luxury-obsidian border-luxury-gold/5", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(UserCheck, { className: "w-5 h-5 text-luxury-gold" }), _jsx("h3", { className: "font-bold text-lg", children: "Role Hierarchy" })] }), _jsxs("div", { className: "relative flex flex-col items-center gap-2", children: [APP_ROLES.slice(0, 5).map((role, idx) => (_jsxs(React.Fragment, { children: [_jsx("div", { className: `px-6 py-3 rounded-full border border-luxury-gold/20 bg-background/40 min-w-[200px] text-center transition-all ${selectedRole.id === role.id ? 'ring-2 ring-luxury-gold border-luxury-gold' : 'opacity-60'}`, children: _jsx("span", { className: "text-sm font-bold tracking-widest", children: role.name }) }), idx < 4 && _jsx("div", { className: "w-0.5 h-6 bg-luxury-gold/20" })] }, role.id))), _jsx("div", { className: "mt-4 text-xs text-muted-foreground text-center italic", children: "Hierarchy determines operational override and data visibility bounds." })] })] }), _jsx(Card, { className: "p-6 border-red-500/20 bg-red-500/5", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-red-500" }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-red-500", children: "Caution" }), _jsx("p", { className: "text-sm text-red-500/60", children: "Changing core permissions may disrupt operational workflows." })] })] }), _jsxs(Button, { variant: "ghost", className: "text-red-500 hover:bg-red-500/10", children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "Deprecate Role"] })] }) })] })] })] }));
}
