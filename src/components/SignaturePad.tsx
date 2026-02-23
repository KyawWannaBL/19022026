import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { PenTool, RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  required?: boolean;
}

export function SignaturePad({ onSave, required = true }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (hasSignature) onSave(canvasRef.current?.toDataURL() || "");
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSave("");
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label className="flex items-center gap-2"><PenTool size={16}/> Signature {required && '*'}</Label>
        <Button variant="ghost" size="sm" onClick={clear}><RotateCcw size={14} className="mr-1"/>Clear</Button>
      </div>
      <Card className="border-2 border-dashed bg-white overflow-hidden">
        <CardContent className="p-0 h-[200px]">
          <canvas 
            ref={canvasRef} 
            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} 
            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
            className="w-full h-full touch-none cursor-crosshair"
          />
        </CardContent>
      </Card>
    </div>
  );
}