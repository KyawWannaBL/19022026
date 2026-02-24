import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Package, QrCode, CheckCircle2, AlertTriangle, ChevronRight, MapPin, ClipboardCheck, FileWarning } from 'lucide-react';
import { SHIPMENT_STATUS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
const MOCK_MANIFESTS = [
    {
        id: 'MF-2026-001',
        origin: 'Main Hub Warehouse',
        expectedCount: 12,
        scannedCount: 0,
        status: 'IN_TRANSIT',
        parcels: [
            { id: 'AWB-987654321', ttId: 'TT-000101', status: SHIPMENT_STATUS.IN_TRANSIT_TO_SUBSTATION },
            { id: 'AWB-987654322', ttId: 'TT-000102', status: SHIPMENT_STATUS.IN_TRANSIT_TO_SUBSTATION },
            { id: 'AWB-987654323', ttId: 'TT-000103', status: SHIPMENT_STATUS.IN_TRANSIT_TO_SUBSTATION },
        ]
    },
    {
        id: 'MF-2026-002',
        origin: 'East Sorting Center',
        expectedCount: 8,
        scannedCount: 8,
        status: 'RECEIVED',
        parcels: []
    }
];
const SubstationReceiving = () => {
    const { user, legacyUser } = useAuth();
    const [locationVerified, setLocationVerified] = useState(false);
    const [activeManifest, setActiveManifest] = useState(null);
    const [scannedParcels, setScannedParcels] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [manualEntry, setManualEntry] = useState('');
    const handleScanLocation = () => {
        // Simulate location QR scan for SS_RECEIVING
        toast.success('Substation location verified: SS_RECEIVING_04');
        setLocationVerified(true);
    };
    const handleSelectManifest = (manifest) => {
        if (!locationVerified) {
            toast.error('Please scan Substation Location QR first');
            return;
        }
        setActiveManifest(manifest);
    };
    const handleParcelScan = (id) => {
        if (!activeManifest)
            return;
        const parcelId = id.toUpperCase();
        if (scannedParcels.includes(parcelId)) {
            toast.warning('Parcel already scanned');
            return;
        }
        const exists = activeManifest.parcels.some(p => p.id === parcelId || p.ttId === parcelId);
        if (exists) {
            setScannedParcels([...scannedParcels, parcelId]);
            toast.success(`Parcel ${parcelId} verified`);
        }
        else {
            toast.error('Parcel not found in this manifest', {
                description: 'Creating discrepancy report...'
            });
        }
        setManualEntry('');
    };
    const handleCompleteReceiving = () => {
        if (!activeManifest)
            return;
        const shortage = activeManifest.expectedCount - scannedParcels.length;
        if (shortage > 0) {
            toast.error(`Shortage detected: ${shortage} parcels missing`, {
                description: 'Discrepancy report sent to Supervisor.'
            });
        }
        else {
            toast.success('Manifest received successfully', {
                description: 'All parcels verified and ready for last-mile.'
            });
        }
        setActiveManifest(null);
        setScannedParcels([]);
    };
    if (!locationVerified) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[80vh] p-6", children: [_jsx("div", { className: "w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse", children: _jsx(MapPin, { className: "w-12 h-12 text-primary" }) }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Substation Arrival" }), _jsx("p", { className: "text-muted-foreground text-center max-w-xs mb-8", children: "Scan the fixed Location QR poster at the receiving bay to unlock manifest processing." }), _jsxs(Button, { size: "lg", onClick: handleScanLocation, className: "btn-modern", children: [_jsx(QrCode, { className: "mr-2 h-5 w-5" }), "Scan Location QR"] })] }));
    }
    return (_jsxs("div", { className: "p-4 md:p-8 max-w-5xl mx-auto space-y-6", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [_jsx(ClipboardCheck, { className: "text-primary" }), "Substation Receiving"] }), _jsx("p", { className: "text-muted-foreground", children: "Verified Location: SS_RECEIVING_04" })] }), activeManifest && (_jsx(Button, { variant: "outline", onClick: () => setActiveManifest(null), children: "Back to Manifest List" }))] }), !activeManifest ? (_jsxs("div", { className: "grid gap-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Incoming Manifests" }), MOCK_MANIFESTS.map((manifest) => (_jsx(Card, { className: "card-modern cursor-pointer hover:border-primary/50", onClick: () => handleSelectManifest(manifest), children: _jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-muted rounded-lg", children: _jsx(Package, { className: "text-muted-foreground" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-mono font-bold", children: manifest.id }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["From: ", manifest.origin] })] })] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("div", { className: "text-right hidden sm:block", children: [_jsxs("div", { className: "text-sm font-medium", children: [manifest.expectedCount, " Parcels"] }), _jsx(Badge, { variant: manifest.status === 'RECEIVED' ? 'secondary' : 'default', children: manifest.status.replace('_', ' ') })] }), _jsx(ChevronRight, { className: "text-muted-foreground" })] })] }) }, manifest.id)))] })) : (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 card-modern", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { children: ["Manifest Processing: ", activeManifest.id] }), _jsxs(Badge, { variant: "outline", children: [scannedParcels.length, " / ", activeManifest.expectedCount] })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Verification Progress" }), _jsxs("span", { children: [Math.round((scannedParcels.length / activeManifest.expectedCount) * 100), "%"] })] }), _jsx(Progress, { value: (scannedParcels.length / activeManifest.expectedCount) * 100 })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "qr-scanner-frame aspect-square bg-muted flex flex-col items-center justify-center p-8 text-center", children: [_jsx(QrCode, { className: "w-16 h-16 text-primary mb-4 opacity-50" }), _jsx("p", { className: "text-sm font-medium", children: "Scan Parcel AWB or TT" }), _jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "System will reconcile automatically" }), _jsx(Button, { variant: "secondary", size: "sm", className: "mt-4", children: "Start Camera" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Manual Verification" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Enter AWB or TT ID", value: manualEntry, onChange: (e) => setManualEntry(e.target.value), className: "font-mono", onKeyDown: (e) => e.key === 'Enter' && handleParcelScan(manualEntry) }), _jsx(Button, { onClick: () => handleParcelScan(manualEntry), children: "Verify" })] })] }), _jsxs("div", { className: "p-4 bg-muted/50 rounded-lg border border-dashed", children: [_jsxs("h4", { className: "text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1", children: [_jsx(AlertTriangle, { className: "w-3 h-3" }), "Exception Handling"] }), _jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "If a parcel is missing its label but has a physical Tamper Tag, use the TT ID to verify." }), _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", children: [_jsx(FileWarning, { className: "mr-2 h-4 w-4" }), "Report Discrepancy"] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-semibold", children: "Recent Scans" }), _jsx("div", { className: "bg-muted rounded-md divide-y divide-border/50", children: scannedParcels.length === 0 ? (_jsx("div", { className: "p-4 text-center text-sm text-muted-foreground italic", children: "No parcels scanned yet" })) : (scannedParcels.slice().reverse().map((id, i) => (_jsxs("div", { className: "p-3 flex items-center justify-between animate-in fade-in slide-in-from-left-2", children: [_jsx("span", { className: "font-mono text-sm", children: id }), _jsxs(Badge, { className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", children: [_jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }), " Verified"] })] }, id)))) })] })] }), _jsx(CardFooter, { className: "border-t pt-4", children: _jsx(Button, { className: "w-full btn-modern", size: "lg", disabled: scannedParcels.length === 0, onClick: handleCompleteReceiving, children: "Complete Manifest Reconciliation" }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "card-modern bg-primary/5 border-primary/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "Manifest Details" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Manifest ID" }), _jsx("span", { className: "font-mono", children: activeManifest.id })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Origin Hub" }), _jsx("span", { children: activeManifest.origin })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Total Expected" }), _jsx("span", { className: "font-bold", children: activeManifest.expectedCount })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-base", children: "Expected Parcel List" }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "max-h-[300px] overflow-y-auto px-6 pb-6 space-y-3", children: activeManifest.parcels.map(parcel => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-mono", children: parcel.id }), _jsxs("div", { className: "text-[10px] text-muted-foreground", children: ["TT: ", parcel.ttId] })] }), scannedParcels.includes(parcel.id) || scannedParcels.includes(parcel.ttId) ? (_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" })) : (_jsx("div", { className: "w-4 h-4 rounded-full border-2 border-muted" }))] }, parcel.id))) }) })] })] })] }))] }));
};
export default SubstationReceiving;
