import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageSearch, Scan, Database, CheckCircle2, MapPin, ArrowDownToLine, History, LayoutGrid, Search, Loader2, ClipboardCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
const WarehouseReceiving = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [awbInput, setAwbInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [recentShipments, setRecentShipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStorageZone, setSelectedStorageZone] = useState('ZONE-A');
    const STORAGE_ZONES = [
        { id: 'ZONE-A', name: 'Zone A - High Priority', capacity: '85%' },
        { id: 'ZONE-B', name: 'Zone B - Standard', capacity: '42%' },
        { id: 'ZONE-C', name: 'Zone C - Bulky Items', capacity: '15%' },
        { id: 'ZONE-D', name: 'Zone D - International', capacity: '60%' },
    ];
    const fetchRecentShipments = useCallback(async () => {
        try {
            setIsLoading(true);
            // Fetch shipments that are recently updated or in transit to this warehouse
            const response = await logisticsAPI.getShipments({
                limit: 10,
                status: 'IN_TRANSIT'
            });
            if (response.success) {
                setRecentShipments(response.shipments);
            }
        }
        catch (error) {
            console.error('Failed to fetch shipments:', error);
            toast.error('Failed to load recent shipments');
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchRecentShipments();
    }, [fetchRecentShipments]);
    const handleManualScan = async (e) => {
        e.preventDefault();
        if (!awbInput.trim())
            return;
        setIsScanning(true);
        try {
            // Simulate scanning and backend update
            const { success, shipment, tracking_history } = await logisticsAPI.getShipmentTracking(undefined, awbInput);
            if (success && shipment) {
                await logisticsAPI.updateShipmentStatus(shipment.id, 'RECEIVED_AT_WAREHOUSE', user?.branch_id || 'MAIN_WH', user?.id || 'SYSTEM', `Received at bay 04. Assigned to ${selectedStorageZone}`);
                toast.success(`Package ${awbInput} processed successfully`);
                setAwbInput('');
                fetchRecentShipments();
            }
            else {
                toast.error('Shipment not found or invalid AWB');
            }
        }
        catch (error) {
            toast.error('Error processing shipment');
        }
        finally {
            setIsScanning(false);
        }
    };
    return (_jsxs("div", { className: "p-6 space-y-8 max-w-7xl mx-auto min-h-screen bg-background text-foreground", children: [_jsxs("header", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-luxury-gold flex items-center gap-3", children: [_jsx(ArrowDownToLine, { className: "w-8 h-8" }), "Warehouse Receiving Bay"] }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["Managing inbound shipments for Branch: ", _jsx("span", { className: "text-foreground font-mono font-bold", children: user?.branch_id || 'HQ-WH-01' })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Badge, { variant: "outline", className: "px-4 py-2 border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" }), "Bay 04 - Online"] }), _jsx(Button, { variant: "outline", size: "icon", className: "rounded-full border-border/40", children: _jsx(History, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsxs(motion.div, { className: "lg:col-span-4 space-y-6", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: springPresets.gentle, children: [_jsxs(Card, { className: "luxury-card overflow-hidden border-luxury-gold/10", children: [_jsxs(CardHeader, { className: "bg-luxury-gold/5 border-b border-luxury-gold/10", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Scan, { className: "w-5 h-5 text-luxury-gold" }), "Entry Point Scan"] }), _jsx(CardDescription, { children: "Scan QR or enter AWB manually" })] }), _jsx(CardContent, { className: "pt-6", children: _jsxs("form", { onSubmit: handleManualScan, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Shipment AWB" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { placeholder: "Enter AWB Number (e.g. BRX-12345)", value: awbInput, onChange: (e) => setAwbInput(e.target.value), className: "bg-secondary/50 border-luxury-gold/20 focus:border-luxury-gold transition-all font-mono" }), _jsx(Button, { type: "submit", disabled: isScanning || !awbInput, className: "absolute right-1 top-1 h-8 bg-luxury-gold hover:bg-luxury-dark-gold text-black", size: "sm", children: isScanning ? _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : _jsx(CheckCircle2, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "space-y-2 pt-2", children: [_jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Storage Assignment" }), _jsxs(Select, { value: selectedStorageZone, onValueChange: setSelectedStorageZone, children: [_jsx(SelectTrigger, { className: "bg-secondary/50 border-luxury-gold/20", children: _jsx(SelectValue, { placeholder: "Select Zone" }) }), _jsx(SelectContent, { className: "luxury-glass", children: STORAGE_ZONES.map(zone => (_jsx(SelectItem, { value: zone.id, children: _jsxs("div", { className: "flex items-center justify-between w-full min-w-[200px]", children: [_jsx("span", { children: zone.name }), _jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [zone.capacity, " Full"] })] }) }, zone.id))) })] })] })] }) })] }), _jsxs(Card, { className: "luxury-card border-border/40", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Database, { className: "w-4 h-4 text-luxury-gold" }), "Inventory Status"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Pending Sorting" }), _jsx("span", { className: "font-bold", children: "12 Units" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Processed Today" }), _jsx("span", { className: "font-bold text-green-500", children: "1,248 Units" })] }), _jsx("div", { className: "w-full bg-secondary h-2 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: '65%' }, className: "h-full bg-luxury-gold" }) }), _jsx("p", { className: "text-[10px] text-center text-muted-foreground uppercase tracking-tighter italic", children: "Warehouse utilization at optimal levels" })] })] })] }), _jsx(motion.div, { className: "lg:col-span-8", variants: staggerContainer, initial: "hidden", animate: "visible", children: _jsxs(Card, { className: "luxury-card border-border/20 h-full", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-7", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: "Live Receiving Log" }), _jsx(CardDescription, { children: "Recent incoming shipments to this bay" })] }), _jsxs("div", { className: "relative w-64", children: [_jsx(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Filter shipments...", className: "pl-8 h-9 bg-secondary/30 border-border/40 rounded-full" })] })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "rounded-md border border-border/40 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-secondary/50", children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/40", children: [_jsx(TableHead, { className: "w-[150px] font-bold", children: "AWB Number" }), _jsx(TableHead, { className: "font-bold", children: "Merchant" }), _jsx(TableHead, { className: "font-bold", children: "Type" }), _jsx(TableHead, { className: "font-bold", children: "Weight" }), _jsx(TableHead, { className: "font-bold", children: "Status" }), _jsx(TableHead, { className: "text-right font-bold", children: "Action" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: "popLayout", children: isLoading ? (_jsx(TableRow, { children: _jsxs(TableCell, { colSpan: 6, className: "h-32 text-center", children: [_jsx(Loader2, { className: "w-8 h-8 animate-spin mx-auto text-luxury-gold" }), _jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Loading shipments..." })] }) })) : recentShipments.length === 0 ? (_jsx(TableRow, { children: _jsxs(TableCell, { colSpan: 6, className: "h-32 text-center", children: [_jsx(PackageSearch, { className: "w-8 h-8 mx-auto text-muted-foreground/30 mb-2" }), _jsx("p", { className: "text-muted-foreground", children: "No shipments in queue" })] }) })) : (recentShipments.map((shipment) => (_jsxs(motion.tr, { variants: staggerItem, layout: true, className: "group hover:bg-luxury-gold/5 transition-colors border-border/40", children: [_jsx(TableCell, { className: "font-mono font-medium text-luxury-gold", children: shipment.awb }), _jsx(TableCell, { className: "text-sm", children: shipment.sender_name || 'N/A' }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", className: "bg-luxury-gold/10 text-luxury-gold border-none text-[10px]", children: shipment.package_type }) }), _jsxs(TableCell, { className: "text-sm", children: [shipment.weight, "kg"] }), _jsx(TableCell, { children: _jsx(Badge, { className: "bg-amber-500/20 text-amber-500 border-none text-[10px] animate-pulse", children: shipment.status.replace('_', ' ') }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 text-luxury-gold hover:text-luxury-dark-gold hover:bg-luxury-gold/10", children: [_jsx(ClipboardCheck, { className: "w-4 h-4 mr-2" }), "Sort"] }) })] }, shipment.id)))) }) })] }) }), _jsxs("div", { className: "mt-6 flex items-center justify-between text-xs text-muted-foreground", children: [_jsxs("p", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), "Last update: ", new Date().toLocaleTimeString()] }), _jsxs("p", { children: ["Showing ", recentShipments.length, " active shipments"] })] })] })] }) })] }), _jsx("section", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: STORAGE_ZONES.map((zone) => (_jsxs(motion.div, { whileHover: { y: -5 }, className: "p-4 rounded-xl luxury-glass border-border/40 flex flex-col gap-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(LayoutGrid, { className: "w-4 h-4 text-luxury-gold" }), _jsx("span", { className: "text-[10px] font-bold text-luxury-gold uppercase tracking-tighter", children: zone.id })] }), _jsxs("div", { className: "mt-2", children: [_jsx("h4", { className: "text-sm font-semibold truncate", children: zone.name }), _jsxs("div", { className: "flex items-end justify-between mt-1", children: [_jsx("p", { className: "text-xs text-muted-foreground", children: "Capacity" }), _jsx("p", { className: "text-sm font-mono font-bold", children: zone.capacity })] })] })] }, zone.id))) })] }));
};
export default WarehouseReceiving;
