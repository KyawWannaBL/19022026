import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/lib/LanguageContext';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'sonner';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Warehouse from './pages/Warehouse';
import Settings from './pages/Settings';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}