import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Warehouse, 
  User, 
  Bell, 
  Menu, 
  ChevronRight, 
  LogOut,
  BarChart3,
  Users,
  Settings,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Britium Express Main Layout
 * Features role-based bottom navigation and a comprehensive sidebar for complex management tasks.
 * Current Year: 2026
 */
export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Role-based bottom navigation mapping
  const getBottomNavItems = () => {
    const items: { icon: any; label: string; path: string }[] = [
      { icon: LayoutDashboard, label: 'Home', path: ROUTE_PATHS.DASHBOARD },
    ];

    if (user?.role === USER_ROLES.DRIVER || user?.role === USER_ROLES.RIDER) {
      items.push({ icon: Truck, label: 'Delivery', path: ROUTE_PATHS.DELIVERY });
    } else if (user?.role === USER_ROLES.WAREHOUSE) {
      items.push({ icon: Warehouse, label: 'Warehouse', path: ROUTE_PATHS.WAREHOUSE });
    } else {
      items.push({ icon: Package, label: 'Orders', path: ROUTE_PATHS.ORDERS });
    }

    items.push({ icon: User, label: 'Profile', path: ROUTE_PATHS.PROFILE });
    return items;
  };

  // Sidebar items for management roles (as seen in screenshots 5810/5196)
  const sidebarCategories = [
    {
      title: 'Operations',
      items: [
        { icon: Package, label: 'Order Management', path: ROUTE_PATHS.ORDERS },
        { icon: Truck, label: 'Fleet & Dispatch', path: ROUTE_PATHS.DELIVERY },
        { icon: Warehouse, label: 'Warehouse Inventory', path: ROUTE_PATHS.WAREHOUSE },
      ]
    },
    {
      title: 'Reporting',
      items: [
        { icon: BarChart3, label: 'Financial Reports', path: '#' },
        { icon: MessageSquare, label: 'Broadcast Message', path: '#' },
        { icon: Users, label: 'Teams Management', path: '#' },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: CreditCard, label: 'Pricing & Packages', path: '#' },
        { icon: Settings, label: 'System Settings', path: '#' },
      ]
    }
  ];

  const navItems = getBottomNavItems();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0 bg-sidebar">
                <SheetHeader className="p-6 border-b border-sidebar-border">
                  <SheetTitle className="text-sidebar-foreground font-bold tracking-tight">
                    BRITIUM EXPRESS
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Logistics Portal 2026</p>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-120px)]">
                  <div className="p-4 space-y-6">
                    {sidebarCategories.map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2">
                          {category.title}
                        </h4>
                        <div className="space-y-1">
                          {category.items.map((item, itemIdx) => (
                            <Button
                              key={itemIdx}
                              variant="ghost"
                              className="w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-sidebar-accent transition-all"
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              <item.icon className="h-4 w-4 opacity-70" />
                              <span className="flex-1 text-left text-sm">{item.label}</span>
                              <ChevronRight className="h-3 w-3 opacity-30" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-2 opacity-50" />
                  <div className="p-4">
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start gap-3 h-11"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout Session</span>
                    </Button>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <span className="text-lg font-bold tracking-tight text-primary">
              Britium
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-destructive text-[10px] border-2 border-background">
                  3
                </Badge>
              </Button>
            </div>
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center border border-border overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-4 md:p-6"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Role-Based Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border px-6 pb-6 pt-3 shadow-[0_-8px_30px_-6px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-primary/10 scale-110 shadow-sm' : ''
                }`}>
                  <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Desktop/Tablet Sidebar Helper (Visible on larger screens if needed) */}
      <div className="hidden lg:block fixed left-0 top-16 bottom-0 w-20 border-r border-border bg-background">
        <div className="flex flex-col items-center py-6 gap-6">
          {sidebarCategories[0].items.map((item, idx) => (
            <Button key={idx} variant="ghost" size="icon" className="rounded-xl">
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}