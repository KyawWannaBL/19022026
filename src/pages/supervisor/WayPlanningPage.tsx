import React, { useMemo, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Popup, Source, type ViewState } from "react-map-gl";
import { geocodeAddress, optimizeTrip, type OptimizeCoord, type LngLat } from "@/lib/mapboxWayPlan";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";

type ShipmentLike = Record<string, unknown>;

function getId(s: ShipmentLike): string {
  return String(s.id ?? s.shipment_id ?? s.tracking_number ?? crypto.randomUUID());
}

function getTracking(s: ShipmentLike): string {
  return String(s.tracking_number ?? s.awb ?? s.id ?? "");
}

function getAddress(s: ShipmentLike): string {
  return String(
    s.delivery_address ??
      s.deliveryAddress ??
      s.address ??
      s.dropoff_address ??
      s.destination_address ??
      ""
  ).trim();
}

function getLatLng(s: ShipmentLike): LngLat | null {
  const lng = Number(s.delivery_lng ?? s.dropoff_lng ?? s.lng ?? s.longitude);
  const lat = Number(s.delivery_lat ?? s.dropoff_lat ?? s.lat ?? s.latitude);
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  return { lng, lat };
}

function fmtDuration(sec: number): string {
  const m = Math.round(sec / 60);
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return h > 0 ? `${h}h ${mm}m` : `${mm}m`;
}

function fmtDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
}

