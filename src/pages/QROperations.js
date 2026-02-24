import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Copy, ShieldCheck } from 'lucide-react';
export default function QROperations() {
    const [groupShipmentId, setGroupShipmentId] = useState('');
    const [dateISO, setDateISO] = useState(() => new Date().toISOString().slice(0, 10));
    const payload = useMemo(() => {
        return JSON.stringify({
            groupShipmentId: groupShipmentId.trim(),
            date: dateISO,
            nonce: Math.random().toString(36).slice(2, 10),
        });
    }, [groupShipmentId, dateISO]);
    const encoded = useMemo(() => {
        try {
            return btoa(unescape(encodeURIComponent(payload)));
        }
        catch {
            return payload;
        }
    }, [payload]);
    const copy = async () => {
        await navigator.clipboard.writeText(encoded);
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [_jsx(QrCode, { className: "h-7 w-7" }), " QR Operations"] }), _jsxs(Card, { className: "card-modern", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(ShieldCheck, { className: "h-5 w-5" }), " Generate QR Payload"] }), _jsx(CardDescription, { children: "Encoded token for printing + anti-fraud scanning." })] }), _jsxs(CardContent, { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "GroupShipmentId" }), _jsx(Input, { value: groupShipmentId, onChange: (e) => setGroupShipmentId(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Date" }), _jsx(Input, { type: "date", value: dateISO, onChange: (e) => setDateISO(e.target.value) })] }), _jsxs("div", { className: "md:col-span-2 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Encoded Token" }), _jsx(Badge, { variant: "secondary", children: "Base64" })] }), _jsx("div", { className: "rounded-xl border bg-slate-50 p-3 font-mono text-xs break-all", children: groupShipmentId ? encoded : 'Enter GroupShipmentId to generate token…' }), _jsxs(Button, { className: "h-12", onClick: copy, disabled: !groupShipmentId, children: [_jsx(Copy, { className: "h-4 w-4 mr-2" }), " Copy Token"] })] })] })] })] }));
}
