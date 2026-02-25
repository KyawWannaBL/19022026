import React from 'react';
import { useShipments } from '@/hooks/useShipments';
import { useLanguageContext } from '@/lib/LanguageContext';
import { getStatusLabel, formatCurrency, getStatusVariant } from '@/lib/index';
import { Badge } from '@/components/ui/badge';

export default function ShipmentsPage() {
  const { shipments, loading, error } = useShipments();
  const { t } = useLanguageContext();

  if (loading) return <div className="p-10 text-center animate-pulse">{t('Loading...', 'ခေတ္တစောင့်ဆိုင်းပါ...')}</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-black text-[#0d2c54] uppercase italic">
        {t('Live Shipments', 'လက်ရှိပို့ဆောင်မှုများ')}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shipments.map((s) => (
          <div key={s.id} className="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-sm hover:border-[#ff6b00] transition-colors">
            <div className="flex justify-between items-start mb-3">
              <span className="font-mono font-bold text-xs text-slate-400">{s.awb || s.id}</span>
              <Badge variant={getStatusVariant(s.status) as any}>
                {getStatusLabel(s.status, t)}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[#0d2c54]">{s.receiverName}</p>
              <p className="text-xs text-slate-500">{s.destinationTownship}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-lg font-black text-[#ff6b00]">{formatCurrency(s.cod?.amount || 0)}</span>
              <button className="text-[10px] font-black uppercase bg-[#0d2c54] text-white px-3 py-1.5 rounded-lg">
                {t('Details', 'အသေးစိတ်')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}