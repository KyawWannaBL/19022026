import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Package, MapPin, Navigation, QrCode, Camera, CheckCircle, Clock, Phone, Warehouse, Scan, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { GPSTracker } from '@/components/GPSTracker';
import { ElectronicSignature } from '@/components/ElectronicSignature';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RiderWarehouse() {
    const { t, language } = useLanguage();
    const [currentStep, setCurrentStep] = useState('LIST');
    const [warehouseBatches, setWarehouseBatches] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scannerActive, setScannerActive] = useState(false);
    const [signatureData, setSignatureData] = useState('');
    const [handoverPhoto, setHandoverPhoto] = useState('');
    const [notes, setNotes] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [scannedPackages, setScannedPackages] = useState([]);
    useEffect(() => {
        loadWarehouseBatches();
        getCurrentLocation();
    }, []);
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (error) => {
                console.error('Error getting location:', error);
            });
        }
    };
    const loadWarehouseBatches = async () => {
        try {
            setLoading(true);
            // Mock warehouse drop batches for demo
            const response = { success: true, data: [] };
            if (response.success) {
                setWarehouseBatches(response.data || []);
            }
        }
        catch (error) {
            console.error('Error loading warehouse batches:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleBatchSelect = (batch) => {
        setSelectedBatch(batch);
        setCurrentStep('NAVIGATION');
    };
    const handleStartScanning = () => {
        setCurrentStep('SCANNING');
        setScannerActive(true);
    };
    const handlePackageScan = async (data) => {
        try {
            const packageData = JSON.parse(data);
            if (selectedBatch) {
                const packageExists = selectedBatch.packages.find(pkg => pkg.awb_number === packageData.awb_number);
                if (packageExists && !scannedPackages.includes(packageData.awb_number)) {
                    // Mock package update for demo
                    console.log('Package updated:', packageExists.id);
                    // Create scan event
                    await advancedFeaturesAPI.createEvent({
                        event_type: 'WAREHOUSE_PACKAGE_SCAN',
                        event_category: 'rider_operation',
                        reference_id: packageExists.id,
                        reference_type: 'package',
                        event_data: { package_data: packageData, batch_id: selectedBatch.id, location: currentLocation }
                    });
                    setScannedPackages(prev => [...prev, packageData.awb_number]);
                    alert(language === 'my' ? 'ပစ္စည်း စကင်န်ဖတ်ပြီး' : 'Package scanned successfully');
                }
                else if (scannedPackages.includes(packageData.awb_number)) {
                    alert(language === 'my' ? 'ဤပစ္စည်းကို စကင်န်ဖတ်ပြီးပါပြီ' : 'Package already scanned');
                }
                else {
                    alert(language === 'my' ? 'ဤ batch တွင် ပစ္စည်းမရှိပါ' : 'Package not found in this batch');
                }
            }
        }
        catch (error) {
            console.error('Package scan error:', error);
            alert(language === 'my' ? 'ပစ္စည်း စကင်န်ဖတ်မှု မအောင်မြင်ပါ' : 'Failed to scan package');
        }
    };
    const handleStartHandover = () => {
        if (scannedPackages.length === selectedBatch?.total_packages) {
            setCurrentStep('HANDOVER');
            setScannerActive(false);
        }
        else {
            alert(language === 'my'
                ? 'ပစ္စည်းအားလုံးကို စကင်န်ဖတ်ပါ'
                : 'Please scan all packages before handover');
        }
    };
    const handleSignatureComplete = (signature) => {
        setSignatureData(signature);
    };
    const handlePhotoCapture = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setHandoverPhoto(e.target?.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };
    const handleCompleteHandover = async () => {
        if (!selectedBatch || !signatureData)
            return;
        try {
            setLoading(true);
            // Mock batch status update for demo
            console.log('Warehouse drop batch completed:', selectedBatch.id);
            // Create handover event
            await advancedFeaturesAPI.createEvent({
                event_type: 'WAREHOUSE_HANDOVER_COMPLETE',
                event_category: 'rider_operation',
                reference_id: selectedBatch.id,
                reference_type: 'batch',
                event_data: {
                    signature: signatureData,
                    photo: handoverPhoto,
                    notes: notes,
                    packages_count: scannedPackages.length,
                    location: currentLocation
                }
            });
            setCurrentStep('COMPLETE');
            // Refresh batches list
            setTimeout(() => {
                loadWarehouseBatches();
                setCurrentStep('LIST');
                setSelectedBatch(null);
                setSignatureData('');
                setHandoverPhoto('');
                setNotes('');
                setScannedPackages([]);
            }, 3000);
        }
        catch (error) {
            console.error('Error completing handover:', error);
            alert(language === 'my' ? 'လွှဲပြောင်းခြင်း မအောင်မြင်ပါ' : 'Failed to complete handover');
        }
        finally {
            setLoading(false);
        }
    };
    const renderBatchList = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'ဂိုဒေါင်လွှဲပြောင်းရန်စာရင်း' : 'Warehouse Drop List' }), _jsx(Button, { onClick: loadWarehouseBatches, disabled: loading, children: language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh' })] }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-2", children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : warehouseBatches.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Warehouse, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'ဂိုဒေါင်လွှဲပြောင်းရန် မရှိပါ' : 'No warehouse drops available' })] }) })) : (_jsx("div", { className: "grid gap-4", children: warehouseBatches.map((batch) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { variant: "outline", children: batch.batch_number }), _jsx(Badge, { variant: batch.status === 'assigned' ? 'secondary' : 'default', children: language === 'my'
                                                        ? batch.status === 'assigned' ? 'သတ်မှတ်ပြီး' : 'သယ်ယူနေ'
                                                        : batch.status.replace('_', ' ').toUpperCase() })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Warehouse, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { className: "font-medium", children: batch.warehouse_name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { children: batch.warehouse_contact })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { className: "text-gray-600", children: batch.warehouse_address })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-gray-500" }), _jsxs("span", { children: [batch.total_packages, " ", language === 'my' ? 'ပစ္စည်း' : 'packages'] }), _jsxs("span", { className: "text-green-600", children: ["(", batch.scanned_packages, " ", language === 'my' ? 'စကင်န်ဖတ်ပြီး' : 'scanned', ")"] })] })] }), _jsx("div", { className: "mt-2", children: _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-300", style: { width: `${(batch.scanned_packages / batch.total_packages) * 100}%` } }) }) })] }), _jsx(Button, { onClick: () => handleBatchSelect(batch), children: language === 'my' ? 'လွှဲပြောင်းမည်' : 'Drop Off' })] }) }) }, batch.id))) }))] }));
    const renderNavigation = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('LIST'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'လမ်းညွှန်' : 'Navigation' })] }), selectedBatch && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Navigation, { className: "w-5 h-5" }), selectedBatch.batch_number] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: language === 'my' ? 'ဂိုဒေါင်အချက်အလက်' : 'Warehouse Information' }), _jsxs("div", { className: "bg-gray-50 p-3 rounded", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Warehouse, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: selectedBatch.warehouse_name })] }), _jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Phone, { className: "w-4 h-4" }), _jsx("span", { children: selectedBatch.warehouse_contact })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { children: selectedBatch.warehouse_address })] })] })] }), _jsx("div", { className: "bg-blue-50 border border-blue-200 p-3 rounded", children: _jsxs("div", { className: "flex items-center gap-2 text-blue-700", children: [_jsx(Package, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: language === 'my' ? 'လွှဲပြောင်းရမည့်ပစ္စည်း:' : 'Packages to Drop:' }), _jsx("span", { className: "font-bold", children: selectedBatch.total_packages })] }) }), currentLocation && selectedBatch.warehouse_location && (_jsx(GPSTracker, { routeId: selectedBatch.id, deviceId: "rider_device" })), _jsxs(Button, { onClick: handleStartScanning, className: "w-full", size: "lg", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ရောက်ရှိပြီး စကင်န်ဖတ်မည်' : 'Arrived - Start Scanning'] })] })] }))] }));
    const renderScanning = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('NAVIGATION'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'ပစ္စည်းများ စကင်န်ဖတ်ခြင်း' : 'Package Scanning' })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(QrCode, { className: "w-5 h-5" }), language === 'my' ? 'QR စကင်နာ' : 'QR Scanner'] }) }), _jsx(CardContent, { children: scannerActive ? (_jsx(QRCodeScanner, { onScan: handlePackageScan, onError: (error) => {
                                        console.error('Scanner error:', error);
                                        alert(language === 'my' ? 'စကင်နာ အမှား' : 'Scanner error');
                                    } })) : (_jsxs(Button, { onClick: () => setScannerActive(true), className: "w-full", size: "lg", children: [_jsx(Scan, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'စကင်န်ဖတ်မည်' : 'Start Scanning'] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: language === 'my' ? 'တိုးတက်မှု' : 'Progress' }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-3xl font-bold text-green-600", children: [scannedPackages.length, " / ", selectedBatch?.total_packages] }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'စကင်န်ဖတ်ပြီး' : 'Packages Scanned' })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-4", children: _jsx("div", { className: "bg-green-500 h-4 rounded-full transition-all duration-300", style: {
                                                    width: `${selectedBatch ? (scannedPackages.length / selectedBatch.total_packages) * 100 : 0}%`
                                                } }) }), scannedPackages.length === selectedBatch?.total_packages && (_jsxs(Button, { onClick: handleStartHandover, className: "w-full", size: "lg", children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'လွှဲပြောင်းမည်' : 'Start Handover'] }))] }) })] })] }), selectedBatch && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: language === 'my' ? 'ပစ္စည်းစာရင်း' : 'Package List' }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: selectedBatch.packages.map((pkg) => (_jsxs("div", { className: `flex items-center justify-between p-2 rounded border ${scannedPackages.includes(pkg.awb_number)
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-gray-50'}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${scannedPackages.includes(pkg.awb_number) ? 'bg-green-500' : 'bg-gray-300'}` }), _jsxs("div", { children: [_jsx("span", { className: "font-mono text-sm", children: pkg.awb_number }), _jsxs("div", { className: "text-xs text-gray-600", children: [pkg.sender_name, " \u2192 ", pkg.receiver_name] })] })] }), _jsx("div", { className: "text-sm", children: scannedPackages.includes(pkg.awb_number) ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-500" })) : (_jsx(Clock, { className: "w-4 h-4 text-gray-400" })) })] }, pkg.id))) }) })] }))] }));
    const renderHandover = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('SCANNING'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'ဂိုဒေါင်လွှဲပြောင်းခြင်း' : 'Warehouse Handover' })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Camera, { className: "w-5 h-5" }), language === 'my' ? 'လွှဲပြောင်းမှုဓာတ်ပုံ' : 'Handover Photo'] }) }), _jsx(CardContent, { children: handoverPhoto ? (_jsxs("div", { className: "space-y-2", children: [_jsx("img", { src: handoverPhoto, alt: "Handover proof", className: "w-full h-48 object-cover rounded border" }), _jsx(Button, { variant: "outline", onClick: handlePhotoCapture, children: language === 'my' ? 'ပြန်ရိုက်မည်' : 'Retake Photo' })] })) : (_jsxs(Button, { onClick: handlePhotoCapture, variant: "outline", className: "w-full h-32", children: [_jsx(Camera, { className: "w-8 h-8 mb-2" }), _jsxs("div", { children: [_jsx("div", { children: language === 'my' ? 'ဓာတ်ပုံရိုက်မည်' : 'Take Photo' }), _jsx("div", { className: "text-xs text-gray-500", children: language === 'my' ? 'လွှဲပြောင်းမှုအထောက်အထားအတွက်' : 'For handover proof' })] })] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5" }), language === 'my' ? 'ဂိုဒေါင်ဝန်ထမ်း လက်မှတ်' : 'Warehouse Staff Signature'] }) }), _jsx(CardContent, { children: _jsx(ElectronicSignature, { onSignature: handleSignatureComplete }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: language === 'my' ? 'မှတ်ချက်များ' : 'Notes' }) }), _jsx(CardContent, { children: _jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: language === 'my'
                                        ? 'လွှဲပြောင်းမှုအခြေအနေ သို့မဟုတ် အခြားမှတ်ချက်များ...'
                                        : 'Handover condition or other notes...', rows: 3 }) })] }), _jsxs(Button, { onClick: handleCompleteHandover, disabled: !signatureData || loading, className: "w-full", size: "lg", children: [loading ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(CheckCircle, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'လွှဲပြောင်းခြင်း ပြီးစီးမည်' : 'Complete Handover'] })] })] }));
    const renderComplete = () => (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "w-16 h-16 text-green-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-green-600 mb-2", children: language === 'my' ? 'ဂိုဒေါင်လွှဲပြောင်းခြင်း ပြီးစီးပါပြီ!' : 'Warehouse Drop Completed!' }), _jsx("p", { className: "text-gray-600 mb-4", children: language === 'my'
                    ? 'ပစ္စည်းများကို ဂိုဒေါင်သို့ အောင်မြင်စွာ လွှဲပြောင်းပြီးပါပြီ'
                    : 'Packages have been successfully handed over to warehouse' }), selectedBatch && (_jsxs("div", { className: "space-y-2", children: [_jsx(Badge, { variant: "outline", className: "text-lg px-4 py-2", children: selectedBatch.batch_number }), _jsxs("div", { className: "text-green-600 font-medium", children: [scannedPackages.length, " ", language === 'my' ? 'ပစ္စည်း လွှဲပြောင်းပြီး' : 'packages handed over'] })] }))] }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: ['LIST', 'NAVIGATION', 'SCANNING', 'HANDOVER', 'COMPLETE'].map((step, index) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step
                                        ? 'bg-primary text-white'
                                        : index < ['LIST', 'NAVIGATION', 'SCANNING', 'HANDOVER', 'COMPLETE'].indexOf(currentStep)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'}`, children: index + 1 }), index < 4 && (_jsx("div", { className: `w-12 h-1 mx-2 ${index < ['LIST', 'NAVIGATION', 'SCANNING', 'HANDOVER', 'COMPLETE'].indexOf(currentStep)
                                        ? 'bg-green-500'
                                        : 'bg-gray-200'}` }))] }, step))) }), _jsx("div", { className: "text-sm text-gray-600 text-center", children: language === 'my' ? 'ဂိုဒေါင်လွှဲပြောင်းခြင်း လုပ်ငန်းစဉ်' : 'Warehouse Drop Process' })] }), currentStep === 'LIST' && renderBatchList(), currentStep === 'NAVIGATION' && renderNavigation(), currentStep === 'SCANNING' && renderScanning(), currentStep === 'HANDOVER' && renderHandover(), currentStep === 'COMPLETE' && renderComplete()] }));
}
