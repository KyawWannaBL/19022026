import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, ChevronRight, Search, Filter, CheckCircle2, Navigation, Layers, BarChart3, Printer, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { staggerContainer, staggerItem } from '@/lib/motion';
export default function WarehouseDispatch() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [shipments, setShipments] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [selectedShipments, setSelectedShipments] = useState([]);
    const [activeVehicle, setActiveVehicle] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setLoading(true);
        try {
            const [shipmentRes, vehicleRes] = await Promise.all([
                logisticsAPI.getShipments({ status: 'WAREHOUSE_RECEIVED' }),
                logisticsAPI.getVehicles(user?.branch_id, 'AVAILABLE')
            ]);
            if (shipmentRes.success)
                setShipments(shipmentRes.shipments);
            if (vehicleRes.success)
                setVehicles(vehicleRes.vehicles);
        }
        catch (error) {
            console.error('Failed to load dispatch data', error);
            toast.error('Error connecting to logistics server');
        }
        finally {
            setLoading(false);
        }
    };
    const filteredShipments = useMemo(() => {
        return shipments.filter(s => s.awb_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.receiver_city.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [shipments, searchQuery]);
    const currentVehicle = useMemo(() => vehicles.find(v => v.id === activeVehicle), [vehicles, activeVehicle]);
    const currentLoad = useMemo(() => {
        const selected = shipments.filter(s => selectedShipments.includes(s.id));
        const totalWeight = selected.reduce((acc, curr) => acc + (curr.weight || 0), 0);
        const totalVolume = selected.length * 0.5; // Mock volume calculation
        return { weight: totalWeight, volume: totalVolume };
    }, [selectedShipments, shipments]);
    const toggleShipmentSelection = (id) => {
        setSelectedShipments(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const handleDispatch = async () => {
        if (!activeVehicle || selectedShipments.length === 0) {
            toast.warning('Please select a vehicle and at least one shipment');
            return;
        }
        try {
            const promises = selectedShipments.map(id => logisticsAPI.updateShipmentStatus(id, 'OUT_FOR_DELIVERY', 'Warehouse Dispatch Center', user?.id || 'SYSTEM', `Assigned to Vehicle ${currentVehicle?.vehicle_number}`));
            await Promise.all(promises);
            toast.success(`Successfully dispatched ${selectedShipments.length} parcels`);
            setSelectedShipments([]);
            setActiveVehicle(null);
            fetchData();
        }
        catch (error) {
            toast.error('Dispatch operation failed');
        }
    };
    const getCapacityColor = (current, max) => {
        const ratio = current / max;
        if (ratio > 0.9)
            return 'text-destructive';
        if (ratio > 0.7)
            return 'text-amber-500';
        return 'text-primary';
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-end justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight text-primary font-heading uppercase", children: "Dispatch Management" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Real-time route optimization and load management for Britium Express fleet." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", className: "border-primary/20 hover:border-primary/50", children: [_jsx(Printer, { className: "w-4 h-4 mr-2" }), "Print Manifests"] }), _jsx(Button, { className: "luxury-button", onClick: handleDispatch, children: "Start Dispatch" })] })] }), _jsxs(motion.div, { variants: staggerContainer, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Package, { className: "text-primary h-8 w-8" }), _jsx(Badge, { variant: "outline", className: "border-primary/20", children: "Ready" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Pending Shipments" }), _jsx("h3", { className: "text-3xl font-bold font-mono", children: shipments.length })] })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Truck, { className: "text-primary h-8 w-8" }), _jsx(Badge, { variant: "outline", className: "border-primary/20", children: "Fleet" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Available Vehicles" }), _jsx("h3", { className: "text-3xl font-bold font-mono", children: vehicles.length })] })] }) }) }), _jsx(motion.div, { variants: staggerItem, className: "md:col-span-2", children: _jsxs(Card, { className: "luxury-card h-full", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-4 h-4 text-primary" }), "Current Load Optimization"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { children: ["Weight Capacity (", currentLoad.weight, " / ", currentVehicle?.capacity_weight || 0, " kg)"] }), _jsxs("span", { className: getCapacityColor(currentLoad.weight, currentVehicle?.capacity_weight || 1000), children: [Math.round((currentLoad.weight / (currentVehicle?.capacity_weight || 1)) * 100), "%"] })] }), _jsx(Progress, { value: (currentLoad.weight / (currentVehicle?.capacity_weight || 1000)) * 100, className: "h-2" })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2 space-y-6", children: _jsxs(Card, { className: "luxury-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Shipment Queue" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search AWB...", className: "pl-10 w-64 bg-background/50", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Filter, { className: "w-4 h-4" }) })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "max-h-[600px] overflow-auto custom-scrollbar", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "sticky top-0 bg-card z-10", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-12" }), _jsx(TableHead, { children: "AWB Number" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Weight" }), _jsx(TableHead, { children: "Service" }), _jsx(TableHead, { className: "text-right", children: "Action" })] }) }), _jsx(TableBody, { children: filteredShipments.map((shipment) => (_jsxs(TableRow, { className: `transition-colors cursor-pointer hover:bg-white/5 ${selectedShipments.includes(shipment.id) ? 'bg-primary/10' : ''}`, onClick: () => toggleShipmentSelection(shipment.id), children: [_jsx(TableCell, { children: _jsx("div", { className: `w-5 h-5 rounded border border-primary/50 flex items-center justify-center ${selectedShipments.includes(shipment.id) ? 'bg-primary' : ''}`, children: selectedShipments.includes(shipment.id) && _jsx(CheckCircle2, { className: "w-4 h-4 text-black" }) }) }), _jsx(TableCell, { className: "font-mono font-medium", children: shipment.awb_number }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: shipment.receiver_city }), _jsx("span", { className: "text-xs text-muted-foreground", children: shipment.receiver_state })] }) }), _jsxs(TableCell, { children: [shipment.weight, " kg"] }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", className: "text-[10px] uppercase tracking-wider", children: shipment.service_type }) }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(ChevronRight, { className: "w-4 h-4 text-primary" }) }) })] }, shipment.id))) })] }) }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Truck, { className: "w-5 h-5 text-primary" }), "Vehicle Assignment"] }), _jsx(CardDescription, { children: "Assign selected load to a vehicle" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Select Vehicle" }), _jsxs(Select, { onValueChange: setActiveVehicle, value: activeVehicle || "", children: [_jsx(SelectTrigger, { className: "bg-background/50 border-primary/20", children: _jsx(SelectValue, { placeholder: "Choose an available truck" }) }), _jsx(SelectContent, { children: vehicles.map(v => (_jsxs(SelectItem, { value: v.id, children: [v.vehicle_number, " - ", v.vehicle_type, " (", v.capacity_weight, "kg)"] }, v.id))) })] })] }), currentVehicle && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium", children: "Vehicle Type" }), _jsx("span", { className: "text-sm", children: currentVehicle.vehicle_type })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium", children: "Capacity" }), _jsxs("span", { className: "text-sm", children: [currentVehicle.capacity_weight, " kg"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium", children: "Status" }), _jsx(Badge, { variant: "outline", className: "bg-green-500/10 text-green-500 border-green-500/20", children: "Available" })] })] })), _jsxs("div", { className: "pt-4 border-t border-white/10", children: [_jsxs("div", { className: "flex justify-between items-end mb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Selected Load" }), _jsxs("p", { className: "text-2xl font-bold", children: [selectedShipments.length, " ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "items" })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Total Weight" }), _jsxs("p", { className: "text-2xl font-bold", children: [currentLoad.weight, " ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "kg" })] })] })] }), _jsxs(Button, { className: "w-full h-14 luxury-button", disabled: !activeVehicle || selectedShipments.length === 0, onClick: handleDispatch, children: [_jsx(Navigation, { className: "w-4 h-4 mr-2" }), "Confirm Dispatch"] })] })] })] }), _jsxs(Card, { className: "luxury-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Layers, { className: "w-4 h-4 text-primary" }), "Route Suggestions"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/5", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center", children: _jsx(Navigation, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "Northern Corridor" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "12 stops \u2022 45.2 km estimated" })] }), _jsx(Plus, { className: "w-4 h-4 text-muted-foreground" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/5", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center", children: _jsx(Navigation, { className: "w-5 h-5 text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "Express Downtown" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "8 stops \u2022 12.5 km estimated" })] }), _jsx(Plus, { className: "w-4 h-4 text-muted-foreground" })] })] })] })] })] }), _jsxs("footer", { className: "flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest pt-10", children: [_jsxs("div", { className: "flex gap-6", children: [_jsx("span", { children: "System Version: v4.2.0-stable" }), _jsx("span", { children: "Last Sync: Just now" })] }), _jsx("div", { children: "\u00A9 2026 Britium Express Logistics. All rights reserved." })] })] }));
}
