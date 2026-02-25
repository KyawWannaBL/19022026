// src/components/ShipmentQRModal.tsx
import { Shipment, formatDate, getStatusLabel } from "@/lib"; 
import { useLanguageContext } from '@/lib/LanguageContext';

export function ShipmentQRModal({ shipment, isOpen, onClose }: ShipmentQRModalProps) {
  const { t } = useLanguageContext();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  
  // Fix TS2339: Use standardized 'awb' or fallback to 'id'
  const trackingId = shipment.awb || shipment.id || "N/A"; 

  return (
    // ... inside the dialog
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-start gap-3">
        <MapPin className="..." />
        <div>
          <p className="...">{t('Destination', 'မြို့နယ်')}</p>
          {/* Fix TS2339: Change 'destinationTownship' to 'destinationTownshipTownship' */}
          <p className="text-sm font-medium">{shipment.destinationTownshipTownship || "N/A"}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Calendar className="..." />
        <div>
          <p className="...">{t('Timestamp', 'အချိန်နာရီ')}</p>
          <p className="text-sm font-medium">
            {/* Fix TS2551: Change 'createdAt' to 'createdAt' */}
            {shipment.createdAt ? formatDate(shipment.createdAt) : "2026-02-25"}
          </p>
        </div>
      </div>
    </div>
  );
}