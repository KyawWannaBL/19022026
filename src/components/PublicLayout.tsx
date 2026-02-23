<<<<<<< HEAD
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Package, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  User,
  LogIn,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';
<<<<<<< HEAD
import { useAuth } from '@/hooks/useFirebaseAuth';
=======
import { useAuth } from '@/hooks/useAuth';
>>>>>>> ec63336 (Initial enterprise logistics platform (Supabase))
import { useLanguageContext, LanguageToggle, CompactLanguageToggle } from '@/lib/LanguageContext';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets/images';

interface NavItem {
  label: string;
  path: string;
}



export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useLanguageContext();
  
  const NAV_ITEMS: NavItem[] = [
    { label: t('public.track'), path: ROUTE_PATHS.PUBLIC_TRACKING },
    { label: t('public.services'), path: ROUTE_PATHS.SERVICES },
    { label: t('public.getQuote'), path: ROUTE_PATHS.GET_QUOTE },
    { label: t('public.about'), path: ROUTE_PATHS.ABOUT },
    { label: t('public.support'), path: ROUTE_PATHS.SUPPORT },
    { label: t('public.contact'), path: ROUTE_PATHS.CONTACT },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.HOME);
  };

  const isCustomerUser = user && user.role === USER_ROLES.CUSTOMER;
  const isAdminUser = user && [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.WAREHOUSE, USER_ROLES.RIDER, USER_ROLES.MERCHANT, USER_ROLES.VENDOR, USER_ROLES.ACCOUNTANT].includes(user.role as any);

  const HeaderContent = () => (
    <>
      <div className="flex items-center gap-3 lotus-glow">
        <div className="relative">
          <img 
            src={IMAGES.BRITIUM_LOGO_55} 
            alt="Britium Express" 
            className="w-12 h-12 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-gold-400/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight leading-none bg-gradient-to-r from-navy-900 to-navy-700 bg-clip-text text-transparent">
            Britium Express
          </h1>
          <p className="text-xs text-gold-600 font-medium">
            Delivering Confidence in Motion
          </p>
        </div>
      </div>

      <nav className="hidden lg:flex items-center space-x-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "nav-item text-sm font-medium myanmar-text",
              location.pathname === item.path 
                ? "active" 
                : "text-muted-foreground hover:text-gold-600"
            )}
          >
            {item.label}
          </Link>
        ))}
        
        {/* Language Toggle */}
        <LanguageToggle className="ml-4" />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1 pl-2 hover:bg-gray-100 rounded-full">
                <span className="hidden sm:inline text-sm font-medium">{user.full_name || 'User'}</span>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-bold">{user.full_name || 'User'}</span>
                <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isCustomerUser && (
                <>
                  <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.CUSTOMER_DASHBOARD)}>
                    <User className="mr-2 w-4 h-4" />
                    {t('nav.dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.CUSTOMER_PROFILE)}>
                    <User className="mr-2 w-4 h-4" />
                    {t('contact.name')}
                  </DropdownMenuItem>
                </>
              )}
              {isAdminUser && (
                <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>
                  <User className="mr-2 w-4 h-4" />
                  {t('nav.dashboard')}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4" />
                {t('public.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline" size="sm">
            <Link to={ROUTE_PATHS.LOGIN}>
              <LogIn className="w-4 h-4 mr-2" />
              {t('public.login')}
            </Link>
          </Button>
        )}
        
        {/* Language Toggle */}
        <LanguageToggle className="ml-2" />
      </nav>
    </>
  );
=======
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Truck, Lock } from 'lucide-react';
>>>>>>> bc2f204 (login errors solved)

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-blue-600">
            <Truck className="h-6 w-6" />
            <span>Britium Express</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/services" className="text-sm font-medium hover:text-blue-600">Services</Link>
            <Link to="/tracking" className="text-sm font-medium hover:text-blue-600">Tracking</Link>
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800"
            >
              <Lock className="h-4 w-4" /> Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Britium Express. All rights reserved.
      </footer>
    </div>
  );
}