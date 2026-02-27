import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle } from 'lucide-react';

export default function PublicTracking() {
  const { t } = useLanguageContext();
  const [id, setId] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const handleTrack = async () => {
    const { data } = await supabase
      .from('shipment_logs')
      .select('*')
      .eq('tracking_number', id)
      .order('created_at', { ascending: false });
    setHistory(data || []);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black">{t('Tracking Map', 'ခြေရာခံ မြေပုံ')}</h1>
        <p className="text-slate-500">{t('trackPlaceholder', 'Tracking ID / AWB ရိုက်ထည့်ပါ')}</p>
      </div>

      <div className="flex gap-2">
        <Input value={id} onChange={(e) => setId(e.target.value)} className="h-12 rounded-xl" placeholder="BRTXXXXXXXX" />
        <Button onClick={handleTrack} className="h-12 bg-[#0d2c54] px-8">{t('trackBtn', 'ကြည့်ရန်')}</Button>
      </div>

      <div className="space-y-4">
        {history.map((log, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="mt-1">{i === 0 ? <Truck className="text-blue-500" /> : <CheckCircle className="text-slate-300" />}</div>
            <div>
              <p className="font-bold">{log.status_update}</p>
              <p className="text-xs text-slate-400">{new Date(log.created_at).toLocaleString()}</p>
              <p className="text-sm italic">{log.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}