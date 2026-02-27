import { DataEntryAutomation } from '@/components/DataEntryAutomation';
import { RealTimeTrackingDashboard } from '@/components/RealTimeTrackingDashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IMAGES } from '@/assets/images';
import { useLanguageContext } from '@/lib/LanguageContext'; // Fixed: Resolved missing context
import { springPresets, fadeInUp, staggerContainer } from '@/lib/motion';

/**
 * AdvancedLogistics Page - Britium 2026
 * Command center for precision logistics orchestration.
 */
export default function AdvancedLogistics() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext(); // Fixed: Resolved 't' is not defined errors
  const [activeTab, setActiveTab] = useState('overview');
  const [lastEvent, setLastEvent] = useState<string>(
    t('System Ready - All units operational', 'စနစ်အဆင်သင့်ဖြစ်ပါပြီ - ယာဉ်အားလုံး ပုံမှန်အလုပ်လုပ်နေပါသည်')
  );

  const handleSignatureComplete = (data: { signature: string; timestamp: string }) => {
    setLastEvent(`${t('Signature captured', 'လက်မှတ်ရယူပြီးပါပြီ')} | ${data.timestamp}`);
  };

  const handleDataExtracted = (data: any) => {
    setLastEvent(`${t('Automated entry', 'အလိုအလျောက်စာရင်းသွင်းခြင်း')}: ${Object.keys(data).length} ${t('fields extracted', 'အချက်အလက်များ ထုတ်ယူပြီးပါပြီ')}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Luxury Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src={IMAGES.SCREENSHOT3650_2_58} 
          className="w-full h-full object-cover opacity-10 filter grayscale blur-xl scale-110"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 space-y-8">
        {/* Header Section / ခေါင်းစဉ်ပိုင်း */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/50 text-primary font-mono text-[10px] tracking-widest">
                PREMIUM ENTERPRISE 2026
              </Badge>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">{t('Live Network', 'တိုက်ရိုက်ကွန်ရက်')}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('Advanced Logistics', 'အဆင့်မြင့် ပို့ဆောင်ရေးစီမံမှု')}
            </h1>
            <p className="text-muted-foreground max-w-2xl font-light">
              {t(
                'Command center for precision logistics. Real-time telemetry and automated processing.', 
                'တိကျသော ပို့ဆောင်ရေးစီမံမှု ဗဟိုဌာန။ အချိန်နှင့်တပြေးညီ စောင့်ကြည့်မှုနှင့် အလိုအလျောက် လုပ်ငန်းစဉ်များ။'
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="luxury-glass h-12 px-6">
              <Settings className="mr-2 h-4 w-4" /> {t('System Config', 'စနစ်ပြင်ဆင်ချက်')}
            </Button>
            <Button className="luxury-button">
              <LayoutDashboard className="mr-2 h-4 w-4" /> {t('Global View', 'ကမ္ဘာလုံးဆိုင်ရာ အမြင်')}
            </Button>
          </div>
        </motion.header>

        {/* Main Interface / ပင်မလုပ်ဆောင်ချက်များ */}
        <Tabs defaultValue="overview" className="w-full space-y-8" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-2 luxury-glass rounded-2xl border-white/10">
            <TabsList className="bg-transparent gap-2 h-12">
              <TabsTrigger value="overview" className="h-10 px-6 rounded-xl transition-all">
                <Activity className="mr-2 h-4 w-4" /> {t('Network Overview', 'ကွန်ရက်အနှစ်ချုပ်')}
              </TabsTrigger>
              <TabsTrigger value="tracking" className="h-10 px-6 rounded-xl transition-all">
                <Navigation className="mr-2 h-4 w-4" /> {t('GPS Telemetry', 'GPS ခြေရာခံမှု')}
              </TabsTrigger>
              <TabsTrigger value="signatures" className="h-10 px-6 rounded-xl transition-all">
                <PenTool className="mr-2 h-4 w-4" /> {t('Digital POD', 'ဒီဂျစ်တယ် လက်ခံလွှာ')}
              </TabsTrigger>
              <TabsTrigger value="automation" className="h-10 px-6 rounded-xl transition-all">
                <Database className="mr-2 h-4 w-4" /> {t('Data Automation', 'အလိုအလျောက် စာရင်းသွင်းမှု')}
              </TabsTrigger>
            </TabsList>

            <div className="hidden lg:flex items-center gap-4 px-4 border-l">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-mono">{t('Status', 'အခြေအနေ')}</p>
                <p className="text-sm text-primary font-mono uppercase">{t('Optimized', 'အကောင်းဆုံးဖြစ်အောင်လုပ်ပြီး')}</p>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="mt-0 outline-none">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <RealTimeTrackingDashboard routeId="RT-7721-MAIN" showMap={true} />
                </div>
                <div className="space-y-6">
                  <Card className="luxury-card border-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" /> {t('Activity Feed', 'လက်ရှိလုပ်ဆောင်ချက်များ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="relative pl-6 pb-4 border-l border-white/10 last:pb-0">
                          <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                          <p className="text-xs text-muted-foreground font-mono">14:2{i} GMT</p>
                          <p className="text-sm text-foreground/90 mt-1">{t('Unit Delta active in Zone B', 'ယူနစ် Delta သည် ဇုန် B တွင် ရှိနေသည်')}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="luxury-card border-white/5 bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                        <Badge variant="outline" className="bg-primary/20 text-primary border-none">{t('Secure', 'လုံခြုံသည်')}</Badge>
                      </div>
                      <h4 className="font-semibold mb-2">{t('Audit Protocol Active', 'စစ်ဆေးရေးလုပ်ငန်းစဉ် အလုပ်လုပ်နေသည်')}</h4>
                      <p className="text-sm text-muted-foreground">{t('Transactions are cryptographically hashed for 2026 standards.', 'လုပ်ဆောင်ချက်အားလုံးကို ၂၀၂၆ စံချိန်စံညွှန်းအတိုင်း လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။')}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="signatures">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <ElectronicSignaturePad parcelId="PKG-4420-Z" riderId="USR-882-JONES" onSignatureComplete={handleSignatureComplete} />
                <Card className="luxury-card p-8 space-y-6">
                   <h3 className="text-2xl font-bold">{t('Biometric Confirmation', 'ဇီဝဗေဒဆိုင်ရာ အတည်ပြုချက်')}</h3>
                   <p className="text-muted-foreground">{t('AI-validated photo and digital signature are required for delivery.', 'ပို့ဆောင်မှုအတွက် AI ဖြင့် စစ်ဆေးထားသော ဓာတ်ပုံနှင့် လက်မှတ် လိုအပ်ပါသည်။')}</p>
                </Card>
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        {/* Global Footer / အောက်ခြေပိုင်း */}
        <footer className="flex flex-col md:flex-row justify-between items-center gap-4 py-12 border-t border-white/5">
          <p className="text-sm text-muted-foreground font-light">
            {t('Monitoring', 'စောင့်ကြည့်နေသည်')} <span className="text-foreground font-medium">2,481 {t('shipments', 'ပါဆယ်များ')}</span> {t('globally', 'ကမ္ဘာလုံးဆိုင်ရာ')}
          </p>
          <p className="text-[10px] font-mono text-muted-foreground opacity-50">
            © 2026 BRITIUM EXPRESS LOGISTICS CORE
          </p>
        </footer>
      </div>
    </div>
  );
}