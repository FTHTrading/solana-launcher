'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Badge } from '@/components/ui/badge';
import { appConfig, isMainnet } from '@/lib/config/app-config';
import { truncateAddress } from '@/lib/utils/utils';

const TREASURY_WALLET = process.env.NEXT_PUBLIC_TREASURY_WALLET ?? '';

export function SiteHeader() {
  const { publicKey, connected } = useWallet();
  const isAdmin = connected && publicKey && TREASURY_WALLET && publicKey.toBase58() === TREASURY_WALLET;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/images/brand/logo-mark.png"
            alt={appConfig.app.name}
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-foreground">{appConfig.app.name}</span>
          {!isMainnet() && (
            <Badge variant="devnet" className="hidden sm:inline-flex">
              Devnet
            </Badge>
          )}
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {!connected && (
            <>
              <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </>
          )}
          {connected && (
            <>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/launch" className="text-muted-foreground hover:text-foreground transition-colors">
                Launch
              </Link>
              <Link href="/trade" className="text-muted-foreground hover:text-foreground transition-colors">
                Trade
              </Link>
              <Link href="/liquidity" className="text-muted-foreground hover:text-foreground transition-colors">
                Liquidity
              </Link>
              <Link href="/ecosystem" className="text-muted-foreground hover:text-foreground transition-colors">
                Ecosystem
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-amber-500">
                  Admin
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Wallet */}
        <div className="flex items-center gap-3">
          {connected && publicKey && (
            <span className="hidden sm:block text-xs text-muted-foreground font-mono">
              {truncateAddress(publicKey.toBase58())}
            </span>
          )}
          <WalletMultiButton
            style={{
              background: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              borderRadius: '8px',
              height: '38px',
              fontSize: '14px',
              padding: '0 16px',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
    </header>
  );
}

