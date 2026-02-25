      <Card className="rounded-[2rem] border-zinc-100 shadow-xl overflow-hidden">
        <CardContent className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-50 rounded-2xl">
              <ShieldCheck className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="font-bold text-zinc-800">{t('Fraud Detection Alerts', 'လိမ်လည်မှု စစ်ဆေးရေး အချက်ပေးချက်')}</p>
              <p className="text-xs text-zinc-400">{t('Automatic alerts on ledger hash mismatches', 'စာရင်းဇယား ကွဲလွဲမှုရှိပါက အလိုအလျောက် အသိပေးမည်')}</p>
            </div>
          </div>
          <div className="h-6 w-11 bg-yellow-600 rounded-full relative">
            <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}