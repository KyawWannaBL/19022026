import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LayoutDashboard, Package, PlusCircle, MapPin, Warehouse, BadgeDollarSign, Users, BarChart3, Settings, LogOut, Bell, Search, ChevronRight, User as UserIcon, Languages, Upload, Globe, DollarSign, Shield, MessageSquare } from 'lucide-react';
import { ROUTE_PATHS, USER_ROLES } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { IMAGES } from '@/assets/images';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
const NAV_ITEMS = [
    {
        labelKey: 'nav.dashboard',
        path: ROUTE_PATHS.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        labelKey: 'nav.wayManagement',
        path: ROUTE_PATHS.WAY_MANAGEMENT,
        icon: Package,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MERCHANT, USER_ROLES.RIDER, USER_ROLES.WAREHOUSE, USER_ROLES.MANAGER],
    },
    {
        labelKey: 'nav.createDelivery',
        path: ROUTE_PATHS.CREATE_SHIPMENT,
        icon: PlusCircle,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MERCHANT],
    },
    {
        labelKey: 'way.trackingMap',
        path: ROUTE_PATHS.TRACKING,
        icon: MapPin,
    },
    {
        labelKey: 'nav.merchants',
        path: ROUTE_PATHS.MERCHANTS,
        icon: Warehouse,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.WAREHOUSE],
    },
    {
        labelKey: 'nav.deliverymen',
        path: ROUTE_PATHS.DELIVERYMEN,
        icon: Users,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'nav.accounting',
        path: ROUTE_PATHS.ACCOUNTING,
        icon: BadgeDollarSign,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ACCOUNTANT],
    },
    {
        labelKey: 'nav.reporting',
        path: ROUTE_PATHS.REPORTS,
        icon: BarChart3,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.ACCOUNTANT],
    },
    {
        labelKey: 'Reports Center',
        path: ROUTE_PATHS.REPORTS_CENTER,
        icon: BarChart3,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.ACCOUNTANT],
    },
    {
        labelKey: 'nav.settings',
        path: ROUTE_PATHS.SETTINGS,
        icon: Settings,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    // Comprehensive Admin System Navigation
    {
        labelKey: 'admin.userManagement',
        path: ROUTE_PATHS.ADMIN_USER_MANAGEMENT,
        icon: Users,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'bulk.orderUpload',
        path: ROUTE_PATHS.ADMIN_BULK_UPLOAD,
        icon: Upload,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    },
    {
        labelKey: 'tariff.mmkConfiguration',
        path: ROUTE_PATHS.SETTINGS_TARIFF,
        icon: Globe,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'admin.systemOverview',
        path: ROUTE_PATHS.ADMIN_SYSTEM_OVERVIEW,
        icon: LayoutDashboard,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'QA Testing',
        path: ROUTE_PATHS.QA_TESTING,
        icon: Settings,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'Dispatch Control',
        path: ROUTE_PATHS.DISPATCH_CONTROL,
        icon: Settings,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    },
    {
        labelKey: 'HR Management',
        path: ROUTE_PATHS.HR_MANAGEMENT,
        icon: Users,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN],
    },
    {
        labelKey: 'Financial Management',
        path: ROUTE_PATHS.FINANCIAL_MANAGEMENT,
        icon: DollarSign,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.ACCOUNTANT],
    },
    {
        labelKey: 'System Administration',
        path: ROUTE_PATHS.SYSTEM_ADMINISTRATION,
        icon: Shield,
        roles: [USER_ROLES.SUPER_ADMIN],
    },
    {
        labelKey: 'Business Intelligence',
        path: ROUTE_PATHS.BUSINESS_INTELLIGENCE,
        icon: BarChart3,
        roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MANAGER],
    },
    // Marketer Navigation
    {
        labelKey: 'marketer.dashboard',
        path: ROUTE_PATHS.MARKETER_DASHBOARD,
        icon: BarChart3,
        roles: [USER_ROLES.MARKETER],
    },
    // Customer Service Navigation
    {
        labelKey: 'cs.dashboard',
        path: ROUTE_PATHS.CS_DASHBOARD,
        icon: MessageSquare,
        roles: [USER_ROLES.CUSTOMER_SERVICE],
    },
];
export function Layout({ children }) {
    const { user, logout, isAuthorized } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { t, language, toggleLanguage } = useLanguageContext();
    const filteredNavItems = NAV_ITEMS.filter((item) => !item.roles || isAuthorized(item.roles));
    const handleLogout = () => {
        logout();
        navigate(ROUTE_PATHS.HOME);
    };
    const SidebarContent = () => (_jsxs("div", { className: "flex flex-col h-full bg-sidebar text-sidebar-foreground", children: [_jsxs("div", { className: "p-6 flex items-center gap-3", children: [_jsx("img", { src: IMAGES.BRITIUM_LOGO_55, alt: "Britium Express Logo", className: "h-10 w-auto" }), _jsxs("div", { children: [_jsx("h1", { className: "font-bold text-lg tracking-tight leading-none", children: "Britium" }), _jsx("p", { className: "text-[10px] uppercase tracking-widest text-sidebar-foreground/50 mt-1", children: "Express Logistics" })] })] }), _jsx(ScrollArea, { className: "flex-1 px-3", children: _jsx("div", { className: "space-y-1 py-4", children: filteredNavItems.map((item) => (_jsxs(NavLink, { to: item.path, onClick: () => setIsMobileOpen(false), className: ({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group", isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"), children: [_jsx(item.icon, { className: "w-5 h-5 shrink-0" }), _jsx("span", { className: "font-medium", children: t(item.labelKey) }), location.pathname === item.path && (_jsx(ChevronRight, { className: "ml-auto w-4 h-4" }))] }, item.path))) }) }), _jsx("div", { className: "p-4 border-t border-sidebar-border mt-auto", children: _jsxs("div", { className: "flex items-center gap-3 p-2 rounded-xl bg-sidebar-accent/50", children: [_jsxs(Avatar, { className: "w-9 h-9 border-2 border-sidebar-border", children: [_jsx(AvatarImage, { src: user?.avatar_url }), _jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xs font-bold", children: user?.full_name.split(' ').map((n) => n[0]).join('') })] }), _jsxs("div", { className: "flex-1 overflow-hidden", children: [_jsx("p", { className: "text-sm font-semibold truncate", children: user?.full_name }), _jsx("p", { className: "text-[10px] text-sidebar-foreground/60 uppercase tracking-tighter truncate", children: user?.role.replace('_', ' ') })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-sidebar-foreground/40 hover:text-destructive transition-colors hover:bg-destructive/10", onClick: handleLogout, children: _jsx(LogOut, { className: "w-4 h-4" }) })] }) })] }));
    return (_jsxs("div", { className: "flex min-h-screen bg-background", children: [_jsx("aside", { className: "hidden lg:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-border", children: _jsx(SidebarContent, {}) }), _jsxs("div", { className: "flex-1 flex flex-col lg:pl-64", children: [_jsx("header", { className: "sticky top-0 z-40 w-full h-16 border-b border-border bg-background/80 backdrop-blur-md", children: _jsxs("div", { className: "flex items-center justify-between h-full px-4 md:px-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Sheet, { open: isMobileOpen, onOpenChange: setIsMobileOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", children: _jsx(Menu, { className: "w-5 h-5" }) }) }), _jsx(SheetContent, { side: "left", className: "p-0 w-64 border-none", children: _jsx(SidebarContent, {}) })] }), _jsxs("div", { className: "relative hidden md:flex items-center", children: [_jsx(Search, { className: "absolute left-3 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "Search shipments, tracking IDs...", className: "pl-9 pr-4 py-1.5 bg-muted/50 border-none rounded-full text-sm w-64 lg:w-80 focus:ring-1 focus:ring-primary focus:bg-background transition-all" })] })] }), _jsxs("div", { className: "flex items-center gap-2 lg:gap-4", children: [_jsxs(Button, { variant: "ghost", size: "icon", onClick: toggleLanguage, className: "relative hover:bg-muted/50", title: language === 'en' ? 'Switch to Myanmar' : 'Switch to English', children: [_jsx(Languages, { className: "w-5 h-5" }), _jsx("span", { className: "absolute -bottom-1 -right-1 text-[8px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center", children: language.toUpperCase() })] }), _jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [_jsx(Bell, { className: "w-5 h-5" }), _jsx("span", { className: "absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background" })] }), _jsx(Separator, { orientation: "vertical", className: "h-6 hidden sm:block" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "flex items-center gap-2 p-1 pl-2 hover:bg-muted/50 rounded-full", children: [_jsx("span", { className: "hidden sm:inline text-sm font-medium", children: user?.full_name }), _jsxs(Avatar, { className: "w-8 h-8", children: [_jsx(AvatarImage, { src: user?.avatar_url }), _jsx(AvatarFallback, { className: "bg-secondary text-secondary-foreground text-xs", children: user?.full_name.split(' ').map((n) => n[0]).join('') })] })] }) }), _jsxs(DropdownMenuContent, { align: "end", className: "w-56 mt-2", children: [_jsxs(DropdownMenuLabel, { className: "flex flex-col", children: [_jsx("span", { className: "font-bold", children: user?.full_name }), _jsx("span", { className: "text-xs text-muted-foreground font-normal", children: user?.email })] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.SETTINGS), children: [_jsx(UserIcon, { className: "mr-2 w-4 h-4" }), t('nav.settings')] }), _jsxs(DropdownMenuItem, { onClick: () => navigate(ROUTE_PATHS.DASHBOARD), children: [_jsx(LayoutDashboard, { className: "mr-2 w-4 h-4" }), t('nav.dashboard')] }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { className: "text-destructive focus:text-destructive", onClick: handleLogout, children: [_jsx(LogOut, { className: "mr-2 w-4 h-4" }), t('nav.logout')] })] })] })] })] }) }), _jsx("main", { className: "flex-1 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500", children: _jsx("div", { className: "max-w-7xl mx-auto", children: children }) }), _jsx("footer", { className: "p-4 md:p-6 border-t border-border text-center text-xs text-muted-foreground", children: _jsxs("p", { children: [t('company.copyright'), " - ", t('company.name')] }) })] })] }));
}
