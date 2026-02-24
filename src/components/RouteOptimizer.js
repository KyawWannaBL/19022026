import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, RotateCcw, CheckCircle2, Truck, Timer, Route, Layers, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
export function RouteOptimizer({ deliveries, onRouteOptimized, className }) {
    const { language } = useLanguage();
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [optimizedRoute, setOptimizedRoute] = useState(null);
    const [metrics, setMetrics] = useState({
        totalDistance: 0,
        estimatedTime: 0,
        stops: 0
    });
    const t = {
        en: {
            title: "Route Optimizer",
            description: "AI-powered sequencing for efficient delivery paths",
            optimize: "Optimize Route",
            optimizing: "Calculating Best Path...",
            reset: "Reset Sequence",
            metrics: "Route Metrics",
            distance: "Total Distance",
            duration: "Est. Duration",
            stops: "Delivery Stops",
            sequence: "Delivery Sequence",
            priority: "Priority",
            standard: "Standard",
            startPoint: "Origin Branch",
            endPoint: "Final Destination"
        },
        my: {
            title: "လမ်းကြောင်းစီစဉ်ခြင်း",
            description: "အမြန်ဆန်ဆုံးပို့ဆောင်ရန် AI ဖြင့် တွက်ချက်ခြင်း",
            optimize: "လမ်းကြောင်းရှာမည်",
            optimizing: "လမ်းကြောင်းတွက်ချက်နေသည်...",
            reset: "ပြန်စမည်",
            metrics: "လမ်းကြောင်းဆိုင်ရာ အချက်အလက်",
            distance: "စုစုပေါင်းအကွာအဝေး",
            duration: "ခန့်မှန်းကြာချိန်",
            stops: "ပို့ဆောင်ရမည့်နေရာ",
            sequence: "ပို့ဆောင်မည့် အစီအစဉ်",
            priority: "အရေးကြီး",
            standard: "သာမန်",
            startPoint: "စတင်သည့်နေရာ",
            endPoint: "နောက်ဆုံးနေရာ"
        }
    };
    const dict = language === 'my' ? t.my : t.en;
    const handleOptimize = async () => {
        if (deliveries.length === 0)
            return;
        setIsOptimizing(true);
        setProgress(0);
        // Simulate AI Optimization logic
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
        // Mock algorithm: Sort by Priority (Express first) then by ID (simulating proximity)
        setTimeout(() => {
            const sorted = [...deliveries].sort((a, b) => {
                const aPri = a.service_type === 'EXPRESS' ? 0 : 1;
                const bPri = b.service_type === 'EXPRESS' ? 0 : 1;
                return aPri - bPri;
            });
            setOptimizedRoute(sorted);
            setMetrics({
                totalDistance: Math.floor(deliveries.length * 4.2 * 10) / 10,
                estimatedTime: deliveries.length * 15,
                stops: deliveries.length
            });
            setIsOptimizing(false);
            if (onRouteOptimized) {
                onRouteOptimized({
                    route: sorted,
                    metrics: {
                        distance: deliveries.length * 4.2,
                        duration: deliveries.length * 15
                    }
                });
            }
        }, 2500);
    };
    const handleReset = () => {
        setOptimizedRoute(null);
        setProgress(0);
        setMetrics({ totalDistance: 0, estimatedTime: 0, stops: 0 });
    };
    return (_jsxs(Card, { className: cn("luxury-card overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl", className), children: [_jsx(CardHeader, { className: "border-b border-border/10 pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs(CardTitle, { className: "text-xl font-bold tracking-tight text-foreground flex items-center gap-2", children: [_jsx(Navigation, { className: "h-5 w-5 text-primary" }), dict.title] }), _jsx(CardDescription, { className: "text-muted-foreground/80", children: dict.description })] }), _jsxs(Badge, { variant: "outline", className: "border-primary/20 text-primary bg-primary/5", children: [deliveries.length, " ", dict.stops] })] }) }), _jsx(CardContent, { className: "p-6", children: !optimizedRoute && !isOptimizing ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" }), _jsx(Route, { className: "h-16 w-16 text-primary relative z-10" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Ready to Plan" }), _jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: ["Analyze ", deliveries.length, " delivery points to find the most efficient route."] })] }), _jsx(Button, { onClick: handleOptimize, disabled: deliveries.length === 0, className: "luxury-button", children: dict.optimize })] })) : isOptimizing ? (_jsxs("div", { className: "space-y-8 py-8", children: [_jsxs("div", { className: "flex flex-col items-center justify-center space-y-4", children: [_jsxs("div", { className: "relative h-20 w-20", children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, className: "absolute inset-0 border-t-2 border-primary rounded-full" }), _jsx(Truck, { className: "absolute inset-0 m-auto h-8 w-8 text-primary animate-bounce" })] }), _jsx("p", { className: "text-sm font-medium animate-pulse", children: dict.optimizing })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [_jsx("span", { children: "Processing Nodes" }), _jsxs("span", { children: [progress, "%"] })] }), _jsx(Progress, { value: progress, className: "h-1 bg-muted" })] })] })) : (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Route, { className: "h-3 w-3" }), dict.distance] }), _jsxs("p", { className: "text-lg font-bold", children: [metrics.totalDistance, " ", _jsx("span", { className: "text-xs font-normal", children: "km" })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Timer, { className: "h-3 w-3" }), dict.duration] }), _jsxs("p", { className: "text-lg font-bold", children: [metrics.estimatedTime, " ", _jsx("span", { className: "text-xs font-normal", children: "min" })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [_jsx(Layers, { className: "h-3 w-3" }), dict.stops] }), _jsx("p", { className: "text-lg font-bold", children: metrics.stops })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: dict.sequence }), _jsx(ScrollArea, { className: "h-[300px] pr-4", children: _jsx("div", { className: "space-y-4", children: optimizedRoute?.map((item, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "relative flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary", children: index + 1 }), index !== optimizedRoute.length - 1 && (_jsx("div", { className: "w-px h-12 bg-gradient-to-b from-primary/30 to-transparent" }))] }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "font-medium text-sm", children: item.receiver_name || "Recipient" }), _jsx(Badge, { variant: item.service_type === 'EXPRESS' ? "destructive" : "secondary", className: "text-[10px] h-4", children: item.service_type || "STANDARD" })] }), _jsxs("p", { className: "text-xs text-muted-foreground line-clamp-1 flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), item.receiver_address] }), _jsxs("div", { className: "flex items-center gap-3 pt-2", children: [_jsxs("div", { className: "text-[10px] bg-muted px-2 py-0.5 rounded border border-border/50", children: ["AWB: ", item.awb_number] }), _jsxs("div", { className: "text-[10px] text-primary font-medium flex items-center gap-1", children: [_jsx(Timer, { className: "h-2.5 w-2.5" }), "ETA: +", (index + 1) * 12, "m"] })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" })] }, item.id))) }) })] }), _jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/10", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 h-10 border-border/50 hover:bg-muted", onClick: handleReset, children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), dict.reset] }), _jsxs(Button, { size: "sm", className: "flex-1 h-10 bg-primary text-primary-foreground hover:bg-primary/90", children: [_jsx(CheckCircle2, { className: "h-4 w-4 mr-2" }), "Apply Route"] })] })] })) })] }));
}
