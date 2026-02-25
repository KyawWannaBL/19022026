  | { ok: true; found: false }
  | { ok: false; error: string };

export async function geocodeAddress(q: string, opts?: { country?: string; proximity?: LngLat }) {
  const r = await fetch("/api/mapbox/geocode", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ q, country: opts?.country, proximity: opts?.proximity, limit: 1 }),
  });
  return (await r.json()) as GeocodeResult;
}

export type OptimizeCoord = { id: string; lng: number; lat: number; label?: string };

export type OptimizeResponse =
  | {
      ok: true;
      distance_m: number;
      duration_s: number;
      geometry: { type: "LineString"; coordinates: Array<[number, number]> };
      order: number[];
    }
  | { ok: false; error?: string; code?: string; details?: unknown };

export async function optimizeTrip(input: {
  coords: OptimizeCoord[];
  roundtrip: boolean;
  profile?: "mapbox/driving" | "mapbox/driving-traffic" | "mapbox/cycling" | "mapbox/walking";
}) {
  const r = await fetch("/api/mapbox/optimize", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return (await r.json()) as OptimizeResponse;
}