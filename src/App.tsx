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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

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
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';
import { Loader2 } from 'lucide-react';

// Layouts
import { PublicLayout } from '@/components/PublicLayout';

// Lazy Loaded Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const Tracking = lazy(() => import('@/pages/Tracking'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const CustomerDashboard = lazy(() => import('@/pages/CustomerDashboard'));
const MerchantDashboard = lazy(() => import('@/pages/MerchantDashboard'));

/**
 * Loading Fallback Component
 */
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Initializing Britium Express...
      </p>
    </div>
  </div>
);

/**
 * Enhanced Protected Route Component
 * Handles both Authentication and Role-Based Authorization.
 */
function ProtectedRoute({ 
  children, 
  requiredRoles 
}: { 
  children: React.ReactNode, 
  requiredRoles?: string[] 
}) {
  const { user, loading, role } = useAuth(); //
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  // Role Authorization Check
  if (requiredRoles && !requiredRoles.includes(role || '')) {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* --- PUBLIC ROUTES --- */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.PUBLIC_TRACKING} replace />} />
                <Route path={ROUTE_PATHS.PUBLIC_TRACKING} element={<Tracking />} />
                <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
              </Route>

              {/* --- PRIVATE / ADMIN ROUTES --- */}
              <Route
                path={ROUTE_PATHS.DASHBOARD}
                element={
                  <ProtectedRoute requiredRoles={[USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* --- CUSTOMER ROUTES --- */}
              <Route
                path={ROUTE_PATHS.CUSTOMER_DASHBOARD}
                element={
                  <ProtectedRoute requiredRoles={[USER_ROLES.CUSTOMER]}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* --- MERCHANT ROUTES --- */}
              <Route
                path={ROUTE_PATHS.MERCHANT_DASHBOARD}
                element={
                  <ProtectedRoute requiredRoles={[USER_ROLES.MERCHANT]}>
                    <MerchantDashboard />
                  </ProtectedRoute>
                }
              />

              {/* --- FALLBACK --- */}
              <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
add-supabase-user-script
