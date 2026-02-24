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