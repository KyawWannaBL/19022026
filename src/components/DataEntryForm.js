import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
export default function DataEntryForm() {
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('Yangon');
    const [busy, setBusy] = useState(false);
    const detectedCity = useMemo(() => {
        const lower = address.toLowerCase();
        if (lower.includes('mandalay') || lower.includes('mdy'))
            return 'Mandalay';
        if (lower.includes('naypyidaw') || lower.includes('npw') || lower.includes('nay pyi taw'))
            return 'Naypyidaw';
        if (lower.includes('yangon') || lower.includes('ygn'))
            return 'Yangon';
        return city;
    }, [address, city]);
    const submit = async (e) => {
        e.preventDefault();
        if (busy)
            return;
        setBusy(true);
        try {
            console.log('Order Data:', {
                customerName: customerName.trim(),
                address: address.trim(),
                city: detectedCity,
                status: 'PENDING',
                createdAt: new Date().toISOString(),
            });
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            toast.success(`Order registered locally for ${detectedCity}`);
            setCustomerName('');
            setAddress('');
            setCity('Yangon');
        }
        catch (err) {
            toast.error(err?.message || 'Failed to create order');
        }
        finally {
            setBusy(false);
        }
    };
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 backdrop-blur text-white", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "New Delivery Entry" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: submit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-white/80", children: "Customer Name" }), _jsx(Input, { value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "bg-white/5 border-white/10 text-white placeholder:text-white/40", placeholder: "Customer Name", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-white/80", children: "Full Address (include City)" }), _jsx(Textarea, { value: address, onChange: (e) => setAddress(e.target.value), className: "bg-white/5 border-white/10 text-white placeholder:text-white/40", placeholder: "Full address", required: true }), _jsxs("div", { className: "text-xs text-white/60", children: ["Detected City: ", _jsx("span", { className: "text-white", children: detectedCity })] })] }), _jsx(Button, { type: "submit", disabled: busy, className: "w-full h-12 bg-gradient-to-r from-emerald-500 to-amber-400 text-slate-950 font-semibold", children: busy ? 'Saving…' : 'Register Order' })] }) })] }));
}
