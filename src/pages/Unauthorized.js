import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
export default function Unauthorized() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-10 bg-background text-foreground", children: _jsxs("div", { className: "max-w-lg w-full border rounded-2xl p-6 bg-card", children: [_jsx("h1", { className: "text-xl font-bold mb-2", children: "Unauthorized" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "You don\u2019t have permission to view this page." }), _jsx(Link, { className: "text-primary underline", to: "/login", children: "Go to Login" })] }) }));
}
