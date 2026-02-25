  Search, CheckCircle2, XCircle, Package 
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
// Using centralized Hybrid Interface and bilingual helpers
import { Shipment, getBilingualStatus, getStatusVariant } from '@/lib/index';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const RegistrationQueue: React.FC = () => {
  const { t } = useLanguageContext(); 
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('shipments');
  const [searchQuery, setSearchQuery] = useState('');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Helper to render colored badges based on status with bilingual labels
   * Uses getStatusVariant from @/lib/index to ensure system-wide consistency
   */
  const getStatusBadge = (status: string) => {
    const label = getBilingualStatus(status, t); 
    const variant = getStatusVariant(status); 
    
    return (
      <Badge variant={variant as any} className="font-bold uppercase tracking-tight">
        {label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">
            {t('Registration Queue', 'မှတ်ပုံတင်ရန် စောင့်ဆိုင်းစာရင်း')}
          </h1>
          <p className="text-muted-foreground">
            {t('Manage and process new shipment and user applications.', 'ပေးပို့မှုအသစ်များနှင့် အသုံးပြုသူ လျှောက်ထားလွှာများကို စီမံခန့်ခွဲပါ။')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t('Search records...', 'ရှာဖွေမည်...')} 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content Tabs */}
      <Tabs defaultValue="shipments" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-secondary/30 p-1 mb-6 border rounded-xl">
          <TabsTrigger value="shipments">
            {t('Shipment Verification', 'ပို့ဆောင်မှု စစ်ဆေးခြင်း')}
          </TabsTrigger>
          <TabsTrigger value="customers">
            {t('Customer Onboarding', 'ဝယ်ယူသူ မှတ်ပုံတင်ခြင်း')}
          </TabsTrigger>
          <TabsTrigger value="merchants">
            {t('Merchant Verification', 'ကုန်သည် စစ်ဆေးခြင်း')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipments">
          <Card className="luxury-card border-none shadow-sm overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-bold">{t('Tracking ID', 'ခြေရာခံအမှတ်')}</TableHead>
                  <TableHead className="font-bold">{t('Sender', 'ပေးပို့သူ')}</TableHead>
                  <TableHead className="font-bold">{t('Receiver', 'လက်ခံသူ')}</TableHead>
                  <TableHead className="font-bold">{t('Pieces', 'အရေအတွက်')}</TableHead>
                  <TableHead className="font-bold">{t('Status', 'အခြေအနေ')}</TableHead>
                  <TableHead className="text-right font-bold">{t('Actions', 'ဆောင်ရွက်ချက်များ')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 opacity-50 italic">
                      {t('Loading queue...', 'ခဏစောင့်ပါ...')}
                    </TableCell>
                  </TableRow>
                ) : shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 opacity-50 italic">
                      {t('No pending items found.', 'စောင့်ဆိုင်းနေသော စာရင်းမရှိပါ။')}
                    </TableCell>
                  </TableRow>
                ) : (
                  shipments.map((shipment) => (
                    <TableRow key={shipment.id} className="hover:bg-secondary/10 transition-colors">
                      <TableCell className="font-mono font-bold text-primary">
                        {/* Standardized to 'awb' from the hybrid interface */}
                        {shipment.awb || shipment.awb_number || "N/A"}
                      </TableCell>
                      <TableCell>{shipment.senderName || "Unknown"}</TableCell>
                      <TableCell>{shipment.receiverName || "Unknown"}</TableCell>
                      {/* Standardized property access for 'pieces' */}
                      <TableCell>{shipment.pieces || 1} {t('pcs', 'ခု')}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            {t('Approve', 'အတည်ပြုမည်')}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-rose-500">
                            <XCircle className="h-4 w-4 mr-1" />
                            {t('Reject', 'ပယ်ဖျက်မည်')}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegistrationQueue;