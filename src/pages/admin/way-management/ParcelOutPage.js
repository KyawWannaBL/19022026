import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Truck, Plus, FileText, Printer, CheckCircle2, ArrowRightLeft, MapPin, ScanLine, Trash2, ChevronRight, ClipboardList, History, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { ROUTE_PATHS } from '@/lib/index';
import { useNavigate } from 'react-router-dom';
const ParcelOutPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const navigate = useNavigate();
    const [scanInput, setScanInput] = useState('');
    const [scannedParcels, setScannedParcels] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const inputRef = useRef(null);
    // Mock data for routes and drivers
    const routes = [
        { id: 'rt-01', name: 'Yangon - Mandalay Express' },
        { id: 'rt-02', name: 'Yangon - Naypyidaw Main' },
        { id: 'rt-03', name: 'Mandalay - Pyin Oo Lwin Local' },
    ];
    const drivers = [
        { id: 'dr-01', name: 'U Maung Maung', vehicle: 'Hino 500 (YGN-5L/1234)' },
        { id: 'dr-02', name: 'Ko Kyaw Zay Yar', vehicle: 'Toyota Dyna (MDY-2M/5678)' },
    ];
    const activeManifests = [
        {
            id: 'mn-101',
            manifestCode: 'MF-2026-02-001',
            route: 'Yangon - Mandalay Express',
            vehicle: 'Hino 500',
            driver: 'U Maung Maung',
            parcelCount: 45,
            status: 'Dispatched',
            createdAt: '2026-02-04 03:20 AM'
        },
        {
            id: 'mn-102',
            manifestCode: 'MF-2026-02-002',
            route: 'Yangon - Naypyidaw Main',
            vehicle: 'Toyota Dyna',
            driver: 'Ko Kyaw Zay Yar',
            parcelCount: 28,
            status: 'In Preparation',
            createdAt: '2026-02-04 05:10 AM'
        }
    ];
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const handleScan = (e) => {
        e.preventDefault();
        if (!scanInput.trim())
            return;
        // Simulate adding a scanned parcel
        const newParcel = {
            id: Math.random().toString(36).substr(2, 9),
            awb: scanInput.toUpperCase(),
            receiver: 'Daw Khin Khin',
            destinationTownship: 'Mandalay Main Station',
            weight: '2.5 kg',
            scannedAt: new Date().toLocaleTimeString()
        };
        setScannedParcels([newParcel, ...scannedParcels]);
        setScanInput('');
        inputRef.current?.focus();
    };
    const removeParcel = (id) => {
        setScannedParcels(scannedParcels.filter(p => p.id !== id));
    };
    return (_jsxs("div", { className: "min-h-screen bg-background p-4 lg:p-8 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-primary flex items-center gap-2", children: [_jsx(Truck, { className: "w-8 h-8 text-gold" }), t('way.parcelOut')] }), _jsx("p", { className: "text-muted-foreground mt-1", children: language === 'en'
                                    ? 'Dispatch parcels, generate manifests, and assign routes for outgoing shipments.'
                                    : 'ထွက်ခွာမည့် ပါဆယ်များအတွက် လမ်းကြောင်းသတ်မှတ်ခြင်းနှင့် မန်နီးဖက်စ် ထုတ်ယူခြင်း။' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", className: "border-gold/30 hover:bg-gold/10 text-gold-700", onClick: () => navigate(ROUTE_PATHS.WAY_TRANSIT_ROUTE), children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), t('way.transitRoute')] }), _jsxs(Button, { variant: "outline", onClick: () => navigate(ROUTE_PATHS.WAY_PARCEL_IN), children: [_jsx(ArrowRightLeft, { className: "w-4 h-4 mr-2" }), t('way.parcelIn')] })] })] }), _jsxs(Tabs, { defaultValue: "scan", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full md:w-[400px] grid-cols-2 bg-navy-50/50 p-1 border border-navy-100", children: [_jsxs(TabsTrigger, { value: "scan", className: "data-[state=active]:bg-primary data-[state=active]:text-white", children: [_jsx(ScanLine, { className: "w-4 h-4 mr-2" }), t('common.add')] }), _jsxs(TabsTrigger, { value: "manifests", className: "data-[state=active]:bg-primary data-[state=active]:text-white", children: [_jsx(ClipboardList, { className: "w-4 h-4 mr-2" }), t('common.active')] })] }), _jsx(TabsContent, { value: "scan", className: "mt-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsxs(Card, { className: "lotus-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-gold-400", children: t('warehouse.action') }), _jsx(CardDescription, { className: "text-navy-200/70", children: "Configure route and dispatch details" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-navy-100", children: t('way.transitRoute') }), _jsxs(Select, { onValueChange: setSelectedRoute, value: selectedRoute, children: [_jsx(SelectTrigger, { className: "bg-white/10 border-white/20 text-white", children: _jsx(SelectValue, { placeholder: "Select Route" }) }), _jsx(SelectContent, { children: routes.map(route => (_jsx(SelectItem, { value: route.id, children: route.name }, route.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-navy-100", children: t('deliveryman.title') }), _jsxs(Select, { onValueChange: setSelectedDriver, value: selectedDriver, children: [_jsx(SelectTrigger, { className: "bg-white/10 border-white/20 text-white", children: _jsx(SelectValue, { placeholder: "Select Driver/Vehicle" }) }), _jsx(SelectContent, { children: drivers.map(driver => (_jsxs(SelectItem, { value: driver.id, children: [driver.name, " - ", driver.vehicle] }, driver.id))) })] })] }), _jsx("div", { className: "pt-4 border-t border-white/10", children: _jsxs("form", { onSubmit: handleScan, className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-navy-100", children: t('tracking.awb') }), _jsxs("div", { className: "relative", children: [_jsx(Input, { ref: inputRef, placeholder: "Scan tracking code...", className: "pl-10 bg-white border-navy-200", value: scanInput, onChange: (e) => setScanInput(e.target.value) }), _jsx(ScanLine, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Button, { type: "submit", size: "sm", className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 luxury-button", children: _jsx(Plus, { className: "w-4 h-4" }) })] })] }) }), _jsxs(Button, { className: "w-full bg-gold hover:bg-gold-600 text-navy-950 font-bold", disabled: scannedParcels.length === 0 || !selectedRoute || !selectedDriver, children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), t('reports.generateReport'), " (Manifest)"] })] })] }), _jsx(Card, { className: "bg-navy-50/50 border-navy-100", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-navy-900", children: "Scan Summary" }), _jsxs(Badge, { variant: "secondary", className: "bg-gold-100 text-gold-700 font-mono", children: [scannedParcels.length, " Items"] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Estimated Weight" }), _jsx("span", { className: "font-medium", children: "145.5 kg" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Volume" }), _jsx("span", { className: "font-medium", children: "0.85 m\u00B3" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Insurance Value" }), _jsx("span", { className: "font-medium", children: "4,500,000 MMK" })] })] })] }) })] }), _jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "border-navy-100 shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: t('warehouse.itemsInStation') }), _jsx(CardDescription, { children: "Recently scanned items for this dispatch batch" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setScannedParcels([]), className: "text-destructive", children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), t('common.reset')] })] }), _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: t('tracking.awb') }), _jsx(TableHead, { children: t('order.customer') }), _jsx(TableHead, { children: t('tracking.location') }), _jsx(TableHead, { className: "text-right", children: t('common.time') }), _jsx(TableHead, { className: "w-[80px]" })] }) }), _jsx(TableBody, { children: _jsx(AnimatePresence, { children: scannedParcels.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-48 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Package, { className: "w-12 h-12 mb-2 opacity-20" }), _jsx("p", { children: "No parcels scanned yet." }), _jsx("p", { className: "text-xs", children: "Scan tracking numbers to add to manifest." })] }) }) })) : (scannedParcels.map((parcel) => (_jsxs(motion.tr, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: "group hover:bg-navy-50/50 transition-colors", children: [_jsx(TableCell, { className: "font-mono font-medium text-navy-800", children: parcel.awb }), _jsx(TableCell, { className: "text-sm", children: parcel.receiver }), _jsx(TableCell, { className: "text-sm", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "w-3 h-3 text-gold-600" }), parcel.destinationTownship] }) }), _jsx(TableCell, { className: "text-right text-xs text-muted-foreground", children: parcel.scannedAt }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10", onClick: () => removeParcel(parcel.id), children: _jsx(Trash2, { className: "w-4 h-4" }) }) })] }, parcel.id)))) }) })] }) })] }) })] }) }), _jsx(TabsContent, { value: "manifests", className: "mt-6", children: _jsxs(Card, { className: "border-navy-100 shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: t('broadcast.scheduledMessages') }), _jsx(CardDescription, { children: "Track and manage dispatched manifests" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "relative w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search manifest...", className: "pl-10" })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), t('common.filter')] })] })] }), _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-navy-50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t('order.orderNumber') }), _jsx(TableHead, { children: t('way.transitRoute') }), _jsx(TableHead, { children: t('deliveryman.name') }), _jsx(TableHead, { className: "text-center", children: t('common.total') }), _jsx(TableHead, { children: t('common.status') }), _jsx(TableHead, { children: t('common.date') }), _jsx(TableHead, { className: "text-right", children: t('warehouse.action') })] }) }), _jsx(TableBody, { children: activeManifests.map((manifest) => (_jsxs(TableRow, { className: "hover:bg-navy-50/50", children: [_jsx(TableCell, { className: "font-mono font-bold text-primary", children: manifest.manifestCode }), _jsx(TableCell, { className: "text-sm", children: manifest.route }), _jsx(TableCell, { className: "text-sm", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: manifest.driver }), _jsx("span", { className: "text-xs text-muted-foreground", children: manifest.vehicle })] }) }), _jsx(TableCell, { className: "text-center font-semibold text-gold-700", children: manifest.parcelCount }), _jsx(TableCell, { children: _jsx(Badge, { className: manifest.status === 'Dispatched'
                                                                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200'
                                                                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200', children: manifest.status }) }), _jsx(TableCell, { className: "text-xs text-muted-foreground whitespace-nowrap", children: manifest.createdAt }), _jsxs(TableCell, { className: "text-right space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: _jsx(Printer, { className: "w-4 h-4 text-navy-600" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: _jsx(ChevronRight, { className: "w-4 h-4 text-navy-600" }) })] })] }, manifest.id))) })] }) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { className: "bg-white border-navy-100 hover:border-gold/50 transition-all", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-navy-50 rounded-xl text-navy-600", children: _jsx(History, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Dispatched Today" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "128" })] })] }) }), _jsx(Card, { className: "bg-white border-navy-100 hover:border-gold/50 transition-all", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-gold-50 rounded-xl text-gold-600", children: _jsx(CheckCircle2, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Avg Manifest Fill" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "84%" })] })] }) }), _jsx(Card, { className: "bg-white border-navy-100 hover:border-gold/50 transition-all", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-blue-50 rounded-xl text-blue-600", children: _jsx(Truck, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Active Routes" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "12" })] })] }) }), _jsx(Card, { className: "bg-white border-navy-100 hover:border-gold/50 transition-all", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-amber-50 rounded-xl text-amber-600", children: _jsx(Package, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Waiting for Load" }), _jsx("p", { className: "text-2xl font-bold text-navy-950", children: "342" })] })] }) })] })] }));
};
export default ParcelOutPage;
