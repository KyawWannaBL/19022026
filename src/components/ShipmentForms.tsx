import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Shipment } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Ensure the interface matches what other pages are sending
interface ShipmentFormProps {
  initialData?: Partial<Shipment>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const ShipmentForms: React.FC<ShipmentFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { t } = useLanguageContext();

  return (
    <div className="space-y-4 p-4 border rounded-xl bg-white">
      <div className="space-y-2">
        <Label>{t('shipment.sender', 'ပေးပို့သူ အမည်')}</Label>
        <Input defaultValue={initialData?.senderName} placeholder="U Ba..." />
      </div>
      <Button 
        onClick={() => onSubmit(initialData)} 
        disabled={isLoading}
        className="w-full bg-[#0d2c54]"
      >
        {isLoading ? t('common.loading', 'လုပ်ဆောင်နေသည်...') : t('common.save', 'သိမ်းဆည်းမည်')}
      </Button>
    </div>
  );
};