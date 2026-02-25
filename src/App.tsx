import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "@/lib/routes";
import { PANELS } from "@/lib/rbac";
import RequireRole from "@/components/auth/RequireRole";

import LoginPage from "@/pages/LoginPage";
import PublicLayout from "@/components/PublicLayout";
import AppLayout from "@/components/layout/AppLayout";

import { financeRoutes } from "@/panels/finance";
import { operationsRoutes } from "@/panels/operations";
import { riderRoutes } from "@/panels/rider";
import { superAdminRoutes } from "@/panels/super-admin";
import { merchantCustomerRoutes } from "@/panels/merchant-customer";

function renderPanelRoutes(routes: readonly { path: string; element: JSX.Element }[]) {
  return routes.map((r) => <Route key={r.path || "index"} path={r.path} element={r.element} />);
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTE_PATHS.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATHS.PUBLIC_TRACKING} element={<div>Tracking</div>} />
        </Route>

        {/* Super Admin */}
        <Route
          path={`${ROUTE_PATHS.SUPER_ADMIN}/*`}
          element={
            <RequireRole panel={PANELS.SUPER_ADMIN}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(superAdminRoutes)}
        </Route>

        {/* Operations */}
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

        {/* Finance */}
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

        {/* Rider */}
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

        {/* Merchant/Customer */}
        <Route
          path={`${ROUTE_PATHS.MERCHANT_CUSTOMER}/*`}
          element={
            <RequireRole panel={PANELS.MERCHANT_CUSTOMER}>
              <AppLayout />
            </RequireRole>
          }
        >
          {renderPanelRoutes(merchantCustomerRoutes)}
        </Route>

        {/* Fallback */}
        <Route path={ROUTE_PATHS.HOME} element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} replace />} />
      </Routes>
    </Router>
  );
}