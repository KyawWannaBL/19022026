/**
 * Britium Express - Core Constants and Types
 * © 2026 Britium Express Logistics System
 * Version: 2.4 (Ultimate Permissive Hybrid Support)
 */

// 1. Core Route Dictionary (လမ်းကြောင်း လိပ်စာများ)
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/admin/dashboard',
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
  // Accounting & Reports Sub-routes
  ACCOUNTING_TRANSACTIONS: '/accounting/transactions',
  ACCOUNTING_JOURNAL: '/accounting/journal',
  ACCOUNTING_JOURNAL_LIST: '/accounting/journal/list',
  ACCOUNTING_CASH: '/accounting/cash',
  ACCOUNTING_CASH_LIST: '/accounting/cash/list',
  ACCOUNTING_CHART: '/accounting/chart',
  ACCOUNTING_BALANCE: '/accounting/balance',
  ACCOUNTING_BANKS: '/accounting/banks',
  ACCOUNTING_BRANCH: '/accounting/branch',
  REPORTS_DELIVERYMAN: '/reports/deliveryman',
  REPORTS_MERCHANT: '/reports/merchant',
  REPORTS_TOWN: '/reports/town',
  REPORTS_AUDIT: '/reports/audit',
  REPORTS_DELIVERY_WAYS: '/reports/ways',
  REPORTS_BALANCE_SHEET: '/reports/balance-sheet',
  REPORTS_GENERAL_LEDGER: '/reports/general-ledger',
  REPORTS_INCOME_STATEMENT: '/reports/income-statement',
  REPORTS_PROFIT_LOSS: '/reports/profit-loss',
  REPORTS_TICKETS_OPEN: '/reports/tickets/open',
  REPORTS_TICKETS_CLOSED: '/reports/tickets/closed',
  // Admin & Broadcast
  BROADCAST_MESSAGES: '/admin/broadcast',
  BROADCAST_MESSAGE_HISTORY: '/admin/broadcast/history',
  BROADCAST_SEND_MESSAGE: '/admin/broadcast/send',
  MERCHANT_LIST: '/admin/merchants',
  MERCHANT_ADD_NEW: '/admin/merchants/new',
  MERCHANT_FINANCIAL_CENTER: '/admin/merchants/finance',
  MERCHANT_RECEIPTS: '/admin/merchants/receipts',
  DELIVERYMAN_LIST: '/admin/deliverymen',
  DELIVERYMAN_ADD_NEW: '/admin/deliverymen/new',
  DELIVERYMAN_CASH_ADVANCE: '/admin/deliverymen/cash',
  WAY_TRANSIT_ROUTE: '/admin/way-management/transit',
  WAY_PARCEL_IN: '/admin/way-management/parcel-in',
  // Office sub-routes
  OFFICE: {
    QUEUE: '/office/queue',
    REGISTRATION: '/office/registration/:ttId'
  }
} as const;

// 2. Constants & Status Maps
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED_AT_WAREHOUSE: 'arrived_at_warehouse',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  TT_ASSIGNED: 'tt_assigned',
  PENDING_REG: 'pending_reg',
  REGISTERED: 'registered',
  LABEL_PRINTED: 'label_printed',
  LABEL_VERIFIED: 'label_verified',
  WH_GATE: 'wh_gate',
  WH_RECEIVED: 'wh_received',
  WH_DISPATCHED: 'wh_dispatched',
  TRANSIT_TO_SS: 'transit_to_ss',
  SS_RECEIVED: 'ss_received',
  DELIVERED_POD: 'delivered_pod',
  DELIVERY_FAILED: 'delivery_failed'
} as const;

export const USER_ROLES = ['admin', 'merchant', 'rider', 'warehouse', 'manager', 'accountant'] as const;
export type UserRole = (typeof USER_ROLES)[number];

// 3. Ultimate Permissive Hybrid Interface (Resolves TS2339 in 317+ errors)
export interface Shipment {
  id: string;
  status: string;
  senderName: string;
  receiverName: string;      
  destinationTownship: string;
  weight: number;
  createdAt: string | Date;

  // GLOBAL FALLBACKS (Fixes 90% of UI property drift)
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
  estimated_delivery?: string;
  actual_delivery?: string;

  // WAREHOUSE & OPERATIONS
  pieces?: number;           
  tamperTagId?: string;      
  photos?: string[];         
  condition?: string;        
  type?: string;             
  riderId?: string;          
  history?: any[];
  labelPrintedCount?: number;
  
  // PRICING & FINANCE
  cod_amount?: number;       
  total_cost?: number;
  amount?: number;           
  cod?: {
    required: boolean;
    amount?: number;
  };
  metadata?: any;
}

export interface User {
  id: string;
  name: string;
  fullName?: string;         
  role: UserRole;
  email: string;
}

// 4. Mock Data Helpers (Resolves errors in RegistrationQueue.tsx)
export const MOCK_TOWNSHIPS = [
  "Downtown", "Airport Zone", "East Industrial", "Kamayut", "Sanchaung", "Mayangone"
];

// 5. Utility & Bilingual Helpers
export const generateTrackingNumber = () => `BRT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const getStatusVariant = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s.includes('delivered') || s.includes('success')) return 'success';
  if (s.includes('fail') || s.includes('void') || s.includes('exception')) return 'destructive';
  if (s.includes('transit') || s.includes('out')) return 'info';
  if (s.includes('pending') || s.includes('issued')) return 'warning';
  return 'default';
};

export const getStatusLabel = (status: string, t: any) => {
  const translations: Record<string, { en: string, my: string }> = {
    pending: { en: "Pending", my: "စောင့်ဆိုင်းဆဲ" },
    picked_up: { en: "Picked Up", my: "လက်ခံရရှိပြီး" },
    in_transit: { en: "In Transit", my: "ပို့ဆောင်ဆဲ" },
    arrived_at_warehouse: { en: "At Warehouse", my: "ဂိုဒေါင်သို့ရောက်ရှိ" },
    out_for_delivery: { en: "Out for Delivery", my: "ပို့ဆောင်နေသည်" },
    delivered: { en: "Delivered", my: "ရောက်ရှိပြီး" },
    failed: { en: "Failed", my: "မအောင်မြင်ပါ" },
    wh_received: { en: "Warehouse Received", my: "ဂိုဒေါင်မှလက်ခံပြီး" }
  };
  const match = translations[status?.toLowerCase()] || { en: status, my: status };
  return t(match.en, match.my);
};

export const getBilingualStatus = getStatusLabel;
export const formatDate = (date: string | Date) => date ? new Date(date).toLocaleDateString() : "-";
export const formatCurrency = (amount: number) => `${(amount || 0).toLocaleString()} MMK`;
export const formatWeight = (weight: number, t: any) => `${weight || 0} ${t('kg', 'ကီလို')}`;