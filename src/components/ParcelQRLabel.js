import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Printer, Download, Package, Phone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IMAGES } from '@/assets/images';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
/**
 * Parcel QR Label Component
 * Generates a high-fidelity printable delivery label matching the Britium Express format.
 * Designed for production logistics use with a luxury aesthetic for the digital interface.
 */
export function ParcelQRLabel({ parcel, onPrint, onDownload }) {
    const labelRef = useRef(null);
    const handlePrint = () => {
        if (onPrint) {
            onPrint();
            return;
        }
        const printContent = labelRef.current;
        if (!printContent)
            return;
        const printWindow = window.open('', '_blank');
        if (!printWindow)
            return;
        printWindow.document.write(`
      <html>
        <head>
          <title>Print Label - ${parcel.awb_number || 'Parcel'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              @page { size: 100mm 150mm; margin: 0; }
              body { margin: 0; padding: 10mm; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }, 500);
    };
    const sender = parcel.pickup_address || {};
    const receiver = parcel.delivery_address || {};
    const details = parcel.package_details || {};
    const awb = parcel.awb_number || parcel.trackingNumber || 'PENDING';
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return (_jsxs("div", { className: "flex flex-col gap-6 items-center w-full", children: [_jsxs(Card, { className: "luxury-card p-0 overflow-hidden bg-white text-black w-full max-w-[400px] shadow-2xl border-luxury-gold/20", children: [_jsxs("div", { className: "bg-luxury-obsidian p-3 flex justify-between items-center border-b border-luxury-gold/30", children: [_jsx("span", { className: "text-[10px] font-mono text-luxury-gold tracking-widest uppercase", children: "Label Preview" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: handlePrint, className: "h-8 w-8 text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold", children: _jsx(Printer, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onDownload, className: "h-8 w-8 text-luxury-gold hover:bg-luxury-gold/10 hover:text-luxury-gold", children: _jsx(Download, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { ref: labelRef, className: "p-6 bg-white flex flex-col gap-4 font-sans print:p-4", style: { minHeight: '550px' }, children: [_jsxs("div", { className: "flex justify-between items-start border-b-2 border-black pb-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("img", { src: IMAGES.BRITIUM_LOGO_65, alt: "Britium Express", className: "h-12 w-auto object-contain" }), _jsx("span", { className: "text-[10px] font-bold tracking-tighter uppercase", children: "Express Logistics Network" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-[10px] font-bold text-gray-500 uppercase", children: "AWB Number" }), _jsx("div", { className: "text-xl font-mono font-black", children: awb }), _jsx("div", { className: "text-[8px] mt-1 bg-black text-white px-2 py-0.5 rounded-full inline-block", children: "PRIORITY SERVICE" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 py-2", children: [_jsx("div", { className: "flex justify-center items-center border-r border-dashed border-gray-300", children: _jsx(QRCodeGenerator, { data: awb, size: 140, label: awb }) }), _jsxs("div", { className: "flex flex-col justify-center items-center text-center", children: [_jsx("div", { className: "text-[10px] font-bold text-gray-500 uppercase", children: "Destination Zone" }), _jsx("div", { className: "text-5xl font-black text-black tracking-tighter", children: receiver.city?.substring(0, 3).toUpperCase() || 'DXB' }), _jsxs("div", { className: "mt-2 text-[12px] font-bold border-2 border-black px-3 py-1", children: ["ROUTE: ", parcel.metadata?.route_id || 'A-102'] })] })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 border-t-2 border-black pt-4", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase text-gray-400", children: [_jsx(Package, { className: "h-3 w-3" }), " From (Sender)"] }), _jsx("div", { className: "text-[14px] font-bold", children: sender.name || 'Merchant Name' }), _jsxs("div", { className: "text-[12px] leading-tight text-gray-700", children: [sender.address || 'Loading sender address...', _jsx("br", {}), sender.city || '', ", ", sender.phone || ''] })] }), _jsxs("div", { className: "flex flex-col gap-1 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-[10px] font-black uppercase text-gray-400", children: [_jsx(Truck, { className: "h-3 w-3" }), " To (Recipient)"] }), _jsx("div", { className: "text-[16px] font-black", children: receiver.name || 'Customer Name' }), _jsxs("div", { className: "text-[13px] leading-tight font-medium", children: [receiver.address || 'Loading delivery address...', _jsx("br", {}), _jsx("span", { className: "font-bold", children: receiver.city || '' })] }), _jsxs("div", { className: "flex items-center gap-1 mt-1 font-mono text-[13px] font-bold", children: [_jsx(Phone, { className: "h-3 w-3" }), " ", receiver.phone || 'N/A'] })] })] }), _jsxs("div", { className: "mt-auto border-t border-black pt-3 grid grid-cols-3 gap-2 text-[10px] font-bold uppercase", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-gray-500", children: "Weight" }), _jsxs("span", { children: [details.weight || '0.5', " KG"] })] }), _jsxs("div", { className: "flex flex-col border-x border-gray-300 px-2", children: [_jsx("span", { className: "text-gray-500", children: "COD Amount" }), _jsx("span", { children: details.cod ? `${details.cod} AED` : 'Prepaid' })] }), _jsxs("div", { className: "flex flex-col text-right", children: [_jsx("span", { className: "text-gray-500", children: "Print Date" }), _jsx("span", { children: date })] })] }), _jsx("div", { className: "text-[7px] text-gray-400 mt-2 leading-none text-center italic", children: "Subject to Britium Express terms and conditions. Track your shipment at britium.com using AWB above." })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsxs(Button, { className: "luxury-button", onClick: handlePrint, children: [_jsx(Printer, { className: "mr-2 h-4 w-4" }), " Print Label"] }), _jsxs(Button, { variant: "outline", className: "rounded-full px-8 border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10", onClick: onDownload, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " Save PDF"] })] })] }));
}
