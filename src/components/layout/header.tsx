import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguageContext();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-black text-[#0d2c54] uppercase tracking-widest hidden md:block">
          {t('merchant.portal') || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff6b00] rounded-full border-2 border-white"></span>
        </Button>
        
        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-[#0d2c54] leading-none uppercase">
              {user?.fullName || 'User'}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
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