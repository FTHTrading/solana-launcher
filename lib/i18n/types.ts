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
  nav_pricing: string;
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

  // Status badges
  status_built: string;
  status_beta: string;
  status_verified: string;
  status_hardened: string;

  // Homepage content arrays
  homepage_requirements: Array<{ asked: string; built: string }>;
  homepage_capabilities: Array<{ name: string; desc: string }>;
  homepage_hardening: Array<{ metric: string; value: string; detail: string }>;
  homepage_mvpItems: string[];
  homepage_phase2Items: string[];
  homepage_phase3Items: string[];
  homepage_whyDifferent: Array<{ title: string; desc: string }>;
  homepage_pricingIncludes: string[];
  homepage_verifyText: string;
  homepage_discussLink: string;
  homepage_logoAlt: string;

  // Buyer-conversion sections
  section_projectMatch: string;
  section_projectMatch_title: string;
  section_projectMatch_subtitle: string;
  homepage_projectMatchItems: string[];
  homepage_bridgingStatement: string;
  section_customize: string;
  section_customize_title: string;
  section_customize_subtitle: string;
  homepage_customizeItems: Array<{ title: string; desc: string }>;
  section_timeline: string;
  section_timeline_title: string;
  homepage_timelineItems: Array<{ phase: string; time: string; detail: string }>;
  homepage_timelineNote: string;

  // Scorecard table
  section_scorecard: string;
  section_scorecard_title: string;
  section_scorecard_subtitle: string;
  scorecard_col_youAsked: string;
  scorecard_col_status: string;
  scorecard_col_forYou: string;
  homepage_scorecardItems: Array<{ asked: string; status: string; forYou: string }>;

  // Proof section
  nav_proof: string;
  hero_cta_proof: string;
  section_proof: string;
  section_proof_title: string;
  section_proof_subtitle: string;
  homepage_proofCards: Array<{ title: string; desc: string; linkLabel: string }>;
  footer_proof: string;
  footer_liveApp: string;
  footer_sourceCode: string;
  footer_setupGuide: string;
  footer_architecture: string;
  footer_verification: string;

  // Sample Devnet Launch
  section_devnetLaunch: string;
  section_devnetLaunch_title: string;
  section_devnetLaunch_subtitle: string;
  devnetLaunch_mintLabel: string;
  devnetLaunch_txLabel: string;
  devnetLaunch_metadataLabel: string;
  devnetLaunch_imageLabel: string;
  devnetLaunch_explorerLabel: string;
  devnetLaunch_viewMint: string;
  devnetLaunch_viewTx: string;
  devnetLaunch_viewMetadata: string;
  devnetLaunch_viewImage: string;
  devnetLaunch_viewExplorer: string;
  devnetLaunch_mintDesc: string;
  devnetLaunch_txDesc: string;
  devnetLaunch_metadataDesc: string;
  devnetLaunch_imageDesc: string;
  devnetLaunch_explorerDesc: string;
  devnetLaunch_tryCta: string;
  devnetLaunch_note: string;

  // Inline proof links on requirement cards
  homepage_requirementProofLinks: Array<{ label1: string; label2: string }>;

  // Legal deliverable proof
  legal_deliverableProof: string;

  // FAQ
  faq_items: Array<{ q: string; a: string }>;

  // Common additions
  common_devnet: string;
  common_mainnet: string;
}

/**
 * Simple string interpolation for translation templates.
 * Replace `{key}` placeholders with values from the vars object.
 *
 * @example
 * interpolate('Fee is {fee} SOL', { fee: 0.1 }); // 'Fee is 0.1 SOL'
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}
