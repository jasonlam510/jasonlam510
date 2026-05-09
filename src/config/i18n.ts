export const LANGUAGE_STORAGE_KEY = "portfolio-language";
export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "zh-HK", "ko", "ja"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(value: string | undefined): value is SupportedLanguage {
  return Boolean(value) && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);
}
