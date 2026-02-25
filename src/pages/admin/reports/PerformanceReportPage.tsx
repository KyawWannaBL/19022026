import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Users, BarChart3 } from "lucide-react";

export default function PerformanceReportPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-extralight text-zinc-900">
        Performance <span className="font-semibold text-[#D4AF37]">Analysis</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold uppercase text-zinc-400">{t('Delivery Success', 'ပို့ဆောင်မှု အောင်မြင်မှု')}</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">94.2%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-zinc-100 shadow-2xl h-[400px] flex items-center justify-center">
        <div className="text-center space-y-2">
          <BarChart3 className="h-12 w-12 text-zinc-100 mx-auto" />
          <p className="text-zinc-300 italic">{t('Aggregating performance metrics...', 'စွမ်းဆောင်ရည် အချက်အလက်များ စုစည်းနေသည်...')}</p>
        </div>
      </Card>
    </div>
  );
}