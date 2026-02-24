// Demo authentication hook for testing without Supabase constraints
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
const AuthContext = createContext(undefined);
// Demo accounts database
const DEMO_ACCOUNTS = {
    'admin@britiumexpress.com': { name: 'System Administrator', role: 'SUPER_ADMIN' },
    'ops@britiumexpress.com': { name: 'Operations Manager', role: 'OPERATIONS_ADMIN' },
    'warehouse@britiumexpress.com': { name: 'Warehouse Manager', role: 'WAREHOUSE_MANAGER' },
    'supervisor@britiumexpress.com': { name: 'Site Supervisor', role: 'SUPERVISOR' },
    'rider@britiumexpress.com': { name: 'Delivery Rider', role: 'RIDER' },
    'support@britiumexpress.com': { name: 'Customer Support', role: 'CUSTOMER_SERVICE' },
    'finance@britiumexpress.com': { name: 'Finance Officer', role: 'FINANCE_STAFF' },
    'hr@britiumexpress.com': { name: 'HR Manager', role: 'HR_ADMIN' },
    'data@britiumexpress.com': { name: 'Data Entry Clerk', role: 'DATA_ENTRY' },
    'merchant@britiumexpress.com': { name: 'Business Partner', role: 'MERCHANT' },
    'customer@britiumexpress.com': { name: 'Regular Customer', role: 'CUSTOMER' },
};
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    // Check for existing session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('demo-user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setSession({ id: userData.id, email: userData.email });
            }
            catch (error) {
                localStorage.removeItem('demo-user');
            }
        }
        setIsLoading(false);
    }, []);
    const login = useCallback(async (email, password) => {
        setIsLoading(true);
        try {
            // Check if it's a demo account
            const demoUser = DEMO_ACCOUNTS[email];
            if (!demoUser) {
                throw new Error('Account not found. Please use one of the demo accounts.');
            }
            if (password !== 'demo123') {
                throw new Error('Invalid password. Use "demo123" for all demo accounts.');
            }
            // Create user session
            const userData = {
                id: `demo-${email.split('@')[0]}`,
                email: email,
                name: demoUser.name,
                role: demoUser.role,
                lastLogin: new Date().toISOString(),
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            };
            // Save to localStorage for persistence
            localStorage.setItem('demo-user', JSON.stringify(userData));
            setUser(userData);
            setSession({ id: userData.id, email: userData.email });
            // Navigate to dashboard
            navigate(ROUTE_PATHS.DASHBOARD);
        }
        catch (error) {
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }, [navigate]);
    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            // Clear localStorage
            localStorage.removeItem('demo-user');
            setUser(null);
            setSession(null);
            // Navigate to login
            navigate(ROUTE_PATHS.LOGIN);
        }
        catch (error) {
            console.error('Logout error:', error);
        }
        finally {
            setIsLoading(false);
        }
    }, [navigate]);
    const isAuthenticated = !!user;
    const contextValue = {
        user,
        session,
        isLoading,
        isAuthenticated,
        login,
        logout
    };
    return React.createElement(AuthContext.Provider, { value: contextValue }, children);
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
