import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { FileText, Calendar, User, Database, Building2, Clock, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
export default function AuditLogViewer() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    // Filter States
    const [filterUser, setFilterUser] = useState('');
    const [filterBranch, setFilterBranch] = useState('');
    const [filterTable, setFilterTable] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const fetchLogs = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('audit_logs')
                .select('*')
                .order('createdAt', { ascending: false })
                .limit(100);
            if (filterUser)
                query = query.eq('user_id', filterUser);
            if (filterBranch)
                query = query.eq('branch_id', filterBranch);
            if (filterTable)
                query = query.ilike('table_name', `%${filterTable}%`);
            if (filterDate) {
                const start = new Date(filterDate).toISOString();
                const end = new Date(new Date(filterDate).setHours(23, 59, 59, 999)).toISOString();
                query = query.gte('createdAt', start).lte('createdAt', end);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            setLogs(data || []);
        }
        catch (error) {
            console.error('Error fetching audit logs:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLogs();
    }, []);
    return (_jsxs("div", { className: "space-y-6 h-[calc(100vh-8rem)] flex flex-col p-4", children: [_jsxs("div", { className: "flex items-center justify-between shrink-0", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-white tracking-tight flex items-center gap-2", children: [_jsx(FileText, { className: "h-6 w-6 text-emerald-500" }), "System Audit Logs"] }), _jsx("p", { className: "text-white/40 text-sm", children: "Track all modifications and security events." })] }), _jsxs(Button, { onClick: fetchLogs, variant: "outline", className: "border-white/10 text-white hover:bg-white/5", children: [_jsx(ArrowDownCircle, { className: "mr-2 h-4 w-4" }), "Refresh"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/10 shrink-0", children: [_jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" }), _jsx("input", { type: "text", placeholder: "User ID...", value: filterUser, onChange: (e) => setFilterUser(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white" })] }), _jsxs("div", { className: "relative", children: [_jsx(Building2, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" }), _jsx("input", { type: "text", placeholder: "Branch ID...", value: filterBranch, onChange: (e) => setFilterBranch(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white" })] }), _jsxs("div", { className: "relative", children: [_jsx(Database, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" }), _jsxs("select", { value: filterTable, onChange: (e) => setFilterTable(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white appearance-none", children: [_jsx("option", { value: "", children: "All Tables" }), _jsx("option", { value: "profiles", children: "Profiles" }), _jsx("option", { value: "shipments", children: "Shipments" }), _jsx("option", { value: "inventory", children: "Inventory" })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" }), _jsx("input", { type: "date", value: filterDate, onChange: (e) => setFilterDate(e.target.value), className: "w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white [color-scheme:dark]" })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto bg-black/20 rounded-xl border border-white/5 p-4 space-y-2", children: loading ? (_jsx("div", { className: "text-center py-20 text-white/30 animate-pulse", children: "Scanning audit trails..." })) : logs.length === 0 ? (_jsx("div", { className: "text-center py-20 text-white/30", children: "No audit records found." })) : (logs.map((log) => (_jsxs("div", { className: "group bg-slate-900/40 border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-all text-sm font-mono", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase ${log.action === 'INSERT' ? 'bg-emerald-500/10 text-emerald-400' :
                                                log.action === 'DELETE' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`, children: log.action }), _jsx("span", { className: "text-emerald-500 font-semibold", children: log.table_name }), _jsxs("span", { className: "text-white/30", children: ["#", log.record_id?.slice(0, 8)] })] }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-white/40", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(User, { className: "h-3 w-3" }), " ", log.user_id?.slice(0, 8)] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), " ", format(new Date(log.createdAt), 'MMM dd, HH:mm')] })] })] }), _jsxs("div", { className: "pl-2 border-l-2 border-white/10 text-xs text-white/60 truncate", children: [_jsx("span", { className: "text-white/30", children: "DATA: " }), " ", JSON.stringify(log.new_data || log.old_data || {})] })] }, log.id)))) })] }));
}
