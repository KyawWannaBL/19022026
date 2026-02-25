const WarehouseOperationsPage: React.FC = () => {
  const { t } = useLanguageContext();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-black text-[#0d2c54] uppercase italic">{t('Warehouse Hub Control', 'ဂိုဒေါင်ဗဟိုထိန်းချုပ်မှု')}</h1>
      </div>

      <Tabs defaultValue="scanning">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="scanning">{t('Scanning', 'စကန်ဖတ်ခြင်း')}</TabsTrigger>
          <TabsTrigger value="sorting">{t('Sorting', 'ခွဲခြားခြင်း')}</TabsTrigger>
          <TabsTrigger value="inbound">{t('Inbound', 'အဝင်')}</TabsTrigger>
          <TabsTrigger value="outbound">{t('Outbound', 'အထွက်')}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};