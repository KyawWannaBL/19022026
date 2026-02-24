import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2, Package, ArrowRight, AlertCircle, QrCode, Scan, Check, X } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import QRScanner from '@/components/QRScanner';
const WarehouseDrop = () => {
    const navigate = useNavigate();
    const { user, legacyUser } = useAuth();
    const [step, setStep] = useState(1);
    const [isScanning, setIsScanning] = useState(false);
    const [warehouseVerified, setWarehouseVerified] = useState(false);
    const [scanningParcels, setScanningParcels] = useState(false);
    const [scannedParcels, setScannedParcels] = useState([]);
    // Mock data for parcels ready to be dropped
    const [pendingParcels, setPendingParcels] = useState([
        {
            id: 'SHP-001',
            awb: 'AWB-100201',
            tamperTagId: 'TT-000001',
            status: 'LABEL_APPLIED_VERIFIED',
            pieces: 1,
            type: 'box',
            condition: 'OK',
            cod: { required: false },
            photos: [],
            riderId: legacyUser?.id || '',
            createdAt: new Date().toISOString(),
            labelPrintedCount: 1
        },
        {
            id: 'SHP-002',
            awb: 'AWB-100202',
            tamperTagId: 'TT-000002',
            status: 'LABEL_APPLIED_VERIFIED',
            pieces: 2,
            type: 'bag',
            condition: 'OK',
            cod: { required: true, amount: 150 },
            photos: [],
            riderId: legacyUser?.id || '',
            createdAt: new Date().toISOString(),
            labelPrintedCount: 1
        }
    ]);
    const handleWarehouseScan = (code) => {
        if (code === 'WH_GATE_SOUTH' || code === 'WH_GATE_MAIN') {
            setWarehouseVerified(true);
            setIsScanning(false);
            setStep(2);
            toast.success('Warehouse Gate Verified', {
                description: `Location: ${code.replace('_', ' ')}`
            });
        }
        else {
            toast.error('Invalid Warehouse QR', {
                description: 'Please scan the official WH_GATE QR code.'
            });
        }
    };
    const handleParcelScan = (code) => {
        const parcel = pendingParcels.find(p => p.awb === code || p.tamperTagId === code);
        if (!parcel) {
            toast.error('Parcel Not Found', {
                description: 'This parcel is not in your pending drop-off list.'
            });
            return;
        }
        if (parcel.status !== 'LABEL_APPLIED_VERIFIED') {
            toast.error('Activation Required', {
                description: 'Label must be activated before warehouse arrival.'
            });
            return;
        }
        if (scannedParcels.includes(parcel.id)) {
            toast.info('Already Scanned', {
                description: 'This parcel is already in the drop-off queue.'
            });
            return;
        }
        setScannedParcels(prev => [...prev, parcel.id]);
        toast.success('Parcel Added', {
            description: `${parcel.awb} verified for drop-off.`
        });
    };
    const handleCompleteDrop = () => {
        if (scannedParcels.length === 0) {
            toast.error('No Parcels Scanned', {
                description: 'Please scan at least one parcel to complete drop-off.'
            });
            return;
        }
        // In production, this would be an API call
        toast.success('Handover Complete', {
            description: `${scannedParcels.length} parcels marked as ARRIVED_WAREHOUSE_GATE.`
        });
        navigate(ROUTE_PATHS.DASHBOARD);
    };
    return (_jsxs("div", { className: "flex flex-col gap-6 p-4 max-w-2xl mx-auto pb-24", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Warehouse Drop-off" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Hand over parcels to the sorting facility." })] }), _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: `flex-1 h-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}` }), _jsx("div", { className: `flex-1 h-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}` })] }), step === 1 && (_jsxs(Card, { className: "card-modern border-primary/20", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [_jsx(MapPin, { className: "w-5 h-5 text-primary" }), "Step 1: Arrive at Gate"] }), _jsx(CardDescription, { children: "Scan the Warehouse Gate QR code to verify your location and start the handover." })] }), _jsxs(CardContent, { className: "flex flex-col items-center py-6 gap-4", children: [!isScanning ? (_jsxs("div", { className: "flex flex-col items-center gap-4 w-full", children: [_jsx("div", { className: "w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center border-2 border-dashed border-primary/20", children: _jsx(QrCode, { className: "w-12 h-12 text-primary opacity-40" }) }), _jsxs(Button, { className: "w-full btn-modern", size: "lg", onClick: () => setIsScanning(true), children: [_jsx(Scan, { className: "w-4 h-4 mr-2" }), "Scan Gate QR"] })] })) : (_jsxs("div", { className: "w-full flex flex-col gap-4", children: [_jsx(QRScanner, { expectedType: "LOCATION", onScan: handleWarehouseScan }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => setIsScanning(false), children: "Cancel Scan" })] })), _jsxs("div", { className: "mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg w-full", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-primary shrink-0" }), _jsx("p", { children: "System uses geofencing to ensure you are at the correct warehouse location. Location services must be enabled." })] })] })] })), step === 2 && (_jsxs("div", { className: "flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500", children: [_jsx(Card, { className: "card-modern border-success/20 bg-success/5", children: _jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-success/20 flex items-center justify-center", children: _jsx(Check, { className: "w-4 h-4 text-success" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold", children: "Warehouse Gate Verified" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Location: WH_GATE_SOUTH" })] })] }), _jsx(Badge, { variant: "outline", className: "bg-success/10 text-success border-success/20", children: "Verified" })] }) }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: "Step 2: Scan Parcels" }), _jsx(CardDescription, { children: "Scan AWB or Tamper Tag for each parcel." })] }), _jsxs(Badge, { variant: "secondary", children: [scannedParcels.length, " / ", pendingParcels.length] })] }) }), _jsxs(CardContent, { className: "flex flex-col gap-4", children: [scanningParcels ? (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(QRScanner, { onScan: handleParcelScan }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => setScanningParcels(false), children: "Done Scanning" })] })) : (_jsx(Button, { className: "w-full py-8 border-dashed bg-primary/5 hover:bg-primary/10 text-primary border-primary/20", variant: "outline", onClick: () => setScanningParcels(true), children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Scan, { className: "w-6 h-6" }), _jsx("span", { children: "Tap to Scan Parcel" })] }) })), _jsxs("div", { className: "space-y-3 mt-2", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Scanned for Drop-off" }), scannedParcels.length === 0 ? (_jsxs("div", { className: "text-center py-8 bg-muted/20 rounded-xl border border-dashed", children: [_jsx(Package, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-20" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "No parcels scanned yet" })] })) : (_jsx("div", { className: "flex flex-col gap-2", children: pendingParcels.filter(p => scannedParcels.includes(p.id)).map((parcel) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border bg-card", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Package, { className: "w-5 h-5 text-muted-foreground" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-mono font-medium", children: parcel.awb }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["TT: ", parcel.tamperTagId] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-[10px] px-1.5 py-0", children: parcel.type }), _jsx(CheckCircle2, { className: "w-5 h-5 text-success" })] })] }, parcel.id))) }))] }), pendingParcels.length > scannedParcels.length && (_jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Remaining in Vehicle" }), _jsx("div", { className: "flex flex-col gap-2", children: pendingParcels.filter(p => !scannedParcels.includes(p.id)).map((parcel) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border bg-muted/30 opacity-60", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Package, { className: "w-5 h-5 text-muted-foreground" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-mono", children: parcel.awb }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["TT: ", parcel.tamperTagId] })] })] }), _jsx(Badge, { variant: "outline", children: "Pending" })] }, parcel.id))) })] }))] }), _jsx(CardFooter, { className: "border-t pt-6", children: _jsxs(Button, { className: "w-full btn-modern", size: "lg", disabled: scannedParcels.length === 0 || scanningParcels, onClick: handleCompleteDrop, children: ["Complete Handover (", scannedParcels.length, ")", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] })] })), _jsxs("div", { className: "fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t flex items-center justify-between md:hidden", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("p", { className: "text-[10px] text-muted-foreground uppercase font-bold", children: ["Step ", step, " of 2"] }), _jsx("p", { className: "text-sm font-semibold", children: step === 1 ? 'Location Verification' : 'Parcel Handover' })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate(ROUTE_PATHS.DASHBOARD), children: [_jsx(X, { className: "w-4 h-4 mr-2" }), "Exit"] })] })] }));
};
export default WarehouseDrop;
