import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Services = () => {
    const steps = [
        { title: "Book Pickup", desc: "Via App or Website" },
        { title: "We Deliver", desc: "Direct to customer" },
        { title: "Collect Cash", desc: "Item value + shipping" },
        { title: "Remittance", desc: "Funds to your bank" }
    ];
    return (_jsxs("div", { children: [_jsxs("section", { className: "py-5 text-white text-center", style: {
                    background: 'linear-gradient(rgba(13, 44, 84, 0.9), rgba(13, 44, 84, 0.9)), url(https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1950&q=80)',
                    backgroundSize: 'cover', padding: '100px 0'
                }, children: [_jsx("h1", { className: "display-4 fw-bold", children: "E-Commerce & COD Solutions" }), _jsx("p", { className: "lead", children: "Secure Cash on Delivery handling for online sellers." })] }), _jsx("section", { className: "py-5 bg-light", children: _jsxs("div", { className: "container", children: [_jsx("h3", { className: "fw-bold text-center mb-5", children: "How It Works" }), _jsx("div", { className: "row g-4", children: steps.map((step, i) => (_jsx("div", { className: "col-md-3", children: _jsxs("div", { className: "p-4 border bg-white rounded-3 h-100 text-center", children: [_jsx("span", { className: "d-inline-block bg-primary text-white rounded-circle mb-3", style: { width: 40, height: 40, lineHeight: '40px' }, children: i + 1 }), _jsx("h5", { className: "fw-bold", children: step.title }), _jsx("p", { className: "small text-muted", children: step.desc })] }) }, i))) })] }) })] }));
};
export default Services;
