import type { Metadata } from 'next';
import { TokenManageClient } from '@/components/dashboard/TokenManageClient';

interface PageProps {
  params: Promise<{ mint: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mint } = await params;
  return {
    title: `Manage Token — ${mint.slice(0, 8)}...`,
    description: 'Revoke mint authority, freeze authority, and manage your SPL token.',
  };
}

export default async function ManageTokenPage({ params }: PageProps) {
  const { mint } = await params;

  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <div className="space-y-1 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Manage Token</h1>
        <p className="text-muted-foreground text-sm font-mono">{mint}</p>
      </div>
      <TokenManageClient mintAddress={mint} />
    </div>
  );
}
