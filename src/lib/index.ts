 * No Sample Data | Bilingual Ready | Module Guarded
 */

// 1. Core Route Dictionary
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/admin/dashboard',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  MERCHANT_DASHBOARD: '/merchant/dashboard',
  WAREHOUSE: '/warehouse',
  OPERATIONS: '/operations',
  ACCOUNTING: '/accounting',
  REPORTS: '/reports',
  TRACKING: '/tracking',
  WAY_MANAGEMENT: '/admin/way-management',
  CREATE_SHIPMENT: '/shipments/create',
  SETTINGS: '/settings',
  PUBLIC_TRACKING: '/tracking/public',
  SERVICES: '/services',
  GET_QUOTE: '/quote',
  ABOUT: '/about',
  NEWS: '/news',
  CONTACT: '/contact',
  SHIPMENTS: '/shipments',
  FLEET: '/fleet',
  DELIVERY: '/delivery',
  ANALYTICS: '/analytics',
  USERS: '/users',
  FINANCE: '/finance',
  PARCEL_PICKUP: '/parcel-pickup',
  ADVANCED_LOGISTICS: '/advanced-logistics',
  SHIPPING_CALCULATOR: '/calculator',
  ACCOUNTING_TRANSACTIONS: '/accounting/transactions',
  ACCOUNTING_BALANCE: '/accounting/balance',
  ACCOUNTING_BRANCH: '/accounting/branch',
  OFFICE: {
    QUEUE: '/office/queue',
    REGISTRATION: '/office/registration/:ttId'
  }
} as const;

// 2. Constants & Enums
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED_AT_WAREHOUSE: 'arrived_at_warehouse',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  PENDING_REG: 'pending_reg',
  REGISTERED: 'registered',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MERCHANT: 'merchant',
  CUSTOMER: 'customer',
  RIDER: 'rider',
  WAREHOUSE: 'warehouse',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// 3. Ultimate Permissive Hybrid Interface
// Resolves TS2339 by providing aliases for all database variations
export interface Shipment {
  id: string;
  status: string;
  senderName: string;
  receiverName: string;      
  destinationTownship: string;
  weight: number;
  createdAt: string | Date;

  // GLOBAL ALIASES (Fixes TS2339 in legacy and new modules)
  awb?: string;
  awb_number?: string;
  trackingNumber?: string;
  tracking_number?: string;
  recipient?: string;         
  receiverAddress?: string;
  receiverPhone?: string;
  senderPhone?: string;
  destination?: string;      
  origin?: string;
  created_at?: string | Date; 
  updated_at?: string | Date;
  
  // OPERATIONS & RIDER
  pieces?: number;            
  tamperTagId?: string;      
  photos?: string[];         
  condition?: string;        
  type?: string;              
  riderId?: string;          
  labelPrintedCount?: number;
  
  // FINANCE
  cod_amount?: number;        
  amount?: number;            
  cod?: {
    required: boolean;
    amount?: number;
    currency?: string;
  };
  metadata?: any;
}

// 4. Core User & Fleet Interfaces
export interface User {
  id: string;
  name: string;
  fullName?: string;          
  role: UserRole;
  email: string;
}

export interface PODRecord {
  receiverNameName: string;
  relationship: string;
  signature: string;
  photo?: string;
}

export interface FleetVehicle {
  id: string;
  plateNumber: string;
  type: 'TRUCK' | 'VAN' | 'MOTORCYCLE';
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE' | 'IDLE' | 'IN_USE';
  currentLocation?: { lat: number; lng: number };
  fuelLevel?: number;
  assignedRiderId?: string | null;
  lastService?: string;
}

// 5. Utility & Bilingual Helpers
export const formatCurrency = (amount: number) => `${(amount || 0).toLocaleString()} MMK`;

export const getStatusVariant = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s.includes('delivered') || s.includes('success')) return 'success';
  if (s.includes('fail') || s.includes('void')) return 'destructive';
  if (s.includes('transit') || s.includes('out')) return 'info';
  if (s.includes('pending')) return 'warning';
  return 'default';
};

// Fixed Bilingual logic to remove hardcoded Myanmar strings
export const getBilingualStatus = (status: string, t: any) => {
  const s = status?.toLowerCase() || 'pending';
  // Uses translation keys to fetch values from local JSON files
  return t(`status.${s}`) || s;
};

// Guard against global scope pollution
export {};