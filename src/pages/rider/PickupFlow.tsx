import { useLanguageContext } from '@/lib/LanguageContext';
import { Shipment, ROUTE_PATHS, formatCurrency } from "@/lib/index";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Printer, PackageCheck, Camera, Loader2 } from 'lucide-react';

export default function PickupFlow() {
  const { t } = useLanguageContext();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedAwb, setScannedAwb] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // Initialize Scanner
  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
      scanner.render((data) => {
        setScannedAwb(data);
        setIsScanning(false);
        scanner.clear();
      }, (err) => console.warn(err));
      return () => scanner.clear();
    }
  }, [isScanning]);

  const handlePrintLabel = () => {
    setIsPrinting(true);
    // Simulate Bluetooth/Network Print Trigger
    setTimeout(() => {
      window.print(); 
      setIsPrinting(false);
    }, 1500);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-20">
      <header className="flex justify-between items-center bg-[#0d2c54] p-6 rounded-[2rem] text-white shadow-2xl">
        <div>
          <h1 className="text-xl font-bold">{t('Rider Pickup', 'ပစ္စည်းသိမ်းဆည်းမှု')}</h1>
          <p className="text-xs text-slate-300">{new Date().toLocaleDateString()}</p>
        </div>
        <PackageCheck className="h-8 w-8 text-[#ff6b00]" />
      </header>

      {/* Step 1: Scan AWB or Tamper Tag */}
      {!scannedAwb && !isScanning && (
        <Card className="border-dashed border-2 border-slate-200 rounded-[2rem] bg-slate-50">
          <CardContent className="p-10 flex flex-col items-center gap-4 text-center">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <QrCode className="h-10 w-10 text-[#0d2c54]" />
            </div>
            <div>
              <h2 className="font-bold text-lg">{t('Ready to Scan', 'စကင်ဖတ်ရန် အဆင်သင့်')}</h2>
              <p className="text-sm text-slate-500">{t('Scan the shipment AWB or Tamper Tag', 'ပါဆယ်ကုဒ် သို့မဟုတ် တံဆိပ်ကို စကင်ဖတ်ပါ')}</p>
            </div>
            <Button onClick={() => setIsScanning(true)} className="w-full bg-[#0d2c54] h-12 rounded-xl">
              <Camera className="mr-2 h-4 w-4" /> {t('Open Scanner', 'စကင်နာဖွင့်ရန်')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Camera View */}
      {isScanning && (
        <div className="overflow-hidden rounded-[2rem] border-4 border-[#0d2c54] shadow-2xl">
          <div id="reader" className="w-full"></div>
          <Button onClick={() => setIsScanning(false)} variant="destructive" className="w-full rounded-none h-12">
            {t('Cancel', 'မလုပ်တော့ပါ')}
          </Button>
        </div>
      )}

      {/* Step 2: Pickup Confirmation & Label Generation */}
      {scannedAwb && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <Card className="rounded-[2rem] shadow-xl border-none bg-white overflow-hidden">
            <div className="bg-green-500 p-4 text-white text-center font-bold">
              {t('Shipment Identified', 'ပါဆယ်ကို စစ်ဆေးတွေ့ရှိသည်')}
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-slate-500 text-sm uppercase font-bold">{t('AWB Number', 'AWB နံပါတ်')}</span>
                <span className="font-mono font-bold text-lg text-[#0d2c54]">{scannedAwb}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrintLabel}
                  disabled={isPrinting}
                  className="h-24 flex flex-col gap-2 rounded-2xl border-slate-200"
                >
                  {isPrinting ? <Loader2 className="animate-spin" /> : <Printer className="h-6 w-6 text-[#ff6b00]" />}
                  <span className="text-xs font-bold">{t('Print Label', 'လိပ်စာကပ်ခွာထုတ်ရန်')}</span>
                </Button>
                
                <Button 
                  className="h-24 flex flex-col gap-2 rounded-2xl bg-[#0d2c54]"
                  onClick={() => {/* Finalize Logic */}}
                >
                  <PackageCheck className="h-6 w-6" />
                  <span className="text-xs font-bold">{t('Confirm Pickup', 'သိမ်းဆည်းမှုအတည်ပြု')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="ghost" className="w-full text-slate-400" onClick={() => setScannedAwb(null)}>
            {t('Scan Another', 'နောက်တစ်ခုဖတ်ရန်')}
          </Button>
        </div>
      )}
    </div>
  );
}