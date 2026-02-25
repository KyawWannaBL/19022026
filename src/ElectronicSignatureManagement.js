import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PenTool, FileText, CheckCircle, User, Download, Eye, RefreshCw, Copy, Shield, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ElectronicSignature } from '@/components/ElectronicSignature';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function ElectronicSignatureManagement() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState('CAPTURE');
    const [signatures, setSignatures] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSignature, setSelectedSignature] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [filterStatus, setFilterStatus] = useState('ALL');
    // Capture form state
    const [captureForm, setCaptureForm] = useState({
        signature_type: 'PICKUP',
        signer_name: '',
        signer_role: '',
        reference_id: '',
        reference_type: 'shipment',
        notes: '',
        signature_data: ''
    });
    useEffect(() => {
        loadSignatureData();
    }, []);
    const loadSignatureData = async () => {
        try {
            setLoading(true);
            const [signaturesRes, templatesRes] = await Promise.all([
                advancedFeaturesAPI.getSignatures(),
                advancedFeaturesAPI.getSignatureTemplates()
            ]);
            if (signaturesRes.success)
                setSignatures(signaturesRes.data || []);
            if (templatesRes.success)
                setTemplates(templatesRes.data || []);
        }
        catch (error) {
            console.error('Error loading signature data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const captureSignature = async () => {
        if (!captureForm.signature_data || !captureForm.signer_name || !captureForm.reference_id) {
            alert(language === 'my'
                ? 'လိုအပ်သော အချက်အလက်များ ဖြည့်စွက်ပါ'
                : 'Please fill in all required fields');
            return;
        }
        try {
            setLoading(true);
            const signatureData = {
                ...captureForm,
                location: await getCurrentLocation(),
                device_info: {
                    device_id: 'web_device',
                    user_agent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                },
                verification_code: generateVerificationCode()
            };
            const response = await advancedFeaturesAPI.saveSignature(signatureData);
            if (response.success) {
                await loadSignatureData();
                setCaptureForm({
                    signature_type: 'PICKUP',
                    signer_name: '',
                    signer_role: '',
                    reference_id: '',
                    reference_type: 'shipment',
                    notes: '',
                    signature_data: ''
                });
                alert(language === 'my'
                    ? 'လက်မှတ်ကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ'
                    : 'Signature captured successfully');
            }
        }
        catch (error) {
            console.error('Error capturing signature:', error);
            alert(language === 'my'
                ? 'လက်မှတ် သိမ်းဆည်းမှု မအောင်မြင်ပါ'
                : 'Failed to capture signature');
        }
        finally {
            setLoading(false);
        }
    };
    const verifySignature = async (signatureId, verificationCode) => {
        try {
            setLoading(true);
            const response = await advancedFeaturesAPI.verifySignature(signatureId, 'VERIFIED', 'current_user');
            if (response.success) {
                await loadSignatureData();
                alert(language === 'my'
                    ? 'လက်မှတ်ကို အတည်ပြုပြီးပါပြီ'
                    : 'Signature verified successfully');
            }
            else {
                alert(language === 'my'
                    ? 'လက်မှတ် အတည်ပြုမှု မအောင်မြင်ပါ'
                    : 'Signature verification failed');
            }
        }
        catch (error) {
            console.error('Error verifying signature:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const downloadSignature = (signature) => {
        try {
            // Create a canvas to render the signature
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = 400;
                canvas.height = 200;
                // White background
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // Load and draw signature
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Add signature info
                    ctx.fillStyle = '#000000';
                    ctx.font = '12px Arial';
                    ctx.fillText(`Signed by: ${signature.signer_name}`, 10, canvas.height - 40);
                    ctx.fillText(`Date: ${new Date(signature.createdAt).toLocaleString()}`, 10, canvas.height - 25);
                    ctx.fillText(`Type: ${signature.signature_type}`, 10, canvas.height - 10);
                    // Download
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `signature_${signature.reference_id}_${signature.id}.png`;
                            link.click();
                            URL.revokeObjectURL(url);
                        }
                    });
                };
                img.src = signature.signature_data;
            }
        }
        catch (error) {
            console.error('Error downloading signature:', error);
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
    const generateVerificationCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'SIGNED':
            case 'VERIFIED': return 'bg-green-100 text-green-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'REJECTED':
            case 'FAILED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'PICKUP': return _jsx(User, { className: "w-4 h-4" });
            case 'DELIVERY': return _jsx(CheckCircle, { className: "w-4 h-4" });
            case 'RECEIPT': return _jsx(FileText, { className: "w-4 h-4" });
            case 'AUTHORIZATION': return _jsx(Shield, { className: "w-4 h-4" });
            case 'HANDOVER': return _jsx(Copy, { className: "w-4 h-4" });
            case 'INSPECTION': return _jsx(Eye, { className: "w-4 h-4" });
            default: return _jsx(PenTool, { className: "w-4 h-4" });
        }
    };
    const filteredSignatures = signatures.filter(sig => {
        const matchesSearch = sig.signer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sig.reference_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'ALL' || sig.signature_type === filterType;
        const matchesStatus = filterStatus === 'ALL' || sig.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });
    const renderCaptureTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(PenTool, { className: "w-5 h-5" }), language === 'my' ? 'လက်မှတ် ရယူရန်' : 'Capture Signature'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'လက်မှတ် အမျိုးအစား' : 'Signature Type' }), _jsxs("select", { value: captureForm.signature_type, onChange: (e) => setCaptureForm({ ...captureForm, signature_type: e.target.value }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "PICKUP", children: language === 'my' ? 'ပစ္စည်းယူ' : 'Pickup' }), _jsx("option", { value: "DELIVERY", children: language === 'my' ? 'ပို့ဆောင်' : 'Delivery' }), _jsx("option", { value: "RECEIPT", children: language === 'my' ? 'ရရှိမှုအထောက်အထား' : 'Receipt' }), _jsx("option", { value: "AUTHORIZATION", children: language === 'my' ? 'ခွင့်ပြုချက်' : 'Authorization' }), _jsx("option", { value: "HANDOVER", children: language === 'my' ? 'လွှဲပြောင်း' : 'Handover' }), _jsx("option", { value: "INSPECTION", children: language === 'my' ? 'စစ်ဆေး' : 'Inspection' })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: [language === 'my' ? 'လက်မှတ်ထိုးသူ အမည်' : 'Signer Name', " *"] }), _jsx(Input, { value: captureForm.signer_name, onChange: (e) => setCaptureForm({ ...captureForm, signer_name: e.target.value }), placeholder: language === 'my' ? 'အမည် ထည့်ပါ' : 'Enter name', required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ရာထူး/အခန်းကဏ္ဍ' : 'Role/Position' }), _jsx(Input, { value: captureForm.signer_role, onChange: (e) => setCaptureForm({ ...captureForm, signer_role: e.target.value }), placeholder: language === 'my' ? 'ရာထူး ထည့်ပါ' : 'Enter role' })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: [language === 'my' ? 'ရည်ညွှန်း ID' : 'Reference ID', " *"] }), _jsx(Input, { value: captureForm.reference_id, onChange: (e) => setCaptureForm({ ...captureForm, reference_id: e.target.value }), placeholder: language === 'my' ? 'ID ထည့်ပါ' : 'Enter ID', required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ရည်ညွှန်း အမျိုးအစား' : 'Reference Type' }), _jsxs("select", { value: captureForm.reference_type, onChange: (e) => setCaptureForm({ ...captureForm, reference_type: e.target.value }), className: "w-full px-3 py-2 border rounded-md", children: [_jsx("option", { value: "shipment", children: language === 'my' ? 'ပို့ဆောင်မှု' : 'Shipment' }), _jsx("option", { value: "order", children: language === 'my' ? 'အမှာစာ' : 'Order' }), _jsx("option", { value: "receipt", children: language === 'my' ? 'ရရှိမှုအထောက်အထား' : 'Receipt' }), _jsx("option", { value: "document", children: language === 'my' ? 'စာရွက်စာတမ်း' : 'Document' })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မှတ်ချက်များ' : 'Notes' }), _jsx(Textarea, { value: captureForm.notes, onChange: (e) => setCaptureForm({ ...captureForm, notes: e.target.value }), placeholder: language === 'my' ? 'မှတ်ချက်များ ထည့်ပါ...' : 'Enter notes...', rows: 3 })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium mb-2", children: [language === 'my' ? 'လက်မှတ်' : 'Signature', " *"] }), _jsx("div", { className: "border rounded-lg p-4", children: _jsx(ElectronicSignature, { onSignature: (signature) => setCaptureForm({ ...captureForm, signature_data: signature }), onClear: () => setCaptureForm({ ...captureForm, signature_data: '' }) }) })] }), _jsxs(Button, { onClick: captureSignature, disabled: loading || !captureForm.signature_data || !captureForm.signer_name || !captureForm.reference_id, className: "w-full", size: "lg", children: [loading ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(PenTool, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'လက်မှတ် သိမ်းဆည်းမည်' : 'Capture Signature'] })] })] }) }));
    const renderManageTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(Input, { placeholder: language === 'my' ? 'ရှာဖွေရန်...' : 'Search...', value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsxs("select", { value: filterType, onChange: (e) => setFilterType(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အမျိုးအစားအားလုံး' : 'All Types' }), _jsx("option", { value: "PICKUP", children: language === 'my' ? 'ပစ္စည်းယူ' : 'Pickup' }), _jsx("option", { value: "DELIVERY", children: language === 'my' ? 'ပို့ဆောင်' : 'Delivery' }), _jsx("option", { value: "RECEIPT", children: language === 'my' ? 'ရရှိမှုအထောက်အထား' : 'Receipt' }), _jsx("option", { value: "AUTHORIZATION", children: language === 'my' ? 'ခွင့်ပြုချက်' : 'Authorization' }), _jsx("option", { value: "HANDOVER", children: language === 'my' ? 'လွှဲပြောင်း' : 'Handover' }), _jsx("option", { value: "INSPECTION", children: language === 'my' ? 'စစ်ဆေး' : 'Inspection' })] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "px-3 py-2 border rounded-md", children: [_jsx("option", { value: "ALL", children: language === 'my' ? 'အခြေအနေအားလုံး' : 'All Status' }), _jsx("option", { value: "PENDING", children: language === 'my' ? 'စောင့်ဆိုင်း' : 'Pending' }), _jsx("option", { value: "SIGNED", children: language === 'my' ? 'လက်မှတ်ထိုးပြီး' : 'Signed' }), _jsx("option", { value: "VERIFIED", children: language === 'my' ? 'အတည်ပြုပြီး' : 'Verified' }), _jsx("option", { value: "REJECTED", children: language === 'my' ? 'ပယ်ချပြီး' : 'Rejected' })] })] }) }) }), _jsx("div", { className: "grid gap-4", children: loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(RefreshCw, { className: "w-8 h-8 animate-spin mx-auto mb-2" }), _jsx("p", { children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : filteredSignatures.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(PenTool, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'လက်မှတ် မရှိပါ' : 'No signatures found' })] }) })) : (filteredSignatures.map((signature) => (_jsx(Card, { className: "hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [getTypeIcon(signature.signature_type), _jsx("span", { className: "font-medium", children: signature.signer_name }), _jsx(Badge, { className: getStatusColor(signature.status), children: language === 'my'
                                                        ? signature.status === 'PENDING' ? 'စောင့်ဆိုင်း'
                                                            : signature.status === 'SIGNED' ? 'လက်မှတ်ထိုးပြီး'
                                                                : signature.status === 'VERIFIED' ? 'အတည်ပြုပြီး'
                                                                    : 'ပယ်ချပြီး'
                                                        : signature.status })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'အမျိုးအစား:' : 'Type:' }), _jsx("span", { className: "ml-1", children: signature.signature_type })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'ရည်ညွှန်း:' : 'Reference:' }), _jsx("span", { className: "ml-1", children: signature.reference_id })] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'ရက်စွဲ:' : 'Date:' }), _jsx("span", { className: "ml-1", children: new Date(signature.createdAt).toLocaleDateString() })] }), signature.verification_code && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'အတည်ပြုကုဒ်:' : 'Verification:' }), _jsx("span", { className: "ml-1 font-mono", children: signature.verification_code })] }))] }), signature.signer_role && (_jsxs("div", { className: "mt-1 text-sm text-gray-500", children: [_jsx("span", { className: "font-medium", children: language === 'my' ? 'ရာထူး:' : 'Role:' }), _jsx("span", { className: "ml-1", children: signature.signer_role })] })), signature.notes && (_jsx("div", { className: "mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded", children: signature.notes })), signature.verified_by && (_jsxs("div", { className: "mt-2 text-xs text-green-600", children: [language === 'my' ? 'အတည်ပြုသူ:' : 'Verified by:', " ", signature.verified_by, signature.verified_at && ` on ${new Date(signature.verified_at).toLocaleString()}`] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => downloadSignature(signature), children: _jsx(Download, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => setSelectedSignature(signature), children: _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }) }, signature.id)))) })] }));
    const renderVerifyTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "w-5 h-5" }), language === 'my' ? 'လက်မှတ် အတည်ပြုရန်' : 'Signature Verification'] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Shield, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-medium mb-2", children: language === 'my' ? 'လက်မှတ် အတည်ပြုမှု' : 'Signature Verification' }), _jsx("p", { className: "text-gray-600 mb-4", children: language === 'my'
                                            ? 'လက်မှတ်ကို အတည်ပြုရန် အတည်ပြုကုဒ် ထည့်ပါ'
                                            : 'Enter verification code to verify signature' }), _jsxs("div", { className: "max-w-md mx-auto space-y-4", children: [_jsx(Input, { placeholder: language === 'my' ? 'အတည်ပြုကုဒ် ထည့်ပါ' : 'Enter verification code', className: "text-center font-mono text-lg" }), _jsxs(Button, { className: "w-full", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'အတည်ပြုမည်' : 'Verify Signature'] })] })] }) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: language === 'my' ? 'အတည်ပြုရန် စောင့်ဆိုင်းနေသော လက်မှတ်များ' : 'Pending Verifications' }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: signatures.filter(s => s.status === 'SIGNED' && s.verification_status === 'PENDING').length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'အတည်ပြုရန် စောင့်ဆိုင်းနေသော လက်မှတ် မရှိပါ' : 'No pending verifications' })] })) : (signatures
                                .filter(s => s.status === 'SIGNED' && s.verification_status === 'PENDING')
                                .map((signature) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [getTypeIcon(signature.signature_type), _jsx("span", { className: "font-medium", children: signature.signer_name }), _jsx(Badge, { variant: "secondary", children: signature.signature_type })] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("span", { children: [language === 'my' ? 'ရည်ညွှန်း:' : 'Reference:', " ", signature.reference_id] }), _jsxs("span", { className: "ml-4", children: [language === 'my' ? 'ရက်စွဲ:' : 'Date:', " ", new Date(signature.createdAt).toLocaleDateString()] })] }), signature.verification_code && (_jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [language === 'my' ? 'အတည်ပြုကုဒ်:' : 'Code:', _jsx("span", { className: "font-mono ml-1", children: signature.verification_code })] }))] }), _jsxs(Button, { size: "sm", onClick: () => signature.verification_code && verifySignature(signature.id, signature.verification_code), children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-1" }), language === 'my' ? 'အတည်ပြု' : 'Verify'] })] }, signature.id)))) }) })] })] }));
    const renderTemplatesTab = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5" }), language === 'my' ? 'လက်မှတ် ပုံစံများ' : 'Signature Templates'] }), _jsx(Button, { children: language === 'my' ? 'ပုံစံအသစ် ဖန်တီး' : 'Create Template' })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: templates.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(FileText, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'လက်မှတ် ပုံစံ မရှိပါ' : 'No signature templates found' })] })) : (templates.map((template) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium", children: template.template_name }), _jsx(Badge, { variant: "outline", children: template.signature_type })] }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("span", { children: [language === 'my' ? 'လိုအပ်သော အချက်အလက်:' : 'Required fields:', " ", template.required_fields.length] }), _jsxs("span", { className: "ml-4", children: [language === 'my' ? 'သက်တမ်း:' : 'Expires:', " ", template.expiry_hours, "h"] }), template.approval_workflow && (_jsx("span", { className: "ml-4 text-blue-600", children: language === 'my' ? 'အတည်ပြုမှု လိုအပ်' : 'Approval Required' }))] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "outline", children: _jsx(Copy, { className: "w-4 h-4" }) })] })] }, template.id)))) }) })] }) }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-3xl font-bold", children: language === 'my' ? 'လက်မှတ် စီမံခန့်ခွဲမှု' : 'Electronic Signature Management' }), _jsxs(Button, { onClick: loadSignatureData, disabled: loading, children: [_jsx(RefreshCw, { className: `w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}` }), language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh'] })] }), _jsx("div", { className: "flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg", children: [
                    { key: 'CAPTURE', label: language === 'my' ? 'ရယူရန်' : 'Capture', icon: PenTool },
                    { key: 'MANAGE', label: language === 'my' ? 'စီမံခန့်ခွဲရန်' : 'Manage', icon: FileText },
                    { key: 'VERIFY', label: language === 'my' ? 'အတည်ပြုရန်' : 'Verify', icon: Shield },
                    { key: 'TEMPLATES', label: language === 'my' ? 'ပုံစံများ' : 'Templates', icon: Copy }
                ].map(({ key, label, icon: Icon }) => (_jsxs("button", { onClick: () => setActiveTab(key), className: `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${activeTab === key
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), label, key === 'VERIFY' && signatures.filter(s => s.verification_status === 'PENDING').length > 0 && (_jsx(Badge, { variant: "destructive", className: "ml-1 px-1 py-0 text-xs", children: signatures.filter(s => s.verification_status === 'PENDING').length }))] }, key))) }), activeTab === 'CAPTURE' && renderCaptureTab(), activeTab === 'MANAGE' && renderManageTab(), activeTab === 'VERIFY' && renderVerifyTab(), activeTab === 'TEMPLATES' && renderTemplatesTab(), selectedSignature && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50", children: _jsxs(Card, { className: "w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: language === 'my' ? 'လက်မှတ် အသေးစিတ်' : 'Signature Details' }), _jsx(Button, { variant: "ghost", onClick: () => setSelectedSignature(null), children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "border rounded-lg p-4 bg-gray-50", children: _jsx("img", { src: selectedSignature.signature_data, alt: "Signature", className: "max-w-full h-auto mx-auto", style: { maxHeight: '200px' } }) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'လက်မှတ်ထိုးသူ' : 'Signer' }), _jsx("p", { className: "font-medium", children: selectedSignature.signer_name }), selectedSignature.signer_role && (_jsx("p", { className: "text-sm text-gray-600", children: selectedSignature.signer_role }))] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'အမျိုးအစား' : 'Type' }), _jsx("p", { children: selectedSignature.signature_type })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'အခြေအနေ' : 'Status' }), _jsx(Badge, { className: getStatusColor(selectedSignature.status), children: language === 'my'
                                                        ? selectedSignature.status === 'PENDING' ? 'စောင့်ဆိုင်း'
                                                            : selectedSignature.status === 'SIGNED' ? 'လက်မှတ်ထိုးပြီး'
                                                                : selectedSignature.status === 'VERIFIED' ? 'အတည်ပြုပြီး'
                                                                    : 'ပယ်ချပြီး'
                                                        : selectedSignature.status })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'ရက်စွဲ' : 'Date' }), _jsx("p", { children: new Date(selectedSignature.createdAt).toLocaleString() })] })] }), selectedSignature.notes && (_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-600", children: language === 'my' ? 'မှတ်ချက်များ' : 'Notes' }), _jsx("p", { className: "bg-gray-50 p-3 rounded", children: selectedSignature.notes })] })), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: () => downloadSignature(selectedSignature), children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ဒေါင်းလုဒ်' : 'Download'] }), selectedSignature.status === 'SIGNED' && selectedSignature.verification_code && (_jsxs(Button, { variant: "outline", onClick: () => verifySignature(selectedSignature.id, selectedSignature.verification_code), children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'အတည်ပြု' : 'Verify'] }))] })] })] }) }))] }));
}
