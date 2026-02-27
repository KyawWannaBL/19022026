export const ROUTE_PATHS = {
  HOME: '/', LOGIN: '/login', DASHBOARD: '/panel/dashboard',
  TRACKING: '/tracking', SERVICES: '/services', QUOTE: '/quote',
  DOMESTIC: '/domestic', PANEL: '/panel/*'
} as const;

export interface Shipment {
  id: string; status: string; senderName: string; receiverName: string;      
  destinationTownship: string; weight: number; createdAt: string | Date;
  awb?: string; trackingNumber?: string; cod_amount?: number;
  [key: string]: any; 
}

export interface User {
  id: string; email: string; full_name?: string; role: string; branch_id?: string;
}

export const formatCurrency = (amount: number) => `${(amount || 0).toLocaleString()} MMK`;

export const getStatusVariant = (status: string) => {
  const s = status?.toLowerCase() || '';
  if (s.includes('delivered')) return 'success';
  if (s.includes('fail')) return 'destructive';
  if (s.includes('transit')) return 'info';
  return 'warning';
};