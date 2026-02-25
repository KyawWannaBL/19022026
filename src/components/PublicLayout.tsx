import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLanguageContext();

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6 border-b flex justify-between items-center">
        <div className="font-black text-2xl text-[#0d2c54] italic uppercase">Britium</div>
        <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-slate-600">
          <span>{t('Home', 'ပင်မစာမျက်နှာ')}</span>
          <span>{t('Track', 'ခြေရာခံမည်')}</span>
        </div>
      </nav>
      {children}
    </div>
  );
};
