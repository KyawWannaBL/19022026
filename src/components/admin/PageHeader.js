import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLanguageContext } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
export default function PageHeader({ titleKey, title, subtitle, action, className }) {
    const { t } = useLanguageContext();
    const displayTitle = titleKey ? t(titleKey) : (title || 'Page Title');
    return (_jsxs("div", { className: cn('flex items-center justify-between mb-6', className), children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: displayTitle }), subtitle && _jsx("p", { className: "text-muted-foreground", children: subtitle })] }), action && _jsx("div", { className: "flex items-center space-x-2", children: action })] }));
}
