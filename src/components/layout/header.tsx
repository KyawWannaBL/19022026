
import { Package, Phone, Mail } from 'lucide-react';
import NotificationBell from '@/components/NotificationBell';

export default function Header() {
  return (
    <header className="bg-navy-900/90 backdrop-blur border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Package className="w-6 h-6 text-navy-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Britium Express</h1>
            <p className="text-sm text-gold-400">Premium Logistics Solutions</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-gray-300 text-sm">
          <span className="flex items-center gap-2">
            <Phone size={14} /> +95-9-897447744
          </span>
          <span className="flex items-center gap-2">
            <Mail size={14} /> info@britiumexpress.com
          </span>
          <NotificationBell />

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

}

};

