const ReceivingBay: React.FC = () => {
  const { t } = useLanguageContext();
  const [currentShipment, setCurrentShipment] = useState<any>(null);

  return (
    <div className="container mx-auto p-4 space-y-6">
       <h1 className="text-2xl font-black text-[#0d2c54] uppercase italic">
         {t('Warehouse Receiving', 'ဂိုဒေါင်အဝင် လက်ခံခြင်း')}
       </h1>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">{t('Inspection Checklist', 'စစ်ဆေးရမည့်စာရင်း')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-3 border rounded">
                  <span className="text-sm font-bold">{t('Pieces Count Match?', 'အရေအတွက် ကိုက်ညီမှုရှိလား?')}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">{t('Yes', 'ရှိသည်')}</Button>
                    <Button size="sm" variant="destructive">{t('No', 'မရှိပါ')}</Button>
                  </div>
               </div>
            </CardContent>
          </Card>
       </div>
    </div>
  );
};