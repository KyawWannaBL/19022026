// src/lib/index.ts

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
  SETTINGS: '/settings'
} as const;

// 2. Bilingual Shipment Status Mapper (ပို့ဆောင်မှု အခြေအနေ ဘာသာပြန်များ)
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  ARRIVED_AT_WAREHOUSE: 'arrived_at_warehouse',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  TT_ASSIGNED_AT_PICKUP: 'tt_assigned',
  PICKED_UP_PENDING_REGISTRATION: 'pending_reg',
  REGISTERED_READY_FOR_LABEL: 'registered',
  LABEL_PRINTED: 'label_printed',
  LABEL_APPLIED_VERIFIED: 'label_verified',
  ARRIVED_WAREHOUSE_GATE: 'wh_gate',
  WAREHOUSE_RECEIVED_VERIFIED: 'wh_received',
  WAREHOUSE_DISPATCHED: 'wh_dispatched',
  IN_TRANSIT_TO_SUBSTATION: 'transit_to_ss',
  SUBSTATION_RECEIVED_VERIFIED: 'ss_received',
  DELIVERED_POD_CAPTURED: 'delivered_pod',
  DELIVERY_FAILED_NDR: 'delivery_failed'
} as const;

// 3. Tag Status Constants (တံဆိပ်ကပ်မှု အခြေအနေများ)
export const TAG_STATUS = {
  IN_STOCK: 'in_stock',
  ISSUED_TO_RIDER: 'issued',
  USED: 'used',
  VOID: 'void',
  LOST_SUSPECT: 'lost',
  RETURNED_TO_STOCK: 'returned'
} as const;

/**
 * Global Bilingual Label Fetcher
 */
export const getBilingualStatus = (status: string, t: any) => {
  const translations: Record<string, { en: string, my: string }> = {
    pending: { en: "Pending", my: "စောင့်ဆိုင်းဆဲ" },
    picked_up: { en: "Picked Up", my: "လက်ခံရရှိပြီး" },
    in_transit: { en: "In Transit", my: "ပို့ဆောင်ဆဲ" },
    arrived_at_warehouse: { en: "At Warehouse", my: "ဂိုဒေါင်သို့ရောက်ရှိ" },
    out_for_delivery: { en: "Out for Delivery", my: "ပို့ဆောင်နေသည်" },
    delivered: { en: "Delivered", my: "ရောက်ရှိပြီး" },
    failed: { en: "Failed", my: "မအောင်မြင်ပါ" },
    tt_assigned: { en: "Tag Assigned", my: "တံဆိပ်ကပ်ပြီး" },
    pending_reg: { en: "Pending Registration", my: "စာရင်းသွင်းရန်ကျန်" },
    registered: { en: "Registered", my: "စာရင်းသွင်းပြီး" },
    label_printed: { en: "Label Printed", my: "လိပ်စာကပ်ခွံထုတ်ပြီး" },
    label_verified: { en: "Label Verified", my: "လိပ်စာမှန်ကန်ကြောင်းစစ်ပြီး" },
    wh_gate: { en: "At Warehouse Gate", my: "ဂိုဒေါင်ဂိတ်သို့ရောက်" },
    wh_received: { en: "Warehouse Received", my: "ဂိုဒေါင်မှလက်ခံပြီး" },
    wh_dispatched: { en: "Dispatched from WH", my: "ဂိုဒေါင်မှထွက်ခွာ" },
    transit_to_ss: { en: "Transit to Substation", my: "ဂိတ်ခွဲသို့ပို့ဆောင်ဆဲ" },
    in_stock: { en: "In Stock", my: "ပစ္စည်းရှိသည်" },
    issued: { en: "Issued", my: "ထုတ်ပေးပြီး" },
    used: { en: "Used", my: "အသုံးပြုပြီး" }
  };

  const match = translations[status] || { en: status, my: status };
  return t(match.en, match.my);
};

// 4. Essential Interfaces
export interface Shipment {
  id: string;
  awb?: string;
  tamperTagId?: string;
  status: string;
  receiverName: string;
  senderName: string;
  destinationTownship: string;
  weight: number;
  createdAt: string | Date;
  cod?: { required: boolean; amount?: number };
}

// 5. Shared Bilingual Helpers
export const formatDate = (date: string | Date) => new Date(date).toLocaleDateString();
export const formatCurrency = (amount: number) => `${amount.toLocaleString()} MMK`;
export const formatWeight = (weight: number, t: any) => `${weight} ${t('kg', 'ကီလို')}`;