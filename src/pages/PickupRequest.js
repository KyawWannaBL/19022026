import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import InternationalPolicyCheckbox from "@/components/InternationalPolicyCheckbox";
import LanguageToggle from "@/components/LanguageToggle";
export default function PickupRequest() {
    const { t } = useTranslation();
    const [userId, setUserId] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [pieces, setPieces] = useState("1");
    const [type, setType] = useState("box");
    const [condition, setCondition] = useState("OK");
    const [codAmount, setCodAmount] = useState("");
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUserId(data.session?.user?.id ?? null);
        });
    }, []);
    async function submit() {
        setError(null);
        setOk(null);
        if (!userId)
            return setError(t("auth.notAuthenticated"));
        if (!accepted)
            return setError(t("policy.required"));
        setLoading(true);
        // Replace this with your real pickup request table/API.
        // This is just a demo payload.
        const payload = {
            user_id: userId,
            pieces: Number(pieces),
            type,
            condition,
            cod_amount: codAmount ? Number(codAmount) : null,
            created_at: new Date().toISOString(),
        };
        // Example: store into a table pickup_requests if you create it.
        // const { error } = await supabase.from("pickup_requests").insert(payload);
        // For now we simulate success:
        const error = null;
        setLoading(false);
        if (error)
            return setError(String(error));
        setOk(t("pickup.success"));
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-6 bg-slate-950 text-white", children: _jsx(Card, { className: "w-full max-w-xl bg-white/5 border-white/10", children: _jsxs(CardContent, { className: "p-6 space-y-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-semibold", children: t("pickup.title") }), _jsx(LanguageToggle, {})] }), _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-sm text-white/70", children: t("pickup.shipmentInfo") }), _jsx(Input, { value: pieces, onChange: (e) => setPieces(e.target.value), placeholder: t("pickup.pieces"), className: "bg-black/40 border-white/15" }), _jsx(Input, { value: type, onChange: (e) => setType(e.target.value), placeholder: t("pickup.type"), className: "bg-black/40 border-white/15" }), _jsx(Input, { value: condition, onChange: (e) => setCondition(e.target.value), placeholder: t("pickup.condition"), className: "bg-black/40 border-white/15" }), _jsx(Input, { value: codAmount, onChange: (e) => setCodAmount(e.target.value), placeholder: t("pickup.codAmount"), className: "bg-black/40 border-white/15" })] }), userId && (_jsx(InternationalPolicyCheckbox, { userId: userId, onChange: setAccepted })), error && _jsx("p", { className: "text-sm text-red-400", children: error }), ok && _jsx("p", { className: "text-sm text-green-400", children: ok }), _jsx(Button, { disabled: loading, onClick: submit, className: "w-full bg-blue-600 hover:bg-blue-700", children: t("pickup.submit") })] }) }) }));
}
