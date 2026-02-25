import { Shipment, User, ROUTE_PATHS, USER_ROLES } from "@/lib/index";
// file: src/components/ShipmentQRModal.tsx

import React from "react";
import type { Shipment } from "@/lib/index";
import { useLanguageContext } from "@/lib/LanguageContext";
import { getStatusLabel, formatDate } from "@/lib/index";

export type ShipmentQRModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipment?: Partial<Shipment> | null;
  trackingBaseUrl?: string;
};

/** * Helper for prioritizing standardized library keys over legacy ones
 */
function pickFirst(...values: Array<string | number | null | undefined>): string {
  for (const v of values) {
    if (v === null || v === undefined) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return "";
}

export default function ShipmentQRModal({
  open,
  onOpenChange,
  shipment,
  trackingBaseUrl = "/tracking",
}: ShipmentQRModalProps) {
  const { t } = useLanguageContext();
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  // 1. Unified Tracking Reference
  const ref = React.useMemo(() => {
    if (!shipment) return "";
    return pickFirst(shipment.awb, shipment.awb, shipment.awb, shipment.id);
  }, [shipment]);

  const trackingUrl = React.useMemo(() => {
    const base = trackingBaseUrl.trim().replace(/\/+$/, "");
    if (!ref) return base;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}ref=${encodeURIComponent(ref)}`;
  }, [trackingBaseUrl, ref]);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(trackingUrl)}`;

  // 2. Property Alignment (Sync with Master Library)
  const created = shipment?.createdAt || shipment?.createdAt || null;
  const origin = shipment?.senderName || shipment?.origin || "-";
  const destinationTownship = shipment?.destinationTownship || shipment?.destinationTownship || "-";

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => { if (e.target === overlayRef.current) onOpenChange(false); }}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl border overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between border-b px-5 py-4 bg-slate-50/50">
          <div className="min-w-0">
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
              {t('Shipment QR', 'ပို့ဆောင်မှု QR')}
            </div>
            <div className="font-bold text-[#0d2c54] truncate">{ref || t('Unknown', 'မသိရှိရပါ')}</div>
          </div>
          <button
            className="rounded-md px-3 py-1.5 text-xs font-black uppercase border bg-white hover:bg-slate-50 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            {t('Close', 'ပိတ်မည်')}
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="rounded-2xl border-2 border-slate-100 p-4 bg-white shadow-sm">
                <img src={qrUrl} alt="Tracking QR" width={180} height={180} className="block" />
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-4">
              {/* Route Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border p-3 bg-slate-50/50">
                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">{t('Origin', 'စတင်ရာ')}</div>
                  <div className="font-bold text-[#0d2c54] truncate">{origin}</div>
                </div>
                <div className="rounded-xl border p-3 bg-slate-50/50">
                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">{t('Destination', 'မြို့နယ်')}</div>
                  <div className="font-bold text-[#0d2c54] truncate">{destinationTownship}</div>
                </div>
              </div>

              {/* Status & Date */}
              <div className="space-y-3">
                <div className="rounded-xl border p-3">
                  <div className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">{t('Status', 'အခြေအနေ')}</div>
                  <div className="font-bold">
                    {shipment?.status ? getStatusLabel(shipment.status, t) : "-"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-3">
                    <div className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">{t('Pieces', 'အရေအတွက်')}</div>
                    <div className="font-bold">{shipment?.pieces || "1"}</div>
                  </div>
                  <div className="rounded-xl border p-3">
                    <div className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">{t('Date', 'ရက်စွဲ')}</div>
                    <div className="font-bold truncate text-xs">{created ? formatDate(created) : "-"}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  className="flex-1 rounded-xl px-3 py-2.5 text-xs font-black uppercase bg-[#0d2c54] text-white hover:opacity-90 transition-opacity"
                  onClick={() => window.open(trackingUrl, "_blank")}
                >
                  {t('Track', 'ခြေရာခံမည်')}
                </button>
                <button
                  className="rounded-xl px-4 py-2.5 text-xs font-black uppercase border-2 border-slate-100 hover:bg-slate-50 transition-all"
                  onClick={() => window.print()}
                >
                  {t('Print', 'ပုံနှိပ်မည်')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}