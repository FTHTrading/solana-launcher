import type { Metadata } from 'next';
import { AdminClient } from '@/components/admin/AdminClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Treasury and platform administration.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="container max-w-4xl py-8">
      <AdminClient />
    </div>
  );
}
