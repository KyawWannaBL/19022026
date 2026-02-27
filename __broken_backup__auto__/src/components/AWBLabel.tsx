import { useLanguageContext } from '@/lib/LanguageContext';

interface AWBProps {
  shipment: Shipment;
  clerk: User;
}

export const AWBLabel = ({ shipment, clerk }: AWBProps) => {
  const { t } = useLanguageContext();

  return (
    <div className="awb-label w-[4in] h-[6in] bg-white p-4 border-2 border-black flex flex-col text-black font-sans print:m-0">
      <div className="flex justify-between items-start border-b-2 border-black pb-2 mb-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-black uppercase tracking-tighter">Britium Express</h1>
          <p className="text-[12px] font-bold">DELIVERY SERVICE</p>
          <p className="text-[10px] mt-1">HotLine: 09-XXXXXXX</p>
        </div>
        <div className="flex flex-col items-center">
          <QRCodeSVG value={shipment.tracking_number || ""} size={90} level="H" />
          <p className="text-[10px] font-mono mt-1 font-bold">{shipment.tracking_number}</p>
        </div>
      </div>

      <div className="flex-1 py-2 space-y-1 border-b border-black">
        <p className="text-sm font-bold uppercase">{t('Recipient', 'လက်ခံသူ')} : <span className="text-lg font-black ml-2">{shipment.receiverName}</span></p>
        <p className="text-md font-bold">{shipment.receiverPhone}</p>
        <p className="text-sm uppercase font-bold leading-tight mt-2">{shipment.destinationTownship}</p>
        <p className="text-xs italic leading-tight">{shipment.receiverAddress}</p>
      </div>

      <div className="py-2 border-b border-black grid grid-cols-2 gap-4 items-center">
        <div className="text-[10px] font-bold space-y-1">
          <div className="flex justify-between"><span>Item Price :</span> <span>---</span></div>
          <div className="flex justify-between"><span>Delivery Fees :</span> <span>---</span></div>
        </div>
        <div className="bg-slate-100 p-2 rounded-xl border border-black flex flex-col items-center">
          <div className="flex justify-between w-full text-[10px] font-bold px-1"><span>COD</span> <span>MMK</span></div>
          <span className="text-xl font-black">{formatCurrency(shipment.cod_amount || 0)}</span>
        </div>
      </div>

      <div className="pt-2 text-[8px] flex justify-between uppercase font-bold opacity-80">
        <span>Picker: {clerk.name}</span>
        <span>Date: {new Date().toLocaleString()}</span>
      </div>

      <p className="mt-2 text-[10px] font-bold text-center border-t border-black pt-1 leading-tight">
        ဘောက်ချာပါ ငွေပမာဏထက် ပိုမိုတောင်းခံပါက အထက်ပါ Hotline သို့ ဆက်သွယ် တိုင်ကြားနိုင်ပါသည်။
      </p>
    </div>
  );
};