import { useLanguageContext } from '@/lib/LanguageContext';
import { Shipment, formatCurrency, getStatusVariant } from "@/lib/index";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, TrendingUp, Wallet, ArrowDownRight, Printer } from 'lucide-react';

export default function FinancialReportPage() {
  const { t } = useLanguageContext();
  const { data: shipments = [], isLoading } = useShipments();

  const financialSummary = useMemo(() => {
    // Aggregate real values from database
    const totalCOD = shipments.reduce((acc, s) => acc + (Number(s.cod_amount) || 0), 0);
    const deliveredRevenue = shipments
      .filter(s => s.status === 'delivered')
      .reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
    const pendingCOD = shipments
      .filter(s => s.status !== 'delivered' && s.status !== 'failed')
      .reduce((acc, s) => acc + (Number(s.cod_amount) || 0), 0);

    return { totalCOD, deliveredRevenue, pendingCOD };
  }, [shipments]);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] tracking-tight">
            {t('Financial Intelligence', 'ဘဏ္ဍာရေးဆိုင်ရာ အစီရင်ခံစာ')}
          </h1>
          <p className="text-slate-500">{t('Real-time revenue and COD reconciliation', 'ဝင်ငွေနှင့် COD စာရင်းစစ်ဆေးမှု')}</p>
        </div>
        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-all">
          <Printer className="h-4 w-4" /> {t('Export PDF', 'PDF ထုတ်ရန်')}
        </button>
      </header>

      {/* 1. Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label={t('Net Revenue', 'အသားတင်ဝင်ငွေ')} 
          value={formatCurrency(financialSummary.deliveredRevenue)} 
          icon={<DollarSign className="text-green-600" />} 
        />
        <StatCard 
          label={t('Total COD Collected', 'ကောက်ခံရရှိသော COD')} 
          value={formatCurrency(financialSummary.totalCOD)} 
          icon={<Wallet className="text-blue-600" />} 
        />
        <StatCard 
          label={t('Pending Reconciliation', 'စစ်ဆေးဆဲ ငွေစာရင်း')} 
          value={formatCurrency(financialSummary.pendingCOD)} 
          icon={<ArrowDownRight className="text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Revenue Trend Chart */}
        <Card className="rounded-[2rem] border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-slate-400">
              {t('Revenue Growth', 'ဝင်ငွေတိုးတက်မှုနှုန်း')}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={shipments.slice(0, 10)}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d2c54" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d2c54" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="createdAt" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#0d2c54" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Transaction Logs */}
        <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-white">
            <CardTitle className="text-sm uppercase tracking-widest text-slate-400">
              {t('Recent Transactions', 'လတ်တလော ငွေလွှဲမှုများ')}
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>{t('AWB', 'နံပါတ်')}</TableHead>
                  <TableHead>{t('Amount', 'ပမာဏ')}</TableHead>
                  <TableHead>{t('Status', 'အခြေအနေ')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.slice(0, 5).map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.awb || s.tracking_number}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(Number(s.cod_amount) || 0)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold bg-slate-100`}>
                        {s.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-lg rounded-[2rem]">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</p>
          <h3 className="text-2xl font-black text-[#0d2c54]">{value}</h3>
        </div>
        <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center">{icon}</div>
      </CardContent>
    </Card>
  );
}