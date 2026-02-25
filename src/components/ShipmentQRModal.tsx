// src/components/ShipmentQRModal.tsx

// 1. Change 'origin' to 'senderName' or a fallback
// 2. Change 'destination' to 'destinationTownship'
// 3. Change 'created_at' to 'createdAt'

{/* Inside handlePrint HTML template */}
<div class="info-row">
  <span class="label-tag">Route</span>
  <strong>${shipment.senderName || "Local"} &rarr; ${shipment.destinationTownshipTownship || "Pending"}</strong>
</div>

{/* Inside the JSX return */}
<p className="text-sm font-medium">{shipment.destinationTownshipTownship || "Global Hub"}</p>
<p className="text-sm font-medium">
  {shipment.createdAt ? formatDate(shipment.createdAt) : "2026-02-18"}
</p>