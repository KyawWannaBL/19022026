import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DispatchManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguageContext();
  const [step, setStep] = useState<'INITIAL' | 'LOCATION' | 'MANIFEST' | 'SCANNING'>('INITIAL');
  const [destinationTownship, setDestination] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#0d2c54] uppercase italic">
              {t('Warehouse Dispatch', 'ဂိုဒေါင်မှ ပစ္စည်းထုတ်ပေးခြင်း')}
            </h1>
            <p className="text-slate-500 text-sm">{t('Create manifests for outbound transport', 'အပြင်သို့ပို့မည့် ကားများအတွက် စာရင်းပြုစုရန်')}</p>
          </div>
          <Badge className="bg-[#ff6b00]/10 text-[#ff6b00] border-[#ff6b00]/20">
            <ShieldAlert className="mr-1 h-3 w-3" /> {t('Security Enforced', 'လုံခြုံရေးစစ်ဆေးပြီး')}
          </Badge>
        </div>

        {step === 'INITIAL' && (
          <Card className="border-dashed py-12 text-center">
            <CardContent>
              <div className="mb-4 rounded-full bg-[#0d2c54]/10 p-4 text-[#0d2c54] inline-block">
                <Truck className="h-12 w-12" />
              </div>
              <CardTitle className="text-xl mb-2">{t('Ready to Dispatch?', 'ပစ္စည်းများ ထုတ်ပေးရန် အဆင်သင့်ဖြစ်ပြီလား?')}</CardTitle>
              <Button size="lg" onClick={() => setStep('LOCATION')} className="bg-[#ff6b00] font-bold uppercase">
                {t('Begin Dispatch Flow', 'လုပ်ငန်းစဉ်စတင်မည်')}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'LOCATION' && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Step 1: Verify Location', 'အဆင့် ၁ - နေရာအတည်ပြုပါ')}</CardTitle>
              <CardDescription>{t('Scan the QR code at Dispatch Bay', 'ပစ္စည်းထုတ်ပေးသည့်နေရာရှိ QR ကို စကန်ဖတ်ပါ')}</CardDescription>
            </CardHeader>
            <CardContent>
               <Button onClick={() => setStep('MANIFEST')} className="w-full bg-[#0d2c54]">{t('Simulate Location Scan', 'နေရာစစ်ဆေးမှု အတူပြုလုပ်မည်')}</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
export default DispatchManagement;