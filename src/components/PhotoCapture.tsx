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