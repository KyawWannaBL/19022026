import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDown, Package, Scan, CheckCircle, XCircle, 
  ArrowLeft, RefreshCw, QrCode, Clock, User, MapPin 
} from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import WarehouseAPI, { WarehouseParcel, WarehouseUser } from '@/lib/warehouse-api';
import { ROUTE_PATHS } from '@/lib/index';

interface ScanInResult {
  id: string;
  awb: string;
  success: boolean;
  message: string;
  parcel?: WarehouseParcel;
  timestamp: Date;
}

export default function WarehouseScanIn() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const [user, setUser] = useState<WarehouseUser | null>(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [scanLocation, setScanLocation] = useState('receiving_dock');
  const [notes, setNotes] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanInResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [todayStats, setTodayStats] = useState({ scannedIn: 0, successful: 0, failed: 0 });

  useEffect(() => {
    loadUserData();
    loadTodayStats();
  }, []);

  const loadUserData = async () => {
    try {
      const warehouseUser = await WarehouseAPI.getWarehouseUser();
      setUser(warehouseUser);
    } catch (e) { console.error(e); }
  };

  const loadTodayStats = async () => {
    if (!user?.station_id) return;
    try {
      const operations = await WarehouseAPI.getOperations(user.station_id, 100);
      const today = new Date().toDateString();
      const todayOps = operations.filter(op => 
        new Date(op.createdAt).toDateString() === today && op.operation_type === 'scan_in'
      );
      setTodayStats({
        scannedIn: todayOps.length,
        successful: todayOps.filter(op => op.to_status === 'inbound_received').length,
        failed: todayOps.filter(op => op.to_status !== 'inbound_received').length
      });
    } catch (e) { console.error(e); }
  };

  const handleScanIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim() || !user) return;
    setScanning(true);
    setError(null);

    try {
      const scanResult = await WarehouseAPI.scanQRCode(trackingCode.trim());
      if (!scanResult.success || scanResult.type !== 'parcel') {
        throw new Error(scanResult.message || t('Invalid parcel QR code', 'မှားယွင်းနေသော QR Code ဖြစ်သည်'));
      }

      const parcel = scanResult.data as WarehouseParcel;
      const updateSuccess = await WarehouseAPI.updateParcelStatus(parcel.id, 'inbound_received', 'scan_in', {
        scanMethod: 'manual_entry', scanLocation, notes: notes.trim() || undefined, qrCodeScanned: trackingCode.trim()
      });

      const result: ScanInResult = {
        id: Date.now().toString(),
        awb: parcel.awb,
        success: updateSuccess,
        message: updateSuccess 
          ? `${t('Received successfully', 'အောင်မြင်စွာ လက်ခံရရှိသည်')} - ${parcel.awb}` 
          : t('Reception failed', 'လက်ခံရန် မအောင်မြင်ပါ'),
        parcel: updateSuccess ? parcel : undefined,
        timestamp: new Date()
      };

      setScanResults(prev => [result, ...prev.slice(0, 9)]);
      if (updateSuccess) { setTrackingCode(''); setNotes(''); loadTodayStats(); }
    } catch (err: any) {
      setError(err.message);
    } finally { setScanning(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={ROUTE_PATHS.WAREHOUSE}>
            <Button variant="outline" size="sm" className="font-bold">
              <ArrowLeft className="h-4 w-4 mr-2" /> {t('Back', 'နောက်သို့')}
            </Button>
          </Link>
          <h1 className="text-xl font-black text-[#0d2c54] uppercase italic flex items-center">
            <ArrowDown className="h-5 w-5 mr-2 text-green-600" />
            {t('Warehouse Scan-In', 'ဂိုဒေါင်အဝင် စာရင်းသွင်းခြင်း')}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase">{t('Today Scanned', 'ယနေ့စာရင်းသွင်းပြီး')}</p>
                <p className="text-2xl font-black text-blue-900">{todayStats.scannedIn}</p>
              </div>
              <ArrowDown className="h-8 w-8 text-blue-300" />
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-green-600 uppercase">{t('Success', 'အောင်မြင်')}</p>
                <p className="text-2xl font-black text-green-900">{todayStats.successful}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-300" />
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-red-600 uppercase">{t('Failed', 'မအောင်မြင်')}</p>
                <p className="text-2xl font-black text-red-900">{todayStats.failed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-300" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <Card className="shadow-md border-t-4 border-t-[#ff6b00]">
            <CardHeader>
              <CardTitle className="flex items-center text-[#0d2c54]">
                <Scan className="h-5 w-5 mr-2" /> {t('Parcel Entry', 'ပါဆယ်လ်မှတ်တမ်းတင်ရန်')}
              </CardTitle>
              <CardDescription>
                {t('Scan QR code or enter tracking number', 'QR code ဖတ်ပါ သို့မဟုတ် tracking နံပါတ်ရိုက်ထည့်ပါ')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleScanIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">{t('Tracking Number', 'Tracking နံပါတ်')}</label>
                  <Input 
                    value={trackingCode} 
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder={t('Scan label here...', 'စကန်ဖတ်ရန်...')} 
                    className="h-14 text-xl font-mono text-center uppercase border-2 focus:border-[#ff6b00]"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('Location', 'နေရာသတ်မှတ်ချက်')}</label>
                    <Select value={scanLocation} onValueChange={setScanLocation}>
                      <SelectTrigger className="bg-slate-50"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receiving_dock">{t('Receiving Dock', 'လက်ခံသည့်နေရာ')}</SelectItem>
                        <SelectItem value="sorting_area">{t('Sorting Area', 'စစ်ဆေးခွဲခြားသည့်နေရာ')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">{t('Notes', 'မှတ်ချက်')} ({t('Optional', 'မဖြစ်မနေမဟုတ်')})</label>
                    <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t('Condition, etc.', 'ပစ္စည်းအခြေအနေ စသည်...')} />
                  </div>
                </div>

                <Button className="w-full h-14 bg-[#0d2c54] hover:bg-[#1a3d6d] font-black text-lg uppercase" disabled={scanning}>
                  {scanning ? <RefreshCw className="animate-spin mr-2" /> : <Scan className="mr-2" />}
                  {scanning ? t('Processing...', 'လုပ်ဆောင်နေသည်...') : t('Receive Parcel', 'ပါဆယ်လ်လက်ခံမည်')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="h-full border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-wider flex items-center text-slate-500">
                <Clock className="h-4 w-4 mr-2" /> {t('Recent Scans', 'လတ်တလော စကန်ဖတ်ချက်များ')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {scanResults.length === 0 ? (
                  <div className="text-center py-20 text-slate-300 italic text-sm">{t('No scans yet', 'မှတ်တမ်းမရှိသေးပါ')}</div>
                ) : (
                  <div className="space-y-3">
                    {scanResults.map((res) => (
                      <div key={res.id} className={`p-3 rounded-lg border flex items-center gap-3 ${res.success ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                        {res.success ? <CheckCircle className="text-green-600 shrink-0" size={18}/> : <XCircle className="text-red-600 shrink-0" size={18}/>}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-black text-slate-900">{res.awb}</p>
                          <p className="text-[10px] text-slate-500 truncate italic">{res.message}</p>
                        </div>
                        <Badge variant="outline" className="text-[9px] h-5">{res.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 font-black italic text-lg">1</div>
                <h4 className="text-xs font-bold uppercase mb-1">{t('Unload', 'ကားချ')}</h4>
                <p className="text-[10px] text-slate-400 italic leading-tight">{t('Verify shipment arrival', 'ပစ္စည်းရောက်ရှိမှု စစ်ဆေးပါ')}</p>
            </div>
            <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
                <div className="w-8 h-8 bg-orange-100 text-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-2 font-black italic text-lg">2</div>
                <h4 className="text-xs font-bold uppercase mb-1">{t('Scan', 'စကန်ဖတ်')}</h4>
                <p className="text-[10px] text-slate-400 italic leading-tight">{t('Input to inventory', 'ဂိုဒေါင်စာရင်းထဲ ထည့်ပါ')}</p>
            </div>
            <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 font-black italic text-lg">3</div>
                <h4 className="text-xs font-bold uppercase mb-1">{t('Inspect', 'စစ်ဆေး')}</h4>
                <p className="text-[10px] text-slate-400 italic leading-tight">{t('Check for damages', 'ပျက်စီးမှုရှိမရှိ ကြည့်ပါ')}</p>
            </div>
            <div className="p-4 bg-white border rounded-lg text-center shadow-sm">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2 font-black italic text-lg">4</div>
                <h4 className="text-xs font-bold uppercase mb-1">{t('Sorted', 'ခွဲခြားပြီး')}</h4>
                <p className="text-[10px] text-slate-400 italic leading-tight">{t('Ready for storage', 'သိမ်းဆည်းရန် အသင့်ဖြစ်')}</p>
            </div>
        </div>
      </div>
    </div>
  );
}