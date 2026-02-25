import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Truck, AlertTriangle, RotateCcw, ArrowUpDown, MapPin, Search, Filter, Download, Eye, Edit, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
const mockWayData = [
    {
        id: '1',
        wayId: 'BE001234',
        senderName: 'Mg Aung Aung',
        receiverName: 'Ma Thida',
        pickupAddress: 'Yangon, Kamayut Township',
        deliveryAddress: 'Mandalay, Chan Aye Thar Zan',
        status: 'pickup',
        amount: 15000,
        date: '2026-02-03',
        deliveryman: 'Ko Zaw Min'
    },
    {
        id: '2',
        wayId: 'BE001235',
        senderName: 'Daw Khin Khin',
        receiverName: 'U Thant Zin',
        pickupAddress: 'Mandalay, Maha Aung Myay',
        deliveryAddress: 'Yangon, Bahan Township',
        status: 'deliver',
        amount: 12000,
        date: '2026-02-02',
        deliveryman: 'Ko Myint Swe'
    },
    {
        id: '3',
        wayId: 'BE001236',
        senderName: 'U Win Maung',
        receiverName: 'Ma Aye Aye',
        pickupAddress: 'Yangon, Sanchaung',
        deliveryAddress: 'Naypyidaw, Zabuthiri',
        status: 'failed',
        amount: 18000,
        date: '2026-02-01',
        deliveryman: 'Ko Thura',
        remark: 'Receiver not available'
    }
];
export default function WayManagement() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('pickup');
    const getStatusBadge = (status) => {
        const statusConfig = {
            pickup: { variant: 'secondary', label: t('way.pickupWays') },
            deliver: { variant: 'default', label: t('way.deliverWays') },
            failed: { variant: 'destructive', label: t('way.failedWays') },
            returned: { variant: 'outline', label: t('way.returnWays') },
            transit: { variant: 'secondary', label: t('way.transitRoute') }
        };
        const config = statusConfig[status];
        return _jsx(Badge, { variant: config.variant, children: config.label });
    };
    const filteredData = mockWayData.filter(item => item.status === activeTab &&
        (item.wayId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.receiverName.toLowerCase().includes(searchTerm.toLowerCase())));
    const TabContent = ({ data }) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }), _jsx(Input, { placeholder: t('form.search') + '...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-9" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), t('form.search')] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t('common.wayId') }), _jsx(TableHead, { children: t('form.senderName') }), _jsx(TableHead, { children: "Receiver" }), _jsx(TableHead, { children: "Pickup Location" }), _jsx(TableHead, { children: "Delivery Location" }), _jsx(TableHead, { children: t('common.amount') }), _jsx(TableHead, { children: t('common.date') }), _jsx(TableHead, { children: "Deliveryman" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: data.map((item) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: item.wayId }), _jsx(TableCell, { children: item.senderName }), _jsx(TableCell, { children: item.receiverName }), _jsx(TableCell, { className: "max-w-[150px] truncate", children: item.pickupAddress }), _jsx(TableCell, { className: "max-w-[150px] truncate", children: item.deliveryAddress }), _jsxs(TableCell, { children: [item.amount.toLocaleString(), " MMK"] }), _jsx(TableCell, { children: item.date }), _jsx(TableCell, { children: item.deliveryman || '-' }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "View Details"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "w-4 h-4 mr-2" }), t('form.edit')] }), _jsxs(DropdownMenuItem, { children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), "Track Location"] })] })] }) })] }, item.id))) })] }) }) })] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: t('nav.wayManagement') }), _jsx("p", { className: "text-muted-foreground", children: "Manage pickup, delivery, failed and return ways" })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('way.pickupWays') }), _jsx(Package, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockWayData.filter(item => item.status === 'pickup').length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+2 from yesterday" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('way.deliverWays') }), _jsx(Truck, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockWayData.filter(item => item.status === 'deliver').length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+5 from yesterday" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('way.failedWays') }), _jsx(AlertTriangle, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockWayData.filter(item => item.status === 'failed').length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "-1 from yesterday" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('way.returnWays') }), _jsx(RotateCcw, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockWayData.filter(item => item.status === 'returned').length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "No change" })] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [_jsxs(TabsTrigger, { value: "pickup", className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('way.pickupWays') })] }), _jsxs(TabsTrigger, { value: "deliver", className: "flex items-center gap-2", children: [_jsx(Truck, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('way.deliverWays') })] }), _jsxs(TabsTrigger, { value: "failed", className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('way.failedWays') })] }), _jsxs(TabsTrigger, { value: "returned", className: "flex items-center gap-2", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('way.returnWays') })] }), _jsxs(TabsTrigger, { value: "transit", className: "flex items-center gap-2", children: [_jsx(ArrowUpDown, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('way.transitRoute') })] })] }), _jsx(TabsContent, { value: "pickup", children: _jsx(TabContent, { data: filteredData }) }), _jsx(TabsContent, { value: "deliver", children: _jsx(TabContent, { data: filteredData }) }), _jsx(TabsContent, { value: "failed", children: _jsx(TabContent, { data: filteredData }) }), _jsx(TabsContent, { value: "returned", children: _jsx(TabContent, { data: filteredData }) }), _jsx(TabsContent, { value: "transit", children: _jsx(TabContent, { data: filteredData }) })] })] }));
}
