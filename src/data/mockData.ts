import { Shipment } from "@/lib/index";

export const mockShipments: Shipment[] = [
  {
    id: '1',
    status: 'In Transit',
    senderName: 'Britium Central',
    receiverName: 'Aung Ko Ko',
    destinationTownship: 'Yangon',
    weight: 1.5,
    createdAt: new Date().toISOString(),
    awb: 'BRT-2001-RGN'
  },
  {
    id: '2',
    status: 'Pending',
    senderName: 'Merchant Hub',
    receiverName: 'Ma Su',
    destinationTownship: 'Mandalay',
    weight: 0.5,
    createdAt: new Date().toISOString(),
    awb: 'BRT-2002-MDY'
  }
];

export const mockBranches = [
  { id: 'B1', name: 'Yangon Main Hub', city: 'Yangon' },
  { id: 'B2', name: 'Mandalay Station', city: 'Mandalay' }
];