import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguageContext } from '@/lib/LanguageContext'; // Import context hook

export default function AdminDashboard() {
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext();
  const { t } = useLanguageContext(); // Initialize translation function

  const stats = [
    { 
      title: t('Total Shipments', 'ပို့ဆောင်မှုစုစုပေါင်း'), 
      value: '1,284', 
      icon: Package, 
      color: 'text-blue-600' 
    },
    { 
      title: t('Active Sellers', 'အရောင်းကိုယ်စားလှယ်များ'), 
      value: '156', 
      icon: Users, 
      color: 'text-emerald-600' 
    },
    { 
      title: t('Revenue (MMK)', 'ဝင်ငွေစုစုပေါင်း (ကျပ်)'), 
      value: '4.2M', 
      icon: TrendingUp, 
      color: 'text-orange-600' 
    },
    { 
      title: t('Pending Issues', 'ဖြေရှင်းရန်ပြဿနာများ'), 
      value: '12', 
      icon: AlertCircle, 
      color: 'text-rose-600' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-black text-[#0d2c54] uppercase italic">
        {t('Admin Overview', 'အုပ်ချုပ်သူ၏ ခြုံငုံသုံးသပ်ချက်')}
      </h1>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-[#0d2c54]">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Activity Section */}
      <Card className="col-span-4 border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#0d2c54]">
            {t('Recent System Activity', 'စနစ်၏ လတ်တလောလှုပ်ရှားမှုများ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">
            {t('No recent critical logs found.', 'လတ်တလော အရေးကြီးမှတ်တမ်းများ မရှိပါ။')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}