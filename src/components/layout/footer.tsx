import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';

export const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-black uppercase italic mb-4">Britium Express</h4>
          <p className="text-xs leading-relaxed">
            Premium logistics and delivery services in Myanmar. Fast, reliable, and secure.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-xs">
            <Link to={ROUTE_PATHS.SERVICES} className="hover:text-[#ff6b00]">Services</Link>
            <Link to={ROUTE_PATHS.PUBLIC_TRACKING} className="hover:text-[#ff6b00]">Track Shipment</Link>
            <Link to={ROUTE_PATHS.CONTACT} className="hover:text-[#ff6b00]">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Support</h4>
          <p className="text-xs">Hotline: +95 9 897 4477 44</p>
          <p className="text-xs">Email: info@britiumexpress.com</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-[10px] text-center uppercase tracking-widest">
        © {year} Britium Express. All Rights Reserved.
      </div>
    </footer>
  );
};