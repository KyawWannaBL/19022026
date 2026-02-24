import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'my';

// Define the shape of your translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.login": "Login",
    "public.track": "Track & Trace",
    "public.services": "Services",
    "public.getQuote": "Get Quote",
    "public.about": "About Us",
    "public.news": "News",
    "public.contact": "Contact",
    "public.login": "Staff Login",
    "interface.pending": "Pending",
    "interface.inTransit": "In Transit",
    "interface.delivered": "Delivered",
    "interface.failed": "Failed",
    "merchant.portal": "Merchant Portal",
    "merchant.trackShipments": "Track and manage your customer shipments.",
    "merchant.newOrder": "New Order",
    "merchant.codBalance": "COD Balance",
    "merchant.recentShipments": "Recent Shipments",
    "form.search": "Search tracking ID or recipient...",
  },
  my: {
    "nav.login": "အကောင့်ဝင်ရန်",
    "public.track": "လမ်းကြောင်းရှာရန်",
    "public.services": "ဝန်ဆောင်မှုများ",
    "public.getQuote": "စျေးနှုန်းတွက်ချက်ရန်",
    "public.about": "ကျွန်ုပ်တို့အကြောင်း",
    "public.news": "သတင်းများ",
    "public.contact": "ဆက်သွယ်ရန်",
    "public.login": "ဝန်ထမ်းဝင်ရန်",
    "interface.pending": "စောင့်ဆိုင်းဆဲ",
    "interface.inTransit": "ပို့ဆောင်ဆဲ",
    "interface.delivered": "ရောက်ရှိပြီး",
    "interface.failed": "မအောင်မြင်ပါ",
    "merchant.portal": "ကုန်သည်ဝင်ပေါက်",
    "merchant.trackShipments": "ပို့ဆောင်မှုများကို စစ်ဆေးစီမံပါ။",
    "merchant.newOrder": "အော်ဒါအသစ်တင်ရန်",
    "merchant.codBalance": "COD လက်ကျန်ငွေ",
    "merchant.recentShipments": "လတ်တလောပို့ဆောင်မှုများ",
    "form.search": "ရှာဖွေရန်...",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  // This supports both key-based lookups AND inline translations used in your forms
  t: (keyOrEn: string, fallbackMy?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('my'); // Default to Myanmar

  const t = (keyOrEn: string, fallbackMy?: string): string => {
    // 1. If two arguments are provided, use the inline translation logic
    if (fallbackMy) {
      return language === 'en' ? keyOrEn : fallbackMy;
    }

    // 2. If one argument is provided, look it up in the dictionary
    return translations[language][keyOrEn] || keyOrEn;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContextContext = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguageContextContext must be used within LanguageProvider');
  return context;
};