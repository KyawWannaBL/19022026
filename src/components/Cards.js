import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Package, Truck, TrendingUp, TrendingDown, MapPin, Calendar, User, Weight, ArrowRight, Fuel, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatWeight } from '@/lib/index';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/utils';
import { springPresets, hoverLift } from '@/lib/motion';
export function MetricsCard({ title, value, icon: Icon, trend, description, className }) {
    return (_jsx(motion.div, { variants: hoverLift, initial: "rest", whileHover: "hover", className: "h-full", children: _jsxs(Card, { className: cn("h-full border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200", className), children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2 space-y-0", children: [_jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("div", { className: "p-2 rounded-md bg-primary/10 text-primary", children: _jsx(Icon, { className: "w-4 h-4" }) })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold font-mono tracking-tight", children: value }), trend && (_jsxs("div", { className: "flex items-center mt-1 space-x-1", children: [trend.isPositive ? (_jsx(TrendingUp, { className: "w-3 h-3 text-emerald-500" })) : (_jsx(TrendingDown, { className: "w-3 h-3 text-destructive" })), _jsxs("span", { className: cn("text-xs font-medium", trend.isPositive ? "text-emerald-500" : "text-destructive"), children: [trend.isPositive ? '+' : '-', trend.value, "%"] }), _jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "vs last month" })] })), description && (_jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-tight", children: description }))] })] }) }));
}
export function ShipmentCard({ shipment, onClick, className }) {
    // Handle Supabase data structure with JSON fields
    const pickupAddress = typeof shipment.pickup_address === 'string'
        ? JSON.parse(shipment.pickup_address)
        : shipment.pickup_address;
    const deliveryAddress = typeof shipment.delivery_address === 'string'
        ? JSON.parse(shipment.delivery_address)
        : shipment.delivery_address;
    const packageDetails = typeof shipment.package_details === 'string'
        ? JSON.parse(shipment.package_details)
        : shipment.package_details;
    const isPriority = shipment.priority === 'urgent' || shipment.priority === 'express';
    const trackingNumber = shipment.awb_number || shipment.trackingNumber;
    const weight = packageDetails?.weight || shipment.weight || 0;
    const estimatedDelivery = shipment.estimated_delivery;
    return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: springPresets.gentle, whileHover: { y: -4 }, className: "cursor-pointer", onClick: () => onClick?.(shipment.id), children: _jsxs(Card, { className: cn("overflow-hidden border-border bg-card shadow-sm", className), children: [_jsx("div", { className: "h-1 bg-primary/20", children: isPriority && _jsx("div", { className: "h-full bg-primary w-full" }) }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-mono font-bold text-foreground", children: trackingNumber }), isPriority && (_jsx(Badge, { variant: "outline", className: "bg-primary/5 text-primary border-primary/20 text-[10px] uppercase", children: "Priority" }))] }), _jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: ["Created ", formatDate(shipment.created_at)] })] }), _jsx(StatusBadge, { status: shipment.status, size: "sm" })] }), _jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }), _jsx("div", { className: "w-px h-8 bg-border my-1" }), _jsx("div", { className: "w-2 h-2 rounded-full border-2 border-primary" })] }), _jsxs("div", { className: "flex flex-col space-y-3 flex-1", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium text-foreground block leading-none", children: pickupAddress?.city || pickupAddress?.address || shipment.origin }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Sender: ", pickupAddress?.name || shipment.senderName] })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium text-foreground block leading-none", children: deliveryAddress?.city || deliveryAddress?.address || shipment.destination }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Receiver: ", deliveryAddress?.name || shipment.receiverName] })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 pt-4 border-t border-border", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Weight, { className: "w-3.5 h-3.5 text-muted-foreground" }), _jsx("span", { className: "text-xs text-muted-foreground", children: formatWeight(weight) })] }), _jsxs("div", { className: "flex items-center space-x-2 justify-end", children: [_jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["ETA: ", estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString() : 'TBD'] })] })] })] })] }) }));
}
export function FleetStatusCard({ vehicle, className }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'text-emerald-500';
            case 'MAINTENANCE': return 'text-amber-500';
            case 'IN_USE': return 'text-primary';
            default: return 'text-muted-foreground';
        }
    };
    const VehicleIcon = () => {
        switch (vehicle.type) {
            case 'TRUCK': return _jsx(Truck, { className: "w-5 h-5" });
            case 'VAN': return _jsx(Package, { className: "w-5 h-5" });
            case 'MOTORCYCLE': return _jsx(Truck, { className: "w-5 h-5 rotate-12" }); // Generic representation
            default: return _jsx(Truck, { className: "w-5 h-5" });
        }
    };
    return (_jsxs(Card, { className: cn("border-border bg-card shadow-sm hover:shadow-md transition-all", className), children: [_jsx(CardHeader, { className: "p-4 pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: cn("p-2 rounded-lg bg-secondary", getStatusColor(vehicle.status)), children: _jsx(VehicleIcon, {}) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-sm font-mono font-bold", children: vehicle.plateNumber }), _jsx(CardDescription, { className: "text-[10px] uppercase tracking-wider", children: vehicle.type })] })] }), _jsx(Badge, { variant: "outline", className: cn("text-[10px] font-bold", vehicle.status === 'ACTIVE' ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                                vehicle.status === 'MAINTENANCE' ? "border-amber-500/20 text-amber-500 bg-amber-500/5" :
                                    "border-primary/20 text-primary bg-primary/5"), children: vehicle.status.replace('_', ' ') })] }) }), _jsx(CardContent, { className: "p-4 pt-2", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsxs("div", { className: "flex items-center space-x-1.5 text-xs text-muted-foreground", children: [_jsx(Fuel, { className: "w-3 h-3" }), _jsx("span", { children: "Fuel Level" })] }), _jsxs("span", { className: "text-xs font-medium", children: [vehicle.fuelLevel, "%"] })] }), _jsx(Progress, { value: vehicle.fuelLevel, className: "h-1.5" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { className: "p-2 rounded-md bg-muted/50 border border-border/50", children: [_jsxs("div", { className: "flex items-center space-x-1 mb-1", children: [_jsx(MapPin, { className: "w-3 h-3 text-primary" }), _jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Location" })] }), _jsxs("p", { className: "text-[11px] font-mono truncate", children: [vehicle.currentLocation.lat.toFixed(4), ", ", vehicle.currentLocation.lng.toFixed(4)] })] }), _jsxs("div", { className: "p-2 rounded-md bg-muted/50 border border-border/50", children: [_jsxs("div", { className: "flex items-center space-x-1 mb-1", children: [_jsx(Wrench, { className: "w-3 h-3 text-amber-500" }), _jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "Last Svc" })] }), _jsx("p", { className: "text-[11px] font-mono truncate", children: new Date(vehicle.lastService).toLocaleDateString() })] })] })] }) }), _jsx(CardFooter, { className: "p-4 pt-0 border-t border-border mt-2", children: _jsxs("div", { className: "flex items-center justify-between w-full pt-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: vehicle.assignedRiderId ? `Rider: ${vehicle.assignedRiderId.slice(0, 6)}` : 'Unassigned' })] }), _jsxs("button", { className: "text-[10px] font-bold text-primary hover:underline flex items-center space-x-1", children: [_jsx("span", { children: "Details" }), _jsx(ArrowRight, { className: "w-3 h-3" })] })] }) })] }));
}
