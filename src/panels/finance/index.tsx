import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Wallet, TrendingUp } from 'lucide-react';

export default function FinancePanel() {
  const { t } = useLanguageContext();
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2 text-[#0d2c54]">
        <Wallet className="h-5 w-5" />
        <h2 className="font-bold uppercase tracking-wider">{t('Finance', 'ငွေကြေး')}</h2>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="text-xs text-slate-500 uppercase font-bold">{t('Executive Dashboard', 'အမှုဆောင် ဒက်ရှ်ဘုတ်')}</p>
        <p className="text-2xl font-black text-[#0d2c54]">0.00 MMK</p>
      </div>
    </div>
  );
}