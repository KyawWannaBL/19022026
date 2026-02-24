import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Shipment } from '@/lib/index';
import StatusBadge from '@/components/StatusBadge';
import { Package, Calendar, MapPin } from 'lucide-react';

/**
 * Shipments List Component
 * Resolves 5 syntax errors and adds Myanmar support.
 */
export const ShipmentsList = ({ shipments }: { shipments: Shipment[] }) => {
  const { t } = useLanguageContext();

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
          <tr>
            <th className="px-6 py-4">{t('shipment.id', 'ID')}</th>
            <th className="px-6 py-4">{t('shipment.status', 'အခြေအနေ')}</th>
            <th className="px-6 py-4">{t('shipment.destination', 'ပို့မည့်နေရာ')}</th>
            <th className="px-6 py-4">{t('shipment.date', 'ရက်စွဲ')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {shipments.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-[#0d2c54]">{s.awb || s.id}</td>
              <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
              <td className="px-6 py-4 text-slate-600">{s.destinationTownship}</td>
              <td className="px-6 py-4 text-slate-400">
                {new Date(s.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};