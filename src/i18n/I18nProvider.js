import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from "react";
const Ctx = createContext(null);
const STORAGE_KEY = "beda.lang";
export function I18nProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        const v = localStorage.getItem(STORAGE_KEY);
        return (v === "my" || v === "en") ? v : "my";
    });
    const setLang = (l) => {
        setLangState(l);
        localStorage.setItem(STORAGE_KEY, l);
    };
    const toggleLang = () => setLang(lang === "en" ? "my" : "en");
    const value = useMemo(() => ({ lang, setLang, toggleLang }), [lang]);
    return _jsx(Ctx.Provider, { value: value, children: children });
}
export function useI18n() {
    const ctx = useContext(Ctx);
    if (!ctx)
        throw new Error("useI18n must be used within I18nProvider");
    return ctx;
}
