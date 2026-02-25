import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React, { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Search, Loader2, Package, Truck, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  
  // FIXED: Symbol declared exactly once to resolve the 'ELIFECYCLE' exit code 1 build crash
  const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
  
  const [awb, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awb) return;

    // Production Logic: Filter real-time enterprise data by AWB
    const found = shipments.find(s => s.awb?.toLowerCase() === awb.toLowerCase());
    setSearchResult(found || 'not_found');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      <div className="bg-[#0d2c54] py-12 text-center text-white px-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight">
          {t('tracking.title') || 'Track Your Shipment'}
        </h1>
        <p className="text-slate-300 mt-2">{t('tracking.subtitle') || 'Enter your AWB number to check status'}</p>
      </div>

      <div className="max-w-xl mx-auto -mt-8 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder={t('tracking.placeholder') || "AWB Number (e.g. BE12345)"}
                value={awb}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="h-12 pl-10 border-2 focus-visible:ring-[#ff6b00]"
              />
            </div>
            <Button 
              type="submit" 
              disabled={shipmentsLoading}
              className="h-12 bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold px-8 transition-all"
            >
              {shipmentsLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                t('tracking.button') || 'Track'
              )}
            </Button>
          </form>

          {/* Results Display */}
          {searchResult === 'not_found' && (
            <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center font-medium border border-red-100">
              {t('tracking.error_not_found') || 'No shipment found with that AWB number.'}
            </div>
          )}

          {searchResult && searchResult !== 'not_found' && (
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">{t('tracking.status') || 'Status'}</p>
                  <p className="text-xl font-bold text-[#0d2c54]">{searchResult.status}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t('tracking.awb') || 'AWB'}</p>
                    <p className="font-bold text-sm uppercase">{searchResult.awb}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t('tracking.destination') || 'Destination'}</p>
                    <p className="font-bold text-sm">{searchResult.destination_township || searchResult.destination}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}