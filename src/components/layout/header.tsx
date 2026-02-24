import React from 'react';
import { Bell, LogOut, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguageContext();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-black text-[#0d2c54] uppercase tracking-widest">
          {t('merchant.portal', 'လုပ်ငန်းသုံး ပေါ်တယ်လ်')}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Myanmar/English Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
          className="text-[10px] font-bold border border-slate-200"
        >
          <Globe size={14} className="mr-2 text-[#ff6b00]" />
          {language === 'en' ? 'မြန်မာ' : 'ENGLISH'}
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              {user?.role || 'Staff'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="hover:text-red-600">
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};