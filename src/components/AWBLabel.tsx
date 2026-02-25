import { Shipment, User, formatCurrency } from '@/lib/index';

interface AWBProps {
  shipment: Shipment;
  generator: User; // Tracks who generated the label
}

export const AWBLabel = ({ shipment, generator }: AWBProps) => {
  return (
    <div className="awb-container w-[4in] h-[6in] bg-white p-4 border border-black flex flex-col text-black font-sans print:m-0">
      {/* Header Section */}
      <div className="flex justify-between items-start border-b-2 border-black pb-2 mb-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-black uppercase leading-tight">Britium Express</h1>
          <p className="text-sm font-bold">Delivery Service</p>
          <p className="text-[10px]">HotLine: 09-XXXXXXX</p>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG value={shipment.awb || ""} size={80} level="H" />
          <p className="text-[10px] font-mono mt-1 font-bold">{shipment.awb}</p>
        </div>
      </div>

      {/* Merchant Section */}
      <div className="border-b border-black py-1 text-sm">
        <span className="font-bold">Merchant: </span> {shipment.senderName || "Enterprise Client"}
      </div>

      {/* Recipient Section */}
      <div className="flex-1 py-4 space-y-2 border-b border-black">
        <div className="flex gap-2">
          <span className="font-bold text-sm">Recipient:</span>
          <p className="text-lg font-black">{shipment.receiverName}</p>
        </div>
        <p className="text-md font-bold">{shipment.receiverPhone}</p>
        <p className="text-sm leading-tight italic">{shipment.destinationTownship}</p>
        <p className="text-xs uppercase">{shipment.receiverAddress}</p>
      </div>

      {/* Financials Section */}
      <div className="py-2 grid grid-cols-2 gap-2 text-xs border-b border-black">
        <div className="space-y-1">
          <div className="flex justify-between"><span>Item Price:</span> <span className="font-bold">000,000,000</span></div>
          <div className="flex justify-between"><span>Delivery:</span> <span className="font-bold">000,000,000</span></div>
        </div>
        <div className="bg-slate-100 p-2 rounded border border-black flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold">COD (MMK)</span>
          <span className="text-lg font-black">{formatCurrency(shipment.cod_amount || 0)}</span>
        </div>
      </div>

      {/* System Tracking Footer */}
      <div className="pt-2 text-[8px] flex justify-between uppercase opacity-70">
        <span>Picker: {generator.name}</span>
        <span>Date: {new Date().toLocaleString()}</span>
      </div>
      
      {/* Burmese Warning Text matching awb.png */}
      <p className="mt-2 text-[9px] font-bold text-center border-t pt-1">
        ဘောက်ချာပါ ငွေပမာဏထက် ပိုမိုတောင်းခံပါက အထက်ပါ Hotline သို့ ဆက်သွယ် တိုင်ကြားနိုင်ပါသည်။
      </p>
    </div>
  );
};