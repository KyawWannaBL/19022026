import { useState } from 'react';
import { useEnterpriseShipments } from '@/hooks/useEnterpriseShipments';
import { Loader2, Search, Package, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Tracking() {
  // FIXED: Only one declaration of shipments and shipmentsLoading
  const { data: shipments = [], isLoading: shipmentsLoading } = useEnterpriseShipments();
  
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = shipments.find(
      (s: any) => s.tracking_number?.toLowerCase() === trackingNumber.toLowerCase()
    );
    setSearchResult(found || 'not_found');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Track Your Shipment</h1>
          <p className="text-muted-foreground">
            Enter your tracking number to get real-time updates on your delivery.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter Tracking Number (e.g., TRK123456)"
                  className="pl-10"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={shipmentsLoading}>
                {shipmentsLoading ? <Loader2 className="animate-spin" /> : 'Track'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {searchResult === 'not_found' && (
          <div className="text-center p-8 border-2 border-dashed rounded-lg">
            <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">No Shipment Found</h3>
            <p className="text-sm text-muted-foreground">
              We couldn't find a shipment with that tracking number. Please check and try again.
            </p>
          </div>
        )}

        {searchResult && searchResult !== 'not_found' && (
          <Card className="border-blue-100 shadow-md">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Shipment {searchResult.tracking_number}
                </CardTitle>
                <Badge variant={searchResult.status === 'delivered' ? 'default' : 'secondary'}>
                  {searchResult.status?.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" /> Origin
                  </p>
                  <p className="font-medium">{searchResult.origin || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-red-500" /> Destination
                  </p>
                  <p className="font-medium">{searchResult.destination || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> Estimated Delivery
                  </p>
                  <p className="font-medium">
                    {searchResult.estimated_delivery 
                      ? new Date(searchResult.estimated_delivery).toLocaleDateString() 
                      : 'Pending'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}