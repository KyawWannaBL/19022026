import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';

// Layouts
import AppLayout from '@/components/layout/AppLayout';

// Direct Page Imports (No longer using the deleted index.ts)
import AdminDashboard from '@/pages/admin/AdminDashboard';
import WarehouseScanIn from '@/pages/warehouse/WarehouseScanIn';
import WayPlanningPage from '@/pages/supervisor/WayPlanningPage';
import LoginPage from '@/pages/LoginPage';
// Add other pages as needed...

function App() {
  const { t } = useLanguageContext();

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
        
        {/* Protected Staff Routes */}
        <Route path={ROUTE_PATHS.DASHBOARD} element={<AppLayout><AdminDashboard /></AppLayout>} />
        <Route path={ROUTE_PATHS.WAREHOUSE} element={<AppLayout><WarehouseScanIn /></AppLayout>} />
        <Route path="/way-planning" element={<AppLayout><WayPlanningPage /></AppLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
      </Routes>
    </Router>
  );
}

export default App;