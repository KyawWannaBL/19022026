import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
export default class ErrorBoundary extends Component {
    state = { hasError: false, error: null };
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center", children: _jsxs("div", { className: "max-w-md p-8 rounded-3xl bg-slate-800 border border-rose-500/50 shadow-2xl", children: [_jsx("h1", { className: "text-2xl font-bold text-white mb-4", children: "System Error Detected" }), _jsx("pre", { className: "text-xs text-rose-400 bg-black/40 p-4 rounded-xl overflow-auto mb-6 text-left whitespace-pre-wrap", children: this.state.error?.message }), _jsx("button", { onClick: () => window.location.href = '/dashboard', className: "px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all", children: "RELOAD SYSTEM" })] }) }));
        }
        return this.children;
    }
}
