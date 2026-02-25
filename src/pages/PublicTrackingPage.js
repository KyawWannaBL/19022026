import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle, Loader2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';
export default function PublicTrackingPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const [awb, setTrackingNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleTrack = async () => {
        if (!awb.trim()) {
            setError('Please enter a tracking number');
            return;
        }
        setLoading(true);
        setError('');
        setTrackingResult(null);
        try {
            // Try to fetch from shipments table
            const { data, error: supabaseError } = await supabase
                .from('shipments_2026_02_03_19_20')
                .select('*')
                .eq('awb', awb.trim())
                .single();
            if (supabaseError) {
                // If not found in database, show demo data for common tracking numbers
                if (awb.toUpperCase().startsWith('BE-')) {
                    setTrackingResult({
                        id: 'demo',
                        awb: awb.toUpperCase(),
                        status: getDemoStatus(awb),
                        from_city: 'Yangon',
                        to_city: getDemoDestination(awb),
                        sender_name: 'Demo Sender',
                        receiver_name: 'Demo Receiver',
                        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                        updated_at: new Date().toISOString(),
                        estimated_delivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                    });
                }
                else {
                    setError('Tracking number not found. Please check the number and try again.');
                }
            }
            else {
                setTrackingResult(data);
            }
        }
        catch (err) {
            console.error('Tracking error:', err);
            setError('Unable to track shipment at this time. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    const getDemoStatus = (awb) => {
        const num = parseInt(awb.replace(/\D/g, '')) || 0;
        const statuses = ['Pending', 'In Transit', 'Out for Delivery', 'Delivered'];
        return statuses[num % statuses.length];
    };
    const getDemoDestination = (awb) => {
        const num = parseInt(awb.replace(/\D/g, '')) || 0;
        const cities = ['Mandalay', 'Nay Pyi Taw', 'Bagan', 'Taunggyi'];
        return cities[num % cities.length];
    };
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'out for delivery':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'in transit':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'pending':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return _jsx(CheckCircle, { className: "w-5 h-5 text-green-600" });
            case 'out for delivery':
                return _jsx(Truck, { className: "w-5 h-5 text-blue-600" });
            case 'in transit':
                return _jsx(Package, { className: "w-5 h-5 text-yellow-600" });
            case 'pending':
                return _jsx(Clock, { className: "w-5 h-5 text-gray-600" });
            case 'cancelled':
                return _jsx(AlertCircle, { className: "w-5 h-5 text-red-600" });
            default:
                return _jsx(Package, { className: "w-5 h-5 text-gray-600" });
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleTrack();
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsxs("section", { className: "relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/70" }), _jsx("img", { src: IMAGES.TRACKING_DASHBOARD_1, alt: "Package Tracking", className: "absolute inset-0 w-full h-full object-cover opacity-20" }), _jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "text-center", children: [_jsxs("h1", { className: "text-4xl lg:text-6xl font-bold leading-tight mb-6", children: ["Track Your ", _jsx("span", { className: "text-gold", children: "Package" })] }), _jsx("p", { className: "text-xl lg:text-2xl text-navy-200 max-w-3xl mx-auto", children: "Get real-time updates on your shipment status and delivery progress." })] }) })] }), _jsx("section", { className: "py-20 bg-white", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Enter Your Tracking Number" }), _jsx("p", { className: "text-lg text-gray-600", children: "Enter your tracking ID (e.g., BE-12345) to get the latest status of your shipment." })] }), _jsx(Card, { className: "mb-8 shadow-lg border-0", children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { type: "text", placeholder: "Enter tracking number (e.g., BE-12345)", value: awb, onChange: (e) => setTrackingNumber(e.target.value), onKeyPress: handleKeyPress, className: "text-lg py-6 border-2 border-gray-300 focus:border-gold focus:ring-gold" }) }), _jsx(Button, { onClick: handleTrack, disabled: loading, size: "lg", className: "bg-gold hover:bg-gold/90 text-navy-900 font-bold px-8 py-6", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 mr-2 animate-spin" }), "Tracking..."] })) : (_jsxs(_Fragment, { children: [_jsx(Search, { className: "w-5 h-5 mr-2" }), "Track Package"] })) })] }) }) }), error && (_jsxs(Alert, { className: "mb-8 border-red-200 bg-red-50", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-600" }), _jsx(AlertDescription, { className: "text-red-800", children: error })] })), trackingResult && (_jsxs(Card, { className: "shadow-xl border-0", children: [_jsxs(CardHeader, { className: "bg-navy-900 text-white", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-2xl", children: "Tracking Details" }), _jsx(Badge, { className: `${getStatusColor(trackingResult.status)} border`, children: _jsxs("div", { className: "flex items-center gap-2", children: [getStatusIcon(trackingResult.status), trackingResult.status] }) })] }), _jsxs("p", { className: "text-navy-200", children: ["Tracking ID: ", _jsx("span", { className: "font-bold text-gold", children: trackingResult.awb })] })] }), _jsxs(CardContent, { className: "p-8", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 border-b pb-2", children: "Shipment Information" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPin, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Route" }), _jsxs("p", { className: "text-gray-600", children: ["From: ", _jsx("span", { className: "font-medium", children: trackingResult.from_city })] }), _jsxs("p", { className: "text-gray-600", children: ["To: ", _jsx("span", { className: "font-medium", children: trackingResult.to_city })] })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Package, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Sender" }), _jsx("p", { className: "text-gray-600", children: trackingResult.sender_name })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Package, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Receiver" }), _jsx("p", { className: "text-gray-600", children: trackingResult.receiver_name })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 border-b pb-2", children: "Timeline" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Clock, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Created" }), _jsx("p", { className: "text-gray-600", children: new Date(trackingResult.createdAt).toLocaleDateString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'long',
                                                                                        day: 'numeric',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    }) })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Clock, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Last Updated" }), _jsx("p", { className: "text-gray-600", children: new Date(trackingResult.updated_at).toLocaleDateString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'long',
                                                                                        day: 'numeric',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    }) })] })] }), trackingResult.estimated_delivery && (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Truck, { className: "w-5 h-5 text-gold mt-1 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: "Estimated Delivery" }), _jsx("p", { className: "text-gray-600", children: new Date(trackingResult.estimated_delivery).toLocaleDateString('en-US', {
                                                                                        year: 'numeric',
                                                                                        month: 'long',
                                                                                        day: 'numeric'
                                                                                    }) })] })] }))] })] })] }), _jsxs("div", { className: "mt-8 p-6 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [getStatusIcon(trackingResult.status), _jsxs("h4", { className: "font-bold text-gray-900", children: ["Current Status: ", trackingResult.status] })] }), _jsxs("p", { className: "text-gray-600", children: [trackingResult.status === 'Delivered' && 'Your package has been successfully delivered.', trackingResult.status === 'Out for Delivery' && 'Your package is out for delivery and will arrive soon.', trackingResult.status === 'In Transit' && 'Your package is on its way to the destinationTownship.', trackingResult.status === 'Pending' && 'Your package is being processed at our facility.', trackingResult.status === 'Cancelled' && 'This shipment has been cancelled.'] })] })] })] })), !trackingResult && !loading && (_jsx(Card, { className: "mt-8 border-gold/20 bg-gold/5", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "font-bold text-gray-900 mb-3", children: "Try Demo Tracking Numbers:" }), _jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [_jsx(Button, { variant: "outline", onClick: () => setTrackingNumber('BE-1001'), className: "justify-start", children: "BE-1001 (Delivered)" }), _jsx(Button, { variant: "outline", onClick: () => setTrackingNumber('BE-1002'), className: "justify-start", children: "BE-1002 (In Transit)" }), _jsx(Button, { variant: "outline", onClick: () => setTrackingNumber('BE-1003'), className: "justify-start", children: "BE-1003 (Out for Delivery)" }), _jsx(Button, { variant: "outline", onClick: () => setTrackingNumber('BE-1004'), className: "justify-start", children: "BE-1004 (Pending)" })] })] }) }))] }) }), _jsx("section", { className: "py-20 bg-gray-50", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-6", children: "Need Help?" }), _jsx("p", { className: "text-lg text-gray-600 mb-8", children: "Can't find your tracking information? Our customer support team is here to help." }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Phone, { className: "w-6 h-6 text-blue-600" }) }), _jsx("h3", { className: "font-bold text-gray-900 mb-2", children: "Call Us" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Speak with our support team" }), _jsx(Button, { asChild: true, variant: "outline", children: _jsx("a", { href: "tel:+95989747744", children: "+95-9-89747744" }) })] }) }), _jsx(Card, { className: "hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Mail, { className: "w-6 h-6 text-green-600" }) }), _jsx("h3", { className: "font-bold text-gray-900 mb-2", children: "Email Us" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Send us your inquiry" }), _jsx(Button, { asChild: true, variant: "outline", children: _jsx("a", { href: "mailto:info@britiumexpress.com", children: "Send Email" }) })] }) })] })] }) })] }));
}
