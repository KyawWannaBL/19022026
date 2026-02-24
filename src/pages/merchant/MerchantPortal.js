import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Package, TrendingUp, Truck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function MetricCard({ title, value, change, icon, description }) {
    return (_jsx(Card, { className: "bg-white/5 border-white/10 backdrop-blur-xl rounded-[1.5rem] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]", children: icon }), change && (_jsx(Badge, { variant: "outline", className: "border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37] font-mono", children: change }))] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-3xl font-serif font-bold text-white", children: value }), _jsx("p", { className: "text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.2em]", children: title }), _jsx("p", { className: "text-xs text-white/50", children: description })] })] }) }));
}
export default function MerchantPortal() {
    const navigate = useNavigate();
    // Placeholder metrics (replace with real queries)
    const metrics = useMemo(() => [
        {
            title: "Active Shipments",
            value: "128",
            change: "+6%",
            description: "Currently in transit or pending handoff.",
            icon: _jsx(Truck, { className: "h-5 w-5" }),
        },
        {
            title: "Delivered Today",
            value: "42",
            change: "+3",
            description: "Completed last-mile deliveries.",
            icon: _jsx(Package, { className: "h-5 w-5" }),
        },
        {
            title: "Conversion",
            value: "18.4%",
            change: "+0.7%",
            description: "Successful checkout to shipment creation.",
            icon: _jsx(TrendingUp, { className: "h-5 w-5" }),
        },
        {
            title: "Customer Tickets",
            value: "7",
            description: "Open support requests.",
            icon: _jsx(Users, { className: "h-5 w-5" }),
        },
    ], []);
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white tracking-tight", children: "Merchant Portal" }), _jsx("p", { className: "text-white/40 text-sm", children: "Operational summary and quick actions." })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "outline", onClick: () => navigate("/reports"), children: "Analytics" }), _jsx(Button, { onClick: () => navigate("/operations"), children: "New Shipment" })] })] }), _jsx("div", { className: "grid sm:grid-cols-2 xl:grid-cols-4 gap-5", children: metrics.map((m) => (_jsx(MetricCard, { ...m }, m.title))) })] }));
}
