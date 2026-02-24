import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Filter, Package, Truck, Phone, MessageCircle, Gift, Award, Sparkles, Smartphone, CreditCard, QrCode, Bell, Settings, User, Plus, X, ChevronRight, Headphones, HelpCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguageContext } from '@/lib/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { fadeInUp, staggerItem } from '@/lib/motion';
import { IMAGES } from '@/assets/images';
// Customer experience data
const CUSTOMER_DATA = {
    profile: {
        name: "Daw Khin Myo",
        phone: "+95 9 123 456 789",
        email: "khinmyo@email.com",
        address: "Building 15, Apt 3B, Thanlyin Township, Yangon",
        memberSince: "2024",
        totalOrders: 47,
        loyaltyPoints: 2840,
        preferredPayment: "Mobile Banking"
    },
    activeOrders: [
        {
            id: "BR-2026-001",
            status: "in_transit",
            merchant: "Global Electronics",
            items: ["Samsung Galaxy S26", "Wireless Charger"],
            total: "1,245,000 MMK",
            estimatedDelivery: "15:30 Today",
            rider: "Ko Aung Myat",
            riderRating: 4.9,
            progress: 75,
            trackingSteps: [
                { step: "Order Confirmed", completed: true, time: "09:00" },
                { step: "Preparing", completed: true, time: "09:15" },
                { step: "Picked Up", completed: true, time: "10:30" },
                { step: "In Transit", completed: true, active: true, time: "11:00" },
                { step: "Delivered", completed: false, time: "Est. 15:30" }
            ]
        }
    ],
    recentOrders: [
        {
            id: "BR-2026-002",
            date: "2026-02-03",
            merchant: "Fashion Hub",
            items: 2,
            total: "280,000 MMK",
            status: "delivered",
            rating: 5
        },
        {
            id: "BR-2026-003",
            date: "2026-02-01",
            merchant: "Tech Solutions",
            items: 1,
            total: "750,000 MMK",
            status: "delivered",
            rating: 4
        }
    ],
    recommendations: [
        {
            id: 1,
            title: "Premium Electronics",
            description: "Latest smartphones and accessories",
            image: IMAGES.DELIVERY_HERO_1,
            discount: "15% OFF",
            rating: 4.8,
            deliveryTime: "30-45 min"
        },
        {
            id: 2,
            title: "Fashion Boutique",
            description: "Trendy clothing and accessories",
            image: IMAGES.MOBILE_TRACKING_1,
            discount: "Buy 2 Get 1",
            rating: 4.6,
            deliveryTime: "45-60 min"
        }
    ],
    loyaltyProgram: {
        currentTier: "Gold",
        nextTier: "Platinum",
        pointsToNext: 1160,
        benefits: [
            "Free delivery on orders over 100,000 MMK",
            "Priority customer support",
            "Exclusive member discounts",
            "Early access to sales"
        ]
    }
};
const CustomerExperiencePage = () => {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [notifications, setNotifications] = useState([]);
    // Simulate real-time order updates
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const messages = [
                    "Your order is 5 minutes away!",
                    "Rider has picked up your order",
                    "Order is being prepared"
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                setNotifications(prev => [randomMessage, ...prev.slice(0, 2)]);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'status-delivered';
            case 'in_transit': return 'status-transit';
            case 'preparing': return 'status-preparing';
            default: return 'status-pending';
        }
    };
    const OrderTrackingCard = ({ order }) => (_jsx(Card, { className: "delivery-card border-none shadow-xl hover-lift", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-navy-900", children: order.id }), _jsx("p", { className: "text-sm text-muted-foreground", children: order.merchant })] }), _jsx(Badge, { className: getStatusColor(order.status), children: "In Transit" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Progress" }), _jsxs("span", { className: "text-sm font-semibold", children: [order.progress, "%"] })] }), _jsx(Progress, { value: order.progress, className: "h-2" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Truck, { className: "h-4 w-4 text-gold-500" }), _jsx("span", { className: "text-sm font-medium", children: order.rider }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-3 w-3 text-gold-500 fill-current" }), _jsx("span", { className: "text-xs", children: order.riderRating })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(Phone, { className: "h-3 w-3" }) }), _jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: _jsx(MessageCircle, { className: "h-3 w-3" }) })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-navy-100", children: [_jsx("span", { className: "font-semibold text-navy-900", children: order.total }), _jsxs("span", { className: "text-sm text-success font-medium", children: ["Arriving ", order.estimatedDelivery] })] })] }), _jsxs(Button, { className: "w-full mt-4 btn-premium", onClick: () => setSelectedOrder(order), children: [_jsx(MapPin, { className: "mr-2 h-4 w-4" }), "Track Live"] })] }) }));
    const RecommendationCard = ({ item }) => (_jsxs(Card, { className: "delivery-card border-none shadow-lg hover-lift cursor-pointer", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: item.image, alt: item.title, className: "w-full h-32 object-cover rounded-t-2xl" }), _jsx(Badge, { className: "absolute top-2 right-2 bg-error text-white", children: item.discount })] }), _jsxs(CardContent, { className: "p-4", children: [_jsx("h4", { className: "font-semibold text-navy-900 mb-1", children: item.title }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: item.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-3 w-3 text-gold-500 fill-current" }), _jsx("span", { className: "text-xs font-medium", children: item.rating })] }), _jsx("span", { className: "text-xs text-muted-foreground", children: "\u2022" }), _jsx("span", { className: "text-xs text-muted-foreground", children: item.deliveryTime })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })] })] })] }));
    const LoyaltyCard = () => (_jsx(Card, { className: "lotus-card text-white", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: "Loyalty Program" }), _jsxs("p", { className: "text-gold-200", children: [CUSTOMER_DATA.loyaltyProgram.currentTier, " Member"] })] }), _jsx(Award, { className: "h-8 w-8 text-gold-400" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsxs("span", { className: "text-gold-200", children: ["Points to ", CUSTOMER_DATA.loyaltyProgram.nextTier] }), _jsxs("span", { className: "text-white font-semibold", children: [CUSTOMER_DATA.loyaltyProgram.pointsToNext, " points"] })] }), _jsx(Progress, { value: (CUSTOMER_DATA.profile.loyaltyPoints / (CUSTOMER_DATA.profile.loyaltyPoints + CUSTOMER_DATA.loyaltyProgram.pointsToNext)) * 100, className: "h-2 bg-navy-800" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-gold-400", children: CUSTOMER_DATA.profile.loyaltyPoints }), _jsx("p", { className: "text-gold-200 text-sm", children: "Available Points" })] })] })] }) }));
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-navy-50 via-white to-gold-50/20", children: [_jsx(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-navy-100", children: _jsx("div", { className: "mobile-padding py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-12 w-12 border-2 border-gold-500", children: _jsx(AvatarFallback, { className: "bg-gold-100 text-gold-700 font-bold", children: CUSTOMER_DATA.profile.name.split(' ').map(n => n[0]).join('') }) }), _jsxs("div", { children: [_jsxs("h1", { className: "font-bold text-lg text-navy-900", children: ["Welcome back, ", CUSTOMER_DATA.profile.name.split(' ')[1], "!"] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [CUSTOMER_DATA.loyaltyProgram.currentTier, " Member \u2022 ", CUSTOMER_DATA.profile.loyaltyPoints, " points"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "relative", children: [_jsx(Bell, { className: "h-5 w-5" }), notifications.length > 0 && (_jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full" }))] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "h-5 w-5" }) })] })] }) }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 mobile-padding py-2 bg-transparent", children: [_jsx(TabsTrigger, { value: "home", className: "data-[state=active]:bg-white data-[state=active]:shadow-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-1", children: [_jsx(Smartphone, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Home" })] }) }), _jsx(TabsTrigger, { value: "orders", className: "data-[state=active]:bg-white data-[state=active]:shadow-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-1", children: [_jsx(Package, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Orders" })] }) }), _jsx(TabsTrigger, { value: "explore", className: "data-[state=active]:bg-white data-[state=active]:shadow-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-1", children: [_jsx(Search, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Explore" })] }) }), _jsx(TabsTrigger, { value: "profile", className: "data-[state=active]:bg-white data-[state=active]:shadow-sm", children: _jsxs("div", { className: "flex flex-col items-center space-y-1", children: [_jsx(User, { className: "h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Profile" })] }) })] }), _jsxs(TabsContent, { value: "home", className: "mobile-padding py-6 space-y-6", children: [CUSTOMER_DATA.activeOrders.length > 0 && (_jsxs(motion.div, { variants: staggerItem, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-navy-900", children: "Active Orders" }), _jsx(Button, { variant: "ghost", size: "sm", children: "View All" })] }), CUSTOMER_DATA.activeOrders.map((order) => (_jsx(OrderTrackingCard, { order: order }, order.id)))] })), _jsxs(motion.div, { variants: staggerItem, children: [_jsx("h2", { className: "text-xl font-bold text-navy-900 mb-4", children: "Quick Actions" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Card, { className: "delivery-card border-none shadow-lg hover-lift cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto mb-3", children: _jsx(QrCode, { className: "h-6 w-6 text-gold-500" }) }), _jsx("h3", { className: "font-semibold text-navy-900", children: "Scan QR" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Quick order" })] }) }), _jsx(Card, { className: "delivery-card border-none shadow-lg hover-lift cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3", children: _jsx(Headphones, { className: "h-6 w-6 text-success" }) }), _jsx("h3", { className: "font-semibold text-navy-900", children: "Support" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get help" })] }) })] })] }), _jsx(motion.div, { variants: staggerItem, children: _jsx(LoyaltyCard, {}) }), _jsxs(motion.div, { variants: staggerItem, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-xl font-bold text-navy-900", children: "Recommended for You" }), _jsx(Button, { variant: "ghost", size: "sm", children: "See All" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: CUSTOMER_DATA.recommendations.map((item) => (_jsx(RecommendationCard, { item: item }, item.id))) })] })] }), _jsxs(TabsContent, { value: "orders", className: "mobile-padding py-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold text-navy-900", children: "My Orders" }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), "Filter"] })] }), _jsx("div", { className: "space-y-4", children: CUSTOMER_DATA.recentOrders.map((order) => (_jsx(Card, { className: "delivery-card border-none shadow-lg", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-navy-900", children: order.id }), _jsx("p", { className: "text-sm text-muted-foreground", children: order.date })] }), _jsx(Badge, { className: getStatusColor(order.status), children: "Delivered" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-navy-900", children: order.merchant }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [order.items, " items"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-semibold text-navy-900", children: order.total }), _jsx("div", { className: "flex items-center space-x-1", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `h-3 w-3 ${i < order.rating ? 'text-gold-500 fill-current' : 'text-gray-300'}` }, i))) })] })] }), _jsxs("div", { className: "flex space-x-2 mt-4", children: [_jsx(Button, { variant: "outline", size: "sm", className: "flex-1", children: "Reorder" }), _jsx(Button, { variant: "outline", size: "sm", className: "flex-1", children: "Rate & Review" })] })] }) }, order.id))) })] }), _jsxs(TabsContent, { value: "explore", className: "mobile-padding py-6 space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search restaurants, shops, items...", className: "input-premium pl-10", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-navy-900 mb-4", children: "Categories" }), _jsx("div", { className: "grid grid-cols-4 gap-4", children: [
                                            { icon: Smartphone, label: 'Electronics', color: 'bg-blue-500/10 text-blue-500' },
                                            { icon: Gift, label: 'Fashion', color: 'bg-pink-500/10 text-pink-500' },
                                            { icon: Package, label: 'Home', color: 'bg-green-500/10 text-green-500' },
                                            { icon: Sparkles, label: 'Beauty', color: 'bg-purple-500/10 text-purple-500' }
                                        ].map((category, index) => (_jsx(Card, { className: "delivery-card border-none shadow-lg hover-lift cursor-pointer", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: `w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`, children: _jsx(category.icon, { className: "h-6 w-6" }) }), _jsx("p", { className: "text-sm font-medium text-navy-900", children: category.label })] }) }, index))) })] })] }), _jsxs(TabsContent, { value: "profile", className: "mobile-padding py-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx(Avatar, { className: "h-20 w-20 mx-auto mb-4 border-4 border-gold-500", children: _jsx(AvatarFallback, { className: "bg-gold-100 text-gold-700 font-bold text-xl", children: CUSTOMER_DATA.profile.name.split(' ').map(n => n[0]).join('') }) }), _jsx("h2", { className: "text-2xl font-bold text-navy-900", children: CUSTOMER_DATA.profile.name }), _jsxs("p", { className: "text-muted-foreground", children: [CUSTOMER_DATA.loyaltyProgram.currentTier, " Member since ", CUSTOMER_DATA.profile.memberSince] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(Card, { className: "delivery-card border-none shadow-lg text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("p", { className: "text-2xl font-bold text-navy-900", children: CUSTOMER_DATA.profile.totalOrders }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Total Orders" })] }) }), _jsx(Card, { className: "delivery-card border-none shadow-lg text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("p", { className: "text-2xl font-bold text-gold-500", children: CUSTOMER_DATA.profile.loyaltyPoints }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Points" })] }) }), _jsx(Card, { className: "delivery-card border-none shadow-lg text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("p", { className: "text-2xl font-bold text-success", children: "4.9" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Rating" })] }) })] }), _jsx("div", { className: "space-y-2", children: [
                                    { icon: User, label: 'Edit Profile', color: 'text-navy-500' },
                                    { icon: MapPin, label: 'Manage Addresses', color: 'text-navy-500' },
                                    { icon: CreditCard, label: 'Payment Methods', color: 'text-navy-500' },
                                    { icon: Bell, label: 'Notifications', color: 'text-navy-500' },
                                    { icon: HelpCircle, label: 'Help & Support', color: 'text-navy-500' },
                                    { icon: Settings, label: 'Settings', color: 'text-navy-500' }
                                ].map((option, index) => (_jsx(Card, { className: "delivery-card border-none shadow-sm hover-lift cursor-pointer", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(option.icon, { className: `h-5 w-5 ${option.color}` }), _jsx("span", { className: "font-medium text-navy-900", children: option.label })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })] }) }) }, index))) })] })] }), _jsx(AnimatePresence, { children: notifications.length > 0 && (_jsx(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -50 }, className: "fixed bottom-20 left-4 right-4 z-50", children: _jsx(Card, { className: "notification notification-success", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Bell, { className: "h-5 w-5 text-success" }), _jsx("p", { className: "font-medium", children: notifications[0] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setNotifications([]), children: _jsx(X, { className: "h-4 w-4" }) })] }) }) })) }), _jsx(Button, { className: "fab", children: _jsx(Plus, { className: "h-6 w-6" }) })] }));
};
export default CustomerExperiencePage;
