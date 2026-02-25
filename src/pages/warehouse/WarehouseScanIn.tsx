import React, { useState } from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, QrCode } from 'lucide-react';

export default function WarehouseScanIn() {
  const { t } = useLanguageContext();
  const [scannedId, setScannedId] = useState('');

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="bg-[#0d2c54] p-8 rounded-[2rem] text-white shadow-xl">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <QrCode className="h-8 w-8 text-[#ff6b00]" />
          {t('Receiving Bay', 'လက်ခံစခန်း')}
        </h1>
        <p className="text-slate-300 text-sm mt-2">{t('Dispatch Management', 'ထုတ်လွှတ် စီမံခန့်ခွဲမှု')}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <Input 
          value={scannedId}
          onChange={(e) => setScannedId(e.target.value)}
          placeholder={t('trackPlaceholder', 'Tracking ID / AWB ရိုက်ထည့်ပါ')} 
          className="h-12 rounded-xl"
        />
        <Button className="h-12 bg-[#0d2c54] px-8">{t('Submit', 'တင်သွင်းရန်')}</Button>
      </div>
    </div>
  );
}