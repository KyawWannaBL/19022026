import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Shield, Save, Search, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
// Mock data for initial setup
const ROLES = ['SUPER_ADMIN', 'OPERATIONS_ADMIN', 'FINANCE_ADMIN', 'RIDER', 'SUBSTATION_MANAGER'];
const PERMISSION_CATEGORIES = {
    Operations: ['shipment.create', 'shipment.edit', 'wayplan.generate', 'pickup.verify'],
    Finance: ['cod.reconcile', 'payout.approve', 'finance.export'],
    UserMgmt: ['user.create', 'user.suspend', 'role.assign']
};
export default function RoleManagement() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [selectedRole, setSelectedRole] = useState('OPERATIONS_ADMIN');
    const [activePermissions, setActivePermissions] = useState(['shipment.create', 'shipment.edit']);
    const [isSaving, setIsSaving] = useState(false);
    const togglePermission = (perm) => {
        setActivePermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
    };
    const handleSave = () => {
        setIsSaving(true);
        // Simulate API Call
        setTimeout(() => {
            setIsSaving(false);
            alert(`Permissions updated for ${selectedRole}`);
        }, 1000);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400", children: "Access Control" }), _jsx("p", { className: "text-slate-400 mt-1", children: "Manage system-wide roles and granular permission sets." })] }), _jsxs("button", { onClick: handleSave, disabled: isSaving, className: "flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50", children: [isSaving ? _jsx("div", { className: "h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" }) : _jsx(Save, { size: 18 }), "Save Changes"] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsxs("div", { className: "luxury-glass p-4 rounded-2xl border border-slate-700/50", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-400 mb-4 px-2", children: [_jsx(Search, { size: 16 }), _jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: "Select Role" })] }), _jsx("div", { className: "space-y-1", children: ROLES.map(role => (_jsx("button", { onClick: () => setSelectedRole(role), className: `w-full text-left px-4 py-3 rounded-xl transition-all ${selectedRole === role
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: role.replace('_', ' ') }), selectedRole === role && _jsx(CheckCircle2, { size: 14 })] }) }, role))) })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10", children: [_jsxs("div", { className: "flex gap-2 text-amber-500 mb-2", children: [_jsx(AlertCircle, { size: 16 }), _jsx("span", { className: "text-xs font-bold uppercase", children: "Security Note" })] }), _jsx("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: "Changes to permissions take effect immediately upon the user's next session synchronization." })] })] }), _jsxs("div", { className: "lg:col-span-3 space-y-6", children: [Object.entries(PERMISSION_CATEGORIES).map(([category, perms]) => (_jsxs("div", { className: "luxury-glass rounded-2xl border border-slate-700/50 overflow-hidden", children: [_jsxs("div", { className: "px-6 py-4 bg-slate-800/30 border-b border-slate-700/50 flex items-center justify-between", children: [_jsxs("h3", { className: "text-white font-bold tracking-wide", children: [category, " Permissions"] }), _jsxs("span", { className: "text-[10px] bg-slate-700 px-2 py-1 rounded text-slate-300 uppercase font-mono", children: ["Module: ", category.toLowerCase()] })] }), _jsx("div", { className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: perms.map(perm => (_jsxs("div", { onClick: () => togglePermission(perm), className: `group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${activePermissions.includes(perm)
                                                ? 'bg-emerald-500/5 border-emerald-500/30'
                                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `p-2 rounded-lg transition-colors ${activePermissions.includes(perm) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`, children: _jsx(Shield, { size: 16 }) }), _jsxs("div", { children: [_jsx("p", { className: `text-sm font-semibold transition-colors ${activePermissions.includes(perm) ? 'text-white' : 'text-slate-400'}`, children: perm.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') }), _jsx("p", { className: "text-[10px] text-slate-500 font-mono", children: perm })] })] }), _jsx("div", { className: `h-5 w-5 rounded-md border-2 transition-all flex items-center justify-center ${activePermissions.includes(perm)
                                                        ? 'bg-emerald-500 border-emerald-500'
                                                        : 'border-slate-700 group-hover:border-slate-500'}`, children: activePermissions.includes(perm) && _jsx(CheckCircle2, { size: 12, className: "text-white" }) })] }, perm))) })] }, category))), _jsxs("div", { className: "p-6 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500", children: _jsx(Lock, { size: 24 }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-white font-bold", children: "Restrictive Mode" }), _jsx("p", { className: "text-sm text-slate-400", children: "Force multi-factor authentication for this role on sensitive operations." })] })] }), _jsx("div", { className: "h-6 w-11 bg-slate-700 rounded-full relative cursor-not-allowed", children: _jsx("div", { className: "absolute left-1 top-1 h-4 w-4 bg-slate-500 rounded-full" }) })] })] })] })] }));
}
