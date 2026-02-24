import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
import { LanguageProvider as CtxLanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/hooks/useAuth';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PublicLayout from "@/components/PublicLayout";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import Services from "@/pages/Services";
import Tracking from "@/pages/Tracking";
import Quote from "@/pages/Quote";
import Domestic from "@/pages/Domestic";
import Ecommerce from "@/pages/Ecommerce";
import RegisterSeller from "@/pages/RegisterSeller";
import LoginPage from "@/pages/LoginPage";
import Setting from "@/pages/admin/Setting";
const queryClient = new QueryClient();
const AppContent = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoading(false);
        };
        init();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);
    if (loading)
        return _jsx("div", { className: "p-10", children: "Loading..." });
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(PublicLayout, { children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "/services", element: _jsx(PublicLayout, { children: _jsx(Services, {}) }) }), _jsx(Route, { path: "/tracking", element: _jsx(PublicLayout, { children: _jsx(Tracking, {}) }) }), _jsx(Route, { path: "/quote", element: _jsx(PublicLayout, { children: _jsx(Quote, {}) }) }), _jsx(Route, { path: "/domestic", element: _jsx(PublicLayout, { children: _jsx(Domestic, {}) }) }), _jsx(Route, { path: "/ecommerce", element: _jsx(PublicLayout, { children: _jsx(Ecommerce, {}) }) }), _jsx(Route, { path: "/register-seller", element: _jsx(PublicLayout, { children: _jsx(RegisterSeller, {}) }) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), user && (_jsx(Route, { path: "/admin/settings", element: _jsx(Layout, { children: _jsx(Setting, {}) }) })), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
};
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsx(LanguageProvider, { children: _jsx(CtxLanguageProvider, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsx(BrowserRouter, { children: _jsx(AppContent, {}) })] }) }) }) }) }));
};
export default App;
