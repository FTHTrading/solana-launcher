'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { appConfig } from '@/lib/config/app-config';

// =============================================
// WALLET GUARD
//
// Reusable wrapper that renders a "Connect Wallet"
// CTA when no wallet is connected. Displays the
// current network prominently so users can confirm
// they're on the right chain before interacting.
//
// Usage:
//   <WalletGuard
//     icon={<Settings2 className="h-6 w-6 text-orange-500" />}
//     title="Admin Access Required"
//     description="Connect the treasury wallet to access admin controls."
//   >
//     <MyProtectedContent />
//   </WalletGuard>
// =============================================

interface WalletGuardProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

export function WalletGuard({
  children,
  icon,
  title = 'Connect Your Wallet',
  description = 'Connect your Solana wallet to continue.',
}: WalletGuardProps) {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  if (!connected || !publicKey) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="h-16 w-16 rounded-full bg-brand-500/10 flex items-center justify-center">
          {icon ?? <Wallet className="h-7 w-7 text-brand-500" />}
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
        <Badge variant="devnet" className="text-xs">
          {appConfig.solana.network === 'mainnet-beta' ? 'Mainnet' : appConfig.solana.network}
        </Badge>
        <Button variant="gradient" size="lg" onClick={() => setVisible(true)}>
          Connect Wallet
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
