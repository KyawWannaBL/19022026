import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
export default function Domestic() {
    return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsxs("div", { className: "bg-slate-900 text-white py-2 text-sm text-center", children: [_jsx(FaPhoneAlt, { className: "inline mr-2" }), " +95 9 897 4477 44", _jsx(FaEnvelope, { className: "inline ml-4 mr-2" }), " info@britiumexpress.com"] }), _jsxs("header", { className: "bg-blue-600 text-white text-center py-20", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Domestic Express" }), _jsx("p", { className: "mt-4", children: "Door-to-Door Delivery within Myanmar" }), _jsx("div", { className: "mt-8", children: _jsx(Link, { to: "/quote", className: "bg-white text-blue-600 px-8 py-3 rounded-full font-bold", children: "Get a Quote" }) })] })] }));
}
