import React, { useState, useMemo } from 'react';
import {
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit3,
  Trash2,
  ArrowUpRight,
  Download,
  QrCode,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SHIPMENT_STATUS, 
  Shipment, 
  formatDate, 
  formatWeight, 
  formatCurrency
} from '@/lib/index';
import { StatusBadge } from '@/components/StatusBadge';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { DataEntryForm } from '@/components/DataEntryForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IMAGES } from '@/assets/images';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Local Metrics Card Component
const MetricCard = ({ title, value, icon: Icon, trend }: { title: string, value: string | number, icon: any, trend?: { value: number, positive: boolean } }) => (
  <div className="luxury-card p-6 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 text-xs font-medium", trend.positive ? "text-emerald-500" : "text-destructive")}>
          {trend.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend.value}%
        </div>
      )}
    </div>
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold font-mono mt-1">{value}</h3>
    </div>
  </div>
);

// Mock data for 2026 enterprise logistics context
const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'shp_1',
    trackingNumber: 'BRT-2026-882931',
    senderName: 'Global Tech Solutions',
    receiverName: 'Apex Retail Group',
    origin: 'San Francisco, CA',
    destination: 'New York, NY',
    status: 'IN_TRANSIT',
    weight: 12.5,
    cod_amount: 0,
    isPriority: true,
    created_at: '2026-02-15T09:30:00Z',
    updated_at: '2026-02-17T14:20:00Z',
  },
  {
    id: 'shp_2',
    trackingNumber: 'BRT-2026-441029',
    senderName: 'BioHealth Labs',
    receiverName: 'Metropolitan Hospital',
    origin: 'Boston, MA',
    destination: 'Chicago, IL',
    status: 'OUT_FOR_DELIVERY',
    weight: 2.4,
    cod_amount: 150000,
    isPriority: true,
    created_at: '2026-02-16T08:15:00Z',
    updated_at: '2026-02-17T18:45:00Z',
  },
  {
    id: 'shp_3',
    trackingNumber: 'BRT-2026-115532',
    senderName: 'Craft & Co.',
    receiverName: 'Lifestyle Stores',
    origin: 'Portland, OR',
    destination: 'Seattle, WA',
    status: 'DELIVERED',
    weight: 5.8,
    cod_amount: 45000,
    isPriority: false,
    created_at: '2026-02-14T10:00:00Z',
    updated_at: '2026-02-16T15:30:00Z',
  },
  {
    id: 'shp_4',
    trackingNumber: 'BRT-2026-992011',
    senderName: 'AutoParts Direct',
    receiverName: 'QuickFix Garage',
    origin: 'Detroit, MI',
    destination: 'Phoenix, AZ',
    status: 'EXCEPTION',
    weight: 45.0,
    cod_amount: 890000,
    isPriority: false,
    created_at: '2026-02-13T14:45:00Z',
    updated_at: '2026-02-17T10:10:00Z',
  },
  {
    id: 'shp_5',
    trackingNumber: 'BRT-2026-334001',
    senderName: 'Green Tech',
    receiverName: 'Solar Solutions',
    origin: 'Austin, TX',
    destination: 'Denver, CO',
    status: 'PENDING',
    weight: 18.2,
    cod_amount: 0,
    isPriority: false,
    created_at: '2026-02-17T16:00:00Z',
    updated_at: '2026-02-17T16:00:00Z',
  }
];

