import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Search, Filter, CheckCircle2, XCircle, Clock, UserPlus, Store, Package, MoreHorizontal, Eye, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
const RegistrationQueue = () => {
    const { user } = useAuth();
    const { language } = useLanguage();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('shipments');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [shipments, setShipments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [merchants, setMerchants] = useState([]);
    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'shipments') {
                const response = await logisticsAPI.getShipments({ status: 'PENDING' });
                if (response.success)
                    setShipments(response.shipments);
            }
            else if (activeTab === 'customers') {
                const { data } = await logisticsAPI.getProfiles({ role: 'CUSTOMER', status: 'PENDING' });
                // Cast to Customer type for demonstration - in production would use specific endpoint
                if (data)
                    setCustomers(data);
            }
            else if (activeTab === 'merchants') {
                const { data } = await logisticsAPI.getProfiles({ role: 'MERCHANT', status: 'PENDING' });
                if (data)
                    setMerchants(data);
            }
        }
        catch (error) {
            console.error('Error fetching queue data:', error);
            toast({
                title: "Error",
                description: "Failed to load registration queue items.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [activeTab]);
    const handleAction = async (id, action, type) => {
        try {
            // Mock API call for demo purposes
            toast({
                title: "Success",
                description: `${type} ${action === 'approve' ? 'approved' : 'rejected'} successfully.`,
            });
            fetchData();
        }
        catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${action} ${type}.`,
                variant: "destructive",
            });
        }
    };
    const getStatusBadge = (status) => {
        switch (status.toUpperCase()) {
            case 'PENDING':
                return _jsx(Badge, { className: "bg-amber-500/20 text-amber-500 border-amber-500/30", children: "Pending" });
            case 'APPROVED':
                return _jsx(Badge, { className: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30", children: "Approved" });
            case 'REJECTED':
                return _jsx(Badge, { className: "bg-rose-500/20 text-rose-500 border-rose-500/30", children: "Rejected" });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground p-6 space-y-8", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight text-primary font-heading", children: "Registration Queue" }), _jsx("p", { className: "text-muted-foreground", children: "Manage and process new shipment, customer, and merchant applications." })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search records...", className: "pl-10 bg-secondary/50 border-border focus:ring-primary", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Button, { variant: "outline", className: "border-primary/20 text-primary hover:bg-primary/10", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filters"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "luxury-card border-none shadow-luxury overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center", children: [_jsx(Package, { className: "h-4 w-4 mr-2 text-primary" }), "Pending Shipments"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: shipments.length }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Requiring verification" })] })] }), _jsxs(Card, { className: "luxury-card border-none shadow-luxury", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center", children: [_jsx(UserPlus, { className: "h-4 w-4 mr-2 text-primary" }), "New Customers"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: customers.length }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "KYC pending approval" })] })] }), _jsxs(Card, { className: "luxury-card border-none shadow-luxury", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs(CardTitle, { className: "text-sm font-medium text-muted-foreground flex items-center", children: [_jsx(Store, { className: "h-4 w-4 mr-2 text-primary" }), "Merchant Applications"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: merchants.length }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Contract review required" })] })] })] }), _jsxs(Tabs, { defaultValue: "shipments", className: "w-full", onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "bg-secondary/30 p-1 mb-6 border border-border/50 rounded-xl", children: [_jsx(TabsTrigger, { value: "shipments", className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: "Shipment Verification" }), _jsx(TabsTrigger, { value: "customers", className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: "Customer Onboarding" }), _jsx(TabsTrigger, { value: "merchants", className: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground", children: "Merchant Verification" })] }), _jsx(TabsContent, { value: "shipments", className: "mt-0", children: _jsx(Card, { className: "luxury-card border-none", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/50", children: [_jsx(TableHead, { className: "text-muted-foreground", children: "AWB Number" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Sender" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Receiver" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Weight/Value" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Status" }), _jsx(TableHead, { className: "text-right text-muted-foreground", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-12 text-muted-foreground", children: "Loading queue..." }) })) : shipments.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-12 text-muted-foreground", children: "No pending shipments found." }) })) : (shipments.map((shipment) => (_jsxs(TableRow, { className: "hover:bg-secondary/20 transition-colors border-border/30", children: [_jsx(TableCell, { className: "font-mono font-medium", children: shipment.awb_number }), _jsx(TableCell, { children: shipment.sender_name }), _jsx(TableCell, { children: shipment.receiver_name }), _jsxs(TableCell, { children: [_jsxs("div", { className: "text-sm", children: [shipment.weight, "kg"] }), _jsxs("div", { className: "text-xs text-muted-foreground", children: [shipment.total_cost.toLocaleString(), " MMK"] })] }), _jsx(TableCell, { children: getStatusBadge(shipment.status) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10", onClick: () => handleAction(shipment.id, 'approve', 'Shipment'), children: _jsx(CheckCircle2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-rose-500 hover:text-rose-400 hover:bg-rose-500/10", onClick: () => handleAction(shipment.id, 'reject', 'Shipment'), children: _jsx(XCircle, { className: "h-4 w-4" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", className: "bg-card border-border", children: [_jsxs(DropdownMenuItem, { children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), " View Details"] }), _jsxs(DropdownMenuItem, { children: [_jsx(ArrowRight, { className: "h-4 w-4 mr-2" }), " Re-assign Rider"] })] })] })] }) })] }, shipment.id)))) })] }) }) }), _jsx(TabsContent, { value: "customers", className: "mt-0", children: _jsx(Card, { className: "luxury-card border-none", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/50", children: [_jsx(TableHead, { className: "text-muted-foreground", children: "Full Name" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Contact" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Location" }), _jsx(TableHead, { className: "text-muted-foreground", children: "KYC Status" }), _jsx(TableHead, { className: "text-right text-muted-foreground", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-12", children: "Loading queue..." }) })) : customers.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-12 text-muted-foreground", children: "No pending customer applications." }) })) : (customers.map((customer) => (_jsxs(TableRow, { className: "hover:bg-secondary/20 transition-colors border-border/30", children: [_jsx(TableCell, { className: "font-medium", children: customer.full_name }), _jsxs(TableCell, { children: [_jsx("div", { className: "text-sm", children: customer.phone }), _jsx("div", { className: "text-xs text-muted-foreground", children: customer.email })] }), _jsxs(TableCell, { className: "text-sm", children: [customer.city, ", ", customer.state] }), _jsx(TableCell, { children: getStatusBadge(customer.kyc_status) }), _jsx(TableCell, { className: "text-right", children: _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: "text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10", onClick: () => handleAction(customer.id, 'approve', 'Customer'), children: "Approve" }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-rose-500 hover:bg-rose-500/10", onClick: () => handleAction(customer.id, 'reject', 'Customer'), children: "Reject" })] }) })] }, customer.id)))) })] }) }) }), _jsx(TabsContent, { value: "merchants", className: "mt-0", children: _jsx(Card, { className: "luxury-card border-none", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "hover:bg-transparent border-border/50", children: [_jsx(TableHead, { className: "text-muted-foreground", children: "Business Name" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Contact Person" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Vol. Target" }), _jsx(TableHead, { className: "text-muted-foreground", children: "Status" }), _jsx(TableHead, { className: "text-right text-muted-foreground", children: "Actions" })] }) }), _jsx(TableBody, { children: loading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-12", children: "Loading queue..." }) })) : merchants.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "text-center py-12 text-muted-foreground", children: "No pending merchant applications." }) })) : (merchants.map((merchant) => (_jsxs(TableRow, { className: "hover:bg-secondary/20 transition-colors border-border/30", children: [_jsxs(TableCell, { children: [_jsx("div", { className: "font-medium", children: merchant.business_name }), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["ID: ", merchant.merchant_code] })] }), _jsxs(TableCell, { children: [_jsx("div", { className: "text-sm", children: merchant.contact_person }), _jsx("div", { className: "text-xs text-muted-foreground", children: merchant.phone })] }), _jsxs(TableCell, { className: "text-sm font-mono", children: [merchant.monthly_volume.toLocaleString(), " units"] }), _jsx(TableCell, { children: getStatusBadge(merchant.status) }), _jsx(TableCell, { className: "text-right", children: _jsx("div", { className: "flex justify-end gap-2", children: _jsx(Button, { variant: "default", className: "luxury-button py-2 px-4 h-auto", onClick: () => handleAction(merchant.id, 'approve', 'Merchant'), children: "Review" }) }) })] }, merchant.id)))) })] }) }) })] }), _jsxs("section", { className: "space-y-4 mt-8", children: [_jsxs("h2", { className: "text-xl font-semibold flex items-center", children: [_jsx(Clock, { className: "h-5 w-4 mr-2 text-primary" }), "Recent Queue Activity"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, className: "p-4 rounded-xl bg-secondary/20 border border-border/40 flex items-start gap-3", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: _jsx(CheckCircle2, { className: "h-4 w-4 text-primary" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: "Shipment Approved" }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["AWB-2026-00", i, " was verified by ", user?.full_name || 'System'] }), _jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-1", children: "2 hours ago" })] })] }, i))) })] })] }));
};
export default RegistrationQueue;
