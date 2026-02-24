import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
export default function OrderManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    // Mock data for build verification
    const orders = [
        { id: 'BRX-9022-A', customer: 'Aung Kyaw', status: 'Pending', date: '2026-02-23' },
        { id: 'BRX-8812-B', customer: 'Ma Su', status: 'In Transit', date: '2026-02-22' },
        { id: 'BRX-7741-C', customer: 'Ko Min', status: 'Delivered', date: '2026-02-21' },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-700';
            case 'In Transit': return 'bg-blue-100 text-blue-700';
            default: return 'bg-amber-100 text-amber-700';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Order Management" }), _jsx("p", { className: "text-slate-500 text-sm", children: "Monitor and update all active shipments." })] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-500", children: "Create New Shipment" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }), _jsx(Input, { placeholder: "Search Tracking ID...", className: "pl-9", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), " Filter"] })] }), _jsx("div", { className: "bg-white border rounded-xl overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Tracking ID" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: orders.map((order) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-mono font-medium", children: order.id }), _jsx(TableCell, { children: order.customer }), _jsx(TableCell, { children: order.date }), _jsx(TableCell, { children: _jsx(Badge, { className: getStatusColor(order.status), variant: "secondary", children: order.status }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { size: 16 }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), " Update Status"] }), _jsxs(DropdownMenuItem, { className: "text-rose-600", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), " Cancel"] })] })] }) })] }, order.id))) })] }) })] }));
}
