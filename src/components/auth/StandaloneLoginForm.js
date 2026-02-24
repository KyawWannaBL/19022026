import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { postLoginPath } from "@/config/postLogin";
/**
 * Standalone login form used by src/pages/LoginPage.tsx.
 * Fixes runtime error: "TypeError: S is not a function" caused by missing/undefined onSubmit handler.
 */
export default function StandaloneLoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await login(email.trim(), password);
            navigate(res.mustChangePassword ? "/force-password-reset" : postLoginPath(res.role), {
                replace: true,
            });
        }
        catch (err) {
            setError(err?.message ?? "Login failed. Please check your email and password.");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: onSubmit, className: "space-y-4", children: [error ? (_jsxs("div", { className: "flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-destructive mt-0.5" }), _jsx("div", { className: "text-destructive", children: error })] })) : null, _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Email" }), _jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@britium.com", autoComplete: "email" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Password" }), _jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", autoComplete: "current-password" })] }), _jsxs(Button, { type: "submit", className: "w-full h-12", disabled: isLoading, children: [isLoading ? _jsx(Loader2, { className: "mr-2 h-5 w-5 animate-spin" }) : _jsx(ShieldCheck, { className: "mr-2 h-5 w-5" }), "Login to Dashboard"] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [_jsx(Link, { className: "hover:underline text-primary", to: "/forgot-password", children: "Forgot password?" }), _jsx(Link, { className: "hover:underline", to: "/register", children: "Create account" })] })] }));
}
