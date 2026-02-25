import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Package, MapPin, Navigation, QrCode, CheckCircle, Phone, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeScanner } from '@/components/QRCodeScanner';
import { GPSTracker } from '@/components/GPSTracker';
import { ElectronicSignature } from '@/components/ElectronicSignature';
import { logisticsAPI } from '@/services/logistics-api';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RiderPickup() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [currentStep, setCurrentStep] = useState('LIST');
    const [pickupItems, setPickupItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scannerActive, setScannerActive] = useState(false);
    const [signatureData, setSignatureData] = useState('');
    const [notes, setNotes] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    useEffect(() => {
        loadPickupItems();
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
    const loadPickupItems = async () => {
        try {
            setLoading(true);
            const response = await logisticsAPI.getShipments({
                status: 'pending_pickup'
            });
            if (response.success) {
                // Convert shipments to pickup items
                const pickupItems = (response.shipments || []).map(shipment => ({
                    ...shipment,
                    pickup_location: { lat: 0, lng: 0, address: shipment.sender_address }
                }));
                setPickupItems(pickupItems);
            }
        }
        catch (error) {
            console.error('Error loading pickup items:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setCurrentStep('NAVIGATION');
    };
    const handleStartPickup = () => {
        setCurrentStep('SCANNING');
        setScannerActive(true);
    };
    const handleQRScan = async (data) => {
        try {
            const qrData = JSON.parse(data);
            if (qrData.awb === selectedItem?.awb_number) {
                setScannerActive(false);
                setCurrentStep('SIGNATURE');
                // Record pickup event
                await advancedFeaturesAPI.createEvent({
                    event_type: 'PICKUP_SCAN',
                    event_category: 'rider_operation',
                    reference_id: selectedItem.id,
                    reference_type: 'shipment',
                    event_data: { qr_data: qrData, location: currentLocation }
                });
            }
            else {
                alert(language === 'my' ? 'မှားယွင်းသော QR ကုဒ်' : 'Invalid QR Code');
            }
        }
        catch (error) {
            console.error('QR scan error:', error);
            alert(language === 'my' ? 'QR ကုဒ် ဖတ်ရှုမှု မအောင်မြင်ပါ' : 'Failed to read QR code');
        }
    };
    const handleSignatureComplete = (signature) => {
        setSignatureData(signature);
    };
    const handleCompletePickup = async () => {
        if (!selectedItem || !signatureData)
            return;
        try {
            setLoading(true);
            // Update shipment status - using generic update method
            await logisticsAPI.updateShipmentStatus(selectedItem.id, 'picked_up', {
                pickup_signature: signatureData,
                pickup_notes: notes,
                pickup_time: new Date().toISOString(),
                pickup_location: currentLocation
            });
            // Create pickup event
            await advancedFeaturesAPI.createEvent({
                event_type: 'PICKUP_COMPLETE',
                event_category: 'rider_operation',
                reference_id: selectedItem.id,
                reference_type: 'shipment',
                event_data: {
                    signature: signatureData,
                    notes: notes,
                    location: currentLocation
                }
            });
            setCurrentStep('COMPLETE');
            // Refresh pickup list
            setTimeout(() => {
                loadPickupItems();
                setCurrentStep('LIST');
                setSelectedItem(null);
                setSignatureData('');
                setNotes('');
            }, 3000);
        }
        catch (error) {
            console.error('Error completing pickup:', error);
            alert(language === 'my' ? 'ပစ္စည်းယူခြင်း မအောင်မြင်ပါ' : 'Failed to complete pickup');
        }
        finally {
            setLoading(false);
        }
    };
    const renderPickupList = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'ပစ္စည်းယူရန်စာရင်း' : 'Pickup List' }), _jsx(Button, { onClick: loadPickupItems, disabled: loading, children: language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh' })] }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-2", children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : pickupItems.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Package, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'ပစ္စည်းယူရန် မရှိပါ' : 'No items to pickup' })] }) })) : (_jsx("div", { className: "grid gap-4", children: pickupItems.map((item) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { variant: "outline", children: item.awb_number }), _jsx(Badge, { variant: "secondary", children: item.service_type })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { children: item.sender_name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { children: item.sender_phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { className: "text-gray-600", children: item.sender_address })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-gray-500" }), _jsxs("span", { children: [item.weight, "kg"] }), item.cod_amount && (_jsxs("span", { className: "text-orange-600 font-medium", children: ["COD: ", item.cod_amount.toLocaleString(), " MMK"] }))] })] })] }), _jsx(Button, { onClick: () => handleItemSelect(item), children: language === 'my' ? 'ယူမည်' : 'Pickup' })] }) }) }, item.id))) }))] }));
    const renderNavigation = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('LIST'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'လမ်းညွှန်' : 'Navigation' })] }), selectedItem && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Navigation, { className: "w-5 h-5" }), selectedItem.awb_number] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: language === 'my' ? 'ပစ္စည်းယူရန်နေရာ' : 'Pickup Location' }), _jsxs("div", { className: "bg-gray-50 p-3 rounded", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(User, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: selectedItem.sender_name })] }), _jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Phone, { className: "w-4 h-4" }), _jsx("span", { children: selectedItem.sender_phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { children: selectedItem.sender_address })] })] })] }), currentLocation && selectedItem.pickup_location && (_jsx(GPSTracker, { routeId: selectedItem.id, deviceId: "rider_device" })), _jsxs(Button, { onClick: handleStartPickup, className: "w-full", size: "lg", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ရောက်ရှိပြီး ပစ္စည်းယူမည်' : 'Arrived - Start Pickup'] })] })] }))] }));
    const renderScanning = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('NAVIGATION'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'QR ကုဒ် စကင်န်ဖတ်ခြင်း' : 'QR Code Scanning' })] }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx(QrCode, { className: "w-12 h-12 text-primary mx-auto mb-2" }), _jsx("p", { className: "text-gray-600", children: language === 'my'
                                        ? 'ပစ္စည်းပေါ်ရှိ QR ကုဒ်ကို စကင်န်ဖတ်ပါ'
                                        : 'Scan the QR code on the package' })] }), scannerActive && (_jsx(QRCodeScanner, { onScan: handleQRScan, onError: (error) => {
                                console.error('Scanner error:', error);
                                alert(language === 'my' ? 'စကင်နာ အမှား' : 'Scanner error');
                            } })), selectedItem && (_jsxs("div", { className: "mt-4 p-3 bg-gray-50 rounded", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: language === 'my' ? 'မျှော်လင့်ထားသော AWB:' : 'Expected AWB:' }), _jsx("p", { className: "font-mono font-bold", children: selectedItem.awb_number })] }))] }) })] }));
    const renderSignature = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('SCANNING'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'လက်မှတ်ရယူခြင်း' : 'Signature Capture' })] }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ပို့သူ လက်မှတ်' : 'Sender Signature' }), _jsx(ElectronicSignature, { onSignature: handleSignatureComplete })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မှတ်ချက်များ (ရွေးချယ်ခွင့်ရှိ)' : 'Notes (Optional)' }), _jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: language === 'my'
                                        ? 'ပစ္စည်းအခြေအနေ သို့မဟုတ် အခြားမှတ်ချက်များ...'
                                        : 'Package condition or other notes...', rows: 3 })] }), _jsxs(Button, { onClick: handleCompletePickup, disabled: !signatureData || loading, className: "w-full", size: "lg", children: [loading ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(CheckCircle, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'ပစ္စည်းယူခြင်း ပြီးစီးမည်' : 'Complete Pickup'] })] }) })] }));
    const renderComplete = () => (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "w-16 h-16 text-green-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-green-600 mb-2", children: language === 'my' ? 'ပစ္စည်းယူခြင်း ပြီးစီးပါပြီ!' : 'Pickup Completed!' }), _jsx("p", { className: "text-gray-600 mb-4", children: language === 'my'
                    ? 'ပစ္စည်းကို အောင်မြင်စွာ ယူပြီးပါပြီ'
                    : 'Package has been successfully picked up' }), selectedItem && (_jsx(Badge, { variant: "outline", className: "text-lg px-4 py-2", children: selectedItem.awb_number }))] }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: ['LIST', 'NAVIGATION', 'SCANNING', 'SIGNATURE', 'COMPLETE'].map((step, index) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step
                                        ? 'bg-primary text-white'
                                        : index < ['LIST', 'NAVIGATION', 'SCANNING', 'SIGNATURE', 'COMPLETE'].indexOf(currentStep)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'}`, children: index + 1 }), index < 4 && (_jsx("div", { className: `w-12 h-1 mx-2 ${index < ['LIST', 'NAVIGATION', 'SCANNING', 'SIGNATURE', 'COMPLETE'].indexOf(currentStep)
                                        ? 'bg-green-500'
                                        : 'bg-gray-200'}` }))] }, step))) }), _jsx("div", { className: "text-sm text-gray-600 text-center", children: language === 'my' ? 'ပစ္စည်းယူခြင်း လုပ်ငန်းစဉ်' : 'Pickup Process' })] }), currentStep === 'LIST' && renderPickupList(), currentStep === 'NAVIGATION' && renderNavigation(), currentStep === 'SCANNING' && renderScanning(), currentStep === 'SIGNATURE' && renderSignature(), currentStep === 'COMPLETE' && renderComplete()] }));
}
