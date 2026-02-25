  Marker,
  NavigationControl,
  Popup,
  Source,
  Layer,
  type MapRef,
  type ViewState,
} from "react-map-gl";
import { useLanguageContext } from "@/lib/LanguageContext";
import { getBilingualStatus } from "@/lib/index";
import { cn } from "@/lib/utils";

// Standardized Types for 2026 Fleet Operations
export type VehicleStatus = "IDLE" | "PICKING_UP" | "IN_TRANSIT" | "DELIVERING" | "OFFLINE" | "MAINTENANCE";

export type VehiclePoint = {
  id: string;
  label?: string;
  status: VehicleStatus;
  lng: number;
  lat: number;
  updatedAt?: string;
};

export type HubPoint = {
  id: string;
  name: string;
  lng: number;
  lat: number;
};

type Props = {
  vehicles: VehiclePoint[];
  hubs?: HubPoint[];
  className?: string;
};

function envToken(): string {
  const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;
  if (!token) throw new Error("Missing VITE_MAPBOX_TOKEN.");
  return token;
}

export default function LogisticsMap({ vehicles, hubs = [], className }: Props) {
  const mapRef = useRef<MapRef | null>(null);
  const { t } = useLanguageContext();
  const [hovered, setHovered] = useState<VehiclePoint | null>(null);

  // Auto-fit map to show all active vehicles
  useEffect(() => {
    if (!mapRef.current || vehicles.length === 0) return;
    
    const lats = vehicles.map(v => v.lat);
    const lngs = vehicles.map(v => v.lng);
    
    mapRef.current.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 80, duration: 1000 }
    );
  }, [vehicles]);

  return (
    <div className={cn("w-full h-full rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50", className)}>
      <Map
        ref={mapRef}
        mapboxAccessToken={envToken()}
        initialViewState={{ longitude: 96.158, latitude: 16.84, zoom: 11 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl position="top-right" />

        {/* Logistic Hubs / ဂိုဒေါင်များ */}
        {hubs.map((hub) => (
          <Marker key={hub.id} longitude={hub.lng} latitude={hub.lat} anchor="bottom">
            <div className="flex flex-col items-center group">
              <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                {hub.name}
              </div>
              <div className="w-4 h-4 bg-primary border-2 border-white rounded-sm rotate-45 shadow-md" />
            </div>
          </Marker>
        ))}

        {/* Fleet Vehicles / ယာဉ်များ */}
        {vehicles.map((v) => (
          <Marker
            key={v.id}
            longitude={v.lng}
            latitude={v.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setHovered(v);
            }}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full shadow-xl ring-2 ring-white cursor-pointer transition-all hover:scale-125",
                v.status === "OFFLINE" ? "bg-rose-500" : 
                v.status === "MAINTENANCE" ? "bg-amber-500" : "bg-emerald-500"
              )}
            />
          </Marker>
        ))}

        {/* Vehicle Telemetry Display / ယာဉ်အချက်အလက်ပြသခြင်း */}
        {hovered && (
          <Popup
            longitude={hovered.lng}
            latitude={hovered.lat}
            anchor="top"
            onClose={() => setHovered(null)}
            closeButton={false}
            className="z-50"
          >
            <div className="p-2 min-w-[160px] bg-white rounded-lg shadow-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                  {t('Vehicle Info', 'ယာဉ်အချက်အလက်ပြသခြင်း')}
                </span>
                <div className={cn("w-2 h-2 rounded-full animate-pulse", 
                  hovered.status === "OFFLINE" ? "bg-rose-500" : "bg-emerald-500")} 
                />
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">{hovered.label || hovered.id}</p>
                <p className="text-xs font-medium text-slate-500">
                  {t('Status', 'အခြေအနေ')}: {t(hovered.status, hovered.status)}
                </p>
              </div>

              {hovered.updatedAt && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                   <span>{t('Last Sync', 'နောက်ဆုံးအပ်ဒိတ်')}</span>
                   <span className="font-mono font-bold">{new Date(hovered.updatedAt).toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}