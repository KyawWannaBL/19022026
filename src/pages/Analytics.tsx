// DELETE: REVENUE_FORECAST_DATA
// DELETE: BRANCH_PERFORMANCE
// DELETE: STATUS_DISTRIBUTION

export default function Analytics() {
  const { t } = useLanguageContext();
  const { data: shipments, isLoading } = useShipments();

  const processedData = useMemo(() => {
    // If no real data, return empty structures instead of mocks
    if (!shipments || shipments.length === 0) return { metrics: { revenue: 0, onTime: 0, total: 0, exceptions: 0 }, pie: [], chart: [] };
    
    const total = shipments.length;
    const delivered = shipments.filter(s => s.status === 'delivered').length;
    
    // Aggregate real revenue from the database 'cod_amount' column
    const revenue = shipments.reduce((acc, s) => acc + (Number(s.cod_amount) || 0), 0);

    return {
      metrics: {
        revenue,
        onTime: ((delivered / total) * 100).toFixed(1),
        total,
        exceptions: shipments.filter(s => s.status === 'failed').length
      },
      pie: [
        { name: t('Delivered', 'ပို့ဆောင်ပြီး'), value: delivered, color: '#10b981' },
        { name: t('In Transit', 'ပို့ဆောင်ဆဲ'), value: shipments.filter(s => s.status === 'in_transit').length, color: '#D4AF37' }
      ]
    };
  }, [shipments, t]);

  // ... rest of the component using processedData.metrics
}