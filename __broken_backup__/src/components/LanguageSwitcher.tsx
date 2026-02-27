import React from "react";
 * Synchronized with the Footer and Dashboard Headers.
 * Resolves remaining syntax errors and "Multiple Export" conflicts.
 */
export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage } = useLanguageContext();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'my' : 'en';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 border-[#0d2c54]/20 hover:bg-slate-50 transition-all duration-300 rounded-xl px-4 h-10 shadow-sm",
        className
      )}
    >
      <Globe className="w-4 h-4 text-[#ff6b00]" />
      <span className="text-[11px] font-black uppercase tracking-widest text-[#0d2c54]">
        {language === 'en' ? 'မြန်မာ' : 'ENGLISH'}
      </span>
    </Button>
  );
};
