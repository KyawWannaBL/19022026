import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { observeAutoTranslate } from "@/i18n/autoTranslate";
export default function AutoTranslateShell({ children }) {
    const { lang } = useI18n();
    const ref = useRef(null);
    useEffect(() => {
        const root = ref.current;
        if (!root)
            return;
        return observeAutoTranslate({ root, lang });
    }, [lang]);
    return _jsx("div", { ref: ref, children: children });
}
