import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export default function GeneralSettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{t('General Settings', 'အထွေထွေ ဆက်တင်များ')}</h1>
      
      <Card className="rounded-[2rem] border-zinc-100 shadow-xl overflow-hidden">
        <CardHeader className="bg-zinc-50/50 border-b border-zinc-100">
          <CardTitle className="text-sm uppercase tracking-widest text-zinc-500">{t('Organization Profile', 'အဖွဲ့အစည်း အချက်အလက်')}</CardTitle>
        </CardHeader>
        <CardContent className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400">{t('Company Name', 'ကုမ္ပဏီအမည်')}</label>
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Building2 className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Britium Express Logistics</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-400">{t('Support Email', 'အီးမေးလ်')}</label>
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <Mail className="h-5 w-5 text-zinc-400" />
                <span>support@britium-express.com</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}