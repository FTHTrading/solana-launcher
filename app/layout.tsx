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
    default: appConfig.app.name,
    template: `%s | ${appConfig.app.name}`,
  },
  description:
    'Create your own Solana SPL token in minutes. No coding required. Simple, transparent, and secure.',
  keywords: ['Solana', 'SPL Token', 'Token Launcher', 'Meme Coin', 'Web3', 'Crypto', 'Token Creator'],
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
    title: appConfig.app.name,
    description:
      'Create your own Solana SPL token in minutes. No coding required.',
    images: [{ url: `${appConfig.app.url}/images/brand/logo-primary.png`, width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.app.name,
    description: 'Create your own Solana SPL token in minutes.',
    images: [`${appConfig.app.url}/images/brand/logo-primary.png`],
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
