import { AWBLabel } from '@/components/AWBLabel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdvancedFeaturesAPI } from '@/services/advanced-features-api';

export default function ShipmentRegistration() {
  const { t } = useLanguageContext();
  const { user } = useAuth();
  const [shipment, setShipment] = useState<any | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      receiverName: formData.get('receiver') as string,
      receiverPhone: formData.get('phone') as string,
      destinationTownship: formData.get('township') as string,
      receiverAddress: formData.get('address') as string,
      cod_amount: Number(formData.get('cod')),
      tracking_number: `BRT${Date.now()}`
    };

    if (user) {
      const result = await AdvancedFeaturesAPI.registerShipmentWithAudit(payload, user.id);
      setShipment(result);
      setTimeout(() => window.print(), 500);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-[#0d2c54]">{t('Shipment Registration', 'ပို့ဆောင်မှု မှတ်ပုံတင်ခြင်း')}</h1>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-[2rem] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="receiver" placeholder={t('Recipient', 'လက်ခံသူ')} required className="h-12" />
        <Input name="phone" placeholder={t('Contact Phone', 'ဆက်သွယ်ရန် ဖုန်း')} required className="h-12" />
        <Input name="township" placeholder={t('Substation', 'ခွဲစခန်း')} required className="h-12" />
        <Input name="cod" type="number" placeholder="COD Amount" className="h-12" />
        <textarea name="address" placeholder="Full Address" className="md:col-span-2 p-3 bg-slate-50 rounded-xl border" required />
        <Button type="submit" className="md:col-span-2 h-14 bg-[#0d2c54] text-lg font-bold rounded-2xl">
          {t('Submit', 'တင်သွင်းရန်')} & {t('Print', 'ထုတ်ယူရန်')}
        </Button>
      </form>
      {shipment && user && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-4">
          <AWBLabel shipment={shipment} clerk={user} />
          <Button onClick={() => setShipment(null)} className="mt-8 no-print bg-slate-200 text-black">Close</Button>
        </div>
      )}
    </div>
  );
}