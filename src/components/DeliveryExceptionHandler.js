import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Camera, MapPin, Clock, FileText, RotateCcw } from 'lucide-react';
const EXCEPTION_CONFIGS = {
    customer_not_available: {
        label: 'Customer Not Available',
        description: 'Customer not present at delivery address',
        requiresPhoto: false,
        maxAttempts: 3,
        nextAction: 'retry'
    },
    address_incorrect: {
        label: 'Incorrect Address',
        description: 'Address details are wrong or incomplete',
        requiresPhoto: true,
        maxAttempts: 2,
        nextAction: 'hold'
    },
    refused_delivery: {
        label: 'Delivery Refused',
        description: 'Customer refused to accept the package',
        requiresPhoto: false,
        maxAttempts: 1,
        nextAction: 'rto'
    },
    damaged_package: {
        label: 'Package Damaged',
        description: 'Package is visibly damaged',
        requiresPhoto: true,
        maxAttempts: 1,
        nextAction: 'escalate'
    },
    security_issue: {
        label: 'Security Concern',
        description: 'Safety or security issue at delivery location',
        requiresPhoto: true,
        maxAttempts: 1,
        nextAction: 'escalate'
    },
    weather_delay: {
        label: 'Weather Delay',
        description: 'Delivery delayed due to weather conditions',
        requiresPhoto: false,
        maxAttempts: 3,
        nextAction: 'retry'
    },
    vehicle_breakdown: {
        label: 'Vehicle Breakdown',
        description: 'Delivery vehicle breakdown or technical issue',
        requiresPhoto: false,
        maxAttempts: 1,
        nextAction: 'escalate'
    },
    other: {
        label: 'Other',
        description: 'Other delivery exception not listed above',
        requiresPhoto: true,
        maxAttempts: 2,
        nextAction: 'hold'
    }
};
export function DeliveryExceptionHandler({ awb, receiverName, deliveryAddress, attemptNumber, onSubmit, onCancel }) {
    const [exceptionType, setExceptionType] = useState('');
    const [reason, setReason] = useState('');
    const [evidencePhoto, setEvidencePhoto] = useState(null);
    const [notes, setNotes] = useState('');
    const [gpsCoordinates, setGpsCoordinates] = useState(null);
    const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
        // Get GPS coordinates
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGpsCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                console.warn('GPS not available:', error);
            });
        }
    }, []);
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCapturingPhoto(true);
            }
        }
        catch (error) {
            console.error('Camera access failed:', error);
            alert('Camera access failed. Please check permissions.');
        }
    };
    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCapturingPhoto(false);
    };
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0);
                const photoData = canvas.toDataURL('image/jpeg', 0.8);
                setEvidencePhoto(photoData);
                stopCamera();
            }
        }
    };
    const handleSubmit = () => {
        if (!exceptionType || !reason.trim()) {
            alert('Please fill in all required fields');
            return;
        }
        const selectedConfig = EXCEPTION_CONFIGS[exceptionType];
        if (selectedConfig.requiresPhoto && !evidencePhoto) {
            alert('Photo evidence is required for this exception type');
            return;
        }
        const exception = {
            awb,
            exceptionType: exceptionType,
            reason,
            evidencePhoto: evidencePhoto || undefined,
            notes: notes || undefined,
            gpsCoordinates: gpsCoordinates || undefined,
            attemptNumber,
            nextAction: selectedConfig.nextAction
        };
        onSubmit(exception);
    };
    const getNextActionDescription = (action) => {
        switch (action) {
            case 'retry': return 'Schedule retry delivery';
            case 'rto': return 'Return to origin';
            case 'hold': return 'Hold for customer contact';
            case 'escalate': return 'Escalate to supervisor';
            default: return 'Review required';
        }
    };
    const selectedConfig = exceptionType ? EXCEPTION_CONFIGS[exceptionType] : null;
    return (_jsxs("div", { className: "max-w-md mx-auto space-y-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2 text-red-600", children: [_jsx(AlertTriangle, { className: "h-5 w-5" }), "Delivery Exception"] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["AWB: ", _jsx("span", { className: "font-mono font-medium", children: awb })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Receiver: ", receiverName] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Address: ", deliveryAddress] }), _jsxs(Badge, { variant: "outline", className: "text-orange-600", children: ["Attempt #", attemptNumber] })] })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Exception Type *" }), _jsxs(Select, { value: exceptionType, onValueChange: (value) => setExceptionType(value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select exception type" }) }), _jsx(SelectContent, { children: Object.entries(EXCEPTION_CONFIGS).map(([key, config]) => (_jsx(SelectItem, { value: key, children: config.label }, key))) })] }), selectedConfig && (_jsx("p", { className: "text-xs text-muted-foreground", children: selectedConfig.description }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "reason", children: "Reason *" }), _jsx(Textarea, { id: "reason", value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Provide specific details about the exception...", rows: 3 })] }), selectedConfig?.requiresPhoto && (_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Photo Evidence * ", _jsx(Badge, { variant: "outline", className: "ml-2", children: "Required" })] }), !evidencePhoto ? (_jsx("div", { className: "space-y-2", children: !isCapturingPhoto ? (_jsxs(Button, { onClick: startCamera, className: "w-full", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Take Evidence Photo"] })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("video", { ref: videoRef, className: "w-full aspect-video bg-black rounded-lg", playsInline: true, muted: true }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: capturePhoto, className: "flex-1", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Capture"] }), _jsx(Button, { variant: "outline", onClick: stopCamera, children: "Cancel" })] })] })) })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("img", { src: evidencePhoto, alt: "Exception evidence", className: "w-full aspect-video object-cover rounded-lg border" }), _jsxs(Button, { variant: "outline", onClick: () => {
                                                    setEvidencePhoto(null);
                                                    startCamera();
                                                }, className: "w-full", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Retake Photo"] })] }))] })), selectedConfig && !selectedConfig.requiresPhoto && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Photo Evidence (Optional)" }), !evidencePhoto ? (_jsxs(Button, { variant: "outline", onClick: startCamera, className: "w-full", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Add Photo Evidence"] })) : (_jsxs("div", { className: "space-y-2", children: [_jsx("img", { src: evidencePhoto, alt: "Exception evidence", className: "w-full aspect-video object-cover rounded-lg border" }), _jsxs(Button, { variant: "outline", onClick: () => setEvidencePhoto(null), className: "w-full", children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-2" }), "Remove Photo"] })] }))] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "notes", children: "Additional Notes" }), _jsx(Textarea, { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Any additional information that might be helpful...", rows: 2 })] }), selectedConfig && (_jsxs(Alert, { children: [_jsx(FileText, { className: "h-4 w-4" }), _jsxs(AlertDescription, { children: [_jsx("strong", { children: "Next Action:" }), " ", getNextActionDescription(selectedConfig.nextAction), attemptNumber >= selectedConfig.maxAttempts && (_jsx("div", { className: "mt-2 text-red-600 font-medium", children: "\u26A0\uFE0F Maximum attempts reached. This will trigger RTO process." }))] })] })), _jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground border-t pt-4", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "h-3 w-3" }), gpsCoordinates ? (_jsxs("span", { children: ["GPS: ", gpsCoordinates.latitude.toFixed(6), ", ", gpsCoordinates.longitude.toFixed(6)] })) : (_jsx("span", { className: "text-red-500", children: "GPS: Not available" }))] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: new Date().toLocaleString() })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: handleSubmit, className: "flex-1", disabled: !exceptionType || !reason.trim() || (selectedConfig?.requiresPhoto && !evidencePhoto), children: "Submit Exception" }), _jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" })] })] })] }), _jsx("canvas", { ref: canvasRef, style: { display: 'none' } })] }));
}
