import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function App() {
    const [currentPage, setCurrentPage] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@britiumexpress.com' && password === 'demo123') {
            setCurrentPage('dashboard');
        }
        else {
            alert('Use: admin@britiumexpress.com / demo123');
        }
    };
    if (currentPage === 'dashboard') {
        return (_jsx("div", { className: "min-h-screen bg-background text-foreground p-8", children: _jsxs("div", { className: "max-w-md mx-auto bg-card p-8 rounded-lg border border-border", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-8 text-primary", children: "Britium Express Dashboard" }), _jsx("p", { className: "text-center mb-8 text-muted-foreground", children: "Welcome! The app is working correctly with Tailwind CSS." }), _jsx("button", { className: "w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors", onClick: () => setCurrentPage('login'), children: "Logout" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-background text-foreground p-8", children: _jsxs("div", { className: "max-w-md mx-auto bg-card p-8 rounded-lg border border-border", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-4 text-primary", children: "Britium Express" }), _jsx("p", { className: "text-center mb-8 text-muted-foreground", children: "Enterprise Logistics Platform" }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsx("input", { type: "email", placeholder: "Email Address", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary", required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary", required: true }), _jsx("button", { type: "submit", className: "w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors", children: "Sign In" })] }), _jsx("div", { className: "mt-8 text-sm text-muted-foreground text-center", children: "Demo: admin@britiumexpress.com / demo123" })] }) }));
}
