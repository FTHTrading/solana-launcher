/**
 * Supported locales.
 * RTL languages: Arabic (ar), Urdu (ur).
 */
export const LOCALES = ['en', 'ar', 'fr', 'hi', 'ur'] as const;
export type Locale = (typeof LOCALES)[number];

export const RTL_LOCALES: Locale[] = ['ar', 'ur'];

export const LOCALE_META: Record<Locale, { label: string; nativeLabel: string; dir: 'ltr' | 'rtl'; flag: string }> = {
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr', flag: '🇬🇧' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl', flag: '🇰🇼' },
  fr: { label: 'French', nativeLabel: 'Français', dir: 'ltr', flag: '🇫🇷' },
  hi: { label: 'Hindi', nativeLabel: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  ur: { label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl', flag: '🇵🇰' },
};

export const DEFAULT_LOCALE: Locale = 'en';

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/**
 * Translation dictionary shape.
 * All keys must be present in every locale.
 */
export interface TranslationDictionary {
  // Nav
  nav_features: string;
  nav_howItWorks: string;
  nav_faq: string;
  nav_dashboard: string;
  nav_launch: string;
  nav_trade: string;
  nav_liquidity: string;
  nav_ecosystem: string;
  nav_admin: string;
  nav_postLaunch: string;

  // Hero
  hero_badge_devnet: string;
  hero_badge_mainnet: string;
  hero_title: string;
  hero_titleAccent: string;
  hero_subtitle: string;
  hero_cta_launch: string;
  hero_cta_view: string;
  hero_pill_wallet: string;
  hero_pill_tiers: string;
  hero_pill_whiteLabel: string;
  hero_pill_partners: string;
  hero_pill_postLaunch: string;
  hero_pill_hardened: string;

  // Section titles
  section_directResponse: string;
  section_directResponse_title: string;
  section_directResponse_subtitle: string;
  section_whatsBuilt: string;
  section_whatsBuilt_subtitle: string;
  section_hardening: string;
  section_hardening_title: string;
  section_hardening_subtitle: string;
  section_howItWorks: string;
  section_howItWorks_subtitle: string;
  section_phases_title: string;
  section_phases_subtitle: string;
  section_feasibility: string;
  section_feasibility_subtitle: string;
  section_whyDifferent: string;
  section_whyDifferent_subtitle: string;
  section_pricing: string;
  section_pricing_subtitle: string;
  section_faq: string;
  section_cta_title: string;
  section_cta_subtitle: string;

  // Steps
  step1_title: string;
  step1_desc: string;
  step2_title: string;
  step2_desc: string;
  step3_title: string;
  step3_desc: string;
  step4_title: string;
  step4_desc: string;

  // Phases
  phase1_title: string;
  phase1_desc: string;
  phase2_title: string;
  phase2_desc: string;
  phase3_title: string;
  phase3_desc: string;

  // Feasibility cards
  feasibility_title: string;
  feasibility_text: string;
  complexity_title: string;
  complexity_text: string;
  cost_title: string;
  cost_text: string;

  // Pricing
  pricing_tokenCreation: string;
  pricing_included: string;
  pricing_platformFee: string;
  pricing_networkFee: string;
  pricing_total: string;
  pricing_devnetNote: string;

  // Footer
  footer_desc: string;
  footer_network: string;
  footer_product: string;
  footer_legal: string;
  footer_terms: string;
  footer_privacy: string;
  footer_riskDisclosure: string;
  footer_launchToken: string;
  footer_riskText: string;
  footer_jurisdictionText: string;
  footer_copyright: string;

  // Common
  common_built: string;
  common_beta: string;
  common_verified: string;
  common_hardened: string;
  common_complete: string;
  common_done: string;
  common_youAskedFor: string;
  common_builtHere: string;
  common_startNow: string;
  common_viewDashboard: string;
  common_notAffiliated: string;
  common_contactCta: string;

  // Language
  language_label: string;
}
