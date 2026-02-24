import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ROUTE_PATHS } from '@/lib/index';
// Layouts
import { PublicLayout } from '@/components/PublicLayout';
// Lazy Loaded Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const Tracking = lazy(() => import('@/pages/Tracking'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
/**
 * Protected Route Component
 * Uses the Supabase-based useAuth hook to verify sessions.
 */
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth(); // Standardized Supabase hook
    if (loading) {
        return (_jsx("div", { className: "flex h-screen items-center justify-center bg-background", children: _jsx("div", { className: "animate-pulse text-primary font-medium", children: "Loading session..." }) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: ROUTE_PATHS.LOGIN, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export default function App() {
    return (_jsx(Router, { children: _jsx(LanguageProvider, { children: _jsxs(AuthProvider, { children: [_jsx(Suspense, { fallback: _jsx("div", { className: "flex h-screen items-center justify-center bg-background", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }), children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(PublicLayout, {}), children: [_jsx(Route, { path: ROUTE_PATHS.HOME, element: _jsx(Navigate, { to: ROUTE_PATHS.PUBLIC_TRACKING, replace: true }) }), _jsx(Route, { path: ROUTE_PATHS.PUBLIC_TRACKING, element: _jsx(Tracking, {}) }), _jsx(Route, { path: ROUTE_PATHS.LOGIN, element: _jsx(LoginPage, {}) })] }), _jsx(Route, { path: ROUTE_PATHS.DASHBOARD, element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: ROUTE_PATHS.HOME, replace: true }) })] }) }), _jsx(Toaster, {})] }) }) }));
}
