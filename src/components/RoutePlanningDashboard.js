import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MapPin, Truck, Users, RefreshCw, CheckCircle2, AlertCircle, ChevronRight, UserPlus, Navigation, Package, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { formatDate } from '@/lib/index.ts';
export function RoutePlanningDashboard({ zone: initialZone = 'Downtown Core', date: initialDate = '2026-02-18' }) {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [selectedZone, setSelectedZone] = useState(initialZone);
    const [routes, setRoutes] = useState([]);
    // Mock data generator for initial state
    const generateMockRoutes = () => [
        {
            id: 'RT-001',
            zone: 'Downtown Core',
            vehicleId: 'VH-4492',
            vehiclePlate: 'BEX-2026-A',
            vehicleType: 'TRUCK',
            team: {
                driver: 'Marcus Aurelius',
                rider: 'Leo Silva',
                helper: 'Chen Wei'
            },
            shipmentsCount: 42,
            loadPercentage: 85,
            status: 'READY',
            estimatedDuration: '6h 30m'
        },
        {
            id: 'RT-002',
            zone: 'Suburban North',
            vehicleId: 'VH-8821',
            vehiclePlate: 'BEX-2026-B',
            vehicleType: 'VAN',
            team: {
                driver: 'Sarah Jenkins',
                rider: 'Mike Ross',
                helper: 'Elena Rodriguez'
            },
            shipmentsCount: 28,
            loadPercentage: 92,
            status: 'READY',
            estimatedDuration: '5h 15m'
        }
    ];
    useEffect(() => {
        setRoutes(generateMockRoutes());
    }, []);
    const handleAutoOptimize = () => {
        setIsOptimizing(true);
        // Simulating backend AI optimization and assignment logic
        setTimeout(() => {
            const optimizedRoutes = [
                ...routes,
                {
                    id: `RT-${Math.floor(Math.random() * 900) + 100}`,
                    zone: selectedZone,
                    vehicleId: 'VH-1102',
                    vehiclePlate: 'BEX-2026-C',
                    vehicleType: 'MOTORCYCLE',
                    team: {
                        driver: 'Express Auto',
                        rider: 'John Doe',
                        helper: 'N/A (Solo)'
                    },
                    shipmentsCount: 15,
                    loadPercentage: 45,
                    status: 'READY',
                    estimatedDuration: '2h 45m'
                }
            ];
            setRoutes(optimizedRoutes);
            setIsOptimizing(false);
            toast.success('Wayplan generated automatically based on destination clusters and resource availability.');
        }, 2000);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground font-heading", children: "Intelligent Route Planning" }), _jsxs("p", { className: "text-muted-foreground", children: ["Operations Control Center \u2022 ", formatDate(initialDate)] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Select, { value: selectedZone, onValueChange: setSelectedZone, children: [_jsxs(SelectTrigger, { className: "w-[180px] luxury-glass", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2 text-primary" }), _jsx(SelectValue, { placeholder: "Select Zone" })] }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Downtown Core", children: "Downtown Core" }), _jsx(SelectItem, { value: "Suburban North", children: "Suburban North" }), _jsx(SelectItem, { value: "Industrial West", children: "Industrial West" }), _jsx(SelectItem, { value: "Coastal East", children: "Coastal East" })] })] }), _jsxs(Button, { onClick: handleAutoOptimize, disabled: isOptimizing, className: "luxury-button", children: [isOptimizing ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(Navigation, { className: "w-4 h-4 mr-2" })), isOptimizing ? 'Optimizing...' : 'Auto-Optimize Wayplan'] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
                    { label: 'Total Shipments', value: '1,284', icon: Package, color: 'text-blue-500' },
                    { label: 'Active Wayplans', value: routes.length.toString(), icon: Layers, color: 'text-primary' },
                    { label: 'Available Fleet', value: '24/30', icon: Truck, color: 'text-green-500' },
                    { label: 'Personnel Active', value: '72', icon: Users, color: 'text-amber-500' },
                ].map((stat, i) => (_jsx(Card, { className: "luxury-card border-none shadow-luxury overflow-hidden", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: stat.label }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-2xl bg-white/5 ${stat.color}`, children: _jsx(stat.icon, { className: "w-5 h-5" }) })] }) }) }, i))) }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "xl:col-span-2 luxury-card border-none", children: [_jsx(CardHeader, { className: "border-b border-border/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Wayplan Assignments" }), _jsx(CardDescription, { children: "Automatically matched drivers, riders, and helpers" })] }), _jsx(Badge, { variant: "outline", className: "font-mono", children: "2026-Q1 OPS" })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-[600px]", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/50", children: [_jsx(TableHead, { className: "w-[100px]", children: "ID" }), _jsx(TableHead, { children: "Resource Team" }), _jsx(TableHead, { children: "Vehicle" }), _jsx(TableHead, { children: "Load" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { mode: "popLayout", children: routes.map((route) => (_jsxs(motion.tr, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, scale: 0.95 }, className: "group hover:bg-white/5 transition-colors border-border/50", children: [_jsx(TableCell, { className: "font-mono font-medium", children: route.id }), _jsx(TableCell, { children: _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center text-sm font-semibold", children: [_jsx("span", { className: "w-16 text-[10px] text-muted-foreground uppercase", children: "Driver:" }), route.team.driver] }), _jsxs("div", { className: "flex items-center text-sm", children: [_jsx("span", { className: "w-16 text-[10px] text-muted-foreground uppercase", children: "Rider:" }), route.team.rider] }), _jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx("span", { className: "w-16 text-[10px] text-muted-foreground uppercase", children: "Helper:" }), route.team.helper] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-mono text-sm", children: route.vehiclePlate }), _jsx(Badge, { variant: "secondary", className: "w-fit text-[9px] mt-1", children: route.vehicleType })] }) }), _jsx(TableCell, { className: "w-[150px]", children: _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground", children: [_jsxs("span", { children: [route.shipmentsCount, " pkgs"] }), _jsxs("span", { children: [route.loadPercentage, "%"] })] }), _jsx(Progress, { value: route.loadPercentage, className: "h-1" })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: route.status === 'READY' ? 'secondary' : 'default', className: "bg-primary/10 text-primary border-primary/20", children: route.status }) }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:bg-primary/20 hover:text-primary", children: _jsx(ChevronRight, { className: "w-4 h-4" }) }) })] }, route.id))) }) })] }) }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none bg-gradient-to-br from-card to-background", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Navigation, { className: "w-4 h-4 mr-2 text-primary" }), "Optimization Logic"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "p-4 rounded-xl bg-white/5 space-y-3 border border-white/5", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-green-500 mt-1 shrink-0" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Destinations are clustered using K-means algorithm to minimize travel distance." })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-green-500 mt-1 shrink-0" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Resource assignment based on vehicle capacity and personnel shift balance." })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-primary mt-1 shrink-0" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Real-time traffic data from 2026 API integrated for ETA calculation." })] })] }), _jsxs(Button, { variant: "outline", className: "w-full border-primary/20 hover:bg-primary/10", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Manual Resource Swap"] })] })] }), _jsxs(Card, { className: "luxury-card border-none overflow-hidden", children: [_jsxs("div", { className: "relative h-64 bg-muted/20 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover grayscale" }), _jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse", children: _jsx(MapPin, { className: "w-6 h-6 text-primary" }) }), _jsx("p", { className: "mt-2 text-xs font-medium tracking-widest uppercase opacity-60", children: "Live Fleet Map View" }), _jsx(Button, { size: "sm", variant: "link", className: "text-primary text-[10px]", children: "Expand Visualizer" })] })] }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Total Distance" }), _jsx("span", { className: "font-mono font-bold", children: "412.5 km" })] }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsx("span", { className: "text-xs text-muted-foreground", children: "Est. Fuel Cost" }), _jsx("span", { className: "font-mono font-bold", children: "$142.20" })] })] })] })] })] })] }));
}
