export default function WarehouseSorting() {
  const { t } = useLanguageContext();

  return (
    <div className="p-6 space-y-6">
       <Card className="border-t-4 border-t-yellow-500">
         <CardHeader>
            <CardTitle>{t('Bulk Sorting Actions', 'အုပ်စုလိုက် ခွဲခြားသတ်မှတ်ခြင်း')}</CardTitle>
            <CardDescription>{t('Apply destination to selected parcels', 'ရွေးချယ်ထားသော ပစ္စည်းများအတွက် လမ်းကြောင်းသတ်မှတ်ပါ')}</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700 font-bold uppercase">
              {t('Confirm Sorting', 'ခွဲခြားမှုကို အတည်ပြုမည်')}
            </Button>
         </CardContent>
       </Card>
    </div>
  );
}