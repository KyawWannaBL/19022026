import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// Simple Login Component
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@britiumexpress.com' && password === 'demo123') {
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/dashboard');
        }
        else {
            alert('Use: admin@britiumexpress.com / demo123');
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-background text-foreground p-8", children: _jsxs("div", { className: "max-w-md mx-auto bg-card p-8 rounded-lg border border-border", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-4 text-primary", children: "Britium Express" }), _jsx("p", { className: "text-center mb-8 text-muted-foreground", children: "Enterprise Logistics Platform" }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsx("input", { type: "email", placeholder: "Email Address", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary", required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary", required: true }), _jsx("button", { type: "submit", className: "w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors", children: "Sign In" })] }), _jsx("div", { className: "mt-8 text-sm text-muted-foreground text-center", children: "Demo: admin@britiumexpress.com / demo123" })] }) }));
}
// Simple Dashboard Component
function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };
    return (_jsx("div", { className: "min-h-screen bg-background text-foreground p-8", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "bg-card p-8 rounded-lg border border-border mb-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-primary", children: "Britium Express Dashboard" }), _jsx("button", { onClick: handleLogout, className: "px-4 py-2 bg-destructive text-destructive-foreground rounded-md font-semibold hover:bg-destructive/90 transition-colors", children: "Logout" })] }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Welcome to the Enterprise Logistics Platform! The routing system is working correctly." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-background p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Operations" }), _jsx("p", { className: "text-muted-foreground", children: "Manage daily operations" })] }), _jsxs("div", { className: "bg-background p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Shipments" }), _jsx("p", { className: "text-muted-foreground", children: "Track shipments" })] }), _jsxs("div", { className: "bg-background p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Analytics" }), _jsx("p", { className: "text-muted-foreground", children: "View reports" })] })] })] }) }) }));
}
// Protected Route Component
function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] }) }));
}
