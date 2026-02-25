// src/lib/index.ts

export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed'
} as const;

export type ShipmentStatus = typeof SHIPMENT_STATUS[keyof typeof SHIPMENT_STATUS];

// Bilingual Status Labels
export const getStatusLabel = (status: string, t: any) => {
  const labels: Record<string, {en: string, my: string}> = {
    pending: { en: "Pending", my: "စောင့်ဆိုင်းဆဲ" },
    picked_up: { en: "Picked Up", my: "လက်ခံရရှိပြီး" },
    in_transit: { en: "In Transit", my: "ပို့ဆောင်ဆဲ" },
    delivered: { en: "Delivered", my: "ရောက်ရှိပြီး" },
    failed: { en: "Failed", my: "မအောင်မြင်ပါ" }
  };
  const label = labels[status] || { en: status, my: status };
  return t(label.en, label.my);
};

export const formatCurrency = (amount: number) => `${amount.toLocaleString()} MMK`;
export const formatWeight = (weight: number, t: any) => `${weight} ${t("kg", "ကီလို")}`;