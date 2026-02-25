import { Key, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useLanguageContext } from '@/lib/LanguageContext';

export default function ApiSettingsPage() {
  const { t } = useLanguageContext();

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">{t('System Security', 'စနစ်လုံခြုံရေး')}</h1>
          <p className="text-zinc-500 text-sm">{t('Manage production environment credentials', 'ထုတ်လုပ်မှုဆိုင်ရာ ကုဒ်များကို စီမံခန့်ခွဲရန်')}</p>
        </div>
      </div>

      <Card className="border-zinc-100 shadow-xl rounded-[2rem]">
        <CardHeader className="border-b border-zinc-50">
          <CardTitle className="text-sm uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Key className="h-4 w-4" /> {t('Production API Keys', 'API ကုဒ်များ')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="p-4 bg-zinc-50 rounded-xl font-mono text-xs text-zinc-400 break-all">
            VITE_SUPABASE_URL_AUTH_LOCKED_2026...
          </div>
          <p className="text-[10px] text-zinc-400 italic">
            {t('Keys are encrypted at rest. Rotation required every 90 days.', 'ကုဒ်များကို လုံခြုံစွာသိမ်းဆည်းထားသည်။ ရက်ပေါင်း ၉၀ တိုင်း အသစ်လဲလှယ်ရန် လိုအပ်သည်။')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}