import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, Search, History, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
import { DashboardStat } from '@/components/ui/SharedComponents';
import { Link } from 'react-router-dom';
// Clean data declaration to avoid build errors
const customerShipments = [
    { id: '1', awb: 'BE-5001', status: 'in_transit', to: 'Mandalay', date: '2026-02-23' },
    { id: '2', awb: 'BE-5002', status: 'delivered', to: 'Yangon', date: '2026-02-20' },
    { id: '3', awb: 'BE-5003', status: 'pending', to: 'Nay Pyi Taw', date: '2026-02-24' },
];
export default function CustomerDashboardPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const [search, setSearch] = useState('');
    const filtered = customerShipments.filter(s => s.awb.toLowerCase().includes(search.toLowerCase()));
    return (_jsxs("div", { className: "p-6 bg-slate-50 min-h-screen", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-black text-[#0d2c54] uppercase tracking-tighter italic", children: "My Shipments" }), _jsx("p", { className: "text-xs text-slate-500 font-bold uppercase tracking-widest", children: "Manage your personal deliveries" })] }), _jsx(Button, { asChild: true, className: "bg-[#ff6b00] hover:bg-[#e66000] text-white font-black px-6 rounded-xl", children: _jsxs(Link, { to: "/customer/booking", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " New Delivery"] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(DashboardStat, { icon: Clock, label: "Active", value: "2", color: "blue" }), _jsx(DashboardStat, { icon: CheckCircle2, label: "Delivered", value: "15", color: "green" }), _jsx(DashboardStat, { icon: History, label: "Total Orders", value: "17", color: "orange" })] }), _jsxs(Card, { className: "border-none shadow-xl rounded-3xl overflow-hidden", children: [_jsx(CardHeader, { className: "bg-white border-b pb-4", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsx(CardTitle, { className: "text-lg font-black text-[#0d2c54] uppercase", children: "Track Existing" }), _jsxs("div", { className: "relative w-full md:w-72", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" }), _jsx(Input, { placeholder: "Search tracking ID...", className: "pl-10 h-10 border-2 rounded-xl", value: search, onChange: (e) => setSearch(e.target.value) })] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-50", children: _jsxs("tr", { className: "border-b text-[10px] font-black uppercase text-slate-400", children: [_jsx("th", { className: "text-left p-4 tracking-widest", children: "Tracking Number" }), _jsx("th", { className: "text-left p-4 tracking-widest", children: "Destination" }), _jsx("th", { className: "text-left p-4 tracking-widest", children: "Status" }), _jsx("th", { className: "text-left p-4 tracking-widest text-right", children: "Action" })] }) }), _jsx("tbody", { className: "divide-y", children: filtered.map((s) => (_jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors", children: [_jsx("td", { className: "p-4 font-bold text-blue-700", children: s.awb }), _jsx("td", { className: "p-4 font-medium text-slate-600", children: s.to }), _jsx("td", { className: "p-4", children: _jsx(Badge, { variant: s.status === 'delivered' ? 'outline' : 'default', className: "uppercase text-[9px] font-black", children: s.status.replace('_', ' ') }) }), _jsx("td", { className: "p-4 text-right", children: _jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "text-[#0d2c54] font-black text-[10px] uppercase", children: _jsxs(Link, { to: `${ROUTE_PATHS.PUBLIC_TRACKING}?id=${s.awb}`, children: ["Details ", _jsx(ArrowRight, { size: 12, className: "ml-1" })] }) }) })] }, s.id))) })] }) }) })] })] }));
}
