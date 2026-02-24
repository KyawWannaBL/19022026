import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ClipboardEdit, Package, Truck, Upload } from "lucide-react";
export default function DataEntry() {
    const tiles = [
        { title: "Shipment Registration", href: "/operations", icon: Truck, desc: "Create a new shipment / waybill" },
        { title: "Shipments", href: "/shipments", icon: Package, desc: "Search and manage shipment records" },
        { title: "Bulk CSV Upload", href: "/operations", icon: Upload, desc: "Upload manifest in bulk (CSV)" },
    ];
    return (_jsxs("div", { className: "space-y-6 text-slate-100", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center", children: _jsx(ClipboardEdit, { className: "h-5 w-5 text-white/80" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Data Entry Desk" }), _jsx("p", { className: "text-white/60 text-sm", children: "Fast, structured entry for operations." })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: tiles.map((t) => (_jsx(Link, { to: t.href, className: "rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-semibold text-white", children: t.title }), _jsx("div", { className: "text-xs text-white/50 mt-1", children: t.desc })] }), _jsx(t.icon, { className: "h-5 w-5 text-white/70" })] }) }, t.href + t.title))) })] }));
}
