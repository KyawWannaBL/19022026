import { useLanguageContext } from '@/lib/LanguageContext';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Standardized Mock Data for 2026 Context
const MOCK_ACTIVE: Shipment[] = [{
  id: 'T1',
  awb: 'BRT-2026-X99', 
  receiverName: 'Zarni Hein',
  destinationTownship: 'Kamayut', // Fixed: Property Drift Corrected
  status: 'out_for_delivery',
  weight: 1.2,
  createdAt: new Date().toISOString()
}];

export default function RealTimeTrackingDashboard() {
  const { t } = useLanguageContext(); 
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const active = useMemo(() => 
    MOCK_ACTIVE.find(s => s.id === selectedId) || MOCK_ACTIVE[0], 
    [selectedId]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-200">
      {/* Sidebar: Delivery List / ပို့ဆောင်မှုစာရင်း */}
      <div className="lg:col-span-4 space-y-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder={t('Search Active Deliveries...', 'ပို့ဆောင်မှုများ ရှာဖွေမည်...')}
          />
        </div>
        
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {MOCK_ACTIVE.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelectedId(s.id)} 
              className={cn(
                "p-4 rounded-2xl bg-white border transition-all cursor-pointer hover:shadow-md",
                active.id === s.id ? "border-primary ring-1 ring-primary/10" : "border-slate-100"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[10px] font-black tracking-tighter text-primary bg-primary/5 px-2 py-0.5 rounded">
                  {s.awb}
                </span>
                <StatusBadge status={s.status} size="sm" />
              </div>
              <h4 className="font-bold text-slate-800">{s.receiverName}</h4>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {s.destinationTownship}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main View: Live Tracking Map / တိုက်ရိုက်မြေပုံ */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="min-h-[500px] relative bg-slate-200 rounded-3xl overflow-hidden border-none shadow-inner">
          {/* Status Overlay */}
          <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Truck className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {t('Current Status', 'လက်ရှိအခြေအနေ')}
              </p>
              <h3 className="font-black text-slate-800 uppercase tracking-tight">
                {getBilingualStatus(active.status, t)}
              </h3>
            </div>
          </div>

          {/* Map Placeholder / မြေပုံနေရာ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
            <div className="relative">
              <Navigation className="h-16 w-16 text-slate-400 animate-bounce" />
              <div className="absolute -bottom-2 w-16 h-4 bg-slate-400/20 rounded-[100%] blur-sm" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-6 text-slate-500">
              GPS Satellite Uplink Active
            </p>
          </div>

          {/* Map Footer Info */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-10">
            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-mono flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('Last Sync', 'နောက်ဆုံးအပ်ဒိတ်')}: {new Date().toLocaleTimeString()}
            </div>
            <Button variant="secondary" size="sm" className="rounded-full bg-white shadow-lg text-[10px] font-bold uppercase tracking-widest">
              <RefreshCw className="h-3 w-3 mr-2" /> {t('Refresh', 'ပြန်ယူမည်')}
            </Button>
          </div>
        </Card>

        {/* Security and Telemetry Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-tighter">Secure Transit</p>
              <p className="text-xs text-emerald-600/80 font-medium">Verified by Biometric POD</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
            <Activity className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-black text-blue-800 uppercase tracking-tighter">Telemetry</p>
              <p className="text-xs text-blue-600/80 font-medium">99.8% GPS Accuracy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}