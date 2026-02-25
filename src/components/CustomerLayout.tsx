
function CustomerLayout({ children }: Props) {
  const { user } = useAuth();
  const { t } = useLanguageContext();

  const name =
    (user as any)?.full_name ??
    (user as any)?.fullName ??
    (user as any)?.name ??
    "";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b p-4 flex justify-between items-center shadow-sm">
        <h1 className="font-black text-[#0d2c54] italic uppercase">
          {t("Customer Portal", "ဖောက်သည် ပေါ်တယ်လ်")}
        </h1>
        <div className="text-xs font-bold text-slate-500">{name}</div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

export default CustomerLayout;
export { CustomerLayout };
