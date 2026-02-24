import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function normalizeTracking(value) {
    return value.trim().toLowerCase();
}
function getTrackingNumber(shipment) {
    const s = shipment;
    return s.tracking_number ?? null;
}
export default function Tracking() {
    const { data, isLoading: shipmentsLoading } = useEnterpriseShipments();
    const shipments = (data ?? []);
    const [trackingNumber, setTrackingNumber] = useState("");
    const [result, setResult] = useState({ kind: "idle" });
    const shipmentsByTracking = useMemo(() => {
        const map = new Map();
        for (const s of shipments) {
            const tn = getTrackingNumber(s);
            const key = tn ? normalizeTracking(tn) : "";
            if (key)
                map.set(key, s);
        }
        return map;
    }, [shipments]);
    const handleTrack = (e) => {
        e.preventDefault();
        const query = normalizeTracking(trackingNumber);
        if (!query) {
            setResult({ kind: "invalid", message: "Enter a tracking ID." });
            return;
        }
        const found = shipmentsByTracking.get(query);
        if (found) {
            setResult({ kind: "found", shipment: found });
            return;
        }
        setResult({ kind: "not_found", query });
    };
    return (_jsxs("div", { className: "bg-slate-50 min-h-screen", children: [_jsx("div", { className: "bg-[#0d2c54] py-10 text-center text-white", children: _jsx("h1", { className: "text-2xl font-bold", children: "Track Your Shipment" }) }), _jsxs("div", { className: "max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border", children: [_jsxs("form", { onSubmit: handleTrack, className: "flex gap-2", children: [_jsx(Input, { placeholder: "Tracking ID", value: trackingNumber, onChange: (e) => {
                                    setTrackingNumber(e.target.value);
                                    if (result.kind !== "idle")
                                        setResult({ kind: "idle" });
                                }, autoComplete: "off" }), _jsx(Button, { type: "submit", className: "bg-[#ff6b00] hover:bg-[#e66000] text-white", disabled: shipmentsLoading, children: shipmentsLoading ? _jsx(Loader2, { className: "animate-spin h-4 w-4" }) : "Track" })] }), _jsxs("div", { className: "mt-4", children: [shipmentsLoading && _jsx("p", { className: "text-sm text-slate-600", children: "Loading shipments\u2026" }), result.kind === "invalid" && (_jsx("p", { className: "text-sm text-red-600", children: result.message })), result.kind === "not_found" && (_jsxs("p", { className: "text-sm text-red-600", children: ["No shipment found for ", _jsx("span", { className: "font-semibold", children: result.query }), "."] })), result.kind === "found" && (_jsxs("div", { className: "rounded-lg border p-4 bg-slate-50", children: [_jsx("p", { className: "text-sm font-semibold", children: "Shipment Found" }), _jsxs("p", { className: "text-xs text-slate-700 mt-1", children: ["Tracking: ", getTrackingNumber(result.shipment) ?? "—"] })] }))] })] })] }));
}
