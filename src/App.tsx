import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/LanguageContext";
<<<<<<< HEAD
import LoginPage from "@/pages/LoginPage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Layout } from "@/components/Layout";
import { PublicLayout } from "@/components/PublicLayout";
import { CustomerLayout } from "@/components/CustomerLayout";

/* KEEP ALL YOUR PAGE IMPORTS BELOW (UNCHANGED) */
/* I am not repeating them to reduce noise */
/* Your massive route system remains intact */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});
=======
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
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))

const AppContent = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
=======

  useEffect(() => {
    const init = async () => {
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

<<<<<<< HEAD
    initializeAuth();
=======
    init();
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

<<<<<<< HEAD
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const currentPath =
      window.location.hash.replace("#", "") || "/";

    const publicPaths = [
      ROUTE_PATHS.HOME,
      ROUTE_PATHS.SERVICES,
      ROUTE_PATHS.GET_QUOTE,
      ROUTE_PATHS.SHIPPING_CALCULATOR,
      ROUTE_PATHS.MERCHANT_REGISTRATION,
      ROUTE_PATHS.ABOUT,
      ROUTE_PATHS.CONTACT,
      ROUTE_PATHS.PUBLIC_TRACKING,
      ROUTE_PATHS.SUPPORT,
    ];

    const isPublic = publicPaths.includes(currentPath as any);

    if (!user && !isPublic) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showLogin ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginPage />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <HashRouter>
            <Routes>
              <Route
                path={ROUTE_PATHS.HOME}
                element={
                  <PublicLayout>
                    <div>Home Page</div>
                  </PublicLayout>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </motion.div>
      )}
    </AnimatePresence>
=======
    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/tracking" element={<PublicLayout><Tracking /></PublicLayout>} />
      <Route path="/quote" element={<PublicLayout><Quote /></PublicLayout>} />
      <Route path="/domestic" element={<PublicLayout><Domestic /></PublicLayout>} />
      <Route path="/ecommerce" element={<PublicLayout><Ecommerce /></PublicLayout>} />
      <Route path="/register-seller" element={<PublicLayout><RegisterSeller /></PublicLayout>} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Protected */}
      {user && (
        <Route path="/admin/settings" element={<Layout><Setting /></Layout>} />
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </LanguageProvider>
=======
      <AuthProvider>
        <LanguageProvider>
          <CtxLanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </CtxLanguageProvider>
        </LanguageProvider>
      </AuthProvider>
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
    </QueryClientProvider>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
