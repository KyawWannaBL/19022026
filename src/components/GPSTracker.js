import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Signal, Battery, CheckCircle2, Clock, Compass, Layers, Maximize2, ShieldAlert, Activity, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { cn } from '@/lib/utils';
export function GPSTracker({ vehicleId = 'VEH-2026-X9', onLocationUpdate, className }) {
    const { language } = useLanguage();
    const { toast } = useToast();
    const [location, setLocation] = useState(null);
    const [history, setHistory] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [signalStrength, setSignalStrength] = useState(94);
    const [batteryLevel, setBatteryLevel] = useState(88);
    const [isGeofenceViolated, setIsGeofenceViolated] = useState(false);
    const [routeProgress, setRouteProgress] = useState(32);
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const watchId = useRef(null);
    // Mock geofence center (e.g., Central Distribution Hub)
    const GEOFENCE_CENTER = { lat: 16.8661, lng: 96.1951 }; // Yangon coords
    const GEOFENCE_RADIUS = 10000; // 10km in meters
    const dict = {
        en: {
            liveTracking: "Live Tracking",
            idle: "Idle",
            geofenceBreach: "Geofence Breach",
            activateSensor: "Activate Tracking",
            terminateTrack: "Terminate Track",
            telemetry: "Device Telemetry",
            signal: "Signal",
            battery: "Battery",
            speed: "Speed",
            activityLog: "Activity Log",
            waitingSignal: "Waiting for Signal...",
            compliance: "Operational Compliance",
            status: "Status",
            breachDesc: "Vehicle has exited the designated operation zone."
        },
        mm: {
            liveTracking: "တိုက်ရိုက်ခြေရာခံခြင်း",
            idle: "ရပ်နားထားသည်",
            geofenceBreach: "သတ်မှတ်နယ်မြေကျော်လွန်မှု",
            activateSensor: "ခြေရာခံခြင်း စတင်မည်",
            terminateTrack: "ခြေရာခံခြင်း ရပ်ဆိုင်းမည်",
            telemetry: "စက်ပစ္စည်း အခြေအနေ",
            signal: "လှိုင်းအချက်ပြ",
            battery: "ဘက်ထရီ",
            speed: "အမြန်နှုန်း",
            activityLog: "လုပ်ဆောင်မှု မှတ်တမ်း",
            waitingSignal: "အချက်ပြလှိုင်း စောင့်ဆိုင်းနေသည်...",
            compliance: "လုပ်ငန်းဆောင်ရွက်မှု စည်းကမ်းလိုက်နာမှု",
            status: "အခြေအနေ",
            breachDesc: "ယာဉ်သည် သတ်မှတ်ထားသော နယ်မြေပြင်ပသို့ ရောက်ရှိနေပါသည်။"
        }
    };
    const t = language === 'my' ? dict.mm : dict.en;
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3;
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    const handleNewLocation = useCallback(async (position) => {
        const newData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            speed: position.coords.speed,
            heading: position.coords.heading,
            timestamp: new Date().toISOString(),
        };
        setLocation(newData);
        setHistory((prev) => [...prev.slice(-24), newData]);
        setLastUpdateTime(new Date());
        // Geofence Check
        const distance = calculateDistance(newData.lat, newData.lng, GEOFENCE_CENTER.lat, GEOFENCE_CENTER.lng);
        if (distance > GEOFENCE_RADIUS && !isGeofenceViolated) {
            setIsGeofenceViolated(true);
            toast({
                title: t.geofenceBreach,
                description: t.breachDesc,
                variant: "destructive",
            });
        }
        else if (distance <= GEOFENCE_RADIUS && isGeofenceViolated) {
            setIsGeofenceViolated(false);
        }
        // Update Backend
        try {
            await logisticsAPI.updateVehicleTracking({
                vehicle_id: vehicleId,
                latitude: newData.lat,
                longitude: newData.lng,
                speed: newData.speed || 0,
                heading: newData.heading || 0,
                accuracy: newData.accuracy,
                battery_level: batteryLevel,
                engine_status: 'RUNNING'
            });
        }
        catch (err) {
            console.error('Failed to sync tracking data', err);
        }
        if (onLocationUpdate)
            onLocationUpdate(newData);
        // Telemetry Simulation
        setSignalStrength(Math.floor(80 + Math.random() * 20));
        setBatteryLevel((prev) => Math.max(5, prev - 0.005));
    }, [vehicleId, isGeofenceViolated, onLocationUpdate, toast, t, batteryLevel]);
    const startTracking = () => {
        if (!navigator.geolocation) {
            toast({
                title: "GPS Restricted",
                description: "Hardware access denied or unsupported.",
                variant: "destructive",
            });
            return;
        }
        setIsTracking(true);
        watchId.current = navigator.geolocation.watchPosition(handleNewLocation, (error) => {
            toast({
                title: "Signal Lost",
                description: error.message,
                variant: "destructive",
            });
            setIsTracking(false);
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
    };
    const stopTracking = () => {
        if (watchId.current !== null) {
            navigator.geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        setIsTracking(false);
    };
    useEffect(() => {
        return () => {
            if (watchId.current !== null)
                navigator.geolocation.clearWatch(watchId.current);
        };
    }, []);
    return (_jsx("div", { className: cn("space-y-6", className), children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "lg:col-span-3 luxury-card overflow-hidden relative min-h-[500px] border-primary/20", children: [_jsx("div", { className: "absolute inset-0 bg-luxury-obsidian/40 backdrop-blur-[2px] z-0", children: _jsx("div", { className: "absolute inset-0 opacity-10", style: {
                                    backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px'
                                } }) }), _jsxs("div", { className: "absolute top-6 left-6 z-10 flex flex-col gap-3", children: [_jsxs(Badge, { variant: isTracking ? "default" : "secondary", className: "luxury-glass border-primary/30 py-1.5 px-4 font-bold tracking-widest text-[10px]", children: [_jsx(Signal, { className: cn("w-3 h-3 mr-2", isTracking && "animate-pulse text-green-400") }), isTracking ? t.liveTracking.toUpperCase() : t.idle.toUpperCase()] }), _jsx(AnimatePresence, { children: isGeofenceViolated && (_jsxs(motion.div, { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -20, opacity: 0 }, className: "flex items-center gap-2 bg-destructive/20 border border-destructive/50 text-destructive-foreground px-4 py-1.5 rounded-full text-[10px] font-black tracking-wider", children: [_jsx(ShieldAlert, { className: "w-4 h-4" }), t.geofenceBreach.toUpperCase()] })) })] }), _jsxs("div", { className: "absolute top-6 right-6 z-10 flex gap-3", children: [_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { size: "icon", variant: "outline", className: "luxury-glass rounded-xl border-white/10 hover:border-primary/50 transition-colors", children: _jsx(Maximize2, { className: "w-4 h-4" }) }) }), _jsx(TooltipContent, { children: "Fullscreen View" })] }) }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { size: "icon", variant: "outline", className: "luxury-glass rounded-xl border-white/10 hover:border-primary/50 transition-colors", children: _jsx(Layers, { className: "w-4 h-4" }) }) }), _jsx(TooltipContent, { children: "Satellite Layers" })] }) })] }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: _jsx(AnimatePresence, { mode: "wait", children: location ? (_jsxs(motion.div, { initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "relative", children: [_jsx("div", { className: "absolute -inset-12 bg-primary/10 rounded-full blur-2xl animate-pulse" }), _jsx("div", { className: "absolute -inset-4 border border-primary/30 rounded-full animate-ping opacity-20" }), _jsx("div", { className: "relative p-5 bg-primary rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] border-4 border-luxury-obsidian", children: _jsx(Navigation, { className: "w-8 h-8 text-luxury-obsidian transition-transform duration-700 ease-out", style: { transform: `rotate(${(location.heading || 0) - 45}deg)` } }) }), _jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "absolute top-full left-1/2 -translate-x-1/2 mt-6 luxury-glass px-4 py-2 rounded-xl text-[11px] font-mono whitespace-nowrap border-primary/30", children: [_jsx("span", { className: "text-primary font-bold", children: "LAT:" }), " ", location.lat.toFixed(5), " ", _jsx("span", { className: "mx-2 opacity-30", children: "|" }), " ", _jsx("span", { className: "text-primary font-bold", children: "LNG:" }), " ", location.lng.toFixed(5)] })] }, "active-marker")) : (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-muted-foreground flex flex-col items-center gap-6", children: [_jsx("div", { className: "p-8 rounded-full bg-white/5 border border-white/10", children: _jsx(Compass, { className: "w-16 h-16 opacity-10 animate-spin-slow" }) }), _jsx("p", { className: "text-xs font-bold tracking-[0.3em] uppercase opacity-40", children: t.waitingSignal })] }, "empty-state")) }) }), _jsxs("div", { className: "absolute bottom-8 left-8 right-8 z-10 flex justify-between items-end bg-luxury-obsidian/60 backdrop-blur-md p-6 rounded-2xl border border-white/10", children: [_jsxs("div", { className: "flex flex-col gap-3 flex-1 max-w-xs", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-[10px] font-black text-primary uppercase tracking-widest", children: "Progress" }), _jsxs("span", { className: "text-[10px] font-mono", children: [routeProgress, "%"] })] }), _jsx(Progress, { value: routeProgress, className: "h-1.5 bg-white/5" })] }), _jsx("div", { className: "flex gap-4", children: !isTracking ? (_jsx(Button, { onClick: startTracking, className: "luxury-button h-12 px-8 rounded-xl", children: t.activateSensor })) : (_jsx(Button, { onClick: stopTracking, variant: "destructive", className: "h-12 px-8 rounded-xl font-bold tracking-widest text-[10px] uppercase", children: t.terminateTrack })) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card p-6 border-white/5", children: [_jsxs("h3", { className: "text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-6 flex items-center gap-2", children: [_jsx(Activity, { className: "w-3 h-3" }), " ", t.telemetry] }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider", children: "ID" }), _jsx("span", { className: "text-xs font-mono font-bold", children: vehicleId })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider", children: t.signal }), _jsxs("span", { className: "text-xs font-mono font-bold flex items-center gap-2", children: [signalStrength, "%", _jsx("div", { className: "flex gap-0.5 items-end h-3", children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: cn("w-1 rounded-full", i * 25 <= signalStrength ? "bg-green-500" : "bg-white/10"), style: { height: `${i * 25}%` } }, i))) })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider", children: t.battery }), _jsxs("span", { className: "text-xs font-mono font-bold flex items-center gap-2", children: [batteryLevel.toFixed(1), "%", _jsx(Battery, { className: cn("w-4 h-4", batteryLevel < 20 ? "text-destructive" : "text-primary") })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-wider", children: t.speed }), _jsx("span", { className: "text-xs font-mono font-bold", children: location?.speed ? `${(location.speed * 3.6).toFixed(1)} km/h` : '0.0 km/h' })] })] })] }), _jsxs(Card, { className: "luxury-card p-6 border-white/5 flex flex-col min-h-[250px]", children: [_jsxs("h3", { className: "text-[10px] font-black text-primary tracking-[0.3em] uppercase mb-6 flex items-center gap-2", children: [_jsx(Clock, { className: "w-3 h-3" }), " ", t.activityLog] }), _jsx("div", { className: "flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar", children: history.length > 0 ? history.slice().reverse().map((point, idx) => (_jsxs("div", { className: "relative pl-6 pb-4 last:pb-0 border-l border-white/10", children: [_jsx("div", { className: "absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-primary/40 ring-4 ring-primary/10" }), _jsx("p", { className: "text-[9px] text-muted-foreground font-mono uppercase", children: new Date(point.timestamp).toLocaleTimeString() }), _jsxs("p", { className: "text-[10px] font-mono tracking-tight opacity-70", children: [point.lat.toFixed(4), ", ", point.lng.toFixed(4)] })] }, idx))) : (_jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-3 opacity-20", children: [_jsx(Zap, { className: "w-8 h-8" }), _jsx("p", { className: "text-[10px] text-center font-bold uppercase tracking-widest", children: "Empty Log" })] })) })] }), _jsxs("div", { className: "bg-primary/10 border border-primary/20 p-6 rounded-[2rem] flex items-center gap-4", children: [_jsx("div", { className: "p-3 bg-primary rounded-2xl shadow-lg", children: _jsx(CheckCircle2, { className: "w-6 h-6 text-luxury-obsidian" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[9px] text-primary/70 font-black uppercase tracking-[0.2em]", children: t.status }), _jsx("p", { className: "text-[11px] font-bold tracking-tight", children: t.compliance })] })] })] })] }) }));
}
