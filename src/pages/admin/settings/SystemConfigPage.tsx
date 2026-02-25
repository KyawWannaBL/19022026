import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Lock } from "lucide-react";

export default function SystemConfigPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Cpu className="h-8 w-8 text-yellow-600" />
        {t('System Config', 'စနစ် ပြင်ဆင်မှုများ')}
      </h1>
      <Card className="rounded-[2.5rem] border-dashed border-2 border-zinc-100 p-20 text-center">
        <Lock className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
        <p className="text-zinc-400 italic">
          {t('Advanced system parameters are locked during production.', 'စနစ်ဆိုင်ရာ အချက်အလက်များကို ပိတ်ထားပါသည်။')}
        </p>
      </Card>
    </div>
  );
}