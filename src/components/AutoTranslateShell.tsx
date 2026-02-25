  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return observeAutoTranslate({ root, lang });
  }, [lang]);

  return <div ref={ref}>{children}</div>;
}
