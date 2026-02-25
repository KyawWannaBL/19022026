import { Shipment, formatDate, formatCurrency } from '@/lib/index';
import StatusBadge from './StatusBadge';

export const ShipmentCard = ({ shipment }: { shipment: Shipment }) => {
  const { t } = useLanguageContext();
  return (
    <Card className="border-slate-200 hover:shadow-lg transition-all overflow-hidden group">
      <div className="h-1.5 bg-[#ff6b00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('Tracking ID', 'ခြေရာခံအမှတ်')}</span>
            <h3 className="text-[#0d2c54] font-black font-mono">{shipment.awb || shipment.id}</h3>
          </div>
          <StatusBadge status={shipment.status} />
        </div>
        <div className="grid grid-cols-2 gap-y-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg text-[#ff6b00]"><User size={14} /></div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t('Recipient', 'လက်ခံသူ')}</p>
              <p className="text-xs font-bold text-[#0d2c54] truncate">{shipment.receiverName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg text-[#ff6b00]"><MapPin size={14} /></div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">{t('Location', 'မြို့နယ်')}</p>
              <p className="text-xs font-bold text-[#0d2c54] truncate">{shipment.destinationTownship}</p>
            </div>
          </div>
        </div>
        {shipment.cod?.required && (
          <div className="mt-2 p-3 bg-[#0d2c54] rounded-xl flex justify-between items-center shadow-inner">
            <span className="text-[10px] font-black text-white/50 uppercase italic">{t('Collect Amount', 'ကောက်ခံရန်ငွေ')}</span>
            <span className="text-sm font-black text-white">{formatCurrency(shipment.cod.amount || 0)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
