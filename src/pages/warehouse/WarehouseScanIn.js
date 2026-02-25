import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Package, Scan, CheckCircle, XCircle, ArrowLeft, RefreshCw, QrCode, Clock, User, MapPin } from 'lucide-react';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import WarehouseAPI from '@/lib/warehouse-api';
import { ROUTE_PATHS } from '@/lib/index';
export default function WarehouseScanIn() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [user, setUser] = useState(null);
    const [trackingCode, setTrackingCode] = useState('');
    const [scanLocation, setScanLocation] = useState('receiving_dock');
    const [notes, setNotes] = useState('');
    const [scanning, setScanning] = useState(false);
    const [scanResults, setScanResults] = useState([]);
    const [error, setError] = useState(null);
    const [todayStats, setTodayStats] = useState({
        scannedIn: 0,
        successful: 0,
        failed: 0
    });
    useEffect(() => {
        loadUserData();
        loadTodayStats();
    }, []);
    const loadUserData = async () => {
        try {
            const warehouseUser = await WarehouseAPI.getWarehouseUser();
            setUser(warehouseUser);
        }
        catch (error) {
            console.error('Error loading user data:', error);
        }
    };
    const loadTodayStats = async () => {
        if (!user?.station_id)
            return;
        try {
            const operations = await WarehouseAPI.getOperations(user.station_id, 100);
            const today = new Date().toDateString();
            const todayOperations = operations.filter(op => new Date(op.createdAt).toDateString() === today &&
                op.operation_type === 'scan_in');
            setTodayStats({
                scannedIn: todayOperations.length,
                successful: todayOperations.filter(op => op.to_status === 'inbound_received').length,
                failed: todayOperations.filter(op => op.to_status !== 'inbound_received').length
            });
        }
        catch (error) {
            console.error('Error loading today stats:', error);
        }
    };
    const handleScanIn = async (e) => {
        e.preventDefault();
        if (!trackingCode.trim() || !user)
            return;
        setScanning(true);
        setError(null);
        try {
            // First, scan the QR code to get parcel data
            const scanResult = await WarehouseAPI.scanQRCode(trackingCode.trim());
            if (!scanResult.success || scanResult.type !== 'parcel') {
                throw new Error(scanResult.message || 'Invalid parcel QR code');
            }
            const parcel = scanResult.data;
            // Update parcel status to inbound_received
            const updateSuccess = await WarehouseAPI.updateParcelStatus(parcel.id, 'inbound_received', 'scan_in', {
                scanMethod: 'manual_entry',
                scanLocation,
                notes: notes.trim() || undefined,
                qrCodeScanned: trackingCode.trim()
            });
            const result = {
                id: Date.now().toString(),
                awb: parcel.awb,
                success: updateSuccess,
                message: updateSuccess
                    ? `${t('warehouse.scanSuccess')} - ${parcel.awb}`
                    : t('warehouse.scanFailed'),
                parcel: updateSuccess ? parcel : undefined,
                timestamp: new Date()
            };
            setScanResults(prev => [result, ...prev.slice(0, 9)]);
            if (updateSuccess) {
                setTrackingCode('');
                setNotes('');
                loadTodayStats(); // Refresh stats
            }
        }
        catch (error) {
            console.error('Error scanning in parcel:', error);
            const errorResult = {
                id: Date.now().toString(),
                awb: trackingCode.trim(),
                success: false,
                message: error.message || t('warehouse.scanFailed'),
                timestamp: new Date()
            };
            setScanResults(prev => [errorResult, ...prev.slice(0, 9)]);
            setError(error.message || 'Failed to scan in parcel');
        }
        finally {
            setScanning(false);
        }
    };
    const renderScanResult = (result) => (_jsx(Card, { className: `${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [result.success ? (_jsx(CheckCircle, { className: "h-5 w-5 text-green-600" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-600" })), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: result.awb }), _jsx("p", { className: "text-sm text-gray-600", children: result.message }), result.success && result.parcel && (_jsxs("div", { className: "mt-2 text-sm space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsxs("strong", { children: [t('common.sender'), ":"] }), " ", result.parcel.sender_name] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsxs("strong", { children: [t('common.receiver'), ":"] }), " ", result.parcel.receiver_name] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Package, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { children: [_jsxs("strong", { children: [t('common.type'), ":"] }), " ", result.parcel.package_type] })] }), result.parcel.cod_amount > 0 && (_jsx("div", { className: "flex items-center space-x-2", children: _jsxs("span", { className: "text-orange-600 font-medium", children: ["COD: ", result.parcel.cod_amount.toLocaleString(), " MMK"] }) }))] }))] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { variant: result.success ? 'default' : 'destructive', children: result.success ? t('warehouse.received') : t('warehouse.failed') }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: result.timestamp.toLocaleTimeString() })] })] }) }) }, result.id));
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-100", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between py-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_DASHBOARD, children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), t('common.back')] }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center", children: [_jsx(ArrowDown, { className: "h-6 w-6 mr-2 text-green-600" }), t('warehouse.scanIn'), " - ", t('warehouse.receiving')] }), _jsx("p", { className: "text-gray-600", children: "Scan parcels into warehouse inventory" })] })] }), _jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_QR_SCANNER, children: _jsxs(Button, { variant: "outline", children: [_jsx(QrCode, { className: "h-4 w-4 mr-2" }), "QR Scanner"] }) })] }) }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(Card, { className: "bg-blue-50 border-blue-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-blue-600", children: t('warehouse.todayOperations') }), _jsx("p", { className: "text-3xl font-bold text-blue-700", children: todayStats.scannedIn })] }), _jsx(ArrowDown, { className: "h-8 w-8 text-blue-600" })] }) }) }), _jsx(Card, { className: "bg-green-50 border-green-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-green-600", children: t('warehouse.success') }), _jsx("p", { className: "text-3xl font-bold text-green-700", children: todayStats.successful })] }), _jsx(CheckCircle, { className: "h-8 w-8 text-green-600" })] }) }) }), _jsx(Card, { className: "bg-red-50 border-red-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-red-600", children: t('warehouse.failed') }), _jsx("p", { className: "text-3xl font-bold text-red-700", children: todayStats.failed })] }), _jsx(XCircle, { className: "h-8 w-8 text-red-600" })] }) }) })] }), error && (_jsxs(Alert, { className: "mb-6 border-red-200 bg-red-50", children: [_jsx(XCircle, { className: "h-4 w-4 text-red-600" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Scan, { className: "h-5 w-5 mr-2" }), t('warehouse.scanIn'), " ", t('warehouse.parcel')] }), _jsx(CardDescription, { children: "Scan or enter tracking number to receive parcel" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleScanIn, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [t('common.tracking'), " ", t('common.number'), " / QR Code"] }), _jsx(Input, { value: trackingCode, onChange: (e) => setTrackingCode(e.target.value), placeholder: "Scan or enter tracking number", className: "text-lg", autoFocus: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: t('warehouse.scanLocation') }), _jsxs(Select, { value: scanLocation, onValueChange: setScanLocation, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "receiving_dock", children: "Receiving Dock" }), _jsx(SelectItem, { value: "main_entrance", children: "Main Entrance" }), _jsx(SelectItem, { value: "sorting_area", children: "Sorting Area" }), _jsx(SelectItem, { value: "storage_area", children: "Storage Area" })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [t('common.notes'), " (", t('common.optional'), ")"] }), _jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Add any notes about the parcel condition or special instructions", rows: 3 })] }), _jsx(Button, { type: "submit", className: "w-full bg-green-600 hover:bg-green-700", disabled: scanning || !trackingCode.trim(), children: scanning ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), t('warehouse.scanning'), "..."] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowDown, { className: "h-4 w-4 mr-2" }), t('warehouse.scanIn')] })) })] }), _jsxs("div", { className: "mt-6 p-4 bg-blue-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-blue-900 mb-2", children: "Instructions:" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Scan the QR code on the parcel label" }), _jsx("li", { children: "\u2022 Verify parcel condition before scanning" }), _jsx("li", { children: "\u2022 Add notes for damaged or special parcels" }), _jsx("li", { children: "\u2022 Ensure correct scan location is selected" })] })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Clock, { className: "h-5 w-5 mr-2" }), t('common.recent'), " ", t('warehouse.scanIn'), " ", t('common.results')] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: scanResults.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Package, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }), _jsx("p", { children: "No scans yet today" }), _jsx("p", { className: "text-sm", children: "Start scanning parcels to see results here" })] })) : (scanResults.map(renderScanResult)) }) })] })] }), _jsxs(Card, { className: "mt-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Receiving Process Flow" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx(ArrowDown, { className: "h-8 w-8 text-blue-600 mx-auto mb-2" }), _jsx("h4", { className: "font-medium text-blue-900", children: "1. Receive" }), _jsx("p", { className: "text-sm text-blue-700", children: "Scan parcel QR code" })] }), _jsxs("div", { className: "text-center p-4 bg-yellow-50 rounded-lg", children: [_jsx(Package, { className: "h-8 w-8 text-yellow-600 mx-auto mb-2" }), _jsx("h4", { className: "font-medium text-yellow-900", children: "2. Inspect" }), _jsx("p", { className: "text-sm text-yellow-700", children: "Check parcel condition" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 rounded-lg", children: [_jsx(MapPin, { className: "h-8 w-8 text-purple-600 mx-auto mb-2" }), _jsx("h4", { className: "font-medium text-purple-900", children: "3. Stage" }), _jsx("p", { className: "text-sm text-purple-700", children: "Move to sorting area" })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx(CheckCircle, { className: "h-8 w-8 text-green-600 mx-auto mb-2" }), _jsx("h4", { className: "font-medium text-green-900", children: "4. Complete" }), _jsx("p", { className: "text-sm text-green-700", children: "Ready for sorting" })] })] }) })] })] })] }));
}
