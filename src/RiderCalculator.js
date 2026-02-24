import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Package, Truck, Globe, Info, RefreshCw, ChevronRight, Scale, Maximize2, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { springPresets, fadeInUp } from '@/lib/motion';
const RiderCalculator = () => {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    // State for calculator inputs
    const [calcType, setCalcType] = useState('domestic');
    const [fromState, setFromState] = useState('');
    const [toState, setToState] = useState('');
    const [toCountry, setToCountry] = useState('');
    const [weight, setWeight] = useState('');
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [serviceType, setServiceType] = useState('STANDARD');
    // State for results and locations
    const [locations, setLocations] = useState([]);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Fetch Myanmar locations for domestic calculation
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await logisticsAPI.getLocations();
                if (response.success) {
                    setLocations(response.locations);
                }
            }
            catch (err) {
                console.error('Failed to fetch locations', err);
            }
        };
        fetchLocations();
    }, []);
    // Get unique states from locations list
    const states = useMemo(() => {
        const uniqueStates = new Set(locations.map(loc => loc.state_division));
        return Array.from(uniqueStates).sort();
    }, [locations]);
    // Calculate volumetric weight: (L * W * H) / 5000
    const volumetricWeight = useMemo(() => {
        const { length, width, height } = dimensions;
        if (length && width && height) {
            return (parseFloat(length) * parseFloat(width) * parseFloat(height)) / 5000;
        }
        return 0;
    }, [dimensions]);
    // Chargeable weight is the higher of actual weight vs volumetric weight
    const chargeableWeight = useMemo(() => {
        const actualWeight = parseFloat(weight) || 0;
        return Math.max(actualWeight, volumetricWeight);
    }, [weight, volumetricWeight]);
    const handleCalculate = async () => {
        if (calcType === 'domestic' && (!fromState || !toState || !weight)) {
            setError('Please fill in all required fields');
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            if (calcType === 'domestic') {
                const response = await logisticsAPI.calculateShippingRate(fromState, toState, chargeableWeight, serviceType);
                if (response.success) {
                    setResult(response.rate_calculation);
                }
                else {
                    setError(response.rate_calculation.error || 'Failed to calculate rate');
                }
            }
            else {
                // Simulated international calculation logic for prototype purposes
                // In a real app, this would hit an international rates API endpoint
                setTimeout(() => {
                    const baseRate = chargeableWeight * 15;
                    setResult({
                        success: true,
                        base_rate: baseRate,
                        per_kg_rate: 15,
                        weight: chargeableWeight,
                        remote_surcharge: 0,
                        fuel_surcharge_percent: 12,
                        total_cost: baseRate * 1.12,
                        currency: 'USD',
                        service_type: serviceType
                    });
                    setIsLoading(false);
                }, 1000);
                return;
            }
        }
        catch (err) {
            setError('An error occurred during calculation');
        }
        finally {
            if (calcType === 'domestic')
                setIsLoading(false);
        }
    };
    const resetForm = () => {
        setFromState('');
        setToState('');
        setToCountry('');
        setWeight('');
        setDimensions({ length: '', width: '', height: '' });
        setResult(null);
        setError(null);
    };
    return (_jsx("div", { className: "min-h-screen bg-background p-4 lg:p-8 flex flex-col items-center", children: _jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, className: "w-full max-w-4xl space-y-8", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4", children: _jsx(Calculator, { className: "w-8 h-8 text-primary" }) }), _jsx("h1", { className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground font-heading", children: language === 'my' ? 'ပို့ဆောင်ခ တွက်ချက်ခြင်း' : 'Shipping Calculator' }), _jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: language === 'my'
                                ? 'ပို့ဆောင်ခများကို အလွယ်တကူ တွက်ချက်နိုင်ပါသည်။'
                                : 'Calculate domestic and international shipping rates instantly for Britium Express.' })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsxs(Card, { className: "lg:col-span-7 luxury-card overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(Tabs, { value: calcType, onValueChange: (val) => setCalcType(val), className: "w-full", children: _jsxs(TabsList, { className: "grid w-full grid-cols-2 bg-secondary/50", children: [_jsxs(TabsTrigger, { value: "domestic", className: "flex items-center gap-2", children: [_jsx(Truck, { className: "w-4 h-4" }), language === 'my' ? 'ပြည်တွင်း' : 'Domestic'] }), _jsxs(TabsTrigger, { value: "international", className: "flex items-center gap-2", children: [_jsx(Globe, { className: "w-4 h-4" }), language === 'my' ? 'နိုင်ငံတကာ' : 'International'] })] }) }) }), _jsxs(CardContent, { className: "space-y-6 pt-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "fromState", children: language === 'my' ? 'မှ' : 'From State' }), _jsxs(Select, { value: fromState, onValueChange: setFromState, children: [_jsx(SelectTrigger, { id: "fromState", className: "bg-background/50", children: _jsx(SelectValue, { placeholder: language === 'my' ? 'ရွေးချယ်ပါ' : 'Select Origin' }) }), _jsx(SelectContent, { children: states.map((state) => (_jsx(SelectItem, { value: state, children: state }, state))) })] })] }), _jsx("div", { className: "space-y-2", children: calcType === 'domestic' ? (_jsxs(_Fragment, { children: [_jsx(Label, { htmlFor: "toState", children: language === 'my' ? 'သို့' : 'To State' }), _jsxs(Select, { value: toState, onValueChange: setToState, children: [_jsx(SelectTrigger, { id: "toState", className: "bg-background/50", children: _jsx(SelectValue, { placeholder: language === 'my' ? 'ရွေးချယ်ပါ' : 'Select Destination' }) }), _jsx(SelectContent, { children: states.map((state) => (_jsx(SelectItem, { value: state, children: state }, state))) })] })] })) : (_jsxs(_Fragment, { children: [_jsx(Label, { htmlFor: "toCountry", children: "To Country" }), _jsx(Input, { id: "toCountry", placeholder: "e.g. Thailand", value: toCountry, onChange: (e) => setToCountry(e.target.value), className: "bg-background/50" })] })) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "weight", children: language === 'my' ? 'အလေးချိန် (kg)' : 'Weight (kg)' }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "weight", type: "number", placeholder: "0.00", value: weight, onChange: (e) => setWeight(e.target.value), className: "pr-10 bg-background/50" }), _jsx(Scale, { className: "absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "serviceType", children: language === 'my' ? 'ဝန်ဆောင်မှု အမျိုးအစား' : 'Service Type' }), _jsxs(Select, { value: serviceType, onValueChange: setServiceType, children: [_jsx(SelectTrigger, { id: "serviceType", className: "bg-background/50", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "STANDARD", children: "Standard Delivery" }), _jsx(SelectItem, { value: "EXPRESS", children: "Express Delivery" }), _jsx(SelectItem, { value: "SAME_DAY", children: "Same Day (Within City)" })] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Label, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(Maximize2, { className: "w-4 h-4" }), language === 'my' ? 'အရွယ်အစား (cm)' : 'Dimensions (cm) - Optional'] }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx(Input, { placeholder: "L", type: "number", value: dimensions.length, onChange: (e) => setDimensions({ ...dimensions, length: e.target.value }), className: "bg-background/50" }), _jsx(Input, { placeholder: "W", type: "number", value: dimensions.width, onChange: (e) => setDimensions({ ...dimensions, width: e.target.value }), className: "bg-background/50" }), _jsx(Input, { placeholder: "H", type: "number", value: dimensions.height, onChange: (e) => setDimensions({ ...dimensions, height: e.target.value }), className: "bg-background/50" })] }), volumetricWeight > 0 && (_jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-1", children: [_jsx(Info, { className: "w-3 h-3" }), "Volumetric Weight: ", volumetricWeight.toFixed(2), " kg"] }))] }), error && (_jsx(Alert, { variant: "destructive", className: "bg-destructive/10 border-destructive/20", children: _jsx(AlertDescription, { children: error }) })), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { onClick: handleCalculate, disabled: isLoading, className: "flex-1 luxury-button bg-primary text-primary-foreground hover:bg-primary/90 h-12", children: isLoading ? (_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })) : (language === 'my' ? 'တွက်ချက်မည်' : 'Calculate Cost') }), _jsx(Button, { variant: "outline", onClick: resetForm, className: "w-12 h-12 p-0 border-primary/20 hover:bg-primary/5", children: _jsx(RefreshCw, { className: "w-5 h-5 text-primary" }) })] })] })] }), _jsx("div", { className: "lg:col-span-5", children: _jsx(AnimatePresence, { mode: "wait", children: result ? (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: springPresets.gentle, children: _jsxs(Card, { className: "luxury-card border-primary/30 bg-primary/5 h-full overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 right-0 p-4", children: _jsx(Badge, { className: "bg-primary/20 text-primary border-primary/30", children: result.service_type }) }), _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-xl font-heading", children: language === 'my' ? 'ခန့်မှန်းခြေ ကုန်ကျစရိတ်' : 'Estimated Cost' }), _jsx(CardDescription, { children: language === 'my'
                                                            ? `${fromState} မှ ${calcType === 'domestic' ? toState : toCountry} သို့`
                                                            : `From ${fromState} to ${calcType === 'domestic' ? toState : toCountry}` })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col items-center justify-center py-6 bg-background/40 rounded-3xl border border-primary/10", children: [_jsx("span", { className: "text-sm text-muted-foreground uppercase tracking-widest", children: "Total Price" }), _jsxs("div", { className: "flex items-baseline gap-1 mt-2", children: [_jsx("span", { className: "text-4xl lg:text-5xl font-bold text-primary", children: result.total_cost?.toLocaleString() }), _jsx("span", { className: "text-lg font-medium text-primary/70", children: result.currency || 'MMK' })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Chargeable Weight" }), _jsxs("span", { className: "font-medium", children: [result.weight, " kg"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: "Base Rate" }), _jsxs("span", { children: [result.base_rate?.toLocaleString(), " ", result.currency || 'MMK'] })] }), result.fuel_surcharge_percent && (_jsxs("div", { className: "flex justify-between text-sm text-amber-500", children: [_jsxs("span", { children: ["Fuel Surcharge (", result.fuel_surcharge_percent, "%)"] }), _jsxs("span", { children: ["+ ", ((result.base_rate || 0) * (result.fuel_surcharge_percent / 100)).toLocaleString()] })] })), result.remote_surcharge && result.remote_surcharge > 0 && (_jsxs("div", { className: "flex justify-between text-sm text-amber-500", children: [_jsx("span", { children: "Remote Area Fee" }), _jsxs("span", { children: ["+ ", result.remote_surcharge.toLocaleString()] })] })), _jsx(Separator, { className: "bg-primary/10" }), _jsxs("div", { className: "flex justify-between items-center pt-2", children: [_jsx("span", { className: "font-bold", children: "Grand Total" }), _jsxs("span", { className: "text-xl font-bold text-primary", children: [result.total_cost?.toLocaleString(), " ", result.currency || 'MMK'] })] })] }), _jsxs(Button, { className: "w-full bg-primary hover:bg-primary/90 rounded-full h-12 flex items-center justify-center gap-2", children: [language === 'my' ? 'ဘိုကင်တင်ရန် ဆက်သွားမည်' : 'Proceed to Booking', _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] }) }, "result")) : (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "h-full", children: _jsxs(Card, { className: "luxury-card border-dashed border-muted-foreground/20 bg-transparent h-[450px] flex flex-col items-center justify-center text-center p-8", children: [_jsx("div", { className: "w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mb-6", children: _jsx(Package, { className: "w-10 h-10 text-muted-foreground/40" }) }), _jsx("h3", { className: "text-lg font-medium text-muted-foreground", children: language === 'my' ? 'တွက်ချက်ရန် အချက်အလက်များ ဖြည့်သွင်းပါ' : 'Ready to Calculate' }), _jsx("p", { className: "text-sm text-muted-foreground/60 mt-2", children: language === 'my'
                                                    ? 'ဘယ်ဘက်မှ အချက်အလက်များကို ဖြည့်သွင်းပြီး ပို့ဆောင်ခများကို စစ်ဆေးကြည့်ပါ။'
                                                    : 'Fill in the shipment details on the left to see the estimated shipping cost and service options.' })] }) }, "empty")) }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { className: "luxury-card p-6 bg-secondary/20 border-none", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg text-primary", children: _jsx(DollarSign, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Transparent Pricing" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "No hidden fees or extra surcharges." })] })] }) }), _jsx(Card, { className: "luxury-card p-6 bg-secondary/20 border-none", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg text-primary", children: _jsx(Scale, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Accurate Weighing" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Based on weight or volumetric mass." })] })] }) }), _jsx(Card, { className: "luxury-card p-6 bg-secondary/20 border-none", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg text-primary", children: _jsx(Truck, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Fast Processing" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Instant quotes for immediate dispatch." })] })] }) })] })] }) }));
};
export default RiderCalculator;
