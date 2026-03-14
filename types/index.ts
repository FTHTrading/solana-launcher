// =============================================
// CORE DOMAIN TYPES
// =============================================

export type SolanaNetwork = 'devnet' | 'mainnet-beta' | 'testnet';

// ----- Token Types -----

export interface TokenFormData {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string; // string to handle large numbers safely in forms
  description: string;
  image: File | null;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string; // IPFS URI
  external_url?: string;
  attributes?: TokenAttribute[];
  properties?: {
    links?: {
      website?: string;
      twitter?: string;
      telegram?: string;
      discord?: string;
    };
  };
}

export interface TokenAttribute {
  trait_type: string;
  value: string | number;
}

export interface CreatedToken {
  mintAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  metadataUri: string;
  imageUri: string;
  description: string;
  createdAt: Date;
  creatorWallet: string;
  network: SolanaNetwork;
  txSignature: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

// ----- Fee Types -----

export interface FeeBreakdown {
  platformFeeSOL: number;
  estimatedNetworkFeeSOL: number;
  totalEstimatedSOL: number;
  treasuryWallet: string;
}

// ----- Storage Types -----

export type StorageProvider = 'pinata' | 'nft-storage' | 'web3-storage';

export interface UploadResult {
  uri: string;
  provider: StorageProvider;
}

export interface MetadataUploadResult extends UploadResult {
  metadata: TokenMetadata;
}

// ----- Analytics / Events -----

export type AnalyticsEvent =
  | { name: 'wallet_connected'; properties: { wallet: string; network: string } }
  | { name: 'wizard_started'; properties?: Record<string, unknown> }
  | { name: 'wizard_abandoned'; properties: { step: number; stepName: string } }
  | { name: 'wizard_step_completed'; properties: { step: number; stepName: string } }
  | { name: 'token_creation_attempted'; properties: { name: string; symbol: string; supply: string } }
  | { name: 'token_creation_success'; properties: { mintAddress: string; name: string; symbol: string; feeSOL: number } }
  | { name: 'token_creation_failure'; properties: { error: string; step: string } }
  | { name: 'burn_attempted'; properties: { mintAddress: string; amount: string } }
  | { name: 'burn_success'; properties: { mintAddress: string; amount: string; txSignature: string } }
  | { name: 'burn_failure'; properties: { mintAddress: string; error: string } }
  | { name: 'page_viewed'; properties: { page: string } };

// ----- Transaction Types -----

export type TransactionStatus = 'idle' | 'signing' | 'confirming' | 'success' | 'error';

export interface TransactionState {
  status: TransactionStatus;
  signature?: string;
  error?: string;
}

export interface TransactionStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'success' | 'error';
}

// ----- Wizard Types -----

export type WizardStep = 1 | 2 | 3 | 4;

export interface WizardStepConfig {
  step: WizardStep;
  title: string;
  description: string;
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  { step: 1, title: 'Token Details', description: 'Name, symbol, supply, and decimals' },
  { step: 2, title: 'Branding & Links', description: 'Image, description, and social links' },
  { step: 3, title: 'Review', description: 'Confirm your token configuration' },
  { step: 4, title: 'Launch', description: 'Sign and deploy your token' },
];

// ----- Error Types -----

export type AppErrorCode =
  | 'WALLET_NOT_CONNECTED'
  | 'WALLET_REJECTED'
  | 'INSUFFICIENT_FUNDS'
  | 'RPC_ERROR'
  | 'UPLOAD_FAILED'
  | 'METADATA_FAILED'
  | 'MINT_FAILED'
  | 'INVALID_INPUT'
  | 'BURN_FAILED'
  | 'TRANSACTION_EXPIRED'
  | 'SIMULATION_FAILED'
  | 'UNKNOWN';

export interface AppError {
  code: AppErrorCode;
  message: string;
  userMessage: string; // safe message shown to user
  raw?: unknown;
}

// ----- Dashboard Types -----

export interface TokenAction {
  id: string;
  type: 'create' | 'burn' | 'mint';
  mintAddress: string;
  tokenName: string;
  tokenSymbol: string;
  amount?: string;
  txSignature: string;
  timestamp: Date;
  status: 'success' | 'failed';
  network: SolanaNetwork;
}

// ----- Admin / Future Extensions -----
// These types are stubs for future admin and premium features.

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceSOL: number;
  features: string[];
}

export interface ReferralInfo {
  code: string;
  referrerWallet: string;
  discountPercent: number;
}

export interface LaunchPackage {
  tier: PricingTier;
  referral?: ReferralInfo;
  options: {
    revokeMintAuthority: boolean;
    revokeFreezeAuthority: boolean;
    featuredLaunch: boolean;
    generateTokenPage: boolean;
  };
}
