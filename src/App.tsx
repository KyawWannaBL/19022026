
// Fixed: Point to the consolidated production index to clear TS2305 errors
import { ROUTE_PATHS } from "@/lib/index"; 
import { PANELS } from "@/lib/rbac";
import RequireRole from "@/components/auth/RequireRole";

import LoginPage from "@/pages/LoginPage";
import PublicLayout from "@/components/PublicLayout";
import AppLayout from "@/components/layout/AppLayout";

// Panel Route Imports
import { financeRoutes } from "@/panels/finance";
import { operationsRoutes } from "@/panels/operations";
import { riderRoutes } from "@/panels/rider";
import { superAdminRoutes } from "@/panels/super-admin";
import { merchantCustomerRoutes } from "@/panels/merchant-customer";

/**
 * Helper to map panel-specific routes into React Router definitions
 * Ensures "index" keys are handled to prevent unique key warnings
 */
function renderPanelRoutes(routes: readonly { path: string; element: JSX.Element }[]) {
  return routes.map((r) => (
    <Route key={r.path || "index"} path={r.path} element={r.element} />
  ));
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No Auth Required */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.PUBLIC_TRACKING} element={<div>Tracking</div>} />
        </Route>

        {/* Super Admin Panel - Protected by RBAC */}
        <Route
          path="/super-admin/*" // Explicitly mapping if ROUTE_PATHS.SUPER_ADMIN is not in the dictionary
          element={
            <RequireRole panel={PANELS.SUPER_ADMIN}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(superAdminRoutes)}
        </Route>

        {/* Operations Panel */}
        <Route
          path={`${ROUTE_PATHS.OPERATIONS}/*`}
          element={
            <RequireRole panel={PANELS.OPERATIONS}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(operationsRoutes)}
        </Route>

        {/* Finance Panel */}
        <Route
          path={`${ROUTE_PATHS.FINANCE}/*`}
          element={
            <RequireRole panel={PANELS.FINANCE}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(financeRoutes)}
        </Route>

        {/* Rider Panel */}
        <Route
          path={`${ROUTE_PATHS.RIDER}/*`}
          element={
            <RequireRole panel={PANELS.RIDER}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(riderRoutes)}
        </Route>

        {/* Merchant/Customer Combined Portal */}
        <Route
          path="/portal/*" // Unified access point matching the new production gateway
          element={
            <RequireRole panel={PANELS.MERCHANT_CUSTOMER}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(merchantCustomerRoutes)}
        </Route>

        {/* Global Fallbacks & Redirects */}
        <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
      </Routes>
    </Router>
  );
}