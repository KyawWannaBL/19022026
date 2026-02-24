import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLanguageContext } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
export default function EmptyState({ title, description, action, className }) {
    const { t } = useLanguageContext();
    const displayTitle = title || t('common.loading');
    const displayDescription = description || t('This feature is under development.');
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center py-12 text-center', className), children: [_jsx("div", { className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4", children: _jsx("div", { className: "w-8 h-8 bg-muted-foreground/20 rounded-full" }) }), _jsx("h3", { className: "text-lg font-semibold mb-2 text-foreground", children: displayTitle }), _jsx("p", { className: "text-muted-foreground mb-4 max-w-sm", children: displayDescription }), action && action] }));
}
