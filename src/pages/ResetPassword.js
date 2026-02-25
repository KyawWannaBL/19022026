import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
export default function ResetPassword() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    const nav = useNavigate();
    const { resetPassword } = useAuth();
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null);
    const [loading, setLoading] = useState(false);
    async function submit() {
        setError(null);
        setOk(null);
        if (pw.length < 8)
            return setError("Password must be at least 8 characters.");
        if (pw !== pw2)
            return setError("Passwords do not match.");
        setLoading(true);
        try {
            await resetPassword(pw);
            setOk("Password updated. You can now login.");
            nav("/login");
        }
        catch (e) {
            setError(e?.message ?? "Failed to update password");
        }
        finally {
            setLoading(false);
        }
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-6 bg-background text-foreground", children: _jsx(Card, { className: "w-full max-w-md border-border", children: _jsxs(CardContent, { className: "p-6 space-y-4", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Reset Password" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enter a new password for your account." }), _jsx(Input, { type: "password", value: pw, onChange: (e) => setPw(e.target.value), placeholder: "New password" }), _jsx(Input, { type: "password", value: pw2, onChange: (e) => setPw2(e.target.value), placeholder: "Confirm new password" }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), ok && _jsx("p", { className: "text-sm text-emerald-600", children: ok }), _jsx(Button, { disabled: loading, onClick: submit, className: "w-full", children: loading ? "Updating..." : "Update password" })] }) }) }));
}
