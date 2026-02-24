import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Globe } from 'lucide-react';
import { ROUTE_PATHS } from '@/lib/index';
import { useLanguageContextContext } from '@/lib/LanguageContext';

export const Footer = () => {
  const { t } = useLanguageContextContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-white italic tracking-tighter">BRITIUM</span>
            <span className="text-[10px] text-[#ff6b00] font-bold tracking-[0.3em] uppercase">Express</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            {t(
              'footer.description', 
              'မြန်မာနိုင်ငံတစ်ဝှမ်း အမြန်ဆန်ဆုံးနှင့် ယုံကြည်စိတ်ချရဆုံးသော ကုန်စည်ပို့ဆောင်ရေးဝန်ဆောင်မှု။'
            )}
          </p>
          <div className="flex gap-4 pt-2">
            <Facebook size={18} className="hover:text-[#ff6b00] cursor-pointer transition-colors" />
            <Globe size={18} className="hover:text-[#ff6b00] cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">
            {t('footer.quickLinks', 'လျင်မြန်သောလင့်ခ်များ')}
          </h4>
          <nav className="flex flex-col gap-2 text-sm font-medium">
            <Link to={ROUTE_PATHS.SERVICES} className="hover:text-[#ff6b00] transition-colors">
              {t('public.services', 'ဝန်ဆောင်မှုများ')}
            </Link>
            <Link to={ROUTE_PATHS.PUBLIC_TRACKING} className="hover:text-[#ff6b00] transition-colors">
              {t('public.track', 'ပို့ဆောင်မှုစစ်ဆေးရန်')}
            </Link>
            <Link to={ROUTE_PATHS.ABOUT} className="hover:text-[#ff6b00] transition-colors">
              {t('public.about', 'ကျွန်ုပ်တို့အကြောင်း')}
            </Link>
            <Link to={ROUTE_PATHS.CONTACT} className="hover:text-[#ff6b00] transition-colors">
              {t('public.contact', 'ဆက်သွယ်ရန်')}
            </Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">
            {t('footer.contactUs', 'ဆက်သွယ်ရန်')}
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-[#ff6b00] mt-0.5 shrink-0" />
              <span>{t('footer.address', 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ')}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#ff6b00] shrink-0" />
              <span>+95 9 897 4477 44</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#ff6b00] shrink-0" />
              <span>info@britiumexpress.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
        <p>© {currentYear} BRITIUM EXPRESS. {t('footer.rights', 'မူပိုင်ခွင့်အားလုံးရရှိပြီး။')}</p>
        <div className="flex gap-6">
          <span className="hover:text-slate-300 cursor-pointer">{t('footer.privacy', 'လုံခြုံရေးမူဝါဒ')}</span>
          <span className="hover:text-slate-300 cursor-pointer">{t('footer.terms', 'စည်းကမ်းသတ်မှတ်ချက်များ')}</span>
        </div>
      </div>
    </footer>
  );
};