import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Navigation, Phone, MapPin, CheckCircle, Clock, Scan, Check, TrendingUp, DollarSign, Star, Activity } from 'lucide-react';
import { SHIPMENT_STATUS, formatCurrency } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRScanner } from '@/components/QRScanner';
import { SignaturePad } from '@/components/SignaturePad';
import { PhotoCapture } from '@/components/PhotoCapture';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { springPresets, staggerContainer, staggerItem } from '@/lib/motion';
const MOCK_DELIVERIES = [
    {
        id: '1',
        awb: 'BRT-2026-991024',
        customerName: 'Htet Myat Soe',
        address: 'No. 12, Pyay Road, Mayangone Township, Yangon',
        phone: '+95 9 123 456 789',
        codAmount: 45000,
        status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
        priority: 'High',
        estimatedTime: '10:30 AM',
    },
    {
        id: '2',
        awb: 'BRT-2026-882193',
        customerName: 'Zin Mar Aung',
        address: 'Suite 405, Sakura Tower, Bogyoke Aung San Rd, Yangon',
        phone: '+95 9 987 654 321',
        codAmount: 0,
        status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
        priority: 'Medium',
        estimatedTime: '11:15 AM',
    },
    {
        id: '3',
        awb: 'BRT-2026-773412',
        customerName: 'Khin Maung Aye',
        address: 'House 56, Inya Road, Bahan Township, Yangon',
        phone: '+95 9 555 123 444',
        codAmount: 125000,
        status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
        priority: 'High',
        estimatedTime: '12:00 PM',
    },
];
export default function RiderDashboard() {
    const { language } = useLanguage();
    const [activeTask, setActiveTask] = useState(MOCK_DELIVERIES[0]);
    const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);
    const [isOnline, setIsOnline] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [podStep, setPodStep] = useState('none');
    const [signatureData, setSignatureData] = useState(null);
    const [photoData, setPhotoData] = useState(null);
    const completedCount = 12;
    const totalTasks = 15;
    const progress = (completedCount / totalTasks) * 100;
    const handleCompleteDelivery = () => {
        if (activeTask) {
            setDeliveries(prev => prev.filter(t => t.id !== activeTask.id));
            setActiveTask(null);
            setPodStep('none');
            setSignatureData(null);
            setPhotoData(null);
            toast.success('Delivery marked as complete!');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground pb-20", children: [_jsxs("header", { className: "sticky top-0 z-50 w-full luxury-glass border-b border-white/10 px-4 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold", children: "R1" }), _jsxs("div", { children: [_jsx("h1", { className: "text-sm font-bold tracking-tight", children: "Zaw Zaw" }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'} animate-pulse` }), _jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: isOnline ? 'Online' : 'Offline' })] })] })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setIsOnline(!isOnline), className: `rounded-full border-primary/20 ${isOnline ? 'text-primary' : 'text-muted-foreground'}`, children: isOnline ? 'Go Offline' : 'Go Online' })] }), _jsxs("main", { className: "container max-w-lg mx-auto p-4 space-y-6", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "grid grid-cols-2 gap-3", children: [_jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card border-none bg-primary/5", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-primary/20 rounded-lg", children: _jsx(Package, { className: "w-4 h-4 text-primary" }) }), _jsx(Badge, { variant: "outline", className: "text-[10px] border-primary/20 text-primary", children: "Today" })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("p", { className: "text-2xl font-bold", children: [completedCount, "/", totalTasks] }), _jsx("p", { className: "text-[10px] uppercase text-muted-foreground", children: "Deliveries Done" })] }), _jsx(Progress, { value: progress, className: "h-1 mt-2 bg-primary/10" })] }) }) }), _jsx(motion.div, { variants: staggerItem, children: _jsx(Card, { className: "luxury-card border-none bg-emerald-500/5", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: "p-2 bg-emerald-500/20 rounded-lg", children: _jsx(DollarSign, { className: "w-4 h-4 text-emerald-500" }) }), _jsx(Badge, { variant: "outline", className: "text-[10px] border-emerald-500/20 text-emerald-500", children: "To Remit" })] }), _jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "text-2xl font-bold", children: formatCurrency(175000) }), _jsx("p", { className: "text-[10px] uppercase text-muted-foreground", children: "COD Cash" })] })] }) }) })] }), activeTask ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: springPresets.gentle, children: [_jsx("h2", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3", children: "Next Stop" }), _jsxs(Card, { className: "luxury-card border-primary/20 shadow-lg relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 right-0 p-3", children: _jsx(StatusBadge, { status: activeTask.status, size: "sm" }) }), _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20", children: _jsx(Navigation, { className: "w-6 h-6 text-primary" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg", children: activeTask.customerName }), _jsx("p", { className: "text-xs text-muted-foreground font-mono", children: activeTask.awb })] })] }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(MapPin, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }), _jsx("p", { className: "text-sm leading-relaxed", children: activeTask.address })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: ["ETA: ", activeTask.estimatedTime] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-4 h-4 text-emerald-500" }), _jsx("span", { className: "text-xs font-bold text-emerald-500", children: activeTask.codAmount > 0 ? `COD: ${formatCurrency(activeTask.codAmount)}` : 'Prepaid' })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { variant: "outline", className: "w-full h-12 rounded-xl border-white/10 flex items-center gap-2", onClick: () => window.open(`tel:${activeTask.phone}`), children: [_jsx(Phone, { className: "w-4 h-4" }), " Call"] }), _jsxs(Button, { className: "w-full h-12 rounded-xl luxury-button flex items-center gap-2", onClick: () => setPodStep('scan'), children: [_jsx(Scan, { className: "w-4 h-4" }), " Complete"] })] })] })] })] })) : (_jsxs("div", { className: "py-12 text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto", children: _jsx(CheckCircle, { className: "w-8 h-8 text-muted-foreground" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "All deliveries for this route are completed." }), _jsx(Button, { variant: "link", className: "text-primary text-xs mt-2 uppercase tracking-widest", children: "Refresh Route" })] })] })), _jsxs(Tabs, { defaultValue: "pending", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-secondary/50 rounded-xl p-1", children: [_jsxs(TabsTrigger, { value: "pending", className: "rounded-lg text-xs uppercase tracking-widest font-bold", children: ["Pending (", deliveries.length, ")"] }), _jsx(TabsTrigger, { value: "completed", className: "rounded-lg text-xs uppercase tracking-widest font-bold", children: "History" })] }), _jsx(TabsContent, { value: "pending", className: "mt-4 space-y-3", children: deliveries.map((task) => (_jsxs(motion.div, { whileHover: { scale: 1.01 }, onClick: () => setActiveTask(task), className: `p-4 luxury-card cursor-pointer border-l-4 ${activeTask?.id === task.id ? 'border-l-primary bg-primary/5' : 'border-l-transparent'}`, children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "font-bold text-sm", children: task.customerName }), _jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: task.awb })] }), _jsx(Badge, { variant: task.priority === 'High' ? 'destructive' : 'outline', className: "text-[10px] px-1.5 h-5", children: task.priority })] }), _jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] text-muted-foreground", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { className: "truncate", children: task.address })] })] }, task.id))) }), _jsx(TabsContent, { value: "completed", className: "mt-4", children: _jsx("div", { className: "text-center py-8 text-muted-foreground text-xs", children: "Yesterday's delivery history will appear here." }) })] })] }), _jsxs("div", { className: "fixed bottom-0 left-0 right-0 luxury-glass border-t border-white/10 px-6 py-4 flex items-center justify-around", children: [_jsxs("div", { className: "flex flex-col items-center gap-1 text-primary", children: [_jsx(Activity, { className: "w-6 h-6" }), _jsx("span", { className: "text-[8px] uppercase font-bold", children: "Status" })] }), _jsxs("div", { className: "flex flex-col items-center gap-1 text-muted-foreground", children: [_jsx(Navigation, { className: "w-6 h-6" }), _jsx("span", { className: "text-[8px] uppercase font-bold", children: "Map" })] }), _jsx("div", { className: "w-14 h-14 -mt-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-background", children: _jsx(Scan, { className: "w-6 h-6 text-black" }) }), _jsxs("div", { className: "flex flex-col items-center gap-1 text-muted-foreground", children: [_jsx(TrendingUp, { className: "w-6 h-6" }), _jsx("span", { className: "text-[8px] uppercase font-bold", children: "Earning" })] }), _jsxs("div", { className: "flex flex-col items-center gap-1 text-muted-foreground", children: [_jsx(Star, { className: "w-6 h-6" }), _jsx("span", { className: "text-[8px] uppercase font-bold", children: "Rating" })] })] }), _jsx(Dialog, { open: podStep !== 'none', onOpenChange: (open) => !open && setPodStep('none'), children: _jsxs(DialogContent, { className: "max-w-md bg-background border-primary/20 rounded-[2rem] p-0 overflow-hidden", children: [_jsx(DialogHeader, { className: "p-6 pb-2", children: _jsxs(DialogTitle, { className: "text-xl font-bold flex items-center gap-2", children: [podStep === 'scan' && 'Scan Package', podStep === 'signature' && 'Customer Signature', podStep === 'photo' && 'Proof of Delivery', podStep === 'complete' && 'Summary'] }) }), _jsxs("div", { className: "px-6 pb-8", children: [podStep === 'scan' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Scan the barcode on the parcel label to verify." }), _jsx("div", { className: "rounded-2xl overflow-hidden aspect-square relative", children: _jsx(QRScanner, { onScan: (data) => {
                                                    toast.success(`Verified: ${data}`);
                                                    setPodStep('signature');
                                                } }) }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => setPodStep('signature'), children: "Skip Scan (Manual)" })] })), podStep === 'signature' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Ask the receiverName to sign below." }), _jsx("div", { className: "bg-muted/30 rounded-2xl p-2 border border-dashed border-primary/20", children: _jsx(SignaturePad, { onSave: (data) => {
                                                    setSignatureData(data);
                                                    setPodStep('photo');
                                                } }) })] })), podStep === 'photo' && (_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Take a photo of the package at the location." }), _jsx("div", { className: "rounded-2xl overflow-hidden", children: _jsx(PhotoCapture, { label: "Capture Parcel Photo", onCapture: (data) => {
                                                    setPhotoData(data);
                                                    setPodStep('complete');
                                                } }) })] })), podStep === 'complete' && (_jsxs("div", { className: "space-y-6 text-center", children: [_jsx("div", { className: "w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto", children: _jsx(Check, { className: "w-10 h-10 text-emerald-500" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold", children: "Verification Successful" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Signature and Photo captured." })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-left", children: [_jsxs("div", { className: "p-3 bg-secondary/50 rounded-xl", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground block", children: "COD Collected" }), _jsx("span", { className: "text-sm font-bold text-emerald-500", children: formatCurrency(activeTask?.codAmount || 0) })] }), _jsxs("div", { className: "p-3 bg-secondary/50 rounded-xl", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground block", children: "Time Spent" }), _jsx("span", { className: "text-sm font-bold", children: "4m 12s" })] })] }), _jsx(Button, { className: "w-full luxury-button", onClick: handleCompleteDelivery, children: "Finish & Submit" })] }))] })] }) })] }));
}
