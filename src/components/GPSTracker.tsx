export type GPSPoint = {
  lat: number;
  lng: number;
  speedKmh?: number | null;
  batteryLevel?: number | null;
  updatedAt?: string | Date | null;
};

export type GPSTrackerProps = {
  vehicleId: string;
  pollMs?: number;
  /**
   * Provide your real fetcher later (e.g. Supabase, REST, websockets).
   * This keeps TypeScript/build green now.
   */
  fetchLatest?: (vehicleId: string) => Promise<GPSPoint | null>;
  onUpdate?: (point: GPSPoint) => void;
};

export function GPSTracker({
  vehicleId,
  pollMs = 5000,
  fetchLatest,
  onUpdate,
}: GPSTrackerProps) {
  const [last, setLast] = React.useState<GPSPoint | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    let timer: number | null = null;

    async function tick() {
      if (!fetchLatest) return; // no-op until wired
      try {
        const point = await fetchLatest(vehicleId);
        if (!alive) return;
        setLast(point);
        if (point && onUpdate) onUpdate(point);
        setError(null);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : String(e));
      }
    }

    tick();
    timer = window.setInterval(tick, pollMs);

    return () => {
      alive = false;
      if (timer) window.clearInterval(timer);
    };
  }, [vehicleId, pollMs, fetchLatest, onUpdate]);

  // Render nothing (tracker is usually a data source). Add UI later if you want.
  return (
    <div className="hidden" data-vehicle-id={vehicleId} data-error={error ?? ""}>
      {last ? JSON.stringify(last) : ""}
    </div>
  );
}

export default GPSTracker;