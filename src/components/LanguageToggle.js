import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
export default function LanguageToggle() {
    const { i18n, t } = useTranslation();
    return (_jsxs("div", { className: "flex items-center gap-2 text-sm text-white/70", children: [_jsxs("span", { className: "text-white/40", children: [t("common.language"), ":"] }), _jsx("button", { onClick: () => i18n.changeLanguage("en"), className: `hover:underline ${i18n.language === "en" ? "text-white" : ""}`, children: t("common.english") }), _jsx("span", { className: "text-white/20", children: "|" }), _jsx("button", { onClick: () => i18n.changeLanguage("mm"), className: `hover:underline ${i18n.language === "mm" ? "text-white" : ""}`, children: t("common.myanmar") })] }));
}
