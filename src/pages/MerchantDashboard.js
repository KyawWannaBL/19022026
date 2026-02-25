import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Package, Truck, CheckCircle2, DollarSign, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DashboardStat } from '@/components/ui/SharedComponents';
import { useLanguageContext } from '@/lib/LanguageContext';
const mockShipments = [
    { id: '1', awb: 'BE-2024-001', receiverName: 'Mg Mg', destinationTownship: 'Yangon', status: 'delivered', amount: 25000, createdAt: '2024-01-15' },
    { id: '2', awb: 'BE-2024-002', receiverName: 'Ma Ma', destinationTownship: 'Mandalay', status: 'in_transit', amount: 35000, createdAt: '2024-01-16' },
    { id: '3', awb: 'BE-2024-003', receiverName: 'Ko Ko', destinationTownship: 'Naypyidaw', status: 'pending', amount: 15000, createdAt: '2024-01-17' }
];
export default function MerchantDashboardPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredShipments = mockShipments.filter(shipment => shipment.awb.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.receiverName.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "p-6 bg-gray-50 min-h-screen", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-2xl font-bold text-[#0d2c54] uppercase tracking-tight", children: t('merchant.portal') }), _jsxs(Button, { className: "bg-[#ff6b00] hover:bg-[#ff6b00]/90 text-white font-bold uppercase text-xs rounded-xl", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " ", t('merchant.newOrder')] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(DashboardStat, { icon: Package, label: t('interface.pending'), value: "12", color: "blue" }), _jsx(DashboardStat, { icon: Truck, label: t('interface.inTransit'), value: "5", color: "orange" }), _jsx(DashboardStat, { icon: CheckCircle2, label: t('interface.delivered'), value: "142", color: "green" }), _jsx(DashboardStat, { icon: DollarSign, label: t('merchant.codBalance'), value: "450,000 MMK", color: "red" })] }), _jsxs(Card, { className: "rounded-2xl border-none shadow-sm overflow-hidden", children: [_jsx(CardHeader, { className: "border-b bg-white", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-sm font-black uppercase tracking-widest text-slate-400", children: t('merchant.recentShipments') }), _jsx(Input, { placeholder: t('form.search'), value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-64 border-slate-200" })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 text-[10px] font-black uppercase text-slate-500 tracking-tighter", children: [_jsx("th", { className: "p-4", children: "Tracking" }), _jsx("th", { className: "p-4", children: "Recipient" }), _jsx("th", { className: "p-4", children: "Status" }), _jsx("th", { className: "p-4", children: "Amount" }), _jsx("th", { className: "p-4 text-center", children: "Action" })] }) }), _jsx("tbody", { children: filteredShipments.map((s) => (_jsxs("tr", { className: "border-t hover:bg-slate-50/50 transition-colors", children: [_jsx("td", { className: "p-4 font-bold text-blue-600 underline", children: s.awb }), _jsx("td", { className: "p-4 text-sm font-medium", children: s.receiverName }), _jsx("td", { className: "p-4 text-xs font-bold uppercase", children: s.status }), _jsxs("td", { className: "p-4 font-bold", children: [s.amount.toLocaleString(), " ", _jsx("span", { className: "text-[10px]", children: "MMK" })] }), _jsx("td", { className: "p-4 text-center", children: _jsx(MoreHorizontal, { size: 16, className: "mx-auto text-slate-400" }) })] }, s.id))) })] }) }) })] })] }));
}
