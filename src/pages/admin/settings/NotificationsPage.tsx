export default function NotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{t('Notifications', 'အသိပေးချက်များ')}</h1>
      
      <div className="grid gap-4">
        <Card className="rounded-2xl border-zinc-100 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-6 w-6 text-yellow-600" />
              <div>
                <p className="font-bold">{t('Fraud Alerts', 'လိမ်လည်မှု သတိပေးချက်')}</p>
                <p className="text-sm text-zinc-500">{t('Notify on ledger hash mismatches', 'စာရင်းဇယား ကွဲလွဲမှုများကို အသိပေးမည်')}</p>
              </div>
            </div>
            <div className="h-6 w-11 bg-zinc-900 rounded-full relative p-1 cursor-pointer">
              <div className="h-4 w-4 bg-white rounded-full ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}