import React, { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments'; //
import { Search, Loader2, Package, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  // FIXED: Declared once to resolve the "has already been declared" error
  const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    const found = shipments.find(s => s.tracking_number?.toLowerCase() === trackingNumber.toLowerCase());
    setSearchResult(found || 'not_found');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-[#0d2c54] py-20 text-center text-white px-4">
        <h1 className="text-4xl font-black mb-2">Track & Trace</h1>
        <p className="opacity-70 text-sm tracking-wide">Real-time status updates for your shipments.</p>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
          <form onSubmit={handleTrack} className="flex gap-2">
            <Input 
              placeholder="Enter Tracking ID (e.g. BE-1001)" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="h-12 border-2"
            />
            <Button type="submit" className="h-12 px-8 bg-[#ff6b00] hover:bg-[#e66000] font-bold text-white uppercase">
              {shipmentsLoading ? <Loader2 className="animate-spin" /> : 'Track'}
            </Button>
          </form>

          {searchResult && searchResult !== 'not_found' && (
            <div className="mt-8 border-l-4 border-[#0d2c54] bg-slate-50 p-6 rounded-r-xl">
               <div className="flex justify-between items-start mb-4">
                  <span className="text-xl font-black text-[#0d2c54] uppercase tracking-tighter">{searchResult.status}</span>
                  <span className="text-xs bg-white border px-2 py-1 rounded font-bold uppercase">ID: {searchResult.tracking_number}</span>
               </div>
               <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">From</p>
                    <p className="font-bold">{searchResult.origin_city || 'Yangon'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">To</p>
                    <p className="font-bold">{searchResult.destination_city || 'Mandalay'}</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}