  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  // Replace this with your realtime feed (Supabase realtime, websockets, polling, etc.)
  const vehicles = useMemo<VehiclePoint[]>(
    () => [
      { id: "veh_01", label: "Rider 01", status: "IN_TRANSIT", lng: 96.173, lat: 16.83 },
      { id: "veh_02", label: "Rider 02", status: "DELIVERING", lng: 96.145, lat: 16.85 },
      { id: "veh_03", label: "Rider 03", status: "IDLE", lng: 96.20, lat: 16.80 },
    ],
    []
  );

  const selectedRoute = useMemo<RouteLine | null>(() => {
    if (!selectedVehicleId) return null;
    // Replace with real route polyline from your routing service / Mapbox Directions API backend.
    return {
      id: `route_${selectedVehicleId}`,
      name: `Route for ${selectedVehicleId}`,
      coordinates: [
        [96.173, 16.83],
        [96.165, 16.84],
        [96.155, 16.845],
      ],
    };
  }, [selectedVehicleId]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-6 py-4 border-b bg-white">
        <div className="text-lg font-semibold">Logistics Monitoring</div>
        <div className="text-sm text-slate-600">Live vehicle positions + routes</div>
      </div>

      <div className="p-6">
        <LogisticsMap
          vehicles={vehicles}
          selectedRoute={selectedRoute}
          onVehicleClick={(v) => setSelectedVehicleId(v.id)}
          initialViewState={{ longitude: 96.158, latitude: 16.84, zoom: 11 }}
        />
      </div>
    </div>
  );
}