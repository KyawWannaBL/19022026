import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, QrCode, AlertCircle, Search, Package, History, AlertTriangle, Loader2 } from 'lucide-react';
import { SHIPMENT_STATUS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import QRScanner from '@/components/QRScanner';
import StatusBadge from '@/components/StatusBadge';
const LabelActivation = () => {
    const { user, legacyUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [shipments, setShipments] = useState([]);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [activationStep, setActivationStep] = useState('LIST');
    // Mock data fetching
    useEffect(() => {
        const mockShipments = [];
        const shipments = [
            {
                id: 'SHP-1001',
                awb: 'AWB-2026-X881',
                tamperTagId: 'TT-000451',
                status: 'REGISTERED_READY_FOR_LABEL',
                pieces: 1,
                type: 'box',
                condition: 'OK',
                cod: { required: true, amount: 250 },
                destinationTownship: 'Downtown',
                photos: [],
                riderId: legacyUser?.id || 'rdr_1',
                createdAt: new Date().toISOString(),
                labelPrintedCount: 0,
            },
            {
                id: 'SHP-1002',
                awb: 'AWB-2026-Y223',
                tamperTagId: 'TT-000452',
                status: 'LABEL_PRINTED',
                pieces: 2,
                type: 'bag',
                condition: 'OK',
                cod: { required: false },
                destinationTownship: 'North District',
                photos: [],
                riderId: legacyUser?.id || 'rdr_1',
                createdAt: new Date().toISOString(),
                labelPrintedCount: 1,
            }
        ];
        setShipments(mockShipments);
        setShipments(shipments);
    }, [user]);
    const filteredShipments = shipments.filter(s => s.tamperTagId.includes(searchQuery) ||
        s.awb?.includes(searchQuery) ||
        s.destinationTownship?.toLowerCase().includes(searchQuery.toLowerCase()));
    const handlePrintLabel = async (shipment) => {
        setIsPrinting(true);
        // Simulate printer connection and job
        await new Promise(resolve => setTimeout(resolve, 2000));
        const updatedShipments = shipments.map(s => s.id === shipment.id
            ? { ...s, status: SHIPMENT_STATUS.LABEL_PRINTED, labelPrintedCount: s.labelPrintedCount + 1 }
            : s);
        setShipments(updatedShipments);
        setSelectedShipment({ ...shipment, status: SHIPMENT_STATUS.LABEL_PRINTED, labelPrintedCount: shipment.labelPrintedCount + 1 });
        setIsPrinting(false);
        toast.success(`Label printed for ${shipment.awb}`);
        setActivationStep('ACTIVATE');
    };
    const handleActivationScan = (scannedCode) => {
        if (!selectedShipment)
            return;
        if (scannedCode === selectedShipment.awb) {
            const updatedShipments = shipments.map(s => s.id === selectedShipment.id
                ? { ...s, status: SHIPMENT_STATUS.LABEL_APPLIED_VERIFIED }
                : s);
            setShipments(updatedShipments);
            toast.success("Label activated and verified successfully!");
            setIsScanning(false);
            setActivationStep('LIST');
            setSelectedShipment(null);
        }
        else {
            toast.error("Invalid AWB scan. Please scan the label attached to this parcel.");
        }
    };
    return (_jsxs("div", { className: "flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto pb-24", children: [_jsxs("header", { className: "flex flex-col gap-2", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Label Activation" }), _jsx("p", { className: "text-muted-foreground", children: "Print Air Waybill (AWB) labels and verify their attachment to parcels." })] }), activationStep === 'LIST' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search TT ID, AWB or Township...", className: "pl-10", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { className: "grid gap-4", children: [filteredShipments.map((shipment) => (_jsx(Card, { className: "card-modern overflow-hidden", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: ["TT ID: ", shipment.tamperTagId] }), _jsx("span", { className: "text-lg font-bold font-mono", children: shipment.awb })] }), _jsx(StatusBadge, { status: shipment.status })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-primary" }), _jsxs("span", { children: [shipment.pieces, " ", shipment.type, "(s)"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(History, { className: "w-4 h-4 text-primary" }), _jsxs("span", { children: ["Printed: ", shipment.labelPrintedCount] })] })] }), _jsx("div", { className: "flex gap-2", children: _jsx(Button, { className: "flex-1 btn-modern", variant: shipment.status === 'REGISTERED_READY_FOR_LABEL' ? 'default' : 'secondary', onClick: () => {
                                                    setSelectedShipment(shipment);
                                                    setActivationStep('PRINT');
                                                }, children: shipment.status === 'REGISTERED_READY_FOR_LABEL' ? 'Prepare Label' : 'Manage Label' }) })] }) }, shipment.id))), filteredShipments.length === 0 && (_jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [_jsx(Package, { className: "w-12 h-12 mx-auto mb-4 opacity-20" }), _jsx("p", { children: "No shipments pending labels found." })] }))] })] })), activationStep === 'PRINT' && selectedShipment && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Verify & Print Label" }), _jsx(CardDescription, { children: "Confirm details before printing the AWB sticker." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-muted/50 p-4 rounded-lg space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "TT ID" }), _jsx("span", { className: "font-mono font-medium", children: selectedShipment.tamperTagId })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "AWB No." }), _jsx("span", { className: "font-mono font-medium", children: selectedShipment.awb })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Destination" }), _jsx("span", { className: "font-medium", children: selectedShipment.destinationTownship })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "COD Amount" }), _jsx("span", { className: "font-bold text-primary", children: selectedShipment.cod.required ? `$${selectedShipment.cod.amount}` : 'N/A' })] })] }), selectedShipment.labelPrintedCount > 0 && (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20", children: [_jsx(AlertTriangle, { className: "w-5 h-5 shrink-0" }), _jsxs("div", { className: "text-xs", children: [_jsx("p", { className: "font-bold uppercase", children: "Reprint Warning" }), _jsxs("p", { children: ["This label has been printed ", selectedShipment.labelPrintedCount, " times already. Reprints are audited."] })] })] }))] }), _jsxs(CardFooter, { className: "flex gap-3", children: [_jsx(Button, { variant: "outline", className: "flex-1", onClick: () => setActivationStep('LIST'), children: "Back" }), _jsxs(Button, { className: "flex-1 btn-modern", disabled: isPrinting, onClick: () => handlePrintLabel(selectedShipment), children: [isPrinting ? _jsx(Loader2, { className: "w-4 h-4 animate-spin mr-2" }) : _jsx(Printer, { className: "w-4 h-4 mr-2" }), selectedShipment.labelPrintedCount > 0 ? 'Reprint Label' : 'Print Label'] })] })] }) })), activationStep === 'ACTIVATE' && selectedShipment && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "space-y-6", children: [_jsx(Card, { className: "card-modern border-primary/20 bg-primary/5", children: _jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(QrCode, { className: "w-8 h-8 text-primary" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold", children: "Step 3: Activation Scan" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Attach the printed AWB label to the parcel next to the Tamper Tag, then scan it to activate." })] }), !isScanning ? (_jsx(Button, { className: "w-full h-16 text-lg font-bold btn-modern", onClick: () => setIsScanning(true), children: "Scan AWB to Activate" })) : (_jsxs("div", { className: "w-full", children: [_jsx(QRScanner, { onScan: handleActivationScan, expectedType: "AWB" }), _jsx(Button, { variant: "link", className: "mt-4 text-muted-foreground", onClick: () => setIsScanning(false), children: "Cancel Scanning" })] }))] }) }), _jsxs("div", { className: "bg-card p-4 rounded-xl border border-border flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-muted rounded-lg", children: _jsx(AlertCircle, { className: "w-5 h-5 text-muted-foreground" }) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Parcels cannot be received at the warehouse until this activation step is complete. Ensure the scan captures the AWB QR clearly." })] })] })), _jsx(AnimatePresence, { children: activationStep !== 'LIST' && (_jsx(motion.div, { initial: { y: 100 }, animate: { y: 0 }, exit: { y: 100 }, className: "fixed bottom-6 left-4 right-4 z-50", children: _jsxs("div", { className: "bg-foreground text-background px-6 py-4 rounded-full shadow-2xl flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), _jsxs("span", { className: "text-sm font-medium", children: ["Activating ", selectedShipment?.awb] })] }), _jsx("button", { onClick: () => {
                                    setActivationStep('LIST');
                                    setSelectedShipment(null);
                                    setIsScanning(false);
                                }, className: "text-xs font-bold uppercase tracking-wider opacity-70 hover:opacity-100", children: "Cancel Process" })] }) })) })] }));
};
export default LabelActivation;
