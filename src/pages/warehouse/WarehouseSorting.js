import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Package, ArrowLeft, RefreshCw, Search, Filter, CheckSquare, Square, ArrowRight, MapPin, Truck, Clock, User } from 'lucide-react';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import WarehouseAPI from '@/lib/warehouse-api';
import { ROUTE_PATHS } from '@/lib/index';
const SORT_BINS = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3'];
const ROUTE_CODES = ['R001', 'R002', 'R003', 'R004', 'R005', 'R006', 'R007', 'R008'];
export default function WarehouseSorting() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [user, setUser] = useState(null);
    const [parcels, setParcels] = useState([]);
    const [filteredParcels, setFilteredParcels] = useState([]);
    const [selectedParcels, setSelectedParcels] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [routeFilter, setRouteFilter] = useState('all');
    // Bulk actions
    const [bulkSortBin, setBulkSortBin] = useState('A1');
    const [bulkRouteCode, setBulkRouteCode] = useState('R001');
    // Statistics
    const [stats, setStats] = useState({
        inbound: 0,
        sorting: 0,
        sorted: 0,
        todaySorted: 0
    });
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        filterParcels();
    }, [parcels, searchTerm, statusFilter, routeFilter]);
    const loadData = async () => {
        try {
            setLoading(true);
            // Get warehouse user
            const warehouseUser = await WarehouseAPI.getWarehouseUser();
            if (!warehouseUser) {
                throw new Error('Warehouse user not found');
            }
            setUser(warehouseUser);
            // Get parcels that need sorting (inbound_received and sorting status)
            const allParcels = await WarehouseAPI.getParcelsByStation(warehouseUser.station_id);
            const sortableParcels = allParcels.filter(p => p.status === 'inbound_received' || p.status === 'sorting' || p.status === 'sorted');
            setParcels(sortableParcels);
            // Calculate statistics
            const inbound = sortableParcels.filter(p => p.status === 'inbound_received').length;
            const sorting = sortableParcels.filter(p => p.status === 'sorting').length;
            const sorted = sortableParcels.filter(p => p.status === 'sorted').length;
            // Get today's sorted count
            const operations = await WarehouseAPI.getOperations(warehouseUser.station_id, 100);
            const today = new Date().toDateString();
            const todaySorted = operations.filter(op => new Date(op.createdAt).toDateString() === today &&
                op.operation_type === 'sort' &&
                op.to_status === 'sorted').length;
            setStats({ inbound, sorting, sorted, todaySorted });
        }
        catch (error) {
            console.error('Error loading sorting data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const filterParcels = () => {
        let filtered = parcels;
        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(p => p.awb.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.sender_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(p => p.status === statusFilter);
        }
        // Route filter
        if (routeFilter !== 'all') {
            filtered = filtered.filter(p => p.route_code === routeFilter);
        }
        setFilteredParcels(filtered);
    };
    const toggleParcelSelection = (parcelId) => {
        const newSelected = new Set(selectedParcels);
        if (newSelected.has(parcelId)) {
            newSelected.delete(parcelId);
        }
        else {
            newSelected.add(parcelId);
        }
        setSelectedParcels(newSelected);
    };
    const selectAllFiltered = () => {
        const allIds = new Set(filteredParcels.map(p => p.id));
        setSelectedParcels(allIds);
    };
    const clearSelection = () => {
        setSelectedParcels(new Set());
    };
    const applySorting = async () => {
        if (selectedParcels.size === 0)
            return;
        setProcessing(true);
        try {
            const promises = Array.from(selectedParcels).map(parcelId => WarehouseAPI.updateParcelStatus(parcelId, 'sorted', 'sort', {
                sortBin: bulkSortBin,
                routeCode: bulkRouteCode,
                notes: `Sorted to bin ${bulkSortBin}, route ${bulkRouteCode}`
            }));
            await Promise.all(promises);
            // Refresh data
            await loadData();
            clearSelection();
        }
        catch (error) {
            console.error('Error applying sorting:', error);
        }
        finally {
            setProcessing(false);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'inbound_received': return 'bg-blue-100 text-blue-800';
            case 'sorting': return 'bg-yellow-100 text-yellow-800';
            case 'sorted': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'inbound_received': return t('warehouse.inboundReceived');
            case 'sorting': return t('warehouse.sorting');
            case 'sorted': return t('warehouse.sorted');
            default: return status;
        }
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-lg font-medium", children: t('warehouse.loading') })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between py-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_DASHBOARD, children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), t('common.back')] }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center", children: [_jsx(Activity, { className: "h-6 w-6 mr-2 text-yellow-600" }), t('warehouse.sorting'), " ", t('warehouse.operations')] }), _jsx("p", { className: "text-gray-600", children: "Sort parcels by destinationTownship routes and bins" })] })] }), _jsxs(Button, { onClick: loadData, variant: "outline", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), t('warehouse.refresh')] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(Card, { className: "bg-blue-50 border-blue-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-blue-600", children: t('warehouse.inboundReceived') }), _jsx("p", { className: "text-3xl font-bold text-blue-700", children: stats.inbound })] }), _jsx(Package, { className: "h-8 w-8 text-blue-600" })] }) }) }), _jsx(Card, { className: "bg-yellow-50 border-yellow-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-yellow-600", children: t('warehouse.sorting') }), _jsx("p", { className: "text-3xl font-bold text-yellow-700", children: stats.sorting })] }), _jsx(Activity, { className: "h-8 w-8 text-yellow-600" })] }) }) }), _jsx(Card, { className: "bg-green-50 border-green-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-green-600", children: t('warehouse.sorted') }), _jsx("p", { className: "text-3xl font-bold text-green-700", children: stats.sorted })] }), _jsx(ArrowRight, { className: "h-8 w-8 text-green-600" })] }) }) }), _jsx(Card, { className: "bg-purple-50 border-purple-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-purple-600", children: "Today Sorted" }), _jsx("p", { className: "text-3xl font-bold text-purple-700", children: stats.todaySorted })] }), _jsx(Clock, { className: "h-8 w-8 text-purple-600" })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsxs("div", { className: "lg:col-span-1 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Filter, { className: "h-5 w-5 mr-2" }), t('warehouse.filter')] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('warehouse.search') }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), _jsx(Input, { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search tracking, sender, receiver", className: "pl-10" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('common.status') }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "inbound_received", children: "Inbound Received" }), _jsx(SelectItem, { value: "sorting", children: "Sorting" }), _jsx(SelectItem, { value: "sorted", children: "Sorted" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('warehouse.routeCode') }), _jsxs(Select, { value: routeFilter, onValueChange: setRouteFilter, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Routes" }), ROUTE_CODES.map(route => (_jsx(SelectItem, { value: route, children: route }, route)))] })] })] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Bulk Sorting" }), _jsx(CardDescription, { children: "Apply sorting to selected parcels" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('warehouse.sortBin') }), _jsxs(Select, { value: bulkSortBin, onValueChange: setBulkSortBin, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: SORT_BINS.map(bin => (_jsx(SelectItem, { value: bin, children: bin }, bin))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('warehouse.routeCode') }), _jsxs(Select, { value: bulkRouteCode, onValueChange: setBulkRouteCode, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: ROUTE_CODES.map(route => (_jsx(SelectItem, { value: route, children: route }, route))) })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { onClick: selectAllFiltered, variant: "outline", size: "sm", className: "flex-1", children: "Select All" }), _jsx(Button, { onClick: clearSelection, variant: "outline", size: "sm", className: "flex-1", children: "Clear" })] }), _jsx(Button, { onClick: applySorting, disabled: selectedParcels.size === 0 || processing, className: "w-full bg-yellow-600 hover:bg-yellow-700", children: processing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowRight, { className: "h-4 w-4 mr-2" }), "Sort ", selectedParcels.size, " Parcels"] })) })] })] })] }), _jsx("div", { className: "lg:col-span-3", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Package, { className: "h-5 w-5 mr-2" }), "Parcels for Sorting (", filteredParcels.length, ")"] }), _jsxs(Badge, { variant: "outline", children: [selectedParcels.size, " selected"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: filteredParcels.length === 0 ? (_jsxs("div", { className: "text-center py-12 text-gray-500", children: [_jsx(Package, { className: "h-16 w-16 mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-lg font-medium", children: "No parcels found" }), _jsx("p", { children: "Try adjusting your filters or check back later" })] })) : (filteredParcels.map(parcel => (_jsx(Card, { className: `cursor-pointer transition-all ${selectedParcels.has(parcel.id)
                                                        ? 'ring-2 ring-yellow-500 bg-yellow-50'
                                                        : 'hover:shadow-md'}`, onClick: () => toggleParcelSelection(parcel.id), children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "mt-1", children: selectedParcels.has(parcel.id) ? (_jsx(CheckSquare, { className: "h-5 w-5 text-yellow-600" })) : (_jsx(Square, { className: "h-5 w-5 text-gray-400" })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("h3", { className: "font-semibold text-lg", children: parcel.awb }), _jsx(Badge, { className: getStatusColor(parcel.status), children: getStatusText(parcel.status) }), parcel.is_fragile && (_jsx(Badge, { variant: "destructive", children: "Fragile" }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsx("strong", { children: "From:" }), " ", parcel.sender_name] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsx("strong", { children: "To:" }), " ", parcel.receiver_name] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Package, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsx("strong", { children: "Type:" }), " ", parcel.package_type] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsx("strong", { children: "Bin:" }), " ", parcel.sort_bin || 'Not assigned'] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Truck, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsx("strong", { children: "Route:" }), " ", parcel.route_code || 'Not assigned'] })] }), parcel.cod_amount > 0 && (_jsx("div", { className: "flex items-center space-x-2", children: _jsxs("span", { className: "text-orange-600 font-medium", children: ["COD: ", parcel.cod_amount.toLocaleString(), " MMK"] }) }))] })] })] })] }) }) }) }, parcel.id)))) }) })] }) })] })] })] }));
}
