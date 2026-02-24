import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
export default function RealTimeMapView() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from('orders')
                .select('id, latitude, longitude, status');
            if (data)
                setOrders(data);
        };
        load();
        const channel = supabase
            .channel('orders-live')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, load)
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
    return (_jsx("div", { className: "h-[500px] rounded-xl overflow-hidden border", children: _jsxs(MapContainer, { center: [16.8661, 96.1561], zoom: 11, className: "h-full w-full", children: [_jsx(TileLayer, { attribution: "\u00A9 OpenStreetMap contributors", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), orders.map((o) => (_jsx(Marker, { position: [o.latitude, o.longitude], children: _jsxs(Popup, { children: [_jsx("strong", { children: "Status:" }), " ", o.status] }) }, o.id)))] }) }));
}
