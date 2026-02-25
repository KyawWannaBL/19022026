export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED_AT_WAREHOUSE: 'arrived_at_warehouse',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled'
} as const;

export type ShipmentStatus = typeof SHIPMENT_STATUS[keyof typeof SHIPMENT_STATUS];

export interface Shipment {
  id: string;
  awb?: string;
  status: ShipmentStatus;
  senderName: string;
  receiverName: string;
  destinationTownship: string;
  weight: number;
  pieces: number;
  createdAt: string;
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('my-MM', { style: 'currency', currency: 'MMK' }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB');
};
export const formatWeight = (w: number) => `${w} kg`;
export const formatCurrency = (n: number) => `${n.toLocaleString()} MMK`;
export const formatDate = (d: string) => new Date(d).toLocaleDateString();
export const getStatusVariant = (s: string) => "default";
export const MOCK_TOWNSHIPS = ["Yangon", "Mandalay"];
export const NDR_REASONS = ["Unreachable", "Refused"];