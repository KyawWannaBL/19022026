import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Package, QrCode, Download, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RiderTags() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [tagBatches, setTagBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scannerActive, setScannerActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    useEffect(() => {
        loadTagBatches();
    }, []);
    const loadTagBatches = async () => {
        try {
            setLoading(true);
            // Mock tag batches for demo
            const response = { success: true, data: [] };
            if (response.success) {
                setTagBatches(response.data || []);
            }
        }
        catch (error) {
            console.error('Error loading tag batches:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleBatchSelect = (batch) => {
        setSelectedBatch(batch);
    };
    const handleTagScan = async (data) => {
        try {
            const tagData = JSON.parse(data);
            if (selectedBatch) {
                // Mock tag update for demo
                console.log('Tag updated:', tagData.tag_id);
                // Create scan event
                await advancedFeaturesAPI.createEvent({
                    event_type: 'TAG_SCAN',
                    event_category: 'rider_operation',
                    reference_id: tagData.tag_id,
                    reference_type: 'tag',
                    event_data: { tag_data: tagData, batch_id: selectedBatch.id }
                });
                // Refresh batch data
                loadTagBatches();
                setScannerActive(false);
                alert(language === 'my' ? 'Tag စကင်န်ဖတ်ပြီး' : 'Tag scanned successfully');
            }
        }
        catch (error) {
            console.error('Tag scan error:', error);
            alert(language === 'my' ? 'Tag စကင်န်ဖတ်မှု မအောင်မြင်ပါ' : 'Failed to scan tag');
        }
    };
    const handleExportBatch = async (batch) => {
        try {
            const csvContent = [
                ['Tag Number', 'Status', 'Scanned At', 'Associated Shipment'],
                ...batch.tags.map(tag => [
                    tag.tag_number,
                    tag.status,
                    tag.scanned_at || '',
                    tag.associated_shipment || ''
                ])
            ].map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `tag_batch_${batch.batch_number}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Export error:', error);
        }
    };
    const filteredBatches = tagBatches.filter(batch => {
        const matchesSearch = batch.batch_number.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || batch.status === filterStatus;
        return matchesSearch && matchesFilter;
    });
    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'assigned': return _jsx(Clock, { className: "w-4 h-4" });
            case 'in_progress': return _jsx(AlertCircle, { className: "w-4 h-4" });
            case 'completed': return _jsx(CheckCircle, { className: "w-4 h-4" });
            default: return _jsx(Package, { className: "w-4 h-4" });
        }
    };
    if (selectedBatch) {
        return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(Button, { variant: "outline", onClick: () => setSelectedBatch(null), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'Tag အစုအဖွဲ့အသေးစိတ်' : 'Tag Batch Details' })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: selectedBatch.batch_number }), _jsxs(Badge, { className: getStatusColor(selectedBatch.status), children: [getStatusIcon(selectedBatch.status), _jsx("span", { className: "ml-1", children: language === 'my'
                                                            ? selectedBatch.status === 'assigned' ? 'သတ်မှတ်ပြီး'
                                                                : selectedBatch.status === 'in_progress' ? 'လုပ်ဆောင်နေ'
                                                                    : 'ပြီးစီး'
                                                            : selectedBatch.status.replace('_', ' ').toUpperCase() })] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: selectedBatch.total_tags }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စုစုပေါင်း Tags' : 'Total Tags' })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: selectedBatch.scanned_tags }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စကင်န်ဖတ်ပြီး' : 'Scanned' })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: selectedBatch.total_tags - selectedBatch.scanned_tags }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ကျန်ရှိ' : 'Remaining' })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [Math.round((selectedBatch.scanned_tags / selectedBatch.total_tags) * 100), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'ပြီးစီးမှု' : 'Progress' })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(QrCode, { className: "w-5 h-5" }), language === 'my' ? 'Tag စကင်နာ' : 'Tag Scanner'] }) }), _jsx(CardContent, { children: scannerActive ? (_jsxs("div", { className: "space-y-4", children: [_jsx(QRCodeScanner, { onScan: handleTagScan, onError: (error) => {
                                                    console.error('Scanner error:', error);
                                                    alert(language === 'my' ? 'စကင်နာ အမှား' : 'Scanner error');
                                                } }), _jsx(Button, { variant: "outline", onClick: () => setScannerActive(false), className: "w-full", children: language === 'my' ? 'စကင်နာ ပိတ်မည်' : 'Close Scanner' })] })) : (_jsxs(Button, { onClick: () => setScannerActive(true), className: "w-full", size: "lg", children: [_jsx(QrCode, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'Tag စကင်န်ဖတ်မည်' : 'Start Scanning Tags'] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: language === 'my' ? 'Tag စာရင်း' : 'Tag List' }), _jsxs(Button, { variant: "outline", onClick: () => handleExportBatch(selectedBatch), size: "sm", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ထုတ်ယူ' : 'Export'] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: selectedBatch.tags.map((tag) => (_jsxs("div", { className: `flex items-center justify-between p-3 rounded border ${tag.status === 'scanned' ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${tag.status === 'scanned' ? 'bg-green-500' : 'bg-gray-300'}` }), _jsx("span", { className: "font-mono", children: tag.tag_number })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: tag.status === 'scanned' ? 'default' : 'secondary', children: language === 'my'
                                                                ? tag.status === 'scanned' ? 'စကင်န်ဖတ်ပြီး' : 'စောင့်ဆိုင်း'
                                                                : tag.status }), tag.scanned_at && (_jsx("span", { className: "text-xs text-gray-500", children: new Date(tag.scanned_at).toLocaleString() }))] })] }, tag.id))) }) })] })] })] }));
    }
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'Tag အစုအဖွဲ့များ' : 'Tag Batches' }), _jsx(Button, { onClick: loadTagBatches, disabled: loading, children: language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh' })] }), _jsxs("div", { className: "flex gap-4 mb-6", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: language === 'my' ? 'Batch နံပါတ် ရှာရန်...' : 'Search batch number...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full" }) }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "all", children: language === 'my' ? 'အားလုံး' : 'All Status' }), _jsx("option", { value: "assigned", children: language === 'my' ? 'သတ်မှတ်ပြီး' : 'Assigned' }), _jsx("option", { value: "in_progress", children: language === 'my' ? 'လုပ်ဆောင်နေ' : 'In Progress' }), _jsx("option", { value: "completed", children: language === 'my' ? 'ပြီးစီး' : 'Completed' })] })] }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-2", children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : filteredBatches.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Package, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'Tag အစုအဖွဲ့ မရှိပါ' : 'No tag batches found' })] }) })) : (_jsx("div", { className: "grid gap-4", children: filteredBatches.map((batch) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "font-bold text-lg", children: batch.batch_number }), _jsxs(Badge, { className: getStatusColor(batch.status), children: [getStatusIcon(batch.status), _jsx("span", { className: "ml-1", children: language === 'my'
                                                                ? batch.status === 'assigned' ? 'သတ်မှတ်ပြီး'
                                                                    : batch.status === 'in_progress' ? 'လုပ်ဆောင်နေ'
                                                                        : 'ပြီးစီး'
                                                                : batch.status.replace('_', ' ').toUpperCase() })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'စုစုပေါင်း:' : 'Total:' }), _jsx("span", { className: "font-medium ml-1", children: batch.total_tags })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'စကင်န်ဖတ်ပြီး:' : 'Scanned:' }), _jsx("span", { className: "font-medium ml-1 text-green-600", children: batch.scanned_tags })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: language === 'my' ? 'ပြီးစီးမှု:' : 'Progress:' }), _jsxs("span", { className: "font-medium ml-1", children: [Math.round((batch.scanned_tags / batch.total_tags) * 100), "%"] })] })] }), _jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-300", style: { width: `${(batch.scanned_tags / batch.total_tags) * 100}%` } }) }) }), _jsxs("p", { className: "text-xs text-gray-500 mt-2", children: [language === 'my' ? 'သတ်မှတ်ရက်:' : 'Assigned:', " ", new Date(batch.assigned_date).toLocaleDateString()] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleExportBatch(batch), children: _jsx(Download, { className: "w-4 h-4" }) }), _jsxs(Button, { onClick: () => handleBatchSelect(batch), children: [_jsx(Eye, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ကြည့်မည်' : 'View'] })] })] }) }) }, batch.id))) }))] }));
}
