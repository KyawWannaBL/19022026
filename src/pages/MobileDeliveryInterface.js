import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ScanLine, MapPin, Navigation, Phone, MessageCircle, Camera, CheckCircle2, AlertTriangle, Clock, Package, Truck, User, Star, Route, Share2, Plus, X, ChevronRight, Headphones, Settings, Bell } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, } from "@/components/ui/sheet";
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { fadeInUp } from '@/lib/motion';
// Mobile-optimized delivery data
const MOBILE_DELIVERIES = [
    {
        id: "BR-2026-001",
        status: "pickup_ready",
        priority: "high",
        customer: "Daw Khin Myo",
        phone: "+95 9 123 456 789",
        address: "Building 15, Apt 3B, Thanlyin Township",
        items: ["Samsung Galaxy S26", "Wireless Charger"],
        value: "1,245,000 MMK",
        distance: "2.3 km",
        estimatedTime: "15 min",
        specialInstructions: "Call before arrival",
        coordinates: { lat: 16.7967, lng: 96.1610 }
    },
    {
        id: "BR-2026-002",
        status: "in_transit",
        priority: "medium",
        customer: "U Thant Zin",
        phone: "+95 9 987 654 321",
        address: "Chanayethazan Township, Street 84, House 25",
        items: ["Fashion Items", "Accessories"],
        value: "280,000 MMK",
        distance: "5.7 km",
        estimatedTime: "25 min",
        specialInstructions: "Fragile items - handle with care",
        coordinates: { lat: 21.9588, lng: 96.0891 }
    },
    {
        id: "BR-2026-003",
        status: "delivered",
        priority: "low",
        customer: "Ma Aye Aye",
        phone: "+95 9 555 123 456",
        address: "Insein Township, Industrial Zone B",
        items: ["Office Equipment"],
        value: "750,000 MMK",
        distance: "8.2 km",
        estimatedTime: "Completed",
        specialInstructions: "Business delivery - signature required",
        coordinates: { lat: 16.8661, lng: 96.0951 }
    }
];
const MobileDeliveryInterface = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [deliveries, setDeliveries] = useState(MOBILE_DELIVERIES);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('active');
    const [isOnline, setIsOnline] = useState(true);
    const [currentLocation, setCurrentLocation] = useState("Yangon Downtown");
    // Filter deliveries based on tab and search
    const filteredDeliveries = deliveries.filter(delivery => {
        const matchesSearch = delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            delivery.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'active'
            ? ['pickup_ready', 'in_transit'].includes(delivery.status)
            : activeTab === 'completed'
                ? delivery.status === 'delivered'
                : true;
        return matchesSearch && matchesTab;
    });
    const getStatusInfo = (status) => {
        switch (status) {
            case 'pickup_ready':
                return { label: 'Ready for Pickup', color: 'status-pickup', icon: Package };
            case 'in_transit':
                return { label: 'In Transit', color: 'status-transit', icon: Truck };
            case 'delivered':
                return { label: 'Delivered', color: 'status-delivered', icon: CheckCircle2 };
            default:
                return { label: 'Unknown', color: 'status-pending', icon: Clock };
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-error/10 text-error border-error/20';
            case 'medium': return 'bg-warning/10 text-warning border-warning/20';
            case 'low': return 'bg-success/10 text-success border-success/20';
            default: return 'bg-navy-100 text-navy-600 border-navy-200';
        }
    };
    const DeliveryCard = ({ delivery }) => {
        const statusInfo = getStatusInfo(delivery.status);
        const StatusIcon = statusInfo.icon;
        return (_jsx(motion.div, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, whileTap: { scale: 0.98 }, className: "delivery-card cursor-pointer hover-lift", onClick: () => setSelectedDelivery(delivery), children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl ${statusInfo.color.replace('status-', 'bg-status-').replace(' ', '/10 text-status-')}`, children: _jsx(StatusIcon, { className: "h-5 w-5" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "font-semibold text-navy-900 truncate", children: delivery.customer }), _jsx(Badge, { className: `${getPriorityColor(delivery.priority)} text-xs`, children: delivery.priority.toUpperCase() })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-2 line-clamp-2", children: delivery.address }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted-foreground", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(MapPin, { className: "h-3 w-3 mr-1" }), delivery.distance] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "h-3 w-3 mr-1" }), delivery.estimatedTime] })] }), _jsx("span", { className: "font-semibold text-navy-900", children: delivery.value })] })] }), _jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })] }) }));
    };
    const DeliveryDetails = ({ delivery }) => {
        const statusInfo = getStatusInfo(delivery.status);
        const StatusIcon = statusInfo.icon;
        return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-3 rounded-xl ${statusInfo.color.replace('status-', 'bg-status-').replace(' ', '/10 text-status-')}`, children: _jsx(StatusIcon, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-navy-900", children: delivery.id }), _jsx(Badge, { className: statusInfo.color, children: statusInfo.label })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSelectedDelivery(null), children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-semibold text-navy-900", children: "Customer Details" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(Phone, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(MessageCircle, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-10 w-10", children: _jsx(AvatarFallback, { className: "bg-gold-100 text-gold-700 font-bold", children: delivery.customer.split(' ').map((n) => n[0]).join('') }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-navy-900", children: delivery.customer }), _jsx("p", { className: "text-sm text-muted-foreground", children: delivery.phone })] })] }), _jsxs("div", { className: "flex items-start space-x-3 pt-2 border-t border-navy-100", children: [_jsx(MapPin, { className: "h-4 w-4 text-gold-500 mt-0.5" }), _jsx("p", { className: "text-sm text-navy-700", children: delivery.address })] })] })] }) }), _jsx(Card, { className: "glass-card", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h3", { className: "font-semibold text-navy-900 mb-3", children: "Package Details" }), _jsxs("div", { className: "space-y-3", children: [delivery.items.map((item, index) => (_jsx("div", { className: "flex items-center justify-between py-2 border-b border-navy-100 last:border-0", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center", children: _jsx(Package, { className: "h-4 w-4 text-navy-600" }) }), _jsx("span", { className: "text-sm font-medium text-navy-900", children: item })] }) }, index))), _jsxs("div", { className: "flex justify-between items-center pt-3 border-t border-navy-100", children: [_jsx("span", { className: "font-semibold text-navy-900", children: "Total Value" }), _jsx("span", { className: "font-bold text-lg text-navy-900", children: delivery.value })] })] })] }) }), delivery.specialInstructions && (_jsx(Card, { className: "glass-card border-warning/20 bg-warning/5", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-warning mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-warning mb-1", children: "Special Instructions" }), _jsx("p", { className: "text-sm text-navy-700", children: delivery.specialInstructions })] })] }) }) })), _jsxs("div", { className: "space-y-3", children: [delivery.status === 'pickup_ready' && (_jsxs(Button, { className: "btn-premium w-full", children: [_jsx(Navigation, { className: "mr-2 h-4 w-4" }), "Start Navigation"] })), delivery.status === 'in_transit' && (_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { className: "btn-delivery", children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), "Mark Delivered"] }), _jsxs(Button, { variant: "outline", children: [_jsx(Camera, { className: "mr-2 h-4 w-4" }), "Take Photo"] })] })), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs(Button, { variant: "outline", children: [_jsx(Share2, { className: "mr-2 h-4 w-4" }), "Share Location"] }), _jsxs(Button, { variant: "outline", children: [_jsx(AlertTriangle, { className: "mr-2 h-4 w-4" }), "Report Issue"] })] })] })] }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 via-white to-gold-50/20", children: [_jsx(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-navy-100", children: _jsxs("div", { className: "mobile-padding py-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-10 w-10 border-2 border-gold-500", children: _jsx(AvatarFallback, { className: "bg-gold-100 text-gold-700 font-bold", children: "KA" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-navy-900", children: "Ko Aung Myat" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}` }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [isOnline ? 'Online' : 'Offline', " \u2022 ", currentLocation] })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Bell, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-5 w-5" }) })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search deliveries...", className: "input-premium pl-10 pr-12", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx(Button, { variant: "ghost", size: "sm", className: "absolute right-2 top-1/2 transform -translate-y-1/2", children: _jsx(ScanLine, { className: "h-4 w-4" }) })] })] }) }), _jsx("div", { className: "mobile-padding py-4 border-b border-navy-100", children: _jsx("div", { className: "flex space-x-1 bg-navy-100 rounded-xl p-1", children: [
                        { id: 'active', label: 'Active', count: deliveries.filter(d => ['pickup_ready', 'in_transit'].includes(d.status)).length },
                        { id: 'completed', label: 'Completed', count: deliveries.filter(d => d.status === 'delivered').length }
                    ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                            ? 'bg-white text-navy-900 shadow-sm'
                            : 'text-navy-600 hover:text-navy-900'}`, children: [tab.label, " (", tab.count, ")"] }, tab.id))) }) }), _jsx("div", { className: "mobile-padding py-4 space-y-4", children: _jsx(AnimatePresence, { mode: "wait", children: filteredDeliveries.length === 0 ? (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-12", children: [_jsx(Package, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground", children: searchQuery ? 'No deliveries found' : 'No active deliveries' })] })) : (filteredDeliveries.map((delivery) => (_jsx(DeliveryCard, { delivery: delivery }, delivery.id)))) }) }), _jsx(Sheet, { open: !!selectedDelivery, onOpenChange: () => setSelectedDelivery(null), children: _jsx(SheetContent, { side: "bottom", className: "h-[90vh] rounded-t-3xl", children: _jsx("div", { className: "py-4", children: selectedDelivery && _jsx(DeliveryDetails, { delivery: selectedDelivery }) }) }) }), _jsxs("div", { className: "fixed bottom-6 right-6 flex flex-col space-y-3", children: [_jsx(Button, { size: "sm", className: "rounded-full w-12 h-12 bg-white/90 text-navy-900 shadow-xl hover:shadow-2xl", children: _jsx(Headphones, { className: "h-5 w-5" }) }), _jsx(Button, { className: "fab", children: _jsx(Plus, { className: "h-6 w-6" }) })] }), _jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-navy-100 safe-area-pb", children: _jsx("div", { className: "grid grid-cols-4 py-2", children: [
                        { icon: Truck, label: 'Deliveries', active: true },
                        { icon: Route, label: 'Routes', active: false },
                        { icon: Star, label: 'Earnings', active: false },
                        { icon: User, label: 'Profile', active: false }
                    ].map((item, index) => (_jsxs("button", { className: `flex flex-col items-center py-2 px-1 ${item.active ? 'text-gold-500' : 'text-muted-foreground'}`, children: [_jsx(item.icon, { className: "h-5 w-5 mb-1" }), _jsx("span", { className: "text-xs font-medium", children: item.label })] }, index))) }) })] }));
};
export default MobileDeliveryInterface;
