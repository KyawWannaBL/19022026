import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Calculator from "@/pages/Calculator";
import Dashboard from "@/pages/Dashboard";
import MapPage from "@/pages/Map";
import AppLayout from "@/components/layout/AppLayout";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </AppLayout>
  );
}