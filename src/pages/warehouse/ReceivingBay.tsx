import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  MapPin, 
  Package, 
  Camera, 
  Info,
  Check,
  X
} from 'lucide-react';
import { Shipment } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import QRScanner from '@/components/QRScanner';
import StatusBadge from '@/components/StatusBadge';

// Static shipment data for the Warehouse Receiving Bay
const SHIPMENT_DATA: Record<string, any> = {
  shp_1: {
    id: 'shp_1',
    awb: 'AWB123456',
    tamperTagId: 'TT-000451',
    status: 'LABEL_APPLIED_VERIFIED',
    pieces: 2,
    type: 'box',
    condition: 'OK',
    cod: { required: true, amount: 1500 },
    destinationTownship: 'Downtown',
    photos: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80&w=400'
    ],
    createdAt: '2026-02-11T10:00:00Z',
    labelPrintedCount: 1,
  }
};

const ReceivingBay: React.FC = () => {
  const { legacyUser } = useAuth();
  const [isLocationVerified, setIsLocationVerified] = useState(false);
  const [scanningMode, setScanningMode] = useState<'location' | 'parcel' | null>(null);
  const [currentShipment, setCurrentShipment] = useState<Shipment | null>(null);
  const [inspectionData, setInspectionData] = useState({
    piecesMatch: true,
    conditionMatch: true,
    notes: '',
  });

  const handleLocationScan = (code: string) => {
    if (code === 'WH_RECEIVING_01') {
      setIsLocationVerified(true);
      setScanningMode(null);
      toast.success('Location verified: Receiving Bay 01');
    } else {
      toast.error('Invalid location QR for this operation');
    }
  };

  const handleParcelScan = (code: string) => {
    const shipment = SHIPMENT_DATA[code] || Object.values(SHIPMENT_DATA).find(s => s.tamperTagId === code || s.awb === code);
    
    if (!shipment) {
      toast.error('Shipment not found in system');
      return;
    }

    if (shipment.status !== 'LABEL_APPLIED_VERIFIED' && shipment.status !== 'ARRIVED_WAREHOUSE_GATE') {
      toast.error(`Invalid Status: Label must be verified before receiving`);
      return;
    }

    setCurrentShipment(shipment as Shipment);
    setScanningMode(null);
    toast.success(`Shipment ${shipment.awb} loaded for inspection`);
  };

  const handleConfirmReceived = () => {
    if (!currentShipment) return;
    toast.success('Shipment successfully received and verified');
    setCurrentShipment(null);
    setInspectionData({ piecesMatch: true, conditionMatch: true, notes: '' });
  };

  if (!isLocationVerified) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card className="overflow-hidden border-2">
          <div className="h-2 bg-[#0d2c54]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Step 1: Verify Location
            </CardTitle>
            <CardDescription>
              Scan the Warehouse Receiving Bay QR to begin intake operations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            {scanningMode === 'location' ? (
              <div className="w-full space-y-4">
                <QRScanner onScan={handleLocationScan} expectedType="LOCATION" />
                <Button variant="ghost" className="w-full" onClick={() => setScanningMode(null)}>
                  Cancel Scan
                </Button>
              </div>
            ) : (
              <Button 
                size="lg" 
                className="h-32 w-32 rounded-full bg-[#0d2c54] flex flex-col gap-2"
                onClick={() => setScanningMode('location')}
              >
                <QrCode className="w-10 h-10" />
                <span>Scan QR</span>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-5xl">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0d2c54]">Warehouse Receiving</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Verified: Receiving Bay 01
            </Badge>
            <span className="text-xs">| Staff: {legacyUser?.name || 'System User'}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-[#0d2c54] text-[#0d2c54]"
          onClick={() => setScanningMode('parcel')}
          disabled={!!scanningMode}
        >
          <QrCode className="w-4 h-4 mr-2" />
          Scan Next Parcel
        </Button>
      </header>

      {scanningMode === 'parcel' && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-6">
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-center font-medium">Scan AWB or Tamper Tag</h3>
              <QRScanner onScan={handleParcelScan} expectedType="AWB" />
              <Button variant="ghost" className="w-full" onClick={() => setScanningMode(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentShipment ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Shipment Verification</CardTitle>
                  <CardDescription>Compare physical parcel with original pickup data</CardDescription>
                </div>
                <StatusBadge status={currentShipment.status} />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">AWB Number</p>
                    <p className="font-mono font-medium">{currentShipment.awb || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Tamper Tag</p>
                    <p className="font-mono font-medium">{currentShipment.tamperTagId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Pieces</p>
                    <p className="font-medium">{currentShipment.pieces} Units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase">Type</p>
                    <Badge variant="secondary" className="capitalize">{currentShipment.type}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Pickup Evidence (Photos)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentShipment.photos?.map((url, idx) => (
                      <div key={idx} className="aspect-video rounded-md overflow-hidden border bg-muted">
                        <img src={url} alt="Pickup" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Inspection Checklist</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-0.5">
                    <p className="font-medium">Pieces Count Verified</p>
                    <p className="text-xs text-muted-foreground">Count matches record ({currentShipment.pieces})</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={inspectionData.piecesMatch ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setInspectionData(p => ({ ...p, piecesMatch: true }))}
                    >
                      <Check className="w-4 h-4 mr-1" /> Yes
                    </Button>
                    <Button 
                      variant={!inspectionData.piecesMatch ? "destructive" : "outline"} 
                      size="sm"
                      onClick={() => setInspectionData(p => ({ ...p, piecesMatch: false }))}
                    >
                      <X className="w-4 h-4 mr-1" /> No
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Internal Notes / Exceptions</Label>
                  <Input 
                    id="notes" 
                    placeholder="Add details..." 
                    value={inspectionData.notes}
                    onChange={(e) => setInspectionData(p => ({ ...p, notes: e.target.value }))}
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50 flex justify-end gap-3 p-4">
                <Button variant="ghost" onClick={() => setCurrentShipment(null)}>Cancel</Button>
                <Button className="bg-[#0d2c54]" onClick={handleConfirmReceived}>
                  Confirm Received
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Recipient Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase">Destination</p>
                  <p className="font-medium">{currentShipment.destinationTownship}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase">COD Status</p>
                  <Badge variant={currentShipment.cod?.required ? "destructive" : "secondary"}>
                    {currentShipment.cod?.required ? `Collect: ${currentShipment.cod.amount} MMK` : 'No COD'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                  <Info className="w-4 h-4" /> Security Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-orange-800 space-y-1">
                <p>• Label must be <strong>Activated</strong> before receiving.</p>
                <p>• Tamper Tag must be untorn.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border-2 border-dashed rounded-xl">
          <Package className="w-16 h-16 text-slate-300 mb-4" />
          <h2 className="text-xl font-medium text-slate-600">Ready for next parcel</h2>
          <Button className="mt-6 bg-[#0d2c54]" onClick={() => setScanningMode('parcel')}>
            Start Scanning
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReceivingBay;