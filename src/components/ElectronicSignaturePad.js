import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eraser, CheckCircle2, Camera, User, Package, Calendar } from 'lucide-react';
import { PhotoCapture } from '@/components/PhotoCapture';
import { formatDate } from '@/lib/index';
import { motion, AnimatePresence } from 'framer-motion';
import { springPresets } from '@/lib/motion';
export function ElectronicSignaturePad({ parcelId, riderId, onSignatureComplete, }) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [showPhotoCapture, setShowPhotoCapture] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentTimestamp = new Date().toISOString();
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        const handleResize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2.5;
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        if (!canvas)
            return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };
    const startDrawing = (e) => {
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            setIsDrawing(true);
        }
    };
    const draw = (e) => {
        if (!isDrawing)
            return;
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineTo(x, y);
            ctx.stroke();
            setHasSignature(true);
        }
    };
    const stopDrawing = () => {
        setIsDrawing(false);
    };
    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setHasSignature(false);
        }
    };
    const handleCapture = (photo) => {
        setCapturedPhoto(photo);
        setShowPhotoCapture(false);
    };
    const handleSave = async () => {
        if (!hasSignature)
            return;
        setIsSubmitting(true);
        const canvas = canvasRef.current;
        const signatureData = canvas?.toDataURL('image/png') || '';
        if (onSignatureComplete) {
            onSignatureComplete({
                signature: signatureData,
                photo: capturedPhoto,
                timestamp: currentTimestamp,
            });
        }
        setIsSubmitting(false);
    };
    return (_jsxs(Card, { className: "luxury-card w-full max-w-2xl overflow-hidden border-border bg-card", children: [_jsx(CardHeader, { className: "border-b border-border/50 bg-secondary/30", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-xl font-heading flex items-center gap-2 text-foreground", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-primary" }), "Proof of Delivery"] }), _jsx(Badge, { variant: "outline", className: "border-primary/30 text-primary uppercase tracking-widest text-[10px]", children: "2026 Fleet Standard" })] }) }), _jsxs(CardContent, { className: "p-6 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5", children: [_jsx(Package, { className: "h-3 w-3" }), " Parcel ID"] }), _jsx("p", { className: "font-mono text-sm font-medium", children: parcelId })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5", children: [_jsx(User, { className: "h-3 w-3" }), " Authorized Rider"] }), _jsx("p", { className: "text-sm font-medium", children: riderId })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsxs(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5", children: [_jsx(Calendar, { className: "h-3 w-3" }), " Completion Time"] }), _jsx("p", { className: "text-sm font-medium", children: formatDate(currentTimestamp) })] })] }), _jsx(Separator, { className: "opacity-10" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Receiver Signature" }), _jsxs("div", { className: "relative", children: [_jsx("canvas", { ref: canvasRef, onMouseDown: startDrawing, onMouseMove: draw, onMouseUp: stopDrawing, onMouseLeave: stopDrawing, onTouchStart: startDrawing, onTouchMove: draw, onTouchEnd: stopDrawing, className: "w-full h-48 bg-luxury-light-obsidian rounded-xl border border-border/40 cursor-crosshair touch-none shadow-inner" }), _jsx("div", { className: "absolute top-3 right-3 flex gap-2", children: _jsx(Button, { variant: "ghost", size: "icon", onClick: clearSignature, className: "h-8 w-8 rounded-full bg-background/50 backdrop-blur hover:bg-destructive/20 hover:text-destructive transition-colors", children: _jsx(Eraser, { className: "h-4 w-4" }) }) }), !hasSignature && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-20", children: _jsx("p", { className: "text-sm font-light italic", children: "Sign here to confirm receipt" }) }))] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Delivery Evidence Photo" }), _jsx(AnimatePresence, { mode: "wait", children: showPhotoCapture ? (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: springPresets.gentle, className: "rounded-xl overflow-hidden", children: [_jsx(PhotoCapture, { onCapture: handleCapture }), _jsx(Button, { variant: "link", className: "w-full text-xs text-muted-foreground", onClick: () => setShowPhotoCapture(false), children: "Cancel Photo" })] })) : (_jsx("div", { className: "flex flex-col items-center justify-center p-8 border-2 border-dashed border-border/30 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors group", children: capturedPhoto ? (_jsxs("div", { className: "relative w-full aspect-video rounded-lg overflow-hidden", children: [_jsx("img", { src: capturedPhoto, alt: "POD evidence", className: "w-full h-full object-cover" }), _jsx(Button, { variant: "secondary", size: "sm", onClick: () => setShowPhotoCapture(true), className: "absolute bottom-2 right-2 luxury-glass", children: "Retake Photo" })] })) : (_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "p-4 rounded-full bg-primary/10 mx-auto w-fit group-hover:scale-110 transition-transform", children: _jsx(Camera, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-medium", children: "Attach Visual Evidence" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Take a photo of the delivered parcel at the location" })] }), _jsx(Button, { onClick: () => setShowPhotoCapture(true), variant: "outline", className: "border-primary/20 hover:border-primary/50", children: "Capture Photo" })] })) })) })] })] }), _jsxs(CardFooter, { className: "p-6 border-t border-border/50 bg-secondary/30 flex gap-3", children: [_jsx(Button, { variant: "outline", className: "flex-1 border-border/50", onClick: clearSignature, disabled: isSubmitting, children: "Reset" }), _jsx(Button, { className: "flex-1 luxury-button !py-0 h-11", onClick: handleSave, disabled: !hasSignature || isSubmitting, children: isSubmitting ? 'Processing...' : 'Complete Delivery' })] })] }));
}
