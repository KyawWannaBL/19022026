const RiderDashboard = () => {
  const { t } = useLanguageContext();
  const [tasks] = useState([]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-black text-[#0d2c54] italic uppercase">
        {t('rider.dashboard', 'လုပ်ငန်းဆောင်တာဇယား')}
      </h1>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Package size={16} /> {t('rider.activeTasks', 'လက်ရှိလုပ်ဆောင်ရန်များ')}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8 text-slate-400">
            {t('common.noData', 'ဒေတာမရှိပါ')}
          </CardContent>
        </Card>
      </div>

      <Button className="w-full bg-[#ff6b00] h-12 text-lg font-bold">
        <Scan className="mr-2" /> {t('rider.startScan', 'စကန်ဖတ်မည်')}
      </Button>
    </div>
  );
};

export default RiderDashboard;