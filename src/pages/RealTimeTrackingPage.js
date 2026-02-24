import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Truck, Clock, CheckCircle2, Phone, MessageCircle, Navigation, Package, Star, Share2, Bell, Route, Timer, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { IMAGES } from '@/assets/images';
// Advanced tracking data with real-time simulation
const TRACKING_DATA = {
    id: "BR-2026-001",
    status: "in_transit",
    progress: 75,
    estimatedDelivery: "2026-02-04 15:30",
    currentLocation: "Yangon - Thanlyin Bridge",
    rider: {
        name: "Ko Aung Myat",
        phone: "+95 9 111 222 333",
        rating: 4.9,
        avatar: "/api/placeholder/40/40",
        vehicle: "Motorcycle - YGN-1234"
    },
    timeline: [
        {
            id: 1,
            status: "Order Confirmed",
            time: "09:00 AM",
            completed: true,
            icon: CheckCircle2,
            description: "Your order has been confirmed and is being prepared"
        },
        {
            id: 2,
            status: "Preparing",
            time: "09:15 AM",
            completed: true,
            icon: Package,
            description: "Package is being prepared for pickup"
        },
        {
            id: 3,
            status: "Picked Up",
            time: "10:30 AM",
            completed: true,
            icon: Truck,
            description: "Package picked up by delivery rider"
        },
        {
            id: 4,
            status: "In Transit",
            time: "11:00 AM",
            completed: true,
            active: true,
            icon: Navigation,
            description: "On the way to your location"
        },
        {
            id: 5,
            status: "Out for Delivery",
            time: "Est. 15:00",
            completed: false,
            icon: MapPin,
            description: "Rider is near your delivery location"
        },
        {
            id: 6,
            status: "Delivered",
            time: "Est. 15:30",
            completed: false,
            icon: CheckCircle2,
            description: "Package delivered successfully"
        }
    ],
    package: {
        items: [
            { name: "Samsung Galaxy S26", quantity: 1, price: "1,200,000 MMK" },
            { name: "Wireless Charger", quantity: 1, price: "45,000 MMK" }
        ],
        total: "1,245,000 MMK",
        weight: "1.2 kg",
        dimensions: "25x15x8 cm"
    },
    addresses: {
        pickup: "Global Electronics Store, Downtown Plaza, Yangon",
        delivery: "Building 15, Apt 3B, Thanlyin Township, Yangon"
    }
};
const RealTimeTrackingPage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [trackingData, setTrackingData] = useState(TRACKING_DATA);
    const [isLive, setIsLive] = useState(true);
    const [notifications, setNotifications] = useState([]);
    // Simulate real-time updates
    useEffect(() => {
        if (!isLive)
            return;
        const interval = setInterval(() => {
            setTrackingData(prev => ({
                ...prev,
                progress: Math.min(prev.progress + Math.random() * 2, 100),
                currentLocation: `${prev.currentLocation} - Updated ${new Date().toLocaleTimeString()}`
            }));
            // Simulate notifications
            if (Math.random() > 0.8) {
                const messages = [
                    "Rider is 5 minutes away",
                    "Package is on the fastest route",
                    "Delivery will arrive on time"
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                setNotifications(prev => [randomMessage, ...prev.slice(0, 2)]);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [isLive]);
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'status-delivered';
            case 'in_transit': return 'status-transit';
            case 'preparing': return 'status-preparing';
            case 'confirmed': return 'status-confirmed';
            default: return 'status-pending';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 via-white to-gold-50/30", children: [_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: staggerContainer, className: "relative h-96 overflow-hidden", children: [_jsx("div", { className: "hero-background", children: _jsx("img", { src: IMAGES.MOBILE_TRACKING_1, alt: "Delivery Tracking", className: "w-full h-full object-cover" }) }), _jsx("div", { className: "hero-overlay" }), _jsx("div", { className: "relative z-10 h-full flex items-center justify-center", children: _jsxs(motion.div, { variants: fadeInUp, className: "text-center text-white space-y-4", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 mb-4", children: [_jsx("div", { className: "w-3 h-3 bg-success rounded-full animate-pulse-gold" }), _jsx("span", { className: "text-sm font-medium", children: "LIVE TRACKING" })] }), _jsx("h1", { className: "text-4xl md:text-6xl font-bold font-display", children: "Track Your Order" }), _jsx("p", { className: "text-xl opacity-90", children: "Real-time updates \u2022 Estimated delivery in 4 hours" }), _jsxs("div", { className: "flex items-center justify-center space-x-4 mt-6", children: [_jsx(Badge, { className: "bg-white/20 text-white border-white/30 px-4 py-2", children: trackingData.id }), _jsx(Badge, { className: `${getStatusColor(trackingData.status)} px-4 py-2`, children: "In Transit" })] })] }) })] }), _jsxs("div", { className: "mobile-padding py-8 space-y-8", children: [_jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-2xl", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-2xl font-bold text-gradient-navy", children: "Delivery Progress" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 bg-success rounded-full animate-pulse" }), _jsx("span", { className: "text-sm text-success font-medium", children: "Live" })] })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Progress" }), _jsxs("span", { className: "font-semibold", children: [Math.round(trackingData.progress), "%"] })] }), _jsx(Progress, { value: trackingData.progress, className: "h-3 bg-navy-100", children: _jsx("div", { className: "h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-1000", style: { width: `${trackingData.progress}%` } }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-info/10 rounded-xl", children: _jsx(MapPin, { className: "h-5 w-5 text-info" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Current Location" }), _jsx("p", { className: "font-semibold", children: trackingData.currentLocation })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-success/10 rounded-xl", children: _jsx(Clock, { className: "h-5 w-5 text-success" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Estimated Delivery" }), _jsx("p", { className: "font-semibold", children: trackingData.estimatedDelivery })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-warning/10 rounded-xl", children: _jsx(Route, { className: "h-5 w-5 text-warning" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Distance Remaining" }), _jsx("p", { className: "font-semibold", children: "8.5 km" })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-error/10 rounded-xl", children: _jsx(Timer, { className: "h-5 w-5 text-error" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Time Remaining" }), _jsx("p", { className: "font-semibold", children: "~25 minutes" })] })] })] })] })] })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: "Your Delivery Rider" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Avatar, { className: "h-16 w-16 border-2 border-gold-500", children: [_jsx(AvatarImage, { src: trackingData.rider.avatar }), _jsx(AvatarFallback, { className: "bg-gold-100 text-gold-700 font-bold", children: trackingData.rider.name.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-bold text-lg", children: trackingData.rider.name }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-4 w-4 text-gold-500 fill-current" }), _jsx("span", { className: "font-semibold", children: trackingData.rider.rating })] }), _jsx("span", { className: "text-muted-foreground", children: "\u2022" }), _jsx("span", { className: "text-sm text-muted-foreground", children: trackingData.rider.vehicle })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(Phone, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(MessageCircle, { className: "h-4 w-4" }) })] })] }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: "Delivery Timeline" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: trackingData.timeline.map((item, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: `timeline-item ${item.completed ? 'completed' : ''} ${item.active ? 'active' : ''}`, children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl ${item.completed
                                                            ? 'bg-success/10'
                                                            : item.active
                                                                ? 'bg-gold-500/10'
                                                                : 'bg-navy-100'}`, children: _jsx(item.icon, { className: `h-5 w-5 ${item.completed
                                                                ? 'text-success'
                                                                : item.active
                                                                    ? 'text-gold-500'
                                                                    : 'text-navy-400'}` }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: `font-semibold ${item.completed || item.active ? 'text-navy-900' : 'text-navy-400'}`, children: item.status }), _jsx("span", { className: `text-sm ${item.completed || item.active ? 'text-navy-600' : 'text-navy-400'}`, children: item.time })] }), _jsx("p", { className: `text-sm mt-1 ${item.completed || item.active ? 'text-muted-foreground' : 'text-navy-300'}`, children: item.description })] })] }) }, item.id))) }) })] }) }), _jsx(motion.div, { variants: staggerItem, children: _jsxs(Card, { className: "delivery-card border-none shadow-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl font-bold", children: "Package Details" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "space-y-3", children: trackingData.package.items.map((item, index) => (_jsxs("div", { className: "flex justify-between items-center py-2 border-b border-navy-100 last:border-0", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: item.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Qty: ", item.quantity] })] }), _jsx("p", { className: "font-semibold", children: item.price })] }, index))) }), _jsxs("div", { className: "grid grid-cols-3 gap-4 pt-4 border-t border-navy-100", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Total" }), _jsx("p", { className: "font-bold text-lg", children: trackingData.package.total })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Weight" }), _jsx("p", { className: "font-semibold", children: trackingData.package.weight })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Dimensions" }), _jsx("p", { className: "font-semibold", children: trackingData.package.dimensions })] })] })] })] }) }), _jsx(AnimatePresence, { children: notifications.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -50 }, className: "fixed bottom-4 left-4 right-4 z-50", children: _jsx(Card, { className: "notification notification-success", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Bell, { className: "h-5 w-5 text-success" }), _jsx("p", { className: "font-medium", children: notifications[0] })] }) }) })) }), _jsxs(motion.div, { variants: staggerItem, className: "flex space-x-4", children: [_jsxs(Button, { className: "btn-premium flex-1", children: [_jsx(Share2, { className: "mr-2 h-4 w-4" }), "Share Tracking"] }), _jsxs(Button, { variant: "outline", className: "flex-1", children: [_jsx(Heart, { className: "mr-2 h-4 w-4" }), "Rate Experience"] })] })] }), _jsx(Button, { className: "fab", children: _jsx(Navigation, { className: "h-6 w-6" }) })] }));
};
export default RealTimeTrackingPage;
