import React, { useMemo, useState } from "react";
import Map, { Layer, Marker, NavigationControl, Popup, Source, type ViewState } from "react-map-gl";
import { geocodeAddress, optimizeTrip, type OptimizeCoord, type LngLat } from "@/lib/mapboxWayPlan";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { useLanguageContext } from "@/lib/LanguageContext"; // Added for Bilingual support

type ShipmentLike = Record<string, unknown>;

// Helper functions kept for logic...
function getId(s: ShipmentLike): string { return String(s.id ?? crypto.randomUUID()); }
function getTracking(s: ShipmentLike): string { return String(s.tracking_number ?? s.awb ?? ""); }
function getAddress(s: ShipmentLike): string { return String(s.delivery_address || "").trim(); }
function getLatLng(s: ShipmentLike): LngLat | null {
  const lng = Number(s.delivery_lng);
  const lat = Number(s.delivery_lat);
  return (Number.isFinite(lng) && Number.isFinite(lat)) ? { lng, lat } : null;
}

export default function WayPlanningPage() {
  const { t } = useLanguageContext(); // Initialize Bilingual Engine
  const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string;

  const { data: shipmentsRaw = [], isLoading } = useEnterpriseShipments();
  const shipments = shipmentsRaw as ShipmentLike[];

  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [roundtrip, setRoundtrip] = useState(true);
  const [hub, setHub] = useState<LngLat>({ lng: 96.158, lat: 16.84 });
  const [hovered, setHovered] = useState<ShipmentLike | null>(null);
  const [planning, setPlanning] = useState(false);
  const [route, setRoute] = useState<any>(null);

  const selectedShipments = useMemo(() => shipments.filter((s) => selected[getId(s)]), [shipments, selected]);

  const generatePlan = async () => {
    if (planning || selectedShipments.length === 0) return;
    setPlanning(true);
    // Logic for ensureCoords and optimizeTrip...
    setPlanning(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="px-6 py-4 border-b bg-white flex justify-between items-center">
        <div>
          <div className="text-lg font-bold text-[#0d2c54] uppercase italic">
            {t('Way Planning', 'လမ်းကြောင်းစီစဉ်ခြင်း')}
          </div>
          <div className="text-xs text-slate-500">
            {t('Select deliveries → optimize → save a way plan', 'ပို့ဆောင်မှုများရွေးချယ်ပါ → အကောင်းဆုံးလမ်းကြောင်းရှာပါ → သိမ်းဆည်းပါ')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 p-4">
        {/* Left Control Panel */}
        <div className="bg-white border rounded-xl p-4 flex flex-col h-[calc(100vh-140px)]">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-[#0d2c54]">{t('Deliveries', 'ပို့ဆောင်ရန်များ')}</div>
            <div className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500">
              {isLoading ? t('Loading...', 'ခဏစောင့်ပါ...') : `${shipments.length} ${t('total', 'စုစုပေါင်း')}`}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <label className="text-sm flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-[#ff6b00] focus:ring-[#ff6b00]"
                checked={roundtrip}
                onChange={(e) => setRoundtrip(e.target.checked)}
              />
              {t('Roundtrip (return to hub)', 'အသွားအပြန် (ဂိတ်သို့ပြန်လာမည်)')}
            </label>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold uppercase"
              onClick={() => {
                navigator.geolocation?.getCurrentPosition((pos) => setHub({ lng: pos.coords.longitude, lat: pos.coords.latitude }));
              }}
            >
              {t('Use my location as hub', 'လက်ရှိနေရာကို ဂိတ်အဖြစ်သုံးမည်')}
            </Button>

            <Button
              className="w-full bg-[#0d2c54] hover:bg-[#1a3d6d] text-white font-bold uppercase py-5"
              onClick={generatePlan}
              disabled={planning || selectedShipments.length === 0}
            >
              {planning ? t('Planning...', 'တွက်ချက်နေသည်...') : t('Generate Way Plan', 'လမ်းကြောင်းပုံစံထုတ်မည်')}
            </Button>
          </div>

          {/* Summary info if route exists */}
          {route && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-[#0d2c54]">
              <div className="font-bold">{t('Route Summary', 'လမ်းကြောင်းအနှစ်ချုပ်')}</div>
              <div className="flex justify-between mt-1">
                <span>{t('Distance', 'အကွာအဝေး')}: {(route.distance_m / 1000).toFixed(1)} km</span>
                <span>{t('Duration', 'ကြာချိန်')}: {Math.round(route.duration_s / 60)} min</span>
              </div>
            </div>
          )}

          {/* List of Shipments */}
          <ScrollArea className="flex-1 border-t pt-2">
            <div className="space-y-1">
              {shipments.map((s) => {
                const id = getId(s);
                return (
                  <label key={id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 border-b border-slate-50 last:border-0 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-slate-300 text-[#ff6b00] focus:ring-[#ff6b00]"
                      checked={Boolean(selected[id])}
                      onChange={(e) => setSelected((prev) => ({ ...prev, [id]: e.target.checked }))}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-[#0d2c54]">{getTracking(s)}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 italic">{getAddress(s)}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Map Area */}
        <div className="bg-slate-200 border rounded-xl overflow-hidden relative shadow-inner">
          <Map
            mapboxAccessToken={mapboxToken}
            initialViewState={{ longitude: hub.lng, latitude: hub.lat, zoom: 11 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="top-right" />
            
            {/* Hub marker */}
            <Marker longitude={hub.lng} latitude={hub.lat} anchor="bottom">
              <div className="px-3 py-1 rounded-full bg-[#0d2c54] text-white text-[10px] font-black uppercase shadow-lg border-2 border-white ring-2 ring-[#0d2c54]/20">
                {t('Hub', 'ဂိတ်')}
              </div>
            </Marker>

            {/* Other markers and popups follow the same pattern... */}
          </Map>
        </div>
      </div>
    </div>
  );
}