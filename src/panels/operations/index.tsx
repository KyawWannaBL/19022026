import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from "react";
import Dashboard from "@/pages/Dashboard";
import Shipments from "@/pages/Shipments";

export const operationsRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "shipments", element: <Shipments /> },
] as const;