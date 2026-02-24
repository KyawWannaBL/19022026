import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
export default function ForgotPassword() {
    const { requestPasswordReset } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSent(false);
        try {
            await requestPasswordReset(email, `${window.location.origin}/reset-password`);
            setSent(true);
        }
        catch (err) {
            setError(err?.message ?? "Request failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-6", children: _jsxs("div", { className: "w-full max-w-md p-8 rounded-2xl border border-border bg-card shadow-xl", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-6", children: "Forgot Password" }), error && (_jsx("div", { className: "mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center", children: error })), sent && (_jsx("div", { className: "mb-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm text-center", children: "Reset link sent. Please check your email." })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "email", placeholder: "Email", className: "w-full p-3 rounded-xl bg-background text-foreground border border-border outline-none", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsx(Button, { type: "submit", disabled: loading, className: "w-full h-12", children: loading ? "Sending..." : "Send reset link" })] }), _jsx("div", { className: "mt-6 text-sm text-center text-muted-foreground", children: _jsx(Link, { to: "/login", className: "text-primary underline", children: "Back to login" }) })] }) }));
}
