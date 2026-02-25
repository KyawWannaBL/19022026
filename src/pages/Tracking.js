import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export default function Tracking() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    // FIXED: Declared only once to resolve the build crash
    const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
    const [awb, setTrackingNumber] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const handleTrack = (e) => {
        e.preventDefault();
        if (!awb)
            return;
        const found = shipments.find(s => s.awb?.toLowerCase() === awb.toLowerCase());
        setSearchResult(found || 'not_found');
    };
    return (_jsxs("div", { className: "bg-slate-50 min-h-screen", children: [_jsx("div", { className: "bg-[#0d2c54] py-10 text-center text-white", children: _jsx("h1", { className: "text-2xl font-bold uppercase tracking-tight", children: "Track Your Shipment" }) }), _jsx("div", { className: "max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-100", children: _jsxs("form", { onSubmit: handleTrack, className: "flex gap-2", children: [_jsx(Input, { placeholder: "Tracking ID", value: awb, onChange: (e) => setTrackingNumber(e.target.value), className: "h-12 border-2" }), _jsx(Button, { type: "submit", className: "h-12 bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold px-6", children: shipmentsLoading ? _jsx(Loader2, { className: "animate-spin h-4 w-4" }) : 'Track' })] }) })] }));
}
