import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';

// Layouts & Pages
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/LoginPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or a loading spinner
  return user ? <>{children}</> : <Navigate to={ROUTE_PATHS.LOGIN} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        
        {/* All Staff Routes are now protected */}
        <Route path={ROUTE_PATHS.DASHBOARD} element={
          <ProtectedRoute>
            <AppLayout><AdminDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
      </Routes>
    </Router>
  );
}

export default App;