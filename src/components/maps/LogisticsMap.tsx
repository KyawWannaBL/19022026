import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  Source,
  Layer,
  type MapRef,
  type ViewState,
  type MapLayerMouseEvent,
} from "react-map-gl";

export type VehicleStatus = "IDLE" | "PICKING_UP" | "IN_TRANSIT" | "DELIVERING" | "OFFLINE";

export type VehiclePoint = {
  id: string;
  label?: string;
  status: VehicleStatus;
  lng: number;
  lat: number;
  headingDeg?: number;
  updatedAt?: string;
};

export type HubPoint = {
  id: string;
  name: string;
  lng: number;
  lat: number;
};

export type RouteLine = {
  id: string;
  name?: string;
  coordinates: Array<[number, number]>; // [lng, lat]
};

type Props = {
  vehicles: VehiclePoint[];
  hubs?: HubPoint[];
  selectedRoute?: RouteLine | null;
  initialViewState?: Partial<ViewState>;
  onVehicleClick?: (vehicle: VehiclePoint) => void;
  className?: string;
};

function envToken(): string {
  const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
  if (!token) throw new Error("Missing VITE_MAPBOX_TOKEN. Add it to .env and Vercel env vars.");
  return token;
}

function boundsFromPoints(points: Array<{ lng: number; lat: number }>) {
  let minLng = Infinity,
    minLat = Infinity,
    maxLng = -Infinity,
    maxLat = -Infinity;

  for (const p of points) {
    if (!Number.isFinite(p.lng) || !Number.isFinite(p.lat)) continue;
    minLng = Math.min(minLng, p.lng);
    minLat = Math.min(minLat, p.lat);
    maxLng = Math.max(maxLng, p.lng);
    maxLat = Math.max(maxLat, p.lat);
  }

  if (!Number.isFinite(minLng)) return null;
  return { minLng, minLat, maxLng, maxLat };
}

function statusClass(status: VehicleStatus): string {
  switch (status) {
    case "IN_TRANSIT":
      return "bg-blue-600";
    case "DELIVERING":
      return "bg-green-600";
    case "PICKING_UP":
      return "bg-amber-500";
    case "IDLE":
      return "bg-slate-600";
    case "OFFLINE":
      return "bg-red-600";
    default:
      return "bg-slate-600";
  }
}

export default function LogisticsMap({
  vehicles,
  hubs = [],
  selectedRoute = null,
  initialViewState,
  onVehicleClick,
  className,
}: Props) {
  const mapRef = useRef<MapRef | null>(null);

  const [hovered, setHovered] = useState<VehiclePoint | null>(null);

  const viewState = useMemo<Partial<ViewState>>(
    () => ({
      longitude: 96.158, // Yangon-ish default; override via props
      latitude: 16.84,
      zoom: 11,
      ...initialViewState,
    }),
    [initialViewState]
  );

  const routeGeoJson = useMemo(() => {
    if (!selectedRoute) return null;
    return {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: { id: selectedRoute.id, name: selectedRoute.name ?? "" },
          geometry: {
            type: "LineString" as const,
            coordinates: selectedRoute.coordinates,
          },
        },
      ],
    };
  }, [selectedRoute]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const b = boundsFromPoints(vehicles);
    if (!b) return;

    // Fit bounds when vehicle set changes (keeps ops view “always on target”)
    map.fitBounds(
      [
        [b.minLng, b.minLat],
        [b.maxLng, b.maxLat],
      ],
      { padding: 60, duration: 600 }
    );
  }, [vehicles]);

  const onMapMouseMove = (e: MapLayerMouseEvent) => {
    // noop: placeholder if you later add interactive layers
    void e;
  };

  return (
    <div className={className ?? "w-full h-[calc(100vh-120px)] rounded-xl overflow-hidden border bg-white"}>
      <Map
        ref={(r) => {
          mapRef.current = r;
        }}
        mapboxAccessToken={envToken()}
        initialViewState={viewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMouseMove={onMapMouseMove}
        attributionControl
      >
        <NavigationControl position="top-right" />

        {/* Hubs */}
        {hubs.map((hub) => (
          <Marker key={hub.id} longitude={hub.lng} latitude={hub.lat} anchor="bottom">
            <div className="rounded-full bg-black text-white text-[10px] px-2 py-1 shadow">
              {hub.name}
            </div>
          </Marker>
        ))}

        {/* Vehicles */}
        {vehicles.map((v) => (
          <Marker
            key={v.id}
            longitude={v.lng}
            latitude={v.lat}
            anchor="center"
            onClick={(ev) => {
              ev.originalEvent.stopPropagation();
              onVehicleClick?.(v);
              setHovered(v);
            }}
          >
            <div
              className={[
                "h-4 w-4 rounded-full shadow ring-2 ring-white cursor-pointer",
                statusClass(v.status),
              ].join(" ")}
              title={v.label ?? v.id}
            />
          </Marker>
        ))}

        {/* Selected route line */}
        {routeGeoJson && (
          <Source id="selected-route" type="geojson" data={routeGeoJson}>
            <Layer
              id="selected-route-line"
              type="line"
              paint={{
                "line-width": 4,
                "line-opacity": 0.9,
              }}
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
            />
          </Source>
        )}

        {/* Vehicle popup */}
        {hovered && (
          <Popup
            longitude={hovered.lng}
            latitude={hovered.lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => setHovered(null)}
          >
            <div className="text-sm">
              <div className="font-semibold">{hovered.label ?? hovered.id}</div>
              <div className="text-slate-600">Status: {hovered.status}</div>
              {hovered.updatedAt && <div className="text-slate-500">Updated: {hovered.updatedAt}</div>}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
