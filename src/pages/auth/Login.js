import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            return alert(error.message);
        navigate("/dashboard");
    };
    return (_jsx("div", { className: "container py-5", children: _jsxs("div", { className: "card p-4 mx-auto", style: { maxWidth: 400 }, children: [_jsx("h3", { className: "mb-3", children: "Login" }), _jsx("input", { className: "form-control mb-3", placeholder: "Email", onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", className: "form-control mb-3", placeholder: "Password", onChange: (e) => setPassword(e.target.value) }), _jsx("button", { className: "btn btn-dark w-100", onClick: handleLogin, children: "Login" })] }) }));
};
export default Login;
