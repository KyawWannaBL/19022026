import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/FleetStatus.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Truck, Circle, UserCheck } from 'lucide-react';
export default function FleetStatus() {
    const [riders, setRiders] = useState([]);
    useEffect(() => {
        const fetchFleet = async () => {
            const { data } = await supabase
                .from('user_profiles')
                .select('full_name, status, current_load')
                .eq('role', 'RIDER');
            if (data)
                setRiders(data);
        };
        fetchFleet();
        const sub = supabase.channel('fleet-sync').on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, fetchFleet).subscribe();
        return () => { supabase.removeChannel(sub); };
    }, []);
    return (_jsxs("div", { className: "luxury-card p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(UserCheck, { className: "h-4 w-4 text-luxury-gold" }), _jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-white/60", children: "Active Fleet" })] }), _jsx("div", { className: "space-y-4", children: riders.map((rider, i) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-luxury-gold/10 flex items-center justify-center", children: _jsx(Truck, { className: "h-4 w-4 text-luxury-gold" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-bold text-luxury-cream", children: rider.full_name }), _jsxs("p", { className: "text-[10px] text-white/40 uppercase tracking-tighter", children: ["Load: ", rider.current_load || 0, " Parcels"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[9px] font-mono text-white/40 uppercase", children: rider.status || 'Idle' }), _jsx(Circle, { className: `h-2 w-2 fill-current ${rider.status === 'active' ? 'text-emerald-500' : 'text-white/20'}` })] })] }, i))) })] }));
}