export default function Shipments() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  const filteredShipments = useMemo(() => {
    return MOCK_SHIPMENTS.filter(shipment => {
      const matchesSearch = 
        (shipment.trackingNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (shipment.senderName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (shipment.receiverName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
      if (activeTab === 'all') return matchesSearch;
      return matchesSearch && shipment.status === activeTab;
    });
  }, [searchTerm, activeTab]);

  const stats = useMemo(() => ({
    total: MOCK_SHIPMENTS.length,
    active: MOCK_SHIPMENTS.filter(s => s.status !== 'DELIVERED' && s.status !== 'CANCELLED').length,
    delivered: MOCK_SHIPMENTS.filter(s => s.status === 'DELIVERED').length,
    exceptions: MOCK_SHIPMENTS.filter(s => s.status === 'EXCEPTION').length,
  }), []);

  const handleOpenQR = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsQROpen(true);
  };

  const handleCreateShipment = (data: any) => {
    console.log('New Shipment Data:', data);
    setIsCreateOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
            Shipment Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Managing lifecycle and tracking for {stats.total} total shipments in 2026.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="luxury-glass border-border">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} className="luxury-button py-2 px-6 h-auto">
            <Plus className="w-4 h-4 mr-2" /> New Shipment
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Shipments" value={stats.total} icon={Package} trend={{ value: 12.5, positive: true }} />
        <MetricCard title="Active Transits" value={stats.active} icon={Truck} />
        <MetricCard title="Delivered" value={stats.delivered} icon={CheckCircle} trend={{ value: 4.2, positive: true }} />
        <MetricCard title="Exceptions" value={stats.exceptions} icon={AlertTriangle} trend={{ value: 1.1, positive: false }} />
      </div>

      {/* Filtering & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by ID, Sender, or Recipient..."
            className="pl-10 h-11 luxury-glass border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full lg:w-auto"
        >
          <TabsList className="grid grid-cols-3 lg:flex h-11 bg-secondary/50 p-1 border border-border">
            <TabsTrigger value="all" className="px-6">All</TabsTrigger>
            <TabsTrigger value={SHIPMENT_STATUS.IN_TRANSIT} className="px-6">In Transit</TabsTrigger>
            <TabsTrigger value={SHIPMENT_STATUS.EXCEPTION} className="px-6">Exceptions</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-11 w-11 luxury-glass border-border">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Shipments Table */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="luxury-card overflow-hidden border border-border"
      >
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[180px] font-semibold">Tracking ID</TableHead>
              <TableHead className="font-semibold">Route</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">COD Amount</TableHead>
              <TableHead className="font-semibold">Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {filteredShipments.map((shipment) => (
                <TableRow 
                  key={shipment.id} 
                  className="hover:bg-primary/5 transition-colors group border-b border-border/50 last:border-0"
                >
                  <TableCell className="font-mono font-bold text-primary">
                    {shipment.trackingNumber}
                    {shipment.isPriority && (
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-500 border border-amber-500/30">
                        PRIORITY
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span>{shipment.origin}</span>
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                        <span>{shipment.destination}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">To: {shipment.receiverName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={shipment.status} type="shipment" />
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {shipment.cod_amount && shipment.cod_amount > 0 ? formatCurrency(shipment.cod_amount) : 'Prepaid'}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(shipment.updated_at || shipment.created_at || '')}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-40 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 luxury-glass border-border">
                        <DropdownMenuLabel>Shipment Controls</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" /> View Timeline
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit3 className="w-4 h-4 mr-2" /> Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-primary"
                          onClick={() => handleOpenQR(shipment)}
                        >
                          <QrCode className="w-4 h-4 mr-2" /> Print QR Label
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </AnimatePresence>
            {filteredShipments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-50">
                    <Package className="w-12 h-12" />
                    <p className="text-sm">No shipments found matching your filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Visual Context */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="luxury-card overflow-hidden relative group h-48 border border-border">
          <img 
            src={IMAGES.PACKAGE_TRACKING_1} 
            alt="Precision Tracking" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent p-8 flex flex-col justify-center">
            <h4 className="text-lg font-bold">AI-Powered Logistics</h4>
            <p className="text-sm text-muted-foreground max-w-xs mt-2">
              Our 2026 fleet tracking system uses real-time telemetry to predict potential delivery delays before they happen.
            </p>
          </div>
        </div>
        <div className="luxury-card p-8 flex flex-col justify-center border border-border bg-primary/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-primary/20 text-primary">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold">System Status: Normal</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            All nodes in the regional distribution network are reporting optimal efficiency. No major weather exceptions reported for active routes.
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8 border-t border-border/50">
        <p>© 2026 Britium Enterprise. Logistical Precision.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary">Global Operations</a>
          <a href="#" className="hover:text-primary">Privacy Protocol</a>
          <a href="#" className="hover:text-primary">v4.2.0-stable</a>
        </div>
      </div>

      {/* MODALS */}
      
      {/* Create Shipment Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto luxury-glass border-border p-0">
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold font-heading">Register New Shipment</DialogTitle>
              <DialogDescription>
                Enter the shipment details for the 2026 logistics network.
              </DialogDescription>
            </DialogHeader>
            <DataEntryForm 
              mode="create" 
              onSubmit={handleCreateShipment} 
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={isQROpen} onOpenChange={setIsQROpen}>
        <DialogContent className="sm:max-w-md luxury-glass border-border">
          <DialogHeader>
            <DialogTitle>Shipment Label (QR)</DialogTitle>
            <DialogDescription>
              Scan or print this label for tracking identification.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-8 gap-6">
            {selectedShipment && (
              <>
                <QRCodeGenerator 
                  data={selectedShipment.trackingNumber || ''} 
                  size={240} 
                  label={selectedShipment.trackingNumber}
                />
                <div className="text-center">
                  <p className="font-bold text-lg">{selectedShipment.trackingNumber}</p>
                  <p className="text-sm text-muted-foreground">To: {selectedShipment.receiverName}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsQROpen(false)}>Close</Button>
            <Button onClick={() => window.print()}>Print Label</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
