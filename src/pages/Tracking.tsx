import React, { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { Search, Loader2, Package, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Tracking() {
  // FIXED: Only one declaration allowed
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
        <h1 className="text-2xl font-bold">Track Your Shipment</h1>
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input 
            placeholder="Tracking ID" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Button type="submit" className="bg-[#ff6b00]">
            {shipmentsLoading ? <Loader2 className="animate-spin" /> : 'Track'}
          </Button>
        </form>
      </div>
    </div>
  );
}