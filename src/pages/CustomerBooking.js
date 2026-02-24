import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, Calculator, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useFirebaseAuth';
export default function CustomerBooking() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        receiverName: '',
        receiverPhone: '',
        destinationCity: '',
        destinationTownship: '',
        fullAddress: '',
        weight: 1,
        itemDescription: '',
        serviceType: 'standard',
        codAmount: 0,
        paymentBy: 'sender',
    });
    const [estimatedCost, setEstimatedCost] = useState(0);
    const calculateCost = () => {
        let basePrice = 0;
        // Base price logic
        if (formData.destinationCity === 'yangon') {
            switch (formData.destinationTownship) {
                case 'zone1':
                    basePrice = 2000;
                    break;
                case 'zone2':
                    basePrice = 2500;
                    break;
                case 'zone3':
                    basePrice = 3000;
                    break;
                default:
                    basePrice = 3000;
            }
        }
        else if (formData.destinationCity === 'mandalay') {
            basePrice = 3000;
        }
        else {
            basePrice = 3500;
        }
        // Weight charge (first 1kg free, +500 per extra kg)
        let weightPrice = 0;
        if (formData.weight > 1) {
            weightPrice = (formData.weight - 1) * 500;
        }
        // Service type
        let servicePrice = 0;
        if (formData.serviceType === 'express') {
            servicePrice = 1000;
        }
        const total = basePrice + weightPrice + servicePrice;
        setEstimatedCost(total);
    };
    React.useEffect(() => {
        calculateCost();
    }, [formData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        alert('Order Placed Successfully! Tracking ID: BE-89755');
        navigate(ROUTE_PATHS.CUSTOMER_DASHBOARD);
    };
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    return (_jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate(-1), children: _jsx(ArrowLeft, { className: "w-4 h-4" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Create New Shipment" }), _jsx("p", { className: "text-gray-600", children: "Fill in the details to book your delivery" })] })] }), _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5" }), "Sender Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "senderName", children: "Name / Shop Name" }), _jsx(Input, { id: "senderName", value: user?.full_name || 'Kyaw Wannanna', readOnly: true, className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "senderPhone", children: "Phone Number" }), _jsx(Input, { id: "senderPhone", value: user?.phone || '09897447744', readOnly: true, className: "bg-gray-50" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "pickupAddress", children: "Pickup Address" }), _jsx(Textarea, { id: "pickupAddress", rows: 2, defaultValue: "No. 277, Corner of Anawrahta Road, East Dagon Township" })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5" }), "Receiver Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "receiverName", children: "Receiver Name" }), _jsx(Input, { id: "receiverName", placeholder: "Enter Name", value: formData.receiverName, onChange: (e) => handleInputChange('receiverName', e.target.value), required: true })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "receiverPhone", children: "Receiver Phone" }), _jsx(Input, { id: "receiverPhone", placeholder: "09xxxxxxxxx", value: formData.receiverPhone, onChange: (e) => handleInputChange('receiverPhone', e.target.value), required: true })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "destinationCity", children: "Destination City" }), _jsxs(Select, { value: formData.destinationCity, onValueChange: (value) => handleInputChange('destinationCity', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select City" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "yangon", children: "Yangon" }), _jsx(SelectItem, { value: "mandalay", children: "Mandalay" }), _jsx(SelectItem, { value: "naypyitaw", children: "Nay Pyi Taw" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "destinationTownship", children: "Township (Zone)" }), _jsxs(Select, { value: formData.destinationTownship, onValueChange: (value) => handleInputChange('destinationTownship', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Township" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "zone1", children: "Zone 1: Downtown (2000 MMK)" }), _jsx(SelectItem, { value: "zone2", children: "Zone 2: Inner City (2500 MMK)" }), _jsx(SelectItem, { value: "zone3", children: "Zone 3: New Towns (3000 MMK)" })] })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "fullAddress", children: "Full Address" }), _jsx(Input, { id: "fullAddress", placeholder: "Street name, Building No, Floor", value: formData.fullAddress, onChange: (e) => handleInputChange('fullAddress', e.target.value), required: true })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-5 h-5" }), "Package & Service"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "weight", children: "Weight (Kg)" }), _jsx(Input, { id: "weight", type: "number", min: "0.5", step: "0.5", value: formData.weight, onChange: (e) => handleInputChange('weight', parseFloat(e.target.value)) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "itemDescription", children: "Items Description" }), _jsx(Input, { id: "itemDescription", placeholder: "e.g. Clothes, Document", value: formData.itemDescription, onChange: (e) => handleInputChange('itemDescription', e.target.value) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "serviceType", children: "Service Type" }), _jsxs(Select, { value: formData.serviceType, onValueChange: (value) => handleInputChange('serviceType', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "standard", children: "Standard (1-2 Days)" }), _jsx(SelectItem, { value: "express", children: "Priority (Same Day)" })] })] })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "codAmount", className: "text-red-600 font-bold", children: "COD Amount (To Collect)" }), _jsxs("div", { className: "flex", children: [_jsx("span", { className: "inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md", children: "MMK" }), _jsx(Input, { id: "codAmount", type: "number", placeholder: "0", className: "rounded-l-none", value: formData.codAmount, onChange: (e) => handleInputChange('codAmount', parseFloat(e.target.value) || 0) })] }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Leave 0 if item is already paid." })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "paymentBy", children: "Who Pays Shipping?" }), _jsxs(Select, { value: formData.paymentBy, onValueChange: (value) => handleInputChange('paymentBy', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "sender", children: "Sender (Pre-paid)" }), _jsx(SelectItem, { value: "receiver", children: "Receiver (Collect on Delivery)" })] })] })] })] })] })] })] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs(Card, { className: "sticky top-6", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "w-5 h-5" }), "Order Summary"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Base Rate" }), _jsx("span", { children: formData.destinationCity ? `${estimatedCost - (formData.weight > 1 ? (formData.weight - 1) * 500 : 0) - (formData.serviceType === 'express' ? 1000 : 0)} MMK` : '--' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Weight Charge" }), _jsx("span", { children: formData.weight > 1 ? `${(formData.weight - 1) * 500} MMK` : '0 MMK' })] }), _jsxs("div", { className: "flex justify-between text-green-600", children: [_jsx("span", { children: "Pickup Fee" }), _jsx("span", { children: "FREE" })] }), formData.serviceType === 'express' && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Express Service" }), _jsx("span", { children: "1,000 MMK" })] }))] }), _jsx(Separator, {}), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-gray-500 uppercase font-bold", children: "Total Estimated Cost" }), _jsxs("p", { className: "text-3xl font-bold text-gold", children: [estimatedCost.toLocaleString(), " ", _jsx("span", { className: "text-sm", children: "MMK" })] })] }), _jsxs(Button, { type: "submit", className: "w-full bg-gold hover:bg-gold/90 text-navy-900 font-bold py-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 mr-2" }), "CONFIRM BOOKING"] }), _jsx("p", { className: "text-center text-sm text-gray-500", children: "Rider will be assigned within 30 mins." })] })] }) })] }) })] }));
}
