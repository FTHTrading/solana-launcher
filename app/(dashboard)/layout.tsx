import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { ComplianceBanner } from '@/components/compliance/ComplianceBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ComplianceBanner />
      <SiteHeader />
      <main className="flex-1 bg-muted/20">{children}</main>
      <SiteFooter />
    </div>
  );
}
