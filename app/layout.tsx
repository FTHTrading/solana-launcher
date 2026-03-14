import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletContextProvider } from '@/components/wallet/WalletContextProvider';
import { appConfig } from '@/lib/config/app-config';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: {
    default: appConfig.app.name,
    template: `%s | ${appConfig.app.name}`,
  },
  description:
    'Create your own Solana SPL token in minutes. No coding required. Simple, transparent, and secure.',
  keywords: ['Solana', 'SPL Token', 'Token Launcher', 'Meme Coin', 'Web3', 'Crypto'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: appConfig.app.url,
    siteName: appConfig.app.name,
    title: appConfig.app.name,
    description:
      'Create your own Solana SPL token in minutes. No coding required.',
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.app.name,
    description: 'Create your own Solana SPL token in minutes.',
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
        <ReactQueryProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
