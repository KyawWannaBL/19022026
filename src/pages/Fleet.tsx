import {
  Truck, Fuel, Wrench, Navigation2, Search, Filter, Activity, Users,
  Map as MapIcon, List, Calendar, AlertTriangle, Zap, ChevronRight, Plus
} from 'lucide-react';
import { ROUTE_PATHS, getStatusVariant } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { FleetStatus } from '@/components/FleetStatus';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
// Import your real API hook here
import { useFleet } from '@/hooks/useFleet'; 

const MetricsCard = ({ title, value, icon: Icon, trend, t }: any) => (
  <Card className="luxury-card overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-bold font-mono">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}% {t('vs last month', 'ယခင်လထက်')}</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Fleet() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('map');
  
  // PRODUCTION: Fetching real data from your backend/Supabase
  const { vehicles, stats, loading, error } = useFleet(); 

  const filteredVehicles = (vehicles || []).filter(v => 
    v.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center animate-pulse">{t('Loading Fleet Data...', 'ယာဉ်အချက်အလက်များ ရယူနေသည်...')}</div>;

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto w-full min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary bg-primary/10 px-3 py-1">
            {t('Enterprise Logistics 2026', 'စီးပွားရေးလုပ်ငန်းသုံး ပို့ဆောင်ရေး ၂၀၂၆')}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight font-heading">
            {t('Fleet Management', 'ယာဉ်အုပ်စု စီမံခန့်ခွဲခြင်း')}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            {t('Advanced asset monitoring and real-time efficiency control center.', 'ယာဉ်များကို အချိန်နှင့်တပြေးညီ စောင့်ကြည့်စစ်ဆေးသည့် ဗဟိုထိန်းချုပ်ရေးဌာန။')}
          </p>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="luxury-glass border-border gap-2">
            <Wrench className="w-4 h-4" /> {t('Maintenance Hub', 'ပြုပြင်ထိန်းသိမ်းမှု ဗဟို')}
          </Button>
          <Button className="luxury-button gap-2">
            <Plus className="w-4 h-4" /> {t('Register Asset', 'ယာဉ်အသစ်မှတ်ပုံတင်မည်')}
          </Button>
        </div>
      </div>

      {/* Operational Metrics - Dynamic data from stats object */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard title={t('Active Fleet', 'အသုံးပြုဆဲယာဉ်များ')} value={stats?.activeCount || 0} icon={Truck} trend={{ value: 4, isPositive: true }} t={t} />
        <MetricsCard title={t('Fuel Efficiency', 'လောင်စာဆီ အသုံးပြုမှု')} value={`${stats?.avgFuel || 0}%`} icon={Fuel} trend={{ value: 1.2, isPositive: true }} t={t} />
        <MetricsCard title={t('In Maintenance', 'ပြင်ဆင်ဆဲယာဉ်များ')} value={stats?.maintenanceCount || 0} icon={AlertTriangle} trend={{ value: 2, isPositive: false }} t={t} />
        <MetricsCard title={t('Drivers Online', 'အွန်လိုင်းရောက်ယာဉ်မောင်း')} value={stats?.driversOnline || 0} icon={Users} trend={{ value: 12, isPositive: true }} t={t} />
      </div>

      {/* Main Content Area */}
      <Tabs defaultValue="map" className="w-full space-y-8" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <TabsList className="bg-card/50 border p-1 rounded-xl luxury-glass">
            <TabsTrigger value="map" className="gap-2 px-6"><MapIcon className="w-4 h-4" /> {t('Live Tracking', 'တိုက်ရိုက်ခြေရာခံခြင်း')}</TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2 px-6"><List className="w-4 h-4" /> {t('Asset Inventory', 'ယာဉ်စာရင်း')}</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={t('Search by plate...', 'လိုင်စင်နံပါတ်ဖြင့် ရှာဖွေမည်...')} 
                className="pl-10 h-11 bg-card/50" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value="map">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-muted rounded-3xl h-[600px] relative overflow-hidden border border-border shadow-inner">
               <div className="absolute inset-0 flex items-center justify-center opacity-30 italic">{t('Map Engine Initializing...', 'မြေပုံစနစ် စတင်နေပါသည်...')}</div>
               {/* Marker Rendering Logic */}
               {filteredVehicles.map((v) => (
                 <div 
                  key={v.id} 
                  className="absolute p-2 bg-primary rounded-full shadow-lg border-2 border-white transition-all hover:scale-110" 
                  style={{ left: `${v.currentLocation?.lng}%`, top: `${v.currentLocation?.lat}%` }}
                 >
                    <Truck className="w-4 h-4 text-white" />
                 </div>
               ))}
            </div>
            
            <Card className="lg:col-span-4 h-[600px] luxury-card flex flex-col">
              <CardHeader className="border-b pb-6">
                <CardTitle className="text-xl flex items-center gap-3"><Activity className="w-5 h-5 text-primary" /> {t('Active Feed', 'လက်ရှိအခြေအနေများ')}</CardTitle>
                <CardDescription>{t('Real-time telemetry stream', 'ယာဉ်များ၏ အချက်အလက်များကို တိုက်ရိုက်ကြည့်ရှုခြင်း')}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-4">
                    {filteredVehicles.map((vehicle) => (
                      <div key={vehicle.id} className="p-4 rounded-xl bg-muted/30 border hover:border-primary/30 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <Truck className="w-4 h-4 text-primary" />
                            <div>
                              <p className="font-bold font-mono text-sm">{vehicle.plateNumber}</p>
                              <p className="text-[10px] text-muted-foreground">{vehicle.fuelLevel}% {t('Fuel', 'လောင်စာဆီ')}</p>
                            </div>
                          </div>
                          <StatusBadge status={vehicle.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
           <FleetStatus vehicles={filteredVehicles} realTimeUpdates={true} />
        </TabsContent>
      </Tabs>

      <footer className="flex flex-col md:flex-row justify-between items-center py-8 border-t text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
        <p>© 2026 FleetOps Intelligence • BRT-OS v4.2.0</p>
        <div className="flex gap-8 items-center">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)] animate-pulse" /> 
            {t('GPS Satellite Uplink Active', 'ဂျီပီအက်စ် စနစ် ချိတ်ဆက်ထားပြီး')}
          </span>
          <span>{t('Last Sync', 'နောက်ဆုံးအပ်ဒိတ်')}: {new Date().toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  );
}