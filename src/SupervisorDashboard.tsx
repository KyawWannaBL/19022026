import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Box,
  ChevronRight,
  LayoutDashboard,
  MapPin,
  Package,
  TrendingUp,
  Truck,
  Users,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { 
  ROUTE_PATHS, 
  formatCurrency, 
  formatDate, 
  Shipment, 
  FleetVehicle, 
  SHIPMENT_STATUS 
} from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuditFeed } from '@/components/AuditFeed';
import { FleetStatus } from '@/components/FleetStatus';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { IMAGES } from '@/assets/images';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

const MOCK_EXCEPTIONS: Shipment[] = [
  {
    id: 'SHP-001',
    trackingNumber: 'BRT-2026-948271',
    senderName: 'Yangon Electronics',
    receiverName: 'U Kyaw Zay Yar',
    origin: 'Yangon',
    destination: 'Mandalay',
    status: 'EXCEPTION',
    priority: 'HIGH',
    created_at: '2026-02-18T10:30:00Z',
    metadata: { reason: 'Address Unreachable' }
  },
  {
    id: 'SHP-002',
    trackingNumber: 'BRT-2026-112345',
    senderName: 'Elite Fashion',
    receiverName: 'Daw Aye Myat',
    origin: 'Bago',
    destination: 'Taunggyi',
    status: 'EXCEPTION',
    priority: 'MEDIUM',
    created_at: '2026-02-19T08:15:00Z',
    metadata: { reason: 'Weather Delay' }
  }
];

const MOCK_VEHICLES: FleetVehicle[] = [
  {
    id: 'V-101',
    plateNumber: 'YGN-7721',
    type: 'TRUCK',
    status: 'ACTIVE',
    currentLocation: { lat: 16.8661, lng: 96.1951 },
    fuelLevel: 85,
    lastService: '2026-01-15'
  },
  {
    id: 'V-102',
    plateNumber: 'MDY-4490',
    type: 'VAN',
    status: 'IN_USE',
    currentLocation: { lat: 21.9588, lng: 96.0891 },
    fuelLevel: 42,
    lastService: '2026-02-01'
  }
];

export default function SupervisorDashboard() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => [
    {
      label: 'Total Shipments',
      value: '1,284',
      change: '+12.5%',
      icon: <Package className="h-5 w-5 text-luxury-gold" />,
      description: 'Active for Feb 2026'
    },
    {
      label: 'Active Routes',
      value: '42',
      change: '+3',
      icon: <Truck className="h-5 w-5 text-luxury-gold" />,
      description: 'Currently monitored'
    },
    {
      label: 'Critical Exceptions',
      value: '08',
      change: '-2',
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
      description: 'Immediate action required'
    },
    {
      label: 'Operational Revenue',
      value: formatCurrency(45200000, 'MMK'),
      change: '+8.2%',
      icon: <TrendingUp className="h-5 w-5 text-luxury-gold" />,
      description: 'Month to date'
    }
  ], []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Supervisor Command Center</h1>
          <p className="text-muted-foreground">Real-time operational oversight for branch performance and delivery integrity.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-luxury-gold/30 hover:border-luxury-gold">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-luxury-gold text-luxury-obsidian hover:bg-luxury-dark-gold">
            <Activity className="mr-2 h-4 w-4" />
            Live View
          </Button>
        </div>
      </motion.div>

      {/* KPI Bento Grid */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={staggerItem}>
            <Card className="luxury-card border-none shadow-luxury overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/50 to-transparent" />
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className="p-2 rounded-full bg-secondary/50">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`}>
                    {stat.change}
                  </span>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Operational Panel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Real-time Exceptions Monitor */}
          <Card className="luxury-card border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Shipment Exceptions</CardTitle>
                <CardDescription>Shipments flagged for delays or processing errors.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search AWB..." 
                    className="pl-9 bg-secondary/30 border-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="secondary" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3">AWB / Tracking</th>
                      <th className="px-4 py-3">Route</th>
                      <th className="px-4 py-3">Reason</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {MOCK_EXCEPTIONS.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-mono font-bold text-luxury-gold">{shipment.trackingNumber}</div>
                          <div className="text-xs text-muted-foreground">{shipment.senderName}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            <span>{shipment.origin}</span>
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            <span>{shipment.destination}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{formatDate(shipment.created_at || '')}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-destructive font-medium">
                            <AlertTriangle className="h-4 w-4" />
                            {shipment.metadata?.reason}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={shipment.status} type="shipment" size="sm" />
                        </td>
                        <td className="px-4 py-4">
                          <Button variant="ghost" size="sm" className="hover:text-luxury-gold">
                            Investigate
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Map Placeholder (Industrial Look) */}
          <Card className="luxury-card border-none overflow-hidden h-[400px] relative">
            <img 
              src={IMAGES.DASHBOARD_ANALYTICS_4} 
              className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
              alt="Fleet Map"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                Branch Coverage Map
              </CardTitle>
              <p className="text-xs text-muted-foreground">Visualizing active delivery clusters in 2026.</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2 px-6 py-4 luxury-glass rounded-xl">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-luxury-gold animate-pulse" />
                  <span className="text-sm font-medium">Live Tracking System Online</span>
                </div>
                <Button variant="outline" className="border-luxury-gold text-luxury-gold">
                  Initialize High-Resolution Map
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Insights Panel */}
        <div className="space-y-6">
          {/* Fleet Status Component */}
          <Card className="luxury-card border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Fleet Overview</CardTitle>
                <StatusBadge status="ACTIVE" type="user" size="sm" />
              </div>
            </CardHeader>
            <CardContent>
              <FleetStatus vehicles={MOCK_VEHICLES} realTimeUpdates={true} />
            </CardContent>
          </Card>

          {/* Audit Feed Component */}
          <Card className="luxury-card border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">System Security & Audit</CardTitle>
              <CardDescription>Recent administrative and operational actions.</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <AuditFeed maxEntries={8} />
            </CardContent>
          </Card>

          {/* Resource Capacity */}
          <Card className="luxury-card border-none bg-gradient-to-br from-luxury-gold/10 to-transparent">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Staffing Capacity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Active Riders</span>
                  <span className="font-bold">28 / 35</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-luxury-gold w-[80%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Warehouse Load</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-destructive w-[92%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
