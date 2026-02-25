import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDate } from "@/lib";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download, MapPin, Package, Calendar, Info } from "lucide-react";
import { useState } from "react";
export function ShipmentQRModal({ shipment, isOpen, onClose }) {
    const [qrDataUrl, setQrDataUrl] = useState("");
    const trackingId = shipment.awb || shipment.awb || "N/A";
    const handleDownload = () => {
        if (!qrDataUrl)
            return;
        const link = document.createElement("a");
        link.href = qrDataUrl;
        link.download = `QR_${trackingId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handlePrint = () => {
        if (!qrDataUrl)
            return;
        const printWindow = window.open("", "_blank");
        if (!printWindow)
            return;
        // Construct a professional print label layout
        printWindow.document.write(`
      <html>
        <head>
          <title>Shipment Label - ${trackingId}</title>
          <style>
            @page { size: auto; margin: 0mm; }
            body { 
              font-family: 'Inter', sans-serif; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0; 
              background: #fff;
            }
            .label-card {
              width: 100mm;
              padding: 10mm;
              border: 1px solid #000;
              text-align: center;
              box-sizing: border-box;
            }
            .header {
              font-size: 24pt;
              font-weight: 800;
              margin-bottom: 5mm;
              letter-spacing: -0.02em;
            }
            .qr-wrapper {
              margin: 5mm 0;
            }
            .info-grid {
              text-align: left;
              border-top: 1px solid #eee;
              padding-top: 5mm;
              font-size: 10pt;
              color: #333;
            }
            .info-row {
              margin-bottom: 2mm;
            }
            .label-tag {
              font-weight: 700;
              text-transform: uppercase;
              font-size: 8pt;
              color: #666;
              display: block;
            }
            .footer-tag {
              margin-top: 10mm;
              font-size: 7pt;
              color: #999;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
          </style>
        </head>
        <body>
          <div class="label-card">
            <div class="header">${trackingId}</div>
            <div class="qr-wrapper">
              <img src="${qrDataUrl}" width="220" height="220" />
            </div>
            <div class="info-grid">
              <div class="info-row">
                <span class="label-tag">Route</span>
                <strong>${shipment.senderName || "Local"} &rarr; ${shipment.destinationTownship || "Pending"}</strong>
              </div>
              <div class="info-row">
                <span class="label-tag">Date Issued</span>
                <strong>${shipment.createdAt ? formatDate(shipment.createdAt) : "2026-02-18"}</strong>
              </div>
              <div class="info-row">
                <span class="label-tag">Status</span>
                <strong>${shipment.status}</strong>
              </div>
            </div>
            <div class="footer-tag">© 2026 FleetLogix Enterprise</div>
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);
        printWindow.document.close();
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsx(DialogContent, { className: "max-w-2xl bg-background border-border/40 shadow-luxury p-0 overflow-hidden rounded-3xl", children: _jsxs("div", { className: "flex flex-col md:flex-row min-h-[400px]", children: [_jsxs("div", { className: "w-full md:w-5/12 bg-muted/20 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/40", children: [_jsx("div", { className: "relative p-4 bg-white rounded-2xl shadow-xl transition-transform hover:scale-105 duration-500", children: _jsx(QRCodeGenerator, { data: trackingId, size: 220, label: trackingId, onGenerated: setQrDataUrl }) }), _jsxs("div", { className: "mt-8 text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-primary mb-1", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: "Active Tracking Link" })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Ready for scanning by warehouse & riders" })] })] }), _jsxs("div", { className: "w-full md:w-7/12 p-8 flex flex-col justify-between", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(DialogHeader, { className: "text-left", children: [_jsx(DialogTitle, { className: "text-2xl font-heading text-foreground", children: "Shipment Identifier" }), _jsx(DialogDescription, { className: "text-muted-foreground", children: "Secure QR code for tracking and internal logistics routing." })] }), _jsxs("div", { className: "grid gap-5", children: [_jsxs("div", { className: "flex items-start gap-4 p-3 rounded-xl bg-accent/5 border border-border/20", children: [_jsx(Package, { className: "w-5 h-5 text-primary mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-tighter", children: "AWB Identifier" }), _jsx("p", { className: "text-lg font-mono font-bold text-foreground", children: trackingId })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(MapPin, { className: "w-4 h-4 text-primary mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-tighter", children: "Destination" }), _jsx("p", { className: "text-sm font-medium", children: shipment.destinationTownship || "Global Hub" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Calendar, { className: "w-4 h-4 text-primary mt-1" }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] text-muted-foreground uppercase font-bold tracking-tighter", children: "Timestamp" }), _jsx("p", { className: "text-sm font-medium", children: shipment.createdAt ? formatDate(shipment.createdAt) : "2026-02-18" })] })] })] }), _jsxs("div", { className: "flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/30 p-2 rounded-lg", children: [_jsx(Info, { className: "w-3 h-3" }), _jsx("span", { children: "QR Codes are encrypted and valid for the entire lifecycle." })] })] })] }), _jsxs("div", { className: "mt-10 flex flex-col sm:flex-row gap-3", children: [_jsxs(Button, { variant: "outline", className: "flex-1 h-12 rounded-full border-border/40 hover:bg-muted/50 transition-all font-semibold", onClick: handleDownload, disabled: !qrDataUrl, children: [_jsx(Download, { className: "w-4 h-4 mr-2 text-primary" }), "Download PNG"] }), _jsxs(Button, { className: "flex-1 h-12 rounded-full luxury-button tracking-[0.2em] shadow-lg shadow-primary/20", onClick: handlePrint, disabled: !qrDataUrl, children: [_jsx(Printer, { className: "w-4 h-4 mr-2" }), "Print Label"] })] })] })] }) }) }));
}
