import { DEFAULT_LANGUAGE, isSupportedLanguage, type SupportedLanguage } from "../config/i18n";
import { useTranslation } from "react-i18next";
import { ToggleGroup } from "./ui/ToggleGroup";

const LANGUAGES: Array<{ code: SupportedLanguage; label: string }> = [
  { code: "en", label: "EN" },
  { code: "zh-HK", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  return (
    <ToggleGroup
      ariaLabel={t("controls.language")}
      onChange={(languageCode) => void i18n.changeLanguage(languageCode)}
      options={LANGUAGES.map((language) => ({
        label: language.label,
        value: language.code,
      }))}
      value={isSupportedLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : DEFAULT_LANGUAGE}
    />
  );
}
