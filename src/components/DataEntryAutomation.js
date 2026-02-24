import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    };
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 backdrop-blur text-white", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "New Delivery Entry" }) }), "); }"] }));
}
