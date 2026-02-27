
// Centralized Imports - Deduplicated (TS2300 Fixed)
import { ROUTE_PATHS, generateTrackingNumber, SHIPMENT_STATUS } from '@/lib/index';
import { useLanguageContext } from '@/lib/LanguageContext';
import { supabase } from '@/lib/supabase';
import { TABLES } from '@/lib/db/tables';
import { CreateShipmentForm } from '@/components/ShipmentForms';
import { springPresets, fadeInUp } from '@/lib/motion';

/**
 * CreateShipment Page - Britium Express 2026
 * Provides a bilingual interface for registering new packages.
 */
export default function CreateShipment() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const { t } = useLanguageContext();

  const handleSubmit = async (data: any) => {
    // 1. Guard for Supabase configuration
    if (!supabase) {
      toast.error(t(
        'Supabase is not configured properly.', 
        'Supabase ကို မှန်ကန်စွာ ချိတ်ဆက်ထားခြင်း မရှိပါ။'
      ));
      return;
    }

    const awb = generateTrackingNumber();

    // 2. Map form data to Database Schema (Hybrid Approach)
    const payload = {
      awb_number: awb,
      sender_name: data.senderName,
      sender_phone: data.senderPhone,
      sender_address: data.senderAddress,
      sender_city: data.senderCity,
      receiver_name: data.receiverName,
      receiver_phone: data.receiverPhone,
      receiver_address: data.receiverAddress,
      receiver_city: data.receiverCity,
      weight: data.weight,
      cod_amount: data.codAmount ?? 0,
      total_cost: data.price ?? 0,
      status: SHIPMENT_STATUS.PENDING,
      origin_branch_id: data.branchId,
      special_instructions: data.notes ?? null,
      service_type: data.serviceType ?? 'standard',
      payment_method: data.paymentMethod ?? 'cash',
    };

    // 3. Define the Async Action for Toast Promise
    const createAction = async () => {
      const { data: inserted, error } = await supabase
        .from(TABLES.SHIPMENTS)
        .insert(payload)
        .select('*')
        .single();

      if (error) throw error;

      // Insert initial tracking record
      await supabase.from(TABLES.SHIPMENT_TRACKING).insert({
        shipment_id: inserted.id,
        status: SHIPMENT_STATUS.PENDING,
        location: inserted.sender_city ?? 'Origin',
        notes: 'Shipment created and registered in system',
        timestamp: new Date().toISOString(),
      });

      return inserted;
    };

    // 4. Execute with Bilingual Toast
    toast.promise(createAction(), {
      loading: t('Registering shipment...', 'ပေးပို့မှုစာရင်း သွင်းနေပါသည်...'),
      success: () => {
        navigate(ROUTE_PATHS.SHIPMENTS);
        return t(
          `Shipment created! Tracking: ${awb}`, 
          `ပေးပို့မှုစာရင်းသွင်းပြီးပါပြီ။ အမှတ်စဉ်- ${awb}`
        );
      },
      error: (e: any) => e?.message || t(
        'Failed to create shipment.', 
        'စာရင်းသွင်းရန် မအောင်မြင်ပါ။'
      ),
    });
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={springPresets.gentle}
    >
      {/* Header Section / ခေါင်းစဉ်ပိုင်း */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 -ml-2 hover:bg-secondary"
              onClick={() => navigate(ROUTE_PATHS.SHIPMENTS)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('Back to Shipments', 'ပေးပို့မှုစာရင်းသို့ ပြန်သွားရန်')}
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <PackagePlus className="w-8 h-8 text-primary" />
            {t('New Shipment', 'ပေးပို့မှုအသစ်')}
          </h1>
          <p className="text-muted-foreground">
            {t(
              'Register a new package for delivery within the Britium Express network.',
              'Britium Express ကွန်ရက်အတွင်း ပေးပို့ရန် ပစ္စည်းအသစ်ကို မှတ်ပုံတင်ပါ။'
            )}
          </p>
        </div>
      </div>

      {/* Main Content / ပင်မအချက်အလက်များ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>{t('Shipment Details', 'ပေးပို့မှု အချက်အလက်များ')}</CardTitle>
              <CardDescription>
                {t(
                  'Enter sender, receiver, and package specifications.',
                  'ပေးပို့သူ၊ လက်ခံသူနှင့် ပါဆယ်အချက်အလက်များကို ဖြည့်စွက်ပါ။'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateShipmentForm onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / ဘေးဘက် အချက်အလက်များ */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Info className="w-5 h-5" />
                {t('Quick Guide', 'လမ်းညွှန်ချက်')}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-4 text-foreground/80">
              <p>
                {t(
                  'Ensure all receiverName contact information is accurate.',
                  'လက်ခံမည့်သူ၏ အချက်အလက်များ မှန်ကန်ပါစေ။'
                )}
              </p>
              <div className="p-3 bg-background rounded-md border border-border space-y-2">
                <h4 className="font-semibold text-foreground">
                  {t('Prohibited Items:', 'ပေးပို့ရန် တားမြစ်ပစ္စည်းများ -')}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs opacity-80">
                  <li>{t('Flammable liquids', 'လောင်စာဆီနှင့် ဓာတ်ငွေ့များ')}</li>
                  <li>{t('Illegal substances', 'တရားမဝင် ပစ္စည်းများ')}</li>
                  <li>{t('Perishables', 'အလွယ်တကူ ပုပ်သိုးနိုင်သော ပစ္စည်းများ')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}