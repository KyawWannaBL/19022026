import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
const ReceivingBay = () => {
    const { user, legacyUser } = useAuth();
    const [isLocationVerified, setIsLocationVerified] = useState(false);
    const [scanningMode, setScanningMode] = useState(null);
    const [currentShipment, setCurrentShipment] = useState(null);
    const [inspectionData, setInspectionData] = useState({
        piecesMatch: true,
        conditionMatch: true,
        notes: '',
    });
    // Mock data for demo purposes
    const mockShipments = {
        const: shipments
    }, { 'AWB123456': { id: , 'shp_1': , awb: , 'AWB123456': , tamperTagId: , 'TT-000451': , status: , 'LABEL_APPLIED_VERIFIED': , pieces: , 2: , type: , 'box': , condition: , 'OK': , cod: { required: , true: , amount: , 1500:  }, destinationTownship: , 'Downtown': , photos: [], 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400': , 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400': , 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=400':  } };
};
riderId: 'rdr_001',
    createdAt;
'2026-02-11T10:00:00Z',
    labelPrintedCount;
1,
;
;
const handleLocationScan = (code) => {
    if (code === 'WH_RECEIVING_01') {
        setIsLocationVerified(true);
        setScanningMode(null);
        toast.success('Location verified: Receiving Bay 01');
    }
    else {
        toast.error('Invalid location QR for this operation');
    }
};
const handleParcelScan = (code) => {
    const shipment = mockShipments[code] || Object.values(mockShipments).find(s => s.tamperTagId === code);
    const shipment = shipments[code] || Object.values(shipments).find(s => s.tamperTagId === code);
    if (!shipment) {
        toast.error('Shipment not found in system');
        return;
    }
    if (shipment.status !== 'LABEL_APPLIED_VERIFIED' && shipment.status !== 'ARRIVED_WAREHOUSE_GATE') {
        toast.error(`Invalid Status: Label must be verified before receiving (Current: ${shipment.status})`);
        return;
    }
    setCurrentShipment(shipment);
    setScanningMode(null);
    toast.success(`Shipment ${shipment.awb || shipment.tamperTagId} loaded for inspection`);
};
const handleConfirmReceived = () => {
    if (!currentShipment)
        return;
    toast.success('Shipment successfully received and verified');
    setCurrentShipment(null);
    setInspectionData({ piecesMatch: true, conditionMatch: true, notes: '' });
};
if (!isLocationVerified) {
    return (_jsx("div", { className: "container mx-auto p-4 max-w-2xl", children: _jsxs(Card, { className: "card-modern overflow-hidden", children: [_jsx("div", { className: "h-2 bg-primary" }), _jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5 text-primary" }), "Step 1: Verify Location"] }), _jsx(CardDescription, { children: "Scan the Warehouse Receiving Bay QR to begin intake operations." })] }), _jsx(CardContent, { className: "flex flex-col items-center py-10", children: scanningMode === 'location' ? (_jsxs("div", { className: "w-full space-y-4", children: [_jsx(QRScanner, { onScan: handleLocationScan, expectedType: "LOCATION" }), _jsx(Button, { variant: "ghost", className: "w-full", onClick: () => setScanningMode(null), children: "Cancel Scan" })] })) : (_jsxs(Button, { size: "lg", className: "h-32 w-32 rounded-full btn-modern flex flex-col gap-2", onClick: () => setScanningMode('location'), children: [_jsx(QrCode, { className: "w-10 h-10" }), _jsx("span", { children: "Scan QR" })] })) })] }) }));
}
return (_jsxs("div", { className: "container mx-auto p-4 space-y-6 max-w-5xl", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Warehouse Receiving" }), _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground mt-1", children: [_jsxs(Badge, { variant: "outline", className: "bg-green-500/10 text-green-600 border-green-200", children: [_jsx(CheckCircle2, { className: "w-3 h-3 mr-1" }), " Verified: Receiving Bay 01"] }), _jsxs("span", { className: "text-xs", children: ["| Staff: ", legacyUser?.name] })] })] }), _jsxs(Button, { variant: "outline", className: "btn-modern", onClick: () => setScanningMode('parcel'), disabled: !!scanningMode, children: [_jsx(QrCode, { className: "w-4 h-4 mr-2" }), "Scan Next Parcel"] })] }), scanningMode === 'parcel' && (_jsx(Card, { className: "card-modern border-primary/50 bg-primary/5", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "max-w-md mx-auto space-y-4", children: [_jsx("h3", { className: "text-center font-medium", children: "Scan AWB or Tamper Tag" }), _jsx(QRScanner, { onScan: handleParcelScan, expectedType: "AWB" }), _jsx(Button, { variant: "ghost", className: "w-full", onClick: () => setScanningMode(null), children: "Cancel" })] }) }) })), currentShipment ? (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Shipment Verification" }), _jsx(CardDescription, { children: "Compare physical parcel with original pickup data" })] }), _jsx(StatusBadge, { status: currentShipment.status })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "AWB Number" }), _jsx("p", { className: "font-mono font-medium", children: currentShipment.awb || 'N/A' })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Tamper Tag" }), _jsx("p", { className: "font-mono font-medium", children: currentShipment.tamperTagId })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Pieces" }), _jsxs("p", { className: "font-medium", children: [currentShipment.pieces, " Units"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Type" }), _jsx(Badge, { variant: "secondary", className: "capitalize", children: currentShipment.type })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("h4", { className: "font-medium flex items-center gap-2", children: [_jsx(Camera, { className: "w-4 h-4" }), "Pickup Evidence (Photos)"] }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: currentShipment.photos.map((url, idx) => (_jsx("div", { className: "aspect-square rounded-md overflow-hidden border bg-muted", children: _jsx("img", { src: url, alt: `Pickup ${idx + 1}`, className: "w-full h-full object-cover" }) }, idx))) }), _jsx("p", { className: "text-xs text-muted-foreground italic", children: "* Ensure Tamper Tag is intact and matching the photo above." })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Inspection Checklist" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("p", { className: "font-medium", children: "Pieces Count Verified" }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Physical count matches system record (", currentShipment.pieces, ")"] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: inspectionData.piecesMatch ? "default" : "outline", size: "sm", onClick: () => setInspectionData(prev => ({ ...prev, piecesMatch: true })), children: [_jsx(Check, { className: "w-4 h-4 mr-1" }), " Yes"] }), _jsxs(Button, { variant: !inspectionData.piecesMatch ? "destructive" : "outline", size: "sm", onClick: () => setInspectionData(prev => ({ ...prev, piecesMatch: false })), children: [_jsx(X, { className: "w-4 h-4 mr-1" }), " No"] })] })] }), _jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("p", { className: "font-medium", children: "Condition Assessment" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "No new damage found compared to pickup" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: inspectionData.conditionMatch ? "default" : "outline", size: "sm", onClick: () => setInspectionData(prev => ({ ...prev, conditionMatch: true })), children: [_jsx(Check, { className: "w-4 h-4 mr-1" }), " OK"] }), _jsxs(Button, { variant: !inspectionData.conditionMatch ? "destructive" : "outline", size: "sm", onClick: () => setInspectionData(prev => ({ ...prev, conditionMatch: false })), children: [_jsx(AlertCircle, { className: "w-4 h-4 mr-1" }), " Damage"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "notes", children: "Internal Notes / Exceptions" }), _jsx(Input, { id: "notes", placeholder: "Optional: add receiving details...", value: inspectionData.notes, onChange: (e) => setInspectionData(prev => ({ ...prev, notes: e.target.value })) })] })] }), _jsxs(CardFooter, { className: "bg-muted/30 flex justify-end gap-3", children: [_jsx(Button, { variant: "ghost", onClick: () => setCurrentShipment(null), children: "Cancel" }), _jsx(Button, { className: "btn-modern bg-primary", onClick: handleConfirmReceived, children: "Confirm Received" })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "Recipient Details" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Destination" }), _jsx("p", { className: "font-medium", children: currentShipment.destinationTownship })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "COD Status" }), _jsx(Badge, { variant: currentShipment.cod.required ? "destructive" : "secondary", children: currentShipment.cod.required ? `Collect: $${currentShipment.cod.amount}` : 'No COD' })] })] })] }), _jsxs(Card, { className: "card-modern border-orange-200 bg-orange-50/50", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2 text-orange-700", children: [_jsx(Info, { className: "w-4 h-4" }), "Security Rules"] }) }), _jsxs(CardContent, { className: "text-xs text-orange-800 space-y-2", children: [_jsxs("p", { children: ["\u2022 Label must be ", _jsx("strong", { children: "Activated" }), " before receiving."] }), _jsx("p", { children: "\u2022 Tamper Tag must be physically present and untorn." }), _jsx("p", { children: "\u2022 Any damage found must be photographed before confirming." })] })] })] })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 bg-muted/20 border-2 border-dashed rounded-xl", children: [_jsx(Package, { className: "w-16 h-16 text-muted-foreground/40 mb-4" }), _jsx("h2", { className: "text-xl font-medium text-muted-foreground", children: "Ready for next parcel" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Scan an AWB QR or Tamper Tag to begin inspection" }), _jsx(Button, { className: "mt-6 btn-modern", onClick: () => setScanningMode('parcel'), children: "Start Scanning" })] }))] }));
;
export default ReceivingBay;
