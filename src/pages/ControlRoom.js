import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function ControlRoom() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [sessions, setSessions] = useState([]);
    const fetchSessions = async () => {
        const { data } = await supabase
            .from("user_sessions")
            .select("*")
            .order("last_seen", { ascending: false });
        if (data)
            setSessions(data);
    };
    useEffect(() => {
        fetchSessions();
        const channel = supabase
            .channel('live-sessions')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'user_sessions' }, fetchSessions)
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    return (_jsxs("div", { className: "p-10 space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Live Session Monitor" }), _jsx("div", { className: "luxury-card p-6", children: sessions.map(s => (_jsxs("div", { className: "border-b border-white/10 py-3 flex justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-white", children: [s.user_id.slice(0, 8), "..."] }), _jsx("div", { className: "text-xs text-white/40", children: s.role })] }), _jsxs("div", { className: "text-sm text-emerald-400", children: [Math.floor((Date.now() - new Date(s.last_seen).getTime()) / 1000), "s ago"] })] }, s.user_id))) })] }));
}
