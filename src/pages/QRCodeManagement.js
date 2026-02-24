import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QrCode, Package, Truck, User, Warehouse, Scan, History, AlertTriangle, Download, Printer, Eye, RefreshCw, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function QRCodeManagement() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('GENERATE');
    const [qrCodes, setQrCodes] = useState([]);
    const [scanHistory, setScanHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scannerActive, setScannerActive] = useState(false);
    const [selectedQR, setSelectedQR] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    // Generation form state
    const [generateForm, setGenerateForm] = useState({
        type: 'SHIPMENT',
        reference_id: '',
        reference_type: '',
        expires_in_hours: 24,
        data: {}
    });
    useEffect(() => {
        loadQRCodes();
        loadScanHistory();
    }, []);
    const loadQRCodes = async () => {
        try {
            setLoading(true);
            const response = await advancedFeaturesAPI.getQRCodes();
            if (response.success) {
                setQrCodes(response.data || []);
            }
        }
        catch (error) {
            console.error('Error loading QR codes:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadScanHistory = async () => {
        try {
            const response = await advancedFeaturesAPI.getScanHistory();
            if (response.success) {
                setScanHistory(response.data || []);
            }
        }
        catch (error) {
            console.error('Error loading scan history:', error);
        }
    };
    const generateQRCode = async () => {
        try {
            setLoading(true);
            const qrData = {
                type: generateForm.type,
                reference_id: generateForm.reference_id,
                reference_type: generateForm.reference_type,
                data: generateForm.data,
                expires_at: new Date(Date.now() + generateForm.expires_in_hours * 60 * 60 * 1000).toISOString()
            };
            const response = await advancedFeaturesAPI.generateQRCode(generateForm.type, generateForm.reference_id, generateForm.reference_type, qrData);
            if (response.success) {
                await loadQRCodes();
                setGenerateForm({
                    type: 'SHIPMENT',
                    reference_id: '',
                    reference_type: '',
                    expires_in_hours: 24,
                    data: {}
                });
                alert(language === 'my'
                    ? 'QR ကုဒ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ'
                    : 'QR Code generated successfully');
            }
        }
        catch (error) {
            console.error('Error generating QR code:', error);
            alert(language === 'my'
                ? 'QR ကုဒ် ဖန်တီးမှု မအောင်မြင်ပါ'
                : 'Failed to generate QR code');
        }
        finally {
            setLoading(false);
        }
    };
    const handleQRScan = async (scanResult) => {
        try {
            setLoading(true);
            const scanData = {
                qr_data: scanResult,
                scanned_by: 'current_user',
                scan_location: await getCurrentLocation(),
                device_info: {
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                }
            };
            const response = await advancedFeaturesAPI.processScan(scanData);
            if (response.success) {
                await loadQRCodes();
                await loadScanHistory();
                setScannerActive(false);
                alert(language === 'my'
                    ? 'QR ကုဒ်ကို အောင်မြင်စွာ စကင်န်ဖတ်ပြီးပါပြီ'
                    : 'QR Code scanned successfully');
            }
            else {
                alert(language === 'my'
                    ? 'QR ကုဒ် စကင်န်ဖတ်မှု မအောင်မြင်ပါ'
                    : 'Failed to scan QR code');
            }
        }
        catch (error) {
            console.error('Error processing scan:', error);
            alert(language === 'my'
                ? 'စကင်န်ဖတ်မှု အမှားအယွင်း'
                : 'Scan processing error');
        }
        finally {
            setLoading(false);
        }
    };
    const getCurrentLocation = () => {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }, () => {
                    resolve({ lat: 0, lng: 0 });
                });
            }
            else {
                resolve({ lat: 0, lng: 0 });
            }
        });
    };
    const updateQRStatus = async (qrId, status) => {
        try {
            const response = await advancedFeaturesAPI.updateQRStatus(qrId, status);
            if (response.success) {
                await loadQRCodes();
                alert(language === 'my'
                    ? 'QR ကုဒ် အခြေအနေကို အပ်ဒိတ်လုပ်ပြီးပါပြီ'
                    : 'QR Code status updated');
            }
        }
        catch (error) {
            console.error('Error updating QR status:', error);
        }
    };
    const exportQRCode = (qrCode) => {
        // Create downloadable QR code
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            canvas.width = 200;
            canvas.height = 200;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 200, 200);
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '12px Arial';
            ctx.fillText('QR Code', 80, 100);
            ctx.fillText(qrCode.reference_id, 60, 120);
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `qr_${qrCode.reference_id}.png`;
                    link.click();
                    URL.revokeObjectURL(url);
                }
            });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800';
            case 'SCANNED': return 'bg-blue-100 text-blue-800';
            case 'EXPIRED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'SHIPMENT': return _jsx(Package, { className: "w-4 h-4" });
            case 'PARCEL': return _jsx(Package, { className: "w-4 h-4" });
            case 'VEHICLE': return _jsx(Truck, { className: "w-4 h-4" });
            case 'RIDER': return _jsx(User, { className: "w-4 h-4" });
            case 'WAREHOUSE': return _jsx(Warehouse, { className: "w-4 h-4" });
            default: return _jsx(QrCode, { className: "w-4 h-4" });
        }
    };
    const filteredQRCodes = qrCodes.filter(qr => {
        const matchesSearch = qr.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            qr.qr_code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || qr.qr_type === filterType;
        const matchesStatus = filterStatus === 'ALL' || qr.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });
    const renderGenerateTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(QrCode, { className: "w-5 h-5" }), language === 'my' ? 'QR ကုဒ် ဖန်တီးရန်' : 'Generate QR Code'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'အမျိုးအစား' : 'Type' }), _jsxs("select", { value: generateForm.type, onChange: (e) => setGenerateForm({ ...generateForm, type: e.target.value }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "SHIPMENT", children: language === 'my' ? 'ပို့ဆောင်မှု' : 'Shipment' }), _jsx("option", { value: "PARCEL", children: language === 'my' ? 'ပစ္စည်း' : 'Parcel' }), _jsx("option", { value: "VEHICLE", children: language === 'my' ? 'ယာဉ်' : 'Vehicle' }), _jsx("option", { value: "RIDER", children: language === 'my' ? 'ပို့ဆောင်သူ' : 'Rider' }), _jsx("option", { value: "WAREHOUSE", children: language === 'my' ? 'ဂိုဒေါင်' : 'Warehouse' })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ရည်ညွှန်း ID' : 'Reference ID' }), _jsx(Input, { value: generateForm.reference_id, onChange: (e) => setGenerateForm({ ...generateForm, reference_id: e.target.value }), placeholder: language === 'my' ? 'ID ထည့်ပါ' : 'Enter ID' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ရည်ညွှန်း အမျိုးအစား' : 'Reference Type' }), _jsx(Input, { value: generateForm.reference_type, onChange: (e) => setGenerateForm({ ...generateForm, reference_type: e.target.value }), placeholder: language === 'my' ? 'အမျိုးအစား ထည့်ပါ' : 'Enter type' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'သက်တမ်း (နာရီ)' : 'Expires In (Hours)' }), _jsx(Input, { type: "number", value: generateForm.expires_in_hours, onChange: (e) => setGenerateForm({ ...generateForm, expires_in_hours: parseInt(e.target.value) }), min: "1", max: "8760" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'အပိုအချက်အလက် (JSON)' : 'Additional Data (JSON)' }), _jsx(Textarea, { value: JSON.stringify(generateForm.data, null, 2), onChange: (e) => {
                                        try {
                                            const data = JSON.parse(e.target.value);
                                            setGenerateForm({ ...generateForm, data });
                                        }
                                        catch (error) {
                                            // Invalid JSON, keep current data
                                        }
                                    }, placeholder: '{"key": "value"}', rows: 4 })] }), _jsxs(Button, { onClick: generateQRCode, disabled: loading || !generateForm.reference_id, className: "w-full", size: "lg", children: [loading ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(QrCode, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'QR ကုဒ် ဖန်တီးမည်' : 'Generate QR Code'] })] })] }) }));
    const renderScanTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Scan, { className: "w-5 h-5" }), language === 'my' ? 'QR ကုဒ် စကင်န်ဖတ်ရန်' : 'Scan QR Code'] }) }), _jsx(CardContent, { children: scannerActive ? (_jsxs("div", { className: "space-y-4", children: [_jsx(QRCodeScanner, { onScan: handleQRScan, onError: (error) => {
                                    console.error('Scanner error:', error);
                                    alert(language === 'my' ? 'စကင်နာ အမှား' : 'Scanner error');
                                } }), _jsx(Button, { variant: "outline", onClick: () => setScannerActive(false), className: "w-full", children: language === 'my' ? 'စကင်နာ ပိတ်မည်' : 'Close Scanner' })] })) : (_jsxs(Button, { onClick: () => setScannerActive(true), className: "w-full", size: "lg", children: [_jsx(Scan, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'စကင်န်ဖတ်ရန် စတင်မည်' : 'Start Scanning'] })) })] }) }));
    const renderManageTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Input, { placeholder: language === 'my' ? 'ရှာဖွေရန်...' : 'Search...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { value: filterType, onChange: (e) => setFilterType(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အမျိုးအစားအားလုံး' : 'All Types' }), _jsx("option", { value: "SHIPMENT", children: language === 'my' ? 'ပို့ဆောင်မှု' : 'Shipment' }), _jsx("option", { value: "PARCEL", children: language === 'my' ? 'ပစ္စည်း' : 'Parcel' }), _jsx("option", { value: "VEHICLE", children: language === 'my' ? 'ယာဉ်' : 'Vehicle' }), _jsx("option", { value: "RIDER", children: language === 'my' ? 'ပို့ဆောင်သူ' : 'Rider' }), _jsx("option", { value: "WAREHOUSE", children: language === 'my' ? 'ဂိုဒေါင်' : 'Warehouse' })] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အခြေအနေအားလုံး' : 'All Status' }), _jsx("option", { value: "ACTIVE", children: language === 'my' ? 'အသက်ဝင်နေ' : 'Active' }), _jsx("option", { value: "SCANNED", children: language === 'my' ? 'စကင်န်ဖတ်ပြီး' : 'Scanned' }), _jsx("option", { value: "EXPIRED", children: language === 'my' ? 'သက်တမ်းကုန်' : 'Expired' })] })] }) }) }), _jsx("div", { className: "grid gap-4", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(RefreshCw, { className: "w-8 h-8 animate-spin mx-auto mb-2" }), _jsx("p", { children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : filteredQRCodes.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(QrCode, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'QR ကုဒ် မရှိပါ' : 'No QR codes found' })] }) })) : (filteredQRCodes.map((qr) => (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [getTypeIcon(qr.qr_type), _jsx("span", { className: "font-medium", children: qr.reference_id }), _jsx(Badge, { className: getStatusColor(qr.status), children: language === 'my'
                                                        ? qr.status === 'ACTIVE' ? 'အသက်ဝင်နေ'
                                                            : qr.status === 'SCANNED' ? 'စကင်န်ဖတ်ပြီး'
                                                                : 'သက်တမ်းကုန်'
                                                        : qr.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'အမျိုးအစား:' : 'Type:' }), _jsx("span", { className: "ml-1", children: qr.qr_type })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'စကင်န်အကြိမ်:' : 'Scans:' }), _jsx("span", { className: "ml-1", children: qr.scan_count })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'ဖန်တီးရက်:' : 'Created:' }), _jsx("span", { className: "ml-1", children: new Date(qr.created_at).toLocaleDateString() })] }), qr.expires_at && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'သက်တမ်း:' : 'Expires:' }), _jsx("span", { className: "ml-1", children: new Date(qr.expires_at).toLocaleDateString() })] }))] }), qr.last_scanned_at && (_jsxs("div", { className: "mt-2 text-xs text-gray-500", children: [language === 'my' ? 'နောက်ဆုံးစကင်န်:' : 'Last scanned:', " ", new Date(qr.last_scanned_at).toLocaleString()] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => exportQRCode(qr), children: _jsx(Download, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => setSelectedQR(qr), children: _jsx(Eye, { className: "w-4 h-4" }) }), qr.status === 'ACTIVE' && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => updateQRStatus(qr.id, 'EXPIRED'), children: _jsx(AlertTriangle, { className: "w-4 h-4" }) }))] })] }) }) }, qr.id)))) })] }));
    const renderHistoryTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(History, { className: "w-5 h-5" }), language === 'my' ? 'စကင်န်မှတ်တမ်း' : 'Scan History'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: scanHistory.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(History, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'စကင်န်မှတ်တမ်း မရှိပါ' : 'No scan history found' })] })) : (scanHistory.map((scan) => (_jsx("div", { className: "flex items-center justify-between p-3 border rounded", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Badge, { variant: scan.scan_result === 'SUCCESS' ? 'default' : 'destructive', children: language === 'my'
                                                    ? scan.scan_result === 'SUCCESS' ? 'အောင်မြင်' : 'မအောင်မြင်'
                                                    : scan.scan_result }), _jsx("span", { className: "text-sm text-gray-600", children: new Date(scan.scanned_at).toLocaleString() })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'စကင်န်လုပ်သူ:' : 'Scanned by:' }), _jsx("span", { className: "ml-1", children: scan.scanned_by })] }), scan.notes && (_jsx("div", { className: "text-xs text-gray-500 mt-1", children: scan.notes }))] }) }, scan.id)))) }) })] }) }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: language === 'my' ? 'QR ကုဒ် စီမံခန့်ခွဲမှု' : 'QR Code Management' }), _jsxs(Button, { onClick: () => { loadQRCodes(); loadScanHistory(); }, children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh'] })] }), _jsx("div", { className: "flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg", children: [
                    { key: 'GENERATE', label: language === 'my' ? 'ဖန်တီးရန်' : 'Generate', icon: QrCode },
                    { key: 'SCAN', label: language === 'my' ? 'စကင်န်ဖတ်ရန်' : 'Scan', icon: Scan },
                    { key: 'MANAGE', label: language === 'my' ? 'စီမံခန့်ခွဲရန်' : 'Manage', icon: Package },
                    { key: 'HISTORY', label: language === 'my' ? 'မှတ်တမ်း' : 'History', icon: History }
                ].map(({ key, label, icon: Icon }) => (_jsxs("button", { onClick: () => setActiveTab(key), className: `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === key
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), label] }, key))) }), activeTab === 'GENERATE' && renderGenerateTab(), activeTab === 'SCAN' && renderScanTab(), activeTab === 'MANAGE' && renderManageTab(), activeTab === 'HISTORY' && renderHistoryTab(), selectedQR && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: language === 'my' ? 'QR ကုဒ် အသေးစိတ်' : 'QR Code Details' }), _jsx(Button, { variant: "ghost", onClick: () => setSelectedQR(null), children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'ရည်ညွှန်း ID' : 'Reference ID' }), _jsx("p", { className: "font-mono", children: selectedQR.reference_id })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'အမျိုးအစား' : 'Type' }), _jsx("p", { children: selectedQR.qr_type })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'အခြေအနေ' : 'Status' }), _jsx(Badge, { className: getStatusColor(selectedQR.status), children: language === 'my'
                                                        ? selectedQR.status === 'ACTIVE' ? 'အသက်ဝင်နေ'
                                                            : selectedQR.status === 'SCANNED' ? 'စကင်န်ဖတ်ပြီး'
                                                                : 'သက်တမ်းကုန်'
                                                        : selectedQR.status })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'စကင်န်အကြိမ်' : 'Scan Count' }), _jsx("p", { children: selectedQR.scan_count })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'QR ကုဒ်ဒေတာ' : 'QR Code Data' }), _jsx("pre", { className: "bg-gray-100 p-3 rounded text-xs overflow-x-auto", children: JSON.stringify(selectedQR.data, null, 2) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: () => exportQRCode(selectedQR), children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ဒေါင်းလုဒ်' : 'Download'] }), selectedQR.qr_type === 'SHIPMENT' && (_jsxs(Button, { variant: "outline", children: [_jsx(Printer, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'လေဘယ်ပုံနှိပ်' : 'Print Label'] }))] })] })] }) }))] }));
}
