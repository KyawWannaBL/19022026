      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`hover:underline ${i18n.language === "en" ? "text-white" : ""}`}
      >
        {t("common.english")}
      </button>
      <span className="text-white/20">|</span>
      <button
        onClick={() => i18n.changeLanguage("mm")}
        className={`hover:underline ${i18n.language === "mm" ? "text-white" : ""}`}
      >
        {t("common.myanmar")}
      </button>
    </div>
  );
}