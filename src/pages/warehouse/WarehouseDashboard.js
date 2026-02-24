import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, TruckIcon, BarChart3, Clock, ArrowUp, ArrowDown, QrCode, Warehouse, Activity, RefreshCw } from 'lucide-react';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WarehouseAPI from '@/lib/warehouse-api';
import { ROUTE_PATHS } from '@/lib/index';
const StatCard = ({ title, value, icon, trend, color = 'blue', loading = false }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
        red: 'bg-red-50 text-red-600 border-red-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200'
    };
    return (_jsx(Card, { className: `${colorClasses[color]} border-2`, children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium opacity-70", children: title }), _jsx("p", { className: "text-3xl font-bold", children: loading ? '...' : value.toLocaleString() }), trend !== undefined && (_jsxs("div", { className: "flex items-center mt-2", children: [trend > 0 ? (_jsx(ArrowUp, { className: "h-4 w-4 text-green-500" })) : (_jsx(ArrowDown, { className: "h-4 w-4 text-red-500" })), _jsxs("span", { className: `text-sm ml-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`, children: [Math.abs(trend), "%"] })] }))] }), _jsx("div", { className: "p-3 rounded-full bg-white/50", children: icon })] }) }) }));
};
const QuickAction = ({ title, description, icon, to, color = 'bg-white' }) => (_jsx(Link, { to: to, children: _jsx(Card, { className: `${color} hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20`, children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "p-3 rounded-full bg-primary/10", children: icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: title }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] })] }) }) }) }));
export default function WarehouseDashboard() {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [user, setUser] = useState(null);
    const [station, setStation] = useState(null);
    const [stats, setStats] = useState({
        totalParcels: 0,
        inbound: 0,
        sorting: 0,
        sorted: 0,
        manifested: 0,
        outbound: 0,
        todayOperations: 0
    });
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const loadData = async () => {
        try {
            setLoading(true);
            // Get warehouse user profile
            const warehouseUser = await WarehouseAPI.getWarehouseUser();
            if (warehouseUser) {
                setUser(warehouseUser);
                // Get station information
                const stationData = await WarehouseAPI.getWarehouseStation(warehouseUser.station_id);
                setStation(stationData);
                // Get warehouse statistics
                const statsData = await WarehouseAPI.getWarehouseStats(warehouseUser.station_id);
                setStats(statsData);
            }
            setLastRefresh(new Date());
        }
        catch (error) {
            console.error('Error loading warehouse data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadData();
        // Auto-refresh every 30 seconds
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);
    const refreshData = () => {
        loadData();
    };
    if (loading && !user) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-lg font-medium", children: t('warehouse.loading') })] }) }));
    }
    if (!user) {
        return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-center text-red-600", children: t('warehouse.error') }), _jsx(CardDescription, { className: "text-center", children: "Warehouse user profile not found. Please contact administrator." })] }), _jsx(CardContent, { children: _jsxs(Button, { onClick: refreshData, className: "w-full", variant: "outline", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), t('warehouse.tryAgain')] }) })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center py-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-900", children: [t('warehouse.hello'), ", ", user.full_name] }), _jsxs("p", { className: "text-lg text-gray-600", children: [station?.station_name || 'Warehouse', " \u2022 ", user.role] }), _jsxs("div", { className: "flex items-center mt-2 text-sm text-gray-500", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), t('common.lastUpdated'), ": ", lastRefresh.toLocaleTimeString()] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Badge, { variant: "outline", className: "text-green-600 border-green-600", children: [_jsx(Activity, { className: "h-4 w-4 mr-1" }), t('common.online')] }), _jsxs(Button, { onClick: refreshData, variant: "outline", size: "sm", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), t('warehouse.refresh')] })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsx(StatCard, { title: t('warehouse.totalParcels'), value: stats.totalParcels, icon: _jsx(Package, { className: "h-6 w-6" }), color: "blue", loading: loading }), _jsx(StatCard, { title: t('warehouse.inboundReceived'), value: stats.inbound, icon: _jsx(ArrowDown, { className: "h-6 w-6" }), color: "green", loading: loading }), _jsx(StatCard, { title: t('warehouse.sorting'), value: stats.sorting, icon: _jsx(Activity, { className: "h-6 w-6" }), color: "yellow", loading: loading }), _jsx(StatCard, { title: t('warehouse.todayOperations'), value: stats.todayOperations, icon: _jsx(BarChart3, { className: "h-6 w-6" }), color: "purple", loading: loading })] }), _jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(TruckIcon, { className: "h-5 w-5 mr-2" }), t('warehouse.operations'), " ", t('common.status')] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.inbound }), _jsx("div", { className: "text-sm text-blue-600", children: t('warehouse.receiving') })] }), _jsxs("div", { className: "text-center p-4 bg-yellow-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: stats.sorting }), _jsx("div", { className: "text-sm text-yellow-600", children: t('warehouse.sorting') })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: stats.sorted }), _jsx("div", { className: "text-sm text-green-600", children: t('warehouse.sorted') })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.outbound }), _jsx("div", { className: "text-sm text-purple-600", children: t('warehouse.shipping') })] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsx(QuickAction, { title: t('warehouse.scanQR'), description: "Scan QR codes for receiving, sorting, and shipping", icon: _jsx(QrCode, { className: "h-6 w-6 text-primary" }), to: ROUTE_PATHS.WAREHOUSE_QR_SCANNER, color: "bg-gradient-to-r from-blue-50 to-blue-100" }), _jsx(QuickAction, { title: t('warehouse.receiving'), description: "Scan in parcels and manage inbound operations", icon: _jsx(ArrowDown, { className: "h-6 w-6 text-green-600" }), to: ROUTE_PATHS.WAREHOUSE_SCAN_IN, color: "bg-gradient-to-r from-green-50 to-green-100" }), _jsx(QuickAction, { title: t('warehouse.sorting'), description: "Sort parcels by routes and destinations", icon: _jsx(Activity, { className: "h-6 w-6 text-yellow-600" }), to: ROUTE_PATHS.WAREHOUSE_SORTING, color: "bg-gradient-to-r from-yellow-50 to-yellow-100" }), _jsx(QuickAction, { title: t('warehouse.shipping'), description: "Scan out parcels for delivery and transfer", icon: _jsx(ArrowUp, { className: "h-6 w-6 text-purple-600" }), to: ROUTE_PATHS.WAREHOUSE_SCAN_OUT, color: "bg-gradient-to-r from-purple-50 to-purple-100" }), _jsx(QuickAction, { title: t('warehouse.inventory'), description: "View and manage warehouse inventory", icon: _jsx(Package, { className: "h-6 w-6 text-indigo-600" }), to: ROUTE_PATHS.WAREHOUSE_INVENTORY, color: "bg-gradient-to-r from-indigo-50 to-indigo-100" }), _jsx(QuickAction, { title: t('warehouse.manifests'), description: "Create and manage delivery manifests", icon: _jsx(TruckIcon, { className: "h-6 w-6 text-red-600" }), to: ROUTE_PATHS.WAREHOUSE_MANIFESTS, color: "bg-gradient-to-r from-red-50 to-red-100" })] }), station && (_jsxs(Card, { className: "mt-8", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Warehouse, { className: "h-5 w-5 mr-2" }), t('warehouse.dashboard'), " ", t('common.information')] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: t('common.station') }), _jsx("p", { className: "text-lg font-semibold", children: language === 'my' ? station.station_name_my || station.station_name : station.station_name }), _jsx("p", { className: "text-sm text-gray-600", children: station.station_code })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: t('common.zone') }), _jsx("p", { className: "text-lg font-semibold", children: station.zone || '-' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: t('common.capacity') }), _jsxs("p", { className: "text-lg font-semibold", children: [station.capacity?.toLocaleString() || '-', " parcels"] })] })] }) })] }))] })] }));
}
