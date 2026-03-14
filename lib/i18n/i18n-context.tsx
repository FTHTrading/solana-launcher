'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, DEFAULT_LOCALE, isRTL } from '@/lib/i18n';
import type { Locale, TranslationDictionary } from '@/lib/i18n';

const STORAGE_KEY = 'solana-launcher-locale';

interface I18nContextValue {
  locale: Locale;
  t: TranslationDictionary;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in dictionaries) return stored as Locale;
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // localStorage unavailable
    }
    // Update <html> attributes for RTL/LTR
    const html = document.documentElement;
    html.lang = newLocale;
    html.dir = isRTL(newLocale) ? 'rtl' : 'ltr';
  }, []);

  const dir = isRTL(locale) ? 'rtl' : 'ltr';

  // Update <html> on mount
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dir;
  }, [locale, dir, mounted]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
      dir,
      isRtl: dir === 'rtl',
    }),
    [locale, setLocale, dir],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Access the current locale and translation dictionary.
 *
 * @example
 * const { t, locale, setLocale, isRtl } = useTranslation();
 * return <h1>{t.hero_title}</h1>;
 */
export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within an <I18nProvider>');
  }
  return ctx;
}
