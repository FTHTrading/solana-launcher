import type { Locale, TranslationDictionary } from './types';
import en from './translations/en';
import ar from './translations/ar';
import fr from './translations/fr';
import hi from './translations/hi';
import ur from './translations/ur';

export const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  ar,
  fr,
  hi,
  ur,
};

export { type Locale, type TranslationDictionary } from './types';
export { LOCALES, RTL_LOCALES, LOCALE_META, DEFAULT_LOCALE, isRTL, interpolate } from './types';
