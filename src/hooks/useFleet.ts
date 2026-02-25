export function useFleet() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Initial Data Fetch
  const fetchFleet = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('vehicles')
        .select('*');

      if (fetchError) throw fetchError;
      setVehicles(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();

    // 2. Real-time Subscription
    const fleetSubscription = supabase
      .channel('fleet_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'vehicles' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setVehicles((prev) => [...prev, payload.new as FleetVehicle]);
          } else if (payload.eventType === 'UPDATE') {
            setVehicles((prev) =>
              prev.map((v) => (v.id === payload.new.id ? (payload.new as FleetVehicle) : v))
            );
          } else if (payload.eventType === 'DELETE') {
            setVehicles((prev) => prev.filter((v) => v.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(fleetSubscription);
    };
  }, []);

  // 3. Derived Stats for MetricsCards
  const stats = {
    activeCount: vehicles.filter((v) => v.status === 'ACTIVE' || v.status === 'IN_USE').length,
    maintenanceCount: vehicles.filter((v) => v.status === 'MAINTENANCE').length,
    driversOnline: vehicles.filter((v) => v.assignedRiderId !== null && v.status !== 'OFFLINE').length,
    avgFuel: Math.round(
      vehicles.reduce((acc, v) => acc + (v.fuelLevel || 0), 0) / (vehicles.length || 1)
    ),
  };

  return { vehicles, stats, loading, error, refresh: fetchFleet };
}