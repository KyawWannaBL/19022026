<!-- Page: 1 -->

# Britium Logistics Platform: Component Implementation Guide

## Table of Contents

Layouts

src/layouts/AdminLayout.tsx

Public Screens

src/pages/public/BritiumCustomerTrackingApp.tsx

src/pages/public/ShippingCalculator.tsx

src/pages/public/ReceiverTracking.tsx

Merchant Portal

src/pages/portal/MerchantPortal.tsx

src/pages/portal/CreateShipment.tsx

src/pages/portal/BulkUpload.tsx

src/pages/portal/MerchantPickups.tsx

src/pages/portal/MerchantFinance.tsx

Operational Screens

src/pages/operations/BritiumDispatchControl.tsx

src/pages/operations/BritiumWarehouseOperations.tsx

src/pages/operations/WayManagement.tsx

Administrative Screens

src/pages/admin/BritiumFinancialCenter.tsx

src/pages/admin/BritiumHRmanagement.tsx

src/pages/admin/BritiumAnalyticsReport.tsx

src/pages/admin/BritiumSystemAdminConsole.tsx

src/pages/admin/BritiumIntegrationTesting.tsx

src/pages/admin/AdminManagement.tsx

src/pages/admin/AdminUser.tsx

src/pages/admin/Settings.tsx

Rider App Screens

src/pages/rider/RiderDashboard.tsx

src/pages/rider/RiderTaskList.tsx

<!-- Page: 2 -->

src/pages/rider/JobDetailScreen.tsx

src/pages/rider/RiderPickupConfirm.tsx

src/pages/rider/RiderDeliveryConfirm.tsx

src/pages/rider/RiderException.tsx

src/pages/rider/RiderWallet.tsx

src/pages/rider/RiderProfile.tsx

This document provides a detailed implementation guide for the core components of the Britium Logistics Platform. Built with React and TypeScript, the architecture emphasizes scalability, type safety, and maintainability. The code follows modern best practices, including a modular, feature- based structure, clear separation of concerns, and robust state management patterns. Each component is designed to be self-contained yet integrated within the larger application ecosystem.

## Layouts

Layout components define the shared UI structure across multiple pages, such as headers, sidebars, and navigation menus. They are crucial for maintaining a consistent user experience.

## src/layouts/AdminLayout.tsx

The AdminLayout is the primary shell for all authenticated sections of the application. It uses React';s Context API for state management of authentication and sidebar visibility. It includes a main content area where child routes are rendered via the Outlet component from react-router-dom. This pattern ensures that authentication status is available throughout the protected parts of the app.

```
// src/layout/AdminLayout.tsx
import React, { useState, createContext, useContext } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';

// --- Mock Data & Types ---
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'dispatcher' | 'warehouse_manager' | 'finance' | 'hr';
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

// --- Authentication Context ---
const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
};
```

<!-- Page: 3 -->

```
if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
}
return context;
};

// A mock AuthProvider. In a real app, this would handle JWTs, sessions, etc.
const AuthProvider = ( { children }: { children: React.ReactNode }) => {
    // Mock user state, assuming the user is logged in for this layout
    const [user, setUser] = useState<User | null>({
        id: 'user-001',
        name: 'Admin User',
        email: 'admin@britium.com',
        role: 'admin',
    });
    const logout = () => {
        setUser(null);
        // In a real app, you'd clear tokens and redirect.
        console.log('User logged out.");
    };
};

// If no user, redirect to login page
if (!user) {
    return <Navigate to="/login" replace />;
}

const value = { user, logout };
return <AuthContext.Provider value={value}>{children}<AuthContext.Provider>;
};

// --- Layout Components ---
const Header = () => {
    const { user, logout } = useAuth();
    return (
        <header style={styles.header}>
            <h2>Britium Admin</h2>
            <div>
                <span>Welcome, {user?.name}</span>
                <button onClick={logout} style={styles.logoutButton}>Logout</button>
            </div>
        </header>
    );
};

const Sidebar = () => {
    const { user } = useAuth();
    // Conditionally render links based on user role
    const navLinks = [
        { path: '/portal', label: 'Merchant Portal', roles: ['admin'] },
        { path: '/operations/dispatch', label: 'Dispatch Control', roles: ['admin', 'dispatcher'] },
        { path: '/operations/warehouse', label: 'Warehouse Ops', roles: ['admin', 'warehouse_manager'] },
        { path: '/admin/financials', label: 'Financial Center', roles: ['admin', 'finance'] },
        { path: '/admin/hr', label: 'HR Management', roles: ['admin', 'hr'] },
        { path: '/admin/analytics', label: 'Analytics', roles: ['admin'] },
        { path: '/admin/system', label: 'System Console', roles: ['admin'] },
    ];

    return (
        <aside style={styles. sidebar}>
            <nav>
                <ul style={styles.navList}>
                    {navLinks.filter(link => link.roles.includes(user!.role)).map(link => {
                    <li key={link.path}>
                        <Link to={link.path} style={styles.navLink}>{link.label}<link>
                    </li>
                </ul>
                </nav>
                </aside>
            </nav>
        );
    };
};

// --- Main Layout Component ---
const AdminLayout = () => {
    return (
```

<!-- Page: 4 -->

```
<AuthProvider>
    <div style={styles.layout}>
        <Sidebar />
        <div style={styles.main}>
            <Header />
            <main style={styles.content}>
                <Outlet />
                </outlet>
            </main>
        </div>
    </div>
</AuthProvider>
);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    layout: { display: 'flex', minHeight: '100vh' },
    sidebar: { width: '250px', background: '#2c3e50', color: 'white', padding: '20px' },
    main: { flex: 1, display: 'flex', flexDirection: 'column' },
    header: { background: '#fff', padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    content: { padding: '20px', background: '#f4f6f8', flex: 1 },
    navList: { listStyle: 'none', padding: 0 },
    navLink: { color: 'white', textDecoration: 'none', display: 'block', padding: '10px 0', borderRadius: '4px' },
    logoutButton: { marginLeft: '15px', padding: '8px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default AdminLayout;
```

## Public Screens

These screens are accessible to the general public without authentication and serve specific, focused purposes like tracking a shipment or calculating shipping costs.

## src/pages/public/BritiumCustomerTrackingApp.tsx

This component provides a simple interface for customers to track their shipments. It features a single input field for the tracking ID and displays the shipment status and history upon a successful lookup. State is managed locally with useState, and data fetching is simulated in a custom hook useShipmentTracking.

```
// src/pages/public/BritiumCustomerTrackingApp.tsx
import React, { useState, useEffect } from 'react';

// --- Mock Data & Types ---
interface TrackingEvent {
    timestamp: string;
    status: string;
    location: string;
}

interface Shipment {
    trackingId: string;
    status: 'In Transit' | 'Delivered' | 'Delayed' | 'Out for Delivery';
    estimatedDelivery: string;
    history: TrackingEvent[];
}

// --- Custom Hook for API Logic ---
const useShipmentTracking = (trackingId: string) => {
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
```

<!-- Page: 5 -->

```
if (!trackingId) {
    setShipment(null);
    return;
}

const fetchShipmentData = async () => {
    setLoading(true);
    setError(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock API response
    if (trackingId.toUpperCase() === 'BRT12345') {
        setShipment({
            trackingId: 'BRT12345',
            status: 'In Transit',
            estimatedDelivery: '2026-02-02',
            history: [
                { timestamp: '2026-01-29T10:00:00Z', status: 'Picked Up', location: 'Warehouse A, Metropolis'
                    { timestamp: '2026-01-29T18:30:00Z', status: 'Departed Facility', location: 'Metropolis Hub'
                    { timestamp: '2026-01-30T08:00:00Z', status: 'Arrived at Hub', location: 'Gotham City Hub'
                },
                });
            }
        }
    } else {
        setError('Tracking ID not found. Please check the number and try again.');
        setShipment(null);
    }
    setLoading(false);
};

fetchShipmentData();
}, [trackingId]);

return { shipment, loading, error };

// --- UI Components ---
const TrackingResult = (shipment, error) : { shipment: Shipment | null, error: string | null } => {
    if (error) {
        return <div style={styles.error}>{error}<div><nl><fcel>if (!shipment) {
    return <div>Enter a tracking ID to see shipment status.<div><nl><fcel>return (
    <div style={styles.resultContainer}>
    <h3>Tracking ID: {shipment.trackingId}<h3>
    <p><strong>Status:<strong> {shipment.status}<p>
    <p><strong>Estimated Delivery:<strong> {shipment.estimatedDelivery}<p>
    <h4>History</h4>
    <ul style={styles.historyList}>
    <shipment.history.map((event, index) => {
        <li key={index} style={styles.historyItem}>
            <div><strong>Event.status</strong> at {new Date(event.timestamp).toLocaleString()}</div>
            <div><event.location></div>
        </li>
    })
    </ul>
    </div>
</div>
);

// --- Main Page Component ---
const BritiumCustomerTrackingApp = () => {
    const [inputValue, setInputValue] = useState('');
    const [submittedId, setSubmittedId] = useState('');
    const { shipment, loading, error } = useShipmentTracking(submittedId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedId(inputValue);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Track Your Britium Shipment</h1>
            <p>Enter your tracking ID below to see the latest updates on your delivery.</p>
            <form onSubmit={handleSubmit} style={styles.form}><nl>
```

<!-- Page: 6 -->

