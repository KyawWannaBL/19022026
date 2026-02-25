import { SHIPMENT_STATUS } from '@/lib/index';
import StatusBadge from './StatusBadge';

export const TrackingTimeline = ({ steps }: { steps: any[] }) => {
  const { t } = useLanguageContext();
  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-slate-200">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex items-center gap-6 group">
          <div className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white ${step.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
            {step.completed ? <CheckCircle2 size={18} /> : <Clock size={18} />}
          </div>
          <div className="flex-1 pb-4 border-b border-slate-50">
            <h4 className="font-black text-[#0d2c54] text-sm uppercase italic">
              {t(step.titleEn, step.titleMy)}
            </h4>
            <p className="text-xs text-slate-500">{step.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
