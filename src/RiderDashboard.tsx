import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Navigation,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  Camera,
  Scan,
  X,
  Check,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Star,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { SHIPMENT_STATUS, formatCurrency, formatDate, getStatusVariant } from '@/lib/index';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRScanner } from '@/components/QRScanner';
import { SignaturePad } from '@/components/SignaturePad';
import { PhotoCapture } from '@/components/PhotoCapture';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { springPresets, fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

interface DeliveryTask {
  id: string;
  trackingNumber: string;
  customerName: string;
  address: string;
  phone: string;
  codAmount: number;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
}

const MOCK_DELIVERIES: DeliveryTask[] = [
  {
    id: '1',
    trackingNumber: 'BRT-2026-991024',
    customerName: 'Htet Myat Soe',
    address: 'No. 12, Pyay Road, Mayangone Township, Yangon',
    phone: '+95 9 123 456 789',
    codAmount: 45000,
    status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    priority: 'High',
    estimatedTime: '10:30 AM',
  },
  {
    id: '2',
    trackingNumber: 'BRT-2026-882193',
    customerName: 'Zin Mar Aung',
    address: 'Suite 405, Sakura Tower, Bogyoke Aung San Rd, Yangon',
    phone: '+95 9 987 654 321',
    codAmount: 0,
    status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    priority: 'Medium',
    estimatedTime: '11:15 AM',
  },
  {
    id: '3',
    trackingNumber: 'BRT-2026-773412',
    customerName: 'Khin Maung Aye',
    address: 'House 56, Inya Road, Bahan Township, Yangon',
    phone: '+95 9 555 123 444',
    codAmount: 125000,
    status: SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    priority: 'High',
    estimatedTime: '12:00 PM',
  },
];

export default function RiderDashboard() {
  const { language } = useLanguage();
  const [activeTask, setActiveTask] = useState<DeliveryTask | null>(MOCK_DELIVERIES[0]);
  const [deliveries, setDeliveries] = useState<DeliveryTask[]>(MOCK_DELIVERIES);
  const [isOnline, setIsOnline] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [podStep, setPodStep] = useState<'none' | 'scan' | 'signature' | 'photo' | 'complete'>('none');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);

  const completedCount = 12;
  const totalTasks = 15;
  const progress = (completedCount / totalTasks) * 100;

  const handleCompleteDelivery = () => {
    if (activeTask) {
      setDeliveries(prev => prev.filter(t => t.id !== activeTask.id));
      setActiveTask(null);
      setPodStep('none');
      setSignatureData(null);
      setPhotoData(null);
      toast.success('Delivery marked as complete!');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Navigation & Status Bar */}
      <header className="sticky top-0 z-50 w-full luxury-glass border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            R1
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Zaw Zaw</h1>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'} animate-pulse`} />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOnline(!isOnline)}
          className={`rounded-full border-primary/20 ${isOnline ? 'text-primary' : 'text-muted-foreground'}`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </Button>
      </header>

      <main className="container max-w-lg mx-auto p-4 space-y-6">
        {/* Performance Overview */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="grid grid-cols-2 gap-3"
        >
          <motion.div variants={staggerItem}>
            <Card className="luxury-card border-none bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Today</Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{completedCount}/{totalTasks}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">Deliveries Done</p>
                </div>
                <Progress value={progress} className="h-1 mt-2 bg-primary/10" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card className="luxury-card border-none bg-emerald-500/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-500">To Remit</Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{formatCurrency(175000)}</p>
                  <p className="text-[10px] uppercase text-muted-foreground">COD Cash</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Current Active Task Section */}
        {activeTask ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springPresets.gentle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Next Stop</h2>
            <Card className="luxury-card border-primary/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <StatusBadge status={activeTask.status} size="sm" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Navigation className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{activeTask.customerName}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{activeTask.trackingNumber}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{activeTask.address}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">ETA: {activeTask.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-500">
                        {activeTask.codAmount > 0 ? `COD: ${formatCurrency(activeTask.codAmount)}` : 'Prepaid'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl border-white/10 flex items-center gap-2"
                    onClick={() => window.open(`tel:${activeTask.phone}`)}
                  >
                    <Phone className="w-4 h-4" /> Call
                  </Button>
                  <Button 
                    className="w-full h-12 rounded-xl luxury-button flex items-center gap-2"
                    onClick={() => setPodStep('scan')}
                  >
                    <Scan className="w-4 h-4" /> Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">All deliveries for this route are completed.</p>
              <Button variant="link" className="text-primary text-xs mt-2 uppercase tracking-widest">Refresh Route</Button>
            </div>
          </div>
        )}

        {/* Route List Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-xl p-1">
            <TabsTrigger value="pending" className="rounded-lg text-xs uppercase tracking-widest font-bold">
              Pending ({deliveries.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg text-xs uppercase tracking-widest font-bold">
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4 space-y-3">
            {deliveries.map((task) => (
              <motion.div 
                key={task.id} 
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveTask(task)}
                className={`p-4 luxury-card cursor-pointer border-l-4 ${
                  activeTask?.id === task.id ? 'border-l-primary bg-primary/5' : 'border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{task.customerName}</h4>
                    <p className="text-[10px] font-mono text-muted-foreground">{task.trackingNumber}</p>
                  </div>
                  <Badge variant={task.priority === 'High' ? 'destructive' : 'outline'} className="text-[10px] px-1.5 h-5">
                    {task.priority}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{task.address}</span>
                </div>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="text-center py-8 text-muted-foreground text-xs">
              Yesterday's delivery history will appear here.
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Actions Hub */}
      <div className="fixed bottom-0 left-0 right-0 luxury-glass border-t border-white/10 px-6 py-4 flex items-center justify-around">
        <div className="flex flex-col items-center gap-1 text-primary">
          <Activity className="w-6 h-6" />
          <span className="text-[8px] uppercase font-bold">Status</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Navigation className="w-6 h-6" />
          <span className="text-[8px] uppercase font-bold">Map</span>
        </div>
        <div className="w-14 h-14 -mt-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] border-4 border-background">
          <Scan className="w-6 h-6 text-black" />
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <TrendingUp className="w-6 h-6" />
          <span className="text-[8px] uppercase font-bold">Earning</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Star className="w-6 h-6" />
          <span className="text-[8px] uppercase font-bold">Rating</span>
        </div>
      </div>

      {/* Proof of Delivery Workflow Dialog */}
      <Dialog open={podStep !== 'none'} onOpenChange={(open) => !open && setPodStep('none')}>
        <DialogContent className="max-w-md bg-background border-primary/20 rounded-[2rem] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {podStep === 'scan' && 'Scan Package'}
              {podStep === 'signature' && 'Customer Signature'}
              {podStep === 'photo' && 'Proof of Delivery'}
              {podStep === 'complete' && 'Summary'}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-8">
            {podStep === 'scan' && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">Scan the barcode on the parcel label to verify.</p>
                <div className="rounded-2xl overflow-hidden aspect-square relative">
                  <QRScanner onScan={(data) => { 
                    toast.success(`Verified: ${data}`);
                    setPodStep('signature');
                  }} />
                </div>
                <Button variant="outline" className="w-full" onClick={() => setPodStep('signature')}>Skip Scan (Manual)</Button>
              </div>
            )}

            {podStep === 'signature' && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">Ask the recipient to sign below.</p>
                <div className="bg-muted/30 rounded-2xl p-2 border border-dashed border-primary/20">
                  <SignaturePad onSave={(data) => { 
                    setSignatureData(data);
                    setPodStep('photo');
                  }} />
                </div>
              </div>
            )}

            {podStep === 'photo' && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">Take a photo of the package at the location.</p>
                <div className="rounded-2xl overflow-hidden">
                  <PhotoCapture 
                    label="Capture Parcel Photo" 
                    onCapture={(data) => {
                      setPhotoData(data);
                      setPodStep('complete');
                    }}
                  />
                </div>
              </div>
            )}

            {podStep === 'complete' && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Verification Successful</h3>
                  <p className="text-sm text-muted-foreground mt-1">Signature and Photo captured.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <span className="text-[10px] uppercase text-muted-foreground block">COD Collected</span>
                    <span className="text-sm font-bold text-emerald-500">{formatCurrency(activeTask?.codAmount || 0)}</span>
                  </div>
                  <div className="p-3 bg-secondary/50 rounded-xl">
                    <span className="text-[10px] uppercase text-muted-foreground block">Time Spent</span>
                    <span className="text-sm font-bold">4m 12s</span>
                  </div>
                </div>
                <Button 
                  className="w-full luxury-button"
                  onClick={handleCompleteDelivery}
                >
                  Finish & Submit
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
