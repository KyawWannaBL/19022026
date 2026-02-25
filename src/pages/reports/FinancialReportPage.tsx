import { Shipment, formatCurrency } from "@/lib/index";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Wallet, ArrowDownRight, Printer, UserCheck } from 'lucide-react';

export default function FinancialReportPage() {
  const { t } = useLanguageContext();
  const { data: shipments = [], isLoading } = useShipments();

  // 1. Comprehensive Financial Aggregation
  const financialSummary = useMemo(() => {
    const totalCOD = shipments.reduce((acc, s) => acc + (Number(s.cod_amount) || 0), 0);
    const deliveredRevenue = shipments
      .filter(s => s.status === 'delivered')
      .reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
    const pendingCOD = shipments
      .filter(s => s.status !== 'delivered' && s.status !== 'failed')
      .reduce((acc, s) => acc + (Number(s.cod_amount) || 0), 0);

    return { totalCOD, deliveredRevenue, pendingCOD };
  }, [shipments]);

  if (isLoading) return <div className="p-8 font-bold">{t('Loading session…', 'ဆက်ရှင်ကို တင်နေသည်…')}</div>;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#0d2c54] tracking-tight">
            {t('Executive Dashboard', 'အမှုဆောင် ဒက်ရှ်ဘုတ်')}
          </h1>
          <p className="text-slate-500">{t('Real-time revenue and COD reconciliation', 'ဝင်ငွေနှင့် COD စာရင်းစစ်ဆေးမှု')}</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-slate-50 transition-all no-print"
        >
          <Printer className="h-4 w-4" /> {t('Reports', 'အစီရင်ခံစာများ')}
        </button>
      </header>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label={t('Finance', 'ငွေကြေး')} 
          value={formatCurrency(financialSummary.deliveredRevenue)} 
          icon={<DollarSign className="text-green-600" />} 
        />
        <StatCard 
          label={t('Total COD Collected', 'ကောက်ခံရရှိသော COD')} 
          value={formatCurrency(financialSummary.totalCOD)} 
          icon={<Wallet className="text-blue-600" />} 
        />
        <StatCard 
          label={t('Audit Logs', 'စစ်ဆေးမှတ်တမ်းများ')} 
          value={formatCurrency(financialSummary.pendingCOD)} 
          icon={<ArrowDownRight className="text-amber-600" />} 
        />
      </div>

      {/* 3. Detailed Audit Table: Including Sender, Receiver, and Clerk */}
      <Card className="rounded-[2rem] border-none shadow-xl overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-50">
          <CardTitle className="text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <UserCheck className="h-4 w-4" /> {t('Audit Logs', 'စစ်ဆေးမှတ်တမ်းများ')}
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold">{t('AWB', 'နံပါတ်')}</TableHead>
                <TableHead className="font-bold">{t('Shipment Registration', 'ပို့ဆောင်မှု မှတ်ပုံတင်ခြင်း')}</TableHead>
                <TableHead className="font-bold">{t('Recipient', 'လက်ခံသူ')}</TableHead>
                <TableHead className="font-bold">Clerk (Order Picker)</TableHead>
                <TableHead className="font-bold">{t('Amount', 'ပမာဏ')}</TableHead>
                <TableHead className="font-bold">{t('Status', 'အခြေအနေ')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((s) => (
                <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs font-bold">{s.awb || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p className="font-bold">{s.senderName || t('Unauthorized', 'ခွင့်မပြုပါ')}</p>
                      <p className="text-slate-400">{s.senderPhone || '---'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p className="font-bold">{s.receiverName}</p>
                      <p className="text-slate-400">{s.receiverPhone}</p>
                      <p className="italic text-[10px]">{s.destinationTownship}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-[#0d2c54]">
                    {s.registeredBy || 'System Admin'}
                  </TableCell>
                  <TableCell className="font-bold text-[#ff6b00]">
                    {formatCurrency(Number(s.cod_amount) || 0)}
                  </TableCell>
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
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-lg rounded-[2rem] bg-white">
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