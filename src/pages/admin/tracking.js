import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const Services = () => {
    const [rate, setRate] = useState(0);
    const [weight, setWeight] = useState(0);
    const [l, setL] = useState(0);
    const [w, setW] = useState(0);
    const [h, setH] = useState(0);
    const [result, setResult] = useState(null);
    const calculate = () => {
        if (!rate || !weight || !l || !w || !h) {
            alert("Fill all fields");
            return;
        }
        const volumetric = (l * w * h) / 5000;
        const chargeable = Math.max(weight, volumetric);
        setResult(chargeable * rate);
    };
    return (_jsxs("div", { className: "container py-5", children: [_jsx("h2", { className: "fw-bold mb-4", children: "International Air Cargo Calculator" }), _jsxs("select", { className: "form-select mb-3", onChange: (e) => setRate(Number(e.target.value)), children: [_jsx("option", { value: "", children: "Select Destination" }), _jsx("option", { value: "18.5", children: "USA - $18.5/kg" }), _jsx("option", { value: "4.5", children: "Singapore - $4.5/kg" }), _jsx("option", { value: "3", children: "Thailand - $3/kg" })] }), _jsx("input", { className: "form-control mb-2", type: "number", placeholder: "Actual Weight", onChange: (e) => setWeight(Number(e.target.value)) }), _jsxs("div", { className: "row mb-3", children: [_jsx("div", { className: "col", children: _jsx("input", { type: "number", className: "form-control", placeholder: "L", onChange: (e) => setL(Number(e.target.value)) }) }), _jsx("div", { className: "col", children: _jsx("input", { type: "number", className: "form-control", placeholder: "W", onChange: (e) => setW(Number(e.target.value)) }) }), _jsx("div", { className: "col", children: _jsx("input", { type: "number", className: "form-control", placeholder: "H", onChange: (e) => setH(Number(e.target.value)) }) })] }), _jsx("button", { className: "btn btn-warning", onClick: calculate, children: "Calculate" }), result && (_jsxs("div", { className: "mt-4 alert alert-info", children: ["Estimated Cost: ", _jsxs("strong", { children: ["$", result.toFixed(2)] })] }))] }));
};
export default Services;
