import React, { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { Search, Loader2, Package, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  // FIXED: Declared exactly once to resolve "already been declared" error
  const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    const found = shipments.find(s => 
      s.tracking_number?.toLowerCase() === trackingNumber.toLowerCase()
    );
    setSearchResult(found || 'not_found');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#0d2c54] py-10 text-center text-white">
        <h1 className="text-2xl font-bold">Track Your Shipment</h1>
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input 
            placeholder="Tracking ID" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Button type="submit" className="bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold">
            {shipmentsLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Track'}
          </Button>
        </form>

        {searchResult && searchResult !== 'not_found' && (
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-black uppercase text-slate-400">Status</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">
                {searchResult.status || 'In Transit'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Package className="text-slate-400 h-5 w-5" />
              <p className="font-bold text-[#0d2c54]">{searchResult.tracking_number}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}