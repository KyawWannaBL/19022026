import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import { ROUTE_PATHS } from '@/lib/index';

export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { label: 'Track & Trace', path: ROUTE_PATHS.PUBLIC_TRACKING },
    { label: 'Services', path: ROUTE_PATHS.SERVICES },
    { label: 'Get Quote', path: ROUTE_PATHS.GET_QUOTE },
    { label: 'About Us', path: ROUTE_PATHS.ABOUT },
    { label: 'News', path: ROUTE_PATHS.NEWS },
    { label: 'Contact', path: ROUTE_PATHS.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0d2c54] text-white py-2 text-xs sm:text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> +95 9 897 4477 44</span>
            <span className="flex items-center gap-1"><Mail size={14} /> info@britiumexpress.com</span>
          </div>
          <span className="flex items-center gap-1"><Clock size={14} /> Mon-Sat: 9:00am - 5:30pm</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={IMAGES.BRITIUM_LOGO_55} alt="Britium Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-tight transition-colors ${
                  isActive(link.path) ? 'text-[#ff6b00]' : 'text-gray-600 hover:text-[#ff6b00]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="outline" className="border-[#0d2c54] text-[#0d2c54] hover:bg-[#0d2c54] hover:text-white font-bold">
              <Link to={ROUTE_PATHS.LOGIN}><LogIn className="mr-2 h-4 w-4" /> Login</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-[#0d2c54]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t p-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="font-bold text-gray-700">
                {link.label}
              </Link>
            ))}
            <Link to={ROUTE_PATHS.LOGIN} className="btn-portal text-center py-2">Login</Link>
          </div>
        )}
      </nav>
    </>
  );
};