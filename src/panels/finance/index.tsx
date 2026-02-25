import React from "react";
import AccountingHome from "@/pages/AccountingHome";
import ReportsHome from "@/pages/ReportsHome";

export const financeRoutes = [
  { path: "", element: <AccountingHome /> },
  { path: "reports", element: <ReportsHome /> },
] as const;