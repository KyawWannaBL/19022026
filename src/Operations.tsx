import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  Search,
  QrCode,
  Activity,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { IMAGES } from '@/assets/images';
import {
  Shipment,
  FleetVehicle,
  SHIPMENT_STATUS,
  formatDate,
  ROUTE_PATHS
} from '@/lib/index';
import { QRScanner } from '@/components/QRScanner';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { RoutePlanner } from '@/components/RoutePlanner';
import { StatusBadge } from '@/components/StatusBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'SHP-001',
    awb_number: 'LGT-2026-882910',
    pickup_address: {
      name: 'Global Tech Solutions',
      address: '123 Innovation Dr, San Jose, CA',
      phone: '+1 555-0101'
    },
    delivery_address: {
      name: 'Apex Retailers',
      address: '456 Commerce St, New York, NY',
      phone: '+1 555-0102'
    },
    package_details: {
      weight: 45.5,
      dimensions: '60x40x40 cm',
      description: 'Tech Equipment'
    },
    status: 'IN_TRANSIT',
    priority: 'urgent',
    created_at: '2026-02-15T08:30:00Z',
    trackingNumber: 'LGT-2026-882910',
    receiverName: 'Apex Retailers'
  },
  {
    id: 'SHP-002',
    awb_number: 'LGT-2026-119283',
    pickup_address: {
      name: 'BioHealth Corp',
      address: '789 Medical Plaza, Boston, MA',
      phone: '+1 555-0201'
    },
    delivery_address: {
      name: 'City Hospital',
      address: '321 Care Blvd, Chicago, IL',
      phone: '+1 555-0202'
    },
    package_details: {
      weight: 12.2,
      dimensions: '30x30x30 cm',
      description: 'Medical Supplies'
    },
    status: 'AT_HUB',
    priority: 'standard',
    created_at: '2026-02-16T10:00:00Z',
    trackingNumber: 'LGT-2026-119283',
    receiverName: 'City Hospital'
  },
  {
    id: 'SHP-003',
    awb_number: 'LGT-2026-554321',
    pickup_address: {
      name: 'Fast Fashion Ltd',
      address: '55 Style Ave, Los Angeles, CA',
      phone: '+1 555-0301'
    },
    delivery_address: {
      name: 'Urban Outfitters',
      address: '99 Main St, Seattle, WA',
      phone: '+1 555-0302'
    },
    package_details: {
      weight: 5.8,
      dimensions: '20x20x20 cm',
      description: 'Fashion Items'
    },
    status: 'OUT_FOR_DELIVERY',
    priority: 'urgent',
    created_at: '2026-02-17T06:15:00Z',
    trackingNumber: 'LGT-2026-554321',
    receiverName: 'Urban Outfitters'
  }
];

const MOCK_VEHICLES: FleetVehicle[] = [
  {
    id: 'VEH-001',
    plateNumber: 'LGT-2026-X1',
    type: 'TRUCK',
    status: 'ACTIVE',
    currentLocation: { lat: 40.7128, lng: -74.0060 },
    fuelLevel: 85,
    lastService: '2026-01-10',
  },
  {
    id: 'VEH-002',
    plateNumber: 'LGT-2026-V5',
    type: 'VAN',
    status: 'IN_USE',
    currentLocation: { lat: 34.0522, lng: -118.2437 },
    assignedRiderId: 'RIDER-44',
    fuelLevel: 42,
    lastService: '2026-02-05',
  }
];

const MetricsCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend?: { value: number, isPositive: boolean } }) => (
  <Card className="luxury-card">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold font-mono">{value}</h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend.isPositive ? 'text-emerald-500' : 'text-destructive'}`}>
              <ArrowUpRight className={`w-3 h-3 ${!trend.isPositive && 'rotate-90'}`} />
              {trend.isPositive ? '+' : '-'}{trend.value}%
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Operations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shipments');
  const { t } = useLanguage();

  const filteredShipments = MOCK_SHIPMENTS.filter(
    s => (s.trackingNumber?.includes(searchQuery) || s.receiverName?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleScan = (code: string) => {
    setSearchQuery(code);
    setIsScannerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Operational Header with Background Image */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={IMAGES.WAREHOUSE_OPS_4}
          alt="Operations Center"
          className="hero-background object-cover"
        />
        <div className="hero-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold">System Status: Optimal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-heading">
                Mission Control
              </h1>
              <p className="text-muted-foreground max-w-xl mt-3 text-sm md:text-base">
                Integrated operational dashboard for real-time fleet management, shipment fulfillment, and automated logistics orchestration in 2026.
              </p>
            </motion.div>
            <div className="flex gap-3">
              <Button variant="outline" className="luxury-glass border-white/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Nodes
              </Button>
              <Button className="luxury-button" onClick={() => setIsScannerOpen(true)}>
                <QrCode className="w-4 h-4 mr-2" />
                Quick Scan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        {/* Core Metrics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricsCard
            title="Active Shipments"
            value="1,284"
            icon={Package}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricsCard
            title="Fleet Utilization"
            value="94.2%"
            icon={Truck}
            trend={{ value: 2.5, isPositive: true }}
          />
          <MetricsCard
            title="System Uptime"
            value="99.99%"
            icon={ShieldCheck}
          />
        </div>

        {/* Operations Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="shipments" className="w-full" onValueChange={setActiveTab}>
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
                <TabsList className="bg-muted/50 p-1 luxury-glass rounded-xl overflow-x-auto">
                  <TabsTrigger value="shipments" className="rounded-lg">Shipments</TabsTrigger>
                  <TabsTrigger value="fleet" className="rounded-lg">Fleet Status</TabsTrigger>
                  <TabsTrigger value="routes" className="rounded-lg">Global Map</TabsTrigger>
                  <TabsTrigger value="route-planning" className="rounded-lg">Route Planner</TabsTrigger>
                  <TabsTrigger value="qr-tools" className="rounded-lg">QR Tools</TabsTrigger>
                </TabsList>

                <div className="relative w-full xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search AWB, receiver..."
                    className="pl-10 luxury-glass"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="shipments" className="mt-0 space-y-4 outline-none">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Priority Fulfillment Queue
                  </h3>
                  <Button variant="ghost" size="sm" className="text-xs font-mono">
                    <Filter className="w-3.5 h-3.5 mr-2" />
                    FILTERS
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment) => (
                      <motion.div
                        key={shipment.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="luxury-card p-5 group hover:border-primary/20"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                              <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-sm font-bold font-mono">{shipment.awb_number}</span>
                                <StatusBadge status={shipment.status} type="shipment" size="sm" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3 text-primary/60" />
                                  <span>From: {shipment.pickup_address?.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <ArrowUpRight className="w-3 h-3 text-primary/60" />
                                  <span>To: {shipment.delivery_address?.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Truck className="w-3 h-3 text-primary/60" />
                                  <span>Weight: {shipment.package_details?.weight}kg</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <RefreshCw className="w-3 h-3 text-primary/60" />
                                  <span>Updated: {formatDate(shipment.created_at || '')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end md:self-center">
                            <Button variant="outline" size="sm" className="h-8 text-[10px] font-mono tracking-wider">
                              TRACK
                            </Button>
                            <Button size="sm" className="h-8 text-[10px] font-mono tracking-wider">
                              DETAILS
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="luxury-card p-16 text-center border-dashed">
                      <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <h4 className="font-bold">No Operational Records</h4>
                      <p className="text-sm text-muted-foreground mt-1">Try adjusting filters or searching for specific AWB IDs.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="fleet" className="mt-0 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {MOCK_VEHICLES.map((vehicle) => (
                    <Card key={vehicle.id} className="luxury-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-bold font-mono">{vehicle.plateNumber}</h4>
                            <p className="text-xs text-muted-foreground">{vehicle.type} • ID: {vehicle.id}</p>
                          </div>
                          <StatusBadge status={vehicle.status} type="delivery" size="sm" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Fuel Level</span>
                            <span className="font-mono">{vehicle.fuelLevel}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${vehicle.fuelLevel > 20 ? 'bg-primary' : 'bg-destructive'}`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                            <span className="text-muted-foreground">Rider</span>
                            <span className="font-medium">{vehicle.assignedRiderId || 'Unassigned'}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4 h-8 text-[10px] font-mono">
                          VIEW TELEMETRY
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="routes" className="mt-0 outline-none">
                <Card className="relative h-[600px] overflow-hidden group luxury-card">
                  <img
                    src={IMAGES.DELIVERY_FLEET_2}
                    alt="Fleet Map Visualization"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="luxury-glass p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md text-center">
                      <MapPin className="w-10 h-10 text-primary mx-auto mb-4 animate-bounce" />
                      <h4 className="font-bold text-2xl font-heading">Live Geospatial Network</h4>
                      <p className="text-sm text-muted-foreground mt-3 mb-6 leading-relaxed">
                        Interactive satellite tracking for all active assets in the 2026 fleet network. Access requires Level 3 clearance and secure gateway authentication.
                      </p>
                      <Button className="luxury-button px-8">
                        AUTHENTICATE ACCESS
                      </Button>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 luxury-glass p-3 rounded-xl border border-white/5 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      SECURE LINK: {formatDate(new Date().toISOString())}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="route-planning" className="mt-0 outline-none">
                <div className="luxury-card">
                  <RoutePlanner onOptimize={(optimized) => console.log('Optimized:', optimized)} />
                </div>
              </TabsContent>

              <TabsContent value="qr-tools" className="mt-0 space-y-6 outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="luxury-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <QrCode className="w-4 h-4 text-primary" />
                        Operations Scanner
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Validate shipment manifests and package tags
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10">
                        <QrCode className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-sm text-center text-muted-foreground max-w-[240px] mb-6">
                        Use the high-speed laser or camera scanner to process shipments.
                      </p>
                      <Button className="luxury-button px-10" onClick={() => setIsScannerOpen(true)}>
                        ACTIVATE SCANNER
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="luxury-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Package className="w-4 h-4 text-primary" />
                        Manifest Tag Generator
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Create secure tracking identifiers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Asset Identifier</label>
                          <Input
                            placeholder="Enter AWB or Parcel ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="luxury-glass"
                          />
                        </div>
                        {searchQuery ? (
                          <div className="p-6 luxury-glass rounded-2xl flex flex-col items-center justify-center">
                            <QRCodeGenerator data={searchQuery} size={180} />
                            <p className="text-[10px] font-mono mt-4 text-primary">{searchQuery}</p>
                          </div>
                        ) : (
                          <div className="h-[238px] flex flex-col items-center justify-center border border-dashed rounded-2xl border-white/10">
                            <QrCode className="w-12 h-12 text-muted-foreground/20 mb-3" />
                            <p className="text-xs text-muted-foreground">Awaiting ID input...</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-6">
            <Card className="luxury-card overflow-hidden border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Quick Execution</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 pt-4">
                <Button variant="outline" className="luxury-glass justify-start h-auto py-4 px-5 border-white/5">
                  <div className="text-left">
                    <div className="font-bold text-sm">New Shipment</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Register domestic/air cargo</div>
                  </div>
                  <ArrowUpRight className="w-3 h-3 ml-auto text-primary/40" />
                </Button>
                <Button variant="outline" className="luxury-glass justify-start h-auto py-4 px-5 border-white/5">
                  <div className="text-left">
                    <div className="font-bold text-sm">Assign Fleet</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Dispatch pending manifests</div>
                  </div>
                  <ArrowUpRight className="w-3 h-3 ml-auto text-primary/40" />
                </Button>
                <Button variant="outline" className="luxury-glass justify-start h-auto py-4 px-5 border-white/5">
                  <div className="text-left">
                    <div className="font-bold text-sm">Log Exception</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Report system or transit error</div>
                  </div>
                  <ArrowUpRight className="w-3 h-3 ml-auto text-primary/40" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground luxury-card border-none shadow-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4" />
                  <CardTitle className="text-sm uppercase tracking-widest font-mono">Operational Alert</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs mb-5 leading-relaxed opacity-90">
                  Congestion detected at Southeast Hub 4B. Rerouting algorithms engaged. Estimated delay for outbound parcels: 28 mins.
                </p>
                <Button variant="secondary" size="sm" className="w-full text-[10px] font-mono tracking-wider h-9">
                  VIEW INCIDENT REPORT
                  <ArrowUpRight className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <div className="p-6 luxury-card">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest">Live Event Feed</span>
              </div>
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_8px_var(--primary)]" />
                    <div>
                      <p className="text-[11px] leading-snug font-medium">
                        LGT-2026-00{i}88 arrived at Hub Central
                      </p>
                      <span className="text-[10px] font-mono text-muted-foreground opacity-60">{i * 2} mins ago</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="text-[10px] font-mono p-0 mt-6 h-auto text-primary">
                VIEW FULL AUDIT LOG
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Scanner Modal Overlay */}
      <AnimatePresence>
        {isScannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg"
            >
              <Card className="luxury-glass border-white/10 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <CardTitle className="font-heading text-xl">Optical Asset Scanner</CardTitle>
                    <CardDescription className="text-xs">Align tracking code within the tactical frame</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-white/10" 
                    onClick={() => setIsScannerOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0 relative aspect-square bg-black">
                  <QRScanner onScan={handleScan} onError={(err) => console.error(err)} />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-primary/40 rounded-3xl relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                      <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_15px_var(--primary)]"
                      />
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 text-center border-t border-white/5 bg-black/40">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-widest mb-4">
                    SUPPORTED STANDARDS: LGT-SECURE, ISO-2026, BRT-INTL
                  </p>
                  <Button variant="outline" className="luxury-glass px-8" onClick={() => setIsScannerOpen(false)}>
                    TERMINATE SESSION
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="mt-20 border-t border-border/40 py-8 px-8 bg-black/20">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
              © 2026 Enterprise Logistics Platform • Secure Node: OPS-YGN-01
            </p>
          </div>
          <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Security Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Operation</a>
            <Badge variant="outline" className="font-mono border-white/5 text-[9px] py-0 h-5 px-2">v4.0.2-LATEST</Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