```
<input type="text" value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="e.g., BRT12345" style={styles.input}
</button>
<button type="submit" style={styles.button} disabled={loading}>
{loading? 'Tracking...': 'Track'}
</button>
</form>
{loading? <div>Loading...</div> : <TrackingResult shipment={shipment} error={error} />}
</div>
);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    container: { maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', color: '#2c3e50' },
    form: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: { flex: 1, padding: '12px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '4px' },
    button: { padding: '12px 20px', fontSize: '16px', background: '#1a8917', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    resultContainer: { marginTop: '30px' },
    error: { color: '#e74c3c', padding: '15px', background: '#fbe9e7', border: '1px solid #e74c3c', borderRadius: '4px' },
    historyList: { listStyle: 'none', padding: 0, borderLeft: '2px solid #ddd', marginLeft: '10px' },
    historyItem: { padding: '10px 20px', position: 'relative' },
};

export default BritiumCustomerTrackingApp;
```

## src/pages/public/ShippingCalculator.tsx

This component provides a real-time shipping rate calculator for both domestic and international destinations. It fetches live rates from a backend (simulated via Supabase) and calculates the cost based on weight and dimensions. The UI is built using `shadcn-ui` components and styled with Tailwind CSS.

```
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Your supabase client
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // shadcn-ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plane, Truck } from 'lucid-react';

export const ShippingCalculator = () => {
    const [loading, setLoading] = useState(false);
    const [intlRates, setIntlRates] = useState%；

    // Inputs
    const [mode, setMode] = useState('domestic');
    const [weight, setWeight] = useState(0);
    const [dims, setDims] = useState({ l: 0, w: 0, h: 0 });
    const [selectedCountry, setSelectedCountry] = useState；

    // Results
    const [quote, setQuote] = useState(null);
    const [breakdown, setBreakdown] = useState；

    // Fetch live rates on mount
    useEffect(() => {
        const fetchRates = async () => {
            const { data } = await supabase.from('pricing_international').select；
            if (data) setIntlRates(data);
        };
        fetchRates();
    }, []);

    const calculateIntl = () => {
        setLoading(true);
        // Logic from your HTML prototype converted to TypeScript
        const divisor = 5000; // Standard Air Cargo
    };
}
```

<!-- Page: 7 -->

```
const volWeight = (dims.1 * dims.w * dims.h) / divisor;
const chargeable = Math.max(weight, volWeight);
const countryRate = intlRates.find(c => c.country_name === selectedCountry);

if (countryRate) {
    // Simple logic: using the base rate provided in your table
    const total = chargeable * countryRate.base_rate_5_10kg;
    setQuote(total);
    setBreakdown('Chargeable Weight: ${chargeable.toFixed(2)} kg (Volumetric: ${volWeight.toFixed(2)} kg)');
}

setLoading(false);

return (
    <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
            <CardTitle>Shipping Rate Calculator</CardTitle>
            <p className="text-gray-500">Real-time quotes based on current Britium rates.</p>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="domestic" value="setMode(value)}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="domestic">
                        <TabsTrigger value="international">
                            <Plane className="w-4 h-4 mr-2"/>
                            <TabsTrigger value="International">
                                <TabsList>
                                    <TabsContent value="domestic">
                                        {/* DOMESTIC FORM */}
                                    <div className="p-4 space-y-4">
                                        <p>Simplified for brevity - Logic mirrors your HTML "calculateDomestic"></p>
                                        <select onChange={(e) => console.log(e.target.value)}>
                                            <option>Yangon</option>
                                        </option>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </div>
                </TabsContent>
            </TabsContent>
        </TabsContent>
    </TabsContent>
</Card>
```

};

<!-- Page: 8 -->

# src/pages/public/ReceiverTracking.tsx

A visually rich tracking page for the end customer. It features a map placeholder, a timeline of tracking events, and actions for the receiver, such as rescheduling or redirecting a package. This component is mobile-first and uses `lucide-react` for icons and Tailwind CSS for styling.

```
import React, { useState } from 'react';
import { Truck, MapPin, Calendar, Box, ChevronRight, Clock, ShieldCheck } from 'lucid-react';

const ReceiverTracking = () => {
    const [showReschedule, setShowReschedule] = useState(false);

    const events = [
        { status: 'Out for Delivery', time: '10:30 AM', date: 'Today', active: true, desc: 'Rider Kyaw Kyaw is on the way.' },
        { status: 'Arrived at Hub', time: '08:15 AM', date: 'Today', active: false },
        { status: 'Picked Up', time: '04:00 PM', date: 'Yesterday', active: false },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-lg mx-auto">
                {/* 1. Header Map Placeholder */}
                <div className="h-64 bg-gray-300 relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/Yangon_map.png bg-cover bg-center mix-blend-overlay">
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent text-white">
                <p className="text-sm">Estimated Delivery</p>
                <p className="font-bold text-xl">Today, 2:00 PM</p>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div className="p-4 space-y-6">
        {/* 2. Timeline */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold mb-4">Tracking History</h3>
            <div>
                {events.map((e, i) => {
                <div key={i} className="flex gap-4">
                    <div className="text-sm text-gray-400">{{e.status}}</div>
                    <div className="text-sm">{{e.date}} • {{e.time}}</div>
                    {{e.desc && <p className="text-xs text-gray-500">{{e.desc</p>}}}
                </div>
            })
            </div>
        </div>
    </div>
    <div className="space-y-3">
        <h3 className="font-bold">Delivery Preferences</h3>
        <button
            onClick={() => setShowReschedule(true)}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
            <div className="flex items-center gap-4">
                <Calendar />
                <div>
                    <p className="font-bold">Reschedule Delivery</p>
                    <p className="text-sm text-gray-500">Not home today? Change date.</p>
                </div>
            </div>
        </div>
        <ChevronRight />
    </button>
    <button className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
        <MapPin />
        <span>Redirect Package</span>
        <ChevronRight />
    </button>
    <button className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 active:bg-gray-50">
        <shieldCheck />
        <span>Leave with Neighbor / Guard</span>
        <ChevronRight />
    </button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

```

<!-- Page: 9 -->

```
<div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full">
    <h3 className="font-bold text-lg">Verify Identity</h3>
    <p className="text-gray-600 my-4">We will send an OTP to 09****678 to verify you are the owner.</p>
    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Send OTP</button>
    <button onClick={() => setShowReschedule(false)} className="w-full text-gray-500 font-bold py-3">Cancel</button>
</div>
</div>
</div>
</div>
);
export default ReceiverTracking;
```

## Merchant Portal

The Merchant Portal is a comprehensive suite of tools for B2B clients to manage shipments, track finances, and oversee their logistics operations. The following components are styled with Tailwind CSS and are designed to be rendered within a unified dashboard layout.

## src/pages/portal/MerchantPortal.tsx

This is the main container for the entire merchant experience. It includes a persistent sidebar for navigation and a main content area that dynamically renders different sections like the dashboard, order management, and analytics based on user interaction. It uses `lucide-react` for icons and defines several reusable sub-components.

```
import React, { useState } from 'react';
import {
    LayoutDashboard, Package, Upload, FileText, Warehouse,
    BarChart3, CreditCard, Code, Bell, Truck, TrendingUp,
    MapPin, RefreshCw, Eye, Download, Filter, UploadCloud,
    FileSpreadsheet, CheckCircle, Clock, XCircle, AlertTriangle,
    DollarSign, Edit, Search, Plus, ArrowUpRight, Copy,
    Activity, Zap, BookOpen, Play, Mail, Smartphone, MessageCircle,
    ChevronDown, LogOut, User, Settings, HelpCircle, Wallet, Calendar
} from 'lucid-react';

const MerchantPortal = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- MOCK DATA FOR CHARTS & TABLES ---
    const recentOrders = [
        { id: '#BE001247', customer: 'John Doe', loc: 'Mumbai', status: 'Delivered', amount: '₹1,250', statusColor: 'bg-green-100'
        text-green-700' },
        { id: '#BE001246', customer: 'Sarah Smith', loc: 'Delhi', status: 'In Transit', amount: '₹890', statusColor: 'bg-yellow-10'
        text-yellow-700' },
        { id: '#BE001245', customer: 'Mike Johnson', loc: 'Bangalore', status: 'Processing', amount: '₹2,100', statusColor: 'bg-blue-100'
        text-blue-700' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-64 bg-white shadow-lg">
                {/* --- TOP NAVIGATION --- */}
                <div className="flex items-center justify-between p-4 border-b">
                    <span className="font-bold text-xl">Britium Express</span>
                    <p>Business Portal</p>
                </div>
                <div className="p-4 border-b">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold">M</div>
                    <div className="ml-3">
                        <p className="font-semibold">Merchant Store</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
```

<!-- Page: 10 -->

