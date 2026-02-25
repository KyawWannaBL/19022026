  const { lang, setLang } = useI18n();

  return (
    <div className={className} data-no-translate>
      <select
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 outline-none hover:bg-white/10"
        value={lang}
        onChange={(e) => setLang(e.target.value as any)}
        aria-label="Language"
        title="Language"
      >
        <option value="my">မြန်မာ</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
