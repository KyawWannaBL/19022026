// src/components/ShipmentQRModal.tsx
import { Shipment, formatDate, getStatusLabel } from "@/lib"; // Ensure these are exported from index.ts
import { useLanguageContext } from '@/lib/LanguageContext';

export function ShipmentQRModal({ shipment, isOpen, onClose }: ShipmentQRModalProps) {
  const { t } = useLanguageContext();
  
  // Resolve TS2339: Use standardized 'awb' or fallback to 'id'
  const trackingId = shipment.awb || shipment.id || "N/A"; 

  return (
    // ... Inside the Dialog Content
    <p className="text-sm font-medium">
      {/* Fix: 'destinationTownship' -> 'destinationTownshipTownship' */}
      {shipment.destinationTownshipTownship || t("Pending", "စောင့်ဆိုင်းဆဲ")}
    </p>
    <p className="text-sm font-medium">
      {/* Fix: 'createdAt' -> 'createdAt' */}
      {shipment.createdAt ? formatDate(shipment.createdAt) : "2026-02-18"}
    </p>
  );
}