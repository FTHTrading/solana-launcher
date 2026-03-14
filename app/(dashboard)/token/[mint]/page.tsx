import { TokenPageClient } from '@/components/token/TokenPageClient';

interface TokenPageProps {
  params: { mint: string };
}

export default function TokenPage({ params }: TokenPageProps) {
  return <TokenPageClient mintAddress={params.mint} />;
}

export async function generateMetadata({ params }: TokenPageProps) {
  const { mint } = params;
  const shortMint = `${mint.slice(0, 6)}...${mint.slice(-4)}`;

  return {
    title: `Token ${shortMint} | Solana Launcher`,
    description: `View details, stats, and trading options for Solana SPL token ${shortMint}. Launched on Solana Launcher.`,
    openGraph: {
      title: `Token ${shortMint}`,
      description: `Solana SPL token ${shortMint} — view on-chain data, metadata, authority status, and trading routes.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Token ${shortMint} | Solana Launcher`,
      description: `View on-chain details for Solana SPL token ${shortMint}`,
    },
  };
}
