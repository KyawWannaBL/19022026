import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, Phone, Package, Navigation, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function PickupTask() {
    const tasks = [
        { id: 'T-001', address: '123 Pyay Road, Kamayut', time: '10:30 AM', items: 2 },
        { id: 'T-002', address: '45 Insein Road, Hlaing', time: '11:45 AM', items: 1 },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "My Pickups" }), _jsxs(Badge, { variant: "outline", children: [tasks.length, " Assigned"] })] }), _jsx("div", { className: "grid gap-4", children: tasks.map((task) => (_jsx(Card, { className: "border-l-4 border-l-blue-600", children: _jsxs(CardContent, { className: "p-4 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs font-bold text-slate-400", children: ["TASK ", task.id] }), _jsx(Badge, { className: "bg-blue-50 text-blue-600 border-none px-2 h-5 text-[10px]", children: "SCHEDULED" })] }), _jsxs("p", { className: "font-bold flex items-center gap-2", children: [_jsx(MapPin, { size: 16, className: "text-rose-500" }), " ", task.address] })] }), _jsx("p", { className: "text-sm font-semibold text-slate-600", children: task.time })] }), _jsxs("div", { className: "flex items-center gap-6 text-sm text-slate-500", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Package, { size: 14 }), " ", task.items, " Parcels"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Phone, { size: 14 }), " Call Sender"] })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsxs(Button, { className: "flex-1 bg-blue-600", children: [_jsx(Navigation, { className: "mr-2 h-4 w-4" }), " Navigate"] }), _jsxs(Button, { variant: "outline", className: "flex-1 border-blue-600 text-blue-600", children: [_jsx(Camera, { className: "mr-2 h-4 w-4" }), " Start Pickup"] })] })] }) }, task.id))) })] }));
}
