
export const RiderDashboard = () => {
  const { t } = useLanguageContext();
  return (
    <div className="p-4">
      <h2 className="font-black text-[#ff6b00]">
        {t('rider.active', 'လက်ရှိလုပ်ဆောင်ချက်များ')}
      </h2>
      {/* Ensure StatusBadge uses SHIPMENT_STATUS.PICKED_UP correctly */}
    </div>
  );
};