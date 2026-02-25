  AlertTriangle, Camera, CheckCircle2, ChevronLeft, MapPin, Package,
  PenTool, Phone, Send, ShieldCheck, Smartphone, User, XCircle,
} from 'lucide-react';

import {
  NDR_REASONS,
  PODRecord,
  ROUTE_PATHS,
  SHIPMENT_STATUS,
  Shipment,
  formatCurrency
} from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

import PhotoCapture from '@/components/PhotoCapture';
import QRScanner from '@/components/QRScanner';
import SignaturePad from '@/components/SignaturePad';

// --- Telemetry Types & Helpers ---

type GeoEvidence = {
  lat: number; lng: number; accuracyM: number; altitudeM: number | null;
  altitudeAccuracyM: number | null; heading: number | null; speedMps: number | null;
  capturedAtIso: string;
};

type NetworkTimeEvidence = {
  networkValidatedAtIso: string;
  source: 'api' | 'server-date-header' | 'local-fallback';
};

async function getHighPrecisionLocation(): Promise<GeoEvidence | null> {
  if (!('geolocation' in navigator)) return null;
  return await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = pos.coords;
        resolve({
          lat: c.latitude, lng: c.longitude, accuracyM: c.accuracy,
          altitudeM: c.altitude ?? null, altitudeAccuracyM: c.altitudeAccuracy ?? null,
          heading: c.heading ?? null, speedMps: c.speed ?? null,
          capturedAtIso: new Date().toISOString(),
        });
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  });
}

async function getNetworkValidatedTime(): Promise<NetworkTimeEvidence> {
  try {
    const res = await fetch('/api/time', { cache: 'no-store' });
    if (res.ok) {
      const j = await res.json();
      if (j?.nowIso) return { networkValidatedAtIso: String(j.nowIso), source: 'api' };
    }
  } catch {}
  return { networkValidatedAtIso: new Date().toISOString(), source: 'local-fallback' };
}

type Step = 'scan' | 'details' | 'pod' | 'ndr';

