import React, { useState, useEffect } from "react";
  CheckCircle, RefreshCw, Eye, Map, Activity, Shield, Zap
} from 'lucide-react';
import { useLanguageContext } from '@/lib/LanguageContext';
import { GPSTracker } from '@/components/GPSTracker';
import { advancedFeaturesAPI } from '@/services/advanced-features-api';

// Defined Interfaces for 2026 Telemetry Standards
interface GPSDevice {
  id: string;
  device_id: string;
  device_type: 'VEHICLE' | 'RIDER' | 'MOBILE';
  assigned_to: string;
  status: 'ONLINE' | 'OFFLINE' | 'INACTIVE';
  last_location: {
    lat: number;
    lng: number;
    accuracy: number;
    timestamp: string;
    address?: string;
  };
  battery_level?: number;
  signal_strength?: number;
  speed?: number;
}

interface GeofenceZone {
  id: string;
  name: string;
  type: string;
  coordinates: { lat: number; lng: number; radius: number };
  status: 'ACTIVE' | 'INACTIVE';
  entry_alerts: boolean;
  exit_alerts: boolean;
}

interface GeofenceAlert {
  id: string;
  device_id: string;
  alert_type: 'ENTRY' | 'EXIT' | 'VIOLATION';
  timestamp: string;
  acknowledged: boolean;
  acknowledged_by?: string;
}

export default function GPSTrackingDashboard() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t, language } = useLanguageContext(); // Resolved missing context errors
  const [activeTab, setActiveTab] = useState<'LIVE' | 'DEVICES' | 'GEOFENCES' | 'ALERTS'>('LIVE');
  const [devices, setDevices] = useState<GPSDevice[]>([]);
  const [geofences, setGeofences] = useState<GeofenceZone[]>([]);
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGPSData();
    const interval = setInterval(loadGPSData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadGPSData = async () => {
    try {
      setLoading(true);
      const [devRes, geoRes, alrRes] = await Promise.all([
        advancedFeaturesAPI.getGPSDevices(),
        advancedFeaturesAPI.getGeofences(),
        advancedFeaturesAPI.getGeofenceAlerts()
      ]);

      if (devRes.success) setDevices(devRes.data || []);
      if (geoRes.success) setGeofences(geoRes.data || []);
      if (alrRes.success) setAlerts(alrRes.data || []);
    } catch (error) {
      console.error('Telemetry Sync Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeAlert = async (alertId: string) => {
    try {
      await advancedFeaturesAPI.acknowledgeAlert(alertId, 'System_Admin');
      loadGPSData();
      toast.success(t('Alert acknowledged', 'သတိပေးချက်ကို အသိအမှတ်ပြုပြီးပါပြီ'));
    } catch (error) {
      console.error(error);
    }
  };

  const renderLiveTracking = () => (
    <div className="space-y-6">
      <Card className="luxury-card border-white/10 overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" /> {t('Live Tracking Map', 'တိုက်ရိုက်ခြေရာခံမြေပုံ')}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center bg-slate-50 relative">
          <div className="text-center opacity-40">
            <Navigation className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <p>{t('Initializing Satellite Uplink...', 'ဂြိုဟ်တုစနစ် ချိတ်ဆက်နေပါသည်...')}</p>
          </div>
          {/* Real-time markers would be mapped here */}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-emerald-500">{devices.filter(d => d.status === 'ONLINE').length}</p>
          <p className="text-xs text-muted-foreground uppercase">{t('Online', 'အွန်လိုင်း')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-rose-500">{devices.filter(d => d.status === 'OFFLINE').length}</p>
          <p className="text-xs text-muted-foreground uppercase">{t('Offline', 'အော့ဖ်လိုင်း')}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{alerts.filter(a => !a.acknowledged).length}</p>
          <p className="text-xs text-muted-foreground uppercase">{t('Alerts', 'သတိပေးချက်များ')}</p>
        </Card>
        <Card className="p-4 text-center">
           <p className="text-2xl font-bold text-primary">100%</p>
           <p className="text-xs text-muted-foreground uppercase">{t('System Health', 'စနစ်ကျန်းမာမှု')}</p>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary font-heading">
            {t('GPS Tracking Dashboard', 'GPS ခြေရာခံစနစ် ထိန်းချုပ်ခန်း')}
          </h1>
          <p className="text-muted-foreground">{t('Real-time fleet telemetry and geofence monitoring.', 'ယာဉ်အုပ်စုများကို အချိန်နှင့်တပြေးညီ စောင့်ကြည့်စစ်ဆေးခြင်း။')}</p>
        </div>
        <Button variant="outline" onClick={loadGPSData} disabled={loading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> {t('Sync Telemetry', 'ဒေတာရယူမည်')}
        </Button>
      </div>

      <div className="flex bg-muted/50 p-1 rounded-xl w-fit border">
        {[
          { id: 'LIVE', icon: Activity, label: t('Live View', 'တိုက်ရိုက်ကြည့်ရှုခြင်း') },
          { id: 'DEVICES', icon: MapPin, label: t('Devices', 'ကိရိယာများ') },
          { id: 'GEOFENCES', icon: Shield, label: t('Geofences', 'ဂျီယိုဖန်စ်') },
          { id: 'ALERTS', icon: AlertTriangle, label: t('Alerts', 'သတိပေးချက်') }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id as any)}
            className="rounded-lg gap-2"
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </Button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'LIVE' && renderLiveTracking()}
        {activeTab === 'DEVICES' && (
          <div className="grid gap-4">
             {devices.map(device => (
               <Card key={device.id} className="p-4 flex items-center justify-between hover:border-primary transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${device.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100'}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">{device.device_id}</p>
                      <p className="text-xs text-muted-foreground">{device.assigned_to} • {device.speed || 0} km/h</p>
                    </div>
                  </div>
                  <Badge variant={device.status === 'ONLINE' ? 'default' : 'secondary'}>{t(device.status, device.status)}</Badge>
               </Card>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
