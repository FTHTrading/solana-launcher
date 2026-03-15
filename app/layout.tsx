import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletContextProvider } from '@/components/wallet/WalletContextProvider';
import { appConfig } from '@/lib/config/app-config';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { I18nProvider } from '@/lib/i18n/i18n-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const viewport: Viewport = {
  themeColor: '#7c3aed',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${appConfig.app.name} — Create SPL Tokens in Minutes`,
    template: `%s | ${appConfig.app.name}`,
  },
  description:
    'Launch your own Solana SPL token with custom branding, IPFS metadata, and on-chain Metaplex verification. Non-custodial. From 0.1 SOL. No coding required.',
  keywords: [
    'Solana token creator',
    'SPL token launcher',
    'meme coin launcher',
    'Solana token maker',
    'create Solana token',
    'no code token creator',
    'SPL token',
    'Solana meme coin',
    'token launcher',
    'Metaplex',
    'IPFS metadata',
    'Solana DeFi',
  ],
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    { rel: 'icon', url: '/images/brand/logo-mark.png', type: 'image/png', sizes: '512x512' },
    { rel: 'apple-touch-icon', url: '/images/brand/logo-primary.png' },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: appConfig.app.name,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appConfig.app.url,
    siteName: appConfig.app.name,
    title: `${appConfig.app.name} — Create SPL Tokens on Solana`,
    description:
      'Launch your own Solana SPL token with custom branding, IPFS metadata, and on-chain verification. Non-custodial. From 0.1 SOL.',
    images: [{ url: `${appConfig.app.url}/images/brand/logo-primary.png`, width: 512, height: 512, alt: 'Solana Launcher' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appConfig.app.name} — Create SPL Tokens on Solana`,
    description:
      'Launch your own Solana SPL token with custom branding, IPFS metadata, and on-chain verification. Non-custodial. From 0.1 SOL.',
    images: [`${appConfig.app.url}/images/brand/logo-primary.png`],
  },
  alternates: {
    canonical: appConfig.app.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <I18nProvider>
          <ReactQueryProvider>
            <WalletContextProvider>{children}</WalletContextProvider>
          </ReactQueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
