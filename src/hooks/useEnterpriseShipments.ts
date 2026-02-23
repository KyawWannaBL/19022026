import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TABLES } from "@/lib/db/tables";
import { mapShipmentRowToShipment } from "@/lib/db/mappers";
import type { Shipment } from "@/lib/index";

async function fetchShipments(): Promise<Shipment[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLES.SHIPMENTS)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return (data ?? []).map((row: any) => mapShipmentRowToShipment(row, []));
}

export function useEnterpriseShipments() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["enterprise-shipments"],
    queryFn: fetchShipments,
    staleTime: 15_000,
  });

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel("realtime-enterprise-shipments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLES.SHIPMENTS },
        () => qc.invalidateQueries({ queryKey: ["enterprise-shipments"] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return q;
}

export async function fetchShipmentByTracking(trackingNumber: string) {
  if (!supabase) return null;
  const tn = trackingNumber.trim();
  if (!tn) return null;

  // Try common columns. Ignore failures and fall back.
  const tries: Array<{ col: string; val: string }> = [
    { col: "awb_number", val: tn },
    { col: "tracking_number", val: tn },
    { col: "reference_number", val: tn },
  ];

  for (const t of tries) {
    const { data, error } = await supabase
      .from(TABLES.SHIPMENTS)
      .select("*")
      .eq(t.col as any, t.val)
      .maybeSingle();
    if (!error && data) return data as any;
  }

  // final: try id match
  const { data } = await supabase.from(TABLES.SHIPMENTS).select("*").eq("id", tn).maybeSingle();
  return (data as any) ?? null;
}

export async function fetchShipmentTracking(shipmentId: string) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(TABLES.SHIPMENT_TRACKING)
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("timestamp", { ascending: true });
  if (error) return [];
  return data ?? [];
}
