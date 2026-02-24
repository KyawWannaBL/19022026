import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bike, Plus, DollarSign, Package, Truck, Search, Filter, Download, Eye, Edit, MoreHorizontal, Phone, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
const mockDeliverymen = [
    {
        id: '1',
        employeeId: 'D001',
        name: 'Ko Zaw Min',
        phone: '+95 9 123 456 789',
        email: 'zawmin@britium.com',
        address: 'Yangon, Kamayut Township',
        status: 'active',
        cashOnHand: 150000,
        activePickup: 3,
        activeDeliver: 5,
        activeReturn: 1,
        activeTransit: 2,
        totalDeliveries: 1245,
        rating: 4.8,
        joinDate: '2025-01-15',
        vehicleType: 'motorcycle',
        zone: 'Yangon North'
    },
    {
        id: '2',
        employeeId: 'D002',
        name: 'Ko Myint Swe',
        phone: '+95 9 987 654 321',
        email: 'myintswe@britium.com',
        address: 'Mandalay, Chan Aye Thar Zan',
        status: 'active',
        cashOnHand: 89000,
        activePickup: 2,
        activeDeliver: 3,
        activeReturn: 0,
        activeTransit: 1,
        totalDeliveries: 856,
        rating: 4.6,
        joinDate: '2025-03-20',
        vehicleType: 'motorcycle',
        zone: 'Mandalay Central'
    },
    {
        id: '3',
        employeeId: 'D003',
        name: 'Ko Thura',
        phone: '+95 9 555 666 777',
        email: 'thura@britium.com',
        address: 'Yangon, Bahan Township',
        status: 'on_leave',
        cashOnHand: 45000,
        activePickup: 0,
        activeDeliver: 0,
        activeReturn: 0,
        activeTransit: 0,
        totalDeliveries: 623,
        rating: 4.3,
        joinDate: '2025-06-10',
        vehicleType: 'bicycle',
        zone: 'Yangon Central'
    }
];
export default function Deliverymen() {
    const { t, language } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('list');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isCashAdvanceDialogOpen, setIsCashAdvanceDialogOpen] = useState(false);
    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { variant: 'default', label: 'Active', icon: CheckCircle },
            inactive: { variant: 'secondary', label: 'Inactive', icon: Clock },
            on_leave: { variant: 'outline', label: 'On Leave', icon: Clock },
            suspended: { variant: 'destructive', label: 'Suspended', icon: AlertCircle }
        };
        const config = statusConfig[status];
        const Icon = config.icon;
        return (_jsxs(Badge, { variant: config.variant, className: "flex items-center gap-1", children: [_jsx(Icon, { className: "w-3 h-3" }), config.label] }));
    };
    const getVehicleIcon = (vehicleType) => {
        const icons = {
            motorcycle: Bike,
            bicycle: Bike,
            van: Truck,
            truck: Truck
        };
        return icons[vehicleType] || Bike;
    };
    const filteredDeliverymen = mockDeliverymen.filter(deliveryman => deliveryman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryman.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryman.phone.includes(searchTerm) ||
        deliveryman.zone.toLowerCase().includes(searchTerm.toLowerCase()));
    const AddDeliverymanDialog = () => (_jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), t('delivery.addNew')] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: t('delivery.addNew') }), _jsx(DialogDescription, { children: "Add a new deliveryman to the system" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name" }), _jsx(Input, { id: "name", placeholder: "Enter full name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number" }), _jsx(Input, { id: "phone", placeholder: "+95 9 xxx xxx xxx" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "deliveryman@britium.com" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "address", children: "Address" }), _jsx(Textarea, { id: "address", placeholder: "Enter full address" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "vehicleType", children: "Vehicle Type" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select vehicle type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "motorcycle", children: "Motorcycle" }), _jsx(SelectItem, { value: "bicycle", children: "Bicycle" }), _jsx(SelectItem, { value: "van", children: "Van" }), _jsx(SelectItem, { value: "truck", children: "Truck" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "zone", children: "Zone" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select zone" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "yangon_north", children: "Yangon North" }), _jsx(SelectItem, { value: "yangon_central", children: "Yangon Central" }), _jsx(SelectItem, { value: "yangon_south", children: "Yangon South" }), _jsx(SelectItem, { value: "mandalay_central", children: "Mandalay Central" }), _jsx(SelectItem, { value: "naypyidaw", children: "Naypyidaw" })] })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsAddDialogOpen(false), children: t('form.cancel') }), _jsx(Button, { onClick: () => setIsAddDialogOpen(false), children: t('form.save') })] })] })] }));
    const CashAdvanceDialog = () => (_jsxs(Dialog, { open: isCashAdvanceDialogOpen, onOpenChange: setIsCashAdvanceDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(DollarSign, { className: "w-4 h-4 mr-2" }), "Cash Advance"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Cash Advance Management" }), _jsx(DialogDescription, { children: "Manage cash advances for deliverymen" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "deliveryman", children: "Select Deliveryman" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choose deliveryman" }) }), _jsx(SelectContent, { children: mockDeliverymen.map((d) => (_jsxs(SelectItem, { value: d.id, children: [d.name, " (", d.employeeId, ")"] }, d.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "amount", children: "Amount (MMK)" }), _jsx(Input, { id: "amount", type: "number", placeholder: "Enter amount" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "reason", children: "Reason" }), _jsx(Textarea, { id: "reason", placeholder: "Enter reason for cash advance" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsCashAdvanceDialogOpen(false), children: t('form.cancel') }), _jsx(Button, { onClick: () => setIsCashAdvanceDialogOpen(false), children: "Process Advance" })] })] })] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: t('nav.deliverymen') }), _jsx("p", { className: "text-muted-foreground", children: "Manage deliverymen, cash advances, and performance tracking" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(CashAdvanceDialog, {}), _jsx(AddDeliverymanDialog, {})] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Deliverymen" }), _jsx(Bike, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockDeliverymen.length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+1 new this month" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Active Deliverymen" }), _jsx(CheckCircle, { className: "h-4 w-4 text-green-600" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockDeliverymen.filter(d => d.status === 'active').length }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [Math.round((mockDeliverymen.filter(d => d.status === 'active').length / mockDeliverymen.length) * 100), "% of total"] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('delivery.cashOnHand') }), _jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: [mockDeliverymen.reduce((sum, d) => sum + d.cashOnHand, 0).toLocaleString(), " MMK"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Total cash with deliverymen" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Active Deliveries" }), _jsx(Package, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockDeliverymen.reduce((sum, d) => sum + d.activeDeliver, 0) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Currently being delivered" })] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsxs(TabsTrigger, { value: "list", className: "flex items-center gap-2", children: [_jsx(Bike, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('delivery.list') })] }), _jsxs(TabsTrigger, { value: "cash_advance", className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Cash Advance" })] })] }), _jsxs(TabsContent, { value: "list", className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }), _jsx(Input, { placeholder: t('form.search') + ' deliverymen...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-9" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filter"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Employee ID" }), _jsx(TableHead, { children: "Name & Contact" }), _jsx(TableHead, { children: t('delivery.status') }), _jsx(TableHead, { children: t('delivery.cashOnHand') }), _jsx(TableHead, { children: t('delivery.activePickup') }), _jsx(TableHead, { children: t('delivery.activeDeliver') }), _jsx(TableHead, { children: t('delivery.activeReturn') }), _jsx(TableHead, { children: t('delivery.activeTransit') }), _jsx(TableHead, { children: "Vehicle & Zone" }), _jsx(TableHead, { children: "Rating" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredDeliverymen.map((deliveryman) => {
                                                    const VehicleIcon = getVehicleIcon(deliveryman.vehicleType);
                                                    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: deliveryman.employeeId }), _jsx(TableCell, { children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: deliveryman.name }), _jsxs("div", { className: "text-sm text-muted-foreground flex items-center", children: [_jsx(Phone, { className: "w-3 h-3 mr-1" }), deliveryman.phone] }), _jsxs("div", { className: "text-sm text-muted-foreground flex items-center", children: [_jsx(MapPin, { className: "w-3 h-3 mr-1" }), deliveryman.address] })] }) }), _jsx(TableCell, { children: getStatusBadge(deliveryman.status) }), _jsxs(TableCell, { className: "font-medium", children: [deliveryman.cashOnHand.toLocaleString(), " MMK"] }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", children: deliveryman.activePickup }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "default", children: deliveryman.activeDeliver }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "destructive", children: deliveryman.activeReturn }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", children: deliveryman.activeTransit }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(VehicleIcon, { className: "w-4 h-4" }), _jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium capitalize", children: deliveryman.vehicleType }), _jsx("div", { className: "text-xs text-muted-foreground", children: deliveryman.zone })] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-yellow-500", children: "\u2605" }), _jsx("span", { className: "font-medium", children: deliveryman.rating })] }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "View Details"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "w-4 h-4 mr-2" }), t('form.edit')] }), _jsxs(DropdownMenuItem, { children: [_jsx(DollarSign, { className: "w-4 h-4 mr-2" }), "Cash Advance"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Package, { className: "w-4 h-4 mr-2" }), "View Assignments"] })] })] }) })] }, deliveryman.id));
                                                }) })] }) }) })] }), _jsx(TabsContent, { value: "cash_advance", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Cash Advance Management" }), _jsx(CardDescription, { children: "Track and manage cash advances for deliverymen" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Cash advance management interface will be implemented here." }) })] }) })] })] }));
}
