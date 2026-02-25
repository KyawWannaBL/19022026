import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Store, TrendingUp, AlertTriangle } from "lucide-react";

export default function MerchantReportPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {t('Merchant Performance', 'ကုန်သည် စွမ်းဆောင်ရည် အစီရင်ခံစာ')}
        </h1>
        <p className="text-zinc-500">{t('Analysis of merchant volume and settlement status', 'ကုန်သည်များ၏ ပမာဏနှင့် ငွေပေးချေမှု အခြေအနေ')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-zinc-100 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-wider">{t('Top Merchant', 'ထိပ်တန်းကုန်သည်')}</p>
              <Store className="h-4 w-4 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold mt-1">B-Ventures Store</h2>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-100 shadow-xl rounded-[2rem]">
        <CardContent className="p-0">
          <div className="p-20 text-center text-zinc-300 italic">
            {t('Merchant data visualization loading...', 'ကုန်သည်ဆိုင်ရာ အချက်အလက်များ ဖော်ပြနေသည်...')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}