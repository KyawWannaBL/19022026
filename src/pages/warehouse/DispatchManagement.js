import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, AlertCircle, ClipboardList, ArrowRight, MapPin, ShieldAlert } from 'lucide-react';
import { ROUTE_PATHS, MOCK_TOWNSHIPS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import QRScanner from '@/components/QRScanner';
// Mock data for shipments available for dispatch
const MOCK_AVAILABLE_SHIPMENTS = [
    {
        id: 'SHP-001',
        awb: 'AWB-2026-1001',
        tamperTagId: 'TT-99001',
        status: 'WAREHOUSE_RECEIVED_VERIFIED',
        pieces: 1,
        type: 'box',
        condition: 'OK',
        cod: { required: true, amount: 150 },
        destinationTownship: 'Downtown',
        photos: [],
        riderId: 'rdr_1',
        createdAt: '2026-02-11T10:00:00Z',
        labelPrintedCount: 1,
    },
    {
        id: 'SHP-002',
        awb: 'AWB-2026-1002',
        tamperTagId: 'TT-99002',
        status: 'WAREHOUSE_RECEIVED_VERIFIED',
        pieces: 2,
        type: 'bag',
        condition: 'OK',
        cod: { required: false },
        destinationTownship: 'North District',
        photos: [],
        riderId: 'rdr_2',
        createdAt: '2026-02-11T11:00:00Z',
        labelPrintedCount: 1,
    },
    {
        id: 'SHP-003',
        awb: 'AWB-2026-1003',
        tamperTagId: 'TT-99003',
        status: 'WAREHOUSE_RECEIVED_VERIFIED',
        pieces: 1,
        type: 'document',
        condition: 'OK',
        cod: { required: false },
        destinationTownship: 'Downtown',
        photos: [],
        riderId: 'rdr_1',
        createdAt: '2026-02-11T12:00:00Z',
        labelPrintedCount: 1,
    }
];
const DispatchManagement = () => {
    const navigate = useNavigate();
    const { user, legacyUser } = useAuth();
    const [step, setStep] = useState('INITIAL');
    const [destinationTownship, setDestination] = useState('');
    const [scannedParcels, setScannedParcels] = useState([]);
    const [isGateVerified, setIsGateVerified] = useState(false);
    const [manifestId, setManifestId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const filteredAvailable = useMemo(() => {
        if (!destinationTownship)
            return [];
        return MOCK_AVAILABLE_SHIPMENTS.filter(s => s.destinationTownship === destinationTownship &&
            !scannedParcels.find(p => p.id === s.id));
    }, [destinationTownship, scannedParcels]);
    const handleStartDispatch = () => {
        setStep('LOCATION');
    };
    const handleLocationScan = (code) => {
        if (code.includes('WH_DISPATCH')) {
            setIsGateVerified(true);
            setStep('MANIFEST');
            toast.success('Dispatch Location Verified');
        }
        else {
            toast.error('Invalid Location QR. Please scan the WH_DISPATCH poster.');
        }
    };
    const handleCreateManifest = () => {
        if (!destinationTownship) {
            toast.error('Please select a destinationTownship substation');
            return;
        }
        const newId = `MAN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        setManifestId(newId);
        setStep('SCANNING');
        toast.success(`Manifest ${newId} Created`);
    };
    const handleParcelScan = (code) => {
        const parcel = MOCK_AVAILABLE_SHIPMENTS.find(s => s.awb === code || s.tamperTagId === code);
        if (!parcel) {
            toast.error('Parcel not found in system');
            return;
        }
        if (parcel.destinationTownship !== destinationTownship) {
            toast.error(`Warning: Destination mismatch. This parcel is for ${parcel.destinationTownship}`);
            return;
        }
        if (scannedParcels.find(p => p.id === parcel.id)) {
            toast.warning('Parcel already scanned');
            return;
        }
        setScannedParcels(prev => [...prev, parcel]);
        toast.success(`Parcel ${parcel.awb} Added to Manifest`);
    };
    const handleCloseManifest = () => {
        const expectedCount = MOCK_AVAILABLE_SHIPMENTS.filter(s => s.destinationTownship === destinationTownship).length;
        if (scannedParcels.length < expectedCount) {
            setStep('RECONCILE');
        }
        else {
            completeDispatch();
        }
    };
    const completeDispatch = () => {
        toast.success('Dispatch Manifest Closed and Dispatched Successfully');
        navigate(ROUTE_PATHS.DASHBOARD);
    };
    return (_jsx("div", { className: "min-h-screen bg-background p-4 pb-24 md:p-8", children: _jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight md:text-3xl", children: "Warehouse Dispatch" }), _jsx("p", { className: "text-muted-foreground", children: "Create manifests and verify shipments for outbound transport." })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(Badge, { variant: "outline", className: "bg-primary/5 text-primary border-primary/20", children: [_jsx(ShieldAlert, { className: "mr-1 h-3 w-3" }), "Dual Control Enforced"] }) })] }), step === 'INITIAL' && (_jsx(Card, { className: "border-dashed", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx("div", { className: "mb-4 rounded-full bg-primary/10 p-4 text-primary", children: _jsx(Truck, { className: "h-12 w-12" }) }), _jsx(CardTitle, { className: "mb-2", children: "Ready to Dispatch?" }), _jsx(CardDescription, { className: "max-w-xs mb-6", children: "Scan the Dispatch Bay Location QR to begin creating a new transport manifest." }), _jsx(Button, { size: "lg", onClick: handleStartDispatch, className: "btn-modern", children: "Begin Dispatch Flow" })] }) })), step === 'LOCATION' && (_jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-primary" }), "Step 1: Verify Location"] }), _jsx(CardDescription, { children: "Scan the QR code at WH_DISPATCH bay." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("div", { className: "qr-scanner-frame mx-auto aspect-square max-w-[300px]", children: _jsx(QRScanner, { onScan: handleLocationScan, expectedType: "LOCATION" }) }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => setStep('INITIAL'), children: "Cancel" })] })] })), step === 'MANIFEST' && (_jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Step 2: Destination & Driver" }), _jsx(CardDescription, { children: "Select where these parcels are going." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Select Destination Substation" }), _jsx("div", { className: "grid grid-cols-2 gap-2 md:grid-cols-3", children: MOCK_TOWNSHIPS.map(town => (_jsxs(Button, { variant: destinationTownship === town ? 'default' : 'outline', className: "h-auto flex-col py-4 text-xs", onClick: () => setDestination(town), children: [_jsx(MapPin, { className: "mb-1 h-4 w-4" }), town] }, town))) })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between rounded-lg border bg-muted/30 p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "rounded-full bg-primary/10 p-2", children: _jsx(Truck, { className: "h-5 w-5 text-primary" }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium", children: ["Available for ", destinationTownship || '...'] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [filteredAvailable.length, " parcels waiting"] })] })] }) }), _jsxs(Button, { className: "w-full btn-modern", disabled: !destinationTownship, onClick: handleCreateManifest, children: ["Create Dispatch Manifest", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] })] })), step === 'SCANNING' && (_jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [_jsxs("div", { className: "md:col-span-2 space-y-6", children: [_jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs(CardTitle, { children: ["Scanning Manifest: ", manifestId] }), _jsxs(CardDescription, { children: ["Scan AWB or Tamper Tag for ", destinationTownship] })] }), _jsxs(Badge, { className: "bg-primary", children: [scannedParcels.length, " Scanned"] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "qr-scanner-frame aspect-video", children: _jsx(QRScanner, { onScan: handleParcelScan, expectedType: "AWB" }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Manual Entry (AWB/TT)", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx(Button, { onClick: () => handleParcelScan(searchQuery), children: "Add" })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(ClipboardList, { className: "h-4 w-4 text-primary" }), "Scanned in this Manifest"] }) }), _jsx(CardContent, { children: _jsx(ScrollArea, { className: "h-[200px]", children: _jsx("div", { className: "space-y-2", children: scannedParcels.length === 0 ? (_jsx("p", { className: "text-center text-sm text-muted-foreground py-8", children: "No parcels scanned yet." })) : (scannedParcels.map(p => (_jsxs("div", { className: "flex items-center justify-between rounded-md border p-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "font-mono font-medium", children: p.awb })] }), _jsx(Badge, { variant: "outline", children: p.tamperTagId })] }, p.id)))) }) }) })] })] }), _jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "card-modern sticky top-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-medium", children: "Manifest Progress" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Expected" }), _jsx("span", { className: "font-bold", children: filteredAvailable.length + scannedParcels.length })] }), _jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Scanned" }), _jsx("span", { className: "font-bold text-primary", children: scannedParcels.length })] }), _jsx("div", { className: "h-2 w-full overflow-hidden rounded-full bg-muted", children: _jsx("div", { className: "h-full bg-primary transition-all duration-500", style: { width: `${(scannedParcels.length / (filteredAvailable.length + scannedParcels.length)) * 100}%` } }) })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { className: "w-full", variant: "default", disabled: scannedParcels.length === 0, onClick: handleCloseManifest, children: "Close Manifest" }), _jsx(Button, { variant: "ghost", className: "w-full text-destructive hover:text-destructive hover:bg-destructive/10", onClick: () => setStep('MANIFEST'), children: "Cancel & Discard" })] })] })] }) })] })), step === 'RECONCILE' && (_jsxs(Card, { className: "card-modern border-destructive/20", children: [_jsxs(CardHeader, { className: "bg-destructive/5", children: [_jsxs("div", { className: "flex items-center gap-2 text-destructive", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx(CardTitle, { children: "Manifest Reconciliation Mismatch" })] }), _jsxs(CardDescription, { children: [filteredAvailable.length, " parcels expected for this destinationTownship were not scanned."] })] }), _jsxs(CardContent, { className: "pt-6 space-y-6", children: [_jsxs("div", { className: "rounded-lg border bg-muted/20 p-4", children: [_jsx("p", { className: "mb-3 text-sm font-medium", children: "Missing Parcels List:" }), _jsx("div", { className: "space-y-2", children: filteredAvailable.map(p => (_jsxs("div", { className: "flex items-center justify-between rounded border border-destructive/20 bg-destructive/5 p-2 text-xs", children: [_jsx("span", { className: "font-mono", children: p.awb }), _jsx("span", { className: "text-muted-foreground", children: p.tamperTagId })] }, p.id))) })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { variant: "destructive", onClick: () => setStep('SCANNING'), children: "Continue Scanning" }), _jsx(Button, { variant: "outline", className: "border-destructive/30 text-destructive", onClick: completeDispatch, children: "Override & Dispatch Anyway (Incident Logged)" })] })] })] }))] }) }));
};
export default DispatchManagement;
