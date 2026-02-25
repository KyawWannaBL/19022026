import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Package, Search, QrCode, CheckCircle2, ArrowRightLeft, Truck, AlertCircle, ChevronRight, MapPin, Hash, Box } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { logisticsAPI } from '@/services/logistics-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
const SubstationReceiving = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const queryClient = useQueryClient();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('incoming');
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
    // Fetch shipments intended for this substation or in transit to it
    const { data: shipmentsData, isLoading } = useQuery({
        queryKey: ['substation-receiving', user?.branch_id],
        queryFn: () => logisticsAPI.getShipments({
            limit: 100,
        }),
        enabled: !!user?.branch_id,
    });
    // Mock/Simulated filtering based on role and branch
    const filteredShipments = useMemo(() => {
        if (!shipmentsData?.shipments)
            return [];
        return shipmentsData.shipments.filter(s => {
            const matchesSearch = s.awb_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.receiver_name.toLowerCase().includes(searchQuery.toLowerCase());
            // Logic: Show shipments whose destinationTownship is this branch or currently assigned to arrive here
            const isRelevant = s.destinationTownship_branch_id === user?.branch_id || s.current_location === user?.branch_id;
            return matchesSearch && isRelevant;
        });
    }, [shipmentsData, searchQuery, user?.branch_id]);
    const stats = useMemo(() => ({
        pending: filteredShipments.filter(s => s.status === 'IN_TRANSIT').length,
        receivedToday: filteredShipments.filter(s => s.status === 'ARRIVED_AT_SUBSTATION').length,
        forwarded: filteredShipments.filter(s => s.status === 'DEPARTED_FROM_SUBSTATION').length,
    }), [filteredShipments]);
    const receiveMutation = useMutation({
        mutationFn: async (shipmentId) => {
            return logisticsAPI.updateShipmentStatus(shipmentId, 'ARRIVED_AT_SUBSTATION', user?.branch_id || 'Unknown Substation', user?.id || 'system', 'Package received and checked at substation receiving bay.');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['substation-receiving'] });
            toast.success('Shipment received successfully');
            setIsProcessDialogOpen(false);
        },
        onError: () => toast.error('Failed to update shipment status'),
    });
    const handleProcess = (shipment) => {
        setSelectedShipment(shipment);
        setIsProcessDialogOpen(true);
    };
    const renderShipmentRow = (shipment) => (_jsxs(TableRow, { className: "hover:bg-muted/50 transition-colors border-b border-border/40", children: [_jsx(TableCell, { className: "font-mono font-bold text-primary", children: shipment.awb }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: shipment.receiver_name }), _jsx("span", { className: "text-xs text-muted-foreground", children: shipment.receiver_city })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: shipment.status === 'IN_TRANSIT' ? 'outline' : 'secondary', className: "capitalize", children: shipment.status.replace(/_/g, ' ') }) }), _jsxs(TableCell, { className: "text-right font-mono", children: [shipment.weight, " kg"] }), _jsx(TableCell, { className: "text-right", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "text-primary hover:text-primary hover:bg-primary/10", onClick: () => handleProcess(shipment), children: [_jsx(ChevronRight, { className: "h-4 w-4 mr-1" }), t('Process') || 'Process'] }) })] }, shipment.id));
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground p-6 lg:p-10 space-y-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-6", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("h1", { className: "text-3xl font-bold tracking-tight text-foreground flex items-center gap-3", children: [_jsx(Box, { className: "h-8 w-8 text-primary" }), t('Substation Receiving') || 'Substation Receiving'] }), _jsx("p", { className: "text-muted-foreground", children: t('Manage incoming parcels, sorting, and dispatch prep.') || 'Manage incoming parcels, sorting, and dispatch prep.' })] }), _jsx("div", { className: "grid grid-cols-3 gap-4 w-full md:w-auto", children: [
                            { label: 'Pending', value: stats.pending, icon: Truck, color: 'text-amber-500' },
                            { label: 'Received', value: stats.receivedToday, icon: CheckCircle2, color: 'text-emerald-500' },
                            { label: 'Forwarded', value: stats.forwarded, icon: ArrowRightLeft, color: 'text-blue-500' }
                        ].map((stat, idx) => (_jsxs("div", { className: "luxury-card p-4 flex flex-col items-center justify-center min-w-[100px] bg-card/40 backdrop-blur-sm", children: [_jsx(stat.icon, { className: `h-5 w-5 mb-2 ${stat.color}` }), _jsx("span", { className: "text-2xl font-bold font-mono", children: stat.value }), _jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: t(stat.label) || stat.label })] }, idx))) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: t('Search AWB or Recipient...') || 'Search AWB or Recipient...', className: "pl-10 bg-muted/20 border-border/50 focus:border-primary/50 h-12 rounded-xl", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Button, { className: "luxury-button h-12 px-8", children: [_jsx(QrCode, { className: "mr-2 h-4 w-4" }), t('Scan Package') || 'Scan Package'] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), className: "w-full", children: [_jsxs(TabsList, { className: "bg-muted/30 p-1 rounded-xl border border-border/40", children: [_jsx(TabsTrigger, { value: "incoming", className: "rounded-lg px-6", children: t('Incoming') || 'Incoming' }), _jsx(TabsTrigger, { value: "processing", className: "rounded-lg px-6", children: t('In Branch') || 'In Branch' }), _jsx(TabsTrigger, { value: "completed", className: "rounded-lg px-6", children: t('Forwarded') || 'Forwarded' })] }), _jsx("div", { className: "mt-6 luxury-card overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { className: "bg-muted/50", children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[150px]", children: t('AWB Number') || 'AWB Number' }), _jsx(TableHead, { children: t('Recipient') || 'Recipient' }), _jsx(TableHead, { children: t('Status') || 'Status' }), _jsx(TableHead, { className: "text-right", children: t('Weight') || 'Weight' }), _jsx(TableHead, { className: "text-right", children: t('Action') || 'Action' })] }) }), _jsx(TableBody, { children: isLoading ? (Array(5).fill(0).map((_, i) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-24" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-32" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-20" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-12 ml-auto" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-8 w-20 ml-auto" }) })] }, i)))) : filteredShipments.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-64 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Package, { className: "h-12 w-12 mb-4 opacity-20" }), _jsx("p", { children: t('No shipments found matching criteria.') || 'No shipments found matching criteria.' })] }) }) })) : (filteredShipments
                                                        .filter(s => {
                                                        if (activeTab === 'incoming')
                                                            return s.status === 'IN_TRANSIT';
                                                        if (activeTab === 'processing')
                                                            return s.status === 'ARRIVED_AT_SUBSTATION';
                                                        if (activeTab === 'completed')
                                                            return s.status === 'DEPARTED_FROM_SUBSTATION';
                                                        return true;
                                                    })
                                                        .map(renderShipmentRow)) })] }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "luxury-card border-none", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5 text-primary" }), t('Substation Info') || 'Substation Info'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: t('Branch Code') || 'Branch Code' }), _jsx("span", { className: "font-mono", children: user?.branch_id || '---' })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-muted-foreground", children: t('Operating Hours') || 'Operating Hours' }), _jsx("span", { className: "font-medium text-emerald-500", children: "08:00 - 20:00" })] }), _jsxs("div", { className: "pt-4 border-t border-border/40", children: [_jsx("h4", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3", children: t('Sorting Zones') || 'Sorting Zones' }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: ['Zone A (North)', 'Zone B (East)', 'Zone C (Central)', 'Zone D (Special)'].map(zone => (_jsx("div", { className: "bg-muted/30 p-2 rounded-lg text-[10px] font-medium border border-border/20 text-center", children: zone }, zone))) })] })] })] }), _jsx(Card, { className: "luxury-card border-none bg-primary/5", children: _jsxs(CardContent, { className: "pt-6 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3 text-primary", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx("span", { className: "font-bold", children: t('Daily Compliance') || 'Daily Compliance' })] }), _jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: t('Ensure all packages are scanned within 30 minutes of vehicle arrival. Report any damaged seals immediately to the supervisor.') || 'Ensure all packages are scanned within 30 minutes of vehicle arrival. Report any damaged seals immediately to the supervisor.' }), _jsx(Button, { variant: "outline", className: "w-full text-xs h-8 border-primary/20 hover:bg-primary/10", children: t('View Procedures') || 'View Procedures' })] }) })] })] }), _jsx(Dialog, { open: isProcessDialogOpen, onOpenChange: setIsProcessDialogOpen, children: _jsxs(DialogContent, { className: "luxury-card bg-background border-border/40 sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-2xl font-bold", children: t('Shipment Processing') || 'Shipment Processing' }), _jsx(DialogDescription, { className: "font-mono text-primary", children: selectedShipment?.awb_number })] }), _jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground", children: t('Sender') || 'Sender' }), _jsx("p", { className: "font-medium text-sm", children: selectedShipment?.sender_name })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground", children: t('Receiver') || 'Receiver' }), _jsx("p", { className: "font-medium text-sm", children: selectedShipment?.receiver_name })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground", children: t('Weight') || 'Weight' }), _jsxs("p", { className: "font-medium text-sm", children: [selectedShipment?.weight, " kg"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[10px] uppercase text-muted-foreground", children: t('COD Amount') || 'COD Amount' }), _jsxs("p", { className: "font-medium text-sm text-emerald-500", children: [selectedShipment?.cod_amount, " MMK"] })] })] }), _jsxs("div", { className: "bg-muted/20 p-4 rounded-xl space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-bold", children: [_jsx(Hash, { className: "h-4 w-4 text-primary" }), t('Assign Storage Zone') || 'Assign Storage Zone'] }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(bin => (_jsx(Button, { variant: "outline", size: "sm", className: "hover:bg-primary/10 hover:border-primary/50", children: bin }, bin))) })] })] }), _jsxs(DialogFooter, { className: "gap-2", children: [_jsx(Button, { variant: "ghost", onClick: () => setIsProcessDialogOpen(false), children: t('Cancel') || 'Cancel' }), _jsx(Button, { className: "luxury-button bg-primary text-black hover:bg-primary/90", disabled: receiveMutation.isPending || selectedShipment?.status === 'ARRIVED_AT_SUBSTATION', onClick: () => selectedShipment && receiveMutation.mutate(selectedShipment.id), children: receiveMutation.isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-3 w-3 border-2 border-black border-t-transparent rounded-full animate-spin" }), t('Processing...') || 'Processing...'] })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), t('Confirm Receipt') || 'Confirm Receipt'] })) })] })] }) })] }));
};
export default SubstationReceiving;
