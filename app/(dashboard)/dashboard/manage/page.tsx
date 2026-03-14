import type { Metadata } from 'next';
import { ManageIndexClient } from '@/components/dashboard/ManageIndexClient';

export const metadata: Metadata = {
  title: 'Manage Token Authority',
  description: 'Revoke mint and freeze authority to increase token trust and qualify for DEX listings.',
};

export default function ManagePage() {
  return (
    <div className="container max-w-2xl py-8">
      <ManageIndexClient />
    </div>
  );
}
