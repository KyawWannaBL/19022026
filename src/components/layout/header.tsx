import { useLanguageContext } from '@/lib/LanguageContext';

export const Header = () => {
  const { language, setLanguage, t } = useLanguageContext();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="logo font-bold text-[#0d2c54]">BRITIUM</div>
      
      <nav className="flex items-center gap-4">
        {/* The Toggle Button */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
          className="px-3 py-1 rounded-md border border-slate-300 text-[10px] font-bold uppercase transition-colors hover:bg-slate-50"
        >
          {language === 'en' ? 'မြန်မာ' : 'English'}
        </button>
        
        <span className="text-sm font-medium">
          {t('Staff Login', 'ဝန်ထမ်းဝင်ရန်')}
        </span>
      </nav>
    </header>
  );
};