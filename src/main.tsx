 * Britium Express - Core Constants and Types
 * © 2026 Britium Express Logistics System - Production Final
 */

export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/admin/dashboard',
  TRACKING: '/tracking',
  // ... (Full routes as previously established)
} as const;

export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;

export interface Shipment {
  id: string;
  status: string;
  senderName: string;
  receiverName: string;      
  destinationTownship: string;
  weight: number;
  createdAt: string | Date;
  awb?: string;
  tracking_number?: string;
  cod_amount?: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

export const formatCurrency = (amount: number) => `${(amount || 0).toLocaleString()} MMK`;

export const getBilingualStatus = (status: string, t: any) => {
  const s = status?.toLowerCase() || 'pending';
  return t(`status.${s}`) || s;
};

export {};