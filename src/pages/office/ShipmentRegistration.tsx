import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft, Save, AlertCircle, User, MapPin, DollarSign, Image as ImageIcon
} from 'lucide-react';
import { 
  ROUTE_PATHS, MOCK_TOWNSHIPS, Shipment 
} from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Bilingual Validation Schema
const registrationSchema = z.object({
  senderName: z.string().min(2, 'Sender name is required'),
  senderPhone: z.string().min(8, 'Valid sender phone is required'),
  receiverName: z.string().min(2, 'Receiver name is required'),
  receiverPhone: z.string().min(8, 'Valid receiver phone is required'),
  receiverAddress: z.string().min(10, 'Full address is required'),
  receiverTownship: z.string().min(1, 'Township is mandatory'),
  serviceType: z.enum(['standard', 'express']),
  codRequired: z.boolean().default(false),
  codAmount: z.number().optional().nullable(),
  weight: z.number().min(0.1, 'Weight must be at least 0.1kg'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function ShipmentRegistration() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext(); // Unified context
  const { ttId } = useParams<{ ttId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [provisionalData, setProvisionalData] = useState<Partial<Shipment> | null>(null);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { 
      serviceType: 'standard', 
      codRequired: false, 
      receiverTownship: '',
      weight: 1.0 
    },
  });

  useEffect(() => {
    // Fetching provisional data logic (e.g., from Supabase)
    const mockProvisional: Partial<Shipment> = {
      tamperTagId: ttId,
      pieces: 1,
      condition: 'OK',
      riderId: 'RDR-001',
      createdAt: new Date().toISOString(),
      photos: ['https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400']
    };
    setProvisionalData(mockProvisional);
  }, [ttId]);

  const onSubmit = async (data: RegistrationFormData) => {
    setLoading(true);
    try {
      // PRODUCTION: Link provisional TT record to actual shipment table
      await new Promise(resolve => setTimeout(resolve, 1000));
      const awb = `AWB-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      toast.success(t('Registration Successful!', 'မှတ်ပုံတင်ခြင်း အောင်မြင်ပါသည်!'), {
        description: `${t('AWB', 'အမှတ်စဉ်')} ${awb} ${t('linked to Tag', 'ကို Tag နှင့် ချိတ်ဆက်ပြီးပါပြီ')} ${ttId}`,
      });
      navigate(ROUTE_PATHS.OFFICE.QUEUE);
    } catch (error) {
      toast.error(t('Registration Failed', 'မှတ်ပုံတင်ခြင်း မအောင်မြင်ပါ'));
    } finally {
      setLoading(false);
    }
  };

  if (!provisionalData) return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <motion.div 
      initial="hidden" animate="visible" variants={fadeInUp}
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-6"
    >
      {/* Header / ခေါင်းစဉ် */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {t('Shipment Registration', 'ပေးပို့မှု မှတ်ပုံတင်ခြင်း')}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {t('Linked Tag', 'ချိတ်ဆက်ထားသော နံပါတ်')}: 
              <span className="font-mono font-bold text-primary px-2 py-0.5 bg-primary/5 rounded border border-primary/10">{ttId}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>{t('Cancel', 'ပယ်ဖျက်မည်')}</Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={loading} className="luxury-button min-w-[160px]">
            {loading ? t('Processing...', 'လုပ်ဆောင်နေသည်...') : <><Save className="mr-2 h-4 w-4" /> {t('Complete', 'အတည်ပြုမည်')}</>}
          </Button>
        </div>
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 font-bold">{t('Verification Required', 'စစ်ဆေးရန် လိုအပ်သည်')}</AlertTitle>
        <AlertDescription className="text-amber-700/80 text-sm">
          {t('Ensure weight and address match the physical label.', 'အလေးချိန်နှင့် လိပ်စာ မှန်ကန်မှုကို သေချာစွာ စစ်ဆေးပေးပါ။')}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Fields / အချက်အလက်ဖြည့်သွင်းမှု */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="luxury-card border-none shadow-luxury">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2 font-heading"><User className="h-5 w-5 text-primary" /> {t('Sender Details', 'ပေးပို့သူ')}</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Sender Name', 'ပေးပို့သူ အမည်')}</Label>
                <Input {...form.register('senderName')} placeholder={t('Full Name', 'အမည်အပြည့်အစုံ')} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Sender Phone', 'ပေးပို့သူ ဖုန်း')}</Label>
                <Input {...form.register('senderPhone')} placeholder="09..." />
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-card border-none shadow-luxury">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2 font-heading"><MapPin className="h-5 w-5 text-primary" /> {t('Receiver Details', 'လက်ခံသူ')}</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Receiver Name', 'လက်ခံသူ အမည်')}</Label>
                  <Input {...form.register('receiverName')} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Receiver Phone', 'လက်ခံသူ ဖုန်း')}</Label>
                  <Input {...form.register('receiverPhone')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Address', 'လိပ်စာအပြည့်အစုံ')}</Label>
                <Input {...form.register('receiverAddress')} placeholder={t('House No, Street...', 'အိမ်အမှတ်၊ လမ်း...')} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Township', 'မြို့နယ်')}</Label>
                  <Select onValueChange={(val) => form.setValue('receiverTownship', val)}>
                    <SelectTrigger><SelectValue placeholder={t('Select', 'ရွေးချယ်ပါ')} /></SelectTrigger>
                    <SelectContent>
                      {MOCK_TOWNSHIPS.map(tw => <SelectItem key={tw} value={tw}>{tw}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">{t('Service', 'ဝန်ဆောင်မှု')}</Label>
                  <Select onValueChange={(val: 'standard' | 'express') => form.setValue('serviceType', val)} defaultValue="standard">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">{t('Standard', 'ပုံမှန်')}</SelectItem>
                      <SelectItem value="express">{t('Express', 'အမြန်')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar / ဘေးဘက်ခြမ်း */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="luxury-card border-none shadow-luxury overflow-hidden">
            <CardHeader className="bg-slate-50 border-b"><CardTitle className="text-sm font-black flex items-center gap-2"><ImageIcon className="h-4 w-4 text-primary" /> {t('Evidence', 'သက်သေခံပုံများ')}</CardTitle></CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {provisionalData.photos?.map((photo, i) => (
                  <img key={i} src={photo} className="rounded-xl object-cover border shadow-sm aspect-video" alt="Evidence" />
                ))}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs border border-slate-100">
                <div className="flex justify-between"><span>{t('Pieces', 'အရေအတွက်')}</span><span className="font-bold">{provisionalData.pieces}</span></div>
                <div className="flex justify-between"><span>{t('Condition', 'အခြေအနေ')}</span><span className="font-bold text-emerald-600">{provisionalData.condition}</span></div>
                <div className="flex justify-between"><span>{t('Rider', 'ဝန်ထမ်း')}</span><span className="font-bold">{provisionalData.riderId}</span></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/20 shadow-none rounded-3xl">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-bold uppercase tracking-tighter">{t('Handling Fee', 'ဝန်ဆောင်ခ')}</span>
                <span className="font-mono font-bold text-primary text-xl">3,500 MMK</span>
              </div>
              <Button className="w-full h-12 luxury-button" onClick={form.handleSubmit(onSubmit)} disabled={loading}>
                {t('Finalize Shipment', 'ပေးပို့မှု အတည်ပြုမည်')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}