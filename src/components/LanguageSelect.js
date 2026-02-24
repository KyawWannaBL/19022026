import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useI18n } from "@/i18n/I18nProvider";
export default function LanguageSelect({ className = "" }) {
    const { lang, setLang } = useI18n();
    return (_jsx("div", { className: className, "data-no-translate": true, children: _jsxs("select", { className: "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 outline-none hover:bg-white/10", value: lang, onChange: (e) => setLang(e.target.value), "aria-label": "Language", title: "Language", children: [_jsx("option", { value: "my", children: "\u1019\u103C\u1014\u103A\u1019\u102C" }), _jsx("option", { value: "en", children: "English" })] }) }));
}
