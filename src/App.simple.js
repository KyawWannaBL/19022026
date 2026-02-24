import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/lib/index";
import { LanguageProvider } from "@/contexts/LanguageContext";
// Simple loading component
const LoadingSpinner = () => (_jsx("div", { className: "flex h-screen w-full items-center justify-center bg-background", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) }));
// Lazy load components to identify which one might be causing issues
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Dashboard = lazy(() => import("@/pages/DashboardNew"));
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
});
export default function App() {
    return (_jsx("div", { className: "min-h-screen bg-background", children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(TooltipProvider, { children: [_jsx(LanguageProvider, { children: _jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: ROUTE_PATHS.LOGIN, element: _jsx(Login, {}) }), _jsx(Route, { path: ROUTE_PATHS.SIGNUP, element: _jsx(SignUp, {}) }), _jsx(Route, { path: ROUTE_PATHS.DASHBOARD, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: ROUTE_PATHS.LOGIN, replace: true }) })] }) }) }) }), _jsx(Toaster, {}), _jsx(Sonner, { position: "top-right", expand: false, richColors: true })] }) }) }));
}
