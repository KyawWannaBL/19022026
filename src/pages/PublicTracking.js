import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
export default function PublicTracking() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [trackingId, setTrackingId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleTrack = async () => {
        if (!trackingId.trim())
            return;
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Mock tracking data
            setTrackingResult({
                id: trackingId,
                status: 'In Transit',
                statusColor: 'bg-blue-100 text-blue-800',
                lastUpdated: 'Just now',
                from: 'Yangon',
                to: 'Mandalay',
                estimatedDelivery: 'Tomorrow, 2:00 PM',
                timeline: [
                    {
                        status: 'Order Placed',
                        location: 'Yangon',
                        time: 'Oct 24, 2026 - 9:00 AM',
                        completed: true,
                        icon: CheckCircle,
                    },
                    {
                        status: 'Picked Up',
                        location: 'East Dagon Hub',
                        time: 'Oct 24, 2026 - 11:30 AM',
                        completed: true,
                        icon: Package,
                    },
                    {
                        status: 'In Transit',
                        location: 'Highway Express',
                        time: 'Oct 24, 2026 - 2:15 PM',
                        completed: true,
                        icon: Truck,
                    },
                    {
                        status: 'Out for Delivery',
                        location: 'Mandalay Hub',
                        time: 'Expected: Oct 25, 2026 - 1:00 PM',
                        completed: false,
                        icon: MapPin,
                    },
                    {
                        status: 'Delivered',
                        location: 'Destination',
                        time: 'Expected: Oct 25, 2026 - 2:00 PM',
                        completed: false,
                        icon: Home,
                    },
                ],
            });
            setIsLoading(false);
        }, 1000);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: "Track & Trace" }), _jsx("p", { className: "text-xl text-gray-600", children: "Real-time status updates for your shipments." })] }), _jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center", children: "Track Your Shipment" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "Enter tracking number (e.g., BE-89744)", value: trackingId, onChange: (e) => setTrackingId(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleTrack() }) }), _jsx(Button, { onClick: handleTrack, disabled: isLoading || !trackingId.trim(), className: "bg-primary hover:bg-primary/90", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" }), "Tracking..."] })) : (_jsxs(_Fragment, { children: [_jsx(Search, { className: "w-4 h-4 mr-2" }), "TRACK"] })) })] }) })] }), trackingResult && (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Badge, { className: trackingResult.statusColor, children: trackingResult.status }), _jsxs("span", { className: "text-sm text-gray-500", children: ["ID: ", trackingResult.id] })] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx(Clock, { className: "w-4 h-4 inline mr-1" }), "Last Updated: ", trackingResult.lastUpdated] })] }), _jsxs("div", { className: "flex items-center gap-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-500", children: "From" }), _jsx("p", { className: "font-semibold", children: trackingResult.from })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-500", children: "To" }), _jsx("p", { className: "font-semibold", children: trackingResult.to })] })] })] }), trackingResult.estimatedDelivery && (_jsx("div", { className: "mt-4 p-3 bg-blue-50 rounded-lg", children: _jsxs("p", { className: "text-sm text-blue-800", children: [_jsx(MapPin, { className: "w-4 h-4 inline mr-1" }), "Estimated Delivery: ", trackingResult.estimatedDelivery] }) }))] }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Shipment Timeline" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: trackingResult.timeline.map((event, index) => (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${event.completed
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'}`, children: _jsx(event.icon, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: `text-sm font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`, children: event.status }), _jsx("span", { className: `text-xs ${event.completed ? 'text-gray-600' : 'text-gray-400'}`, children: event.time })] }), _jsx("p", { className: `text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`, children: event.location })] })] }, index))) }) })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Need Help?" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Contact our customer service for any questions about your shipment." }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("p", { className: "text-gray-600", children: "\uD83D\uDCDE +95 9 897 4477 44" }), _jsx("p", { className: "text-gray-600", children: "\u2709\uFE0F info@britiumexpress.com" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Business Hours" }), _jsxs("div", { className: "space-y-1 text-sm text-gray-600", children: [_jsx("p", { children: "Monday - Saturday: 9:00 AM - 5:30 PM" }), _jsx("p", { children: "Sunday: Closed" })] })] })] }) }) })] })), trackingId && !trackingResult && !isLoading && (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Package, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No Results Found" }), _jsxs("p", { className: "text-gray-600", children: ["We couldn't find any shipment with tracking ID \"", trackingId, "\". Please check the number and try again."] })] }) }))] }) }));
}
