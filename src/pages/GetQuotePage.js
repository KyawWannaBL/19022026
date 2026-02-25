import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Calculator, MapPin, Package, Truck, Plane, Clock, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { IMAGES } from '@/assets/images';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
export default function GetQuotePage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const [serviceType, setServiceType] = useState('domestic');
    const [region, setRegion] = useState('');
    const [destinationTownship, setDestination] = useState('');
    const [weight, setWeight] = useState('1');
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [pricing, setPricing] = useState([]);
    const [availableDestinations, setAvailableDestinations] = useState([]);
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchPricingData();
    }, []);
    useEffect(() => {
        if (serviceType && region) {
            updateAvailableDestinations();
        }
    }, [serviceType, region, pricing]);
    useEffect(() => {
        if (destinationTownship && weight) {
            calculateQuote();
        }
    }, [destinationTownship, weight, pricing]);
    const fetchPricingData = async () => {
        try {
            const { data, error } = await supabase
                .from('pricing_2026_02_03_21_00')
                .select('*')
                .eq('is_active', true)
                .order('region, destinationTownship, weight_min');
            if (error)
                throw error;
            setPricing(data || []);
        }
        catch (error) {
            console.error('Error fetching pricing:', error);
        }
    };
    const updateAvailableDestinations = () => {
        const destinationTownships = pricing
            .filter(p => p.service_type === serviceType && p.region === region)
            .map(p => p.destinationTownship)
            .filter((dest, index, arr) => arr.indexOf(dest) === index)
            .sort();
        setAvailableDestinations(destinationTownships);
        setDestination(''); // Reset destinationTownship when region changes
        setQuote(null);
    };
    const calculateQuote = () => {
        if (!destinationTownship || !weight)
            return;
        const weightNum = parseFloat(weight);
        if (isNaN(weightNum) || weightNum <= 0)
            return;
        // Calculate volumetric weight if dimensions are provided
        let volumetricWeight = 0;
        if (dimensions.length && dimensions.width && dimensions.height) {
            const l = parseFloat(dimensions.length);
            const w = parseFloat(dimensions.width);
            const h = parseFloat(dimensions.height);
            if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
                volumetricWeight = (l * w * h) / 6000; // Standard air cargo divisor
            }
        }
        // For international air cargo, use the greater of actual weight or volumetric weight
        const chargeableWeight = serviceType === 'international'
            ? Math.max(weightNum, volumetricWeight)
            : weightNum;
        // Find the appropriate pricing tier based on chargeable weight
        const applicablePricing = pricing.find(p => p.service_type === serviceType &&
            p.region === region &&
            p.destinationTownship === destinationTownship &&
            chargeableWeight >= p.weight_min &&
            (p.weight_max === null || chargeableWeight <= p.weight_max));
        if (!applicablePricing)
            return;
        let totalPrice = 0;
        if (serviceType === 'domestic') {
            // For domestic: base price for first kg + additional weight charges
            if (chargeableWeight <= 1) {
                totalPrice = applicablePricing.price_per_kg;
            }
            else {
                const additionalWeight = chargeableWeight - 1;
                totalPrice = applicablePricing.price_per_kg + (additionalWeight * 500); // 500 MMK per additional kg
            }
        }
        else {
            // For international air cargo: rate per kg × chargeable weight
            totalPrice = applicablePricing.price_per_kg * chargeableWeight;
        }
        const deliveryTime = getDeliveryTime(serviceType, region, destinationTownship);
        setQuote({
            basePrice: applicablePricing.price_per_kg,
            totalPrice: Math.round(totalPrice),
            currency: applicablePricing.currency,
            deliveryTime,
            chargeableWeight: Math.round(chargeableWeight * 100) / 100, // Round to 2 decimal places
            actualWeight: weightNum,
            volumetricWeight: Math.round(volumetricWeight * 100) / 100
        });
    };
    const getDeliveryTime = (serviceType, region, destinationTownship) => {
        if (serviceType === 'domestic') {
            if (region === 'yangon')
                return '1-2 Days';
            return '2-3 Days';
        }
        else {
            switch (region) {
                case 'asia':
                    return '3-5 Days';
                case 'europe':
                    return '5-7 Days';
                case 'north_america':
                    return '5-7 Days';
                case 'oceania':
                    return '5-7 Days';
                case 'middle_east':
                    return '4-6 Days';
                default:
                    return '3-7 Days';
            }
        }
    };
    const getRegionOptions = () => {
        if (serviceType === 'domestic') {
            return [
                { value: 'yangon', label: 'Yangon City' },
                { value: 'mandalay', label: 'Mandalay Region' },
                { value: 'naypyitaw', label: 'Nay Pyi Taw' }
            ];
        }
        else {
            return [
                { value: 'asia', label: 'Asia' },
                { value: 'europe', label: 'Europe' },
                { value: 'north_america', label: 'North America' },
                { value: 'oceania', label: 'Oceania' },
                { value: 'middle_east', label: 'Middle East' }
            ];
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsxs("section", { className: "relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900/70" }), _jsx("img", { src: IMAGES.LOGISTICS_HERO_3, alt: "Get Quote", className: "absolute inset-0 w-full h-full object-cover opacity-20" }), _jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "text-center", children: [_jsxs("h1", { className: "text-4xl lg:text-6xl font-bold leading-tight mb-6", children: ["Get Your ", _jsx("span", { className: "text-gold", children: "Instant Quote" })] }), _jsx("p", { className: "text-xl lg:text-2xl text-navy-200 max-w-3xl mx-auto", children: "Calculate shipping costs instantly with our transparent pricing calculator." })] }) })] }), _jsx("section", { className: "py-20 bg-white", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-12", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "shadow-xl border-0", children: [_jsxs(CardHeader, { className: "bg-navy-900 text-white", children: [_jsxs(CardTitle, { className: "text-2xl flex items-center gap-3", children: [_jsx(Calculator, { className: "w-6 h-6 text-gold" }), t('quote.title')] }), _jsx("p", { className: "text-navy-200", children: t('quote.subtitle') })] }), _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: t('quote.serviceType') }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Button, { variant: serviceType === 'domestic' ? 'default' : 'outline', onClick: () => {
                                                                            setServiceType('domestic');
                                                                            setRegion('');
                                                                            setDestination('');
                                                                            setQuote(null);
                                                                        }, className: `h-16 ${serviceType === 'domestic' ? 'bg-gold hover:bg-gold/90 text-navy-900' : ''}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Truck, { className: "w-6 h-6" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-bold", children: "Domestic" }), _jsx("div", { className: "text-sm opacity-75", children: "Within Myanmar" })] })] }) }), _jsx(Button, { variant: serviceType === 'international' ? 'default' : 'outline', onClick: () => {
                                                                            setServiceType('international');
                                                                            setRegion('');
                                                                            setDestination('');
                                                                            setQuote(null);
                                                                        }, className: `h-16 ${serviceType === 'international' ? 'bg-gold hover:bg-gold/90 text-navy-900' : ''}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Plane, { className: "w-6 h-6" }), _jsxs("div", { className: "text-left", children: [_jsx("div", { className: "font-bold", children: "International" }), _jsx("div", { className: "text-sm opacity-75", children: "Air Cargo" })] })] }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: "From" }), _jsxs(Select, { value: "yangon", disabled: true, children: [_jsx(SelectTrigger, { className: "h-12", children: _jsx(SelectValue, { placeholder: "Origin" }) }), _jsx(SelectContent, { children: _jsx(SelectItem, { value: "yangon", children: "Yangon, Myanmar" }) })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: serviceType === 'domestic' ? 'Region' : 'Destination Region' }), _jsxs(Select, { value: region, onValueChange: setRegion, children: [_jsx(SelectTrigger, { className: "h-12", children: _jsx(SelectValue, { placeholder: "Select region" }) }), _jsx(SelectContent, { children: getRegionOptions().map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: serviceType === 'domestic' ? 'Township/City' : 'Country' }), _jsxs(Select, { value: destinationTownship, onValueChange: setDestination, disabled: !region, children: [_jsx(SelectTrigger, { className: "h-12", children: _jsx(SelectValue, { placeholder: "Select destinationTownship" }) }), _jsx(SelectContent, { children: availableDestinations.map((dest) => (_jsx(SelectItem, { value: dest, children: dest }, dest))) })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: t('quote.weight') }), _jsx(Input, { type: "number", value: weight, onChange: (e) => setWeight(e.target.value), min: "0.1", step: "0.1", className: "h-12 text-lg", placeholder: "Enter weight in kg" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-lg font-semibold", children: "Dimensions (cm) - Optional" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(Input, { type: "number", placeholder: "Length", value: dimensions.length, onChange: (e) => setDimensions(prev => ({ ...prev, length: e.target.value })), className: "h-12" }), _jsx(Input, { type: "number", placeholder: "Width", value: dimensions.width, onChange: (e) => setDimensions(prev => ({ ...prev, width: e.target.value })), className: "h-12" }), _jsx(Input, { type: "number", placeholder: "Height", value: dimensions.height, onChange: (e) => setDimensions(prev => ({ ...prev, height: e.target.value })), className: "h-12" })] }), _jsx("p", { className: "text-sm text-gray-500", children: "Used to calculate volumetric weight for international shipments" })] })] }) })] }) }), _jsx("div", { className: "lg:col-span-1", children: _jsxs(Card, { className: "shadow-xl border-0 sticky top-8", children: [_jsx(CardHeader, { className: "bg-gold text-navy-900", children: _jsx(CardTitle, { className: "text-2xl", children: "Your Quote" }) }), _jsx(CardContent, { className: "p-8", children: quote ? (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-4xl font-bold text-navy-900 mb-2", children: [quote.totalPrice.toLocaleString(), " ", quote.currency] }), _jsxs(Badge, { className: "bg-green-100 text-green-800", children: [_jsx(Clock, { className: "w-4 h-4 mr-1" }), quote.deliveryTime] })] }), _jsxs("div", { className: "space-y-3 pt-4 border-t", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Service:" }), _jsx("span", { className: "font-medium capitalize", children: serviceType })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Route:" }), _jsxs("span", { className: "font-medium", children: ["Yangon \u2192 ", destinationTownship] })] }), serviceType === 'international' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Actual Weight:" }), _jsxs("span", { className: "font-medium", children: [quote.actualWeight, " kg"] })] }), quote.volumetricWeight && quote.volumetricWeight > 0 && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Volumetric Weight:" }), _jsxs("span", { className: "font-medium", children: [quote.volumetricWeight, " kg"] })] })), _jsxs("div", { className: "flex justify-between font-semibold", children: [_jsx("span", { className: "text-gray-900", children: "Chargeable Weight:" }), _jsxs("span", { className: "text-navy-900", children: [quote.chargeableWeight, " kg"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Rate per kg:" }), _jsxs("span", { className: "font-medium", children: [quote.basePrice.toLocaleString(), " ", quote.currency] })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Weight:" }), _jsxs("span", { className: "font-medium", children: [weight, " kg"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Base Rate (1kg):" }), _jsxs("span", { className: "font-medium", children: [quote.basePrice.toLocaleString(), " ", quote.currency] })] }), parseFloat(weight) > 1 && (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-gray-600", children: ["Additional (", (parseFloat(weight) - 1).toFixed(1), "kg):"] }), _jsxs("span", { className: "font-medium", children: [((parseFloat(weight) - 1) * 500).toLocaleString(), " ", quote.currency] })] }))] }))] }), _jsx("div", { className: "pt-4 border-t", children: _jsx(Button, { asChild: true, size: "lg", className: "w-full bg-navy-900 hover:bg-navy-800", children: _jsxs(Link, { to: ROUTE_PATHS.CONTACT, children: ["Book Now", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) }) }), _jsx("p", { className: "text-xs text-gray-500 text-center", children: serviceType === 'domestic'
                                                            ? '*Additional weight charged at 500 MMK/kg after first 1kg'
                                                            : '*International rates based on chargeable weight (greater of actual or volumetric weight). Rates subject to fuel surcharges.' })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Package, { className: "w-16 h-16 text-gray-300 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: "Select service type, destinationTownship, and weight to get your quote" })] })) })] }) })] }) }) }), _jsx("section", { className: "py-20 bg-gray-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: [_jsx(Card, { className: "text-center hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(MapPin, { className: "w-8 h-8 text-blue-600" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Wide Coverage" }), _jsx("p", { className: "text-gray-600", children: "Domestic delivery to all major cities and townships across Myanmar, plus international shipping to 50+ countries." })] }) }), _jsx(Card, { className: "text-center hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Clock, { className: "w-8 h-8 text-green-600" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Fast Delivery" }), _jsx("p", { className: "text-gray-600", children: "Same-day and next-day delivery options for domestic shipments, with express international services available." })] }) }), _jsx(Card, { className: "text-center hover:shadow-lg transition-shadow", children: _jsxs(CardContent, { className: "p-8", children: [_jsx("div", { className: "w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Package, { className: "w-8 h-8 text-gold" }) }), _jsx("h3", { className: "text-xl font-bold text-gray-900 mb-4", children: "Secure Handling" }), _jsx("p", { className: "text-gray-600", children: "Professional packaging, real-time tracking, and insurance options to ensure your shipments arrive safely." })] }) })] }) }) }), _jsx("section", { className: "py-20 bg-navy-900 text-white", children: _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [_jsx("h2", { className: "text-4xl font-bold mb-6", children: "Need a Custom Quote?" }), _jsx("p", { className: "text-xl text-navy-200 mb-8", children: "For bulk shipments, special requirements, or custom solutions, contact our logistics experts directly." }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "bg-white/10 border-white/20 hover:bg-white/20 transition-colors", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Phone, { className: "w-8 h-8 text-gold mx-auto mb-4" }), _jsx("h3", { className: "font-bold mb-2", children: "Call Us" }), _jsx("p", { className: "text-navy-200 mb-4", children: "Speak with our experts" }), _jsx(Button, { asChild: true, variant: "outline", className: "border-gold text-gold hover:bg-gold hover:text-navy-900", children: _jsx("a", { href: "tel:+95989747744", children: "+95-9-89747744" }) })] }) }), _jsx(Card, { className: "bg-white/10 border-white/20 hover:bg-white/20 transition-colors", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Mail, { className: "w-8 h-8 text-gold mx-auto mb-4" }), _jsx("h3", { className: "font-bold mb-2", children: "Email Us" }), _jsx("p", { className: "text-navy-200 mb-4", children: "Get detailed proposals" }), _jsx(Button, { asChild: true, variant: "outline", className: "border-gold text-gold hover:bg-gold hover:text-navy-900", children: _jsx("a", { href: "mailto:info@britiumexpress.com", children: "Send Email" }) })] }) })] })] }) })] }));
}
