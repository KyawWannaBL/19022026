import { PERMISSIONS } from './index';
/**
 * @file admin-system.ts
 * @description Core system configuration for advanced multi-tenant and multi-role logistics ecosystem.
 * Reflects 2026 state-of-the-art administrative controls and business hierarchies.
 */
export const ADMIN_ROLES = {
    APP_OWNER: 'App Owner',
    SUPER_ADMIN: 'Super Admin',
    FINANCE_ADMIN: 'Finance Admin',
};
export const BUSINESS_ROLES = {
    MERCHANT: 'Merchant',
    MARKETING: 'Marketing Specialist',
    CUSTOMER_SERVICE: 'Customer Service',
};
export const CUSTOMER_ROLES = {
    INDIVIDUAL_CUSTOMER: 'Customer',
};
export const ROUTE_PATHS_ADMIN = {
    SUPER_ADMIN: {
        DASHBOARD: '/admin/super-dashboard',
        USERS: '/admin/users',
        SETTINGS: '/admin/settings',
        HEALTH: '/admin/health',
    },
    APP_OWNER: {
        CONTROL_PANEL: '/admin/owner-panel',
        HIERARCHY: '/admin/hierarchy',
    },
    FINANCE: {
        DASHBOARD: '/finance/dashboard',
        MERCHANTS: '/finance/merchants',
        PAYMENTS: '/finance/payments',
        SETTLEMENTS: '/finance/settlements',
    },
    MERCHANT: {
        PORTAL: '/merchant/portal',
        ANALYTICS: '/merchant/analytics',
        SHIPMENTS: '/merchant/shipments',
        API: '/merchant/api-access',
    },
    MARKETING: {
        DASHBOARD: '/marketing/dashboard',
        CAMPAIGNS: '/marketing/campaigns',
        SEGMENTS: '/marketing/segments',
    },
    SERVICE: {
        DASHBOARD: '/service/dashboard',
        LIVE_CHAT: '/service/chat',
        TICKETS: '/service/tickets',
    },
    CUSTOMER: {
        PORTAL: '/customer/portal',
        TRACKING: '/customer/tracking',
        SUPPORT: '/customer/support',
        LOYALTY: '/customer/loyalty',
    },
};
export const PERMISSIONS_MATRIX = {
    APP_DELETE: 'APP-DELETE', // Only for App Owner
    ADMIN_APPOINT: 'ADMIN-APPOINT', // Authority to appoint other admins
    SYSTEM_HEALTH_VIEW: 'SYSTEM-HEALTH-VIEW',
    REVENUE_ANALYTICS: 'REVENUE-ANALYTICS',
    MERCHANT_VERIFY: 'MERCHANT-VERIFY',
    PAYMENT_DISPUTE: 'PAYMENT-DISPUTE',
    CAMPAIGN_EXECUTE: 'CAMPAIGN-EXECUTE',
    USER_SEGMENT_VIEW: 'USER-SEGMENT-VIEW',
    LIVE_SUPPORT_ACCESS: 'LIVE-SUPPORT-ACCESS',
    ESCALATION_MANAGE: 'ESCALATION-MANAGE',
    GLOBAL_SEARCH: 'GLOBAL-SEARCH',
    AUDIT_LOGS_VIEW: 'AUDIT-LOGS-VIEW',
};
// Extension to the base permission set
export const ALL_SYSTEM_PERMISSIONS = {
    ...PERMISSIONS,
    ...PERMISSIONS_MATRIX,
};
/**
 * Default Permission Assignment logic for 2026 Logistics Engine
 */
export const getRolePermissions = (role) => {
    const base = Object.values(PERMISSIONS);
    switch (role) {
        case 'APP_OWNER':
            return [...base, ...Object.values(PERMISSIONS_MATRIX)];
        case 'SUPER_ADMIN':
            return [...base, ...Object.values(PERMISSIONS_MATRIX)].filter(p => p !== PERMISSIONS_MATRIX.APP_DELETE);
        case 'FINANCE_ADMIN':
            return [
                PERMISSIONS.AUD_VIEW,
                PERMISSIONS_MATRIX.REVENUE_ANALYTICS,
                PERMISSIONS_MATRIX.MERCHANT_VERIFY,
                PERMISSIONS_MATRIX.PAYMENT_DISPUTE,
                PERMISSIONS_MATRIX.AUDIT_LOGS_VIEW
            ];
        case 'MERCHANT':
            return [PERMISSIONS.TAG_VIEW, PERMISSIONS.NDR_CREATE];
        case 'MARKETING':
            return [PERMISSIONS_MATRIX.CAMPAIGN_EXECUTE, PERMISSIONS_MATRIX.USER_SEGMENT_VIEW];
        case 'CUSTOMER_SERVICE':
            return [
                PERMISSIONS_MATRIX.LIVE_SUPPORT_ACCESS,
                PERMISSIONS_MATRIX.ESCALATION_MANAGE,
                PERMISSIONS.AUD_VIEW
            ];
        default:
            return [];
    }
};
