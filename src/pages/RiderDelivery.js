import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Package, MapPin, Navigation, Camera, CheckCircle, Phone, User, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GPSTracker } from '@/components/GPSTracker';
import { ElectronicSignature } from '@/components/ElectronicSignature';
import { logisticsAPI } from '@/services/logistics-api';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';
export default function RiderDelivery() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t, language } = useLanguage();
    const [currentStep, setCurrentStep] = useState('LIST');
    const [deliveryItems, setDeliveryItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [signatureData, setSignatureData] = useState('');
    const [deliveryPhoto, setDeliveryPhoto] = useState('');
    const [notes, setNotes] = useState('');
    const [codCollected, setCodCollected] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    useEffect(() => {
        loadDeliveryItems();
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
    const loadDeliveryItems = async () => {
        try {
            setLoading(true);
            const response = await logisticsAPI.getShipments({
                status: 'out_for_delivery'
            });
            if (response.success) {
                // Convert shipments to delivery items
                const deliveryItems = (response.shipments || []).map(shipment => ({
                    ...shipment,
                    delivery_location: { lat: 0, lng: 0, address: shipment.receiver_address }
                }));
                setDeliveryItems(deliveryItems);
            }
        }
        catch (error) {
            console.error('Error loading delivery items:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setCurrentStep('NAVIGATION');
        if (item.cod_amount) {
            setCodCollected(item.cod_amount);
        }
    };
    const handleStartDelivery = () => {
        setCurrentStep('DELIVERY');
    };
    const handleSignatureComplete = (signature) => {
        setSignatureData(signature);
    };
    const handlePhotoCapture = () => {
        // In a real app, this would open camera
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setDeliveryPhoto(e.target?.result);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };
    const handleCompleteDelivery = async () => {
        if (!selectedItem || !signatureData)
            return;
        try {
            setLoading(true);
            // Update shipment status
            await logisticsAPI.updateShipmentStatus(selectedItem.id, 'delivered', {
                delivery_signature: signatureData,
                delivery_photo: deliveryPhoto,
                delivery_notes: notes,
                delivery_time: new Date().toISOString(),
                delivery_location: currentLocation,
                cod_collected: selectedItem.cod_amount ? codCollected : 0
            });
            // Create delivery event
            await advancedFeaturesAPI.createEvent({
                event_type: 'DELIVERY_COMPLETE',
                event_category: 'rider_operation',
                reference_id: selectedItem.id,
                reference_type: 'shipment',
                event_data: {
                    signature: signatureData,
                    photo: deliveryPhoto,
                    notes: notes,
                    cod_collected: selectedItem.cod_amount ? codCollected : 0,
                    location: currentLocation
                }
            });
            setCurrentStep('COMPLETE');
            // Refresh delivery list
            setTimeout(() => {
                loadDeliveryItems();
                setCurrentStep('LIST');
                setSelectedItem(null);
                setSignatureData('');
                setDeliveryPhoto('');
                setNotes('');
                setCodCollected(0);
            }, 3000);
        }
        catch (error) {
            console.error('Error completing delivery:', error);
            alert(language === 'my' ? 'ပို့ဆောင်ခြင်း မအောင်မြင်ပါ' : 'Failed to complete delivery');
        }
        finally {
            setLoading(false);
        }
    };
    const renderDeliveryList = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold", children: language === 'my' ? 'ပို့ဆောင်ရန်စာရင်း' : 'Delivery List' }), _jsx(Button, { onClick: loadDeliveryItems, disabled: loading, children: language === 'my' ? 'ပြန်လည်ရယူ' : 'Refresh' })] }), loading ? (_jsxs("div", { className: "text-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" }), _jsx("p", { className: "mt-2", children: language === 'my' ? 'ရယူနေသည်...' : 'Loading...' })] })) : deliveryItems.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "text-center py-8", children: [_jsx(Package, { className: "w-12 h-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: language === 'my' ? 'ပို့ဆောင်ရန် မရှိပါ' : 'No items to deliver' })] }) })) : (_jsx("div", { className: "grid gap-4", children: deliveryItems.map((item) => (_jsx(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Badge, { variant: "outline", children: item.awb_number }), _jsx(Badge, { variant: "secondary", children: item.service_type }), item.cod_amount && (_jsx(Badge, { variant: "destructive", children: "COD" }))] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { children: item.receiver_name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { children: item.receiver_phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gray-500" }), _jsx("span", { className: "text-gray-600", children: item.receiver_address })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Package, { className: "w-4 h-4 text-gray-500" }), _jsxs("span", { children: [item.weight, "kg"] }), item.cod_amount && (_jsxs("span", { className: "text-orange-600 font-medium", children: ["COD: ", item.cod_amount.toLocaleString(), " MMK"] }))] })] })] }), _jsx(Button, { onClick: () => handleItemSelect(item), children: language === 'my' ? 'ပို့မည်' : 'Deliver' })] }) }) }, item.id))) }))] }));
    const renderNavigation = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('LIST'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'လမ်းညွှန်' : 'Navigation' })] }), selectedItem && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Navigation, { className: "w-5 h-5" }), selectedItem.awb_number] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: language === 'my' ? 'ပို့ဆောင်ရန်နေရာ' : 'Delivery Location' }), _jsxs("div", { className: "bg-gray-50 p-3 rounded", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(User, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: selectedItem.receiver_name })] }), _jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Phone, { className: "w-4 h-4" }), _jsx("span", { children: selectedItem.receiver_phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsx("span", { children: selectedItem.receiver_address })] })] })] }), selectedItem.cod_amount && (_jsx("div", { className: "bg-orange-50 border border-orange-200 p-3 rounded", children: _jsxs("div", { className: "flex items-center gap-2 text-orange-700", children: [_jsx(DollarSign, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: language === 'my' ? 'COD ကောက်ခံရန်:' : 'COD to Collect:' }), _jsxs("span", { className: "font-bold", children: [selectedItem.cod_amount.toLocaleString(), " MMK"] })] }) })), currentLocation && selectedItem.delivery_location && (_jsx(GPSTracker, { routeId: selectedItem.id, deviceId: "rider_device" })), _jsxs(Button, { onClick: handleStartDelivery, className: "w-full", size: "lg", children: [_jsx(MapPin, { className: "w-4 h-4 mr-2" }), language === 'my' ? 'ရောက်ရှိပြီး ပို့ဆောင်မည်' : 'Arrived - Start Delivery'] })] })] }))] }));
    const renderDelivery = () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setCurrentStep('NAVIGATION'), children: language === 'my' ? 'နောက်သို့' : 'Back' }), _jsx("h2", { className: "text-xl font-bold", children: language === 'my' ? 'ပို့ဆောင်ခြင်း' : 'Delivery' })] }), _jsxs("div", { className: "space-y-4", children: [selectedItem?.cod_amount && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-5 h-5" }), language === 'my' ? 'COD ကောက်ခံခြင်း' : 'COD Collection'] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium", children: language === 'my' ? 'ကောက်ခံရမည့်ပမာણ:' : 'Amount to Collect:' }), _jsx(Input, { type: "number", value: codCollected, onChange: (e) => setCodCollected(Number(e.target.value)), className: "text-lg font-bold" }), _jsxs("p", { className: "text-sm text-gray-600", children: [language === 'my' ? 'မူလပမာණ:' : 'Original Amount:', " ", selectedItem.cod_amount.toLocaleString(), " MMK"] })] }) })] })), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Camera, { className: "w-5 h-5" }), language === 'my' ? 'ပို့ဆောင်မှုအထောက်အထား' : 'Proof of Delivery'] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'ပို့ဆောင်မှုဓာတ်ပုံ' : 'Delivery Photo' }), deliveryPhoto ? (_jsxs("div", { className: "space-y-2", children: [_jsx("img", { src: deliveryPhoto, alt: "Delivery proof", className: "w-full h-48 object-cover rounded border" }), _jsx(Button, { variant: "outline", onClick: handlePhotoCapture, children: language === 'my' ? 'ပြန်ရိုက်မည်' : 'Retake Photo' })] })) : (_jsxs(Button, { onClick: handlePhotoCapture, variant: "outline", className: "w-full h-32", children: [_jsx(Camera, { className: "w-8 h-8 mb-2" }), _jsxs("div", { children: [_jsx("div", { children: language === 'my' ? 'ဓာတ်ပုံရိုက်မည်' : 'Take Photo' }), _jsx("div", { className: "text-xs text-gray-500", children: language === 'my' ? 'ပို့ဆောင်မှုအထောက်အထားအတွက်' : 'For delivery proof' })] })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'လက်ခံသူ လက်မှတ်' : 'Receiver Signature' }), _jsx(ElectronicSignature, { onSignature: handleSignatureComplete })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: language === 'my' ? 'မှတ်ချက်များ (ရွေးချယ်ခွင့်ရှိ)' : 'Notes (Optional)' }), _jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: language === 'my'
                                                    ? 'ပို့ဆောင်မှုအခြေအနေ သို့မဟုတ် အခြားမှတ်ချက်များ...'
                                                    : 'Delivery condition or other notes...', rows: 3 })] })] })] }), _jsxs(Button, { onClick: handleCompleteDelivery, disabled: !signatureData || loading, className: "w-full", size: "lg", children: [loading ? (_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" })) : (_jsx(CheckCircle, { className: "w-4 h-4 mr-2" })), language === 'my' ? 'ပို့ဆောင်ခြင်း ပြီးစီးမည်' : 'Complete Delivery'] })] })] }));
    const renderComplete = () => (_jsxs("div", { className: "text-center py-8", children: [_jsx(CheckCircle, { className: "w-16 h-16 text-green-500 mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-green-600 mb-2", children: language === 'my' ? 'ပို့ဆောင်ခြင်း ပြီးစီးပါပြီ!' : 'Delivery Completed!' }), _jsx("p", { className: "text-gray-600 mb-4", children: language === 'my'
                    ? 'ပစ္စည်းကို အောင်မြင်စွာ ပို့ဆောင်ပြီးပါပြီ'
                    : 'Package has been successfully delivered' }), selectedItem && (_jsxs("div", { className: "space-y-2", children: [_jsx(Badge, { variant: "outline", className: "text-lg px-4 py-2", children: selectedItem.awb_number }), selectedItem.cod_amount && (_jsxs("div", { className: "text-green-600 font-medium", children: ["COD: ", codCollected.toLocaleString(), " MMK ", language === 'my' ? 'ကောက်ခံပြီး' : 'Collected'] }))] }))] }));
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: ['LIST', 'NAVIGATION', 'DELIVERY', 'COMPLETE'].map((step, index) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === step
                                        ? 'bg-primary text-white'
                                        : index < ['LIST', 'NAVIGATION', 'DELIVERY', 'COMPLETE'].indexOf(currentStep)
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'}`, children: index + 1 }), index < 3 && (_jsx("div", { className: `w-16 h-1 mx-2 ${index < ['LIST', 'NAVIGATION', 'DELIVERY', 'COMPLETE'].indexOf(currentStep)
                                        ? 'bg-green-500'
                                        : 'bg-gray-200'}` }))] }, step))) }), _jsx("div", { className: "text-sm text-gray-600 text-center", children: language === 'my' ? 'ပို့ဆောင်ခြင်း လုပ်ငန်းစဉ်' : 'Delivery Process' })] }), currentStep === 'LIST' && renderDeliveryList(), currentStep === 'NAVIGATION' && renderNavigation(), currentStep === 'DELIVERY' && renderDelivery(), currentStep === 'COMPLETE' && renderComplete()] }));
}
