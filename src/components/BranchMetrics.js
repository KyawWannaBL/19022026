import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
export default function BranchMetrics() {
    const [metrics, setMetrics] = useState([]);
    useEffect(() => {
        const fetchMetrics = async () => {
            const { data, error } = await supabase
                .from('branch_shipment_metrics')
                .select('*');
            if (error)
                console.error('Error fetching metrics:', error);
            else
                setMetrics(data || []);
        };
        fetchMetrics();
    }, []);
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: metrics.map((m) => (_jsxs("div", { className: "p-4 bg-slate-800 rounded-lg border border-white/10", children: [_jsxs("h3", { className: "text-luxury-gold font-bold mb-2", children: ["Branch ", m.branch_id] }), _jsxs("div", { className: "flex justify-between text-sm text-white/70", children: [_jsxs("span", { children: ["Total: ", m.total_shipments] }), _jsxs("span", { className: "text-emerald-400", children: ["Delivered: ", m.delivered_count] }), _jsxs("span", { className: "text-amber-400", children: ["Pending: ", m.pending_count] })] }), _jsxs("div", { className: "mt-2 text-xs text-white/30", children: ["Success Rate: ", m.delivery_rate, "%"] })] }, m.branch_id))) }));
}
