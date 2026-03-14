import type { Metadata } from 'next';
import Link from 'next/link';
import { appConfig } from '@/lib/config/app-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${appConfig.app.name}`,
};

const EFFECTIVE_DATE = '1 January 2025';

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/80">

        <Section title="1. Overview">
          <p>
            {appConfig.app.name} is a non-custodial, wallet-connected application.
            We are designed to collect as little personal information as possible. This policy
            explains what data we collect, why, and how it is handled.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">2.1 Wallet Address (Public — On-Chain)</p>
              <p className="mt-1">
                When you connect a wallet and create a token, your Solana wallet address is
                embedded in the on-chain transaction and is publicly visible on the Solana
                blockchain. This is inherent to how blockchain technology works and cannot be
                removed by us.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">2.2 Token Metadata You Submit</p>
              <p className="mt-1">
                Token name, symbol, description, and the image you upload are stored on IPFS
                (InterPlanetary File System) via Pinata. IPFS content is public and
                content-addressed — it is accessible to anyone who knows the IPFS CID.
                Do <strong>not</strong> upload personally identifiable information as token metadata.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">2.3 Analytics (Optional / Aggregated)</p>
              <p className="mt-1">
                We may collect anonymised, aggregated analytics events (e.g., wizard step
                completion rates, feature usage) to improve the product. We do not collect
                names, email addresses, or any personal identifiers unless you contact us
                directly. Analytics adapters can be configured to use privacy-respecting
                providers such as PostHog.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">2.4 Server Logs</p>
              <p className="mt-1">
                Standard web server logs (IP address, browser user agent, request path, timestamp)
                may be collected by hosting infrastructure (e.g., Vercel) as part of normal
                operations. These are retained according to the hosting provider&apos;s own policy.
              </p>
            </div>
          </div>
        </Section>

        <Section title="3. Information We Do NOT Collect">
          <ul className="list-disc pl-6 space-y-1">
            <li>Private keys or seed phrases — never, under any circumstances.</li>
            <li>Names, email addresses, phone numbers, or government IDs.</li>
            <li>Payment card or bank account information.</li>
          </ul>
        </Section>

        <Section title="4. How We Use Information">
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and improve the token launch service.</li>
            <li>To aggregate anonymous usage analytics for product development.</li>
            <li>To comply with legal obligations where applicable.</li>
          </ul>
        </Section>

        <Section title="5. IPFS and Blockchain Data">
          <p>
            Data written to the Solana blockchain or to IPFS is <strong>permanent and public</strong>.
            We have no ability to delete or modify data once published on-chain or to IPFS. Before
            uploading any content, ensure you are comfortable with it being permanently public.
          </p>
        </Section>

        <Section title="6. Third-Party Services">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Pinata</strong> — IPFS storage provider. See{' '}
              <a href="https://www.pinata.cloud/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                Pinata Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>Solana RPC Providers</strong> — Your transactions are broadcast to Solana via
              RPC nodes; these providers may log transaction metadata per their own policies.
            </li>
            <li>
              <strong>Wallet Adapters</strong> — Phantom, Solflare, and other wallets are
              third-party software. Their privacy policies govern data they collect.
            </li>
          </ul>
        </Section>

        <Section title="7. Cookies">
          <p>
            This application uses minimal browser storage (localStorage / sessionStorage)
            for functional purposes such as persisting wizard state. We do not use tracking cookies
            for advertising purposes.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>
            Because most data we process is either public blockchain data or anonymised analytics,
            there is limited personally identifiable data for which we can accept deletion requests.
            If you believe we hold personal data about you (e.g., from direct communications),
            you may contact us to request access or deletion.
          </p>
          <p className="mt-2">
            Users in jurisdictions with formal data protection laws (e.g., GDPR in the EU,
            equivalent legislation) retain applicable rights under those laws.
          </p>
        </Section>

        <Section title="9. Children">
          <p>
            The Platform is not intended for users under the age of 18 (or the applicable age of
            majority in your jurisdiction). We do not knowingly collect data from minors.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The effective date at the top of
            this page will reflect when changes were made.
          </p>
        </Section>

        <div className="pt-4 border-t border-border text-xs text-muted-foreground">
          See also:{' '}
          <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>{' '}
          &bull;{' '}
          <Link href="/risk-disclosure" className="underline hover:text-foreground">Risk Disclosure</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}
