import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PenTool, RotateCcw, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
export default function SignaturePad({ onSignature, required = true }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSignature, setHasSignature] = useState(false);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    // Initialize canvas size based on container
    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (canvas && container) {
                const rect = container.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = 200; // Fixed height for consistency
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 3;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                }
            }
        };
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
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
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx)
            return;
        const { x, y } = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };
    const draw = (e) => {
        if (!isDrawing)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx)
            return;
        if (e.cancelable)
            e.preventDefault();
        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        setHasSignature(true);
    };
    const stopDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            saveSignature();
        }
    };
    const clearSignature = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setHasSignature(false);
            onSignature('');
        }
    };
    const saveSignature = () => {
        const canvas = canvasRef.current;
        if (canvas && hasSignature) {
            const dataUrl = canvas.toDataURL('image/png');
            onSignature(dataUrl);
        }
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Label, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(PenTool, { className: "w-4 h-4 text-primary" }), "Recipient Signature ", required && _jsx("span", { className: "text-destructive", children: "*" })] }), hasSignature && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: clearSignature, className: "h-8 text-xs text-muted-foreground hover:text-destructive", children: [_jsx(RotateCcw, { className: "w-3 h-3 mr-1" }), "Clear"] }))] }), _jsx(Card, { className: cn("overflow-hidden border-2 transition-all duration-200", hasSignature ? "border-primary/20" : "border-dashed border-muted-foreground/30", isDrawing && "ring-2 ring-primary/20 border-primary"), children: _jsxs(CardContent, { className: "p-0 relative", children: [_jsx("div", { ref: containerRef, className: "w-full bg-white touch-none cursor-crosshair", style: { height: '200px' }, children: _jsx("canvas", { ref: canvasRef, onMouseDown: startDrawing, onMouseMove: draw, onMouseUp: stopDrawing, onMouseLeave: stopDrawing, onTouchStart: startDrawing, onTouchMove: draw, onTouchEnd: stopDrawing, className: "block w-full h-full" }) }), !hasSignature && !isDrawing && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-40", children: _jsxs("div", { className: "text-center", children: [_jsx(PenTool, { className: "w-8 h-8 mx-auto mb-2" }), _jsx("p", { className: "text-sm", children: "Sign here" })] }) })), hasSignature && !isDrawing && (_jsx("div", { className: "absolute bottom-2 right-2", children: _jsx("div", { className: "bg-primary/10 text-primary rounded-full p-1", children: _jsx(Check, { className: "w-4 h-4" }) }) }))] }) }), _jsx("p", { className: "text-[10px] text-muted-foreground italic", children: "By signing, the receiverName confirms the physical condition of the parcel matches the recorded status." })] }));
}
