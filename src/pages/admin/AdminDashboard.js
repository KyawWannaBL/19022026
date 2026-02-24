import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function AdminDashboard() {
    const stats = [
        { title: 'Total Shipments', value: '1,284', icon: Package, color: 'text-blue-600' },
        { title: 'Active Sellers', value: '156', icon: Users, color: 'text-emerald-600' },
        { title: 'Revenue (MMK)', value: '4.2M', icon: TrendingUp, color: 'text-orange-600' },
        { title: 'Pending Issues', value: '12', icon: AlertCircle, color: 'text-rose-600' },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900", children: "Admin Overview" }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: stats.map((stat) => (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: stat.title }), _jsx(stat.icon, { className: `h-4 w-4 ${stat.color}` })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: stat.value }) })] }, stat.title))) }), _jsxs(Card, { className: "col-span-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent System Activity" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-muted-foreground italic", children: "No recent critical logs found." }) })] })] }));
}
