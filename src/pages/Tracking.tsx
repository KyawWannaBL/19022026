import React, { useMemo, useState } from "react";
import { useEnterpriseShipments } from "@/hooks/useEnterpriseShipments";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ShipmentsData = NonNullable<ReturnType<typeof useEnterpriseShipments>["data"]>;
type EnterpriseShipment = ShipmentsData extends ReadonlyArray<infer T> ? T : never;

type SearchResult<T> =
  | { kind: "idle" }
  | { kind: "found"; shipment: T }
  | { kind: "not_found"; query: string }
  | { kind: "invalid"; message: string };

function normalizeTracking(value: string): string {
  return value.trim().toLowerCase();
}

function getTrackingNumber(shipment: EnterpriseShipment): string | null {
  const s = shipment as unknown as { tracking_number?: string | null };
  return s.tracking_number ?? null;
}

export default function Tracking() {
  const { data, isLoading: shipmentsLoading } = useEnterpriseShipments();
  const shipments = (data ?? []) as EnterpriseShipment[];

  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [result, setResult] = useState<SearchResult<EnterpriseShipment>>({ kind: "idle" });

  const shipmentsByTracking = useMemo(() => {
    const map = new Map<string, EnterpriseShipment>();
    for (const s of shipments) {
      const tn = getTrackingNumber(s);
      const key = tn ? normalizeTracking(tn) : "";
      if (key) map.set(key, s);
    }
    return map;
  }, [shipments]);

  const handleTrack: React.FormEventHandler<HTMLFormElement> = (e) => {
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

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-[#0d2c54] py-10 text-center text-white">
        <h1 className="text-2xl font-bold">Track Your Shipment</h1>
      </div>

      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border">
        <form onSubmit={handleTrack} className="flex gap-2">
          <Input
            placeholder="Tracking ID"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              if (result.kind !== "idle") setResult({ kind: "idle" });
            }}
            autoComplete="off"
          />
          <Button
            type="submit"
            className="bg-[#ff6b00] hover:bg-[#e66000] text-white"
            disabled={shipmentsLoading}
          >
            {shipmentsLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Track"}
          </Button>
        </form>

        <div className="mt-4">
          {shipmentsLoading && <p className="text-sm text-slate-600">Loading shipments…</p>}

          {result.kind === "invalid" && (
            <p className="text-sm text-red-600">{result.message}</p>
          )}

          {result.kind === "not_found" && (
            <p className="text-sm text-red-600">
              No shipment found for <span className="font-semibold">{result.query}</span>.
            </p>
          )}

          {result.kind === "found" && (
            <div className="rounded-lg border p-4 bg-slate-50">
              <p className="text-sm font-semibold">Shipment Found</p>
              <p className="text-xs text-slate-700 mt-1">
                Tracking: {getTrackingNumber(result.shipment) ?? "—"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}