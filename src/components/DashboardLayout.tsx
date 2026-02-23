import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  User,
  Truck,
  ClipboardList
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Define navigation based on roles
  const navigation = [
    // Admin & App Owner Links
    { 
      name: 'Admin Dashboard', 
      href: '/admin/dashboard', 
      icon: LayoutDashboard, 
      show: role === 'ADMIN' || role === 'APP_OWNER' 
    },
    { 
      name: 'System Settings', 
      href: '/admin/settings', 
      icon: SettingsIcon, 
      show: role === 'ADMIN' || role === 'APP_OWNER' 
    },
    
    // Staff Links
    { 
      name: 'Staff Dashboard', 
      href: '/staff/dashboard', 
      icon: LayoutDashboard, 
      show: role === 'STAFF' 
    },
    { 
      name: 'Order Management', 
      href: '/staff/orders', 
      icon: Package, 
      show: role === 'STAFF' || role === 'ADMIN' 
    },

    // Driver Links
    { 
      name: 'Driver Dashboard', 
      href: '/driver/dashboard', 
      icon: Truck, 
      show: role === 'DRIVER' 
    },
    { 
      name: 'Pickup Tasks', 
      href: '/driver/tasks', 
      icon: ClipboardList, 
      show: role === 'DRIVER' 
    },

    // Common
    { name: 'My Profile', href: '/profile', icon: User, show: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight text-emerald-400">BRITIUM EXPRESS</h1>
          <p className="text-xs text-slate-400 uppercase mt-1 tracking-widest">{role} PANEL</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.filter(item => item.show).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.href 
                  ? "bg-emerald-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-400 hover:text-rose-400 hover:bg-rose-400/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8">
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.full_name || 'User'}</p>
              <p className="text-xs text-slate-500 capitalize">{role?.toLowerCase()}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-72 bg-slate-900 p-6 flex flex-col">
             <button className="absolute top-4 right-4 text-white" onClick={() => setIsMobileMenuOpen(false)}>
               <X />
             </button>
             {/* Mobile Nav Links same as above */}
             <div className="mt-8 space-y-4">
               {navigation.filter(item => item.show).map((item) => (
                 <Link 
                   key={item.name} 
                   to={item.href} 
                   className="flex items-center gap-3 text-slate-300"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   <item.icon size={20} /> {item.name}
                 </Link>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}