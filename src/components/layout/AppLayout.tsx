import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* header/sidebar can go here */}
      <Outlet />
    </div>
  );
}