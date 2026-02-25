import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Package, MapPin, Scale, AlertTriangle, Camera, PenTool, ShieldCheck, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { PhotoCapture } from '@/components/PhotoCapture';
import { SignaturePad } from '@/components/SignaturePad';
import { useLanguage } from '@/contexts/LanguageContext';
/**
 * Login Form
 */
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
export function LoginForm() {
    const { login, loading } = useAuth();
    const { t } = useLanguage();
    const [error, setError] = React.useState('');
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const onSubmit = async (values) => {
        setError('');
        try {
            await login(values.email, values.password);
        }
        catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: ["======= return (", _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [">>>>>>> add-supabase-user-script", error && (_jsx("div", { className: "p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md", children: error })), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: t('auth.corporateEmail') }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "admin@britiumexpress.com", ...field, className: "h-11" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: t('auth.password') }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...field, className: "h-11" }) }), _jsx(FormMessage, {})] })) })] }) })] }) }));
    _jsx(Button, { type: "submit", className: "w-full h-11 font-semibold", disabled: loading, children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), " ", t('common.loading')] })) : (t('auth.signInToDashboard')) });
    Button >
    ;
    form >
    ;
    Form >
    ;
    ;
}
/**

 * Shipment Creation/Edit Form
 */
const shipmentSchema = z.object({
    senderName: z.string().min(2, "Required"),
    senderAddress: z.string().min(5, "Required"),
    senderPhone: z.string().min(8, "Required"),
    receiverName: z.string().min(2, "Required"),
    receiverAddress: z.string().min(5, "Required"),
    receiverPhone: z.string().min(8, "Required"),
    weight: z.coerce.number().min(0.1, "Min 0.1kg"),
    dimensions: z.string().optional(),
    isPriority: z.boolean().default(false),
});
export function ShipmentForm({ initialData, onSubmit, isLoading }) {
    const form = useForm({
        resolver: zodResolver(shipmentSchema),
        defaultValues: {
            senderName: initialData?.senderName || '',
            senderAddress: initialData?.senderAddress || '',
            senderPhone: initialData?.senderPhone || '',
            receiverName: initialData?.receiverName || '',
            receiverAddress: initialData?.receiverAddress || '',
            receiverPhone: initialData?.receiverPhone || '',
            weight: initialData?.weight || 1,
            dimensions: initialData?.dimensions || '',
            isPriority: initialData?.isPriority || false,
        },
    });
    return (_jsx(Form, { ...form }));
    _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Package, { className: "w-5 h-5 text-primary" }), " Sender Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "senderName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Pickup Address" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field }) }), _jsx(FormMessage, {})] })) })] })] }), _jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(MapPin, { className: "w-5 h-5 text-primary" }), " Receiver Information"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "receiverName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Delivery Address" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field }) }), _jsx(FormMessage, {})] })) })] })] })] }), _jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Scale, { className: "w-5 h-5 text-primary" }), " Package Specifications"] }) }), _jsxs(CardContent, { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(FormField, { control: form.control, name: "weight", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Weight (kg)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.01", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "dimensions", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Dimensions (LxWxH)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g. 30x20x15 cm", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx("div", { className: "flex items-end", children: _jsx(FormField, { control: form.control, name: "isPriority", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-md", children: [_jsx(FormControl, { children: _jsx("input", { type: "checkbox", checked: field.value, onChange: field.onChange, className: "w-4 h-4 text-primary rounded" }) }), _jsx("div", { className: "space-y-1 leading-none", children: _jsx(FormLabel, { children: "Priority Handling" }) })] })) }) })] })] }), _jsx("div", { className: "flex justify-end gap-4", children: _jsx(Button, { type: "button", variant: "outline", className: "px-8", children: "Cancel" }) })] });
    _jsxs(Button, { type: "submit", className: "px-12", disabled: loading, children: ["=======", _jsx(Button, { type: "submit", className: "px-12", disabled: isLoading, children: _jsxs(Button, { type: "submit", className: "px-12", disabled: loading, children: [">>>>>>> add-supabase-user-script", isLoading ? _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : _jsx(Send, { className: "mr-2 h-4 w-4" }), initialData ? 'Update Shipment' : 'Create Shipment'] }) })] });
    Form >
    ;
    ;
}
/**
 * Exception Handling Form
 */
