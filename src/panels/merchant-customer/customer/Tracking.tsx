import React, { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  // FIXED: Declared only once to resolve the build crash
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
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#0d2c54] py-10 text-center text-white">
        <h1 className="text-2xl font-bold uppercase tracking-tight">Track Your Shipment</h1>
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-100">
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input 
            placeholder="Tracking ID" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="h-12 border-2"
          />
          <Button type="submit" className="h-12 bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold px-6">
            {shipmentsLoading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Track'}
          </Button>
        </form>
      </div>
    </div>
  );
}