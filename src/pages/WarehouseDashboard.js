import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Package, Scan, CheckCircle, Truck, BarChart3, RefreshCw, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/ui/SharedComponents';
import { useLanguageContext } from '@/lib/LanguageContext';
const mockStats = {
    inbound: 45,
    sorted: 32,
    manifested: 18,
    outForDelivery: 12
};
const mockRecentScans = [
    {
        id: '1',
        trackingNumber: 'BE-2024-001',
        action: 'received',
        location: 'Dock A-1',
        timestamp: '2024-01-17 09:15:23',
        processedBy: 'Warehouse Staff 1'
    },
    {
        id: '2',
        trackingNumber: 'BE-2024-002',
        action: 'sorted',
        location: 'Zone B-3',
        timestamp: '2024-01-17 09:12:45',
        processedBy: 'Warehouse Staff 2'
    },
    {
        id: '3',
        trackingNumber: 'BE-2024-003',
        action: 'manifested',
        location: 'Loading Bay 2',
        timestamp: '2024-01-17 09:08:12',
        processedBy: 'Warehouse Staff 1'
    }
];
export default function WarehouseDashboard() {
    const { t } = useLanguageContext();
    const [activeStage, setActiveStage] = useState('Scanning');
    const [barcode, setBarcode] = useState('');
    const [location, setLocation] = useState('');
    const [recentScans, setRecentScans] = useState(mockRecentScans);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    // Auto-focus input for continuous scanning
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeStage]);
    const handleScan = async () => {
        if (!barcode.trim())
            return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newScan = {
                id: Date.now().toString(),
                trackingNumber: barcode,
                action: 'received',
                location: location || 'Default Location',
                timestamp: new Date().toLocaleString(),
                processedBy: 'Current User'
            };
            setRecentScans(prev => [newScan, ...prev.slice(0, 4)]);
            setBarcode('');
            setLocation('');
            setLoading(false);
            inputRef.current?.focus();
        }, 1000);
    };
    const getActionBadge = (action) => {
        const actionConfig = {
            received: { label: t('warehouse.inbound'), variant: 'secondary' },
            sorted: { label: t('warehouse.sorted'), variant: 'default' },
            manifested: { label: t('warehouse.manifested'), variant: 'outline' },
            dispatched: { label: t('warehouse.outForDelivery'), variant: 'default' },
        };
        const config = actionConfig[action];
        return _jsx(Badge, { variant: config.variant, children: config.label });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-navy-900", children: t('warehouse.dashboard') }), _jsx("p", { className: "text-sm text-gray-500", children: t('Real-time warehouse operations and package tracking') })] }), _jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), _jsx("span", { children: t('common.refresh') })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(StatCard, { title: t('warehouse.inbound'), value: mockStats.inbound.toString(), hint: t('Packages received'), tone: "blue", icon: Package }), _jsx(StatCard, { title: t('warehouse.sorted'), value: mockStats.sorted.toString(), hint: t('Ready for manifest'), tone: "orange", icon: CheckCircle }), _jsx(StatCard, { title: t('warehouse.manifested'), value: mockStats.manifested.toString(), hint: t('Ready for dispatch'), tone: "purple", icon: BarChart3 }), _jsx(StatCard, { title: t('warehouse.outForDelivery'), value: mockStats.outForDelivery.toString(), hint: t('In transit'), tone: "green", icon: Truck })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "shadow-lg", children: [_jsx(CardHeader, { className: "bg-gradient-to-r from-navy-900 to-navy-800 text-white", children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Scan, { className: "h-5 w-5 mr-2" }), t('warehouse.scanning'), " ", t('Interface')] }) }), _jsx(CardContent, { className: "p-6", children: _jsxs(Tabs, { value: activeStage, onValueChange: setActiveStage, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "Scanning", children: t('Scan') }), _jsx(TabsTrigger, { value: "Sorting", children: t('Sort') }), _jsx(TabsTrigger, { value: "Manifest", children: t('Manifest') }), _jsx(TabsTrigger, { value: "Dispatch", children: t('Dispatch') })] }), _jsx(TabsContent, { value: "Scanning", className: "space-y-4 mt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: t('Tracking Number') }), _jsx(Input, { ref: inputRef, value: barcode, onChange: (e) => setBarcode(e.target.value), placeholder: t('Scan or enter tracking number'), onKeyPress: (e) => e.key === 'Enter' && handleScan(), className: "font-mono" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: t('Location') }), _jsx(Input, { value: location, onChange: (e) => setLocation(e.target.value), placeholder: t('Enter location (optional)') })] }), _jsxs(Button, { onClick: handleScan, disabled: !barcode.trim() || loading, className: "w-full bg-navy-900 hover:bg-navy-800", children: [loading ? (_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" })) : (_jsx(Scan, { className: "h-4 w-4 mr-2" })), loading ? t('Processing...') : t('Process Package')] })] }) }), _jsx(TabsContent, { value: "Sorting", className: "mt-6", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: t('Sorting interface coming soon') })] }) }), _jsx(TabsContent, { value: "Manifest", className: "mt-6", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(BarChart3, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: t('Manifest interface coming soon') })] }) }), _jsx(TabsContent, { value: "Dispatch", className: "mt-6", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Truck, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: t('Dispatch interface coming soon') })] }) })] }) })] }), _jsxs(Card, { className: "shadow-lg", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: t('warehouse.recentScans') }), _jsxs(Badge, { variant: "outline", children: [recentScans.length, " ", t('Recent')] })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "space-y-0", children: recentScans.map((scan, index) => (_jsxs("div", { className: `p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === recentScans.length - 1 ? 'border-b-0' : ''}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-sm", children: scan.trackingNumber }), _jsx("p", { className: "text-xs text-gray-500", children: scan.timestamp })] }), getActionBadge(scan.action)] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center text-xs text-gray-600", children: [_jsx(MapPin, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: scan.location })] }), _jsxs("div", { className: "flex items-center text-xs text-gray-600", children: [_jsx(User, { className: "h-3 w-3 mr-1" }), _jsxs("span", { children: [t('warehouse.processedBy'), ": ", scan.processedBy] })] })] })] }, scan.id))) }) })] })] })] }));
}
