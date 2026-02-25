import { useAuth } from '@/hooks/useAuth';
import { AWBLabel } from '@/components/AWBLabel';
import { Button } from '@/components/ui/button';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function ShipmentRegistration() {
  const { t } = useLanguageContext();
  const { user } = useAuth(); // Identifies the account initiating the registration
  const [shipmentData, setShipmentData] = useState<any | null>(null);

  const onRegisterSuccess = (data: any) => {
    // This data would include the generated AWB from your backend/Supabase
    setShipmentData(data);
    // Auto-trigger print after a short delay for rendering
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="registration-container p-6">
      {/* Registration Form Components Here */}
      
      {shipmentData && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4">
          <div className="mb-4 no-print text-center">
            <h2 className="text-xl font-bold text-green-600">{t('Registration Successful', 'စာရင်းသွင်းမှု အောင်မြင်သည်')}</h2>
            <p className="text-sm text-slate-500">{t('Printing AWB...', 'ဘောက်ချာ ထုတ်ယူနေသည်...')}</p>
          </div>
          
          <AWBLabel shipment={shipmentData} generator={user} />
          
          <Button 
            className="mt-6 no-print bg-[#0d2c54]" 
            onClick={() => setShipmentData(null)}
          >
            {t('Close & New Registration', 'ပိတ်ပြီး အသစ်ပြန်ဖွင့်ရန်')}
          </Button>
        </div>
      )}
    </div>
  );
}