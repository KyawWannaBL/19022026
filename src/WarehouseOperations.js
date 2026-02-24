import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Box, Truck, QrCode, PackagePlus, ClipboardList, Search, Filter, Download, CheckCircle2, ArrowUpRight, ArrowDownLeft, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate, formatCurrency } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRScanner } from '@/components/QRScanner';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { StatusBadge } from '@/components/StatusBadge';
import { IMAGES } from '@/assets/images';
// Mock Data for Warehouse Stock
const MOCK_WAREHOUSE_ITEMS = [
    {
        id: '1',
        trackingNumber: 'BRT-2026-882190',
        senderName: 'Yangon Electronics',
        receiverName: 'U Kyaw Zwa',
        destination: 'Mandalay',
        status: 'AT_HUB',
        weight: 2.5,
        created_at: '2026-02-18T10:00:00Z',
        updated_at: '2026-02-19T08:30:00Z',
        cod_amount: 45000,
    },
    {
        id: '2',
        trackingNumber: 'BRT-2026-112093',
        senderName: 'Beauty Bloom Co.',
        receiverName: 'Daw Aye Aye',
        destination: 'Naypyidaw',
        status: 'AT_HUB',
        weight: 0.8,
        created_at: '2026-02-17T14:20:00Z',
        updated_at: '2026-02-19T09:15:00Z',
        cod_amount: 12000,
    },
    {
        id: '3',
        trackingNumber: 'BRT-2026-554122',
        senderName: 'Global Fashion',
        receiverName: 'Ma Nan Khin',
        destination: 'Taunggyi',
        status: 'PICKED_UP',
        weight: 1.2,
        created_at: '2026-02-19T11:00:00Z',
        updated_at: '2026-02-19T11:00:00Z',
        cod_amount: 35000,
    }
];
export default function WarehouseOperations() {
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState('inventory');
    const [searchQuery, setSearchQuery] = useState('');
    const [scannedId, setScannedId] = useState(null);
    const [inventory, setInventory] = useState(MOCK_WAREHOUSE_ITEMS);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [manifestData, setManifestData] = useState(null);
    const t = {
        en: {
            title: 'Warehouse Operations',
            subtitle: 'Manage receiving, inventory, and dispatch in real-time.',
            receiving: 'Receiving Bay',
            inventory: 'Inventory Tracking',
            dispatch: 'Dispatch Management',
            manifests: 'Manifests',
            scanPackage: 'Scan Package',
            scanDescription: 'Scan QR code to receive items into the hub',
            stockIn: 'Receive into Stock',
            stockOut: 'Dispatch for Delivery',
            searchPlaceholder: 'Search by AWB or Customer...',
            totalStock: 'Total Stock',
            incoming: 'Incoming Today',
            outgoing: 'Outgoing Today',
            location: 'Hub Location: Yangon North',
            generateManifest: 'Generate Manifest',
            manifestTitle: 'Daily Dispatch Manifest',
        },
        my: {
            title: 'ကုန်လှောင်ရုံ လုပ်ငန်းစဉ်များ',
            subtitle: 'လက်ခံခြင်း၊ စာရင်းအင်းနှင့် ပေးပို့ခြင်းများကို စီမံခန့်ခွဲပါ။',
            receiving: 'ကုန်လက်ခံဌာန',
            inventory: 'ကုန်ပစ္စည်းစာရင်း',
            dispatch: 'ပေးပို့ခြင်းစီမံခန့်ခွဲမှု',
            manifests: 'ကုန်ပစ္စည်းစာရင်းဇယား',
            scanPackage: 'QR ကုဒ်ဖတ်ပါ',
            scanDescription: 'ပစ္စည်းများကို ဟပ်တွင်လက်ခံရန် QR ကုဒ်ကိုဖတ်ပါ',
            stockIn: 'စာရင်းသွင်းမည်',
            stockOut: 'ပေးပို့ရန် ထုတ်မည်',
            searchPlaceholder: 'AWB သို့မဟုတ် ဝယ်ယူသူဖြင့် ရှာဖွေပါ...',
            totalStock: 'စုစုပေါင်းလက်ကျန်',
            incoming: 'ယနေ့အဝင်',
            outgoing: 'ယနေ့အထွက်',
            location: 'တည်နေရာ: ရန်ကုန်မြောက်ပိုင်း',
            generateManifest: 'စာရင်းထုတ်ရန်',
            manifestTitle: 'နေ့စဉ်ပေးပို့မှုစာရင်း',
        }
    };
    const labels = language === 'my' ? t.my : t.en;
    const filteredInventory = useMemo(() => {
        return inventory.filter(item => item.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [inventory, searchQuery]);
    const handleScanSuccess = (data) => {
        setScannedId(data);
        setIsScannerOpen(false);
        // In production, this would trigger an API call to update status to 'AT_HUB'
        alert(`Package ${data} scanned and registered at hub.`);
    };
    const handleDispatch = (id) => {
        setInventory(prev => prev.map(item => item.id === id ? { ...item, status: 'OUT_FOR_DELIVERY' } : item));
    };
    return (_jsxs("div", { className: "space-y-6 pb-10", children: [_jsxs("div", { className: "relative h-48 rounded-3xl overflow-hidden", children: [_jsx("img", { src: IMAGES.WAREHOUSE_OPS_3, alt: "Warehouse", className: "absolute inset-0 w-full h-full object-cover opacity-40" }), _jsxs("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent p-8 flex flex-col justify-center", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "bg-primary/20 p-2 rounded-lg", children: _jsx(Layers, { className: "text-primary w-6 h-6" }) }), _jsx(Badge, { variant: "outline", className: "border-primary/50 text-primary uppercase tracking-widest text-[10px]", children: labels.location })] }), _jsx("h1", { className: "text-3xl font-bold text-foreground", children: labels.title }), _jsx("p", { className: "text-muted-foreground max-w-md", children: labels.subtitle })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-blue-500/10 rounded-2xl", children: _jsx(Box, { className: "text-blue-500 w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: labels.totalStock }), _jsxs("h3", { className: "text-2xl font-bold", children: ["1,248 ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "units" })] })] })] }) }), _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-green-500/10 rounded-2xl", children: _jsx(ArrowDownLeft, { className: "text-green-500 w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: labels.incoming }), _jsxs("h3", { className: "text-2xl font-bold", children: ["+342 ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "today" })] })] })] }) }), _jsx(Card, { className: "luxury-card", children: _jsxs(CardContent, { className: "p-6 flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-primary/10 rounded-2xl", children: _jsx(ArrowUpRight, { className: "text-primary w-6 h-6" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: labels.outgoing }), _jsxs("h3", { className: "text-2xl font-bold", children: ["215 ", _jsx("span", { className: "text-sm font-normal text-muted-foreground", children: "pending" })] })] })] }) })] }), _jsxs(Tabs, { defaultValue: "inventory", className: "w-full", onValueChange: setActiveTab, children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [_jsxs(TabsList, { className: "bg-secondary/50 p-1 border border-border rounded-xl", children: [_jsxs(TabsTrigger, { value: "inventory", className: "rounded-lg gap-2", children: [_jsx(ClipboardList, { className: "w-4 h-4" }), " ", labels.inventory] }), _jsxs(TabsTrigger, { value: "receiving", className: "rounded-lg gap-2", children: [_jsx(PackagePlus, { className: "w-4 h-4" }), " ", labels.receiving] }), _jsxs(TabsTrigger, { value: "dispatch", className: "rounded-lg gap-2", children: [_jsx(Truck, { className: "w-4 h-4" }), " ", labels.dispatch] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative w-full md:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: labels.searchPlaceholder, className: "pl-10 bg-secondary/30 border-border rounded-xl h-10", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(Button, { variant: "outline", size: "icon", className: "rounded-xl border-border", children: _jsx(Filter, { className: "w-4 h-4" }) })] })] }), _jsx(TabsContent, { value: "inventory", children: _jsxs(Card, { className: "luxury-card overflow-hidden", children: [_jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { className: "border-b border-border hover:bg-transparent", children: [_jsx(TableHead, { className: "w-[150px]", children: "AWB Number" }), _jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Received Date" }), _jsx(TableHead, { className: "text-right", children: "COD Amount" })] }) }), _jsx(TableBody, { children: filteredInventory.map((item) => (_jsxs(TableRow, { className: "border-b border-border/50 hover:bg-primary/5 transition-colors", children: [_jsx(TableCell, { className: "font-mono font-medium text-primary", children: item.trackingNumber }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-semibold", children: item.receiverName }), _jsxs("span", { className: "text-[10px] text-muted-foreground uppercase", children: ["From: ", item.senderName] })] }) }), _jsx(TableCell, { children: item.destination }), _jsx(TableCell, { children: _jsx(StatusBadge, { status: item.status, type: "shipment", size: "sm" }) }), _jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatDate(item.created_at || '') }), _jsx(TableCell, { className: "text-right font-semibold", children: formatCurrency(item.cod_amount || 0) })] }, item.id))) })] }), filteredInventory.length === 0 && (_jsxs("div", { className: "py-20 flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Search, { className: "w-12 h-12 mb-4 opacity-20" }), _jsx("p", { children: "No packages found in current inventory" })] }))] }) }), _jsx(TabsContent, { value: "receiving", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(QrCode, { className: "text-primary w-5 h-5" }), labels.scanPackage] }), _jsx(CardDescription, { children: labels.scanDescription })] }), _jsx(CardContent, { className: "flex flex-col items-center py-10", children: !isScannerOpen ? (_jsxs("div", { className: "w-full max-w-xs aspect-square border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 cursor-pointer transition-all bg-secondary/20", onClick: () => setIsScannerOpen(true), children: [_jsx("div", { className: "bg-primary/10 p-4 rounded-full", children: _jsx(QrCode, { className: "w-12 h-12 text-primary" }) }), _jsx("span", { className: "text-sm font-medium", children: "Start Scanning" })] })) : (_jsxs("div", { className: "w-full overflow-hidden rounded-2xl", children: [_jsx(QRScanner, { onScan: handleScanSuccess }), _jsx(Button, { variant: "ghost", className: "w-full mt-4", onClick: () => setIsScannerOpen(false), children: "Cancel" })] })) })] }), _jsxs(Card, { className: "luxury-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-lg", children: "Last Scanned" }), _jsx(CardDescription, { children: "Recently received packages" })] }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-[300px] pr-4", children: _jsx("div", { className: "space-y-4", children: inventory.filter(i => i.status === 'AT_HUB').map((item) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-border/50", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-green-500/10 p-2 rounded-lg", children: _jsx(CheckCircle2, { className: "text-green-500 w-4 h-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-mono font-medium", children: item.trackingNumber }), _jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: formatDate(item.updated_at || '') })] })] }), _jsx(Badge, { variant: "secondary", className: "bg-green-500/10 text-green-500 border-none", children: "SUCCESS" })] }, item.id))) }) }) })] })] }) }), _jsx(TabsContent, { value: "dispatch", children: _jsxs(Card, { className: "luxury-card", children: [_jsxs("div", { className: "p-6 border-b border-border flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: "Available for Dispatch" }), _jsx(CardDescription, { children: "Items ready to be assigned to riders" })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "luxury-button", disabled: inventory.filter(i => i.status === 'AT_HUB').length === 0, children: labels.generateManifest }) }), _jsxs(DialogContent, { className: "luxury-glass sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: labels.manifestTitle }) }), _jsxs("div", { className: "flex flex-col items-center py-6 gap-6", children: [_jsx(QRCodeGenerator, { data: `MANIFEST-${new Date().getTime()}`, size: 200, label: `Yangon North - ${formatDate(new Date().toISOString())}` }), _jsxs("div", { className: "text-center space-y-2", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Total items included: ", inventory.filter(i => i.status === 'AT_HUB').length] }), _jsx("p", { className: "text-xs font-mono text-primary", children: "M-2026-X-99218" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", className: "rounded-xl", children: "Print Label" }), _jsx(Button, { className: "luxury-button h-auto", children: "Download PDF" })] })] })] })] }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "border-b border-border", children: [_jsx(TableHead, { children: "AWB" }), _jsx(TableHead, { children: "Destination" }), _jsx(TableHead, { children: "Weight" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: inventory.filter(i => i.status === 'AT_HUB').map((item) => (_jsxs(TableRow, { className: "border-b border-border/30", children: [_jsx(TableCell, { className: "font-mono", children: item.trackingNumber }), _jsx(TableCell, { children: item.destination }), _jsxs(TableCell, { children: [item.weight, " kg"] }), _jsx(TableCell, { className: "text-right", children: _jsx(Button, { size: "sm", variant: "secondary", className: "h-8 rounded-lg", onClick: () => handleDispatch(item.id), children: "Assign Rider" }) })] }, item.id))) })] })] }) })] }), _jsxs("div", { className: "mt-12", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Recent Hub Manifests" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => (_jsx(Card, { className: "luxury-card group hover:scale-[1.02] cursor-pointer", children: _jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [_jsx("div", { className: "bg-primary/10 p-3 rounded-xl group-hover:bg-primary transition-colors", children: _jsx(Download, { className: "w-5 h-5 text-primary group-hover:text-primary-foreground" }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-xs text-muted-foreground uppercase", children: ["Manifest #00", i] }), _jsx("p", { className: "font-semibold text-sm", children: "Yangon - Mandalay" }), _jsxs("p", { className: "text-[10px] opacity-50", children: ["2026-02-1", i, " 09:30 AM"] })] })] }) }, i))) })] })] }));
}
