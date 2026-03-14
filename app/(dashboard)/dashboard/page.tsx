import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your Solana tokens.',
};

export default function DashboardPage() {
  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage your created tokens and recent actions.
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
