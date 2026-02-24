import React from 'react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { Shipment } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ShipmentDetailsForm = ({ 
  shipment, 
  onSave 
}: { 
  shipment: Partial<Shipment>, 
  onSave: (data: any) => void 
}) => {
  const { t } = useLanguageContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('shipment.weight', 'အလေးချိန် (kg)')}</Label>
          <Input type="number" defaultValue={shipment.weight} />
        </div>
        <div className="space-y-2">
          <Label>{t('shipment.pieces', 'အရေအတွက်')}</Label>
          <Input type="number" defaultValue={shipment.pieces} />
        </div>
      </div>
      <Button onClick={() => onSave(shipment)} className="w-full bg-[#0d2c54]">
        {t('common.save', 'သိမ်းဆည်းမည်')}
      </Button>
    </div>
  );
};