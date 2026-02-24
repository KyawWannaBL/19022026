import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calculator, Package, Clock } from 'lucide-react';
// Language context - using simple state for now
const useLanguageContext = () => ({ language: 'en' });
export default function ShippingCalculator() {
    const { language } = useLanguageContext();
    const [formData, setFormData] = useState({
        pickupCity: 'Yangon',
        dropCity: 'Yangon',
        weightKg: '',
        serviceType: 'standard',
        merchantName: '',
        phone: '',
    });
    const [result, setResult] = useState(null);
    const calc = () => {
        const weight = Number(formData.weightKg || 0);
        // Basic rule-set (replace with your actual fee table)
        let base = 2000;
        if (formData.pickupCity !== formData.dropCity)
            base += 1500;
        if (formData.serviceType === 'express')
            base += 1500;
        if (weight > 1)
            base += Math.ceil(weight - 1) * 500;
        const etaText = formData.serviceType === 'express'
            ? language === 'my'
                ? '၁ ရက်အတွင်း'
                : 'Within 1 day'
            : language === 'my'
                ? '၁-၂ ရက်'
                : '1–2 days';
        setResult({ fee: base, etaText });
    };
    return (_jsx("div", { className: "max-w-3xl mx-auto p-6", children: _jsxs("div", { className: "rounded-2xl border bg-white p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calculator, { className: "h-5 w-5" }), _jsx("h2", { className: "text-xl font-bold", children: "Shipping Calculator" })] }), _jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Pickup City" }), _jsxs("select", { className: "mt-1 w-full rounded-lg border p-2", value: formData.pickupCity, onChange: (e) => setFormData((p) => ({ ...p, pickupCity: e.target.value })), children: [_jsx("option", { children: "Yangon" }), _jsx("option", { children: "Mandalay" }), _jsx("option", { children: "Naypyidaw" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Drop City" }), _jsxs("select", { className: "mt-1 w-full rounded-lg border p-2", value: formData.dropCity, onChange: (e) => setFormData((p) => ({ ...p, dropCity: e.target.value })), children: [_jsx("option", { children: "Yangon" }), _jsx("option", { children: "Mandalay" }), _jsx("option", { children: "Naypyidaw" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Weight (kg)" }), _jsx("input", { className: "mt-1 w-full rounded-lg border p-2", value: formData.weightKg, onChange: (e) => setFormData((p) => ({ ...p, weightKg: e.target.value })), placeholder: "e.g. 1.5", inputMode: "decimal" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Service" }), _jsxs("select", { className: "mt-1 w-full rounded-lg border p-2", value: formData.serviceType, onChange: (e) => setFormData((p) => ({ ...p, serviceType: e.target.value })), children: [_jsx("option", { value: "standard", children: "Standard" }), _jsx("option", { value: "express", children: "Express" })] })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Merchant Name" }), _jsx("input", { className: "mt-1 w-full rounded-lg border p-2", value: formData.merchantName, onChange: (e) => setFormData((p) => ({ ...p, merchantName: e.target.value })), placeholder: "Merchant / Shop name" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Phone" }), _jsx("input", { className: "mt-1 w-full rounded-lg border p-2", value: formData.phone, onChange: (e) => setFormData((p) => ({ ...p, phone: e.target.value })), placeholder: "+95..." })] })] }), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx("button", { type: "button", onClick: calc, className: "rounded-lg bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700", children: "Calculate" }), _jsx("button", { type: "button", onClick: () => setResult(null), className: "rounded-lg border px-5 py-3 font-medium hover:bg-slate-50", children: "Reset" })] }), result && (_jsxs("div", { className: "mt-6 rounded-xl border bg-slate-50 p-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "h-4 w-4" }), _jsxs("p", { className: "font-semibold", children: ["Estimated Fee: ", result.fee.toLocaleString(), " MMK"] })] }), _jsxs("div", { className: "mt-2 flex items-center gap-2 text-sm text-slate-700", children: [_jsx(Clock, { className: "h-4 w-4" }), "ETA: ", result.etaText] })] }))] }) }));
}
