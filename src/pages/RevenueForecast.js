import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, } from 'recharts';
const data = [
    { day: 'Mon', revenue: 4200 },
    { day: 'Tue', revenue: 5100 },
    { day: 'Wed', revenue: 4800 },
    { day: 'Thu', revenue: 6200 },
    { day: 'Fri', revenue: 7800 },
    { day: 'Sat', revenue: 8400 },
    { day: 'Sun', revenue: 9100 },
];
export default function RevenueForecast() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
    return (_jsxs("div", { className: "bg-navy-800/60 border border-gold-500/20 rounded-2xl p-6 h-full", children: [_jsx("h3", { className: "font-bold mb-4", children: "Weekly Revenue Forecast" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: data, children: [_jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#facc15", fill: "#facc15", fillOpacity: 0.3 })] }) })] }));
}