```
<p className="text-xs text-gray-500">Premium Account</p>
</div>
</div>
</div>

{/* --- SIDEBAR NAVIGATION --- */}
<nav className="flex-1 p-4 space-y-2">
<NavButton active={activeSection === 'dashboard'} onClick={() => setActiveSection('dashboard')} icon={<LayoutDashboard />} label="Dashboard" />
<NavButton active={activeSection === 'orders'} onClick={() => setActiveSection('orders')} icon={<Package />} label="Order Management" />
<NavButton active={activeSection === 'bulk'} onClick={() => setActiveSection('bulk')} icon={<Upload />} label="Bulk Upload" />
<NavButton active={activeSection === 'invoices'} onClick={() => setActiveSection('invoices')} icon={<FileText />} label="Invoices & Billing" />
<NavButton active={activeSection === 'inventory'} onClick={() => setActiveSection('inventory')} icon={<Warehouse />} label="Inventory Tracking" />
<NavButton active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')} icon={<BarChart3 />} label="Analytics & Reports" />
<NavButton active={activeSection === 'payments'} onClick={() => setActiveSection('payments')} icon={<CreditCard />} label="Payment Center" />
<NavButton active={activeSection === 'api'} onClick={() => setActiveSection('api')} icon={<Code />} label="API Integration" />
<NavButton active={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} icon={<Bell />} label="Notifications" />
</nav>
</div>
```

```
{/* --- MAIN CONTENT AREA --- */}
<main className="flex-1 p-8 overflow-y-auto">
{/* 1. DASHBOARD SECTION */}
{activeSection === 'dashboard' && (
<div>
<h1 className="text-3xl font-bold">Business Dashboard</h1>
<p className="text-gray-500 mb-8">Welcome back! Here's your business overview for today.</p>
{/* Metrics Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
<MetricCard title="Total Shipments" value="1,250" trend="+12.5%" trendUp={true} icon={<Truck />} color="blue" />
<MetricCard title="Delivered" value="1,180" trend="+9.8%" trendUp={true} icon={<CheckCircle />} color="green" />
<MetricCard title="In Transit" value="50" trend="-5.2%" trendUp={false} icon={<RefreshCw />} color="orange" />
<MetricCard title="Exceptions" value="20" trend="+2.1%" trendUp={true} icon={<AlertTriangle />} color="purple" />
</div>
{/* Charts Mockup */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
<div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
<h3 className="font-bold">Order Trends</h3>
<p className="text-sm text-gray-500">Last 7 days</p>
{/* CSS-only Chart Simulation */}
<div className="flex items-end h-48 mt-4 space-x-2">
{[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
<div key={i} className="flex-1 bg-blue-500 rounded-t-md" style={height: `${h%`}}></div>
)}
</div>
<div className="flex justify-between text-xs text-gray-500 mt-2">
<span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow">
<h3 className="font-bold">Delivery Status</h3>
{/* Simple Donut Chart Representation */}
<div className="relative w-40 h-40 mx-auto mt-4">
<div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">94%</div>
</div>
<div className="mt-4 space-y-2 text-sm">
<p>Delivered (65%)</p>
<p>Transit (20%)</p>
<p>Processing (15%)</p>
</div>
</div>
</div>
{/* Recent Orders Table */}
<div className="bg-white p-6 rounded-lg shadow">
<div className="flex justify-between items-center mb-4">
<h3 className="font-bold">Recent Orders</h3>
<button onClick={() => setActiveSection('orders')} className="text-blue-600 text-sm font-medium hover:underline">View All</button>
</div>
<table className="w-full text-left">
<thead>
```

<!-- Page: 11 -->

```
<tr className="text-xs text-gray-500 uppercase">
    <th>Order ID</th><th>Customer</th><th>Destination</th><th>Status</th><th>Amount</th><th>Actions</th>
</tr>
</thead>
<tbody>
    {recentOrders.map((order, idx) => (
        <tr key={idx} className="border-b">
            <td>order.id</td>
            <td>customer</td>
            <td>order.loc</td>
            <td>status</td>
            <td>amount</td>
            <td>button</td>
        </tr>
    </tbody>
</table>
</div>
</div>
</div>

{/* 2. ORDERS SECTION (Simplified) */}
{activeSection === 'orders' && {
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p>Manage all your orders and shipments</p>
    </div>
    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
        <Plus className="mr-2" /> Create New Order
        </plus>
    </div>
    <div className="flex gap-4 mb-4">
        <select><option>All Status</option><option>Delivered</option></select>
        <input type="search" placeholder="Search" />
    </div>
    {/* Expanded Table */}
    <div className="bg-white rounded-lg shadow">
        <table className="w-full text-left">
            <thead><tr><th>Order Details</th><th>Customer</th><th>Shipping</th><th>Status</th><th>Actions</th></tr></table>
            {[1, 2, 3, 4, 5].map((i) => {
                <tr key={i} className="border-b">
                    <td>\#BE00124{i}<br />Jan 27, 2026</td>
                    <td>Customer {i}<br />+95 9 123 456</td>
                    <td>Yangon → Mandalay</td>
                    <td>Delivered</td>
                    <td>button</td>
                </tr>
            </tr>
        </tr>
    </div>
    </div>
</table>
</tr>
</tr>
</div>
</div>

{/* 3. UPLOAD & OTHER SECTIONS (Placeholder Visuals) */}
{activeSection === 'bulk' && {
    <div className="text-center p-10 bg-white rounded-lg shadow">
        <UploadCloud className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">Drop your CSV/Excel files here</h3>
        <p className="text-gray-500">or click to browse</p>
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg">Browse Files</button>
        <div className="mt-8">
            <h4>Download Templates</h4>
            <button>CSV Format</button>
            <button>Excel Format</button>
        </div>
        <div className="mt-8">
            <h4>Upload History</h4>
        </div>
    </div>
</div>

{/* 4. API & PAYMENTS (Simple representations) */}
{activeSection === 'payments' && {
    <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Paid Out" value="₹1,250,000" trend="+5%" trendUp={true} icon={<DollarSign />}
    </div>
</div>
</tr>
</table>
</div>
</tr>
</tr>
</div>
</div>
</table>
</p>
</div>
</p>
</div>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p>
</p
```

<!-- Page: 12 -->

```
<MetricCard title="Pending Payout" value="₹89,000" trend="trendUp={false} icon={<Clock />} color="yellow" />
<MetricCard title="Next Payout Date" value="Feb 15, 2026" trend="trendUp={false} icon={<Calendar />} color="blue" />
</div>
<div className="bg-white p-6 rounded-lg shadow">
    <h3 className="font-bold mb-4">Payment Methods</h3>
    <div className="flex items-center justify-between p-4 border rounded-lg">
        <div>
            <p>⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ ⋯⋯ 
```

);

<!-- Page: 13 -->

```
const MetricCard = ( { title, value, trend, trendUp, icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500"> {title}<p>
                    <p className="text-3xl font-bold mt-1"> {value}<p>
                </div>
                <div className={`p-2 rounded-full bg-{color}-100 text-{color}-600`}> {icon}<div>
                    <p className={`text-xs mt-2 flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {trend} vs last month
                </p>
            </div>
        );
    };
    const UploadItem = ( { name, size, status }: any) => {
        const icon = status === 'success' ? <CheckCircle /> : status === 'failed' ? <XCircle /> : <Clock />;
        const bg = status === 'success' ? 'bg-green-50 border-green-200': status === 'failed' ? 'bg-red-50 border-red-200': 'bg-yellow-50 border-yellow-200';
        return (
            <div className={`flex items-center p-3 border rounded-lg ${bg}`}>
                {icon}
                <div className="ml-3">
                    <p className="font-medium"> {name}<p>
                        <p className="text-sm text-gray-500"> {size}<p>
                    </div>
                </div>
            )
        };
    };
    const InputGroup = ( { label, placeholder, type = "text" }: any) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> {label}<label>
                <input type={type} placeholder={placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
        );
    }
);

export default MerchantPortal;
```

## src/pages/portal/CreateShipment.tsx

A multi-step form for merchants to create a single shipment. It guides the user through four steps: Pickup, Receiver, Parcel, and Service details. The state is managed locally, and the UI provides clear progression and validation cues.

```
import React, { useState } from 'react';
import { ChevronRight, Package, Truck, CreditCard, MapPin, CheckCircle } from 'lucid-react';

