import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { t, language, setLanguage } = useLanguageContext();
    const NAV_LINKS = [
        { label: t('public.track'), path: ROUTE_PATHS.PUBLIC_TRACKING },
        { label: t('public.services'), path: ROUTE_PATHS.SERVICES },
        { label: t('public.getQuote'), path: ROUTE_PATHS.GET_QUOTE },
        { label: t('public.about'), path: ROUTE_PATHS.ABOUT },
        { label: t('public.news'), path: ROUTE_PATHS.NEWS },
        { label: t('public.contact'), path: ROUTE_PATHS.CONTACT },
    ];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "bg-[#0d2c54] text-white py-2 text-xs", children: _jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("span", { className: "flex items-center gap-1 font-medium", children: [_jsx(Phone, { size: 12 }), " +95 9 897 4477 44"] }), _jsxs("span", { className: "hidden sm:flex items-center gap-1 font-medium", children: [_jsx(Mail, { size: 12 }), " info@britiumexpress.com"] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "hidden md:flex items-center gap-1 font-medium", children: [_jsx(Clock, { size: 12 }), " Mon-Sat: 9:00-17:30"] }), _jsx("button", { onClick: () => setLanguage(language === 'en' ? 'my' : 'en'), className: "hover:text-[#ff6b00] font-bold uppercase transition-colors", children: language === 'en' ? 'မြန်မာ' : 'EN' })] })] }) }), _jsx("nav", { className: "sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b h-20 flex items-center", children: _jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center w-full", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group transition-transform hover:scale-105", children: [_jsx("img", { src: IMAGES.BRITIUM_LOGO_55, alt: "Britium Logo", className: "h-14 w-auto" }), _jsxs("div", { className: "hidden sm:block leading-none", children: [_jsx("h1", { className: "text-xl font-black text-[#0d2c54] uppercase italic tracking-tighter", children: "Britium" }), _jsx("span", { className: "text-xs text-[#ff6b00] font-black uppercase tracking-[0.2em]", children: "Express" })] })] }), _jsxs("div", { className: "hidden lg:flex items-center gap-6", children: [NAV_LINKS.map((link) => (_jsx(Link, { to: link.path, className: cn("text-[11px] font-black uppercase tracking-widest transition-colors", location.pathname === link.path ? "text-[#ff6b00]" : "text-slate-600 hover:text-[#ff6b00]"), children: link.label }, link.path))), _jsx(Button, { asChild: true, className: "bg-[#0d2c54] hover:bg-slate-800 text-white font-black text-xs uppercase px-6 h-10 rounded-xl", children: _jsxs(Link, { to: ROUTE_PATHS.LOGIN, children: [_jsx(LogIn, { size: 14, className: "mr-2" }), " Staff Login"] }) })] }), _jsx("button", { className: "lg:hidden text-[#0d2c54]", onClick: () => setIsOpen(!isOpen), children: isOpen ? _jsx(X, { size: 28 }) : _jsx(Menu, { size: 28 }) })] }) })] }));
};