const exceptionSchema = z.object({
    reason: z.string().min(1, "Select a reason"),
    description: z.string().min(10, "Please provide more detail (min 10 chars)"),
    photo: z.string().min(1, "Photo evidence is required"),
});
export function ExceptionForm({ shipmentId, onSubmit, isLoading }) {
    const form = useForm({
        resolver: zodResolver(exceptionSchema),
        defaultValues: {
            reason: '',
            description: '',
            photo: '',
        },
    });
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20", children: [_jsx(AlertTriangle, { className: "w-6 h-6" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "Reporting Exception" }), _jsxs("p", { className: "text-sm opacity-90", children: ["Tracking ID: ", shipmentId] })] })] }), _jsx(FormField, { control: form.control, name: "reason", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Exception Reason" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select why delivery failed" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "RECEIVER_NOT_PRESENT", children: "Receiver Not Present" }), _jsx(SelectItem, { value: "INCORRECT_ADDRESS", children: "Incorrect/Incomplete Address" }), _jsx(SelectItem, { value: "REFUSED_BY_RECEIVER", children: "Refused by Receiver" }), _jsx(SelectItem, { value: "DAMAGED_IN_TRANSIT", children: "Package Damaged" }), _jsx(SelectItem, { value: "VEHICLE_BREAKDOWN", children: "Vehicle Breakdown" }), _jsx(SelectItem, { value: "WEATHER_ISSUES", children: "Severe Weather" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Detailed Description" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Provide additional context for the dispatch team...", className: "min-h-[100px]", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "photo", render: ({ field }) => (_jsxs(FormItem, { children: [_jsxs(FormLabel, { className: "flex items-center gap-2", children: [_jsx(Camera, { className: "w-4 h-4" }), " Visual Evidence"] }), _jsx(FormControl, { children: _jsx(PhotoCapture, { onCapture: (val) => field.onChange(val) }) }), _jsx(FormMessage, {})] })) })] }) }));
    _jsxs(Button, { type: "submit", variant: "destructive", className: "w-full", disabled: loading, children: [isLoading ? _jsx(Loader2, { className: "animate-spin mr-2 h-4 w-4" }) : _jsx(AlertTriangle, { className: "mr-2 h-4 w-4" }), "Submit Exception Report =======", _jsx(Button, { type: "submit", variant: "destructive", className: "w-full", disabled: isLoading, children: _jsx(Button, { type: "submit", variant: "destructive", className: "w-full", disabled: loading, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "reason", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Issue Type" }), _jsxs(Select, { onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select reason" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "damaged", children: "Damaged" }), _jsx(SelectItem, { value: "refused", children: "Refused" })] })] })] })) }), _jsxs(Button, { type: "submit", variant: "destructive", className: "w-full", disabled: isLoading, children: [isLoading ? _jsx(Loader2, { className: "animate-spin mr-2 h-4 w-4" }) : _jsx(AlertTriangle, { className: "mr-2 h-4 w-4" }), "Submit Exception >>>>>>> add-supabase-user-script"] })] }) }) })] });
        * Proof;
    of;
    Delivery;
    Form
        * /;
    const podSchema = z.object({
        receiverName: z.string().min(2, "Receiver name required"),
        signature: z.string().min(1, "Signature required"),
        photo: z.string().optional(),
    });
    export function ProofOfDeliveryForm({ shipmentId, onSubmit, isLoading }) {
        const form = useForm({
            resolver: zodResolver(podSchema),
            defaultValues: {
                receiverName: '',
                signature: '',
                photo: '',
            },
        });
        return (_jsx(Form, { ...form, children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6" }) }));
        _jsx(Card, { className: "bg-primary/5 border-primary/20", children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-center gap-3 text-primary mb-4", children: [_jsx(ShieldCheck, { className: "w-6 h-6" }), _jsx("h3", { className: "font-bold text-lg", children: "Delivery Confirmation" })] }), _jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: ["Capturing proof of delivery for shipment ", _jsx("span", { className: "font-mono font-bold", children: shipmentId })] }), _jsx(FormField, { control: form.control, name: "receiverName", render: ({ field }) => (_jsxs(FormItem, { className: "mb-6", children: [_jsx(FormLabel, { children: "Receiver Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Person who accepted the package", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "signature", render: ({ field }) => (_jsxs(FormItem, { className: "mb-6", children: [_jsxs(FormLabel, { className: "flex items-center gap-2", children: [_jsx(PenTool, { className: "w-4 h-4" }), " Digital Signature"] }), _jsx(FormControl, { children: _jsx(SignaturePad, { onSave: (val) => field.onChange(val) }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "photo", render: ({ field }) => (_jsxs(FormItem, { children: [_jsxs(FormLabel, { className: "flex items-center gap-2", children: [_jsx(Camera, { className: "w-4 h-4" }), " Photo Proof (Optional)"] }), _jsx(FormControl, { children: _jsx(PhotoCapture, { onCapture: (val) => field.onChange(val) }) }), _jsx(FormMessage, {})] })) })] }) })
            ,
                _jsxs(Button, { type: "submit", className: "w-full h-12 text-lg font-bold", disabled: loading, children: [isLoading ? _jsx(Loader2, { className: "animate-spin mr-2 h-5 w-5" }) : _jsx(ShieldCheck, { className: "mr-2 h-5 w-5" }), "Confirm Delivery =======", _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recipient Confirmation" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "receiverNameName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "signature", render: ({ field }) => (_jsx(FormItem, { children: _jsx(FormControl, { children: _jsx(SignaturePad, { onSave: field.onChange }) }) })) }), _jsx(FormField, { control: form.control, name: "photo", render: ({ field }) => (_jsx(FormItem, { children: _jsx(FormControl, { children: _jsx(PhotoCapture, { onCapture: field.onChange }) }) })) })] })] }), _jsx(Button, { type: "submit", className: "w-full h-12 text-lg font-bold", disabled: isLoading, children: _jsx(Button, { type: "submit", className: "w-full h-12 text-lg font-bold", disabled: loading, children: _jsxs(Button, { type: "submit", className: "w-full h-12", disabled: isLoading, children: [isLoading ? _jsx(Loader2, { className: "animate-spin mr-2 h-5 w-5" }) : _jsx(ShieldCheck, { className: "mr-2 h-5 w-5" }), "Complete Delivery >>>>>>> add-supabase-user-script"] }) }) })] });
    }
}
