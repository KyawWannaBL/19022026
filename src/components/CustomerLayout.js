import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Package, Home, PlusCircle, History, User as UserIcon, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ROUTE_PATHS } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/assets/images';
const NAV_ITEMS = [
    { label: 'Dashboard', path: ROUTE_PATHS.CUSTOMER_DASHBOARD, icon: Home },
    { label: 'My Shipments', path: ROUTE_PATHS.CUSTOMER_SHIPMENTS, icon: History },
    { label: 'New Booking', path: ROUTE_PATHS.CUSTOMER_BOOKING, icon: PlusCircle },
    { label: 'Customer Hub', path: ROUTE_PATHS.CUSTOMER_EXPERIENCE, icon: Package },
    { label: 'Profile', path: ROUTE_PATHS.CUSTOMER_PROFILE, icon: UserIcon },
];
export function CustomerLayout({ children }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const handleLogout = () => {
        logout();
        navigate(ROUTE_PATHS.HOME);
    };
    const SidebarContent = () => (_jsxs("div", { className: "flex flex-col h-full bg-navy-900 text-white", children: [_jsxs("div", { className: "p-6 flex items-center gap-3 border-b border-navy-700", children: [_jsx("img", { src: IMAGES.BRITIUM_LOGO_55, alt: "Britium Express Logo", className: "h-10 w-auto" }), _jsxs("div", { children: [_jsx("h1", { className: "font-bold text-lg tracking-tight leading-none", children: "My Britium" }), _jsx("p", { className: "text-xs text-gold font-medium", children: "Customer Portal" })] })] }), _jsx("nav", { className: "flex-1 px-3 py-6", children: _jsx("div", { className: "space-y-1", children: NAV_ITEMS.map((item) => (_jsxs(NavLink, { to: item.path, onClick: () => setIsMobileOpen(false), className: ({ isActive }) => cn("flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group", isActive
                            ? "bg-gold text-navy-900 shadow-md font-medium"
                            : "hover:bg-navy-800 text-navy-200 hover:text-white"), children: [_jsx(item.icon, { className: "w-5 h-5 shrink-0" }), _jsx("span", { className: "font-medium", children: item.label })] }, item.path))) }) }), _jsx("div", { className: "p-4 border-t border-navy-700 mt-auto", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-navy-200 hover:text-white hover:bg-navy-800", onClick: handleLogout, children: [_jsx(LogOut, { className: "w-4 h-4 mr-3" }), "Logout"] }) })] }));
    return (_jsxs("div", { className: "flex min-h-screen bg-gray-50", children: [_jsx("aside", { className: "hidden lg:flex w-64 flex-col fixed inset-y-0 z-50", children: _jsx(SidebarContent, {}) }), _jsxs("div", { className: "flex-1 flex flex-col lg:pl-64", children: [_jsx("header", { className: "sticky top-0 z-40 w-full h-16 border-b border-border bg-white shadow-sm", children: _jsxs("div", { className: "flex items-center justify-between h-full px-4 md:px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Sheet, { open: isMobileOpen, onOpenChange: setIsMobileOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", children: _jsx(Menu, { className: "w-5 h-5" }) }) }), _jsx(SheetContent, { side: "left", className: "p-0 w-64 border-none", children: _jsx(SidebarContent, {}) })] }), _jsx("div", { className: "lg:hidden", children: _jsx("h1", { className: "font-bold text-lg text-navy-900", children: "My Britium" }) })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "flex items-center gap-2 p-1 pl-2 hover:bg-gray-100 rounded-full", children: [_jsx("span", { className: "hidden sm:inline text-sm font-medium", children: user?.full_name || 'Customer' }), _jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: user?.avatar_url }), _jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-xs", children: user?.full_name?.split(' ').map((n) => n[0]).join('') || 'C' })] })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56 mt-2", children: [_jsxs(DropdownMenuLabel, { className: "flex flex-col", children: [_jsx("span", { className: "font-bold", children: user?.full_name || 'Customer' }), _jsx("span", { className: "text-xs text-muted-foreground font-normal", children: user?.email })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.CUSTOMER_PROFILE), children: [_jsx(UserIcon, { className: "mr-2 w-4 h-4" }), "Profile"] }), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.CUSTOMER_DASHBOARD), children: [_jsx(Home, { className: "mr-2 w-4 h-4" }), "Dashboard"] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-red-600 focus:text-red-600", onClick: handleLogout, children: [_jsx(LogOut, { className: "mr-2 w-4 h-4" }), "Logout"] })] })] })] })] }) }), _jsx("main", { className: "flex-1 p-4 md:p-6", children: children })] })] }));
}
