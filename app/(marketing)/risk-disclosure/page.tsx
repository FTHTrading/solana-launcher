import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { appConfig } from '@/lib/config/app-config';

export const metadata: Metadata = {
  title: 'Risk Disclosure',
  description: `Risk Disclosure Statement for ${appConfig.app.name}`,
};

export default function RiskDisclosurePage() {
  return (
    <div className="container max-w-3xl py-16 space-y-8">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-1">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Disclosure Statement</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Please read this carefully before using the Platform.
          </p>
        </div>
      </div>

      <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
        <p className="font-semibold text-amber-600 dark:text-amber-400">
          Important: High-Risk Activity
        </p>
        <p className="text-sm text-foreground/80">
          Creating and distributing digital tokens carries substantial financial, legal, and
          technical risks. You may lose all funds involved. Do not proceed unless you fully
          understand and accept these risks.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/80">

        <Section title="1. Irreversibility of Blockchain Transactions">
          <p>
            All transactions on the Solana blockchain are <strong>irreversible</strong>. Once a
            token creation transaction is confirmed on-chain, it cannot be undone, cancelled, or
            reversed by us or by you. Any fees paid are non-refundable. Ensure you have reviewed
            all token parameters carefully before signing any transaction.
          </p>
        </Section>

        <Section title="2. No Inherent Token Value">
          <p>
            Tokens created on this Platform have <strong>no inherent monetary value</strong> by
            default. A token is a technical record on the Solana blockchain. Its market value, if
            any, is determined entirely by secondary market participants and is highly speculative.
            Token prices can fall to zero rapidly and without warning.
          </p>
        </Section>

        <Section title="3. Smart Contract and Protocol Risks">
          <p>
            This Platform uses standard Solana SPL Token Program and Metaplex Token Metadata
            Program smart contracts. While these are widely used and audited open-source programs,
            no smart contract system is entirely free from bugs or vulnerabilities. Protocol upgrades
            or exploits in underlying programs are outside our control.
          </p>
        </Section>

        <Section title="4. Network Risk">
          <p>
            The Solana network may experience degraded performance, congestion, outages, or
            validator issues. This can cause:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Transaction failures after signing.</li>
            <li>Transaction expiration due to block height limits.</li>
            <li>Delayed confirmations.</li>
          </ul>
          <p className="mt-2">
            We implement retry and re-broadcast logic, but cannot guarantee transaction success
            under all network conditions.
          </p>
        </Section>

        <Section title="5. Regulatory and Legal Risk">
          <div className="space-y-3">
            <p>
              The regulatory landscape for digital assets, tokens, and cryptocurrencies is rapidly
              evolving and varies significantly by jurisdiction. Creating, distributing, selling, or
              marketing tokens may constitute an unregistered securities offering, money transmission,
              or other regulated activity depending on how the token is structured and where it is
              offered.
            </p>

            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="font-semibold text-amber-600 dark:text-amber-400">Kuwait — Specific Notice</p>
              <p className="mt-1">
                The Central Bank of Kuwait (CBK) has issued Circular No. 2/RB/336/2014 and
                subsequent guidance restricting Kuwaiti financial institutions from facilitating
                cryptocurrency transactions. The Capital Markets Authority (CMA) of Kuwait governs
                financial instruments under Law No. 7 of 2010.
              </p>
              <p className="mt-1">
                While individual ownership of digital tokens has not been explicitly criminalised
                in Kuwait as of this writing, the regulatory status is <strong>uncertain and evolving</strong>.
                Kuwaiti users should seek independent legal advice before creating, holding, or
                distributing tokens. This Platform does not constitute legal advice.
              </p>
            </div>

            <div className="p-4 bg-muted/50 border border-border rounded-lg">
              <p className="font-semibold text-foreground">GCC and MENA Region</p>
              <p className="mt-1">
                Several Gulf Cooperation Council (GCC) member states have issued separate guidance
                on virtual assets. The UAE, Bahrain, and Saudi Arabia have established licensing
                frameworks, while other jurisdictions remain unregulated or have issued caution
                notices. Always verify local requirements.
              </p>
            </div>

            <p>
              You are solely and exclusively responsible for determining whether your use of this
              Platform complies with the laws of your jurisdiction, obtaining any required
              approvals or licences, and fulfilling any tax, reporting, or disclosure obligations
              that arise from token creation or distribution.
            </p>
          </div>
        </Section>

        <Section title="6. Wallet and Key Security Risk">
          <p>
            You are solely responsible for the security of your Solana wallet and private keys.
            If your private key is compromised, any tokens or SOL in your wallet can be stolen
            and cannot be recovered. Never share your seed phrase with anyone, including this Platform.
            This Platform never requests your seed phrase or private key.
          </p>
        </Section>

        <Section title="7. Liquidity Risk">
          <p>
            Tokens created on this Platform are not automatically listed on any decentralised or
            centralised exchange. There is no guarantee that any secondary market will develop for
            your token. You may be unable to sell or transfer your tokens at any price.
          </p>
        </Section>

        <Section title="8. IPFS Persistence Risk">
          <p>
            Token metadata and images are stored on IPFS via a pinning service. If the pinning
            service is discontinued or the content is unpinned, metadata may become inaccessible,
            causing your token to display without a name, symbol, or image in wallets and explorers.
            Consider pinning metadata with multiple services for redundancy.
          </p>
        </Section>

        <Section title="9. No Financial Advice">
          <p>
            Nothing on this Platform constitutes financial, investment, legal, or tax advice.
            This Platform is technical infrastructure only. Consult qualified professional advisers
            before making any financial or legal decisions.
          </p>
        </Section>

        <div className="pt-4 border-t border-border text-xs text-muted-foreground">
          By using the Platform, you confirm you have read and understood this Risk Disclosure.
          See also:{' '}
          <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>{' '}
          &bull;{' '}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
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
