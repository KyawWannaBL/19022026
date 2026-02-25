  t: (keyOrEn: string, fallbackMy?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.login": "Login",
    "public.track": "Track & Trace",
    "merchant.portal": "Merchant Portal",
    "common.save": "Save",
    "common.cancel": "Cancel"
  },
  my: {
    "nav.login": "အကောင့်ဝင်ရန်",
    "public.track": "လမ်းကြောင်းရှာရန်",
    "merchant.portal": "ကုန်သည်ဝင်ပေါက်",
    "common.save": "သိမ်းဆည်းမည်",
    "common.cancel": "ပယ်ဖျက်မည်"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('app_lang') as Language) || 'my';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const t = (keyOrEn: string, fallbackMy?: string): string => {
    // Mode 1: Inline Bilingual Pair -> t("Hello", "မင်္ဂလာပါ")
    if (fallbackMy !== undefined) {
      return language === 'en' ? keyOrEn : fallbackMy;
    }

    // Mode 2: Dictionary Lookup -> t("nav.login")
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

// Alias for older components
export const useLanguage = useLanguageContext;