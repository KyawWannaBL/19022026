// src/components/RealTimeTrackingDashboard.tsx
import {
  SHIPMENT_STATUS,
  formatDate,
  getStatusVariant, // Ensure this helper exists in lib/index.ts
} from '@/lib/index';

// Fix TS2724: Use 'string' for status to avoid complex type union errors
interface RouteStop {
  id: string;
  address: string;
  status: string; 
  eta: string;
  customerName: string;
  orderId: string;
}