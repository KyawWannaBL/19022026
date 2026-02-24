import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
export default function ChangePassword() {
    const { changePassword } = useAuth();
    const nav = useNavigate();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [ok, setOk] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setOk(null);
        if (password !== confirm)
            return setError("Passwords do not match");
        if (password.length < 8)
            return setError("Minimum 8 characters required");
        try {
            setLoading(true);
            await changePassword(password);
            setOk("Password updated.");
            nav("/panel");
        }
        catch (err) {
            setError(err?.message ?? String(err));
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-6", children: _jsx(Card, { className: "w-full max-w-md border-border", children: _jsxs(CardContent, { className: "p-6 space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-center", children: "Change Password" }), error && _jsx("div", { className: "text-sm text-destructive", children: error }), ok && _jsx("div", { className: "text-sm text-emerald-600", children: ok }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsx(Input, { type: "password", placeholder: "New Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx(Input, { type: "password", placeholder: "Confirm Password", value: confirm, onChange: (e) => setConfirm(e.target.value), required: true }), _jsx(Button, { disabled: loading, className: "w-full", type: "submit", children: loading ? "Updating..." : "Update Password" })] })] }) }) }));
}
