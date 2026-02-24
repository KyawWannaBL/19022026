import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS, SHIPMENT_STATUS, MOCK_TOWNSHIPS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Search, Filter, Eye, ChevronRight, User, Clock, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
// Mock data for the registration queue
const MOCK_QUEUE_DATA = [
    {
        id: 'SHP-001',
        tamperTagId: 'TT-998001',
        status: SHIPMENT_STATUS.PICKED_UP_PENDING_REGISTRATION,
        pieces: 2,
        type: 'box',
        condition: 'OK',
        cod: { required: true, amount: 150 },
        destinationTownship: 'Downtown',
        photos: [
            'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400',
            'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400',
            'https://images.unsplash.com/photo-1559941727-6fb446e7e8ae?w=400'
        ],
        riderId: 'RDR-442',
        createdAt: '2026-02-11T14:30:00Z',
        labelPrintedCount: 0
    },
    {
        id: 'SHP-002',
        tamperTagId: 'TT-998005',
        status: SHIPMENT_STATUS.PICKED_UP_PENDING_REGISTRATION,
        pieces: 1,
        type: 'document',
        condition: 'OK',
        cod: { required: false },
        destinationTownship: 'Airport Zone',
        photos: [
            'https://images.unsplash.com/photo-1595054225874-7d2315262e73?w=400',
            'https://images.unsplash.com/photo-1554620158-d8d5c2f3a27b?w=400',
            'https://images.unsplash.com/photo-1595116971898-300194333127?w=400'
        ],
        riderId: 'RDR-442',
        createdAt: '2026-02-11T15:15:00Z',
        labelPrintedCount: 0
    },
    {
        id: 'SHP-003',
        tamperTagId: 'TT-997021',
        status: SHIPMENT_STATUS.PICKED_UP_PENDING_REGISTRATION,
        pieces: 5,
        type: 'other',
        condition: 'Damaged',
        cod: { required: true, amount: 2450 },
        destinationTownship: 'East Industrial',
        photos: [
            'https://images.unsplash.com/photo-1600083691960-1a52d9945594?w=400',
            'https://images.unsplash.com/photo-1646143542229-8f8b9ad26747?w=400',
            'https://images.unsplash.com/photo-1693974833425-361a83a3fcf3?w=400'
        ],
        riderId: 'RDR-109',
        createdAt: '2026-02-11T16:00:00Z',
        labelPrintedCount: 0
    }
];
const RegistrationQueue = () => {
    const navigate = useNavigate();
    const { user, legacyUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [townshipFilter, setTownshipFilter] = useState('all');
    const filteredQueue = useMemo(() => {
        return MOCK_QUEUE_DATA.filter((item) => {
            const matchesSearch = item.tamperTagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.riderId.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTownship = townshipFilter === 'all' || item.destinationTownship === townshipFilter;
            return matchesSearch && matchesTownship;
        });
    }, [searchQuery, townshipFilter]);
    const handleRegister = (ttId) => {
        navigate(ROUTE_PATHS.OFFICE.REGISTRATION.replace(':ttId', ttId));
    };
    return (_jsxs("div", { className: "space-y-6 animate-in fade-in duration-500", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Registration Queue" }), _jsx("p", { className: "text-muted-foreground", children: "Review and register shipments from provisional rider pickups." })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsxs("span", { className: "font-medium", children: ["Last Updated: ", new Date().toLocaleTimeString()] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "md:col-span-1 border-none shadow-lg bg-card/50 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4" }), "Filters"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Search" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "TT ID or Rider ID", className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Destination Township" }), _jsxs(Select, { value: townshipFilter, onValueChange: setTownshipFilter, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Township" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Townships" }), MOCK_TOWNSHIPS.map((township) => (_jsx(SelectItem, { value: township, children: township }, township)))] })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "pt-2", children: [_jsx("div", { className: "text-sm text-muted-foreground mb-2", children: "Queue Summary" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: "Total Pending" }), _jsx(Badge, { variant: "secondary", children: MOCK_QUEUE_DATA.length })] })] })] })] }), _jsx("div", { className: "md:col-span-3 space-y-4", children: filteredQueue.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-muted/20 text-muted-foreground", children: [_jsx(AlertCircle, { className: "w-10 h-10 mb-2 opacity-20" }), _jsx("p", { children: "No shipments matching your criteria." })] })) : (filteredQueue.map((shipment) => (_jsx(Card, { className: "card-modern hover:border-primary/50 transition-all cursor-pointer overflow-hidden", onClick: () => handleRegister(shipment.tamperTagId), children: _jsxs("div", { className: "flex flex-col sm:flex-row", children: [_jsxs("div", { className: "w-full sm:w-48 h-48 sm:h-auto relative bg-muted", children: [_jsx("img", { src: shipment.photos[0], alt: "Parcel", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute top-2 left-2", children: _jsxs(Badge, { className: "bg-black/60 backdrop-blur-md border-none", children: [shipment.photos.length, " Photos"] }) }), shipment.condition === 'Damaged' && (_jsx("div", { className: "absolute bottom-2 left-2", children: _jsx(Badge, { variant: "destructive", className: "animate-pulse", children: "Damaged" }) }))] }), _jsxs(CardContent, { className: "flex-1 p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Badge, { variant: "outline", className: "font-mono text-primary border-primary/30", children: shipment.tamperTagId }), _jsx("span", { className: "text-xs text-muted-foreground", children: "\u2022" }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(shipment.createdAt).toLocaleString() })] }), _jsxs("h3", { className: "text-xl font-bold flex items-center gap-2", children: [shipment.type.toUpperCase(), " - ", shipment.pieces, " PCS", shipment.cod.required && (_jsxs(Badge, { className: "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20", children: ["COD: $", shipment.cod.amount] }))] })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-muted-foreground", children: _jsx(ChevronRight, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(User, { className: "w-4 h-4 text-primary/60" }), _jsxs("span", { children: ["Rider: ", _jsx("span", { className: "font-medium text-foreground", children: shipment.riderId })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(MapPin, { className: "w-4 h-4 text-primary/60" }), _jsxs("span", { children: ["Township: ", _jsx("span", { className: "font-medium text-foreground", children: shipment.destinationTownship || 'Not Set' })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [shipment.photos.length >= 3 ? (_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" })) : (_jsx(AlertCircle, { className: "w-4 h-4 text-amber-500" })), _jsxs("span", { className: "text-muted-foreground", children: ["Evidence: ", _jsxs("span", { className: "font-medium text-foreground", children: [shipment.photos.length, "/3"] })] })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [_jsxs(Button, { variant: "outline", className: "gap-2", onClick: (e) => {
                                                            e.stopPropagation();
                                                            // View full details modal would go here
                                                        }, children: [_jsx(Eye, { className: "w-4 h-4" }), "Preview"] }), _jsxs(Button, { className: "btn-modern bg-primary gap-2", onClick: (e) => {
                                                            e.stopPropagation();
                                                            handleRegister(shipment.tamperTagId);
                                                        }, children: ["Register Shipment", _jsx(ChevronRight, { className: "w-4 h-4" })] })] })] })] }) }, shipment.id)))) })] })] }));
};
export default RegistrationQueue;