export default function WayPlanningPage() {
  const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string | undefined;
  if (!mapboxToken) throw new Error("Missing VITE_MAPBOX_PUBLIC_TOKEN");

  const { data: shipmentsRaw = [], isLoading } = useEnterpriseShipments();
  const shipments = shipmentsRaw as ShipmentLike[];

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [roundtrip, setRoundtrip] = useState(true);

  const [hub, setHub] = useState<LngLat>({ lng: 96.158, lat: 16.84 }); // Yangon default
  const [hovered, setHovered] = useState<ShipmentLike | null>(null);

  const [planning, setPlanning] = useState(false);
  const [route, setRoute] = useState<null | {
    geometry: { type: "LineString"; coordinates: Array<[number, number]> };
    orderedStops: Array<{ id: string; tracking: string; address: string; lng: number; lat: number }>;
    distance_m: number;
    duration_s: number;
  }>(null);

  const selectedShipments = useMemo(() => {
    return shipments.filter((s) => selected[getId(s)]);
  }, [shipments, selected]);

  const stopsWithCoords = useMemo(() => {
    return selectedShipments
      .map((s) => {
        const id = getId(s);
        const tracking = getTracking(s);
        const address = getAddress(s);
        const ll = getLatLng(s);
        return ll ? { id, tracking, address, ...ll } : { id, tracking, address, lng: NaN, lat: NaN };
      })
      .filter((x) => x.address.length > 0);
  }, [selectedShipments]);

  const viewState = useMemo<Partial<ViewState>>(
    () => ({ longitude: hub.lng, latitude: hub.lat, zoom: 11 }),
    [hub]
  );

  async function ensureCoords() {
    // Geocode only missing coords
    const out: Array<{ id: string; tracking: string; address: string; lng: number; lat: number }> = [];
    for (const s of selectedShipments) {
      const id = getId(s);
      const tracking = getTracking(s);
      const address = getAddress(s);
      if (!address) continue;

      const ll = getLatLng(s);
      if (ll) {
        out.push({ id, tracking, address, ...ll });
        continue;
      }

      const g = await geocodeAddress(address, { country: "MM", proximity: hub });
      if (g.ok && g.found) {
        out.push({ id, tracking, address, lng: g.lng, lat: g.lat });
        // Persisting geocode back to DB is strongly recommended:
        // update shipment row with delivery_lng/delivery_lat to avoid re-geocoding.
      }
    }
    return out;
  }

  async function generatePlan() {
    if (planning) return;
    setPlanning(true);
    try {
      if (selectedShipments.length === 0) return;

      const stops = await ensureCoords();

      // Optimization API limit: 2..12 coordinates total. :contentReference[oaicite:11]{index=11}
      // We include hub + stops. For roundtrip: hub + stops (hub implied as end).
      // For non-roundtrip (fixed end): hub + stops + end (we’ll set end as hub to keep it valid & useful).
      const coords: OptimizeCoord[] = [];

      coords.push({ id: "hub_start", lng: hub.lng, lat: hub.lat, label: "Hub" });

      for (const s of stops) coords.push({ id: s.id, lng: s.lng, lat: s.lat, label: s.tracking });

      if (!roundtrip) {
        // fixed end required (destination=last) when roundtrip=false :contentReference[oaicite:12]{index=12}
        coords.push({ id: "hub_end", lng: hub.lng, lat: hub.lat, label: "Hub (end)" });
      }

      if (coords.length < 2 || coords.length > 12) {
        throw new Error(
          `Too many stops for one plan (got ${coords.length} points including hub). Split into multiple ways (max 12 points).`
        );
      }

      const r = await optimizeTrip({ coords, roundtrip, profile: "mapbox/driving" });
      if (!r.ok) throw new Error("Optimization failed");

      // Order includes hub points too. Build ordered stops list (exclude hub markers for the list).
      const ordered = r.order.map((i) => coords[i]).filter((c) => c.id !== "hub_start" && c.id !== "hub_end");

      const orderedStops = ordered
        .map((c) => {
          const match = stops.find((s) => s.id === c.id);
          if (!match) return null;
          return { ...match };
        })
        .filter(Boolean) as Array<{ id: string; tracking: string; address: string; lng: number; lat: number }>;

      setRoute({
        geometry: r.geometry,
        orderedStops,
        distance_m: r.distance_m,
        duration_s: r.duration_s,
      });
    } finally {
      setPlanning(false);
    }
  }

  const routeGeoJson = useMemo(() => {
    if (!route) return null;
    return {
      type: "FeatureCollection" as const,
      features: [{ type: "Feature" as const, properties: {}, geometry: route.geometry }],
    };
  }, [route]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-6 py-4 border-b bg-white">
        <div className="text-lg font-semibold">Way Planning</div>
        <div className="text-sm text-slate-600">Select deliveries → optimize → save a way plan</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 p-4">
        {/* Left panel */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="font-semibold">Deliveries</div>
            <div className="text-xs text-slate-500">{isLoading ? "Loading…" : `${shipments.length} total`}</div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={roundtrip}
                onChange={(e) => setRoundtrip(e.target.checked)}
              />
              Roundtrip (return to hub)
            </label>

            <button
              className="ml-auto text-sm px-3 py-1.5 rounded-md border hover:bg-slate-50"
              onClick={() => {
                navigator.geolocation?.getCurrentPosition(
                  (pos) => setHub({ lng: pos.coords.longitude, lat: pos.coords.latitude }),
                  () => undefined,
                  { enableHighAccuracy: true, timeout: 6000 }
                );
              }}
            >
              Use my location as hub
            </button>
          </div>

          <div className="mt-3">
            <button
              className="w-full bg-[#0d2c54] text-white px-3 py-2 rounded-md disabled:opacity-60"
              onClick={generatePlan}
              disabled={planning || selectedShipments.length === 0}
            >
              {planning ? "Planning…" : "Generate Way Plan"}
            </button>
          </div>

          {route && (
            <div className="mt-3 rounded-lg border p-3 bg-slate-50">
              <div className="text-sm font-semibold">Summary</div>
              <div className="text-sm text-slate-700 mt-1">
                Distance: {fmtDistance(route.distance_m)} • Duration: {fmtDuration(route.duration_s)}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Tip: persist this stop order + route geometry as a “Way” in your DB.
              </div>
            </div>
          )}

          <div className="mt-4 max-h-[60vh] overflow-auto">
            {shipments.map((s) => {
              const id = getId(s);
              const address = getAddress(s);
              if (!address) return null;
              return (
                <label key={id} className="flex items-start gap-3 py-2 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={Boolean(selected[id])}
                    onChange={(e) => setSelected((prev) => ({ ...prev, [id]: e.target.checked }))}
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{getTracking(s)}</div>
                    <div className="text-xs text-slate-600 line-clamp-2">{address}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="top-right" />

            {/* Hub marker */}
            <Marker longitude={hub.lng} latitude={hub.lat} anchor="bottom">
              <div className="px-2 py-1 rounded-full bg-black text-white text-xs shadow">Hub</div>
            </Marker>

            {/* Route line */}
            {routeGeoJson && (
              <Source id="wayplan-route" type="geojson" data={routeGeoJson}>
                <Layer
                  id="wayplan-route-line"
                  type="line"
                  layout={{ "line-join": "round", "line-cap": "round" }}
                  paint={{ "line-width": 5, "line-opacity": 0.9, "line-color": "#0d2c54" }}
                />
              </Source>
            )}

            {/* Stops */}
            {(route?.orderedStops ?? stopsWithCoords).map((s, idx) => {
              const n = route ? idx + 1 : undefined;
              return (
                <Marker
                  key={s.id}
                  longitude={s.lng}
                  latitude={s.lat}
                  anchor="center"
                  onClick={(ev) => {
                    ev.originalEvent.stopPropagation();
                    const found = shipments.find((x) => getId(x) === s.id) ?? null;
                    setHovered(found);
                  }}
                >
                  <div className="h-7 w-7 rounded-full bg-[#ff6b00] text-white text-xs font-bold flex items-center justify-center shadow ring-2 ring-white">
                    {n ?? "•"}
                  </div>
                </Marker>
              );
            })}

            {hovered && (
              <Popup
                longitude={(getLatLng(hovered)?.lng ?? hub.lng) as number}
                latitude={(getLatLng(hovered)?.lat ?? hub.lat) as number}
                anchor="top"
                closeOnClick={false}
                onClose={() => setHovered(null)}
              >
                <div className="text-sm">
                  <div className="font-semibold">{getTracking(hovered)}</div>
                  <div className="text-slate-600">{getAddress(hovered)}</div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}