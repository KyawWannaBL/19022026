import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
/**
 * LanguageSwitcher component for English/Myanmar bilingual support.
 * Built with enterprise logistics precision and luxury design aesthetics.
 */
export function LanguageSwitcher({ className }) {
    const { language, setLanguage } = useLanguage();
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' }
    ];
    const currentLanguage = languages.find(lang => lang.code === language);
    return (_jsx(DropdownMenu, { children: _jsx(DropdownMenuTrigger, { asChild: true }) }));
    _jsxs(Button, { variant: "ghost", size: "sm", className: `group gap-2 text-foreground/80 hover:text-primary transition-all duration-300 focus-visible:ring-primary/50 ${className || ''}`, children: [_jsx(Globe, { className: "h-4 w-4 transition-transform duration-500 group-hover:rotate-45" }), _jsx("span", { className: "hidden sm:inline-flex items-center gap-1.5 font-bold text-[10px] tracking-[0.25em] uppercase", children: currentLanguage?.code || 'EN' })] });
    DropdownMenuTrigger >
        _jsxs(DropdownMenuContent, { align: "end", className: "w-48 luxury-glass border-border/50 p-1 shadow-2xl animate-in fade-in-0 zoom-in-95", children: [_jsx("div", { className: "px-3 py-2 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-50", children: "Regional Language" }), languages.map((lang) => (_jsxs(DropdownMenuItem, { onClick: () => setLanguage(lang.code), className: `
              flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200
              ${language === lang.code
                        ? 'bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'
                        : 'hover:bg-white/5 text-foreground/70 hover:text-foreground'}
            `, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-lg leading-none filter saturate-[0.8]", children: lang.flag }), _jsx("span", { className: "text-xs font-semibold tracking-wide", children: lang.name })] }), language === lang.code && (_jsx(Check, { className: "h-3.5 w-3.5 text-primary" }))] }, lang.code)))] });
    DropdownMenu >
    ;
    ;
}
