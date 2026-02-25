export default function RegistrationQueue() {
  const { t } = useLanguageContext();
  const { data: allShipments, isLoading } = useShipments();

  // Filter only shipments that need office registration
  const queue = useMemo(() => {
    return (allShipments || []).filter(s => s.status === 'pending_reg');
  }, [allShipments]);

  if (isLoading) return <div className="p-20 text-center animate-pulse">{t('Syncing Queue...', 'စာရင်းများ ရယူနေသည်...')}</div>;

  return (
    // ... Render using 'queue' variable
  );
}