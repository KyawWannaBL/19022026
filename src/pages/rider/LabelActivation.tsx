import React from 'react';
import { useLanguageContextContext } from '@/lib/LanguageContext';
import { SHIPMENT_STATUS } from '@/lib/index'; // Critical import

const LabelActivation = () => {
  const { t } = useLanguageContextContext();
  // Ensure your scan logic uses SHIPMENT_STATUS.LABEL_APPLIED_VERIFIED
  return (
    <div className="p-4">
      <h2 className="text-[#ff6b00] font-bold">
        {t('rider.activate', 'လော့ဘယ်လ် အသက်သွင်းရန်')}
      </h2>
    </div>
  );
};

export default LabelActivation;