import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Warehouse, Package, Scan, TruckIcon, CheckCircle2, AlertTriangle, Clock, BarChart3, Search, Target, Zap, Camera, Upload, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguageContext } from '@/lib/LanguageContext';
import { staggerContainer, staggerItem } from '@/lib/motion';
const WarehouseOperationsPage = () => {
    const { language, t } = useLanguageContext();
    const { toast } = useToast();
    const [packagesToday, setPackagesToday] = useState(1247);
    const [scannedItems, setScannedItems] = useState(892);
    const [storageCapacity, setStorageCapacity] = useState(78);
    const [qualityScore, setQualityScore] = useState(96.2);
    const [scannerActive, setScannerActive] = useState(false);
    const [manualEntry, setManualEntry] = useState('');
    const recentScans = [
        {
            id: '1',
            awb: 'PKG-2024-001247',
            destinationTownship: 'Yangon → Mandalay',
            weight: '2.5kg',
            status: 'scanned',
            priority: 'normal',
            scanTime: '09:45:23'
        },
        {
            id: '2',
            awb: 'PKG-2024-001246',
            destinationTownship: 'Yangon → Naypyidaw',
            weight: '1.2kg',
            status: 'scanned',
            priority: 'express',
            scanTime: '09:44:15'
        },
        {
            id: '3',
            awb: 'PKG-2024-001245',
            destinationTownship: 'Invalid barcode',
            weight: '',
            status: 'pending',
            priority: 'normal',
            scanTime: '09:43:02'
        }
    ];
    const incomingShipments = [
        { id: 'SHP-001247', origin: 'Mandalay Hub', packages: 125, arrivalTime: '09:30 AM', status: 'processing' },
        { id: 'SHP-001246', origin: 'Naypyidaw Hub', packages: 87, arrivalTime: '08:45 AM', status: 'completed' },
        { id: 'SHP-001245', origin: 'Bagan Hub', packages: 203, arrivalTime: 'Expected 11:00 AM', status: 'in_transit' }
    ];
    const storageSections = [
        { id: 'A1', name: 'A1', capacity: 100, used: 45, status: 'partial' },
        { id: 'A2', name: 'A2', capacity: 100, used: 89, status: 'partial' },
        { id: 'A3', name: 'A3', capacity: 100, used: 100, status: 'full' },
        { id: 'A4', name: 'A4', capacity: 100, used: 23, status: 'available' },
        { id: 'A5', name: 'A5', capacity: 100, used: 67, status: 'partial' },
        { id: 'A6', name: 'A6', capacity: 100, used: 0, status: 'available' },
        { id: 'B1', name: 'B1', capacity: 100, used: 78, status: 'partial' },
        { id: 'B2', name: 'B2', capacity: 100, used: 100, status: 'full' },
        { id: 'B3', name: 'B3', capacity: 100, used: 34, status: 'available' },
        { id: 'B4', name: 'B4', capacity: 100, used: 91, status: 'partial' },
        { id: 'B5', name: 'B5', capacity: 100, used: 56, status: 'partial' },
        { id: 'B6', name: 'B6', capacity: 100, used: 12, status: 'available' }
    ];
    const activeTasks = [
        { id: '1', title: 'Inbound Processing', description: 'Truck YGN-001 arrived', priority: 'in_progress' },
        { id: '2', title: 'Batch Sorting', description: '125 packages pending', priority: 'urgent' },
        { id: '3', title: 'Quality Check', description: '45 items to inspect', priority: 'normal' }
    ];
    const recentActivity = [
        { time: '09:45', message: 'Completed scanning batch #1247' },
        { time: '09:32', message: 'Started inbound processing' },
        { time: '09:15', message: 'Quality issue reported - PKG-8901' },
        { time: '08:58', message: 'Outbound batch dispatched' },
        { time: '08:30', message: 'Shift started - Morning crew' }
    ];
    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
            case 'scanned':
            case 'dispatched':
                return _jsx(Badge, { className: "bg-success/10 text-success border-success/20", children: "Completed" });
            case 'processing':
            case 'in_progress':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "In Progress" });
            case 'pending':
                return _jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20", children: "Pending" });
            case 'urgent':
                return _jsx(Badge, { className: "bg-error/10 text-error border-error/20", children: "Urgent" });
            case 'in_transit':
                return _jsx(Badge, { className: "bg-info/10 text-info border-info/20", children: "In Transit" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'urgent':
                return _jsx(Badge, { className: "bg-error text-white", children: "Urgent" });
            case 'express':
                return _jsx(Badge, { className: "bg-warning text-white", children: "Express" });
            case 'normal':
                return _jsx(Badge, { className: "bg-muted text-muted-foreground", children: "Normal" });
            default:
                return _jsx(Badge, { variant: "outline", children: priority });
        }
    };
    const getStorageColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-success/20 border-success/40';
            case 'partial':
                return 'bg-warning/20 border-warning/40';
            case 'full':
                return 'bg-error/20 border-error/40';
            default:
                return 'bg-muted/20 border-muted/40';
        }
    };
    const startScanning = () => {
        setScannerActive(true);
        toast({
            title: "Scanner Activated",
            description: "Camera is now ready for barcode scanning",
        });
    };
    const processBatch = () => {
        toast({
            title: "Processing Batch",
            description: "3 packages are being processed...",
        });
    };
    const optimizeStorage = () => {
        toast({
            title: "Optimizing Storage",
            description: "Storage layout optimization in progress...",
        });
    };
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "space-y-6", children: [_jsxs(motion.div, { variants: staggerItem, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-gold-500/10 rounded-lg", children: _jsx(Warehouse, { className: "h-6 w-6 text-gold-500" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: "Warehouse Operations" }), _jsx("p", { className: "text-muted-foreground", children: "Station: YGN-001 | Shift: Morning" })] })] }), _jsx("div", { className: "flex items-center space-x-3", children: _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium", children: "Maung Maung" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Warehouse Operator" })] }) })] }), _jsxs(motion.div, { variants: staggerItem, className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Packages Today" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: packagesToday.toLocaleString() }), _jsx("p", { className: "text-xs text-success", children: "+12% from yesterday" })] }), _jsx(Package, { className: "h-8 w-8 text-info" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Scanned Items" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: scannedItems }), _jsx("p", { className: "text-xs text-info", children: "71% completion" })] }), _jsx(Scan, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Storage Capacity" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [storageCapacity, "%"] }), _jsx("p", { className: "text-xs text-warning", children: "Near capacity" })] }), _jsx(Warehouse, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Quality Score" }), _jsxs("p", { className: "text-2xl font-bold text-navy-900", children: [qualityScore, "%"] }), _jsx("p", { className: "text-xs text-success", children: "Excellent" })] }), _jsx(Target, { className: "h-8 w-8 text-success" })] }) }) })] }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Tabs, { defaultValue: "dashboard", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-8", children: [_jsx(TabsTrigger, { value: "dashboard", children: "Dashboard" }), _jsx(TabsTrigger, { value: "scanning", children: "Scanning" }), _jsx(TabsTrigger, { value: "inbound", children: "Inbound" }), _jsx(TabsTrigger, { value: "outbound", children: "Outbound" }), _jsx(TabsTrigger, { value: "sorting", children: "Sorting" }), _jsx(TabsTrigger, { value: "storage", children: "Storage" }), _jsx(TabsTrigger, { value: "quality", children: "Quality Control" }), _jsx(TabsTrigger, { value: "analytics", children: "Analytics" })] }), _jsx(TabsContent, { value: "dashboard", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Active Tasks" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: activeTasks.map((task) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-1 bg-muted/50 rounded", children: _jsx(Package, { className: "w-4 h-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: task.title }), _jsx("p", { className: "text-xs text-muted-foreground", children: task.description })] })] }), getStatusBadge(task.priority)] }, task.id))) }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Activity" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentActivity.map((activity, index) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: activity.time }), _jsx("p", { className: "text-xs text-muted-foreground", children: activity.message })] })] }, index))) }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Actions" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { className: "w-full", onClick: startScanning, children: [_jsx(Scan, { className: "w-4 h-4 mr-2" }), "Start Scanning"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(TruckIcon, { className: "w-4 h-4 mr-2" }), "Process Inbound"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(Package, { className: "w-4 h-4 mr-2" }), "Sort Packages"] }), _jsxs(Button, { variant: "outline", className: "w-full", children: [_jsx(CheckCircle2, { className: "w-4 h-4 mr-2" }), "Quality Check"] })] }) })] })] }) }), _jsxs(TabsContent, { value: "scanning", className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Barcode & QR Scanning" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Scan packages for processing" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted/20 rounded-lg p-8 text-center", children: [_jsx(Camera, { className: "w-16 h-16 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "font-medium mb-2", children: "Scanner Ready" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Point camera at barcode or QR code" }), _jsxs(Button, { onClick: startScanning, className: "btn-premium", children: [_jsx(Camera, { className: "w-4 h-4 mr-2" }), "Start Camera"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium mb-2", children: "Manual Entry" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { placeholder: "Enter tracking number...", value: manualEntry, onChange: (e) => setManualEntry(e.target.value) }), _jsx(Button, { children: _jsx(Upload, { className: "w-4 h-4" }) })] })] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Scans" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [recentScans.map((scan) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-1 bg-muted/50 rounded", children: _jsx(Package, { className: "w-4 h-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: scan.awb }), _jsx("p", { className: "text-xs text-muted-foreground", children: scan.destinationTownship })] })] }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-xs text-muted-foreground", children: scan.scanTime }) })] }, scan.id))), _jsxs("div", { className: "flex space-x-2 pt-4", children: [_jsx(Button, { onClick: processBatch, className: "flex-1", children: "Process Batch (3)" }), _jsx(Button, { variant: "outline", children: "Clear" })] })] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Scan, { className: "w-8 h-8 text-info mx-auto mb-2" }), _jsx("p", { className: "text-2xl font-bold", children: scannedItems }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Scans Today" })] }) }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Target, { className: "w-8 h-8 text-success mx-auto mb-2" }), _jsx("p", { className: "text-2xl font-bold", children: "98.5%" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Success Rate" })] }) }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Clock, { className: "w-8 h-8 text-warning mx-auto mb-2" }), _jsx("p", { className: "text-2xl font-bold", children: "2.3s" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Avg. Scan Time" })] }) })] })] }), _jsx(TabsContent, { value: "inbound", className: "space-y-6", children: _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Incoming Shipments" }), _jsxs(Button, { className: "btn-premium", children: [_jsx(TruckIcon, { className: "w-4 h-4 mr-2" }), "New Shipment"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left p-3", children: "Shipment ID" }), _jsx("th", { className: "text-left p-3", children: "Origin" }), _jsx("th", { className: "text-left p-3", children: "Packages" }), _jsx("th", { className: "text-left p-3", children: "Arrival Time" }), _jsx("th", { className: "text-left p-3", children: "Status" }), _jsx("th", { className: "text-left p-3", children: "Actions" })] }) }), _jsx("tbody", { children: incomingShipments.map((shipment) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "p-3 font-medium", children: shipment.id }), _jsx("td", { className: "p-3", children: shipment.senderName }), _jsx("td", { className: "p-3", children: _jsx(Badge, { variant: "outline", children: shipment.packages }) }), _jsx("td", { className: "p-3", children: shipment.arrivalTime }), _jsx("td", { className: "p-3", children: getStatusBadge(shipment.status) }), _jsx("td", { className: "p-3", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", children: "Process" }), _jsx(Button, { variant: "outline", size: "sm", children: "View" })] }) })] }, shipment.id))) })] }) }) })] }) }), _jsx(TabsContent, { value: "storage", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { children: "Warehouse Layout - Section A" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Section A" }), _jsx(Button, { variant: "outline", size: "sm", children: "Section B" }), _jsx(Button, { variant: "outline", size: "sm", children: "Section C" }), _jsx(Button, { onClick: optimizeStorage, size: "sm", children: "Optimize" })] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-6 gap-2 mb-4", children: storageSections.map((section) => (_jsx("div", { className: `aspect-square border-2 rounded-lg flex items-center justify-center text-xs font-medium ${getStorageColor(section.status)}`, children: section.name }, section.id))) }), _jsxs("div", { className: "flex items-center space-x-6 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-success/20 border border-success/40 rounded" }), _jsx("span", { children: "Available" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-warning/20 border border-warning/40 rounded" }), _jsx("span", { children: "Partially Full" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 bg-error/20 border border-error/40 rounded" }), _jsx("span", { children: "Full" })] })] })] })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Actions" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(Search, { className: "w-4 h-4 mr-2" }), "Find Package Location"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(Package, { className: "w-4 h-4 mr-2" }), "Move Package"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(Target, { className: "w-4 h-4 mr-2" }), "Optimize Storage"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start", children: [_jsx(AlertTriangle, { className: "w-4 h-4 mr-2" }), "Report Issue"] })] }), _jsxs("div", { className: "mt-6 space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Storage Alerts" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start space-x-2 p-2 bg-error/5 border border-error/20 rounded", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-error mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "High Priority" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Section C approaching capacity limit (95%)" })] })] }), _jsxs("div", { className: "flex items-start space-x-2 p-2 bg-warning/5 border border-warning/20 rounded", children: [_jsx(Clock, { className: "w-4 h-4 text-warning mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Overdue Items" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "12 packages stored over 7 days" })] })] })] })] })] })] })] }) }), _jsx(TabsContent, { value: "quality", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quality Distribution" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Excellent" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 bg-muted rounded-full h-2", children: _jsx("div", { className: "bg-success h-2 rounded-full", style: { width: '82%' } }) }), _jsx("span", { className: "text-sm font-semibold", children: "847" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Good" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 bg-muted rounded-full h-2", children: _jsx("div", { className: "bg-info h-2 rounded-full", style: { width: '15%' } }) }), _jsx("span", { className: "text-sm font-semibold", children: "156" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Fair" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 bg-muted rounded-full h-2", children: _jsx("div", { className: "bg-warning h-2 rounded-full", style: { width: '2%' } }) }), _jsx("span", { className: "text-sm font-semibold", children: "23" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Poor" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 bg-muted rounded-full h-2", children: _jsx("div", { className: "bg-error h-2 rounded-full", style: { width: '1%' } }) }), _jsx("span", { className: "text-sm font-semibold", children: "8" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: "Damaged" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 bg-muted rounded-full h-2", children: _jsx("div", { className: "bg-error h-2 rounded-full", style: { width: '0.3%' } }) }), _jsx("span", { className: "text-sm font-semibold", children: "3" })] })] })] }) })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quality Trends" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-center mb-4", children: [_jsxs("div", { className: "text-3xl font-bold text-success mb-2", children: [qualityScore, "%"] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Overall Quality Score" }), _jsx("p", { className: "text-xs text-success", children: "+2.1% from last week" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Recent Issues" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Damaged packaging" }), _jsx("span", { className: "text-error", children: "3 cases" })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Missing labels" }), _jsx("span", { className: "text-warning", children: "2 cases" })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Incorrect weight" }), _jsx("span", { className: "text-info", children: "1 case" })] })] }), _jsxs(Button, { className: "w-full mt-4", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "Generate Quality Report"] })] })] })] })] }) }), _jsx(TabsContent, { value: "analytics", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Daily Throughput" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: packagesToday.toLocaleString() }), _jsx("p", { className: "text-xs text-success", children: "+15% vs yesterday" })] }), _jsx(BarChart3, { className: "h-8 w-8 text-info" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Processing Speed" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: "2.3" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "min/package avg" })] }), _jsx(Zap, { className: "h-8 w-8 text-warning" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Error Rate" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: "0.8%" }), _jsx("p", { className: "text-xs text-success", children: "-0.3% improvement" })] }), _jsx(AlertTriangle, { className: "h-8 w-8 text-success" })] }) }) }), _jsx(Card, { className: "glass-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Efficiency Score" }), _jsx("p", { className: "text-2xl font-bold text-navy-900", children: "94.2%" }), _jsx("p", { className: "text-xs text-success", children: "Excellent" })] }), _jsx(Target, { className: "h-8 w-8 text-success" })] }) }) })] }) })] }) })] }));
};
export default WarehouseOperationsPage;
