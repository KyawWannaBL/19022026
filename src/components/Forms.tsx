import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Loader2, 
  Package, 
  User, 
  MapPin, 
  Phone, 
  Scale, 
  AlertTriangle, 
  Camera, 
  PenTool, 
  ShieldCheck, 
  Send 
} from 'lucide-react';

import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Shipment } from '@/lib/index';
import { useAuth } from '@/hooks/useAuth';
import { PhotoCapture } from '@/components/PhotoCapture';
import { SignaturePad } from '@/components/SignaturePad';
import { useLanguageContextContext } from '@/lib/LanguageContext';

/**
 * 1. LOGIN FORM (Bi-lingual)
 */
export function LoginForm() {
  const { login, loading } = useAuth();
  const { t } = useLanguageContextContext();
  const [error, setError] = useState<string>('');
  
  const loginSchema = z.object({
    email: z.string().email(t('auth.invalidEmail', 'အီးမေးလ်လိပ်စာ မှားယွင်းနေပါသည်')),
    password: z.string().min(6, t('auth.passwordTooShort', 'စကားဝှက်သည် အနည်းဆုံး ၆ လုံးရှိရပါမည်')),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError('');
    try {
      await login(values.email, values.password);
    } catch (err: any) {
      setError(err.message || t('auth.failed', 'ဝင်ရောက်ရန် ကြိုးပမ်းမှု မအောင်မြင်ပါ'));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.email', 'အီးမေးလ်')}</FormLabel>
              <FormControl><Input placeholder="admin@britium.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('auth.password', 'စကားဝှက်')}</FormLabel>
              <FormControl><Input type="password" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-11 bg-[#0d2c54]" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('auth.signIn', 'စနစ်သို့ဝင်ရန်')}
        </Button>
      </form>
    </Form>
  );
}

/**
 * 2. EXCEPTION FORM (Bi-lingual)
 */
export function ExceptionForm({ shipmentId, onSubmit, isLoading }: { shipmentId: string, onSubmit: (data: any) => void, isLoading: boolean }) {
  const { t } = useLanguageContextContext();
  const form = useForm({
    defaultValues: { reason: '', description: '', photo: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
          <AlertTriangle className="w-6 h-6" />
          <div className="flex flex-col">
            <p className="font-bold">{t('exception.reporting', 'ပြဿနာ တိုင်ကြားရန်')}</p>
            <p className="text-xs uppercase">ID: {shipmentId}</p>
          </div>
        </div>
        <FormField control={form.control} name="reason" render={({ field }) => (
          <FormItem>
            <FormLabel>{t('exception.type', 'အမျိုးအစား')}</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl><SelectTrigger><SelectValue placeholder={t('common.select', 'ရွေးချယ်ပါ')} /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="DAMAGED">{t('exception.damaged', 'ပျက်စီးသွားသည်')}</SelectItem>
                <SelectItem value="REFUSED">{t('exception.refused', 'လက်မခံပါ')}</SelectItem>
                <SelectItem value="MISSED">{t('exception.missed', 'လွဲချော်သွားသည်')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" variant="destructive" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" />}
          {t('common.submit', 'ပေးပို့မည်')}
        </Button>
      </form>
    </Form>
  );
}