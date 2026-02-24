import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
/**
 * StatsCard - High-level KPI summary card with trend indicator
 * © 2026 Britium Express
 */
export function StatsCard({ title, value, change, icon, className }) {
    const isPositive = change?.startsWith('+');
    const isNegative = change?.startsWith('-');
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: { y: -4 }, className: cn("relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary", children: icon }), change && (_jsxs("div", { className: cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", isPositive && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", isNegative && "bg-destructive/10 text-destructive", !isPositive && !isNegative && "bg-muted text-muted-foreground"), children: [isPositive && _jsx(TrendingUp, { className: "h-3 w-3" }), isNegative && _jsx(TrendingDown, { className: "h-3 w-3" }), change] }))] }), _jsxs("div", { className: "mt-4", children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("h3", { className: "mt-1 font-mono text-2xl font-bold tracking-tight text-foreground", children: value })] }), _jsx("div", { className: "absolute -bottom-2 -right-2 h-16 w-16 opacity-5", children: icon })] }));
}
/**
 * MetricCard - Specialized small-scale metric indicator for dense grids
 */
export function MetricCard({ label, value, subValue, status = 'neutral', className }) {
    const statusColors = {
        success: "bg-emerald-500",
        warning: "bg-accent",
        error: "bg-destructive",
        neutral: "bg-muted-foreground/30",
    };
    return (_jsxs("div", { className: cn("rounded-lg border border-border bg-card/50 p-4", className), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: cn("h-2 w-2 rounded-full", statusColors[status]) }), _jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label })] }), _jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [_jsx("span", { className: "font-mono text-xl font-bold", children: value }), subValue && _jsx("span", { className: "text-xs text-muted-foreground", children: subValue })] })] }));
}
/**
 * KPIGrid - Responsive container for dashboard metrics
 */
export function KPIGrid({ children, columns = 4, className }) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };
    return (_jsx("div", { className: cn("grid gap-4", gridCols[columns], className), children: children }));
}
