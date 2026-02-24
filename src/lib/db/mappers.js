import { SHIPMENT_STATUSES } from "@/lib/index";
function normalizeStatus(status) {
    const s = String(status ?? SHIPMENT_STATUSES.PENDING).toLowerCase();
    const allowed = new Set(Object.values(SHIPMENT_STATUSES));
    return (allowed.has(s) ? s : SHIPMENT_STATUSES.PENDING);
}
export function mapTrackingRowToEvent(row) {
    return {
        id: String(row?.id ?? `${row?.shipment_id ?? "trk"}-${row?.timestamp ?? Date.now()}`),
        status: normalizeStatus(row?.status),
        location: String(row?.location ?? row?.current_location ?? row?.branch_id ?? "Unknown"),
        timestamp: String(row?.timestamp ?? row?.created_at ?? new Date().toISOString()),
        description: String(row?.notes ?? row?.description ?? row?.status ?? "Update"),
        updatedBy: String(row?.updated_by ?? row?.created_by ?? "system"),
    };
}
export function mapShipmentRowToShipment(row, trackingRows = []) {
    const trackingHistory = (trackingRows || []).map(mapTrackingRowToEvent);
    const createdAt = String(row?.created_at ?? row?.createdAt ?? new Date().toISOString());
    const updatedAt = String(row?.updated_at ?? row?.updatedAt ?? createdAt);
    const trackingNumber = row?.awb_number ||
        row?.tracking_number ||
        row?.trackingNumber ||
        row?.reference_number ||
        row?.referenceNumber ||
        row?.id;
    const price = Number(row?.total_cost ?? row?.shipping_cost ?? row?.shippingCost ?? row?.price ?? 0) || 0;
    return {
        id: String(row?.id ?? trackingNumber),
        trackingNumber: String(trackingNumber ?? "UNKNOWN"),
        senderName: String(row?.sender_name ?? row?.senderName ?? "Unknown Sender"),
        senderPhone: String(row?.sender_phone ?? row?.senderPhone ?? ""),
        senderAddress: String(row?.sender_address ?? row?.senderAddress ?? ""),
        senderCity: String(row?.sender_city ?? row?.senderCity ?? ""),
        receiverName: String(row?.receiver_name ?? row?.receiverName ?? "Unknown Receiver"),
        receiverPhone: String(row?.receiver_phone ?? row?.receiverPhone ?? ""),
        receiverAddress: String(row?.receiver_address ?? row?.receiverAddress ?? ""),
        receiverCity: String(row?.receiver_city ?? row?.receiverCity ?? ""),
        status: normalizeStatus(row?.status),
        weight: Number(row?.weight ?? 0) || 0,
        dimensions: row?.dimensions ?? row?.dimension ?? undefined,
        price,
        codAmount: Number(row?.cod_amount ?? row?.codAmount ?? 0) || 0,
        paymentStatus: (row?.payment_status ?? row?.paymentStatus ?? "pending"),
        createdAt,
        updatedAt,
        branchId: String(row?.origin_branch_id ?? row?.branch_id ?? row?.branchId ?? ""),
        riderId: row?.assigned_rider_id ?? row?.rider_id ?? row?.riderId ?? undefined,
        merchantId: row?.merchant_id ?? row?.merchantId ?? undefined,
        trackingHistory,
        notes: row?.special_instructions ?? row?.notes ?? undefined,
    };
}
