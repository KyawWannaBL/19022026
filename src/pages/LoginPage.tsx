import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
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
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // Standardized Supabase hook

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-primary font-medium">Loading session...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Suspense 
            fallback={
              <div className="flex h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Routes>
              {/* Public Routes wrapped in PublicLayout */}
              <Route element={<PublicLayout />}>
                <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.PUBLIC_TRACKING} replace />} />
                <Route path={ROUTE_PATHS.PUBLIC_TRACKING} element={<Tracking />} />
                <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path={ROUTE_PATHS.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to={ROUTE_PATHS.HOME} replace />} />
            </Routes>
          </Suspense>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}