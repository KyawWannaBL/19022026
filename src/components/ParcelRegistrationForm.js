import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Package, MapPin, User, Scale, Info, CheckCircle2, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { generateTrackingNumber, SHIPMENT_STATUS } from '@/lib/index.ts';
const parcelSchema = z.object({
    senderName: z.string().min(2, 'Sender name is required'),
    senderPhone: z.string().min(8, 'Valid phone number is required'),
    senderAddress: z.string().min(5, 'Full address is required'),
    receiverName: z.string().min(2, 'Receiver name is required'),
    receiverPhone: z.string().min(8, 'Valid phone number is required'),
    receiverAddress: z.string().min(5, 'Delivery address is required'),
    weight: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Weight must be a positive number',
    }),
    parcelType: z.enum(['DOCUMENT', 'PARCEL', 'FRAGILE', 'HEAVY']),
    priority: z.boolean().default(false),
    codAmount: z.string().optional(),
    notes: z.string().optional(),
});
export function ParcelRegistrationForm({ userType, onParcelCreated }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(parcelSchema),
        defaultValues: {
            senderName: '',
            senderPhone: '',
            senderAddress: '',
            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            weight: '1.0',
            parcelType: 'PARCEL',
            priority: false,
            codAmount: '0',
            notes: '',
        },
    });
    async function onSubmit(values) {
        setIsSubmitting(true);
        try {
            // Simulate backend processing and wayplan generation
            await new Promise(resolve => setTimeout(resolve, 1500));
            const newParcel = {
                id: `SHIP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                awb_number: generateTrackingNumber(),
                status: SHIPMENT_STATUS.PENDING,
                createdAt: new Date().toISOString(),
                user_type: userType,
                ...values,
                // Auto-assigned metadata for backend simulation
                assigned_rider: 'Pending Assignment',
                assigned_vehicle: 'Calculating Route...',
                estimated_delivery: new Date(Date.now() + 86400000 * 2).toISOString(), // +2 days
            };
            toast.success('Parcel registered successfully!', {
                description: `Tracking ID: ${newParcel.awb_number}`,
                icon: _jsx(CheckCircle2, { className: "h-5 w-5 text-luxury-gold" }),
            });
            if (onParcelCreated) {
                onParcelCreated(newParcel);
            }
            form.reset();
        }
        catch (error) {
            toast.error('Failed to register parcel. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsxs(Card, { className: "luxury-card border-none shadow-luxury bg-card/50 backdrop-blur-sm overflow-hidden", children: [_jsx(CardHeader, { className: "border-b border-border/40 pb-6", children: _jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 rounded-xl bg-primary/10", children: _jsx(Package, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-2xl font-heading", children: "Parcel Registration" }), _jsxs(CardDescription, { className: "text-muted-foreground", children: ["Register a new ", userType, " pickup order for ", new Date().getFullYear(), " delivery cycle"] })] })] }) }), _jsx(CardContent, { className: "pt-8", children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider", children: [_jsx(User, { className: "h-4 w-4" }), "Sender Details"] }), _jsx(FormField, { control: form.control, name: "senderName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter sender name", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "+1 (555) 000-0000", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pickup Address" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Enter full pickup address", ...field, className: "bg-background/50 min-h-[100px]" }) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider", children: [_jsx(MapPin, { className: "h-4 w-4" }), "Receiver Details"] }), _jsx(FormField, { control: form.control, name: "receiverName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Recipient Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter receiverName name", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "+1 (555) 000-0000", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Delivery Address" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Enter full delivery address", ...field, className: "bg-background/50 min-h-[100px]" }) }), _jsx(FormMessage, {})] })) })] })] }), _jsxs("div", { className: "pt-6 border-t border-border/40", children: [_jsxs("div", { className: "flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4", children: [_jsx(Info, { className: "h-4 w-4" }), "Package Specifications"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(FormField, { control: form.control, name: "weight", render: ({ field }) => (_jsxs(FormItem, { children: [_jsxs(FormLabel, { className: "flex items-center gap-2", children: [_jsx(Scale, { className: "h-3 w-3" }), " Weight (kg)"] }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.1", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "parcelType", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Package Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "bg-background/50", children: _jsx(SelectValue, { placeholder: "Select type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "PARCEL", children: "Standard Parcel" }), _jsx(SelectItem, { value: "DOCUMENT", children: "Document" }), _jsx(SelectItem, { value: "FRAGILE", children: "Fragile Item" }), _jsx(SelectItem, { value: "HEAVY", children: "Heavy Cargo" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "codAmount", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "COD Amount (Optional)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "0.00", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) })] }), _jsx("div", { className: "mt-6 flex flex-wrap gap-6 items-center", children: _jsx(FormField, { control: form.control, name: "priority", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background/30", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }), _jsxs("div", { className: "space-y-1 leading-none", children: [_jsx(FormLabel, { className: "text-sm font-medium leading-none", children: "Express Delivery" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Prioritize this shipment for faster routing" })] })] })) }) })] }), _jsx("div", { className: "pt-6", children: _jsx(FormField, { control: form.control, name: "notes", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Special Instructions" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Any additional notes for the rider or driver...", ...field, className: "bg-background/50" }) }), _jsx(FormMessage, {})] })) }) }), _jsx(Button, { type: "submit", className: "w-full luxury-button py-6 text-sm flex items-center justify-center gap-2", disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Registering Parcel..."] })) : ('Generate Waybill & QR Label') })] }) }) })] }));
}
