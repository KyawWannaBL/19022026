/**
 * Britium Express - Core Constants and Types
 * © 2026 Britium Express Logistics System
 */
export const ROUTE_PATHS = {
    // Public Pages
    HOME: '/',
    SERVICES: '/services',
    GET_QUOTE: '/get-quote',
    SHIPPING_CALCULATOR: '/quote',
    ABOUT: '/about',
    NEWS: '/news',
    CONTACT: '/contact',
    PUBLIC_TRACKING: '/track',
    SUPPORT: '/support',
    LEGAL: '/legal',
    // Authentication
    LOGIN: '/login',
    REGISTER: '/register',
    // Role-Based Dashboards
    DASHBOARD: '/admin/dashboard',
    CUSTOMER_DASHBOARD: '/customer/dashboard',
    MERCHANT_DASHBOARD: '/merchant/dashboard',
    RIDER_DASHBOARD: '/rider/dashboard',
    MARKETER_DASHBOARD: '/marketer/dashboard',
    CS_DASHBOARD: '/customer-service/dashboard',
    // Merchant Portal Sub-pages
    MERCHANT_ORDERS: '/merchant/orders',
    MERCHANT_TRACKING: '/merchant/tracking',
    MERCHANT_PROFILE: '/merchant/profile',
};
export const USER_ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    RIDER: 'rider',
    MERCHANT: 'merchant',
    CUSTOMER: 'customer',
};
export const SHIPMENT_STATUSES = {
    PENDING: 'pending',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
};
