import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, AlertCircle, User, MapPin, DollarSign, Image as ImageIcon, Search } from 'lucide-react';
import { ROUTE_PATHS, MOCK_TOWNSHIPS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
const springPresets = {
    gentle: {
        type: "spring",
        stiffness: 100,
        damping: 15,
    },
};
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const registrationSchema = z.object({
    senderName: z.string().min(2, 'Sender name is required'),
    senderPhone: z.string().min(8, 'Valid sender phone is required'),
    receiverName: z.string().min(2, 'Receiver name is required'),
    receiverPhone: z.string().min(8, 'Valid receiver phone is required'),
    receiverAddress: z.string().min(10, 'Full address is required'),
    receiverTownship: z.string().min(1, 'Township is mandatory'),
    serviceType: z.enum(['standard', 'express']),
    codRequired: z.boolean().default(false),
    codAmount: z.number().optional().nullable(),
    weight: z.number().min(0.1, 'Weight must be at least 0.1kg').optional(),
});
export default function ShipmentRegistration() {
    const { ttId } = useParams();
    const navigate = useNavigate();
    const { user, legacyUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [provisionalData, setProvisionalData] = useState(null);
    const form = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            serviceType: 'standard',
            codRequired: false,
            receiverTownship: '',
        },
    });
    useEffect(() => {
        // In a real app, fetch the provisional record using ttId
        // Mocking the data that would come from the rider's pickup
        const mockProvisional = {
            tamperTagId: ttId,
            pieces: 1,
            type: 'box',
            condition: 'OK',
            riderId: 'RDR-001',
            createdAt: new Date().toISOString(),
            photos: [
                'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400',
                'https://images.unsplash.com/photo-1559941727-6fb446e7e8ae?w=400',
                'https://images.unsplash.com/photo-1618381297523-e6c0ab13a5b2?w=400'
            ]
        };
        setProvisionalData(mockProvisional);
    }, [ttId]);
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            const awb = `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;
            toast.success(`Shipment Registered Successfully!`, {
                description: `AWB ${awb} has been linked to Tamper Tag ${ttId}`,
            });
            navigate(ROUTE_PATHS.OFFICE.QUEUE);
        }
        catch (error) {
            toast.error("Registration Failed", {
                description: "Please check all fields and try again."
            });
        }
        finally {
            setLoading(false);
        }
    };
    if (!provisionalData)
        return _jsx("div", { className: "flex items-center justify-center h-screen", children: "Loading Record..." });
    return (_jsxs(motion.div, { initial: "hidden", animate: "visible", variants: fadeInUp, transition: springPresets.gentle, className: "max-w-5xl mx-auto p-4 md:p-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate(-1), children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Shipment Registration" }), _jsxs("p", { className: "text-muted-foreground", children: ["Tamper Tag: ", _jsx("span", { className: "font-mono font-bold text-primary", children: ttId })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => navigate(-1), children: "Cancel" }), _jsx(Button, { onClick: form.handleSubmit(onSubmit), disabled: loading, className: "bg-primary", children: loading ? "Registering..." : _jsxs(_Fragment, { children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), " Complete Registration"] }) })] })] }), _jsxs(Alert, { className: "mb-8 border-primary/20 bg-primary/5", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-primary" }), _jsx(AlertTitle, { className: "text-primary font-semibold", children: "DES Verification Required" }), _jsx(AlertDescription, { className: "text-primary/80", children: "Please verify Tamper Tag visibility and parcel condition from the pickup photos before submitting." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-8", children: [_jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(User, { className: "h-5 w-5 text-primary" }), "Sender Information"] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Sender Name" }), _jsx(Input, { ...form.register('senderName'), placeholder: "Full Name", className: "input-modern" }), form.formState.errors.senderName && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.senderName.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Sender Phone" }), _jsx(Input, { ...form.register('senderPhone'), placeholder: "09...", className: "input-modern" }), form.formState.errors.senderPhone && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.senderPhone.message }))] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-primary" }), "Delivery Information"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Receiver Name" }), _jsx(Input, { ...form.register('receiverName'), placeholder: "Full Name", className: "input-modern" }), form.formState.errors.receiverName && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.receiverName.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Receiver Phone" }), _jsx(Input, { ...form.register('receiverPhone'), placeholder: "09...", className: "input-modern" }), form.formState.errors.receiverPhone && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.receiverPhone.message }))] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Full Address" }), _jsx(Input, { ...form.register('receiverAddress'), placeholder: "Street, No, Building, Room...", className: "input-modern" }), form.formState.errors.receiverAddress && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.receiverAddress.message }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Township" }), _jsxs(Select, { onValueChange: (val) => form.setValue('receiverTownship', val), value: form.watch('receiverTownship'), children: [_jsx(SelectTrigger, { className: "input-modern", children: _jsx(SelectValue, { placeholder: "Select Township" }) }), _jsx(SelectContent, { children: MOCK_TOWNSHIPS.map(t => (_jsx(SelectItem, { value: t, children: t }, t))) })] }), form.formState.errors.receiverTownship && (_jsx("p", { className: "text-xs text-destructive", children: form.formState.errors.receiverTownship.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Service Type" }), _jsxs(Select, { onValueChange: (val) => form.setValue('serviceType', val), defaultValue: "standard", children: [_jsx(SelectTrigger, { className: "input-modern", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "standard", children: "Standard Delivery" }), _jsx(SelectItem, { value: "express", children: "Express (Same Day)" })] })] })] })] })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(DollarSign, { className: "h-5 w-5 text-primary" }), "COD & Payments"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "codRequired", checked: form.watch('codRequired'), onCheckedChange: (checked) => form.setValue('codRequired', checked) }), _jsx(Label, { htmlFor: "codRequired", className: "font-medium", children: "Cash on Delivery (COD)" })] }), form.watch('codRequired') && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "space-y-2 pt-2", children: [_jsx(Label, { children: "COD Amount (MMK)" }), _jsx(Input, { type: "number", placeholder: "0.00", className: "input-modern font-mono text-lg", ...form.register('codAmount', { valueAsNumber: true }) })] }))] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "card-modern overflow-hidden", children: [_jsx(CardHeader, { className: "bg-muted/30", children: _jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [_jsx(ImageIcon, { className: "h-4 w-4 text-primary" }), "Pickup Evidence"] }) }), _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "grid grid-cols-2 gap-2", children: provisionalData.photos?.map((photo, i) => (_jsx("div", { className: "aspect-square rounded-lg bg-muted overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity", onClick: () => window.open(photo, '_blank'), children: _jsx("img", { src: photo, alt: `Evidence ${i}`, className: "w-full h-full object-cover" }) }, i))) }), _jsxs("div", { className: "mt-4 p-3 bg-muted/50 rounded-lg text-xs space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "text-muted-foreground", children: "Pieces:" }), " ", provisionalData.pieces] }), _jsxs("p", { children: [_jsx("span", { className: "text-muted-foreground", children: "Type:" }), " ", provisionalData.type?.toUpperCase()] }), _jsxs("p", { children: [_jsx("span", { className: "text-muted-foreground", children: "Condition:" }), " ", _jsx("span", { className: "font-bold text-success", children: provisionalData.condition })] }), _jsxs("p", { children: [_jsx("span", { className: "text-muted-foreground", children: "Rider:" }), " ", provisionalData.riderId] }), _jsxs("p", { children: [_jsx("span", { className: "text-muted-foreground", children: "Time:" }), " ", new Date(provisionalData.createdAt || '').toLocaleString()] })] })] })] }), _jsxs(Card, { className: "card-modern border-primary/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm font-semibold", children: "Summary" }) }), _jsxs(CardContent, { className: "space-y-4 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Base Fare" }), _jsx("span", { className: "font-mono", children: "3,500 MMK" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Service Fee" }), _jsxs("span", { className: "font-mono", children: [form.watch('serviceType') === 'express' ? '1,500' : '0', " MMK"] })] }), _jsx(Separator, {}), _jsxs("div", { className: "flex justify-between font-bold text-lg text-primary", children: [_jsx("span", { children: "Total Cost" }), _jsxs("span", { className: "font-mono", children: [form.watch('serviceType') === 'express' ? '5,000' : '3,500', " MMK"] })] })] }), _jsx(CardFooter, { className: "bg-muted/10 p-4", children: _jsx(Button, { className: "w-full", onClick: form.handleSubmit(onSubmit), disabled: loading, children: loading ? "Saving..." : "Finalize Registration" }) })] }), _jsxs("div", { className: "p-4 rounded-xl border border-dashed border-muted-foreground/30 text-center", children: [_jsx(Search, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground/50" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Duplicates check: System will verify phone & address combination upon submission." })] })] })] })] }));
}
