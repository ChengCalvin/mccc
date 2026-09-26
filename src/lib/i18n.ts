import zh from '../i18n/zh.json';
import en from '../i18n/en.json';
import fr from '../i18n/fr.json';

export const locales = ['zh', 'en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const translations: Record<Locale, Record<string, string>> = { zh, en, fr };

export function useTranslations(locale: Locale) {
  const dict = translations[locale];
  return (key: keyof typeof zh) => dict[key];
}
