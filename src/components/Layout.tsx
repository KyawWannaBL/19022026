import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';
import { Link, useNavigate } from 'react-router-dom';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguageContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-[#0d2c54] text-white p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to={ROUTE_PATHS.DASHBOARD} className="font-black italic text-xl uppercase tracking-tighter">
            Britium <span className="text-[#ff6b00]">Logistics</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold opacity-70 uppercase tracking-widest">{user?.name}</span>
          <button onClick={handleLogout} className="text-[10px] font-black uppercase bg-red-600 px-3 py-1 rounded">
            {t('Logout', 'ထွက်မည်')}
          </button>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};