  // If true: roundtrip=true (returns to start)
  // If false: requires source=first & destinationTownship=last (fixed start & fixed end). :contentReference[oaicite:9]{index=9}
  roundtrip: boolean;
  steps?: boolean;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.MAPBOX_SECRET_TOKEN;
  if (!token) return res.status(500).json({ error: "Missing MAPBOX_SECRET_TOKEN" });

  const body = (req.body ?? {}) as OptimizeRequest;

  const profile = body.profile ?? "mapbox/driving";
  const coords = Array.isArray(body.coords) ? body.coords : [];
  const roundtrip = Boolean(body.roundtrip);
  const steps = Boolean(body.steps);

  if (coords.length < 2 || coords.length > 12) {
    return res.status(400).json({
      error: "coords must be between 2 and 12 points (inclusive)",
      got: coords.length,
    });
  }

  for (const c of coords) {
    if (!Number.isFinite(c.lng) || !Number.isFinite(c.lat)) {
      return res.status(400).json({ error: "Invalid lng/lat in coords", coord: c });
    }
  }

  const coordStr = coords.map((c) => `${c.lng},${c.lat}`).join(";");

  const params = new URLSearchParams({
    access_token: token,
    geometries: "geojson",
    overview: "full",
    annotations: "duration,distance",
    steps: steps ? "true" : "false",
  });

  if (roundtrip) {
    params.set("roundtrip", "true");
    params.set("source", "first");
    // destinationTownship can be any/last; leave default "any" for flexibility.
  } else {
    // Only supported non-roundtrip combo (fixed start & fixed end). :contentReference[oaicite:10]{index=10}
    params.set("roundtrip", "false");
    params.set("source", "first");
    params.set("destinationTownship", "last");
  }

  const url = `https://api.mapbox.com/optimized-trips/v1/${profile}/${coordStr}?${params.toString()}`;

  const r = await fetch(url);
  const json = await r.json();

  if (!r.ok) return res.status(r.status).json({ error: "Mapbox error", details: json });

  const trip = json?.trips?.[0];
  if (!trip) return res.status(200).json({ ok: false, code: json?.code ?? "NoTrip", raw: json });

  // Mapbox returns waypoints in input order, with waypoint_index indicating position in the trip.
  const waypoints = (json?.waypoints ?? []) as Array<{
    waypoint_index: number;
    trips_index: number;
    location: [number, number];
    name: string;
  }>;

  const order = waypoints
    .map((w, inputIndex) => ({ inputIndex, waypoint_index: w.waypoint_index }))
    .sort((a, b) => a.waypoint_index - b.waypoint_index)
    .map((x) => x.inputIndex);

  return res.status(200).json({
    ok: true,
    distance_m: trip.distance,
    duration_s: trip.duration,
    geometry: trip.geometry, // GeoJSON LineString
    order, // indices into input coords in visiting order (includes start/end as applicable)
    raw: json,
  });
}