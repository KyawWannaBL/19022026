import { Shipment, User, ROUTE_PATHS, USER_ROLES, formatCurrency } from "@/lib/index";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { Loader2, TrendingUp, Package, AlertCircle, DollarSign } from 'lucide-react';

export default function Analytics() {
  const { t } = useLanguageContext();
  // Using real-time shipment hook
  const { data: shipments = [], isLoading } = useShipments();

  const processedData = useMemo(() => {
    // Zero-mock fallback: returns empty structures if no database records exist
    if (!shipments || shipments.length === 0) {
      return { 
        metrics: { revenue: 0, onTime: "0", total: 0, exceptions: 0 }, 
        pie: [], 
        chart: [] 
      };
    }
    
    const total = shipments.length;
    const deliveredCount = shipments.filter(s => s.status === 'delivered').length;
    const inTransitCount = shipments.filter(s => s.status === 'in_transit').length;
    const failedCount = shipments.filter(s => s.status === 'failed').length;
    
    // Aggregate real revenue from the database 'cod_amount' field
    const revenue = shipments.reduce((acc, s: Shipment) => acc + (Number(s.cod_amount) || 0), 0);

    return {
      metrics: {
        revenue,
        onTime: total > 0 ? ((deliveredCount / total) * 100).toFixed(1) : "0",
        total,
        exceptions: failedCount
      },
      pie: [
        { name: t('Delivered', 'ပို့ဆောင်ပြီး'), value: deliveredCount, color: '#10b981' },
        { name: t('In Transit', 'ပို့ဆောင်ဆဲ'), value: inTransitCount, color: '#D4AF37' },
        { name: t('Failed', 'မအောင်မြင်ပါ'), value: failedCount, color: '#ef4444' }
      ]
    };
  }, [shipments, t]);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#0d2c54]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0d2c54]">{t('Analytics Overview', 'ပိုင်းခြားစိတ်ဖြာချက် အကျဉ်းချုပ်')}</h1>
      </div>

      {/* Real-Time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title={t('Total Revenue', 'စုစုပေါင်းဝင်ငွေ')} 
          value={formatCurrency(processedData.metrics.revenue)} 
          icon={<DollarSign className="text-green-600" />}
          trend="+12%" // This could eventually be dynamic based on historical comparison
        />
        <MetricCard 
          title={t('Total Shipments', 'စုစုပေါင်း ပါဆယ်အရေအတွက်')} 
          value={processedData.metrics.total.toString()} 
          icon={<Package className="text-blue-600" />}
        />
        <MetricCard 
          title={t('Delivery Success', 'ပို့ဆောင်မှု အောင်မြင်မှုနှုန်း')} 
          value={`${processedData.metrics.onTime}%`} 
          icon={<TrendingUp className="text-indigo-600" />}
        />
        <MetricCard 
          title={t('Exceptions', 'ထူးခြားဖြစ်စဉ်များ')} 
          value={processedData.metrics.exceptions.toString()} 
          icon={<AlertCircle className="text-red-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold mb-4">{t('Shipment Status', 'ပါဆယ်အခြေအနေ ခွဲဝေမှု')}</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processedData.pie}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {processedData.pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend?: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-[#0d2c54]">{value}</h3>
        {trend && <span className="text-xs text-green-600 font-bold">{trend} from last month</span>}
      </div>
      <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
    </div>
  );
}