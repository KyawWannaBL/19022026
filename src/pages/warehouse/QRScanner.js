import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Camera, Scan, Package, CheckCircle, XCircle, ArrowLeft, RefreshCw, Flashlight, FlashlightOff, History, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/lib/translations';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import WarehouseAPI from '@/lib/warehouse-api';
import { ROUTE_PATHS } from '@/lib/index';
export default function QRScanner() {
    const { language } = useLanguageContext();
    const { t } = useTranslation(language);
    const [manualCode, setManualCode] = useState('');
    const [scanning, setScanning] = useState(false);
    const [scanResults, setScanResults] = useState([]);
    const [currentScan, setCurrentScan] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [flashlightOn, setFlashlightOn] = useState(false);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    // Initialize camera
    const startCamera = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setCameraActive(true);
            }
        }
        catch (err) {
            console.error('Error accessing camera:', err);
            setError('Camera access denied. Please allow camera permissions and try again.');
        }
    };
    // Stop camera
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraActive(false);
        setFlashlightOn(false);
    };
    // Toggle flashlight
    const toggleFlashlight = async () => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            if (videoTrack && 'torch' in videoTrack.getCapabilities()) {
                try {
                    await videoTrack.applyConstraints({
                        advanced: [{ torch: !flashlightOn }]
                    });
                    setFlashlightOn(!flashlightOn);
                }
                catch (err) {
                    console.error('Flashlight not supported:', err);
                }
            }
        }
    };
    // Process scanned QR code
    const processQRCode = async (qrCode, method = 'manual') => {
        if (!qrCode.trim())
            return;
        setScanning(true);
        setError(null);
        try {
            const result = await WarehouseAPI.scanQRCode(qrCode.trim());
            const scanResult = {
                id: Date.now().toString(),
                qrCode: qrCode.trim(),
                success: result.success,
                message: result.message || (result.success ? t('warehouse.scanSuccess') : t('warehouse.scanFailed')),
                data: result.data,
                type: result.type,
                timestamp: new Date()
            };
            setScanResults(prev => [scanResult, ...prev.slice(0, 9)]); // Keep last 10 results
            setCurrentScan(scanResult);
            if (method === 'manual') {
                setManualCode('');
            }
            // Auto-clear current scan after 5 seconds
            setTimeout(() => setCurrentScan(null), 5000);
        }
        catch (error) {
            console.error('Error processing QR code:', error);
            const errorResult = {
                id: Date.now().toString(),
                qrCode: qrCode.trim(),
                success: false,
                message: t('warehouse.scanFailed'),
                timestamp: new Date()
            };
            setScanResults(prev => [errorResult, ...prev.slice(0, 9)]);
            setCurrentScan(errorResult);
        }
        finally {
            setScanning(false);
        }
    };
    // Handle manual scan
    const handleManualScan = (e) => {
        e.preventDefault();
        processQRCode(manualCode, 'manual');
    };
    // Simulate QR code detection (in real app, use a QR code library like jsQR)
    const simulateQRDetection = () => {
        // This is a placeholder - in a real implementation, you would use a library like jsQR
        // to detect QR codes from the video stream
        if (cameraActive && videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context && video.videoWidth > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                // Here you would use jsQR or similar library to detect QR codes
                // const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                // const code = jsQR(imageData.data, imageData.width, imageData.height);
                // if (code) {
                //   processQRCode(code.data, 'camera');
                // }
            }
        }
    };
    useEffect(() => {
        let interval;
        if (cameraActive) {
            interval = setInterval(simulateQRDetection, 500);
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [cameraActive]);
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);
    const renderScanResult = (result) => {
        const isParcel = result.type === 'parcel';
        const data = result.data;
        return (_jsx(Card, { className: `${result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [result.success ? (_jsx(CheckCircle, { className: "h-5 w-5 text-green-600" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-600" })), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: result.qrCode }), _jsx("p", { className: "text-sm text-gray-600", children: result.message }), result.success && data && (_jsx("div", { className: "mt-2 text-sm", children: isParcel ? (_jsxs("div", { children: [_jsxs("p", { children: [_jsxs("strong", { children: [t('common.tracking'), ":"] }), " ", data.tracking_number] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('common.status'), ":"] }), " ", data.status] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('common.receiver'), ":"] }), " ", data.receiver_name] })] })) : (_jsxs("div", { children: [_jsxs("p", { children: [_jsxs("strong", { children: [t('warehouse.manifestNumber'), ":"] }), " ", data.manifest_number] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('common.type'), ":"] }), " ", data.manifest_type] }), _jsxs("p", { children: [_jsxs("strong", { children: [t('warehouse.totalParcels'), ":"] }), " ", data.total_parcels] })] })) }))] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { variant: result.success ? 'default' : 'destructive', children: result.type || 'unknown' }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: result.timestamp.toLocaleTimeString() })] })] }) }) }, result.id));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100", children: [_jsx("div", { className: "bg-white shadow-sm border-b", children: _jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "flex items-center justify-between py-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_DASHBOARD, children: _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), t('common.back')] }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: t('warehouse.scanQR') }), _jsx("p", { className: "text-gray-600", children: "Scan QR codes for parcels and manifests" })] })] }) }) }) }), _jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [currentScan && (_jsx("div", { className: "mb-6", children: _jsxs(Alert, { className: currentScan.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50', children: [currentScan.success ? (_jsx(CheckCircle, { className: "h-4 w-4 text-green-600" })) : (_jsx(AlertTriangle, { className: "h-4 w-4 text-red-600" })), _jsx(AlertDescription, { className: "font-medium", children: currentScan.message })] }) })), error && (_jsxs(Alert, { className: "mb-6 border-red-200 bg-red-50", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-red-600" }), _jsx(AlertDescription, { children: error })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Camera, { className: "h-5 w-5 mr-2" }), t('warehouse.scanQR'), " - Camera"] }), _jsx(CardDescription, { children: "Use your device camera to scan QR codes" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [!cameraActive ? (_jsx("div", { className: "aspect-video bg-gray-100 rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx(Camera, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-4", children: "Camera not active" }), _jsxs(Button, { onClick: startCamera, children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Start Camera"] })] }) })) : (_jsxs("div", { className: "relative", children: [_jsx("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "w-full aspect-video bg-black rounded-lg" }), _jsx("canvas", { ref: canvasRef, className: "hidden" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: _jsx("div", { className: "w-48 h-48 border-2 border-white rounded-lg shadow-lg", children: _jsx("div", { className: "w-full h-full border-2 border-dashed border-white/50 rounded-lg animate-pulse" }) }) })] })), cameraActive && (_jsxs("div", { className: "flex justify-center space-x-2", children: [_jsxs(Button, { onClick: toggleFlashlight, variant: "outline", size: "sm", children: [flashlightOn ? (_jsx(FlashlightOff, { className: "h-4 w-4 mr-2" })) : (_jsx(Flashlight, { className: "h-4 w-4 mr-2" })), flashlightOn ? 'Flash Off' : 'Flash On'] }), _jsx(Button, { onClick: stopCamera, variant: "outline", size: "sm", children: "Stop Camera" })] }))] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(QrCode, { className: "h-5 w-5 mr-2" }), t('warehouse.manualEntry')] }), _jsx(CardDescription, { children: "Enter QR code or tracking number manually" })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleManualScan, className: "space-y-4", children: [_jsx("div", { children: _jsx(Input, { value: manualCode, onChange: (e) => setManualCode(e.target.value), placeholder: "Enter QR code or tracking number", className: "text-lg", autoFocus: true }) }), _jsx(Button, { type: "submit", className: "w-full", disabled: scanning || !manualCode.trim(), children: scanning ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" }), t('warehouse.scanning'), "..."] })) : (_jsxs(_Fragment, { children: [_jsx(Scan, { className: "h-4 w-4 mr-2" }), t('warehouse.scan')] })) })] }), _jsxs("div", { className: "mt-6 space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700", children: "Quick Actions:" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_SCAN_IN, children: _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", children: [_jsx(Package, { className: "h-4 w-4 mr-2" }), "Scan In"] }) }), _jsx(Link, { to: ROUTE_PATHS.WAREHOUSE_SCAN_OUT, children: _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", children: [_jsx(Package, { className: "h-4 w-4 mr-2" }), "Scan Out"] }) })] })] })] })] })] }), scanResults.length > 0 && (_jsxs(Card, { className: "mt-8", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(History, { className: "h-5 w-5 mr-2" }), t('common.recent'), " ", t('warehouse.scan'), " ", t('common.results')] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: scanResults.map(renderScanResult) }) })] }))] })] }));
}
