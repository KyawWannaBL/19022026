import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(undefined);

const translations = {
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

export const LanguageProvider = ({ children }) => {
  // Persistence: Load language from localStorage so it doesn't reset on refresh
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('app_lang') || 'my';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  /**
   * Dual-Mode Translation Function
   * 1. If called with 1 arg: t("nav.login") -> looks up in dictionary
   * 2. If called with 2 args: t("Save", "သိမ်းရန်") -> uses English/Myanmar logic
   */
  const t = (keyOrEn, fallbackMy) => {
    // Mode 2: Inline Translation
    if (fallbackMy !== undefined) {
      return language === 'en' ? keyOrEn : fallbackMy;
    }

    // Mode 1: Dictionary Lookup
    const keys = keyOrEn.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || keyOrEn;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
};