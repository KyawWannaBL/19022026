import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SHIPMENT_STATUS } from '@/lib/index';

// Validation Schema
const formSchema = z.object({
  senderName: z.string().min(2),
  receiverName: z.string().min(2),
  weight: z.string(),
  codAmount: z.string().optional(),
});

export const ParcelRegistrationForm = () => {
  const { t } = useLanguageContext();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-[#0d2c54] mb-4">
        {t('Register New Parcel', 'ပါဆယ်လ်အသစ် စာရင်းသွင်းရန်')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('Sender Name', 'ပေးပို့သူအမည်')}</Label>
          <Input {...register('senderName')} placeholder={t('Enter name', 'အမည်ထည့်ပါ')} />
        </div>

        <div className="space-y-2">
          <Label>{t('Receiver Name', 'လက်ခံသူအမည်')}</Label>
          <Input {...register('receiverName')} placeholder={t('Enter name', 'အမည်ထည့်ပါ')} />
        </div>

        <div className="space-y-2">
          <Label>{t('Weight (kg)', 'အလေးချိန် (ကီလို)')}</Label>
          <Input {...register('weight')} type="number" placeholder="0.0" />
        </div>

        <div className="space-y-2">
          <Label>{t('COD Amount', 'ကောက်ခံရမည့် ငွေပမာဏ')}</Label>
          <Input {...register('codAmount')} placeholder="0 MMK" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#ff6b00] hover:bg-[#e65a00] font-bold text-white">
        {t('Create Shipment', 'ပို့ဆောင်မှုစာရင်းသွင်းမည်')}
      </Button>
    </form>
  );
};