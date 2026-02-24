import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
export default function Calculator() {
    const [weight, setWeight] = useState(1);
    const [destination, setDestination] = useState('yangon');
    const [result, setResult] = useState(null);
    const calculate = () => {
        let baseRate = 0;
        let time = '';
        let note = '';
        if (destination === 'yangon') {
            baseRate = 2500;
            time = 'Same Day';
            note = 'Yangon City Express';
        }
        else if (destination === 'mandalay') {
            baseRate = 4500;
            time = 'Next Day';
            note = 'Intercity Express';
        }
        else {
            baseRate = 5500;
            time = '2–3 Days';
            note = 'Other Regions';
        }
        if (weight > 1)
            baseRate += (weight - 1) * 500;
        setResult({
            price: `${baseRate.toLocaleString()} MMK`,
            time,
            note: `${note}. Base rate includes 1kg (+500 MMK/kg after).`,
        });
    };
    return (_jsx("section", { className: "py-16 max-w-3xl mx-auto px-6", children: _jsxs("div", { className: "bg-navy-800/60 border border-gold-500/20 rounded-2xl p-8", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx(CalcIcon, { className: "text-gold-400" }), _jsx("h2", { className: "text-2xl font-bold", children: "Shipping Rate Calculator" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-300 mb-1", children: "Destination" }), _jsxs("select", { value: destination, onChange: (e) => setDestination(e.target.value), className: "w-full bg-navy-700 border border-gold-500/20 rounded-lg px-4 py-2", children: [_jsx("option", { value: "yangon", children: "Yangon" }), _jsx("option", { value: "mandalay", children: "Mandalay" }), _jsx("option", { value: "other", children: "Other Regions" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-gray-300 mb-1", children: "Weight (kg)" }), _jsx("input", { type: "number", min: 1, value: weight, onChange: (e) => setWeight(Number(e.target.value)), className: "w-full bg-navy-700 border border-gold-500/20 rounded-lg px-4 py-2" })] }), _jsx("button", { onClick: calculate, className: "w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold py-3 rounded-xl transition", children: "Calculate" }), result && (_jsxs("div", { className: "mt-6 bg-navy-900/60 border border-gold-500/20 rounded-xl p-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Price:" }), " ", result.price] }), _jsxs("p", { children: [_jsx("strong", { children: "Delivery Time:" }), " ", result.time] }), _jsx("p", { className: "text-sm text-gray-300", children: result.note })] }))] })] }) }));
}
