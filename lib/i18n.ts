import esTranslations from '@/data/translations/es.json';
import enTranslations from '@/data/translations/en.json';

export type Language = 'es' | 'en';

export const translations = {
  es: esTranslations,
  en: enTranslations,
};

export function getTranslations(lang: Language) {
  return translations[lang];
}
