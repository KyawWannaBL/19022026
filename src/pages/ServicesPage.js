import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Truck, Package, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/lib/index';
export const ServicesPage = () => {
    const categories = [
        {
            title: "Logistics",
            icon: _jsx(Truck, { className: "w-6 h-6" }),
            desc: "Comprehensive distribution network across the region."
        },
        {
            title: "Warehousing",
            icon: _jsx(Package, { className: "w-6 h-6" }),
            desc: "Secure storage solutions with inventory management."
        }
    ];
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx("section", { className: "bg-slate-900 text-white py-20 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto text-center", children: [_jsx("h1", { className: "text-4xl md:text-6xl font-extrabold mb-6", children: "World Class Logistics" }), _jsx("p", { className: "text-lg text-slate-400 mb-8 max-w-2xl mx-auto", children: "Streamlining your supply chain with advanced technology and expert handling." }), _jsx(Button, { asChild: true, size: "lg", className: "bg-blue-600 hover:bg-blue-500 text-white px-8", children: _jsx(Link, { to: ROUTE_PATHS.CONTACT, children: "Get Started" }) })] }) }), _jsx("section", { className: "py-24 bg-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8", children: categories.map((item, idx) => (_jsxs("div", { className: "p-8 bg-slate-50 rounded-3xl hover:shadow-xl transition-shadow", children: [_jsx("div", { className: "mb-6 text-blue-600", children: item.icon }), _jsx("h3", { className: "text-2xl font-bold mb-3", children: item.title }), _jsx("p", { className: "text-slate-600 leading-relaxed", children: item.desc })] }, idx))) }) }) }), _jsx("section", { className: "bg-blue-600 py-16 text-white text-center", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h2", { className: "text-3xl font-bold mb-8", children: "Ready to Optimize Your Operations?" }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx(Button, { variant: "secondary", size: "lg", asChild: true, children: _jsxs("a", { href: "tel:+95989747744", children: [_jsx(Phone, { className: "mr-2 w-4 h-4" }), " Call Experts"] }) }) })] }) })] }));
};
export default ServicesPage;
