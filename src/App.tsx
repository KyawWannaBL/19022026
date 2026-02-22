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
