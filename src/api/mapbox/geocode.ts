import type { VercelRequest, VercelResponse } from "@vercel/node";

type GeocodeRequest = {
  q: string;
  country?: string; // e.g. "MM"
  proximity?: { lng: number; lat: number }; // bias results
  limit?: number; // default 1
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.MAPBOX_SECRET_TOKEN;
  if (!token) return res.status(500).json({ error: "Missing MAPBOX_SECRET_TOKEN" });

  const body = (req.body ?? {}) as GeocodeRequest;
  const q = String(body.q ?? "").trim();
  if (!q) return res.status(400).json({ error: "q is required" });

  const limit = Number.isFinite(body.limit) ? Math.max(1, Math.min(10, Number(body.limit))) : 1;
  const country = (body.country ?? "MM").trim();

  const params = new URLSearchParams({
    q,
    access_token: token,
    limit: String(limit),
    country,
  });

  if (body.proximity && Number.isFinite(body.proximity.lng) && Number.isFinite(body.proximity.lat)) {
    params.set("proximity", `${body.proximity.lng},${body.proximity.lat}`);
  }

  // Geocoding v6 forward endpoint example is documented by Mapbox. :contentReference[oaicite:7]{index=7}
  const url = `https://api.mapbox.com/search/geocode/v6/forward?${params.toString()}`;

  const r = await fetch(url);
  const json = await r.json();

  if (!r.ok) return res.status(r.status).json({ error: "Mapbox error", details: json });

  const feature = json?.features?.[0];
  const coords = feature?.geometry?.coordinates;

  if (!Array.isArray(coords) || coords.length < 2) {
    return res.status(200).json({ ok: true, found: false });
  }

  const [lng, lat] = coords as [number, number];

  return res.status(200).json({
    ok: true,
    found: true,
    lng,
    lat,
    place_name: feature?.properties?.full_address ?? feature?.properties?.name ?? feature?.place_name ?? "",
    raw: feature,
  });
}