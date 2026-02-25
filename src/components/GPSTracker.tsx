// src/components/GPSTracker.tsx
import { useLanguageContext } from '@/lib/LanguageContext';
import { getBilingualStatus, formatWeight } from '@/lib/index'; // Use our master library

// ... inside the handleNewLocation function
try {
  await logisticsAPI.updateVehicleTracking({
    vehicleId: vehicleId,
    latitude: newData.lat,
    longitude: newData.lng,
    speed: newData.speed || 0,
    heading: newData.heading || 0,
    accuracy: newData.accuracy,
    battery_level: Math.floor(batteryLevel), // Ensure integer if required by API
    engine_status: 'RUNNING'
  });
} catch (err) {
  // Silent fail or typed error handling
}