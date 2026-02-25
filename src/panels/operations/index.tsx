import Dashboard from "@/pages/Dashboard";
import Shipments from "@/pages/Shipments";

export const operationsRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "shipments", element: <Shipments /> },
] as const;