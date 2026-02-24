import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
const POLICY_KEY = "INTL_DELIVERY_STANDARD";
const POLICY_VERSION = "v1.0";
export default function InternationalPolicyCheckbox({ userId, onChange, }) {
    const { t } = useTranslation();
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState(null);
    async function toggle(next) {
        setError(null);
        setAccepted(next);
        onChange(next);
        if (next) {
            const { error } = await supabase.from("policy_acceptance").insert({
                user_id: userId,
                policy_key: POLICY_KEY,
                policy_version: POLICY_VERSION,
                accepted: true,
            });
            if (error)
                setError(error.message);
        }
    }
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-start gap-2 text-sm text-white/80", children: [_jsx("input", { type: "checkbox", checked: accepted, onChange: (e) => toggle(e.target.checked), className: "mt-1" }), _jsx("span", { children: t("policy.accept") })] }), _jsx("p", { className: "text-xs text-white/60", children: t("policy.statement") }), error && _jsx("p", { className: "text-xs text-red-400", children: error })] }));
}
