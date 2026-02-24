import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS } from '@/lib/index';
export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const NAV_LINKS = [
        { label: 'Track & Trace', path: ROUTE_PATHS.PUBLIC_TRACKING },
        { label: 'Services', path: ROUTE_PATHS.SERVICES },
        { label: 'Get Quote', path: ROUTE_PATHS.GET_QUOTE },
        { label: 'About Us', path: ROUTE_PATHS.ABOUT },
        { label: 'News', path: ROUTE_PATHS.NEWS },
        { label: 'Contact', path: ROUTE_PATHS.CONTACT },
    ];
    const isActive = (path) => location.pathname === path;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-[#0d2c54] text-white py-2 text-xs sm:text-sm", children: _jsxs("div", { className: "container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Phone, { size: 14 }), " +95 9 897 4477 44"] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Mail, { size: 14 }), " info@britiumexpress.com"] })] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { size: 14 }), " Mon-Sat: 9:00am - 5:30pm"] })] }) }), _jsxs("nav", { className: "sticky top-0 z-50 bg-white shadow-sm py-4", children: [_jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center", children: [_jsx(Link, { to: "/", className: "transition-transform hover:scale-105", children: _jsx("img", { src: IMAGES.BRITIUM_LOGO_55, alt: "Britium Logo", className: "h-16 w-auto" }) }), _jsxs("div", { className: "hidden lg:flex items-center gap-8", children: [NAV_LINKS.map((link) => (_jsx(Link, { to: link.path, className: `text-sm font-bold uppercase tracking-tight transition-colors ${isActive(link.path) ? 'text-[#ff6b00]' : 'text-gray-600 hover:text-[#ff6b00]'}`, children: link.label }, link.path))), _jsx(Button, { asChild: true, variant: "outline", className: "border-[#0d2c54] text-[#0d2c54] hover:bg-[#0d2c54] hover:text-white font-bold", children: _jsxs(Link, { to: ROUTE_PATHS.LOGIN, children: [_jsx(LogIn, { className: "mr-2 h-4 w-4" }), " Login"] }) })] }), _jsx("button", { className: "lg:hidden text-[#0d2c54]", onClick: () => setIsOpen(!isOpen), children: isOpen ? _jsx(X, { size: 28 }) : _jsx(Menu, { size: 28 }) })] }), isOpen && (_jsxs("div", { className: "lg:hidden bg-white border-t p-4 flex flex-col gap-4", children: [NAV_LINKS.map((link) => (_jsx(Link, { to: link.path, onClick: () => setIsOpen(false), className: "font-bold text-gray-700", children: link.label }, link.path))), _jsx(Link, { to: ROUTE_PATHS.LOGIN, className: "btn-portal text-center py-2", children: "Login" })] }))] })] }));
};
