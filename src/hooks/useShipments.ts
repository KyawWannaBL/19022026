import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { useMemo } from "react";
import type { Shipment } from "@/lib/index";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { useLanguageContext } from "@/lib/LanguageContext";

export type UseShipmentsResult = {
  data: Shipment[];
  isLoading: boolean;
  error?: string | null;
  refetch?: () => void;
};

/**
 * Britium Express - Production Shipment Hook
 * Standardizes data mapping between Supabase (DB) and the Hybrid Interface (UI).
 */
export function useShipments(): UseShipmentsResult {
  const { t } = useLanguageContext();
  const res = useEnterpriseShipments();

  // 1. Production Data Mapper (Resolves Line 32 Property Drift)
  const mappedData = useMemo(() => {
    const raw = res?.data;
    if (!Array.isArray(raw)) return [];

    return raw.map((item: any): Shipment => ({
      // Preserve ID and core status
      id: item.id,
      status: item.status || 'pending',
      
      // Property Mapping: Database (snake_case) -> UI (camelCase)
      senderName: item.sender_name || item.senderName || t('Unknown Sender', 'အမည်မသိ ပေးပို့သူ'),
      receiverName: item.receiver_name || item.receiverName || item.recipient || t('Unknown Receiver', 'အမည်မသိ လက်ခံသူ'),
      destinationTownship: item.destination_township || item.destinationTownship || item.destination || 'N/A',
      weight: Number(item.weight) || 0,
      createdAt: item.created_at || item.createdAt || new Date().toISOString(),

      // Permissive Hybrid Aliases (Optional Fallbacks)
      awb: item.awb || item.tracking_number || item.awb_number,
      pieces: item.pieces || 1,
      tamperTagId: item.tamper_tag_id || item.tamperTagId,
      cod_amount: Number(item.cod_amount || item.amount || 0),
      
      // Metadata Pass-through
      metadata: item.metadata || {},
    }));
  }, [res?.data, t]);

  // 2. Bilingual Error Handling
  const errorMessage = useMemo(() => {
    if (!res?.error) return null;
    return t(
      'Failed to sync shipment data. Check connection.', 
      'ဒေတာရယူရန် အဆင်မပြေပါ။ အင်တာနက်လိုင်း စစ်ဆေးပေးပါ။'
    );
  }, [res?.error, t]);

  return {
    data: mappedData,
    isLoading: !!res?.isLoading,
    error: errorMessage,
    refetch: res?.refetch,
  };
}

export default useShipments;