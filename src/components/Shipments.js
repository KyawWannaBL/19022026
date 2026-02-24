import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Truck } from 'lucide-react';
export default function Shipments() {
    const shipments = [
        {
            id: '1',
            awb: 'EDS20241201001',
            status: 'BOOKED',
            senderName: 'John Doe',
            receiverName: 'Jane Smith',
            weight: 2.5,
            serviceType: 'express'
        },
        {
            id: '2',
            awb: 'EDS20241201002',
            status: 'DELIVERED',
            senderName: 'Alice Johnson',
            receiverName: 'Bob Wilson',
            weight: 1.8,
            serviceType: 'standard'
        }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Shipments" }), _jsx("p", { className: "text-muted-foreground", children: "Manage and track all shipments" })] }), _jsxs(Button, { className: "btn-modern", children: [_jsx(Package, { className: "mr-2 h-4 w-4" }), "Create Shipment"] })] }), _jsx("div", { className: "grid gap-4" })] }));
    {
        shipments.map((shipment) => (_jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: _jsx(Package, { className: "h-5 w-5 text-primary" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-mono", children: shipment.awb }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Express Delivery" })] })] }), _jsx(Badge, { variant: shipment.status === 'DELIVERED' ? 'default' : 'secondary', children: shipment.status })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "FROM" }), _jsx("p", { className: "font-medium", children: shipment.senderName })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "TO" }), _jsx("p", { className: "font-medium", children: shipment.receiverName })] })] }), _jsxs("div", { className: "flex items-center justify-between mt-4 pt-4 border-t border-border/50", children: [_jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Package, { className: "h-4 w-4" }), shipment.weight, "kg"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Truck, { className: "h-4 w-4" }), shipment.serviceType] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Track" }), _jsx(Button, { variant: "outline", size: "sm", children: "Edit" })] })] })] })] }, shipment.id)));
    }
    div >
    ;
    div >
    ;
    ;
}
