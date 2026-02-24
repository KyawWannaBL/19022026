
import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, Check, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
      setError('Could not access camera. Please ensure permissions are granted.');
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
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;
    
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
      ctx.fillText(
        line,
        width - boxWidth - padding + 10,
        height - boxHeight - padding + padding + index * (fontSize + 8)
      );
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

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="w-full space-y-4">
      {!isCameraOpen && !capturedImage ? (
        <Button
          variant="outline"
          className="w-full h-32 border-dashed flex flex-col gap-2"
          onClick={startCamera}
        >
          <Camera className="w-8 h-8 text-muted-foreground" />
          <span>Take Photo {required && <span className="text-destructive">*</span>}</span>
        </Button>
      ) : null}

      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {isCameraOpen && (
        <Card className="relative overflow-hidden aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button size="icon" className="rounded-full w-12 h-12" onClick={capturePhoto}>
              <Camera className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12" onClick={stopCamera}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </Card>
      )}

      {capturedImage && (
        <div className="space-y-4">
          <Card className="relative overflow-hidden aspect-video bg-muted">
            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2">
              <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded text-[10px] font-mono">
                WATERMARKED
              </div>
            </div>
          </Card>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2" onClick={handleRetake}>
              <RefreshCw className="w-4 h-4" />
              Retake
            </Button>
            <Button className="flex-1 gap-2" onClick={handleConfirm}>
              <Check className="w-4 h-4" />
              Use Photo
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

import React, { useRef, useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoCaptureProps {
  onCapture: (photo: string) => void;
}

export function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const startCamera = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    setStream(s);
    if (videoRef.current) videoRef.current.srcObject = s;
  };

  const capture = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const data = canvas.toDataURL('image/jpeg');
      setPreview(data);
      onCapture(data);
      stream?.getTracks().forEach(t => t.stop());
      setStream(null);
    }
  };

  return (
    <div className="space-y-4">
      {!stream && !preview && (
        <Button onClick={startCamera} className="w-full h-24 border-dashed" variant="outline">
          <Camera className="mr-2" /> Take Photo
        </Button>
      )}
      {stream && (
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video ref={videoRef} autoPlay playsInline className="w-full" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <Button onClick={capture} size="icon" className="rounded-full"><Check /></Button>
            <Button onClick={() => { stream.getTracks().forEach(t => t.stop()); setStream(null); }} variant="destructive" size="icon" className="rounded-full"><X /></Button>
          </div>
        </div>
      )}
      {preview && <img src={preview} className="rounded-lg border w-full" alt="captured" />}
    </div>
  );
}

