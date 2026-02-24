import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Store, Plus, Receipt, DollarSign, CreditCard, Calendar, Search, Filter, Download, Eye, Edit, MoreHorizontal, Phone, Mail, MapPin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
const mockMerchants = [
    {
        id: '1',
        merchantId: 'M001',
        name: 'Golden Shop',
        phone: '+95 9 123 456 789',
        email: 'golden@shop.com',
        address: 'Yangon, Kamayut Township',
        activeWays: 15,
        completedWays: 245,
        toRefund: 50000,
        priceProfile: 'Premium',
        status: 'active',
        joinDate: '2025-01-15',
        totalRevenue: 2500000
    },
    {
        id: '2',
        merchantId: 'M002',
        name: 'Tech Store Myanmar',
        phone: '+95 9 987 654 321',
        email: 'tech@store.mm',
        address: 'Mandalay, Chan Aye Thar Zan',
        activeWays: 8,
        completedWays: 156,
        toRefund: 25000,
        priceProfile: 'Standard',
        status: 'active',
        joinDate: '2025-03-20',
        totalRevenue: 1800000
    },
    {
        id: '3',
        merchantId: 'M003',
        name: 'Fashion Hub',
        phone: '+95 9 555 666 777',
        email: 'fashion@hub.com',
        address: 'Yangon, Bahan Township',
        activeWays: 3,
        completedWays: 89,
        toRefund: 15000,
        priceProfile: 'Basic',
        status: 'inactive',
        joinDate: '2025-06-10',
        totalRevenue: 950000
    }
];
export default function Merchants() {
    const { t, language } = useLanguageContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('list');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { variant: 'default', label: 'Active' },
            inactive: { variant: 'secondary', label: 'Inactive' },
            suspended: { variant: 'destructive', label: 'Suspended' }
        };
        const config = statusConfig[status];
        return _jsx(Badge, { variant: config.variant, children: config.label });
    };
    const filteredMerchants = mockMerchants.filter(merchant => merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.merchantId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.phone.includes(searchTerm));
    const AddMerchantDialog = () => (_jsxs(Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), t('merchant.addNew')] }) }), _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: t('merchant.addNew') }), _jsx(DialogDescription, { children: "Add a new merchant to the system" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: t('merchant.name') }), _jsx(Input, { id: "name", placeholder: "Enter merchant name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: t('merchant.phone') }), _jsx(Input, { id: "phone", placeholder: "+95 9 xxx xxx xxx" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "merchant@example.com" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "address", children: "Address" }), _jsx(Textarea, { id: "address", placeholder: "Enter full address" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "priceProfile", children: t('merchant.priceProfile') }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select price profile" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "basic", children: "Basic" }), _jsx(SelectItem, { value: "standard", children: "Standard" }), _jsx(SelectItem, { value: "premium", children: "Premium" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsAddDialogOpen(false), children: t('form.cancel') }), _jsx(Button, { onClick: () => setIsAddDialogOpen(false), children: t('form.save') })] })] })] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: t('nav.merchants') }), _jsx("p", { className: "text-muted-foreground", children: "Manage merchants, receipts, and financial operations" })] }), _jsx(AddMerchantDialog, {})] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Merchants" }), _jsx(Store, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockMerchants.length }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+2 new this month" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Active Merchants" }), _jsx(Store, { className: "h-4 w-4 text-green-600" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: mockMerchants.filter(m => m.status === 'active').length }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [Math.round((mockMerchants.filter(m => m.status === 'active').length / mockMerchants.length) * 100), "% of total"] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: "Total Revenue" }), _jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: [mockMerchants.reduce((sum, m) => sum + m.totalRevenue, 0).toLocaleString(), " MMK"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "+12% from last month" })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: t('merchant.toRefund') }), _jsx(CreditCard, { className: "h-4 w-4 text-muted-foreground" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold", children: [mockMerchants.reduce((sum, m) => sum + m.toRefund, 0).toLocaleString(), " MMK"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Pending refunds" })] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [_jsxs(TabsTrigger, { value: "list", className: "flex items-center gap-2", children: [_jsx(Store, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('merchant.list') })] }), _jsxs(TabsTrigger, { value: "receipts", className: "flex items-center gap-2", children: [_jsx(Receipt, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('merchant.receipts') })] }), _jsxs(TabsTrigger, { value: "financial", className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('merchant.financialCenter') })] }), _jsxs(TabsTrigger, { value: "invoicing", className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('merchant.invoiceScheduling') })] }), _jsxs(TabsTrigger, { value: "accounts", className: "flex items-center gap-2", children: [_jsx(CreditCard, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: t('merchant.bankAccountList') })] })] }), _jsxs(TabsContent, { value: "list", className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" }), _jsx(Input, { placeholder: t('form.search') + ' merchants...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-9" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "Filter"] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] })] })] }), _jsx(Card, { children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: t('merchant.merchantId') }), _jsx(TableHead, { children: t('merchant.name') }), _jsx(TableHead, { children: t('merchant.phone') }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: t('merchant.activeWays') }), _jsx(TableHead, { children: t('merchant.completedWays') }), _jsx(TableHead, { children: t('merchant.toRefund') }), _jsx(TableHead, { children: t('merchant.priceProfile') }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredMerchants.map((merchant) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: merchant.merchantId }), _jsx(TableCell, { children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: merchant.name }), _jsxs("div", { className: "text-sm text-muted-foreground flex items-center", children: [_jsx(MapPin, { className: "w-3 h-3 mr-1" }), merchant.address] })] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(Phone, { className: "w-3 h-3 mr-1" }), merchant.phone] }) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center", children: [_jsx(Mail, { className: "w-3 h-3 mr-1" }), merchant.email] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: "secondary", children: merchant.activeWays }) }), _jsx(TableCell, { children: merchant.completedWays }), _jsxs(TableCell, { className: "text-red-600 font-medium", children: [merchant.toRefund.toLocaleString(), " MMK"] }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", children: merchant.priceProfile }) }), _jsx(TableCell, { children: getStatusBadge(merchant.status) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(MoreHorizontal, { className: "w-4 h-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), "View Details"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Edit, { className: "w-4 h-4 mr-2" }), t('form.edit')] }), _jsxs(DropdownMenuItem, { children: [_jsx(Receipt, { className: "w-4 h-4 mr-2" }), "View Receipts"] }), _jsxs(DropdownMenuItem, { children: [_jsx(DollarSign, { className: "w-4 h-4 mr-2" }), "Financial Details"] })] })] }) })] }, merchant.id))) })] }) }) })] }), _jsx(TabsContent, { value: "receipts", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: t('merchant.receipts') }), _jsx(CardDescription, { children: "View and manage merchant receipts and payment records" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Receipts management interface will be implemented here." }) })] }) }), _jsx(TabsContent, { value: "financial", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: t('merchant.financialCenter') }), _jsx(CardDescription, { children: "Merchant financial overview and management" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Financial center interface will be implemented here." }) })] }) }), _jsx(TabsContent, { value: "invoicing", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: t('merchant.invoiceScheduling') }), _jsx(CardDescription, { children: "Schedule and manage merchant invoices" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Invoice scheduling interface will be implemented here." }) })] }) }), _jsx(TabsContent, { value: "accounts", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: t('merchant.bankAccountList') }), _jsx(CardDescription, { children: "Manage merchant bank accounts and payment methods" })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Bank account management interface will be implemented here." }) })] }) })] })] }));
}
