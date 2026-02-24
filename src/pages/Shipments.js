import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Search, Filter, Eye, MoreVertical, Download, Truck, ArrowUpDown, Calendar } from 'lucide-react';
import { ROUTE_PATHS, SHIPMENT_STATUSES } from '@/lib/index';
import { mockShipments } from '@/data/index';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { DataTable } from '@/components/DataTable';
import { StatusBadge, TrackingTimeline } from '@/components/TrackingComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
export default function Shipments() {
    const navigate = useNavigate();
    const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const filteredShipments = useMemo(() => {
        return mockShipments.filter((shipment) => {
            return shipments.filter((shipment) => {
                const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    shipment.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    shipment.receiverName.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
                return matchesSearch && matchesStatus;
            });
        }, [searchQuery, statusFilter]);
        const handleViewDetails = (shipment) => {
            setSelectedShipment(shipment);
            setIsDetailOpen(true);
        };
        const columns = [
            {
                header: 'Tracking Number',
                accessorKey: 'trackingNumber',
                cell: (item) => (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-mono font-bold text-primary", children: item.trackingNumber }), _jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), new Date(item.createdAt).toLocaleDateString()] })] })),
            },
            {
                header: 'Sender',
                accessorKey: 'senderName',
                cell: (item) => (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: item.senderName }), _jsx("span", { className: "text-xs text-muted-foreground", children: item.senderCity })] })),
            },
            {
                header: 'Receiver',
                accessorKey: 'receiverName',
                cell: (item) => (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: item.receiverName }), _jsx("span", { className: "text-xs text-muted-foreground", children: item.receiverCity })] })),
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (item) => _jsx(StatusBadge, { status: item.status }),
            },
            {
                header: 'Price / COD',
                accessorKey: 'price',
                cell: (item) => (_jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "font-semibold", children: ["\u00A3", item.price.toFixed(2)] }), item.codAmount > 0 && (_jsxs(Badge, { variant: "outline", className: "w-fit text-[10px] h-4 mt-1 border-accent/30 text-accent", children: ["COD: \u00A3", item.codAmount] }))] })),
            },
            {
                header: 'Actions',
                accessorKey: 'actions',
                cell: (item) => (_jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleViewDetails(item), className: "hover:bg-primary/10 hover:text-primary", children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [_jsx(DropdownMenuLabel, { children: "Shipment Actions" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => handleViewDetails(item), children: "View Full Timeline" }), _jsx(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.TRACKING + `?id=${item.trackingNumber}`), children: "Public Tracking Page" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { className: "text-destructive", children: "Cancel Shipment" })] })] })] })),
            },
        ];
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Shipment Management" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Track, manage, and dispatch all active deliveries across the network." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "hidden sm:flex items-center gap-2", children: [_jsx(Download, { className: "w-4 h-4" }), "Export CSV"] }), _jsxs(Button, { onClick: () => navigate(ROUTE_PATHS.CREATE_SHIPMENT), className: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), "New Shipment"] })] })] }), _jsx(Card, { className: "border-none shadow-sm bg-card/50 backdrop-blur-sm", children: _jsxs(CardContent, { className: "p-4 flex flex-wrap items-center gap-4", children: [_jsxs("div", { className: "relative flex-1 min-w-[280px]", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search tracking ID, sender or receiver...", className: "pl-10 bg-background border-border/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4" }), "Status: ", statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)] }) }), _jsxs(DropdownMenuContent, { className: "w-56", children: [_jsx(DropdownMenuLabel, { children: "Filter by Status" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { onClick: () => setStatusFilter('all'), children: "All Shipments" }), Object.values(SHIPMENT_STATUSES).map((status) => (_jsx(DropdownMenuItem, { onClick: () => setStatusFilter(status), children: status.replace(/_/g, ' ').toUpperCase() }, status)))] })] }) }), _jsxs("div", { className: "ml-auto text-sm text-muted-foreground font-medium", children: ["Showing ", filteredShipments.length, " shipments"] })] }) }), _jsx("div", { className: "bg-card rounded-xl border border-border overflow-hidden", children: _jsx(DataTable, { columns: columns, data: filteredShipments, searchPlaceholder: "Search in results..." }) }), _jsx(Sheet, { open: isDetailOpen, onOpenChange: setIsDetailOpen, children: _jsxs(SheetContent, { className: "sm:max-w-xl overflow-y-auto bg-background", children: [_jsxs(SheetHeader, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Badge, { className: "bg-primary/10 text-primary border-none text-sm px-3 py-1", children: [_jsx(Truck, { className: "w-3 h-3 mr-2" }), "Logistics Detail"] }), _jsx(StatusBadge, { status: selectedShipment?.status || SHIPMENT_STATUSES.PENDING })] }), _jsx(SheetTitle, { className: "text-2xl font-bold font-mono", children: selectedShipment?.trackingNumber }), _jsxs(SheetDescription, { children: ["Created on ", selectedShipment && new Date(selectedShipment.createdAt).toLocaleString()] })] }), selectedShipment && (_jsxs("div", { className: "mt-8 space-y-8", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase", children: "Sender" }), _jsx("p", { className: "font-semibold", children: selectedShipment.senderName }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedShipment.senderAddress }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedShipment.senderCity })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase", children: "Receiver" }), _jsx("p", { className: "font-semibold", children: selectedShipment.receiverName }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedShipment.receiverAddress }), _jsx("p", { className: "text-sm text-muted-foreground", children: selectedShipment.receiverCity })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-primary" }), "Package Information"] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: "Weight" }), _jsxs("p", { className: "font-medium", children: [selectedShipment.weight, " kg"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: "Service Fee" }), _jsxs("p", { className: "font-medium", children: ["\u00A3", selectedShipment.price.toFixed(2)] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: "Payment" }), _jsx("p", { className: "font-medium capitalize text-primary", children: selectedShipment.paymentStatus })] })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(ArrowUpDown, { className: "w-4 h-4 text-primary" }), "Tracking History"] }), _jsx(TrackingTimeline, { shipment: selectedShipment })] }), _jsxs("div", { className: "flex gap-3 pt-6", children: [_jsx(Button, { className: "flex-1 bg-primary", children: "Print Label" }), _jsx(Button, { variant: "outline", className: "flex-1", children: "Edit Shipment" })] })] }))] }) }), _jsx("footer", { className: "pt-8 pb-4 text-center text-xs text-muted-foreground", children: "\u00A9 2026 Britium Express. All shipments are monitored via GPS Real-Time Protocol." })] }));
    });
}
