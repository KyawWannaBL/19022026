import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguageContext } from '@/lib/LanguageContext';

interface PhotoCaptureProps {
  onCapture: (photo: string) => void;
  watermarkData: {
    ttId: string;
    userId: string;
    timestamp: string;
    gps: string;
  };
  required?: boolean;
}

export default function PhotoCapture({ onCapture, watermarkData, required = false }: PhotoCaptureProps) {
  const { t } = useLanguageContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
        setError(null);
      }
    } catch (err) {
      setError(t('Could not access camera. Please ensure permissions are granted.', 'ကင်မရာအား အသုံးပြု၍မရပါ။ Permission ပေးထားခြင်းရှိမရှိ စစ်ဆေးပါ။'));
      console.error('Camera error:', err);
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOpen(false);
    }
  }, []);

  const applyWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const padding = 20;
    const fontSize = Math.max(14, width / 40);
    ctx.font = `${fontSize}px monospace`;
    
    const lines = [
      `TT ID: ${watermarkData.ttId}`,
      `User: ${watermarkData.userId}`,
      `Time: ${watermarkData.timestamp}`,
      `GPS: ${watermarkData.gps}`,
    ];

    const boxWidth = 300;
    const boxHeight = lines.length * (fontSize + 8) + padding;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(width - boxWidth - padding, height - boxHeight - padding, boxWidth, boxHeight);

    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    
    lines.forEach((line, index) => {
      ctx.fillText(line, width - boxWidth - padding + 10, height - boxHeight - padding + padding + index * (fontSize + 8));
    });
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        applyWatermark(context, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <Card className="p-4 border-slate-200 overflow-hidden">
      <div className="space-y-4">
        {/* Error State */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm italic">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Viewport */}
        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-100 shadow-inner">
          {!isCameraOpen && !capturedImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2">
              <Camera size={48} className="opacity-20" />
              <p className="text-xs uppercase font-black tracking-widest">{t('Camera Ready', 'ကင်မရာအသင့်ရှိသည်')}</p>
            </div>
          )}

          {isCameraOpen && (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          )}

          {capturedImage && (
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover animate-in fade-in duration-300" />
          )}

          {/* Canvas for watermark processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!isCameraOpen && !capturedImage ? (
            <Button onClick={startCamera} className="w-full bg-[#0d2c54] hover:bg-[#1a3d6d] font-bold">
              <Camera className="mr-2 h-4 w-4" /> {t('Open Camera', 'ကင်မရာဖွင့်မည်')}
            </Button>
          ) : isCameraOpen ? (
            <div className="flex w-full gap-2">
              <Button onClick={capturePhoto} className="flex-1 bg-[#ff6b00] hover:bg-[#e65a00] font-bold">
                {t('Capture Photo', 'ဓာတ်ပုံရိုက်မည်')}
              </Button>
              <Button variant="ghost" onClick={stopCamera} className="text-slate-500">
                <X size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button onClick={handleConfirm} className="flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold">
                <Check className="mr-2 h-4 w-4" /> {t('Confirm', 'အတည်ပြုမည်')}
              </Button>
              <Button onClick={() => { setCapturedImage(null); startCamera(); }} variant="outline" className="flex-1 border-[#0d2c54] text-[#0d2c54] font-bold">
                <RefreshCw className="mr-2 h-4 w-4" /> {t('Retake', 'ပြန်ရိုက်မည်')}
              </Button>
            </div>
          )}
        </div>

        {required && !capturedImage && (
          <p className="text-[10px] text-orange-600 font-black uppercase text-center italic">
            * {t('Photo Evidence Required', 'ဓာတ်ပုံသက်သေလိုအပ်ပါသည်')}
          </p>
        )}
      </div>
    </Card>
  );
}