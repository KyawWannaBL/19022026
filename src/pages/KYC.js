import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import LanguageToggle from "@/components/LanguageToggle";
export default function KYC() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const { t } = useTranslation();
    const [nrc, setNrc] = useState("");
    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null);
    const [loading, setLoading] = useState(false);
    async function upload(file, path) {
        const { error } = await supabase.storage.from("kyc").upload(path, file, {
            upsert: true,
            contentType: file.type,
        });
        if (error)
            throw error;
        // If your bucket is private, switch to signed URLs later.
        const { data } = supabase.storage.from("kyc").getPublicUrl(path);
        return data.publicUrl;
    }
    async function submit() {
        setError(null);
        setOk(null);
        if (!nrc || !front)
            return setError(t("kyc.note"));
        setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user.id;
        if (!userId) {
            setLoading(false);
            return setError(t("auth.notAuthenticated"));
        }
        try {
            const frontUrl = await upload(front, `${userId}/nrc-front-${Date.now()}`);
            const backUrl = back ? await upload(back, `${userId}/nrc-back-${Date.now()}`) : null;
            const { error } = await supabase.from("customer_kyc").upsert({
                user_id: userId,
                nrc_number: nrc,
                nrc_front_url: frontUrl,
                nrc_back_url: backUrl,
                kyc_verified: false,
            });
            if (error)
                throw error;
            setOk(t("kyc.submitted"));
            setLoading(false);
        }
        catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-6 bg-slate-950 text-white", children: _jsx(Card, { className: "w-full max-w-lg bg-white/5 border-white/10", children: _jsxs(CardContent, { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-semibold", children: t("kyc.title") }), _jsx(LanguageToggle, {})] }), _jsx("p", { className: "text-sm text-white/70", children: t("kyc.note") }), _jsx(Input, { value: nrc, onChange: (e) => setNrc(e.target.value), placeholder: t("kyc.nrcNumber"), className: "bg-black/40 border-white/15" }), _jsxs("div", { className: "space-y-2 text-sm text-white/70", children: [_jsx("p", { children: t("kyc.nrcFront") }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => setFront(e.target.files?.[0] ?? null) })] }), _jsxs("div", { className: "space-y-2 text-sm text-white/70", children: [_jsx("p", { children: t("kyc.nrcBack") }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => setBack(e.target.files?.[0] ?? null) })] }), error && _jsx("p", { className: "text-sm text-red-400", children: error }), ok && _jsx("p", { className: "text-sm text-green-400", children: ok }), _jsx(Button, { disabled: loading, onClick: submit, className: "w-full bg-blue-600 hover:bg-blue-700", children: t("kyc.submit") })] }) }) }));
}
