import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Truck, Lock } from 'lucide-react';
import { useTranslation } from "@/lib/translations";
import { useLanguageContext } from "@/lib/LanguageContext";

export default function PublicLayout() {
  const { language } = useLanguageContext();
  const { t } = useTranslation(language);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex justify-between px-6 py-4 items-center">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold">
            <Truck className="h-6 w-6" />
            <span>Britium Express</span>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/services" className="text-sm hover:text-blue-600">{t('nav.services')}</Link>
            <Link to="/tracking" className="text-sm hover:text-blue-600">{t('nav.tracking')}</Link>
            <Link to="/login" className="bg-slate-900 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm">
              <Lock size={16} /> {t('nav.login')}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}