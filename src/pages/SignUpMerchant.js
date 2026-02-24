import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { strongPassword } from "@/lib/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
export default function SignUpMerchant() {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [pw2, setPw2] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    async function submit() {
        setError(null);
        if (pw !== pw2)
            return setError("Passwords do not match.");
        if (!strongPassword.test(pw))
            return setError("Password is too weak.");
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pw,
            options: {
                data: { full_name: name, phone, role: "MERCHANT" },
            },
        });
        if (error) {
            setLoading(false);
            return setError(error.message);
        }
        const userId = data.user?.id;
        if (userId) {
            try {
                await supabase.from("profiles").upsert({
                    id: userId,
                    email,
                    full_name: name || null,
                    role: "MERCHANT",
                    must_change_password: false,
                });
            }
            catch { }
        }
        setLoading(false);
        nav("/login");
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center px-6 bg-background text-foreground", children: _jsx(Card, { className: "w-full max-w-md border-border", children: _jsxs(CardContent, { className: "p-6 space-y-4", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Merchant Sign Up" }), _jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Business / Contact Name" }), _jsx(Input, { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "Phone" }), _jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email" }), _jsx(Input, { type: "password", value: pw, onChange: (e) => setPw(e.target.value), placeholder: "Password" }), _jsx(Input, { type: "password", value: pw2, onChange: (e) => setPw2(e.target.value), placeholder: "Confirm Password" }), error && _jsx("p", { className: "text-sm text-destructive", children: error }), _jsx(Button, { disabled: loading, onClick: submit, className: "w-full", children: loading ? "Creating..." : "Create Account" }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Already have an account? ", _jsx(Link, { className: "text-primary underline", to: "/login", children: "Login" })] })] }) }) }));
}