export default function DeliveryFlow() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>('scan');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [geoEvidence, setGeoEvidence] = useState<GeoEvidence | null>(null);
  const [netTime, setNetTime] = useState<NetworkTimeEvidence | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const otpRef = useRef<HTMLInputElement>(null);
  const receiverNameRef = useRef<HTMLInputElement>(null);

  const [podData, setPodData] = useState<PODRecord>({
    receiverNameName: '',
    relationship: '',
    signature: '',
    photo: '',
  });

  const [ndrData, setNdrData] = useState({ reason: '', remarks: '' });

  const shipmentRequiresOtp = useMemo(() => Boolean(shipment?.cod?.required || shipment?.cod_amount), [shipment]);
  
  const canSubmitDelivery = useMemo(() => {
    if (!podData.receiverNameName || !podData.signature) return false;
    if (shipmentRequiresOtp && !otpVerified) return false;
    return true;
  }, [podData.receiverNameName, podData.signature, shipmentRequiresOtp, otpVerified]);

  useEffect(() => {
    if (step === 'pod') {
      (async () => {
        const [gps, nt] = await Promise.all([getHighPrecisionLocation(), getNetworkValidatedTime()]);
        setGeoEvidence(gps);
        setNetTime(nt);
      })();
      setTimeout(() => receiverNameRef.current?.focus(), 100);
    }
  }, [step]);

  const handleScan = useCallback(async (code: string) => {
    // PRODUCTION: Fetch real shipment from Supabase
    // const { data } = await supabase.from('shipments').select('*').eq('awb', code).single();
    setShipment({ 
      id: code, awb: code, status: 'out_for_delivery', 
      receiverName: 'Customer', destinationTownship: 'Kamayut',
      weight: 1.0, createdAt: new Date().toISOString(),
      senderName: 'Warehouse'
    });
    setStep('details');
  }, []);

  const handleSendOtp = useCallback(() => {
    setOtpSent(true);
    toast({ title: t('OTP Sent', 'OTP ပို့ပြီးပါပြီ'), description: 'Use 1234 for demo' });
  }, [t, toast]);

  const handleVerifyOtp = useCallback(() => {
    if (otpValue === '1234') {
      setOtpVerified(true);
      toast({ title: t('Verified', 'အတည်ပြုပြီး') });
    } else {
      toast({ variant: "destructive", title: t('Invalid OTP', 'OTP မှားယွင်းနေပါသည်') });
    }
  }, [otpValue, t, toast]);

  const handleDeliver = useCallback(async () => {
    setSubmitting(true);
    // Logic for Supabase POD Insertion would go here
    toast({ title: t('Delivery Complete', 'ပို့ဆောင်မှု အောင်မြင်ပါသည်') });
    navigate(ROUTE_PATHS.DASHBOARD);
  }, [navigate, t, toast]);

  // --- UI Renders ---

  if (step === 'scan') {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-heading">{t('Last-Mile Delivery', 'နောက်ဆုံးအဆင့် ပို့ဆောင်မှု')}</h1>
          <p className="text-muted-foreground">{t('Scan AWB QR code to start', 'စတင်ရန် ပါဆယ်မှ QR ကို စကင်ဖတ်ပါ')}</p>
        </div>
        <QRScanner onScan={handleScan} expectedType="AWB" />
        <Button variant="ghost" className="w-full" onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>
          <ChevronLeft className="mr-2 h-4 w-4" /> {t('Back', 'နောက်သို့')}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24 space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setStep('scan')}><ChevronLeft className="mr-2 h-4 w-4" /> {t('Rescan', 'ပြန်ဖတ်မည်')}</Button>
        <Badge className="bg-primary/10 text-primary border-primary/20 font-mono">{shipment?.awb}</Badge>
      </div>

      {step === 'details' && (
        <Card className="luxury-card border-none shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> {t('Recipient Info', 'လက်ခံသူ အချက်အလက်')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-[10px] uppercase text-slate-400 font-black">{t('Name', 'အမည်')}</Label><p className="font-bold text-lg">{shipment?.receiverName}</p></div>
              <div><Label className="text-[10px] uppercase text-slate-400 font-black">{t('Township', 'မြို့နယ်')}</Label><p className="font-bold text-lg">{shipment?.destinationTownship}</p></div>
            </div>
            
            {shipmentRequiresOtp && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-700 font-bold"><ShieldCheck className="h-5 w-5" /> {t('COD Required', 'ငွေကောက်ခံရန်ရှိသည်')}</div>
                  <p className="text-xl font-black text-amber-700">{formatCurrency(shipment?.cod_amount || 0)}</p>
                </div>
                {!otpSent ? (
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold" onClick={handleSendOtp}>{t('Send OTP', 'OTP ပို့မည်')}</Button>
                ) : (
                  <div className="flex gap-2">
                    <Input ref={otpRef} placeholder="••••" className="text-center font-mono text-xl tracking-widest" value={otpValue} onChange={e => setOtpValue(e.target.value)} />
                    <Button onClick={handleVerifyOtp} disabled={otpVerified}>{otpVerified ? t('Verified', 'ပြီးပါပြီ') : t('Verify', 'စစ်ဆေးမည်')}</Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep('ndr')}>{t('Failed', 'မပို့နိုင်ပါ')}</Button>
            <Button className="flex-1 luxury-button" onClick={() => setStep('pod')}>{t('Proceed to POD', 'လက်မှတ်ရယူမည်')}</Button>
          </CardFooter>
        </Card>
      )}

      {step === 'pod' && (
        <Card className="luxury-card shadow-luxury">
          <CardHeader><CardTitle className="flex items-center gap-2 font-heading"><PenTool className="h-5 w-5 text-primary" /> {t('Proof of Delivery', 'ပို့ဆောင်မှု အထောက်အထား')}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
               <Label>{t('Recipient Name', 'လက်ခံသူအမည်')}</Label>
               <Input ref={receiverNameRef} value={podData.receiverNameName} onChange={e => setPodData(p => ({...p, receiverNameName: e.target.value}))} placeholder={t('Full Name', 'နာမည်အပြည့်အစုံ')} />
             </div>
             <div className="space-y-2">
               <Label>{t('Relationship', 'တော်စပ်ပုံ')}</Label>
               <Select value={podData.relationship} onValueChange={v => setPodData(p => ({...p, relationship: v}))}>
                 <SelectTrigger><SelectValue placeholder={t('Select', 'ရွေးချယ်ပါ')} /></SelectTrigger>
                 <SelectContent>
                    <SelectItem value="self">{t('Self', 'ကိုယ်တိုင်')}</SelectItem>
                    <SelectItem value="family">{t('Family', 'မိသားစုဝင်')}</SelectItem>
                    <SelectItem value="office">{t('Office Colleague', 'လုပ်ဖော်ကိုင်ဖက်')}</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="space-y-2">
                <Label>{t('Customer Signature', 'ဖောက်သည် လက်မှတ်')}</Label>
                <SignaturePad onSave={sig => setPodData(p => ({...p, signature: sig}))} />
             </div>
          </CardContent>
          <CardFooter className="gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>{t('Back', 'ပြန်သွားမည်')}</Button>
            <Button className="flex-1 luxury-button" disabled={!canSubmitDelivery || submitting} onClick={handleDeliver}>
              {submitting ? t('Submitting...', 'တင်သွင်းနေသည်...') : t('Complete Delivery', 'ပို့ဆောင်မှု အောင်မြင်သည်')}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'ndr' && (
        <Card className="border-rose-200 bg-rose-50/30">
          <CardHeader><CardTitle className="text-rose-700 flex items-center gap-2"><AlertTriangle /> {t('Failed Delivery Report', 'မအောင်မြင်မှု အစီရင်ခံစာ')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <Label>{t('Reason', 'အကြောင်းပြချက်')}</Label>
             <Select onValueChange={v => setNdrData(p => ({...p, reason: v}))}>
               <SelectTrigger><SelectValue placeholder={t('Select Reason', 'အကြောင်းရင်း ရွေးပါ')} /></SelectTrigger>
               <SelectContent>{NDR_REASONS?.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
             </Select>
             <Textarea placeholder={t('Additional Remarks', 'အခြား မှတ်ချက်များ')} onChange={e => setNdrData(p => ({...p, remarks: e.target.value}))} />
          </CardContent>
          <CardFooter className="gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>{t('Cancel', 'မလုပ်တော့ပါ')}</Button>
            <Button className="flex-1 bg-rose-600 text-white" onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>{t('Submit NDR', 'အစီရင်ခံစာ ပို့မည်')}</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}