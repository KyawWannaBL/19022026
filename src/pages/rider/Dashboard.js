import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { mockShipments } from '@/data/mockData';
import { shipments } from '@/data/mockData';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const GOLD = 'text-[rgba(212,175,55,0.95)]';
const BRITIUM_BIG_PRIMARY = 'w-full h-14 text-lg font-semibold shadow-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 hover:opacity-95';
/**
 * Custom hook for real-time GPS tracking
 */
function useLiveGps() {
    const [gps, setGps] = useState(null);
    useEffect(() => {
        if (!('geolocation' in navigator))
            return;
        const w = navigator.geolocation.watchPosition((pos) => setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracyM: pos.coords.accuracy }), () => setGps(null), { enableHighAccuracy: true, maximumAge: 5000, timeout: 12000 });
        return () => navigator.geolocation.clearWatch(w);
    }, []);
    return gps;
}
/**
 * OpenStreetMap Embed Component
 */
function OSMMap({ gps }) {
    const fallback = { lat: 16.8409, lng: 96.1735 }; // Yangon center
    const p = gps ?? { ...fallback, accuracyM: 0 };
    const delta = 0.02;
    const left = p.lng - delta;
    const right = p.lng + delta;
    const top = p.lat + delta;
    const bottom = p.lat - delta;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(`${left},${bottom},${right},${top}`)}&layer=mapnik&marker=${encodeURIComponent(`${p.lat},${p.lng}`)}`;
    return (_jsxs("div", { className: "h-full w-full relative", children: [_jsx("iframe", { title: "map", className: "h-full w-full border-0", src: src }), _jsx("div", { className: "absolute top-3 left-3", children: _jsxs(Badge, { className: "bg-black/60 text-white border border-white/10 backdrop-blur", children: [_jsx(MapPin, { className: "w-3 h-3 mr-1" }), p.lat.toFixed(5), ", ", p.lng.toFixed(5), " ", gps ? `(±${Math.round(p.accuracyM)}m)` : '(demo)'] }) })] }));
}
/**
 * Top KPI Strip for Rider performance
 */
function LuxuryKpiStrip(props) {
    return (_jsx("div", { className: "w-full rounded-xl border bg-black/60 backdrop-blur px-4 py-3", children: _jsxs("div", { className: "flex items-center justify-between gap-3 text-white", children: [_jsxs("div", { className: "text-sm", children: [_jsx("div", { className: `${GOLD} font-semibold`, children: "Remaining Parcels" }), _jsx("div", { className: "text-lg font-bold", children: props.remaining })] }), _jsxs("div", { className: "text-sm text-center", children: [_jsx("div", { className: `${GOLD} font-semibold`, children: "ETD to Next" }), _jsx("div", { className: "text-lg font-bold", children: props.etdText })] }), _jsxs("div", { className: "text-sm text-right", children: [_jsx("div", { className: `${GOLD} font-semibold`, children: "Shift Success" }), _jsxs("div", { className: "text-lg font-bold", children: [Math.round(props.successRatePct), "%"] })] })] }) }));
}
function guessStatusKind(status) {
    const s = String(status ?? '').toLowerCase();
    if (s.includes('deliver'))
        return 'delivered';
    if (s.includes('return') || s.includes('reject') || s.includes('fail'))
        return 'reject';
    return 'other';
}
/**
 * The internal Rider view with Navigation & List modes
 */
function RiderDashboard() {
    const navigate = useNavigate();
    const gps = useLiveGps();
    const [activeId, setActiveId] = useState(null);
    const stats = useMemo(() => {
        const all = mockShipments || [];
        const all = shipments || [];
        let delivered = 0, failed = 0, remaining = 0;
        all.forEach((sh) => {
            const k = guessStatusKind(sh.status);
            if (k === 'delivered')
                delivered++;
            else if (k === 'reject')
                failed++;
            else
                remaining++;
        });
        const active = activeId ? all.find((s) => String(s.id ?? s.trackingNumber) === activeId) : null;
        return { remaining, delivered, failed, activeShipment: active };
    }, [activeId]);
    const successRatePct = useMemo(() => {
        const totalDone = stats.delivered + stats.failed;
        return totalDone === 0 ? 100 : (stats.delivered / totalDone) * 100;
    }, [stats.delivered, stats.failed]);
    const etdText = `${Math.min(45, Math.max(5, stats.remaining * 6))} min`;
    return (_jsxs("div", { className: "h-[100dvh] w-full flex flex-col gap-3 p-3 bg-slate-50", children: [_jsx(LuxuryKpiStrip, { remaining: stats.remaining, etdText: etdText, successRatePct: successRatePct }), stats.activeShipment ? (_jsxs("div", { className: "flex-1 min-h-0 flex flex-col gap-3", children: [_jsx("div", { className: "flex-[7] min-h-0 rounded-xl overflow-hidden border shadow-sm", children: _jsx(OSMMap, { gps: gps }) }), _jsx(Card, { className: "flex-[3] min-h-0 border shadow-sm overflow-hidden", children: _jsxs(CardContent, { className: "p-4 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "text-sm font-mono font-bold text-emerald-600", children: stats.activeShipment.trackingNumber }), _jsx(Badge, { variant: "outline", children: "Navigating" })] }), _jsxs("div", { children: [_jsx("div", { className: `${GOLD} text-xs font-semibold`, children: "Receiver" }), _jsx("div", { className: "font-bold text-lg leading-tight", children: stats.activeShipment.receiverName }), _jsx("div", { className: "text-xs text-muted-foreground", children: stats.activeShipment.receiverAddress })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { className: BRITIUM_BIG_PRIMARY, onClick: () => navigate('/delivery-flow'), children: "Start Delivery" }), _jsx(Button, { variant: "outline", className: "h-14 px-6", onClick: () => setActiveId(null), children: "Exit" })] })] }) })] })) : (_jsxs("div", { className: "flex-1 overflow-y-auto rounded-xl border bg-white p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Delivery Queue" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/shipments/new'), children: "+ New" })] }), _jsx("div", { className: "space-y-3", children: mockShipments.map((s) => {
                            {
                                shipments.map((s) => {
                                    const id = String(s.id ?? s.trackingNumber);
                                    return (_jsx(Card, { className: "border-slate-100", children: _jsxs(CardContent, { className: "p-4 flex flex-col gap-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-xs font-mono font-bold", children: s.trackingNumber }), _jsx(Badge, { variant: "secondary", children: s.status })] }), _jsxs("div", { children: [_jsx("div", { className: `${GOLD} text-xs font-semibold`, children: "Customer" }), _jsx("div", { className: "font-medium", children: s.receiverName })] }), _jsx(Button, { className: "w-full", onClick: () => setActiveId(id), children: "Enter Navigation Mode" })] }) }, id));
                                });
                            }
                        }) })] }))] }));
}
/**
 * Main Export with Role Protection
 */
export default function Dashboard() {
    const { user, legacyUser } = useAuth();
    const role = legacyUser?.role ?? user?.role ?? '';
    const isRider = String(role).toUpperCase().includes('RIDER');
    // If rider, show dashboard. If not, show fallback (instead of missing EnhancedDashboard).
    if (isRider)
        return _jsx(RiderDashboard, {});
    return (_jsx("div", { className: "flex h-screen items-center justify-center p-6 bg-slate-50 text-center", children: _jsx(Card, { className: "max-w-md", children: _jsxs(CardContent, { className: "pt-10 pb-10", children: [_jsx(ShieldCheck, { className: "mx-auto h-16 w-16 text-amber-500 mb-4" }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: "Unauthorized Access" }), _jsxs("p", { className: "text-muted-foreground", children: ["This panel is reserved for Riders. Your current role is: ", _jsx("strong", { children: String(role) })] })] }) }) }));
}
