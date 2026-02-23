import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// UI Components
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Context & Auth
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { ROUTE_PATHS } from "@/lib/index";

// Layouts & Pages
import { PublicLayout } from "@/components/PublicLayout";
import HomePage from "@/pages/HomePage";
import Services from "@/pages/Services";
import Tracking from "@/pages/Tracking";
import Quote from "@/pages/Quote";
import Domestic from "@/pages/Domestic";
import Ecommerce from "@/pages/Register_Seller";
import LoginPage from "@/pages/LoginPage";
import SignUp from "@/pages/SignUp";
import SignUpCustomer from "@/pages/SignUpCustomer";
import SignUpMerchant from "@/pages/SignUpMerchant";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import ForcePasswordReset from "@/pages/ForcePasswordReset";
import Unauthorized from "@/pages/Unauthorized";
import EnterpriseRoutes from "@/routes/EnterpriseRoutes";

const AppContent = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Auth Session
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    // Listen for Auth Changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/domestic" element={<Domestic />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register/customer" element={<SignUpCustomer />} />
        <Route path="/register/merchant" element={<SignUpMerchant />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/force-password-reset" element={<ForcePasswordReset />} />

        {/* SYSTEM & DASHBOARD */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/panel/*" element={<EnterpriseRoutes />} />

        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-right" richColors />
            <AppContent />
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}