const CreateShipment = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        pickupId: "", // Links to addresses table
        receiverName: "",
        receiverPhone: "",
        receiverAddress: "",
        weight: "",
        dims: { l: "", w: "", h: "" },
        serviceType: 'normal', // Matches SQL Enum: 'express', 'normal', 'same_day'
        isCod: false,
        codAmount: 0,
        declaredValue: 0,
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return {
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
            {/* Progress Stepper */}
            <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                    {
                        { id: 1, label: 'Pickup', icon: MapPin },
                    }
                </div>
            </div>
        </div>
    };
};
```

<!-- Page: 14 -->

```
{ id: 2, label: 'Receiver', icon: Truck },
{ id: 3, label: 'Parcel', icon: Package },
{ id: 4, label: 'Service', icon: CreditCard }
].map((s) => {
    <div key={s.id} className="flex items-center">
        <div className={'w-8 h-8 rounded-full flex items-center justify-center ${step >= s.id ? 'bg-blue-600': 'bg-gray-600'}">
            <s.icon className="w-5 h-5 text-white" />
        </div>
        <span className={'ml-2 font-bold ${step >= s.id ? 'text-blue-600': 'text-gray-400'}'}>
        <div>
        </div>
    </div>
</div>

<div className="p-8">
    {/* STEP 1: Pickup Details */}
    {step === 1 && {
        <div>
            <h3 className="font-bold text-xl mb-4">Select Pickup Location</h3>
            <div className="space-y-3">
                {['Main Warehouse', 'Downtown Store', 'Home Office'].map((loc) => {
                    <div key={loc} className="p-4 border rounded-lg flex justify-between items-center cursor-pointer hover:border-500">
                        <div>
                            <p className="font-bold">{loc}</p>
                            <p className="text-sm text-gray-500">123 Merchant Road, Yangon</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button className="mt-4 text-blue-600 font-bold">+ Add New Address</button>
</div>

{/* STEP 2: Receiver Details */}
{step === 2 && {
    <div>
        <h3 className="font-bold text-xl mb-4">Receiver Details</h3>
        <div className="space-y-4">
            <input placeholder="Full Name" />
            <input placeholder="Phone Number" />
            <textarea placeholder="Full Address"></textarea>
        </div>
    </div>
}

{/* STEP 3: Parcel Details */}
{step === 3 && {
    <div>
        <h3 className="font-bold text-xl mb-4">Parcel Information</h3>
        <div className="grid grid-cols-2 gap-4">
            <input placeholder="Weight (Kg)" />
            <input placeholder="Declared Value (MMK)" />
            <div className="col-span-2">
                <label>Dimensions (cm) - Optional</label>
                <div className="flex gap-2">
                    <input placeholder="L" />
                </div>
                <div className="col-span-2 flex gap-4">
                    <label><input type="checkbox" /> Fragile</label>
                    <label><input type="checkbox" /> Bulky / Oversize</label>
                </div>
            </div>
        </div>
    }
}

{/* STEP 4: Service & COD */}
{step === 4 && {
    <div>
        <h3 className="font-bold text-xl mb-4">Service & Payment</h3>
        <div>
            <label className="font-semibold">Service Type</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
                {
                    { id: 'normal', label: 'Standard', price: '2,000 Ks', time: '2-3 Days' },
                    { id: 'express', label: 'Express', price: '3,500 Ks', time: 'Next Day' },
                    { id: 'same_day', label: 'Same Day', price: '5,000 Ks', time: 'Today' }
                ].map((srv) => {
                    <button key={srv.id} onClick={() => setFormData({...formData, serviceType:srv.id})}
                }
            }
        </div>
    </div>
}
```

<!-- Page: 15 -->

```
<p>\(srv.label</p>\)
<p>\(srv.time</p>\)
<p>\(srv.price</p>\)
</button>
</div>
</div>
<div className="mt-6">
<label className="flex items-center">
<input type="checkbox" checked={formData.isCod} onChange={(e)} => setFormData({...formData, isCod: e.target.checked}) />
<span className="ml-2 font-semibold">Cash on Delivery (COD)</span>
</label>
<formData.isCod && {
<div className="mt-2">
<label>Amount to Collect</label>
<div className="relative">
<input type="number" />
<span className="absolute right-3 top-2 text-gray-500">MMK</span>
</div>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</
```

## src/pages/portal/BulkUpload.tsx

This component enables merchants to upload a large number of orders at once using a CSV or Excel file. It includes a drag-and-drop file input, a validation step that shows a preview of the parsed data with errors, and the final action to create shipments.

```
import React, { useState } from 'react';
import { UploadCloud, FileText, AlertTriangle, Check, X } from 'lucid-react';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    // Mock Validation Results
    const [rows, setRows] = useState([
        { row: 1, receiver: 'Kyaw Kyaw', phone: '0912345678', address: 'Yangon', status: 'valid' },
        { row: 2, receiver: 'Su Su', phone: '0987654321', address: 'Mandalay', status: 'valid' },
        { row: 3, receiver: 'Aung Aung', phone: '123', address: "", status: 'error', msg: 'Invalid Phone & Missing Address' },
    ]);

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setAnalyzing(true);
        // Simulate parsing delay
        setTimeout(() => { setAnalyzing(false); setFile(new File(['“', "orders.csv”（））；}, 1500);
    });
};
```

};

<!-- Page: 16 -->

```
<div className="p-8 bg-white rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    {/* 1. Upload Zone */}
    {!file && (
        <div
            <onDragOver={(e) => e.preventDefault()}>
                <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
            </h2>
        </div>
    </div>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h2>
    <h2 className="text-2xl font-bold mb-6">Bulk Order Upload</h
```

## src/pages/portal/MerchantPickups.tsx

This component allows merchants to schedule and manage parcel pickups from their locations. It displays a list of upcoming and past pickups and includes a modal form to request a new one.

```
import React, { useState } from 'react';
import { Truck, Calendar, MapPin, Plus, Clock, ChevronRight } from 'lucid-react';
const MerchantPickups = () => {
    const [showModal, setShowModal] = useState(false);
}
```

<!-- Page: 17 -->

```
// Mock Data
const pickups = [
    { id: 'PK-202', status: 'assigned', date: 'Today', time: '10:00 AM - 12:00 PM', location: 'Main Warehouse', rider: 'Kyaw Kyaw', count: 12 },
    { id: 'PK-203', status: 'pending', date: 'Tomorrow', time: '02:00 PM - 04:00 PM', location: 'Downtown Store', rider: null, count: 50 },
    { id: 'PK-199', status: 'completed', date: 'Yesterday', time: '04:30 PM', location: 'Main Warehouse', rider: 'Aung Aung', count: 24 },
];
return (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Pickup Requests</h2>
            <p>Manage your scheduled pickups.</p>
        </button>
        <div>
            <Click={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 shadow-lg">
                <Plus /> New Pickup Request
            </button>
        </div>
    </div>
    <div className="space-y-4">
        <pickups.map((p) => {
            <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                {/* Left: Info */}
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="font-bold text-lg">{{p.count}}</p>
                        <p className="text-sm text-gray-500">Parcels</p>
                    </div>
                    <div>
                        <p className="font-semibold">{{p.id}}</p>
                    </div>
                    <span>{{p.status}}</span>
                    <p>{{p.date}} at {{p.time}}</p>
                    <p>{{p.location}}</p>
                </div>
            </div>
        </div>
    </div>
    <div className="text-right">
        <p rider && {
            <div>
                <p className="text-sm text-gray-500">Assigned Rider</p>
                <p className="font-bold">{{p.rider}}</p>
            </div>
        </div>
    </div>
    <div>
        <ChevronRight />
    </div>
</div>
)
</div>

// New Pickup Modal */
{
    showModal && {
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-lg">Schedule New Pickup</h3>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">X</button>
                <div className="p-6 space-y-4">
                    <div>
                        <label>Pickup Location</label>
                    </div>
                </div>
                <label>Date</label>
                <input type="date" />
            </div>
            <label>Time Slot</label>
            <select>
                <option>Morning (10am - 12pm)
                <option>Afternoon (2pm - 4pm)
                </option>
                <select>
                    <div>
                        <label>Estimated Parcel Count</label>
                    </div>
                    <div>
                        <label>Notes for Rider</label>
                    </div>
                    <div className="flex justify-end p-4 bg-gray-50 border-t">
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded-lg">Cancel</button>
                    <button onClick={() => { alert('Request Sent!'); setShowModal(false); } } className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Confirm Request</button>
                </div>
            </div>
        </div>
    </div>
}
```

);

<!-- Page: 18 -->

};

<!-- }; export default MerchantPickups; -->

## src/pages/portal/MerchantFinance.tsx

A financial dashboard for merchants to track their Cash on Delivery (COD) ledger and payout history. It features summary cards for key metrics, a tabbed interface to switch between ledger and payouts, and a data table to display transactions.

```
import React, { useState } from 'react';
import { DollarSign, Download, ArrowUpRight, Clock, AlertCircle, Search, Filter } from 'lucid-react';

const MerchantFinance = () => {
    const [activeTab, setActiveTab] = useState<'ledger' | 'payouts'>('ledger');
    // Mock Data: COD Ledger
    const transactions = [
        { id: 'TX-901', date: '2026-01-28', ref: 'ORD-1122', type: 'COD Collected', amount: 45000, status: 'pending' },
        { id: 'TX-902', date: '2026-01-28', ref: 'ORD-1125', type: 'Delivery Fee', amount: -2500, status: 'deducted' },
        { id: 'TX-880', date: '2026-01-27', ref: 'ORD-1099', type: 'COD Collected', amount: 120000, status: 'payable' },
    ];

    // Mock Data: Payout Batches
    const payouts = [
        { id: 'PO-005', date: '2026-01-25', amount: 850000, method: 'KBZPay', status: 'paid', ref: 'KBZ123456' },
        { id: 'PO-006', date: '2026-02-01', amount: 420000, method: 'Pending', status: 'processing', ref: '-' },
    ];

    return (
        <div className="p-8">
            {/* 1. Financial Health Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p>Unsettled COD</p>
                    <p>1,245,000 MMK</p>
                    <p>Next Payout: Feb 1st</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p>Wallet Balance</p>
                    <p>50,000 MMK</p>
                    <button>+ Top Up</button>
                    <button>View Statement</button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p>Action</p>
                    <p>Request Early Payout</p>
                    <button>Request Withdrawal</button>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b">
                <button onClick={() => setActiveTab('ledger')} className={'py-4 mr-8 font-bold text-sm border-b-2 transition-colors'}\{activeTab === 'ledger'? 'border-blue-600 text-blue-600': 'border-transparent text-gray-500 hover:text-gray-700'}\}
                <button>
                    <button onClick={() => setActiveTab('payouts')} className={'py-4 mr-8 font-bold text-sm border-b-2 transition-color'}\{activeTab === 'payouts'? 'border-blue-600 text-blue-600': 'border-transparent text-gray-500 hover:text-gray-700'}\}
                    <button>
                        <div className="p-4">
                            {/* Toolbar */}
                            <div className="flex justify-end gap-2 mb-4">
                                <button><Search /></button>
                                <button><Filter />Filter</button>
                                <button><Download />Export CSV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="p-4">
        {/* Toolbar */}
        <div className="flex justify-end gap-2 mb-4">
            <button><Search /></button>
            <button><Filter />Filter</button>
            <button><Download />Export CSV</button>
        </div>
    </div>
    <div className="w-full text-left">
        <activeTab === 'ledger'? (
            <thead><tr><th>Date</th><th>Ref ID</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
        ) : (
            <thead><tr><th>Batch ID</th><th>Date</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
        )
    }
</div>
```

<!-- Page: 19 -->

```
<tbody>
    {activeTab === 'ledger'? (
        transactions.map((tx) => {
            <tr key={tx.id}>
                <td>{{tx.date}}</td>
                <td>{{tx.ref}}</td>
                <td>{{tx.type}}</td>
                <td className={`{{tx.amount > 0 ? 'text-green-600': 'text-red-600}}`}>
                    {{tx.amount > 0 ? '+' : ''}{{tx.amount.toLocaleString()}}
                </td>
                <td>{{tx.status.toUpperCase()}}</td>
            </tr>
        )
    );
    {
        payouts.map((po) => {
            <tr key={po.id}>
                <td>{{po.id}}</td>
                <td>{{po.date}}</td>
                <td>{{po.amount.toLocaleString()}}</td>
                <td>{{po.method}} {{po.ref}=== '-' && <span>({po.ref})</span></td>
                <td>{{po.status.toUpperCase()}}</td>
            </tr>
        )
    });
</tbody>
</table>
</div>
</div>
</div>
};

export default MerchantFinance;
```

## Operational Screens

These screens are the heart of the logistics operations, used by dispatchers and warehouse staff to manage the day-to-day flow of goods.

## src/pages/operations/BritiumDispatchControl.tsx

The dispatch control center is a real-time dashboard for managing drivers and active deliveries. It would typically feature a live map, a list of active drivers, and unassigned tasks. This implementation provides the structural layout and simulates the data feeds required for such a complex view.

<!-- Page: 20 -->

![image](https://static-us-img.skywork.ai/prod/nexus/1770143524/cropped_image_0_1770143524479622158.jpg)

A logistics monitoring dashboard showing regional status and real-time event logs, central to dispatch operations

```
// src/pages/operations/BritiumDispatchControl.tsx
import React from 'react';

// --- Mock Data & Types ---
interface Driver {
    id: string;
    name: string;
    status: 'On-duty' | 'Off-duty' | 'On-break';
    currentTask: string | null;
}

interface Task {
    id: string;
    type: 'Pickup' | 'Delivery';
    address: string;
    status: 'Unassigned' | 'Assigned' | 'In-progress';
}

// --- Custom Hook for API Logic ---
const useDispatchData = () => {
    const drivers: Driver[] = [
        { id: 'drv-1', name: 'John Doe', status: 'On-duty', currentTask: 'task-101' },
        { id: 'drv-2', name: 'Jane Smith', status: 'On-duty', currentTask: 'task-102' },
        { id: 'drv-3', name: 'Peter Jones', status: 'On-break', currentTask: null },
    ];
    const tasks: Task[] = [
        { id: 'task-101', type: 'Delivery', address: '123 Main St', status: 'In-progress' },
        { id: 'task-102', type: 'Pickup', address: '456 Oak Ave', status: 'In-progress' },
        { id: 'task-103', type: 'Delivery', address: '789 Pine Ln', status: 'Unassigned' },
    ];
    return { drivers, tasks, loading: false };
};

// --- Main Page Component ---
const BritiumDispatchControl = () => {
    const { drivers, tasks, loading } = useDispatchData();

    if (loading) return <p>Loading dispatch data...</p>;

    const unassignedTasks = tasks.filter(t => t.status === 'Unassigned');
};
```

<!-- Page: 21 -->

```
return (
    <div style={styles.container}>
        <h2>Dispatch Control Center</h2>
        <div style={styles.layout}>
            <div style={styles.panel}>
                <h3>Live Map</h3>
                <div style={styles.mapPlaceholder}>Map integration would be here (e.g., Google Maps, Mapbox)</div>
            </div>
        </div>
    </div>
    <div style={styles. sidebar}>
        <div>
            <h3>Active Drivers</h3>
            <ul>
                <drivers.map(driver => {
                    <li key={driver.id}>{driver.name} - {driver.status}</li>
                })
                </ul>
            </div>
        </div>
    </div>
    <div>
        <h3>Unassigned Tasks ({unassignedTasks.length})</h3>
        <ul>
            <unassignedTasks.map(task => {
                <li key={task.id}>
                    <task.type>at {task.address}<button>Assign</button>
                </li>
            })
            </ul>
        </div>
    </div>
</div>
);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    container: { height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' },
    layout: { display: 'flex', flex: 1, gap: '20px' },
    panel: { flex: 3, background: '#fff', padding: '20px', borderRadius: '8px' },
    sidebar: { flex: 1, background: '#fff', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '20px' },
    mapPlaceholder: { height: '80%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' },
};
```

## src/pages/operations/BritiumWarehouseOperations.tsx

This screen is designed for warehouse managers and staff. It provides tools for managing inventory, processing incoming receipts, and fulfilling outgoing orders. The dashboard includes KPIs for warehouse efficiency and lists for active tasks like picking and packing.

<!-- Page: 22 -->

![header_image](https://static-us-img.skywork.ai/prod/nexus/1770143525/cropped_image_0_1770143525232464861.jpg)

![image](https://static-us-img.skywork.ai/prod/nexus/1770143525/cropped_image_1_1770143525821558998.jpg)

A comprehensive warehouse manager dashboard showing key metrics for shipments, orders, and inventory

```
// src/pages/operations/BritiumWarehouseOperations.tsx
import React from 'react';

// --- Mock Data & Types ---
interface WarehouseTask {
    id: string;
    type: 'Picking' | 'Packing' | 'Receiving';
    orderId: string;
    assignedTo: string;
    status: 'Pending' | 'In Progress';
}

// --- Custom Hook for API Logic ---
const useWarehouseData = () => {
    const tasks: WarehouseTask[] = [
        { id: 'wt-001', type: 'Picking', orderId: 'ORD-987', assignedTo: 'Warehouse Staff A', status: 'In Progress' },
        { id: 'wt-002', type: 'Packing', orderId: 'ORD-987', assignedTo: 'Warehouse Staff B', status: 'Pending' },
        { id: 'wt-003', type: 'Receiving', orderId: 'PO-556', assignedTo: 'Warehouse Staff C', status: 'In Progress' },
    ];
    const kpis = {
        ordersToPick: 15,
        ordersToPack: 8,
        incomingReceipts: 4,
    };
    return { tasks, kpis, loading: false };
};

// --- UI Components ---
const KpiCard = ({ title, value }: { title: string; value: number }) => {
    <div style={styles.kpiCard}>
        <h4 style={styles.kpiTitle}>{title}<h4>
            <p style={styles.kpiValue}>{value}<p>
```

<!-- Page: 23 -->

```
</div>
);

// --- Main Page Component ---
const BritiumWarehouseOperations = () => {
    const { tasks, kpis, loading } = useWarehouseData();
    if (loading) return <p>Loading warehouse data...</p>;
    return {
        <div>
            <h2>Warehouse Operations</h2>
            <div style={styles.kpiGrid}>
                <KpiCard title="Orders to Pick" value={kpis.ordersToPick} />
                <KpiCard title="Orders to Pack" value={kpis.ordersToPack} />
                <KpiCard title="Incoming Receipts" value={kpis.incomingReceipts} />
            </div>
            <h3>Active Tasks</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Task ID</th><th>Type</th><th>Order/PO ID</th><th>Assigned To</th><th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tasks.map(task => {
                        <tr key={task.id}>
                            <td>Task.id</td><td>Task.type</td><td>Task.orderId</td><td>Task.assignedTo</td><td>Task.status</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
};

// --- Styles (reusing some from Merchant Portal for consistency) ---
const styles: { [key: string]: React.CSSProperties } = {
    kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
    kpiCard: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgb(0,0,0,0.1)' },
    kpiTitle: { margin: 0, color: '#555', fontSize: 'lem' },
    kpiValue: { margin: '10px 0 0', fontSize: '2em', fontWeight: 'bold', color: '#2c3e50' },
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' },
};

export default BritiumWarehouseOperations;
```

## src/pages/operations/WayManagement.tsx

This component focuses on the management of transportation routes or "ways". It allows operators to define, view, and optimize delivery routes. This could involve setting up standard routes, managing multi-stop routes for drivers, and analyzing route efficiency.

```
// src/pages/operations/WayManagement.tsx
import React, { useState } from 'react';

// --- Mock Data & Types ---
interface Route {
  id: string;
  name: string;
  stops: number;
  avgDuration: string; // e.g., "2h 30m"
  status: 'Active' | 'Inactive';
}

// --- Custom Hook for API Logic ---
const useRouteData = () => {
  const [routes, setRoutes] = useState<Route[]>([
    { id: 'route-01', name: 'Downtown Express', stops: 12, avgDuration: '2h 30m', status: 'Active' },
    { id: 'route-02', name: 'Suburb Loop', stops: 25, avgDuration: '4h 15m', status: 'Active' },
    { id: 'route-03', name: 'Industrial Park Run', stops: 8, avgDuration: '1h 45m', status: 'Inactive' },
]);

return { routes, loading: false };
```

<!-- Page: 24 -->

};

```
};

// --- Main Page Component ---
const WayManagement = () => {
    const { routes, loading } = useRouteData();

    if (loading) return <p>Loading routes...</p>;

    return {
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            <h2>Route Management</h2>
            <button style={styles.button}>+ Create New Route</button>
        </div>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th>Route Name</th><th>Stops</th><th>Avg. Duration</th><th>Status</th><th>Actions</th>
                </tr>
            </thead>
            <th>Route Name</th><th>Stops</th><th>Avg. Duration</th><th>Status</th><th>Actions</th>
            </tr>
        </th>
    </tr>
    <tr>
        <td>Route.name</td>
        <td>Route.stops</td>
        <td>Route.avgDuration</td>
        <td>
            <span style={route.status === 'Active'? style.activeStatus: style.inactiveStatus}>
                <route.status>
                </span>
            </td>
        </td>
    </tr>
    <tr>
        <button style={styles.actionButton}>Edit</button>
        <button style={styles.actionButton}>Optimize</button>
    </tr>
</table>

</div>

);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', margin: '20px' },
    button: { padding: '10px 15px', background: '#1a8917', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    actionButton: { marginRight: '10px', background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
    activeStatus: { color: 'green', fontWeight: 'bold' },
    inactiveStatus: { color: 'gray' },
};

export default WayManagement;
```

## Administrative Screens

These screens provide high-level oversight and control over the entire platform, intended for roles like finance, HR, and system administrators.

<!-- Page: 25 -->

<!-- src/pages/admin/BritiumFinancialCenter.tsx -->

The Financial Center offers a snapshot of the company';s financial health. It includes KPIs for revenue and expenses, a chart comparing the two, and a list of recent transactions for auditing purposes. This component demonstrates how to present complex financial data in an easily digestible format.

```
// src/pages/admin/BritiumFinancialCenter.tsx
import React, { useEffect, useRef } from 'react';

// --- Mock Data & Types ---
interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'Income' | 'Expense';
}

interface FinancialData {
    revenue: number;
    expenses: number;
    netIncome: number;
    monthlyData: { month: string; revenue: number; expenses: number }();
    recentTransactions: Transaction];
}

// --- Custom Hook for API Logic ---
const useFinancialData = () => {
    const data: FinancialData = {
        revenue: 450000,
        expenses: 320000,
        netIncome: 130000,
        monthlyData: [
            { month: 'Oct', revenue: 140000, expenses: 110000 },
            { month: 'Nov', revenue: 160000, expenses: 125000 },
            { month: 'Dec', revenue: 180000, expenses: 135000 },
            { month: 'Jan', revenue: 150000, expenses: 115000 },
        ],
        recentTransactions: [
            { id: 'txn-001', date: '2026-01-28', description: 'Client Payment - Acme Corp', amount: 5000, type: 'Income' },
            { id: 'txn-002', date: '2026-01-27', description: 'Fuel Expenses', amount: -2500, type: 'Expense' },
            { id: 'txn-003', date: '2026-01-26', description: 'Warehouse Rent', amount: -10000, type: 'Expense' },
        ],
    };
    return { data, loading: false };
};

// --- UI Components ---
const FinancialChart = ( { data }: { data: { month: string; revenue: number; expenses: number }[] }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current, 'macarons');
            chart.setOption({
                title: { text: 'Monthly Revenue vs. Expenses' },
                tip: { trigger: 'axis' },
                legend: { data: ['Revenue', 'Expenses'] },
                xAxis: { type: 'category', data: data.map(d => d.month)},
                yAxis: { type: 'value' },
                series: [
                    { name: 'Revenue', type: 'bar', data: data.map(d => d.revenue)},
                    { name: 'Expenses', type: 'bar', data: data.map(d => d.expenses)},
                ],
            });
        },
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

// --- Main Page Component ---
const BritiumFinancialCenter = () => {
    const { data, loading } = useFinancialData();

    if (loading) return <p>Loading financial data...</p>;
}
```

<!-- Page: 26 -->

```
if (!data) return null;

return (
    <div>
        <h2>Financial Center</h2>
        {/* KPI Cards would go here */}
        <div style={styles.chartContainer}>
            <FinancialChart data={data.monthlyData} />
        </div>
        <h3>Recent Transactions</h3>
        <table style={styles.table}>
            <thead>
                <tr>
                    <th>Date</th><th>Description</th><th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {data.recentTransactions.map(tx => {
                    <tr key={tx.id}>
                        <td>{{tx.date}}</td>
                        <td>{{tx.description}}</td>
                        <td>{{tx.description}}</td>
                        {{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}}
                    </tr>
                </tr>
            </tbody>
        </table>
    </div>
);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    chartContainer: { background: 'ffff', padding: '20px', borderRadius: '8px', marginBottom: '30px' },
    table: { width: '100%', borderCollapse: 'collapse', background: 'ffff', borderRadius: '8px', overflow: 'hidden' },
};
```

## src/pages/admin/BritiumHRmanagement.tsx

This component is for managing human resources, including employees and drivers. It allows HR managers to view personnel lists, add new employees, and manage roles and permissions. The interface is a straightforward table-based layout, which is common for administrative management tasks.

```
// src/pages/admin/BritiumHRmanagement.tsx
import React from 'react';

// --- Mock Data & Types ---
interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'On Leave';
  hireDate: string;
}

// --- Custom Hook for API Logic ---
const useHRData = () => {
  const employees: Employee[] = [
    { id: 'emp-01', name: 'John Doe', role: 'Driver', status: 'Active', hireDate: '2024-05-20' },
    { id: 'emp-02', name: 'Jane Smith', role: 'Dispatcher', status: 'Active', hireDate: '2023-11-10' },
    { id: 'emp-03', name: 'Sam Wilson', role: 'Warehouse Manager', status: 'On Leave', hireDate: '2022-01-15' },
    ];
    return { employees, loading: false };
};

// --- Main Page Component ---
const BritiumHRmanagement = () => {
  const { employees, loading } = useHRData();
};
```

<!-- Page: 27 -->

```
if (loading) return <p>Loading employee data...</p>;

return (
    <div>
        <div style={display: 'flex', justifyContent: 'space-between', alignItems: 'center'}>
            <h2>HR Management</h2>
            <button style={styles.button}>+ Add Employee</button>
        </div>
    </div>
    <table style={styles.table}>
        <thead>
            <tr>
                <th>Name</th><th>Role</th><th>Hire Date</th><th>Status</th><th>Actions</th>
            </tr>
        </thead>
        <th>body>
            {employees.map(emp => (
                <tr key={emp.id}>
                    <td>emp.name</td>
                    <td>emp.role</td>
                    <td>emp.hireDate</td>
                    <td>emp.status</td>
                    <td>button style={styles.actionButton}>View Profile</button>
                </tr>
            </tr>
        </tr>
    </table>
</div>
);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', marginTop: '20px' },
    button: { padding: '10px 15px', background: '#1a8917', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    actionButton: { background: 'transparent', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' },
};

export default BritiumHRManagement;
```

## src/pages/admin/BritiumAnalyticsReport.tsx

This component is a dedicated space for in-depth data analysis and reporting. It would typically allow users to generate custom reports, apply filters, and visualize data in various ways. This implementation sets up the structure with filter controls and a placeholder for complex report visualizations.

```
// src/pages/admin/BritiumAnalyticsReport.tsx
import React, { useState } from 'react';

// --- Main Page Component ---
const BritiumAnalyticsReport = () => {
    const [reportType, setReportType] = useState('delivery_performance');
    const [dateRange, setDateRange] = useState('last_30_days');

    const handleGenerateReport = () => {
        console.log('Generating report: ${reportType} for ${dateRange}');
        // API call to fetch report data would be triggered here
    };

    return (
        <div>
            <h2>Analytics & Reports</h2>
            <div style={styles.filters}>
                <select value={reportType} onChange={e => setReportType(e.target.value)}>
                    <option value="delivery_performance">Delivery Performance</option>
                    <option value="driver_efficiency">Driver Efficiency</option>
                    <option value="customer_satisfaction">Customer Satisfaction</option>
                </div>
            </div>
        </div>
    );
}
```

<!-- Page: 28 -->

```
<select value={dateRange} onChange={e => setDateRange(e.target.value)}>
    <option value="last_7_days">Last 7 Days</option>
    <option value="last_30_days">Last 30 Days</option>
    <option value="last_90_days">Last 90 Days</option>
</select>
<button onClick={handleGenerateReport} style={styles.button}>Generate Report</button>

</div>

<div style={styles.reportArea}>
    <p>Report results for '{{reportType.replace('_', '')}} will be displayed here.</p>
    <!-- Chart and data table components would be rendered here based on fetched data -->
</div>

</div>

);

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    filters: { display: 'flex', gap: '15px', padding: '20px', background: '#fff', borderRadius: '8px', marginBottom: '20px' },
    reportArea: { padding: '20px', background: '#fff', borderRadius: '8px', minHeight: '400px' },
    button: { padding: '10px 15px', background: '#1a8917', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default BritiumAnalyticsReport;
```

## src/pages/admin/BritiumSystemAdminConsole.tsx

The System Admin Console is a restricted area for managing core system settings. This includes API key management, integration settings, and feature flags. The UI is functional and prioritizes clarity and security, with actions like "Revoke" and "Generate" being prominent. Access to this component would be strictly controlled via Role-Based Access Control (RBAC).

```
// src/pages/admin/BritiumSystemAdminConsole.tsx
import React from 'react';

// --- Mock Data & Types ---
interface ApiKey {
    id: string;
    name: string;
    key: string;
    created: string;
}

// --- Custom Hook for API Logic ---
const useSystemData = () => {
    const apiKeys: ApiKey[] = [
        { id: 'key-1', name: 'Warehouse API', key: 'wh_live_*****', created: '2025-10-01' },
        { id: 'key-2', name: 'Mobile App API', key: 'mob_live_*****', created: '2025-11-15' },
    ];
    return { apiKeys, loading: false };
};

// --- Main Page Component ---
const BritiumSystemAdminConsole = () => {
    const { apiKeys, loading } = useSystemData();

    if (loading) return <p>Loading system settings...</p>;

    return {
        <div>
            <h2>System Administration Console</h2>
            <h3>API Key Management</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {apiKeys.map(key => {
                        <tr key={key.id}>
                            <td>key.name</td>
                        </tr>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <table>
                    <tr>
                        <th>Name</th><th>Key</th><th>Created</th><th>Actions</th>
                    </tr>
                </table>
                <
```

<!-- Page: 29 -->

```
<td><code> {key.key}</code></td>
<td> {key.created}</td>
<td>
    <button style={styles.revokeButton}>Revoke</button>
</td>
</tr>
</tr>
</tbody>
</table>
<button style={styles.button}>+ Generate New API Key</button>
</div>
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' },
    button: { padding: '10px 15px', background: '#1a8917', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    revokeButton: { background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default BritiumSystemAdminConsole;
```

## src/pages/admin/BritiumIntegrationTesting.tsx

This is a developer-focused utility page, likely for internal use, to trigger and monitor integration tests against staging or production environments. It provides a simple interface to run test suites and view their results, which is crucial for maintaining system stability.

```
// src/pages/admin/BritiumIntegrationTesting.tsx
import React, { useState } from 'react';

// --- Mock Data & Types ---
type TestStatus = 'Pending' | 'Running' | 'Passed' | 'Failed';
interface TestResult {
  id: string;
  name: string;
  status: TestStatus;
  duration?: string;
}

// --- Main Page Component ---
const BritiumIntegrationTesting = () => {
  const [testResults, setTestResults] = useState<TestResult][];
  { id: 'test-1', name: 'API Authentication Suite', status: 'Pending' },
  { id: 'test-2', name: 'Order Creation Workflow', status: 'Pending' },
  { id: 'test-3', name: 'Shipment Tracking Endpoint', status: 'Pending' },
  []);

const runTest = (testId: string) => {
  setTestResults(prev => prev.map(t => t.id === testId ? { ...t, status: 'Running' } : t));
  // Simulate test execution
  setTimeout(() => {
    setTestResults(prev => prev.map(t => {
      if (t.id === testId) {
        const passed = Math.random() > 0.3;
        return { ...t, status: passed ? 'Passed' : 'Failed', duration: `${Math.random() * 30).toFixed(2)}s` };
      return t;
    }) );
  }, 2000 + Math.random() * 3000);
};

return (
  <div>
    <h2>Integration Testing Console</h2>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Test Suite</th><th>Status</th><th>Duration</th><th>Actions</th>
        </tr>
      </thead>
    </table>
  </th>
  <tr>
    <th>Test Suite</th><th>Status</th><th>Duration</th><th>Actions</th>
  </tr>
</table>
);
```

<!-- Page: 30 -->

```
<tbody>
    {testResults.map(test => {
        <tr key={test.id}>
            <td>{test.name}</td>
            <td>{test.status}</td>
            <td>{test.duration || 'N/A'}</td>
            <td>
                <button onClick={() => runTest(test.id)} disabled={test.status === 'Running'}>
                    Run Test
                </button>
            </td>
        </tr>
    </tr>
</tbody>
</table>
</div>
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
    table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' },
};

export default BritiumIntegrationTesting;
```

## src/pages/admin/AdminManagement.tsx

A high-level dashboard for administrators, providing an overview of all system activities. This placeholder component would be expanded to include key metrics and quick links to other admin sections.

```
// src/pages/admin/AdminManagement.tsx
import React from 'react';

const AdminManagement = () => {
    return (
        <div>
            <h2>Admin Management Dashboard</h2>
            <p>This dashboard will provide a top-level overview of system health, operational metrics, and user activity. Implementation will include summary cards and charts linking to detailed sections like User Management, Financials, and Operations.
        </p>
    </div>
);

export default AdminManagement;
```

## src/pages/admin/AdminUser.tsx

This component is for managing all users within the system, including administrators, merchants, and operational staff. It will feature a table to list users, with functionality for adding, editing, and assigning roles.

```
// src/pages/admin/AdminUser.tsx
import React from 'react';

// --- Mock Data & Types ---
interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'merchant' | 'dispatcher' | 'finance';
  lastLogin: string;
}

const AdminUser = () => {
```

<!-- Page: 31 -->

```
// Mock data would be fetched here
const users: SystemUser[] = [];

return (
    <div>
        <h2>User Management</h2>
        <p>
            This section will contain a table of all system users. Administrators can add new users, edit existing user details, and manage roles and permissions. The implementation will follow the pattern of the HR Management component.
        </p>
        {/* A table for user listing would be implemented here */}
    </div>
);

export default AdminUser;
```

## src/pages/admin/Settings.tsx

A centralized location for application-wide settings, such as notification preferences, regional settings (timezones, currencies), and feature toggles. This component will provide forms to update these configurations.

```
// src/pages/admin/Settings.tsx
import React from 'react';

const Settings = () => {
    return (
        <div>
            <h2>System Settings</h2>
            <p>This component will house forms for managing global application settings. This includes configuring notification templates, setting operational parameters (like default vehicle capacities), and managing feature flags for A/B testing or phased rollouts.
        </p>
    </div>
);

export default Settings;
```

## Rider App Screens

These components are designed for the mobile application used by delivery riders. They are optimized for mobile displays and provide essential functionality for managing tasks on the go.

## src/pages/rider/RiderDashboard.tsx

The rider's main dashboard. It shows their current status (On/Off Duty), a summary of today's earnings, and quick access to their active task list. The design is simple and touch-friendly.

```
// src/pages/rider/RiderDashboard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RiderDashboard = () => {
    const [isOnline, setIsOnline] = useState(false);
    const todaysEarnings = 45.50;
    const completedTasks = 5;

    return {
        <div style={styles.container}>
```

<!-- Page: 32 -->

```
<div style={styles.header}>
    <h2>Your Dashboard</h2>
    <button onClick={() => setIsOnline(!isOnline)} style={isOnline ? styles.onlineButton : styles.offlineButton}>
        {isOnline ? 'Go Offline' : 'Go Online'}
    </button>
</div>
<div style={styles.statsGrid}>
    <div style={styles.statCard}>
        <p>Today's Earnings</p>
        <h3>${todaysEarnings.toFixed(2)}</h3>
    </div>
    <div style={styles.statCard}>
        <p>Completed Tasks</p>
        <h3>${completedTasks}</h3>
    </div>
</div>
<link to="/rider/tasks" style={styles.actionButton}>View My Tasks</link>
</div>
);
const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    onlineButton: { padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '20px' },
    offlineButton: { padding: '10px 20px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '20px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'lfr 1fr', gap: '15px', marginBottom: '30px' },
    statCard: { background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center' },
    actionButton: { display: 'block', width: '100%', padding: '15px', background: '#3498db', color: 'white', textAlign: 'center', textDecoration: 'none', borderRadius: '8px', fontSize: '18px' },
};
export default RiderDashboard;
```

## src/pages/rider/RiderTaskList.tsx

This screen displays a list of all tasks assigned to the rider, separated into "To Do" and "Completed" tabs. Each task item is a link to the detailed job screen.

```
// src/pages/rider/RiderTaskList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Task {
    id: string;
    type: 'Pickup' | 'Delivery';
    address: string;
    timeSlot: string;
}

const RiderTaskList = () => {
    const tasks: Task[] = [
        { id: 'task-101', type: 'Delivery', address: '123 Main St', timeSlot: '10:00 - 11:00' },
        { id: 'task-102', type: 'Pickup', address: '456 Oak Ave', timeSlot: '11:30 - 12:00' },
    ];

    return (
        <div style={styles.container}>
            <h2>My Tasks</h2>
            <ul style={styles.list}>
                {tasks.map(task => {
                    <li key={task.id} style={styles.listItem}>
                        <Link to={'/rider/tasks/${task.id}'} style={styles.link}>
                            <div><strong>{task.type}</strong> - {task.timeSlot}</div>
                            <div><task.address></div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px' },
};
```

<!-- Page: 33 -->

```
list: { listStyle: 'none', padding: 0 },
listItem: { background: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '10px' },
link: { textDecoration: 'none', color: 'inherit' },
};
export default RiderTaskList;
```

## src/pages/rider/JobDetailScreen.tsx

Provides all the necessary details for a single job, including a map view of the location, address, contact information, and items to be picked up or delivered. It includes action buttons to start navigation or confirm the action.

```
// src/pages/rider/JobDetailScreen.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetailScreen = () => {
    const { taskId } = useParams();
    // Fetch task details based on taskId
    const task = { id: taskId, type: 'Delivery', address: '123 Main St, Metropolis', contact: 'John Smith', items: ['lx Box A', '2x Box B'] };

    return (
        <div style={styles.container}>
            <h2>Job Details: {task.id}</h2>
            <div style={styles.mapPlaceholder}>Map View</div>
            <div style={styles.details}>
                <p><strong>Type:<strong> {task.type}</p>
                <p><strong>Address:<strong> {task.address}</p>
                <p><strong>Contact:<strong> {task.contact</p>
                <h4>Items:<h4>
                    <ul>
                        {task.items.map((item, i) => <li key={i}>{item}</li>)
                    </ul>
                </div>
                <div style={styles.actions}>
                    <button style={styles.navButton}>Start Navigation</button>
                    <Link to={/rider/tasks/$({taskId}/confirm)} style={styles.confirmButton}>
                        Confirm {task.type}
                    </Link>
                </div>
            </div>
        );
    };
    const styles: { [key: string]: React.CSSProperties } = {
        container: { padding: '20px' },
        mapPlaceholder: { height: '200px', background: '#e0e0e0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
        details: { background: '#fff', padding: '20px', borderRadius: '8px' },
        actions: { marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
        navButton: { padding: '15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px', textAlign: 'center' },
        confirmButton: { padding: '15px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' },
    };
}

export default JobDetailScreen;
```

## src/pages/rider/RiderPickupConfirm.tsx

A screen for confirming a pickup. This would typically include functionality to scan barcodes or take a photo of the collected items as proof of pickup.

```
// src/pages/rider/RiderPickupConfirm.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const RiderPickupConfirm = () => {
```

<!-- Page: 34 -->

```
const { taskId } = useParams();
const navigate = useNavigate();

const handleConfirm = () => {
    // API call to confirm pickup
    console.log('Pickup confirmed for task ${taskId}')
    navigate('/rider/tasks');
};

return (
    <div style={styles.container}>
        <h2>Confirm Pickup</h2>
        <p>Task ID: {taskId}</p>
        <div style={styles.actionArea}>
            <p>Please take a photo of the items to confirm pickup.</p>
            <button style={styles.cameraButton}>Open Camera</button>
        </div>
        <button onClick={handleConfirm} style={styles.confirmButton}>Confirm Pickup</button>
    </div>
);

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px', textAlign: 'center' },
    actionArea: { margin: '30px 0', padding: '20px', background: '#f9f9f9', borderRadius: '8px' },
    cameraButton: { padding: '12px 20px', fontSize: '16px' },
    confirmButton: { width: '100%', padding: '15px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', marginTop: '20px' },
};

export default RiderPickupConfirm;
```

## src/pages/rider/RiderDeliveryConfirm.tsx

Similar to pickup confirmation, this screen is for confirming a successful delivery. It often requires capturing a recipient's signature or taking a photo of the delivered package (e.g., at the doorstep).

```
// src/pages/rider/RiderDeliveryConfirm.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RiderDeliveryConfirm = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const handleConfirm = () => {
        // API call to confirm delivery with signature/photo data
        console.log('Delivery confirmed for task ${taskId}');
        navigate('/rider/tasks');
    };

    return {
        <div style={styles.container}>
            <h2>Confirm Delivery</h2>
            <p>Task ID: {taskId}</p>
            <div style={styles.actionArea}>
                <p>Please obtain recipient's signature.</p>
                <div style={styles.signaturePad}>Signature Pad Area</div>
            </div>
            <button onClick={handleConfirm} style={styles.confirmButton}>Confirm Delivery</button>
        </div>
    };
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px', textAlign: 'center' },
    actionArea: { margin: '30px 0', padding: '20px', background: '#f9f9f9', borderRadius: '8px' },
    signaturePad: { height: '150px', background: '#fff', border: '1px dashed #ccc', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    confirmButton: { width: '100%', padding: '15px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', marginTop: '20px' },
};
```

<!-- Page: 35 -->

# src/pages/rider/RiderException.tsx

Allows riders to report a problem or "exception" during a pickup or delivery, such as "Recipient not available" or "Address incorrect". This is crucial for logging issues and triggering follow-up actions.

```
// src/pages/rider/RiderException.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RiderException = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState%；
    const [notes, setNotes] = useState%；

    const handleSubmit = () => {
        // API call to report exception
        console.log('Exception for task ${taskId}: ${reason} - ${notes}');
        navigate；
    };

    return (
        <div style={styles.container}>
            <h2>Report an Issue</h2>
            <p>Task ID: {taskId}</p>
            <select value={reason} onChange={e => setReason(e.target.value)} style={styles.input}>
                <option value="">Select a reason...</option>
                <option value="recipient_unavailable">Recipient Unavailable</option>
                <option value="address_incorrect">Address Incorrect</option>
                <option value="package_damaged">Package Damaged</option>
                <option value="other">Other</option>
            </select>
            <textarea value={notes}>
                onChange={e => setNotes(e.target.value)}
                placeholder="Add notes..."
                style={styles.textarea}
            </button>
            <button>OnClick={handleSubmit} style={styles.submitButton}>Submit Report</button>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' },
    textarea: { width: '100%', padding: '12px', height: '100px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' },
    submitButton: { width: '100%', padding: '15px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px' },
};

export default RiderException;
```

## src/pages/rider/RiderWallet.tsx

This screen provides riders with a view of their earnings. It shows the current balance, a list of recent transactions (payments for completed jobs), and an option to cash out.

```
// src/pages/rider/RiderWallet.tsx
import React from 'react';

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
}

const RiderWallet = () => {
    const balance = 125.75;
    const transactions: Transaction[] = [
        { id: 't-1', date: '2026-01-29', description: 'Payment for task-101', amount: 12.50 }
    ];
};
```

<!-- Page: 36 -->

```
{
  id: 't-2',
  date: '2026-01-28',
  description: 'Payment for task-098',
  amount: 15.00
},
{
  id: 't-3',
  date: '2026-01-28',
  description: 'Cash Out',
  amount: -100.00
},
{
  return (
    <div style={styles.container}>
      <h2>My Wallet</h2>
      <div style={styles.balanceCard}>
        <p>Current Balance</p>
        <h1>${balance.toFixed(2)}</h1>
        <button style={styles.cashoutButton}>Cash Out</button>
      </div>
      <h3>Recent Transactions</h3>
      <ul style={styles.list}>
        {transactions.map(tx => {
          <li key={tx.id} style={styles.listItem}>
            <div>${tx.description}</div>
            <div style={{color: tx.amount > 0 ? 'green': 'red'}}>
              {tx.amount > 0 ? '+' : ''}<tx.amount.toFixed(2)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: '20px' },
  balanceCard: { background: '#34495e', color: 'white', padding: '30px 20px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' },
  cashoutButton: { marginTop: '15px', padding: '10px 30px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '20px' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#fff', borderRadius: '8px', marginBottom: '10px' },
  export default RiderWallet;
};
```

## src/pages/rider/RiderProfile.tsx

The rider's profile screen, where they can view and edit their personal information, vehicle details, and application settings.

```
// src/pages/rider/RiderProfile.tsx
import React from 'react';

const RiderProfile = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '555-123-4567',
        vehicle: 'Motorcycle - Honda CB500',
    };

    return (
        <div style={styles.container}>
            <h2>My Profile</h2>
            <div style={styles.card}>
                <p><strong>Name:<strong> {user.name}</p>
                <p><strong>Email:<strong> {user.email}</p>
                <p><strong>Phone:<strong> {user.phone}</p>
                <p><strong>Vehicle:<strong> {user.vehicle}</p>
                <button style={styles.editButton}>Edit Profile</button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '20px' },
    card: { background: '#fff', padding: '20px', borderRadius: '8px' },
    editButton: { marginTop: '20px', width: '100%', padding: '15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '8px' },
};
```

<!-- Page: 37 -->

};

<!-- export default RiderProfile; -->

## Reference

[1]Managing Auth State in react using useContext APIhttps://dev.to/mmvergara/managing-auth-state-in-react-

using-usecontext-api-1p4l

[2]Dashboard design patternhttps://ui-patterns.com/patterns/dashboard

[3]Build a Mobile Food Delivery App in React Nativehttps://7span.com/blog/food-delivery-app-in-react-native

[4]React Folder Structure in 5 Steps [2025] https://www.robinwieruch.de/react-folder-structure/

## Reference

[1]Using the React Context API for Efficient State Management https://www.geeksforgeeks.org/reactjs/using-the-react-

context-api-for-efficient-state-management/

[2]fransachmadhw/React-Admin-UI-V1https://github.com/fransachmadhw/React-Admin-UI-V1

[3]Your First Componenthttps://react.dev/learn/your-first-component

[4]Dashboard design patternhttps://ui-patterns.com/patterns/dashboard

[5]Build a Mobile Food Delivery App in React Nativehttps://7span.com/blog/food-delivery-app-in-react-native

[6]React Folder Structure in 5 Steps [2025] https://www.robinwieruch.de/react-folder-structure/

[7]Managing Auth State in react using useContext APIhttps://dev.to/mmvergara/managing-auth-state-in-react-

using-usecontext-api-1p4l