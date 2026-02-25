import { Card, CardContent } from "@/components/ui/card";
import { Languages, Moon, UserCircle } from "lucide-react";

export default function UserPreferencesPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{t('Preferences', 'ဦးစားပေး ဆက်တင်များ')}</h1>
      
      <Card className="rounded-[2rem] border-zinc-100 shadow-lg overflow-hidden">
        <CardContent className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Languages className="h-6 w-6 text-zinc-400" />
              <div>
                <p className="font-bold text-zinc-800">{t('Display Language', 'အသုံးပြုမည့် ဘာသာစကား')}</p>
                <p className="text-xs text-zinc-400">{t('Choose your preferred interface language', 'အသုံးပြုလိုသော ဘာသာစကားကို ရွေးချယ်ပါ')}</p>
              </div>
            </div>
            <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-600 outline-none">
              <option value="en">English</option>
              <option value="my">မြန်မာစာ</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}