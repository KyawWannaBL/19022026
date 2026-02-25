import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useLanguageContext } from '@/lib/LanguageContext';
import { ROUTE_PATHS } from '@/lib/index';

// Layouts
import AppLayout from '@/components/layout/AppLayout';

// Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import WarehouseScanIn from '@/pages/warehouse/WarehouseScanIn';

function App() {
  const { t } = useLanguageContext();

  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path={ROUTE_PATHS.DASHBOARD} element={<AppLayout><AdminDashboard /></AppLayout>} />
        <Route path={ROUTE_PATHS.WAREHOUSE} element={<AppLayout><WarehouseScanIn /></AppLayout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTE_PATHS.DASHBOARD} replace />} />
      </Routes>
    </Router>
  );
}

export default App;