import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Package, QrCode, Printer, CheckCircle, Clock, AlertCircle, Tag, Scan } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { QRCodeLabel } from '@/components/QRCodeLabel';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RiderLabel() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [labelBatches, setLabelBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scannerActive, setScannerActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showLabelPreview, setShowLabelPreview] = useState(false);
    useEffect(() => {
        loadLabelBatches();
    }, []);
    const loadLabelBatches = async () => {
        try {
            setLoading(true);
            // Mock label batches for demo
            const response = { success: true, data: [] };
            if (response.success) {
                setLabelBatches(response.data || []);
            }
        }
        catch (error) {
            console.error('Error loading label batches:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleBatchSelect = (batch) => {
        setSelectedBatch(batch);
    };
    const handleLabelScan = async (data) => {
        try {
            const labelData = JSON.parse(data);
            if (selectedBatch) {
                // Mock label activation for demo
                const response = { success: true };
                if (response.success) {
                    // Create activation event
                    await advancedFeaturesAPI.createEvent({
                        event_type: 'LABEL_ACTIVATION',
                        event_category: 'rider_operation',
                        reference_id: labelData.label_id,
                        reference_type: 'label',
                        event_data: { label_data: labelData, batch_id: selectedBatch.id }
                    });
                    // Refresh batch data
                    loadLabelBatches();
                    setScannerActive(false);
                    alert(language === 'my' ? 'Label အသက်ဝင်ပြီး' : 'Label activated successfully');
                }
            }
        }
        catch (error) {
            console.error('Label activation error:', error);
            alert(language === 'my' ? 'Label အသက်ဝင်မှု မအောင်မြင်ပါ' : 'Failed to activate label');
        }
    };
    const handlePrintLabel = (label) => {
        if (label.shipment_data) {
            setSelectedLabel(label);
            setShowLabelPreview(true);
        }
        else {
            alert(language === 'my' ? 'ပုံနှိပ်ရန် အချက်အလက် မရှိပါ' : 'No shipment data available for printing');
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'activated': return 'bg-green-100 text-green-800';
            case 'used': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'assigned': return _jsx(Clock, { className: "w-4 h-4" });
            case 'in_progress': return _jsx(AlertCircle, { className: "w-4 h-4" });
            case 'completed': return _jsx(CheckCircle, { className: "w-4 h-4" });
            case 'inactive': return _jsx(Tag, { className: "w-4 h-4" });
            case 'activated': return _jsx(CheckCircle, { className: "w-4 h-4" });
            case 'used': return _jsx(Package, { className: "w-4 h-4" });
            default: return _jsx(Package, { className: "w-4 h-4" });
        }
    };
    if (showLabelPreview && selectedLabel) {
        return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Button, { variant: "outline", onClick: () => setShowLabelPreview(false), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'Label ပုံနှိပ်ခြင်း' : 'Label Printing' })] }), _jsx(QRCodeLabel, { shipmentData: selectedLabel.shipment_data, onPrint: () => {
                        // Mock label status update
                        console.log('Label marked as used:', selectedLabel.id);
                    } })] }));
    }
    if (selectedBatch) {
        return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Button, { variant: "outline", onClick: () => setSelectedBatch(null), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'Label အစုအဖွဲ့အသေးစိတ်' : 'Label Batch Details' })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: selectedBatch.batch_number }), _jsxs(Badge, { className: getStatusColor(selectedBatch.status), children: [getStatusIcon(selectedBatch.status), _jsx("span", { className: "ml-1", children: language === 'my'
                                                            ? selectedBatch.status === 'assigned' ? 'သတ်မှတ်ပြီး'
                                                                : selectedBatch.status === 'in_progress' ? 'လုပ်ဆောင်နေ'
                                                                    : 'ပြီးစီး'
                                                            : selectedBatch.status.replace('_', ' ').toUpperCase() })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: selectedBatch.total_labels }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စုစုပေါင်း Labels' : 'Total Labels' })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: selectedBatch.activated_labels }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'အသက်ဝင်ပြီး' : 'Activated' })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: selectedBatch.total_labels - selectedBatch.activated_labels }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ကျန်ရှိ' : 'Remaining' })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [Math.round((selectedBatch.activated_labels / selectedBatch.total_labels) * 100), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ပြီးစီးမှု' : 'Progress' })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(QrCode, { className: "w-5 h-5" }), language === 'my' ? 'Label အသက်ဝင်စေခြင်း' : 'Label Activation'] }) }), _jsx(CardContent, { children: scannerActive ? (_jsxs("div", { className: "space-y-4", children: [_jsx(QRCodeScanner, { onScan: handleLabelScan, onError: (error) => {
                                                    console.error('Scanner error:', error);
                                                    alert(language === 'my' ? 'စကင်နာ အမှား' : 'Scanner error');
                                                } }), _jsx(Button, { variant: "outline", onClick: () => setScannerActive(false), className: "w-full", children: language === 'my' ? 'စကင်နာ ပိတ်မည်' : 'Close Scanner' })] })) : (_jsxs(Button, { onClick: () => setScannerActive(true), className: "w-full", size: "lg", children: [_jsx(Scan, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'Label အသက်ဝင်စေမည်' : 'Activate Labels'] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: language === 'my' ? 'Label စာရင်း' : 'Label List' }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: selectedBatch.labels.map((label) => (_jsxs("div", { className: `flex items-center justify-between p-3 rounded border ${label.status === 'activated' ? 'bg-green-50 border-green-200'
                                                : label.status === 'used' ? 'bg-purple-50 border-purple-200'
                                                    : 'bg-gray-50'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${label.status === 'activated' ? 'bg-green-500'
                                                                : label.status === 'used' ? 'bg-purple-500'
                                                                    : 'bg-gray-300'}` }), _jsxs("div", { children: [_jsx("span", { className: "font-mono", children: label.label_number }), label.awb_number && (_jsxs("div", { className: "text-xs text-gray-600", children: ["AWB: ", label.awb_number] }))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { className: getStatusColor(label.status), children: [getStatusIcon(label.status), _jsx("span", { className: "ml-1", children: language === 'my'
                                                                        ? label.status === 'inactive' ? 'မအသက်ဝင်'
                                                                            : label.status === 'activated' ? 'အသက်ဝင်ပြီး'
                                                                                : 'အသုံးပြုပြီး'
                                                                        : label.status.toUpperCase() })] }), label.status === 'activated' && label.shipment_data && (_jsxs(Button, { size: "sm", variant: "outline", onClick: () => handlePrintLabel(label), children: [_jsx(Printer, { className: "w-4 h-4 mr-1" }), language === 'my' ? 'ပုံနှိပ်' : 'Print'] })), label.activated_at && (_jsx("span", { className: "text-xs text-gray-500", children: new Date(label.activated_at).toLocaleString() }))] })] }, label.id))) }) })] })] })] }));
    }
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'Label အစုအဖွဲ့များ' : 'Label Batches' }), _jsx(Button, { onClick: loadLabelBatches, disabled: loading, children: language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh' })] }), _jsx("div", { className: "mb-6", children: _jsx(Input, { placeholder: language === 'my' ? 'Batch နံပါတ် ရှာရန်...' : 'Search batch number...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full" }) }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-2", children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : labelBatches.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Tag, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'Label အစုအဖွဲ့ မရှိပါ' : 'No label batches found' })] }) })) : (_jsx("div", { className: "grid gap-4", children: labelBatches
                    .filter(batch => batch.batch_number.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((batch) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "font-bold text-lg", children: batch.batch_number }), _jsxs(Badge, { className: getStatusColor(batch.status), children: [getStatusIcon(batch.status), _jsx("span", { className: "ml-1", children: language === 'my'
                                                                ? batch.status === 'assigned' ? 'သတ်မှတ်ပြီး'
                                                                    : batch.status === 'in_progress' ? 'လုပ်ဆောင်နေ'
                                                                        : 'ပြီးစီး'
                                                                : batch.status.replace('_', ' ').toUpperCase() })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'စုစုပေါင်း:' : 'Total:' }), _jsx("span", { className: "font-medium ml-1", children: batch.total_labels })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'အသက်ဝင်ပြီး:' : 'Activated:' }), _jsx("span", { className: "font-medium ml-1 text-green-600", children: batch.activated_labels })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'ပြီးစီးမှု:' : 'Progress:' }), _jsxs("span", { className: "font-medium ml-1", children: [Math.round((batch.activated_labels / batch.total_labels) * 100), "%"] })] })] }), _jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-300", style: { width: `${(batch.activated_labels / batch.total_labels) * 100}%` } }) }) }), _jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [language === 'my' ? 'သတ်မှတ်ရက်:' : 'Assigned:', " ", new Date(batch.assigned_date).toLocaleDateString()] })] }), _jsxs(Button, { onClick: () => handleBatchSelect(batch), children: [_jsx(Tag, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ကြည့်မည်' : 'Manage'] })] }) }) }, batch.id))) }))] }));
}
