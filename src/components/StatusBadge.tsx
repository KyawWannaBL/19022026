import React from 'react';
import { CheckCircle2, Clock, Truck, Archive, AlertTriangle, XCircle } from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { SHIPMENT_STATUS } from '@/lib/index';

export default function StatusBadge({ status }: { status: string }) {
  const { t } = useLanguageContext();
  const config: Record<string, { en: string; my: string; icon: any; color: string }> = {
    [SHIPMENT_STATUS.PENDING]: {
      en: 'Pending', my: 'စောင့်ဆိုင်းဆဲ', icon: Clock,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    },
    [SHIPMENT_STATUS.DELIVERED]: {
      en: 'Delivered', my: 'ရောက်ရှိပြီး', icon: CheckCircle2,
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    },
    [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: {
      en: 'In Delivery', my: 'ပို့ဆောင်နေသည်', icon: Truck,
      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    },
    [SHIPMENT_STATUS.FAILED]: {
      en: 'Failed', my: 'မအောင်မြင်ပါ', icon: XCircle,
      color: 'bg-red-500/10 text-red-500 border-red-500/20',
    }
  };
  const item = config[status] || { en: status, my: status, icon: AlertTriangle, color: 'bg-slate-100' };
  const Icon = item.icon;
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-bold text-[10px] uppercase tracking-wider ${item.color}`}>
      <Icon size={12} />
      <span>{t(item.en, item.my)}</span>
    </div>
  );
}
