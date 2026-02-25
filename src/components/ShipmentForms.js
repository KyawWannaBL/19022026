import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Package, User, Phone, MapPin, PoundSterling, Info, Save, ShieldCheck } from 'lucide-react';
import { useEnterpriseBranches } from '@/hooks/useEnterpriseBranches';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const shipmentSchema = z.object({
    senderName: z.string().min(2, 'Sender name is required'),
    senderPhone: z.string().min(10, 'Valid phone number required'),
    senderAddress: z.string().min(5, 'Detailed address is required'),
    senderCity: z.string().min(2, 'City is required'),
    receiverName: z.string().min(2, 'Receiver name is required'),
    receiverPhone: z.string().min(10, 'Valid phone number required'),
    receiverAddress: z.string().min(5, 'Detailed address is required'),
    receiverCity: z.string().min(2, 'City is required'),
    weight: z.coerce.number().min(0.1, 'Minimum weight is 0.1kg'),
    price: z.coerce.number().min(0, 'Invalid price'),
    codAmount: z.coerce.number().min(0, 'Invalid COD amount').default(0),
    branchId: z.string().min(1, 'Please select a processing branch'),
    notes: z.string().optional(),
});
export function CreateShipmentForm({ onSubmit }) {
    const form = useForm({
        resolver: zodResolver(shipmentSchema),
        defaultValues: {
            senderName: '',
            senderPhone: '',
            senderAddress: '',
            senderCity: '',
            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            receiverCity: '',
            weight: 1.0,
            price: 0,
            codAmount: 0,
            branchId: '',
            notes: '',
        },
    });
    const { data: branches = [], isLoading: branchesLoading } = useEnterpriseBranches();
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg text-primary", children: _jsx(User, { size: 18 }) }), "Sender Information"] }), _jsx(CardDescription, { children: "Origin details for the shipment" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "senderName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g. John Doe", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10", placeholder: "+44 ...", ...field })] }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "senderCity", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "City" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "London", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "senderAddress", render: ({ field }) => (_jsxs(FormItem, { className: "col-span-1", children: [_jsx(FormLabel, { children: "Street Address" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "123 Lane", ...field }) }), _jsx(FormMessage, {})] })) })] })] })] }), _jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx("div", { className: "p-2 bg-accent/10 rounded-lg text-accent-foreground", children: _jsx(MapPin, { size: 18 }) }), "Receiver Information"] }), _jsx(CardDescription, { children: "Destination details for the shipment" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "receiverName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g. Jane Smith", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10", placeholder: "+44 ...", ...field })] }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "receiverCity", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "City" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Manchester", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "receiverAddress", render: ({ field }) => (_jsxs(FormItem, { className: "col-span-1", children: [_jsx(FormLabel, { children: "Street Address" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "456 Road", ...field }) }), _jsx(FormMessage, {})] })) })] })] })] })] }), _jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx("div", { className: "p-2 bg-primary/10 rounded-lg text-primary", children: _jsx(Package, { size: 18 }) }), "Shipment Specifications"] }), _jsx(CardDescription, { children: "Weight, pricing, and branch assignment" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(FormField, { control: form.control, name: "weight", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Weight (kg)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.1", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "price", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Delivery Fee (\u00A3)" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(PoundSterling, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10", type: "number", step: "0.01", ...field })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "codAmount", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "COD Amount (\u00A3)" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(ShieldCheck, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { className: "pl-10", type: "number", step: "0.01", ...field })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "branchId", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Processing Branch" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Branch" }) }) }), _jsx(SelectContent, {})] })] })) })] }) })] })] }) }));
    {
        branches.map((branch) => (_jsxs(SelectItem, { value: branch.id, children: [branch.name, " (", branch.code, ")"] }, branch.id)));
    }
    SelectContent >
    ;
    Select >
        _jsx(FormMessage, {});
    FormItem >
    ;
}
/>;
div >
    _jsx("div", { className: "mt-6", children: _jsx(FormField, { control: form.control, name: "notes", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Special Instructions / Notes" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Add any special handling instructions or notes for the rider...", className: "min-h-[100px]", ...field }) }), _jsx(FormMessage, {})] })) }) });
CardContent >
;
Card >
    _jsxs("div", { className: "flex justify-end gap-4 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => form.reset(), children: "Clear Form" }), _jsxs(Button, { type: "submit", className: "bg-primary text-primary-foreground", children: [_jsx(Package, { className: "mr-2 h-4 w-4" }), "Create Shipment"] })] });
form >
;
Form >
;
;
export function EditShipmentForm({ initialData, onSubmit }) {
    const form = useForm({
        resolver: zodResolver(shipmentSchema),
        defaultValues: {
            senderName: initialData.senderName,
            senderPhone: initialData.senderPhone,
            senderAddress: initialData.senderAddress,
            senderCity: initialData.senderCity,
            receiverName: initialData.receiverName,
            receiverPhone: initialData.receiverPhone,
            receiverAddress: initialData.receiverAddress,
            receiverCity: initialData.receiverCity,
            weight: initialData.weight,
            price: initialData.price,
            codAmount: initialData.codAmount,
            branchId: initialData.branchId,
            notes: initialData.notes || '',
        },
    });
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-muted rounded-lg border border-border mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-primary/20 text-primary p-2 rounded-full", children: _jsx(Info, { size: 20 }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-foreground", children: "Editing Shipment" }), _jsx("p", { className: "text-xs text-muted-foreground font-mono", children: initialData.awb })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: "text-xs font-semibold px-2 py-1 bg-secondary rounded text-secondary-foreground uppercase tracking-wider", children: initialData.status.replace('_', ' ') }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-4", children: _jsx(CardTitle, { className: "text-base", children: "Sender & Origin" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "senderName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "senderPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "senderAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Address" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-4", children: _jsx(CardTitle, { className: "text-base", children: "Receiver & Destination" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "receiverName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "receiverPhone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "receiverAddress", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Address" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) })] })) })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-4", children: _jsx(CardTitle, { className: "text-base", children: "Logistics & Financials" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(FormField, { control: form.control, name: "weight", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Weight (kg)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.1", ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "price", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Fee (\u00A3)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.01", ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "codAmount", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "COD (\u00A3)" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", step: "0.01", ...field }) })] })) })] }), _jsx("div", { className: "mt-4", children: _jsx(FormField, { control: form.control, name: "notes", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Notes" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field }) })] })) }) })] })] }), _jsx("div", { className: "flex justify-end gap-3", children: _jsxs(Button, { type: "submit", className: "w-full md:w-auto", children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Update Shipment Details"] }) })] }) }));
}
