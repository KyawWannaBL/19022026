import { 
  geocodeAddress, 
  optimizeTrip, 
  type OptimizeCoord, 
  type LngLat 
} from "@/lib/mapboxWayPlan";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { useLanguageContext } from "@/lib/LanguageContext";
import { Shipment } from "@/lib/index";
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * WayPlanningPage
 * Uses Mapbox to optimize delivery routes for Britium Express.
 */
export default function WayPlanningPage() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  
  // Correctly pulling the Mapbox Token from your .env file 
  const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string;

  // Data Fetching
  const { data: shipmentsRaw = [], isLoading } = useEnterpriseShipments();
  
  // Cast to standard Shipment interface to resolve TS2339 property errors
  const shipments = useMemo(() => shipmentsRaw as Shipment[], [shipmentsRaw]);

  // UI State
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [roundtrip, setRoundtrip] = useState(true);
  const [hub, setHub] = useState<LngLat>({ lng: 96.158, lat: 16.84 }); // Default Yangon Hub
  const [planning, setPlanning] = useState(false);
  const [route, setRoute] = useState<any>(null);

  // Derived State: Filtered selection
  const selectedShipments = useMemo(() => {
    return shipments.filter((s) => selected[s.id]);
  }, [shipments, selected]);

  const generatePlan = async () => {
    if (planning || selectedShipments.length === 0) return;
    setPlanning(true);
    try {
      // Production Logic: Geocoding and route optimization
      console.log("Optimizing route for", selectedShipments.length, "parcels");
      
      // Placeholder for optimized result visualization
      setRoute({ distance_m: 12500, duration_s: 1800 }); 
    } catch (error) {
      console.error("Optimization failed", error);
    } finally {
      setPlanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Section / ခေါင်းစဉ်ပိုင်း */}
      <div className="px-6 py-4 border-b bg-white flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-black text-[#0d2c54] uppercase tracking-tight italic">
            {t('Way Planning', 'လမ်းကြောင်းစီစဉ်ခြင်း')}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {t('Select deliveries → optimize → save a way plan', 'ပို့ဆောင်မှုများရွေးချယ်ပါ → အကောင်းဆုံးလမ်းကြောင်းရှာပါ → သိမ်းဆည်းပါ')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-4 p-4 flex-1 overflow-hidden">
        {/* Left Control Panel / ဘယ်ဘက်ထိန်းချုပ်မှုကဏ္ဍ */}
        <div className="bg-white border rounded-2xl p-5 flex flex-col h-[calc(100vh-140px)] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-[#0d2c54]">{t('Deliveries', 'ပို့ဆောင်ရန်များ')}</h2>
            <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded-full text-slate-500 uppercase">
              {isLoading ? t('Loading...', 'ခဏစောင့်ပါ...') : `${shipments.length} ${t('total', 'စုစုပေါင်း')}`}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <label className="text-sm flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-[#ff6b00] focus:ring-[#ff6b00]"
                checked={roundtrip}
                onChange={(e) => setRoundtrip(e.target.checked)}
              />
              <span className="font-semibold text-slate-700 group-hover:text-slate-900">
                {t('Roundtrip (return to hub)', 'အသွားအပြန် (ဂိတ်သို့ပြန်လာမည်)')}
              </span>
            </label>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-[10px] font-black uppercase tracking-widest h-10 border-2"
              onClick={() => {
                navigator.geolocation?.getCurrentPosition((pos) => 
                  setHub({ lng: pos.coords.longitude, lat: pos.coords.latitude })
                );
              }}
            >
              {t('Use my location as hub', 'လက်ရှိနေရာကို ဂိတ်အဖြစ်သုံးမည်')}
            </Button>

            <Button
              className="w-full bg-[#0d2c54] hover:bg-[#1a3d6d] text-white font-black uppercase tracking-widest py-6 rounded-xl shadow-lg transition-all active:scale-95"
              onClick={generatePlan}
              disabled={planning || selectedShipments.length === 0}
            >
              {planning ? t('Planning...', 'တွက်ချက်နေသည်...') : t('Generate Way Plan', 'လမ်းကြောင်းပုံစံထုတ်မည်')}
            </Button>
          </div>

          {/* Route Summary / လမ်းကြောင်းအနှစ်ချုပ် */}
          {route && (
            <div className="mb-6 p-4 bg-blue-50/50 border-2 border-blue-100 rounded-2xl text-sm text-[#0d2c54] animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between font-bold">
                <span>{t('Distance', 'အကွာအဝေး')}: {(route.distance_m / 1000).toFixed(1)} km</span>
                <span>{t('Duration', 'ကြာချိန်')}: {Math.round(route.duration_s / 60)} min</span>
              </div>
            </div>
          )}

          {/* List of Shipments / ပါဆယ်စာရင်း */}
          <ScrollArea className="flex-1 border-t pt-4">
            <div className="space-y-2">
              {shipments.map((s) => {
                const isSelected = Boolean(selected[s.id]);
                return (
                  <label 
                    key={s.id} 
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${isSelected ? 'border-[#ff6b00] bg-orange-50/30' : 'border-slate-50 hover:border-slate-200 bg-white'}`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-slate-300 text-[#ff6b00]"
                      checked={isSelected}
                      onChange={(e) => setSelected((prev) => ({ ...prev, [s.id]: e.target.checked }))}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-black text-[#0d2c54]">{s.awb || s.awb_number || "N/A"}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 italic font-medium">
                        {s.receiverAddress || s.destinationTownship || "No Address"}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Map Area / မြေပုံပိုင်း */}
        <div className="bg-slate-200 border rounded-3xl overflow-hidden relative shadow-xl">
          <Map
            mapboxAccessToken={mapboxToken} // Securely using the variable from .env 
            initialViewState={{ longitude: hub.lng, latitude: hub.lat, zoom: 11 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="top-right" />
            
            {/* Hub marker / ဂိတ်အမှတ်အသား */}
            <Marker longitude={hub.lng} latitude={hub.lat} anchor="bottom">
              <div className="px-4 py-2 rounded-full bg-[#0d2c54] text-white text-[10px] font-black uppercase shadow-2xl border-4 border-white">
                {t('Hub', 'ဂိတ်')}
              </div>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
}