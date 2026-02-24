import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Plus, Search, MoreHorizontal, Shield, Building2, CheckCircle2, XCircle } from 'lucide-react';
export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    // 1. Fetch Logic
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles') // or 'user_profiles' depending on your exact table name
                .select(`
          id,
          full_name,
          role,
          branch_id,
          is_active,
          is_demo,
          branches(name)
        `)
                .order('full_name');
            if (error)
                throw error;
            setUsers(data || []);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    // 2. Filter Logic
    const filteredUsers = users.filter(user => user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "User Management" }), _jsx("p", { className: "text-white/40 text-sm", children: "Manage access, roles, and branch assignments." })] }), _jsx("div", { className: "flex items-center gap-3", children: _jsxs(Button, { className: "bg-emerald-600 hover:bg-emerald-500 text-white", requiredPermission: "users.create", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add User"] }) })] }), _jsx("div", { className: "flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10", children: _jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" }), _jsx("input", { type: "text", placeholder: "Search users...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full bg-black/20 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-luxury-gold/50 transition-colors" })] }) }), _jsx("div", { className: "bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm text-left", children: [_jsx("thead", { className: "bg-white/5 text-white/40 uppercase text-xs font-medium tracking-wider", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4", children: "User" }), _jsx("th", { className: "px-6 py-4", children: "Role" }), _jsx("th", { className: "px-6 py-4", children: "Branch" }), _jsx("th", { className: "px-6 py-4", children: "Status" }), _jsx("th", { className: "px-6 py-4 text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-white/5", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-6 py-8 text-center text-white/40", children: "Loading directory..." }) })) : filteredUsers.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-6 py-8 text-center text-white/40", children: "No users found." }) })) : (filteredUsers.map((user) => (_jsxs("tr", { className: "hover:bg-white/5 transition-colors group", children: [_jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-medium border border-white/10", children: user.full_name?.charAt(0) || 'U' }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: user.full_name }), _jsxs("p", { className: "text-xs text-white/40", children: ["ID: ", user.id.slice(0, 8), "..."] })] })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-3 w-3 text-luxury-gold" }), _jsx("span", { className: `
                          inline-flex items-center px-2 py-1 rounded text-xs font-medium border
                          ${user.role === 'APP_OWNER' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                            user.role === 'MANAGER' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                                'bg-slate-700/50 text-slate-300 border-slate-600/50'}
                        `, children: user.role })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex items-center gap-2 text-white/70", children: [_jsx(Building2, { className: "h-3 w-3" }), user.branches?.name || _jsx("span", { className: "text-white/30 italic", children: "Global" })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [user.is_active ? (_jsx(CheckCircle2, { className: "h-3 w-3 text-emerald-500" })) : (_jsx(XCircle, { className: "h-3 w-3 text-red-500" })), _jsx("span", { className: user.is_active ? "text-emerald-400" : "text-red-400", children: user.is_active ? 'Active' : 'Inactive' })] }), user.is_demo && (_jsx("span", { className: "text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded w-fit border border-purple-500/30", children: "DEMO MODE" }))] }) }), _jsx("td", { className: "px-6 py-4 text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity", requiredPermission: "users.manage", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-white/60" }) }) })] }, user.id)))) })] }) }) })] }));
}
