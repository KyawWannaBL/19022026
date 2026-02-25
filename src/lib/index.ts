// src/lib/index.ts

// 1. Core Route Dictionary (လမ်းကြောင်း လိပ်စာများ)
export const ROUTE_PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/admin/dashboard',
  WAREHOUSE: '/warehouse',
  SETTINGS: '/settings',
  TRACKING: '/tracking',
  WAY_MANAGEMENT: '/admin/way-management',
  CREATE_SHIPMENT: '/shipments/create',
  MERCHANTS: '/merchants',
  DELIVERYMEN: '/deliverymen',
  ACCOUNTING: '/accounting',
  REPORTS: '/reports'
} as const;

// 2. Shipment Statuses (ပို့ဆောင်မှု အခြေအနေများ)
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed'
} as const;

export type ShipmentStatus = typeof SHIPMENT_STATUS[keyof typeof SHIPMENT_STATUS];

// 3. Bilingual Status Labels (ဘာသာစကားနှစ်မျိုးသုံး အညွှန်းများ)
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

// 4. Essential Interfaces (အဓိက အမျိုးအစား သတ်မှတ်ချက်များ)
export interface Shipment {
  id: string;
  awb?: string;
  status: ShipmentStatus | string;
  receiverName: string;
  senderName: string;
  destinationTownship: string;
  weight: number;
  createdAt: string | Date;
  cod?: { required: boolean; amount?: number };
}

// 5. Shared Helpers (အထွေထွေ အကူအညီပေးသည့် လုပ်ဆောင်ချက်များ)
export const formatCurrency = (amount: number) => `${amount.toLocaleString()} MMK`;
export const formatWeight = (weight: number, t: any) => `${weight} ${t("kg", "ကီလို")}`;
export const formatDate = (date: string | Date) => new Date(date).toLocaleDateString();

// 6. User Roles (အသုံးပြုသူ ကဏ္ဍများ)
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MERCHANT: 'merchant',
  RIDER: 'rider',
  WAREHOUSE: 'warehouse',
  MANAGER: 'manager',
  ACCOUNTANT: 'accountant'
} as const;