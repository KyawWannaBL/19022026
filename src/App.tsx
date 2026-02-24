import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'sonner';

// Correct imports from the /pages directory
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Settings from './pages/Settings';
import Warehouse from './pages/Warehouse';
import Shipments from './pages/Shipments';
import Users from './pages/Users';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/users" element={<Users />} />
            {/* Fallback to home for any broken links */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}