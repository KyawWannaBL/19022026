import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Camera, CheckCircle2, ChevronLeft, MapPin, PenTool, Phone, Send, ShieldCheck, Smartphone, User, XCircle, } from 'lucide-react';
import { NDR_REASONS, ROUTE_PATHS, SHIPMENT_STATUS, } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PhotoCapture from '@/components/PhotoCapture';
import QRScanner from '@/components/QRScanner';
import SignaturePad from '@/components/SignaturePad';
async function getHighPrecisionLocation() {
    if (!('geolocation' in navigator))
        return null;
    return await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const c = pos.coords;
            resolve({
                lat: c.latitude,
                lng: c.longitude,
                accuracyM: c.accuracy,
                altitudeM: c.altitude ?? null,
                altitudeAccuracyM: c.altitudeAccuracy ?? null,
                heading: c.heading ?? null,
                speedMps: c.speed ?? null,
                capturedAtIso: new Date().toISOString(),
            });
        }, () => resolve(null), { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
    });
}
/**
 * Network-validated timestamp:
 * - Preferred: /api/time -> { nowIso }
 * - Fallback: same-origin HEAD Date header
 * - Last resort: device time
 */
async function getNetworkValidatedTime() {
    try {
        const res = await fetch('/api/time', { cache: 'no-store' });
        if (res.ok) {
            const j = await res.json().catch(() => null);
            if (j?.nowIso)
                return { networkValidatedAtIso: String(j.nowIso), source: 'api' };
        }
    }
    catch { }
    try {
        const res = await fetch('/', { method: 'HEAD', cache: 'no-store' });
        const date = res.headers.get('date');
        if (date)
            return { networkValidatedAtIso: new Date(date).toISOString(), source: 'server-date-header' };
    }
    catch { }
    return { networkValidatedAtIso: new Date().toISOString(), source: 'local-fallback' };
}
const BRITIUM_BLUE_GUARD = 'focus-visible:ring-4 focus-visible:ring-[rgba(0,102,255,0.75)] focus-visible:ring-offset-2 focus-visible:ring-offset-background';
const BRITIUM_BIG_PRIMARY = 'w-full h-14 text-lg font-semibold shadow-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 hover:opacity-95';
export default function DeliveryFlow() {
    const navigate = useNavigate();
    const { user, legacyUser } = useAuth();
    const [step, setStep] = useState('scan');
    const [shipment, setShipment] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [geoEvidence, setGeoEvidence] = useState(null);
    const [netTime, setNetTime] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const otpRef = useRef(null);
    const recipientNameRef = useRef(null);
    const [podData, setPodData] = useState({
        recipientName: '',
        relationship: '',
        signature: '',
        photo: '',
    });
    const [ndrData, setNdrData] = useState({
        reason: '',
        remarks: '',
    });
    const riderId = legacyUser?.id || user?.id || 'unknown';
    const shipmentRequiresOtp = useMemo(() => Boolean(shipment?.cod?.required), [shipment]);
    const canSubmitDelivery = useMemo(() => {
        if (!podData.recipientName || !podData.signature)
            return false;
        if (shipmentRequiresOtp && !otpVerified)
            return false;
        return true;
    }, [podData.recipientName, podData.signature, shipmentRequiresOtp, otpVerified]);
    // Prefetch GPS + network time once we reach POD step (bind to signature evidence)
    useEffect(() => {
        let cancelled = false;
        if (step !== 'pod')
            return;
        (async () => {
            const [gps, nt] = await Promise.all([getHighPrecisionLocation(), getNetworkValidatedTime()]);
            if (cancelled)
                return;
            setGeoEvidence(gps);
            setNetTime(nt);
        })();
        return () => { cancelled = true; };
    }, [step]);
    // Focus-forward: OTP after sending; Recipient name on POD
    useEffect(() => {
        if (otpSent && !otpVerified) {
            setTimeout(() => otpRef.current?.focus(), 50);
        }
    }, [otpSent, otpVerified]);
    useEffect(() => {
        if (step === 'pod') {
            setTimeout(() => recipientNameRef.current?.focus(), 50);
        }
    }, [step]);
    const notify = useCallback((type, message) => {
        // Minimal, no dependency. Replace with sonner/toast if you want.
        if (type === 'error') {
            console.error(message);
            window.alert(message);
            return;
        }
        if (type === 'warn')
            console.warn(message);
        else
            console.log(message);
    }, []);
    const handleScan = useCallback((code) => {
        // Demo lookup: accept any AWB; in real app query Supabase/Firestore.
        // Keep existing UX: proceed to details view.
        const demoShipment = {
            ...shipment,
            id: shipment?.id || code,
            awb: code,
            status: shipment?.status || SHIPMENT_STATUS?.OUT_FOR_DELIVERY || 'OUT_FOR_DELIVERY',
            receiver: shipment?.receiver || { name: 'Customer', phone: '09xxxxxxxxx' },
            address: shipment?.address || 'Customer address',
            cod: shipment?.cod || { required: false, amount: 0, currency: 'MMK' },
        };
        setShipment(demoShipment);
        setStep('details');
        setOtpSent(false);
        setOtpVerified(false);
        setOtpValue('');
        setPodData({ recipientName: '', relationship: '', signature: '', photo: '' });
        setNdrData({ reason: '', remarks: '' });
    }, [shipment]);
    const handleSendOtp = useCallback(() => {
        if (!shipment)
            return;
        setOtpSent(true);
        notify('success', 'OTP sent (demo: use 1234).');
    }, [shipment, notify]);
    const handleVerifyOtp = useCallback(() => {
        if (otpValue.trim() === '1234') {
            setOtpVerified(true);
            notify('success', 'OTP verified.');
        }
        else {
            notify('error', 'Invalid OTP. Use 1234 for demo.');
        }
    }, [otpValue, notify]);
    const handleDeliver = useCallback(async () => {
        if (!shipment)
            return;
        if (!canSubmitDelivery) {
            notify('error', 'Recipient name and signature are required. COD shipments also require OTP verification.');
            return;
        }
        setSubmitting(true);
        try {
            const gps = geoEvidence ?? (await getHighPrecisionLocation());
            const nt = netTime ?? (await getNetworkValidatedTime());
            const signatureEvidence = {
                signaturePngBase64: podData.signature, // or store signatureUrl instead
                networkValidatedAtIso: nt.networkValidatedAtIso,
                networkTimeSource: nt.source,
                gps, // null if denied/unavailable
                device: { userAgent: navigator.userAgent },
            };
            const nonRepudiablePODPayload = {
                shipmentId: shipment?.id ?? shipment.awb,
                awb: shipment.awb,
                riderId,
                recipientName: podData.recipientName,
                relationship: podData.relationship,
                otpVerified,
                cod: shipment.cod ?? null,
                photo: podData.photo ?? null,
                signature: signatureEvidence,
                createdAtIso: new Date().toISOString(),
            };
            // TODO: Persist it (Supabase insert / API call).
            // await supabase.from('pod_records').insert(nonRepudiablePODPayload)
            console.log('POD_PAYLOAD', nonRepudiablePODPayload);
            notify('success', 'Delivery Completed Successfully');
            navigate(ROUTE_PATHS.DASHBOARD);
        }
        catch (e) {
            notify('error', e?.message ?? 'Failed to submit delivery');
        }
        finally {
            setSubmitting(false);
        }
    }, [shipment, canSubmitDelivery, notify, navigate, riderId, podData, otpVerified, geoEvidence, netTime]);
    const handleNDR = useCallback(() => {
        if (!ndrData.reason) {
            notify('error', 'Please select a reason for failed delivery');
            return;
        }
        console.log('NDR', { shipmentId: shipment?.id ?? shipment?.awb, ...ndrData });
        notify('warn', 'NDR recorded. Shipment will be returned to hub.');
        navigate(ROUTE_PATHS.DASHBOARD);
    }, [ndrData, notify, navigate, shipment]);
    // ===== UI =====
    if (step === 'scan') {
        return (_jsxs("div", { className: "max-w-md mx-auto p-4 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Last-Mile Delivery" }), _jsx("p", { className: "text-muted-foreground", children: "Scan AWB QR code at the doorstep" })] }), _jsx(QRScanner, { onScan: handleScan, expectedType: "AWB" }), _jsxs(Button, { variant: "ghost", className: "w-full", onClick: () => navigate(ROUTE_PATHS.DASHBOARD), children: [_jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }), " Back to Dashboard"] })] }));
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto p-4 pb-24 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setStep('scan'), children: [_jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }), " Rescan"] }), shipment?.awb && (_jsx(Badge, { variant: "outline", className: "bg-primary/5 text-primary border-primary/20", children: shipment.awb }))] }), step === 'details' && shipment && (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5 text-primary" }), "Recipient Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Name" }), _jsx("p", { className: "font-medium", children: shipment?.receiver?.name ?? '—' })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Phone" }), _jsxs("p", { className: "font-medium flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }), shipment?.receiver?.phone ?? '—'] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs text-muted-foreground uppercase", children: "Address" }), _jsxs("p", { className: "font-medium flex items-start gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground mt-0.5" }), shipment?.address ?? '—'] })] }), shipment?.cod?.required && (_jsxs("div", { className: "p-4 rounded-xl border bg-muted/30 space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ShieldCheck, { className: "h-5 w-5 text-primary" }), _jsx("p", { className: "font-semibold", children: "COD Verification Required" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Amount:", ' ', _jsxs("span", { className: "font-semibold text-foreground", children: [shipment.cod?.amount ?? 0, " ", shipment.cod?.currency ?? ''] })] }), !otpSent ? (_jsxs(Button, { className: BRITIUM_BIG_PRIMARY, onClick: handleSendOtp, children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), " Send OTP"] })) : (_jsx(Badge, { className: otpVerified ? 'bg-emerald-600' : 'bg-yellow-500', children: otpVerified ? 'OTP Verified' : 'OTP Sent' }))] }), otpSent && !otpVerified && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 items-end", children: [_jsxs("div", { className: "md:col-span-2 space-y-2", children: [_jsxs(Label, { className: "flex items-center gap-2", children: [_jsx(Smartphone, { className: "h-4 w-4" }), " Enter OTP (demo: 1234)"] }), _jsx(Input, { ref: otpRef, className: BRITIUM_BLUE_GUARD, value: otpValue, onChange: (e) => setOtpValue(e.target.value), placeholder: "\u2022\u2022\u2022\u2022" })] }), _jsx(Button, { className: BRITIUM_BIG_PRIMARY, onClick: handleVerifyOtp, children: "Verify OTP" })] }))] }))] }), _jsxs(CardFooter, { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", className: "flex-1 h-14", onClick: () => setStep('ndr'), children: [_jsx(XCircle, { className: "mr-2 h-4 w-4" }), " Failed Delivery"] }), _jsxs(Button, { className: `flex-1 ${BRITIUM_BIG_PRIMARY}`, onClick: () => setStep('pod'), children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), " Proceed to POD"] })] })] }) })), step === 'pod' && shipment && (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(PenTool, { className: "h-5 w-5 text-primary" }), "Proof of Delivery (ePOD)"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "p-4 rounded-xl border bg-muted/30 space-y-2", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Signature will be bound to GPS + altitude + network-validated timestamp." }), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["Time source: ", _jsx("span", { className: "font-semibold text-foreground", children: netTime?.source ?? 'pending' }), ' · ', "GPS: ", _jsx("span", { className: "font-semibold text-foreground", children: geoEvidence ? `±${Math.round(geoEvidence.accuracyM)}m` : 'pending/denied' })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Recipient Name" }), _jsx(Input, { ref: recipientNameRef, className: BRITIUM_BLUE_GUARD, value: podData.recipientName, onChange: (e) => setPodData((p) => ({ ...p, recipientName: e.target.value })), placeholder: "Receiver full name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Relationship" }), _jsx(Input, { className: BRITIUM_BLUE_GUARD, value: podData.relationship, onChange: (e) => setPodData((p) => ({ ...p, relationship: e.target.value })), placeholder: "Self / Family / Office / Guard" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { className: "flex items-center gap-2", children: [_jsx(Camera, { className: "h-4 w-4" }), " Doorstep Photo (optional)"] }), _jsx(PhotoCapture, { onCapture: (photo) => setPodData((p) => ({ ...p, photo })), watermarkData: {
                                                ttId: shipment?.tamperTagId,
                                                userId: riderId,
                                                timestamp: netTime?.networkValidatedAtIso ?? new Date().toISOString(),
                                                gps: geoEvidence
                                                    ? `${geoEvidence.lat.toFixed(6)}, ${geoEvidence.lng.toFixed(6)} (±${Math.round(geoEvidence.accuracyM)}m)`
                                                    : 'GPS unavailable',
                                            }, required: false })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Customer Signature" }), _jsx(SignaturePad, { onSave: (sig) => setPodData((p) => ({ ...p, signature: sig })) }), !podData.signature && (_jsx("p", { className: "text-xs text-muted-foreground", children: "Ask customer to sign on the pad." }))] })] }), _jsxs(CardFooter, { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", className: "flex-1 h-14", onClick: () => setStep('details'), children: [_jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }), " Back"] }), _jsx(Button, { className: `flex-1 ${BRITIUM_BIG_PRIMARY}`, onClick: handleDeliver, disabled: !canSubmitDelivery || submitting, children: submitting ? 'Submitting…' : 'Submit Delivery' })] })] }) })), step === 'ndr' && shipment && (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "card-modern border-destructive/20", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-destructive", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), "Non-Delivery Report (NDR)"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Reason" }), _jsxs(Select, { value: ndrData.reason, onValueChange: (v) => setNdrData((p) => ({ ...p, reason: v })), children: [_jsx(SelectTrigger, { className: BRITIUM_BLUE_GUARD, children: _jsx(SelectValue, { placeholder: "Select reason" }) }), _jsx(SelectContent, { children: NDR_REASONS?.map((r) => (_jsx(SelectItem, { value: r, children: r }, r))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Remarks" }), _jsx(Textarea, { className: BRITIUM_BLUE_GUARD, value: ndrData.remarks, onChange: (e) => setNdrData((p) => ({ ...p, remarks: e.target.value })), placeholder: "Any detail for return/reattempt" })] })] }), _jsxs(CardFooter, { className: "flex gap-3", children: [_jsxs(Button, { variant: "outline", className: "flex-1 h-14", onClick: () => setStep('details'), children: [_jsx(ChevronLeft, { className: "mr-2 h-4 w-4" }), " Back"] }), _jsx(Button, { className: `flex-1 h-14 bg-destructive hover:opacity-95`, onClick: handleNDR, children: "Submit NDR" })] })] }) }))] }));
}
