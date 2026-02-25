import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, LayoutDashboard, Package, PlusCircle, MapPin, 
  Warehouse, BadgeDollarSign, Users, BarChart3, Settings, 
  LogOut, Bell, Search, ChevronRight, User as UserIcon,
  Languages, Upload, Globe, DollarSign, Shield, MessageSquare
} from 'lucide-react';
import { ROUTE_PATHS, SHIPMENT_STATUS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/roles'; // Assuming roles live here now
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface NavItem {
  labelKey: string;
  path: string;
  icon: React.ElementType;
  roles?: string[]; // Simplified to match string roles
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.dashboard', path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { labelKey: 'nav.wayManagement', path: ROUTE_PATHS.WAY_MANAGEMENT, icon: Package },
  { labelKey: 'nav.createDelivery', path: ROUTE_PATHS.CREATE_SHIPMENT, icon: PlusCircle },
  { labelKey: 'way.trackingMap', path: ROUTE_PATHS.TRACKING, icon: MapPin },
  { labelKey: 'nav.accounting', path: ROUTE_PATHS.ACCOUNTING, icon: BadgeDollarSign },
  { labelKey: 'nav.reporting', path: ROUTE_PATHS.REPORTS, icon: BarChart3 },
  { labelKey: 'nav.settings', path: ROUTE_PATHS.SETTINGS, icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthorized } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { t, language, setLanguage } = useLanguageContext();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0d2c54] text-white">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#ff6b00] p-2 rounded-lg font-black italic text-xl">BE</div>
        <div>
          <h1 className="font-bold text-lg tracking-tight leading-none uppercase">Britium</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 italic">Express Logistics</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-[#ff6b00] text-white shadow-lg" 
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium">{t(item.labelKey, item.labelKey)}</span>
            </NavLink>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
          <Avatar className="w-9 h-9 border border-white/20">
            <AvatarFallback className="bg-[#ff6b00] text-white text-xs font-bold">
              {user?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.full_name}</p>
            <p className="text-[10px] text-slate-400 uppercase truncate italic">{user?.role}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-red-400" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-slate-200">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5 text-[#0d2c54]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-none bg-[#0d2c54]">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h2 className="text-sm font-bold text-[#0d2c54] hidden sm:block uppercase italic">
              {t('Britium Express System', 'Britium Express စနစ်')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Language Toggle */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
              className="px-3 py-1 rounded-md border border-[#0d2c54]/20 text-[10px] font-black uppercase tracking-widest text-[#0d2c54] hover:bg-slate-50 transition-all"
            >
              {language === 'en' ? 'မြန်မာ' : 'English'}
            </button>
            
            <Button variant="ghost" size="icon" className="relative text-[#0d2c54]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff6b00] rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>

        <footer className="p-4 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest">
          <p>© 2026 BRITIUM EXPRESS LOGISTICS - ALL RIGHTS RESERVED</p>
        </footer>
      </div>
    </div>
  );
}