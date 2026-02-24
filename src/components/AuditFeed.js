import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Activity, Package, Truck, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
const AuditFeed = () => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        // 1. Initial Fetch of recent logs
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('audit_log')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);
            if (!error && data)
                setLogs(data);
        };
        fetchLogs();
        // 2. Realtime Subscription for Luxury Updates
        const channel = supabase
            .channel('schema-db-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'audit_log' }, (payload) => {
            setLogs((prev) => [payload.new, ...prev].slice(0, 10));
        })
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    const getIcon = (action) => {
        switch (action.toLowerCase()) {
            case 'insert': return _jsx(Package, { className: "text-emerald-400", size: 18 });
            case 'update': return _jsx(Truck, { className: "text-amber-400", size: 18 });
            case 'delete': return _jsx(AlertCircle, { className: "text-rose-400", size: 18 });
            default: return _jsx(Activity, { className: "text-blue-400", size: 18 });
        }
    };
    return (_jsxs("div", { className: "bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-2xl", children: [_jsxs("div", { className: "p-4 border-b border-white/5 flex items-center justify-between", children: [_jsxs("h3", { className: "text-white font-semibold flex items-center gap-2", children: [_jsx(Activity, { size: 18, className: "text-indigo-400" }), "Live Audit Feed"] }), _jsx("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" })] }), _jsx("div", { className: "divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar", children: logs.length > 0 ? (logs.map((log) => (_jsx("div", { className: "p-4 hover:bg-white/[0.02] transition-colors group", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-1 p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors", children: getIcon(log.action) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("p", { className: "text-sm text-gray-200 font-medium truncate", children: [log.table_name.charAt(0).toUpperCase() + log.table_name.slice(1), " ", log.action.toLowerCase(), "d"] }), _jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [log.user_email || 'System Process', " \u2022 ", format(new Date(log.created_at), 'HH:mm:ss')] })] })] }) }, log.id)))) : (_jsx("div", { className: "p-8 text-center text-gray-500 text-sm", children: "Waiting for activity..." })) })] }));
};
export default AuditFeed;
