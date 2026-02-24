// src/components/PublicLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '@/components/layout/PublicNavbar'; 
import { Footer } from '@/components/layout/Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};