import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'my';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyOrEn: string, fallbackMy?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: { "nav.login": "Login", "public.track": "Track" },
  my: { "nav.login": "အကောင့်ဝင်ရန်", "public.track": "လမ်းကြောင်းရှာ" }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('my');
  const setLanguage = (lang: Language) => { setLanguageState(lang); };

  const t = (keyOrEn: string, fallbackMy?: string): string => {
    if (fallbackMy) return language === 'en' ? keyOrEn : fallbackMy;
    return translations[language][keyOrEn] || keyOrEn;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguageContext must be used within LanguageProvider');
  return context;
};

// ALIAS for older components to stop the TS2305 errors immediately
export const useLanguage = useLanguageContext;