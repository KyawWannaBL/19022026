import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/assets/images';
export function QRCodeLabel({ shipmentData, onPrint, className }) {
    const { t, language } = useLanguage();
    const canvasRef = useRef(null);
    const labelRef = useRef(null);
    useEffect(() => {
        generateQRCode();
    }, [shipmentData]);
    const generateQRCode = async () => {
        if (!canvasRef.current)
            return;
        const qrData = {
            awb: shipmentData.awb_number,
            type: 'SHIPMENT',
            sender: shipmentData.sender_name,
            receiver: shipmentData.receiver_name,
            service: shipmentData.service_type,
            weight: shipmentData.weight,
            cod: shipmentData.cod_amount || 0,
            date: shipmentData.created_at
        };
        try {
            // Simple QR code placeholder - in production, use a QR library
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, 120, 120);
                ctx.fillStyle = '#FFFFFF';
                ctx.font = '10px Arial';
                ctx.fillText('QR Code', 40, 60);
                ctx.fillText(shipmentData.awb_number, 20, 75);
            }
        }
        catch (error) {
            console.error('QR Code generation failed:', error);
        }
    };
    const handlePrint = () => {
        if (labelRef.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
          <html>
            <head>
              <title>Waybill - ${shipmentData.awb_number}</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 0; 
                  padding: 20px;
                  background: white;
                }
                .label { 
                  width: 4in; 
                  height: 6in; 
                  border: 2px solid #000; 
                  padding: 10px;
                  box-sizing: border-box;
                }
                .header { 
                  text-align: center; 
                  border-bottom: 2px solid #000; 
                  padding-bottom: 10px; 
                  margin-bottom: 10px;
                }
                .logo { 
                  width: 80px; 
                  height: auto;
                }
                .company-name { 
                  font-size: 18px; 
                  font-weight: bold; 
                  color: #D4AF37;
                  margin: 5px 0;
                }
                .awb-number { 
                  font-size: 16px; 
                  font-weight: bold; 
                  margin: 5px 0;
                }
                .section { 
                  margin: 8px 0; 
                  font-size: 11px;
                }
                .section-title { 
                  font-weight: bold; 
                  background: #f0f0f0; 
                  padding: 2px 4px;
                  margin-bottom: 3px;
                }
                .qr-section { 
                  text-align: center; 
                  margin: 10px 0;
                }
                .footer { 
                  border-top: 1px solid #000; 
                  padding-top: 5px; 
                  margin-top: 10px; 
                  font-size: 10px; 
                  text-align: center;
                }
                @media print {
                  body { margin: 0; padding: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${labelRef.current.innerHTML}
            </body>
          </html>
        `);
                printWindow.document.close();
                printWindow.print();
            }
        }
        onPrint?.();
    };
    const handleDownload = async () => {
        if (labelRef.current) {
            try {
                const html2canvas = await import('html2canvas');
                const canvas = await html2canvas.default(labelRef.current, {
                    scale: 2,
                    backgroundColor: '#ffffff'
                });
                const link = document.createElement('a');
                link.download = `waybill-${shipmentData.awb_number}.png`;
                link.href = canvas.toDataURL();
                link.click();
            }
            catch (error) {
                console.error('Download failed:', error);
            }
        }
    };
    return (_jsxs("div", { className: `space-y-4 ${className}`, children: [_jsxs("div", { className: "flex gap-2 no-print", children: [_jsxs(Button, { onClick: handlePrint, className: "flex items-center gap-2", children: [_jsx(Printer, { className: "w-4 h-4" }), language === 'my' ? 'ပုံနှိပ်မည်' : 'Print Label'] }), _jsxs(Button, { variant: "outline", onClick: handleDownload, className: "flex items-center gap-2", children: [_jsx(Download, { className: "w-4 h-4" }), language === 'my' ? 'ဒေါင်းလုဒ်လုပ်မည်' : 'Download'] })] }), _jsxs(Card, { ref: labelRef, className: "label w-[4in] h-[6in] p-4 bg-white border-2 border-black", children: [_jsxs("div", { className: "header text-center border-b-2 border-black pb-3 mb-3", children: [_jsx("img", { src: IMAGES.BRITIUM_LOGO_65, alt: "Britium Express", className: "logo w-20 h-auto mx-auto mb-2" }), _jsx("div", { className: "company-name text-lg font-bold text-[#D4AF37]", children: "BRITIUM EXPRESS" }), _jsx("div", { className: "text-sm text-gray-600", children: language === 'my' ? 'လျင်မြန်သော ပို့ဆောင်ရေး ဝန်ဆောင်မှု' : 'Premium Logistics Service' }), _jsxs("div", { className: "awb-number text-base font-bold mt-2", children: ["AWB: ", shipmentData.awb_number] })] }), _jsxs("div", { className: "section", children: [_jsx("div", { className: "section-title", children: language === 'my' ? 'ပို့သူအချက်အလက်' : 'SENDER INFORMATION' }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'အမည်:' : 'Name:' }), " ", shipmentData.sender_name] }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'ဖုန်း:' : 'Phone:' }), " ", shipmentData.sender_phone] }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'လိပ်စာ:' : 'Address:' }), " ", shipmentData.sender_address] })] }), _jsxs("div", { className: "section", children: [_jsx("div", { className: "section-title", children: language === 'my' ? 'လက်ခံသူအချက်အလက်' : 'RECEIVER INFORMATION' }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'အမည်:' : 'Name:' }), " ", shipmentData.receiver_name] }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'ဖုန်း:' : 'Phone:' }), " ", shipmentData.receiver_phone] }), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'လိပ်စာ:' : 'Address:' }), " ", shipmentData.receiver_address] })] }), _jsxs("div", { className: "section", children: [_jsx("div", { className: "section-title", children: language === 'my' ? 'ဝန်ဆောင်မှုအချက်အလက်' : 'SERVICE DETAILS' }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { children: [_jsx("strong", { children: language === 'my' ? 'ဝန်ဆောင်မှု:' : 'Service:' }), " ", shipmentData.service_type] }), _jsxs("span", { children: [_jsx("strong", { children: language === 'my' ? 'အလေးချိန်:' : 'Weight:' }), " ", shipmentData.weight, "kg"] })] }), shipmentData.cod_amount && shipmentData.cod_amount > 0 && (_jsxs("div", { children: [_jsx("strong", { children: "COD:" }), " ", shipmentData.cod_amount.toLocaleString(), " MMK"] })), _jsxs("div", { children: [_jsx("strong", { children: language === 'my' ? 'ရက်စွဲ:' : 'Date:' }), " ", new Date(shipmentData.created_at).toLocaleDateString()] })] }), _jsxs("div", { className: "qr-section text-center my-3", children: [_jsx("canvas", { ref: canvasRef, className: "mx-auto" }), _jsx("div", { className: "text-xs mt-1", children: language === 'my' ? 'QR ကုဒ်ဖြင့် ခြေရာခံပါ' : 'Scan QR Code to Track' })] }), _jsxs("div", { className: "footer border-t border-black pt-2 mt-3 text-xs text-center", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: language === 'my' ? 'ဖုန်း: +95-9-123-456-789' : 'Phone: +95-9-123-456-789' }), _jsx("span", { children: "www.britiumexpress.com" })] }), _jsx("div", { className: "mt-1 text-[10px] text-gray-500", children: language === 'my'
                                    ? 'ဤလက်မှတ်သည် ပို့ဆောင်မှုအတွက် အရေးကြီးသော စာရွက်စာတမ်းဖြစ်သည်'
                                    : 'This waybill is an important document for shipment tracking' })] })] })] }));
}
export default QRCodeLabel;
