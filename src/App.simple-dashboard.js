import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Simple Dashboard without Layout
function SimpleDashboard() {
    return (_jsx("div", { className: "min-h-screen bg-background text-foreground p-8", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-primary mb-8", children: "Britium Express Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-card p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Operations" }), _jsx("p", { className: "text-muted-foreground", children: "Manage daily operations" })] }), _jsxs("div", { className: "bg-card p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Shipments" }), _jsx("p", { className: "text-muted-foreground", children: "Track shipments" })] }), _jsxs("div", { className: "bg-card p-6 rounded-lg border border-border", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Analytics" }), _jsx("p", { className: "text-muted-foreground", children: "View reports" })] })] }), _jsx("div", { className: "mt-8 text-center text-muted-foreground", children: "\u00A9 2026 Britium Express Logistics Platform" })] }) }));
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(SimpleDashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }));
}
