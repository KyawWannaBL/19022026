import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button as ShadcnButton } from '@/components/ui/button';
import { Badge as ShadcnBadge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
// Re-export shadcn components with consistent naming
export const Card = ShadcnCard;
export const CardBody = CardContent;
export const Button = ShadcnButton;
export const Badge = ShadcnBadge;
export function EnhancedCardHeader({ title, subtitle, action, className }) {
    return (_jsxs(CardHeader, { className: cn('flex flex-row items-center justify-between space-y-0 pb-2', className), children: [_jsxs("div", { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: title }), subtitle && _jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })] }), action && _jsx("div", { className: "flex items-center space-x-2", children: action })] }));
}
export function StatCard({ title, value, hint, tone = 'blue', icon: Icon, className }) {
    const toneClasses = {
        blue: 'border-blue-200 bg-blue-50 text-blue-900',
        green: 'border-green-200 bg-green-50 text-green-900',
        orange: 'border-orange-200 bg-orange-50 text-orange-900',
        red: 'border-red-200 bg-red-50 text-red-900',
        purple: 'border-purple-200 bg-purple-50 text-purple-900',
    };
    const iconClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
        red: 'text-red-600',
        purple: 'text-purple-600',
    };
    return (_jsx(Card, { className: cn('border-l-4', toneClasses[tone], className), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("p", { className: "text-2xl font-bold", children: value }), hint && _jsx("p", { className: "text-xs text-muted-foreground", children: hint })] }), Icon && _jsx(Icon, { className: cn('h-8 w-8', iconClasses[tone]) })] }) }) }));
}
export function DashboardStat({ icon: Icon, label, value, color, className }) {
    const colorClasses = {
        blue: 'bg-blue-500',
        orange: 'bg-orange-500',
        green: 'bg-green-500',
        red: 'bg-red-500',
    };
    return (_jsx(Card, { className: cn('overflow-hidden', className), children: _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: cn('p-4', colorClasses[color]), children: _jsx(Icon, { className: "h-6 w-6 text-white" }) }), _jsxs("div", { className: "p-4 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: label }), _jsx("p", { className: "text-xl font-bold", children: value })] })] }) }) }));
}
export function DataTable({ data, columns, className }) {
    return (_jsx("div", { className: cn('overflow-x-auto', className), children: _jsxs("table", { className: "w-full border-collapse", children: [_jsx("thead", { children: _jsx("tr", { className: "border-b border-border", children: columns.map((column) => (_jsx("th", { className: cn('text-left p-3 font-medium text-muted-foreground', column.className), children: column.header }, String(column.key)))) }) }), _jsx("tbody", { children: data.map((row, index) => (_jsx("tr", { className: "border-b border-border hover:bg-muted/50", children: columns.map((column) => (_jsx("td", { className: cn('p-3', column.className), children: column.render ? column.render(row[column.key], row) : String(row[column.key] || '') }, String(column.key)))) }, index))) })] }) }));
}
export function EmptyState({ title = 'No data available', description = 'This feature is under development.', action, className }) {
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center py-12 text-center', className), children: [_jsx("div", { className: "w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4", children: _jsx("div", { className: "w-8 h-8 bg-muted-foreground/20 rounded-full" }) }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: title }), _jsx("p", { className: "text-muted-foreground mb-4 max-w-sm", children: description }), action && action] }));
}
export function PageHeader({ titleKey, title, subtitle, action, className }) {
    const displayTitle = title || titleKey || 'Page Title';
    return (_jsxs("div", { className: cn('flex items-center justify-between mb-6', className), children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: displayTitle }), subtitle && _jsx("p", { className: "text-muted-foreground", children: subtitle })] }), action && _jsx("div", { className: "flex items-center space-x-2", children: action })] }));
}
export default {
    Card,
    CardBody,
    CardHeader: EnhancedCardHeader,
    Button,
    Badge,
    StatCard,
    DashboardStat,
    DataTable,
    EmptyState,
    PageHeader,
};
