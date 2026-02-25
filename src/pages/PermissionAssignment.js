import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner'; // Assuming you have a toast library, or use console.log
// Define system roles (Modify as needed for your app)
const SYSTEM_ROLES = ['APP_OWNER', 'MANAGER', 'DRIVER', 'USER'];
export default function PermissionAssignment() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [permissions, setPermissions] = useState([]);
    const [selectedRole, setSelectedRole] = useState('MANAGER');
    const [assignedPermissionIds, setAssignedPermissionIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);
    // 1. Fetch all available system permissions on mount
    useEffect(() => {
        const fetchPermissions = async () => {
            const { data, error } = await supabase
                .from('permissions')
                .select('*')
                .order('code');
            if (error)
                console.error('Error fetching permissions:', error);
            else
                setPermissions(data || []);
        };
        fetchPermissions();
    }, []);
    // 2. Fetch assigned permissions whenever the selected role changes
    useEffect(() => {
        const fetchRolePermissions = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('role_permissions')
                    .select('permission_id')
                    .eq('role', selectedRole);
                if (error)
                    throw error;
                // Create a Set of IDs for O(1) lookups
                const ids = new Set((data || []).map((rp) => rp.permission_id));
                setAssignedPermissionIds(ids);
            }
            catch (error) {
                console.error('Error fetching role permissions:', error);
            }
            finally {
                setLoading(false);
            }
        };
        if (selectedRole) {
            fetchRolePermissions();
        }
    }, [selectedRole]);
    // 3. Toggle Logic (Insert or Delete)
    const handleToggle = async (permissionId) => {
        const isAssigned = assignedPermissionIds.has(permissionId);
        setUpdating(permissionId); // Show loading state for specific item
        try {
            if (isAssigned) {
                // DELETE logic
                const { error } = await supabase
                    .from('role_permissions')
                    .delete()
                    .eq('role', selectedRole)
                    .eq('permission_id', permissionId);
                if (error)
                    throw error;
                // Update local state
                const next = new Set(assignedPermissionIds);
                next.delete(permissionId);
                setAssignedPermissionIds(next);
                toast.success(`Removed permission from ${selectedRole}`);
            }
            else {
                // INSERT logic
                const { error } = await supabase
                    .from('role_permissions')
                    .insert({
                    role: selectedRole,
                    permission_id: permissionId
                });
                if (error)
                    throw error;
                // Update local state
                const next = new Set(assignedPermissionIds);
                next.add(permissionId);
                setAssignedPermissionIds(next);
                toast.success(`Added permission to ${selectedRole}`);
            }
        }
        catch (error) {
            console.error('Toggle error:', error);
            toast.error('Failed to update permission');
        }
        finally {
            setUpdating(null);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "Access Control" }), _jsx("p", { className: "text-white/40 text-sm", children: "Configure permission sets for system roles." })] }), _jsxs("div", { className: "grid lg:grid-cols-4 gap-8", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsxs("div", { className: "bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 p-4", children: [_jsx("h3", { className: "text-xs font-bold text-white/40 uppercase tracking-wider mb-4", children: "Select Role" }), _jsx("div", { className: "space-y-2", children: SYSTEM_ROLES.map((role) => (_jsxs("button", { onClick: () => setSelectedRole(role), className: cn("w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200", selectedRole === role
                                                ? "bg-luxury-gold text-luxury-obsidian shadow-lg shadow-luxury-gold/20"
                                                : "text-white/60 hover:bg-white/5 hover:text-white"), children: [_jsx("span", { children: role }), selectedRole === role && _jsx(Shield, { className: "h-4 w-4" })] }, role))) })] }), selectedRole === 'APP_OWNER' && (_jsxs("div", { className: "bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500 shrink-0" }), _jsxs("p", { className: "text-xs text-amber-200/80", children: [_jsx("strong", { children: "Note:" }), " The 'APP_OWNER' role typically bypasses checks in code, but you can still document permissions here for clarity."] })] }))] }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 p-6 min-h-[500px]", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h2", { className: "text-lg font-semibold text-white", children: ["Permissions for ", _jsx("span", { className: "text-luxury-gold", children: selectedRole })] }), _jsxs("div", { className: "text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full", children: [assignedPermissionIds.size, " Active Permissions"] })] }), loading ? (_jsx("div", { className: "space-y-3", children: [1, 2, 3].map(i => (_jsx("div", { className: "h-16 bg-white/5 rounded-lg animate-pulse" }, i))) })) : (_jsx("div", { className: "grid gap-3", children: permissions.map((perm) => {
                                        const isActive = assignedPermissionIds.has(perm.id);
                                        const isUpdating = updating === perm.id;
                                        return (_jsxs("div", { className: cn("group flex items-center justify-between p-4 rounded-lg border transition-all duration-200", isActive
                                                ? "bg-emerald-500/5 border-emerald-500/20"
                                                : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"), children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn("h-10 w-10 rounded-lg flex items-center justify-center transition-colors", isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/20"), children: _jsx(Lock, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("p", { className: cn("font-mono text-sm font-medium", isActive ? "text-emerald-400" : "text-white/70"), children: perm.code }), _jsx("p", { className: "text-xs text-white/40", children: perm.description })] })] }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "sr-only peer", checked: isActive, onChange: () => handleToggle(perm.id), disabled: isUpdating }), _jsx("div", { className: "w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" })] })] }, perm.id));
                                    }) }))] }) })] })] }));
}
