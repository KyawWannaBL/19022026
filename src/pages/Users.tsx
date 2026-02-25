const UsersPage = () => {
  const { t } = useLanguageContext();
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserIcon className="text-[#0d2c54]" />
        <h1 className="text-xl font-bold uppercase tracking-tight">
          {t('admin.users', 'အသုံးပြုသူ စီမံခန့်ခွဲမှု')}
        </h1>
      </div>
      {/* Table logic remains same, ensuring unique keys */}
    </div>
  );
};

export default UsersPage;