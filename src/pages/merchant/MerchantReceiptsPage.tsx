import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/index";
import { Receipt, DownloadCloud, CheckCircle2 } from "lucide-react";

export default function MerchantReceiptsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-zinc-900">{t('Merchant Receipts', 'ကုန်သည် ငွေရပြေစာများ')}</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-bold">
          <DownloadCloud className="h-4 w-4" /> {t('Export All', 'အားလုံးထုတ်ယူရန်')}
        </button>
      </div>

      <Card className="border-zinc-100 shadow-xl rounded-[2rem]">
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100">
              <tr>
                <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-[10px]">{t('Date', 'ရက်စွဲ')}</th>
                <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-[10px]">{t('Merchant', 'ကုန်သည်')}</th>
                <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-[10px]">{t('Total Amount', 'စုစုပေါင်းပမာဏ')}</th>
                <th className="px-6 py-4 font-bold text-zinc-500 uppercase text-[10px]">{t('Status', 'အခြေအနေ')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <tr className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 text-zinc-600">2026-02-26</td>
                <td className="px-6 py-4 font-medium">B-Ventures Store</td>
                <td className="px-6 py-4 font-bold">{formatCurrency(1250000)}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                    <CheckCircle2 className="h-3 w-3" /> {t('Paid', 'ပေးချေပြီး')}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}