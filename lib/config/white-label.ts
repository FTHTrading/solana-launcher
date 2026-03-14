// =============================================
// WHITE-LABEL CONFIGURATION
//
// Multi-tenant branding system. Each deployment can
// override branding, colors, fee splits, features,
// and domain settings. Defaults to the base platform
// when no tenant override is provided.
//
// Usage:
//   - Set NEXT_PUBLIC_TENANT_ID to activate a tenant config
//   - Override individual settings via env vars
//   - Or provide a full TenantConfig object for API-driven tenants
// =============================================

export interface TenantBranding {
  name: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;    // Tailwind color or hex
  accentColor: string;
  darkMode: boolean;
  customCss?: string;       // Optional CSS overrides
  footerText?: string;
  supportEmail?: string;
  supportUrl?: string;
}

export interface TenantFees {
  creationFeeSOL: number;
  platformCutPercent: number;   // What percent of fee goes to platform owner
  tenantCutPercent: number;     // What percent goes to tenant operator
  tenantTreasuryWallet: string;
  platformTreasuryWallet: string;
}

export interface TenantFeatures {
  enableBurn: boolean;
  enableMintRevocation: boolean;
  enableFreezeRevocation: boolean;
  enableLiquidityDiscovery: boolean;
  enableLiquidityExecution: boolean;
  enableTrading: boolean;
  enablePostLaunch: boolean;
  enableReferrals: boolean;
  enablePremiumTiers: boolean;
  enableTokenPages: boolean;
  enableAnalytics: boolean;
  enableNotifications: boolean;
  enableWhaleAlerts: boolean;
  enableGovernance: boolean;
  maxLaunchesPerDay: number;
  allowedNetworks: ('devnet' | 'mainnet-beta' | 'testnet')[];
}

export interface TenantDomain {
  customDomain?: string;
  subdomain?: string;       // e.g. "client" → client.unykorn.org
  basePath?: string;
}

export interface TenantConfig {
  id: string;
  enabled: boolean;
  branding: TenantBranding;
  fees: TenantFees;
  features: TenantFeatures;
  domain: TenantDomain;
  createdAt: Date;
  updatedAt: Date;
}

// ── Default platform configuration ──────────────────────────

const DEFAULT_BRANDING: TenantBranding = {
  name: 'Solana Launcher',
  tagline: 'Launch SPL tokens on Solana — fast, verified, production-ready.',
  logoUrl: '/images/brand/logo-primary.png',
  faviconUrl: '/favicon.ico',
  primaryColor: '#6366f1',   // indigo-500
  accentColor: '#8b5cf6',    // violet-500
  darkMode: true,
  footerText: '© 2026 Solana Launcher. Built on Solana.',
  supportEmail: 'kevan@unykorn.org',
};

const DEFAULT_FEES: TenantFees = {
  creationFeeSOL: 0.1,
  platformCutPercent: 100,
  tenantCutPercent: 0,
  tenantTreasuryWallet: '',
  platformTreasuryWallet: process.env.NEXT_PUBLIC_TREASURY_WALLET?.trim() ?? '',
};

const DEFAULT_FEATURES: TenantFeatures = {
  enableBurn: true,
  enableMintRevocation: true,
  enableFreezeRevocation: true,
  enableLiquidityDiscovery: true,
  enableLiquidityExecution: false,   // Phase 2
  enableTrading: true,
  enablePostLaunch: true,
  enableReferrals: true,
  enablePremiumTiers: true,
  enableTokenPages: true,
  enableAnalytics: true,
  enableNotifications: true,
  enableWhaleAlerts: true,
  enableGovernance: false,           // Phase 3
  maxLaunchesPerDay: 50,
  allowedNetworks: ['devnet', 'mainnet-beta'],
};

const DEFAULT_DOMAIN: TenantDomain = {
  customDomain: undefined,
  subdomain: undefined,
  basePath: undefined,
};

// ── Tenant registry ─────────────────────────────────────────

const TENANT_REGISTRY: Record<string, Partial<TenantConfig>> = {
  // Example white-label tenant:
  // 'client-kuwait': {
  //   branding: {
  //     ...DEFAULT_BRANDING,
  //     name: 'Kuwait Token Lab',
  //     tagline: 'Launch your Solana token — Kuwait edition',
  //     primaryColor: '#059669',
  //     supportEmail: 'support@kuwaittokenlab.com',
  //   },
  //   fees: {
  //     ...DEFAULT_FEES,
  //     creationFeeSOL: 0.15,
  //     platformCutPercent: 70,
  //     tenantCutPercent: 30,
  //     tenantTreasuryWallet: 'TENANT_WALLET_ADDRESS_HERE',
  //   },
  //   domain: {
  //     customDomain: 'kuwaittokenlab.com',
  //   },
  // },
};

// ── Resolver ────────────────────────────────────────────────

const tenantId = (process.env.NEXT_PUBLIC_TENANT_ID ?? '').trim();

function resolveTenant(): TenantConfig {
  const override = tenantId ? TENANT_REGISTRY[tenantId] : undefined;

  return {
    id: tenantId || 'default',
    enabled: true,
    branding: { ...DEFAULT_BRANDING, ...override?.branding },
    fees: { ...DEFAULT_FEES, ...override?.fees },
    features: { ...DEFAULT_FEATURES, ...override?.features },
    domain: { ...DEFAULT_DOMAIN, ...override?.domain },
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date(),
  };
}

export const tenantConfig = resolveTenant();

// ── Helpers ─────────────────────────────────────────────────

export function isWhiteLabeled(): boolean {
  return tenantConfig.id !== 'default';
}

export function getTenantFeeBreakdown(baseFeeSOL: number) {
  const { platformCutPercent, tenantCutPercent } = tenantConfig.fees;
  return {
    totalFeeSOL: baseFeeSOL,
    platformShareSOL: (baseFeeSOL * platformCutPercent) / 100,
    tenantShareSOL: (baseFeeSOL * tenantCutPercent) / 100,
    platformWallet: tenantConfig.fees.platformTreasuryWallet,
    tenantWallet: tenantConfig.fees.tenantTreasuryWallet,
  };
}

export function isFeatureEnabled(feature: keyof TenantFeatures): boolean {
  const value = tenantConfig.features[feature];
  return typeof value === 'boolean' ? value : true;
}

export function getTenantBranding(): TenantBranding {
  return tenantConfig.branding;
}

/**
 * Generate a white-label deployment manifest for a new tenant.
 * Used by the admin API to provision new white-label instances.
 */
export function generateTenantManifest(config: {
  tenantName: string;
  domain: string;
  treasuryWallet: string;
  feeSOL: number;
  platformCutPercent: number;
  primaryColor?: string;
  supportEmail?: string;
}): TenantConfig {
  return {
    id: config.tenantName.toLowerCase().replace(/\s+/g, '-'),
    enabled: true,
    branding: {
      ...DEFAULT_BRANDING,
      name: config.tenantName,
      tagline: `Launch tokens on ${config.tenantName}`,
      primaryColor: config.primaryColor ?? DEFAULT_BRANDING.primaryColor,
      supportEmail: config.supportEmail,
    },
    fees: {
      creationFeeSOL: config.feeSOL,
      platformCutPercent: config.platformCutPercent,
      tenantCutPercent: 100 - config.platformCutPercent,
      tenantTreasuryWallet: config.treasuryWallet,
      platformTreasuryWallet: DEFAULT_FEES.platformTreasuryWallet,
    },
    features: DEFAULT_FEATURES,
    domain: {
      customDomain: config.domain,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
