import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';
const data = [
    { name: 'Mon', revenue: 4200, projection: 4000 },
    { name: 'Tue', revenue: 5100, projection: 4800 },
    { name: 'Wed', revenue: 4800, projection: 5200 },
    { name: 'Thu', revenue: 6200, projection: 5800 },
    { name: 'Fri', revenue: 7800, projection: 6500 },
    { name: 'Sat', revenue: 8400, projection: 7200 },
    { name: 'Sun', revenue: 9100, projection: 8000 },
];
export default function RevenueForecast() {
    return (_jsxs("div", { className: "luxury-card p-8 h-full min-h-[400px]", children: [_jsxs("div", { className: "flex justify-between items-start mb-10", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center", children: _jsx(DollarSign, { className: "h-6 w-6 text-emerald-500" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold uppercase tracking-[0.2em] text-luxury-cream", children: "Revenue Intelligence" }), _jsx("p", { className: "text-[10px] text-white/30 uppercase", children: "Weekly Performance vs Projection" })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center gap-2 text-emerald-400", children: [_jsx(TrendingUp, { className: "h-4 w-4" }), _jsx("span", { className: "text-xl font-bold", children: "+24.8%" })] }), _jsx("p", { className: "text-[10px] text-white/30 uppercase tracking-tighter", children: "Above Target" })] })] }), _jsx("div", { className: "h-[250px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorRev", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#D4AF37", stopOpacity: 0.3 }), _jsx("stop", { offset: "95%", stopColor: "#D4AF37", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#ffffff05", vertical: false }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: '#ffffff30', fontSize: 10, fontWeight: 'bold' }, dy: 15 }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, { contentStyle: {
                                    backgroundColor: '#0B0C10',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    color: '#FAF9F6'
                                } }), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#D4AF37", strokeWidth: 3, fillOpacity: 1, fill: "url(#colorRev)" }), _jsx(Line, { type: "monotone", dataKey: "projection", stroke: "#ffffff20", strokeWidth: 2, strokeDasharray: "5 5", dot: false })] }) }) }), _jsxs("div", { className: "flex gap-6 mt-6 border-t border-white/5 pt-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-luxury-gold" }), _jsx("span", { className: "text-[10px] text-white/40 uppercase font-bold tracking-widest", children: "Actual Revenue" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-2 w-2 rounded-full bg-white/10" }), _jsx("span", { className: "text-[10px] text-white/40 uppercase font-bold tracking-widest", children: "Target Projection" })] })] })] }));
}
