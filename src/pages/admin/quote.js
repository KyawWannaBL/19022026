import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const Quote = () => {
    const [region, setRegion] = useState('yangon');
    const [townshipRate, setTownshipRate] = useState(null);
    const [weight, setWeight] = useState(1);
    const [totalPrice, setTotalPrice] = useState('--');
    const [deliveryTime, setDeliveryTime] = useState('Select a Township');
    useEffect(() => {
        if (region !== 'yangon')
            return;
        if (townshipRate === null) {
            setTotalPrice('--');
            setDeliveryTime('Select a Township');
            return;
        }
        // Logic: Base rate covers first 1kg, then +500 MMK per additional kg
        const extraWeightCost = weight > 1 ? (weight - 1) * 500 : 0;
        const total = townshipRate + extraWeightCost;
        setTotalPrice(`${total.toLocaleString()} MMK`);
        setDeliveryTime('Delivery: 1-2 Days');
    }, [region, townshipRate, weight]);
    const handleRegionChange = (e) => {
        const val = e.target.value;
        setRegion(val);
        if (val === 'mandalay') {
            setTotalPrice('3,000 MMK');
            setDeliveryTime('Standard Rate (Base)');
        }
        else if (val === 'other') {
            setTotalPrice('Call for Quote');
            setDeliveryTime('Remote Area');
        }
        else {
            setTownshipRate(null);
        }
    };
    return (_jsxs("div", { className: "bg-light min-vh-100 pb-5", children: [_jsxs("header", { className: "py-5 bg-white shadow-sm mb-5 text-center", children: [_jsx("h1", { className: "display-4 fw-bold", style: { color: '#0d2c54' }, children: "Rate Calculator" }), _jsx("p", { className: "lead opacity-75", children: "Check our specific Yangon City rates below." })] }), _jsx("div", { className: "container", children: _jsx("div", { className: "row justify-content-center", children: _jsx("div", { className: "col-lg-10 card p-4 border-0 shadow-sm", children: _jsxs("div", { className: "row g-4", children: [_jsxs("div", { className: "col-md-7", children: [_jsxs("h4", { className: "fw-bold mb-4", children: [_jsx("i", { className: "fas fa-sliders-h me-2" }), " Shipment Details"] }), _jsxs("div", { className: "row g-3", children: [_jsxs("div", { className: "col-12", children: [_jsx("label", { className: "form-label fw-bold", children: "Destination Region" }), _jsxs("select", { className: "form-select form-select-lg", value: region, onChange: handleRegionChange, children: [_jsx("option", { value: "yangon", children: "Yangon City" }), _jsx("option", { value: "mandalay", children: "Mandalay Region" }), _jsx("option", { value: "other", children: "Other States/Regions" })] })] }), _jsxs("div", { className: "col-md-6", children: [_jsx("label", { className: "form-label fw-bold", children: "Select Township" }), _jsxs("select", { className: "form-select", disabled: region !== 'yangon', onChange: (e) => setTownshipRate(Number(e.target.value)), children: [_jsx("option", { value: "", children: "-- Select Area --" }), _jsxs("optgroup", { label: "Zone 1 - 3,000 MMK", children: [_jsx("option", { value: "3000", children: "Ahlone" }), _jsx("option", { value: "3000", children: "Bahan" })] }), _jsx("optgroup", { label: "Zone 2 - 3,500 MMK", children: _jsx("option", { value: "3500", children: "Hlaing Thar Yar" }) })] })] }), _jsxs("div", { className: "col-md-6", children: [_jsx("label", { className: "form-label fw-bold", children: "Weight (Kg)" }), _jsx("input", { type: "number", className: "form-control", value: weight, min: "0.5", step: "0.5", onChange: (e) => setWeight(Number(e.target.value)) })] })] })] }), _jsx("div", { className: "col-md-5", children: _jsxs("div", { className: "p-4 rounded text-center h-100 d-flex flex-column justify-content-center", style: { background: '#e3f2fd', border: '2px dashed #0d2c54' }, children: [_jsx("h6", { className: "text-uppercase text-muted fw-bold small", children: "Estimated Cost" }), _jsx("div", { className: "display-5 fw-bold my-3", style: { color: '#0d2c54' }, children: totalPrice }), _jsx("div", { className: "text-success fw-bold mb-4", children: deliveryTime }), _jsx("button", { className: "btn btn-warning btn-lg w-100 fw-bold text-white", style: { background: '#ff6b00' }, children: "BOOK NOW" })] }) })] }) }) }) })] }));
};
export default Quote;
