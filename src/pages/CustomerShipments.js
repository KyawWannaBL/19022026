import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Search, Eye, Download, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
export default function CustomerShipments() {
    const { t } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const shipments = [
        {
            id: 'BE-89744',
            date: 'Oct 24, 2026',
            receiver: 'Daw Hla',
            destination: 'Mandalay',
            codAmount: '35,000 MMK',
            status: 'In Transit',
            statusColor: 'bg-blue-100 text-blue-800',
        },
        {
            id: 'BE-11223',
            date: 'Oct 20, 2026',
            receiver: 'U Ba Maung',
            destination: 'Nay Pyi Taw',
            codAmount: '12,500 MMK',
            status: 'Delivered',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'BE-88901',
            date: 'Oct 18, 2026',
            receiver: 'Ma Mya',
            destination: 'Yangon (North Dagon)',
            codAmount: '--',
            status: 'Delivered',
            statusColor: 'bg-green-100 text-green-800',
        },
        {
            id: 'BE-77120',
            date: 'Oct 15, 2026',
            receiver: 'Ko Ko',
            destination: 'Mawlamyine',
            codAmount: '5,500 MMK',
            status: 'Cancelled',
            statusColor: 'bg-red-100 text-red-800',
        },
    ];
    const filteredShipments = shipments.filter(shipment => {
        const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.receiver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || shipment.status.toLowerCase().includes(statusFilter.toLowerCase());
        return matchesSearch && matchesStatus;
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: t('customer.shipments.title') }), _jsx("p", { className: "text-gray-600", children: t('customer.shipments.subtitle') })] }), _jsx(Button, { asChild: true, className: "bg-gold hover:bg-gold/90 text-navy-900", children: _jsxs(Link, { to: ROUTE_PATHS.CUSTOMER_BOOKING, children: [_jsx(PlusCircle, { className: "w-4 h-4 mr-2" }), "Create New"] }) })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx("div", { className: "md:col-span-2", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search Tracking ID or Receiver Name...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }) }), _jsx("div", { children: _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "All Statuses" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Statuses" }), _jsx(SelectItem, { value: "transit", children: "In Transit" }), _jsx(SelectItem, { value: "delivered", children: "Delivered" }), _jsx(SelectItem, { value: "pending", children: "Pending Pickup" }), _jsx(SelectItem, { value: "cancelled", children: "Cancelled" })] })] }) }), _jsx("div", { children: _jsx(Input, { type: "date" }) })] }) }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Your Shipments" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-200", children: [_jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "Tracking ID" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "Date" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "Receiver" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "Destination" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "COD Amount" }), _jsx("th", { className: "text-left py-3 px-4 font-semibold text-gray-700", children: "Status" }), _jsx("th", { className: "text-right py-3 px-4 font-semibold text-gray-700", children: "Actions" })] }) }), _jsx("tbody", { children: filteredShipments.map((shipment) => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-4 px-4", children: _jsx("span", { className: "font-semibold text-primary", children: shipment.id }) }), _jsx("td", { className: "py-4 px-4 text-sm text-gray-600", children: shipment.date }), _jsx("td", { className: "py-4 px-4 font-medium", children: shipment.receiver }), _jsx("td", { className: "py-4 px-4", children: shipment.destination }), _jsx("td", { className: "py-4 px-4", children: shipment.codAmount }), _jsx("td", { className: "py-4 px-4", children: _jsx(Badge, { className: shipment.statusColor, children: shipment.status }) }), _jsx("td", { className: "py-4 px-4 text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Eye, { className: "w-4 h-4 mr-1" }), "Track"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-1" }), "Invoice"] })] }) })] }, shipment.id))) })] }) }), filteredShipments.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Package, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: "No shipments found matching your criteria." })] })), _jsxs("div", { className: "flex justify-between items-center mt-6 pt-4 border-t border-gray-200", children: [_jsx("p", { className: "text-sm text-gray-500", children: "Showing 1-4 of 28 shipments" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Previous" }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-navy-900 text-white", children: "1" }), _jsx(Button, { variant: "outline", size: "sm", children: "2" }), _jsx(Button, { variant: "outline", size: "sm", children: "3" }), _jsx(Button, { variant: "outline", size: "sm", children: "Next" })] })] })] })] })] }));
}
