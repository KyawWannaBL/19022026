import React, { useState } from 'react';
import { Scan, Camera, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function QRScanner() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [cameraActive, setCameraActive] = useState(false);

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50 border-b py-3">
        <CardTitle className="text-sm font-black flex items-center gap-2 text-[#0d2c54] uppercase italic">
          <Scan className="text-[#ff6b00] h-4 w-4" /> 
          {t('Camera Scanner', 'ကင်မရာစကင်နာ')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!cameraActive ? (
          <div className="aspect-video bg-slate-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200 group hover:border-[#ff6b00]/50 transition-colors">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <Camera className="h-8 w-8 text-slate-400 group-hover:text-[#ff6b00]" />
            </div>
            <Button 
              onClick={() => setCameraActive(true)} 
              className="bg-[#0d2c54] hover:bg-[#1a3d6d] font-bold px-8 shadow-lg"
            >
               {t('Start Camera', 'ကင်မရာဖွင့်မည်')}
            </Button>
            <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
              {t('Ready for Scan', 'စကန်ဖတ်ရန်အသင့်')}
            </p>
          </div>
        ) : (
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-[#0d2c54]/5">
            {/* Scanner Overlay Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-[#ff6b00] rounded-2xl animate-pulse relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#ff6b00] -translate-x-1 -translate-y-1" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#ff6b00] translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#ff6b00] -translate-x-1 translate-y-1" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#ff6b00] translate-x-1 translate-y-1" />
              </div>
            </div>
            
            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent animate-scan-move opacity-50" />

            <Button 
              onClick={() => setCameraActive(false)} 
              variant="destructive" 
              className="absolute bottom-4 right-4 font-black uppercase text-[10px] tracking-widest"
            >
              <Square className="h-3 w-3 mr-2 fill-current" />
              {t('Stop', 'ရပ်မည်')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}