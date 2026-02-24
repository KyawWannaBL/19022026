import React from 'react';
import { ShipmentsList } from '@/components/Shipments';
import { useLanguageContextContext } from '@/lib/LanguageContext';

const ShipmentsPage = () => {
  const { t } = useLanguageContextContext();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('public.track', 'ပို့ဆောင်မှုများ')}</h1>
      <ShipmentsList shipments={[]} />
    </div>
  );
};

export default ShipmentsPage;