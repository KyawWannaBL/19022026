import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertCircle, Battery, ChevronRight, Filter, History, Layers, MapPin, Maximize2, Navigation, Package, Search, Signal, Target, Truck, X, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
const GOLD = '#D4AF37'; // luxury gold
const BRITIUM_BLUE_RING = 'focus-visible:ring-4 focus-visible:ring-[rgba(0,102,255,0.75)] focus-visible:ring-offset-2 focus-visible:ring-offset-background';
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function formatRelative(msAgo) {
    const s = Math.floor(msAgo / 1000);
    if (s < 10)
        return 'Just now';
    if (s < 60)
        return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60)
        return `${m} min${m > 1 ? 's' : ''} ago`;
    const h = Math.floor(m / 60);
    return `${h} hour${h > 1 ? 's' : ''} ago`;
}
/** Distance from point P to line segment AB in 2D (map units 0-100). */
function distancePointToSegment(px, py, ax, ay, bx, by) {
    const abx = bx - ax;
    const aby = by - ay;
    const apx = px - ax;
    const apy = py - ay;
    const abLen2 = abx * abx + aby * aby;
    if (abLen2 === 0)
        return Math.hypot(px - ax, py - ay);
    let t = (apx * abx + apy * aby) / abLen2;
    t = clamp(t, 0, 1);
    const cx = ax + t * abx;
    const cy = ay + t * aby;
    return Math.hypot(px - cx, py - cy);
}
const TrackingMapPage = () => {
    // Lightweight bilingual labels (you can later swap to your real i18n)
    const [lang, setLang] = useState('en');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRiderId, setSelectedRiderId] = useState(null);
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('risk');
    // ===== Initial mock fleet (replace with real telemetry stream later) =====
    const initialFleet = useMemo(() => {
        const now = Date.now();
        return [
            { id: 'R-1024', name: 'Aung Kyaw', status: 'active', battery: 85, signal: 4, lat: 40, lng: 30, lastUpdatedText: '2 mins ago', lastTelemetryAt: now - 2 * 60_000, currentShipment: 'BRT-99283', speed: 35, city: 'YGN' },
            { id: 'R-2051', name: 'Kyaw Zeya', status: 'active', battery: 42, signal: 5, lat: 60, lng: 70, lastUpdatedText: 'Just now', lastTelemetryAt: now - 5_000, currentShipment: 'BRT-88120', speed: 42, city: 'YGN' },
            { id: 'R-3092', name: 'Min Thu', status: 'idle', battery: 98, signal: 3, lat: 25, lng: 85, lastUpdatedText: '15 mins ago', lastTelemetryAt: now - 15 * 60_000, speed: 0, city: 'MDY' },
            { id: 'R-4011', name: 'Htet Lin', status: 'active', battery: 67, signal: 5, lat: 75, lng: 45, lastUpdatedText: '1 min ago', lastTelemetryAt: now - 60_000, currentShipment: 'BRT-77451', speed: 28, city: 'NPT' },
            { id: 'R-5520', name: 'Zarni', status: 'offline', battery: 12, signal: 0, lat: 10, lng: 10, lastUpdatedText: '2 hours ago', lastTelemetryAt: now - 2 * 60 * 60_000, speed: 0, city: 'YGN' },
        ];
    }, []);
    // Live-ish state (simulated)
    const [fleet, setFleet] = useState(initialFleet);
    // Route corridors (stable per rider): from initial point → destinationTownship point
    const plannedRoutes = useMemo(() => {
        const map = new Map();
        for (const r of initialFleet) {
            // simple deterministic-ish destinationTownships
            const bx = clamp((r.lat * 0.35 + (r.id.charCodeAt(2) % 40) + 20), 5, 95);
            const by = clamp((r.lng * 0.4 + (r.id.charCodeAt(3) % 35) + 15), 5, 95);
            map.set(r.id, { ax: r.lat, ay: r.lng, bx, by });
        }
        return map;
    }, [initialFleet]);
    // Breadcrumb history store
    const historyRef = useRef(new Map());
    // Keep breadcrumbs to last 5 minutes
    const pruneHistory = (points, now) => points.filter(p => now - p.ts <= 5 * 60_000);
    // Map init loading
    useEffect(() => {
        const timer = setTimeout(() => setIsMapLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);
    // Simulate telemetry (every 5s)
    useEffect(() => {
        const interval = setInterval(() => {
            setFleet(prev => {
                const now = Date.now();
                const next = prev.map(r => {
                    if (r.status !== 'active') {
                        // still update relative label
                        return { ...r, lastUpdatedText: formatRelative(now - r.lastTelemetryAt) };
                    }
                    const route = plannedRoutes.get(r.id);
                    // random walk biased toward route direction
                    const dx = route ? (route.bx - r.lat) * 0.02 : 0;
                    const dy = route ? (route.by - r.lng) * 0.02 : 0;
                    const jitterX = (Math.random() - 0.5) * 1.2;
                    const jitterY = (Math.random() - 0.5) * 1.2;
                    const newLat = clamp(r.lat + dx + jitterX, 2, 98);
                    const newLng = clamp(r.lng + dy + jitterY, 2, 98);
                    const newBattery = clamp(r.battery - (Math.random() * 0.6), 0, 100);
                    const newSignal = clamp(Math.round(r.signal + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)), 0, 5);
                    const newSpeed = clamp(Math.round(r.speed + (Math.random() - 0.5) * 8), 8, 55);
                    // push breadcrumb
                    const existing = historyRef.current.get(r.id) ?? [];
                    const pushed = pruneHistory([...existing, { x: newLat, y: newLng, ts: now }], now);
                    historyRef.current.set(r.id, pushed);
                    return {
                        ...r,
                        lat: newLat,
                        lng: newLng,
                        battery: newBattery,
                        signal: newSignal,
                        speed: newSpeed,
                        lastTelemetryAt: now,
                        lastUpdatedText: formatRelative(0),
                    };
                });
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [plannedRoutes]);
    const filteredFleet = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q)
            return fleet;
        return fleet.filter(r => r.name.toLowerCase().includes(q) ||
            r.id.toLowerCase().includes(q) ||
            (r.currentShipment && r.currentShipment.toLowerCase().includes(q)));
    }, [fleet, searchQuery]);
    const selectedRider = useMemo(() => fleet.find(r => r.id === selectedRiderId) ?? null, [fleet, selectedRiderId]);
    // ===== At-risk detection =====
    const atRiskAlerts = useMemo(() => {
        const now = Date.now();
        const alerts = [];
        for (const r of fleet) {
            // OFFLINE
            if (r.status === 'offline') {
                alerts.push({
                    type: 'OFFLINE',
                    riderId: r.id,
                    riderName: r.name,
                    severity: 'high',
                    messageEn: 'Rider is offline (no telemetry).',
                    messageMm: 'Rider သည် Offline ဖြစ်နေသည် (တည်နေရာအချက်အလက်မရပါ)။',
                });
            }
            // STALE telemetry
            const ageMs = now - r.lastTelemetryAt;
            if (r.status !== 'offline' && ageMs > 10 * 60_000) {
                alerts.push({
                    type: 'STALE_TELEMETRY',
                    riderId: r.id,
                    riderName: r.name,
                    severity: 'medium',
                    messageEn: `Telemetry stale (${Math.floor(ageMs / 60_000)} min).`,
                    messageMm: `တည်နေရာအချက်အလက်နောက်ကျနေသည် (${Math.floor(ageMs / 60_000)} မိနစ်)။`,
                });
            }
            // LOW battery
            if (r.battery <= 20) {
                alerts.push({
                    type: 'LOW_BATTERY',
                    riderId: r.id,
                    riderName: r.name,
                    severity: r.battery <= 10 ? 'high' : 'medium',
                    messageEn: `Low battery (${Math.round(r.battery)}%).`,
                    messageMm: `ဘက်ထရီအားနည်း (${Math.round(r.battery)}%)။`,
                });
            }
            // OFF route (for active riders only)
            if (r.status === 'active') {
                const route = plannedRoutes.get(r.id);
                if (route) {
                    const d = distancePointToSegment(r.lat, r.lng, route.ax, route.ay, route.bx, route.by);
                    if (d >= 8.5) {
                        alerts.push({
                            type: 'OFF_ROUTE',
                            riderId: r.id,
                            riderName: r.name,
                            severity: d >= 14 ? 'high' : 'medium',
                            messageEn: `Possible off-route (deviation ${d.toFixed(1)} units).`,
                            messageMm: `လမ်းကြောင်းလွဲနိုင်ခြေရှိ (လွဲသွားမှု ${d.toFixed(1)})။`,
                        });
                    }
                }
            }
        }
        // sort by severity
        const sevRank = { high: 0, medium: 1, low: 2 };
        alerts.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);
        return alerts;
    }, [fleet, plannedRoutes]);
    // ===== Breadcrumb polyline for each rider (last 5 minutes) =====
    const breadcrumbPolylines = useMemo(() => {
        const out = [];
        for (const r of fleet) {
            const pts = historyRef.current.get(r.id);
            if (!pts || pts.length < 2)
                continue;
            out.push({
                riderId: r.id,
                points: pts.map(p => `${p.x},${p.y}`).join(' '),
            });
        }
        return out;
    }, [fleet]);
    const mapTitle = lang === 'en' ? 'Fleet Surveillance' : 'ယာဉ်စုဖွဲ့မှု စောင့်ကြည့်ခြင်း';
    const riskTitle = lang === 'en' ? 'At-Risk Alerts' : 'အန္တရာယ်ရှိနိုင်ခြေ သတိပေးချက်များ';
    return (_jsxs("div", { className: "h-screen flex flex-col bg-navy-900", children: [_jsxs("div", { className: "flex-shrink-0 bg-navy-800/50 backdrop-blur-sm border-b border-gold-500/20 p-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: mapTitle }), _jsxs("div", { className: "hidden md:flex items-center gap-3 text-sm", children: [_jsxs(Badge, { variant: "outline", className: "border-success text-success", children: [fleet.filter(r => r.status !== 'offline').length, " Online"] }), _jsxs(Badge, { variant: "outline", className: "border-warning text-warning", children: [fleet.filter(r => r.status === 'idle').length, " Idle"] }), _jsxs(Badge, { variant: "outline", className: "border-destructive text-destructive", children: [fleet.filter(r => r.status === 'offline').length, " Offline"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "hidden md:block", children: _jsx(Input, { placeholder: lang === 'en' ? 'Search riders, shipments…' : 'Rider/Shipment ရှာရန်…', value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: `w-72 bg-navy-900/40 ${BRITIUM_BLUE_RING}` }) }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-navy-900/40", onClick: () => setLang(l => (l === 'en' ? 'mm' : 'en')), children: lang === 'en' ? 'EN/MM' : 'MM/EN' }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-navy-900/40", children: _jsx(Filter, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "outline", size: "sm", className: "bg-navy-900/40", children: _jsx(Maximize2, { className: "w-4 h-4" }) })] })] }), _jsx("div", { className: "mt-3 md:hidden", children: _jsx(Input, { placeholder: lang === 'en' ? 'Search riders, shipments…' : 'Rider/Shipment ရှာရန်…', value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: `w-full bg-navy-900/40 ${BRITIUM_BLUE_RING}` }) })] }), _jsxs("div", { className: "flex-1 min-h-0 flex overflow-hidden", children: [_jsx("div", { className: "relative flex-[7] min-w-0 border-r border-gold-500/15", children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900", children: isMapLoading ? (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mx-auto mb-4" }), _jsx("p", { className: "text-white", children: lang === 'en' ? 'Initializing Live Map…' : 'Live Map စတင်နေသည်…' })] }) })) : (_jsxs("div", { className: "relative w-full h-full overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-20", children: _jsxs("svg", { className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsx("pattern", { id: "grid", width: "50", height: "50", patternUnits: "userSpaceOnUse", children: _jsx("path", { d: "M 50 0 L 0 0 0 50", fill: "none", stroke: GOLD, strokeWidth: "0.5" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })] }) }), _jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 100 100", children: [Array.from(plannedRoutes.entries()).map(([id, r]) => (_jsx("line", { x1: r.ax, y1: r.ay, x2: r.bx, y2: r.by, stroke: GOLD, strokeOpacity: 0.12, strokeWidth: 0.6, strokeDasharray: "2 2" }, `route-${id}`))), breadcrumbPolylines.map(p => (_jsx("polyline", { points: p.points, fill: "none", stroke: GOLD, strokeOpacity: selectedRiderId === p.riderId ? 0.9 : 0.45, strokeWidth: selectedRiderId === p.riderId ? 0.9 : 0.6, strokeLinejoin: "round", strokeLinecap: "round" }, `crumb-${p.riderId}`)))] }), _jsx("div", { className: "absolute inset-0", children: fleet.map((rider) => (_jsx("div", { style: { left: `${rider.lat}%`, top: `${rider.lng}%` }, onClick: () => {
                                                setSelectedRiderId(rider.id);
                                                setActiveTab('details');
                                            }, className: "absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20", title: `${rider.name} (${rider.id})`, children: _jsxs("div", { className: "relative", children: [rider.status === 'active' && (_jsx("div", { className: "absolute inset-0 w-10 h-10 bg-gold-500/20 rounded-full animate-ping" })), _jsx("div", { className: `w-7 h-7 rounded-full border-2 flex items-center justify-center ${rider.status === 'active' ? 'bg-success border-white' :
                                                            rider.status === 'idle' ? 'bg-warning border-white' :
                                                                'bg-destructive border-white'}`, children: _jsx(Truck, { className: "w-3.5 h-3.5 text-white" }) }), (selectedRiderId === rider.id || rider.status === 'active') && (_jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-800/90 backdrop-blur-sm border border-gold-500/20 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: rider.name }), _jsx("span", { className: "opacity-60", children: "|" }), _jsxs("span", { children: [rider.speed, " km/h"] }), rider.currentShipment && (_jsxs(_Fragment, { children: [_jsx("span", { className: "opacity-60", children: "|" }), _jsx("span", { className: "text-gold-400", children: rider.currentShipment })] }))] }) }))] }) }, rider.id))) }), _jsxs("div", { className: "absolute top-4 left-4 space-y-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "bg-navy-800/50 backdrop-blur-sm border-gold-500/20 text-white", children: [_jsx(Layers, { className: "w-4 h-4 mr-2" }), lang === 'en' ? 'Layers' : 'အလွှာ'] }), _jsxs(Button, { variant: "outline", size: "sm", className: "bg-navy-800/50 backdrop-blur-sm border-gold-500/20 text-white", children: [_jsx(Target, { className: "w-4 h-4 mr-2" }), lang === 'en' ? 'Center' : 'အလယ်ပြန်'] })] })] })) }) }), _jsxs("div", { className: "flex-[3] min-w-[320px] max-w-[520px] bg-navy-800/25 backdrop-blur-sm flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-gold-500/15", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-white font-semibold flex items-center gap-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-gold-400" }), lang === 'en' ? 'Operational Context' : 'လုပ်ငန်းခွင် အခြေအနေ'] }), _jsx(Badge, { variant: "outline", className: "border-gold-500/30 text-gold-300", children: lang === 'en' ? 'LIVE' : 'တိုက်ရိုက်' })] }), _jsx("div", { className: "mt-3", children: _jsx(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "w-full", children: _jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-navy-900/40", children: [_jsx(TabsTrigger, { value: "risk", children: lang === 'en' ? 'At-Risk' : 'အန္တရာယ်' }), _jsx(TabsTrigger, { value: "riders", children: lang === 'en' ? 'Riders' : 'Rider' }), _jsx(TabsTrigger, { value: "details", children: lang === 'en' ? 'Details' : 'အသေးစိတ်' })] }) }) })] }), _jsxs(ScrollArea, { className: "flex-1 p-4", children: [activeTab === 'risk' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm text-white font-medium", children: riskTitle }), _jsx(Badge, { variant: "outline", className: "border-destructive/30 text-destructive", children: atRiskAlerts.length })] }), atRiskAlerts.length === 0 ? (_jsx("div", { className: "p-4 rounded-xl border border-gold-500/15 bg-navy-900/30 text-sm text-muted-foreground", children: lang === 'en' ? 'No alerts. Fleet looks healthy.' : 'သတိပေးချက်မရှိပါ။ ယာဉ်စုအခြေအနေကောင်းပါသည်။' })) : (atRiskAlerts.map((a, idx) => (_jsx("button", { onClick: () => {
                                                    setSelectedRiderId(a.riderId);
                                                    setActiveTab('details');
                                                }, className: "w-full text-left p-3 rounded-xl border border-gold-500/15 hover:border-gold-500/35 bg-navy-900/35 transition-colors", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-white font-medium text-sm", children: a.riderName }), _jsx("div", { className: "text-xs text-muted-foreground mt-1", children: lang === 'en' ? a.messageEn : a.messageMm })] }), _jsx(Badge, { variant: "outline", className: a.severity === 'high'
                                                                ? 'border-destructive/40 text-destructive'
                                                                : a.severity === 'medium'
                                                                    ? 'border-warning/40 text-warning'
                                                                    : 'border-primary/40 text-primary', children: a.severity.toUpperCase() })] }) }, `${a.riderId}-${a.type}-${idx}`))))] })), activeTab === 'riders' && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: lang === 'en' ? 'Search riders…' : 'Rider ရှာရန်…', className: `pl-9 bg-navy-900/40 ${BRITIUM_BLUE_RING}`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "space-y-3", children: filteredFleet.map((rider) => (_jsxs("button", { onClick: () => {
                                                        setSelectedRiderId(rider.id);
                                                        setActiveTab('details');
                                                    }, className: `w-full text-left p-3 rounded-xl border transition-all ${selectedRiderId === rider.id
                                                        ? 'border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/10'
                                                        : 'border-border/40 hover:border-gold-400/40 hover:bg-muted/20'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${rider.status === 'active' ? 'bg-success animate-pulse' :
                                                                                rider.status === 'idle' ? 'bg-warning' : 'bg-destructive'}` }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: rider.name }), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["ID: ", rider.id] })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-white/80", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Battery, { className: "w-3 h-3" }), _jsxs("span", { children: [Math.round(rider.battery), "%"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Signal, { className: "w-3 h-3" }), _jsxs("span", { children: [rider.signal, "/5"] })] })] })] }), rider.currentShipment && (_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Package, { className: "w-3 h-3 text-gold-400" }), _jsx("span", { className: "text-gold-400", children: rider.currentShipment })] }), _jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [_jsx(Activity, { className: "w-3 h-3" }), _jsxs("span", { children: [rider.speed, " km/h"] })] })] })), _jsx("div", { className: "text-xs text-muted-foreground mt-2", children: rider.lastUpdatedText })] }, rider.id))) })] })), activeTab === 'details' && (_jsx("div", { className: "space-y-4", children: !selectedRider ? (_jsx("div", { className: "p-4 rounded-xl border border-gold-500/15 bg-navy-900/30 text-sm text-muted-foreground", children: lang === 'en' ? 'Select a rider from alerts or list.' : 'သတိပေးချက်/စာရင်းမှ Rider ကိုရွေးပါ။' })) : (_jsxs(Card, { className: "border-gold-500/20 bg-navy-900/35", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gold-400" }), selectedRider.name] }), _jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [selectedRider.id, " \u2022 ", selectedRider.city ?? '—'] })] }), _jsx("button", { className: "text-white/60 hover:text-white", onClick: () => setSelectedRiderId(null), "aria-label": "Clear selection", children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 rounded-xl border border-gold-500/10 bg-navy-800/30", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: lang === 'en' ? 'Battery' : 'ဘက်ထရီ' }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Battery, { className: "w-4 h-4 text-white/80" }), _jsxs("div", { className: "text-white font-semibold", children: [Math.round(selectedRider.battery), "%"] })] })] }), _jsxs("div", { className: "p-3 rounded-xl border border-gold-500/10 bg-navy-800/30", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: lang === 'en' ? 'Signal' : 'လိုင်း' }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Signal, { className: "w-4 h-4 text-white/80" }), _jsxs("div", { className: "text-white font-semibold", children: [selectedRider.signal, "/5"] })] })] }), _jsxs("div", { className: "p-3 rounded-xl border border-gold-500/10 bg-navy-800/30", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: lang === 'en' ? 'Speed' : 'မြန်နှုန်း' }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Navigation, { className: "w-4 h-4 text-white/80" }), _jsxs("div", { className: "text-white font-semibold", children: [selectedRider.speed, " km/h"] })] })] }), _jsxs("div", { className: "p-3 rounded-xl border border-gold-500/10 bg-navy-800/30", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: lang === 'en' ? 'Updated' : 'အသစ်ပြောင်း' }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(History, { className: "w-4 h-4 text-white/80" }), _jsx("div", { className: "text-white font-semibold", children: selectedRider.lastUpdatedText })] })] })] }), selectedRider.currentShipment ? (_jsxs("div", { className: "p-3 rounded-xl border border-gold-500/15 bg-gold-500/5", children: [_jsx("div", { className: "text-xs text-muted-foreground", children: lang === 'en' ? 'Active Shipment' : 'လုပ်ဆောင်နေသော ပို့ဆောင်မှု' }), _jsx("div", { className: "text-white font-semibold mt-1", children: selectedRider.currentShipment }), _jsxs("div", { className: "mt-3 flex gap-2", children: [_jsxs(Button, { size: "sm", className: "bg-gold-500/20 hover:bg-gold-500/30 text-white border border-gold-500/30", children: [lang === 'en' ? 'Investigate' : 'စုံစမ်းရန်', _jsx(ChevronRight, { className: "w-4 h-4 ml-1" })] }), _jsx(Button, { size: "sm", variant: "outline", className: "bg-navy-900/40 border-gold-500/20 text-white", children: lang === 'en' ? 'Call' : 'ဖုန်းခေါ်' })] })] })) : (_jsx("div", { className: "p-3 rounded-xl border border-gold-500/10 bg-navy-800/20 text-sm text-muted-foreground", children: lang === 'en' ? 'No active shipment assigned.' : 'လက်ရှိတာဝန်မရှိပါ။' }))] })] })) }))] }), _jsx("div", { className: "p-4 border-t border-gold-500/15 text-xs text-muted-foreground", children: lang === 'en'
                                    ? 'Telemetry breadcrumbs show the last 5 minutes of movement.'
                                    : 'Breadcrumb မျဉ်းများမှာ လွန်ခဲ့သော ၅ မိနစ်အတွင်း သွားလာမှုကို ပြသပါသည်။' })] })] })] }));
};
export default TrackingMapPage;
