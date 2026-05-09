import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES } from "./config/i18n";
import en from "./locales/en/translation.json";
import ja from "./locales/ja/translation.json";
import ko from "./locales/ko/translation.json";
import zhHk from "./locales/zh-HK/translation.json";

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      order: ["localStorage", "navigator"],
    },
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ja: {
        translation: ja,
      },
      ko: {
        translation: ko,
      },
      "zh-HK": {
        translation: zhHk,
      },
    },
    supportedLngs: [...SUPPORTED_LANGUAGES],
  });
