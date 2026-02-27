export default function BackupPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Database className="h-8 w-8 text-yellow-600" />
          {t('Backups', 'မိတ္တူသိမ်းဆည်းမှု')}
        </h1>
      </header>

      <Card className="rounded-[2.5rem] border-zinc-100 shadow-2xl overflow-hidden">
        <CardContent className="p-10 space-y-6">
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <History className="h-6 w-6 text-zinc-300" />
              <div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{t('Last System Sync', 'နောက်ဆုံး ချိတ်ဆက်မှု')}</p>
                <p className="text-xl font-medium text-zinc-800">2026-02-26 02:45 AM</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center gap-2">
              <DownloadCloud className="h-4 w-4" /> {t('Download Snapshot', 'မိတ္တူထုတ်ယူရန်')}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}