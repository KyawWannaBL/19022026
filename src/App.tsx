import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 HEAD
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
 ec63336 (Initial enterprise logistics platform (Supabase))
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
 HEAD
import { LanguageProvider } from "@/lib/LanguageContext";
 HEAD
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

const queryClient  new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

import { LanguageProvider as CtxLanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/hooks/useAuth';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
 bc2f204 (login errors solved)

// Layouts & Pages
import PublicLayout from "@/components/PublicLayout";
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

HEAD
const queryClient  new QueryClient();
ec63336 (Initial enterprise logistics platform (Supabase))

const AppContent  ()  {
  const [user, setUser]  useStateany(null);
  const [loading, setLoading]  useState(true);
HEAD
  const [showLogin, setShowLogin]  useState(false);

  useEffect(()  {
    const initializeAuth  async ()  {


  useEffect(()  {
    const init  async ()  {
ec63336 (Initial enterprise logistics platform (Supabase))
      const { data }  await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

HEAD
    initializeAuth();

    init();
ec63336 (Initial enterprise logistics platform (Supabase))

    const { data: listener }  supabase.auth.onAuthStateChange(
      (_event, session)  {
        setUser(session?.user ?? null);
      }
    );

HEAD
    return ()  {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(()  {
    const currentPath 
      window.location.hash.replace("#", "") || "/";

    const publicPaths  [
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

    const isPublic  publicPaths.includes(currentPath as any);

    if (!user && !isPublic) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [user]);

  if (loading) {
    return (
      div className"min-h-screen flex items-center justify-center"
        Loader2 className"w-10 h-10 animate-spin text-blue-600" /
      /div
    );
  }

  return (
    AnimatePresence mode"wait"
      {showLogin ? (
        motion.div
          key"login"
          initial{{ opacity: 0 }}
          animate{{ opacity: 1 }}
          exit{{ opacity: 0 }}
        
          LoginPage /
        /motion.div
      ) : (
        motion.div
          key"app"
          initial{{ opacity: 0 }}
          animate{{ opacity: 1 }}
        
          HashRouter
            Routes
              Route
                path{ROUTE_PATHS.HOME}
                element{
                  PublicLayout
                    divHome Page/div
                  /PublicLayout
                }
              /

              Route path"*" element{Navigate to"/" replace /} /
            /Routes
          /HashRouter
        /motion.div
      )}
    /AnimatePresence
    return ()  listener.subscription.unsubscribe();
  }, []);

  if (loading) return div className"p-10"Loading.../div;

  return (
    Routes
      {/* Public Pages */}
      Route path"/" element{PublicLayoutHomePage //PublicLayout} /
      Route path"/services" element{PublicLayoutServices //PublicLayout} /
      Route path"/tracking" element{PublicLayoutTracking //PublicLayout} /
      Route path"/quote" element{PublicLayoutQuote //PublicLayout} /
      Route path"/domestic" element{PublicLayoutDomestic //PublicLayout} /
      Route path"/ecommerce" element{PublicLayoutEcommerce //PublicLayout} /
      Route path"/register-seller" element{PublicLayoutRegisterSeller //PublicLayout} /
      Route path"/login" element{LoginPage /} /

      {/* Admin Protected */}
      {user && (
        Route path"/admin/settings" element{LayoutSetting //Layout} /
      )}

      Route path"*" element{Navigate to"/" replace /} /
    /Routes
ec63336 (Initial enterprise logistics platform (Supabase))
import Unauthorized from "@/pages/Unauthorized";
import EnterpriseRoutes from "@/routes/EnterpriseRoutes";

export default function App() {
  // Creating the queryClient inside useMemo/useState prevents it from being
  // mangled by the production bundler's global scope optimization.
  const [queryClient]  useState(
    () 
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
bc2f204 (login errors solved)
  );

  return (
    QueryClientProvider client{queryClient}
HEAD
      LanguageProvider
        TooltipProvider
          Toaster /
          Sonner /
          AppContent /
        /TooltipProvider
      /LanguageProvider
      AuthProvider
        LanguageProvider
          TooltipProvider
            Toaster /
            Sonner position"top-right" richColors /
            BrowserRouter
              Routes
                {/* PUBLIC ROUTES */}
                Route element{PublicLayout /}
                  Route path"/" element{HomePage /} /
                  Route path"/services" element{Services /} /
                  Route path"/tracking" element{Tracking /} /
                  Route path"/quote" element{Quote /} /
                  Route path"/domestic" element{Domestic /} /
                  Route path"/ecommerce" element{Ecommerce /} /
                /Route

                {/* AUTH ROUTES */}
                Route path"/login" element{LoginPage /} /
                Route path"/register" element{SignUp /} /
                Route path"/register/customer" element{SignUpCustomer /} /
                Route path"/register/merchant" element{SignUpMerchant /} /
                Route path"/forgot-password" element{ForgotPassword /} /
                Route path"/reset-password" element{ResetPassword /} /
                Route path"/force-password-reset" element{ForcePasswordReset /} /

                {/* SYSTEM */}
                Route path"/unauthorized" element{Unauthorized /} /

                {/* DASHBOARD ROUTES */}
                {/* Ensure navigation to panel uses absolute paths like /panel/dashboard */}
                Route path"/panel/*" element{EnterpriseRoutes /} /

                {/* CATCH-ALL REDIRECT */}
                Route path"*" element{Navigate to"/" replace /} /
              /Routes
            /BrowserRouter
          /TooltipProvider
        /LanguageProvider
      /AuthProvider
ec63336 (Initial enterprise logistics platform (Supabase))
    /QueryClientProvider
  );
HEAD
};

HEAD
export default App;
export default App;
ec63336 (Initial enterprise logistics platform (Supabase))
}
bc2f204 (login errors solved)
