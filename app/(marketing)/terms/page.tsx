import type { Metadata } from 'next';
import Link from 'next/link';
import { appConfig } from '@/lib/config/app-config';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${appConfig.app.name}`,
};

const EFFECTIVE_DATE = '1 January 2025';

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Effective date: {EFFECTIVE_DATE}</p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-foreground/80">

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using {appConfig.app.name} (the &ldquo;Platform&rdquo;), you agree to be
            bound by these Terms of Service. If you do not agree, you must not use the Platform.
          </p>
        </Section>

        <Section title="2. Nature of the Service">
          <p>
            {appConfig.app.name} is a <strong>non-custodial software tool</strong> that provides
            an interface for interacting with the Solana blockchain. Specifically:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>The Platform facilitates the creation of Solana SPL tokens on behalf of users.</li>
            <li>
              The Platform does <strong>not</strong> hold, manage, or control your funds, private
              keys, or tokens at any time.
            </li>
            <li>All transactions are signed by your wallet and broadcast directly to the Solana network.</li>
            <li>
              The Platform does <strong>not</strong> constitute a financial service, securities
              dealer, investment adviser, broker, or money services business.
            </li>
          </ul>
        </Section>

        <Section title="3. Eligibility & Jurisdictional Compliance">
          <p className="font-semibold text-foreground">
            You are solely responsible for determining whether your use of this Platform is legal
            in your jurisdiction.
          </p>
          <p className="mt-2">
            The regulatory treatment of blockchain tokens, cryptocurrencies, and digital assets
            varies significantly across countries and territories. In some jurisdictions, activities
            facilitated by this Platform may be restricted, prohibited, or subject to licensing
            requirements.
          </p>
          <div className="mt-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="font-semibold text-amber-600 dark:text-amber-400">
              Notice for Users in Kuwait and the Gulf Region
            </p>
            <p className="mt-1">
              The Central Bank of Kuwait (CBK) has issued guidance (Circular No. 2/RB/336/2014 and
              subsequent communications) advising caution with virtual assets. Financial institutions
              in Kuwait are prohibited from providing services related to virtual currencies.
              Individual ownership of tokens may occupy a legal gray area under current Kuwaiti law.
            </p>
            <p className="mt-1">
              If you are located in Kuwait, the Gulf Cooperation Council (GCC), or any other
              jurisdiction with restrictions on digital assets, you must independently verify
              whether your use of this Platform and creation of tokens is legally permissible.
              You acknowledge that you have done so before proceeding.
            </p>
          </div>
          <p className="mt-2">
            By using this Platform you represent that: (a) you are of legal age in your
            jurisdiction; (b) you are not located in a jurisdiction where use is prohibited; and
            (c) you have obtained any required legal or regulatory approvals.
          </p>
        </Section>

        <Section title="4. Token Creation — No Investment Offering">
          <p>
            Tokens created through this Platform are technical instruments on the Solana blockchain.
            They carry <strong>no inherent monetary value</strong> and do not represent equity,
            debt, revenue rights, or any other financial instrument unless explicitly structured
            as such by the token creator under applicable securities law.
          </p>
          <p className="mt-2">
            Listing tokens on secondary markets, offering them for sale, or marketing them as an
            investment may trigger securities, commodities, or money services regulations in your
            jurisdiction. You are solely responsible for compliance with any such obligations.
          </p>
        </Section>

        <Section title="5. Fees">
          <p>
            The Platform charges a flat fee of {appConfig.fees.creationFeeSOL} SOL per token
            creation, collected atomically within the same transaction as the token mint operation.
            This fee is clearly disclosed before any transaction is signed by you. Fees are
            non-refundable once the transaction has been confirmed on-chain.
          </p>
        </Section>

        <Section title="6. No Warranties">
          <p>
            THE PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. WE DO NOT
            WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR RESULT IN SUCCESSFUL
            TOKEN CREATION AT ALL TIMES. BLOCKCHAIN NETWORKS ARE OUTSIDE OUR CONTROL AND MAY
            EXPERIENCE CONGESTION, FORKS, OR PROTOCOL CHANGES.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE PLATFORM AND ITS OPERATORS
            SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, INCLUDING LOSS OF FUNDS, REGULATORY FINES, LOSS OF PROFITS, OR DATA LOSS,
            ARISING OUT OF YOUR USE OF THE PLATFORM.
          </p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>
            You retain all rights to token names, symbols, images, and other content you upload.
            By uploading content, you grant us a limited licence to display and store that content
            solely for the purpose of providing the service.
          </p>
        </Section>

        <Section title="9. Prohibited Uses">
          <p>You must not use the Platform to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Create tokens designed to defraud, mislead, or harm other users.</li>
            <li>Infringe on trademarks, copyrights, or intellectual property rights of third parties.</li>
            <li>Circumvent applicable anti-money laundering (AML) or know-your-customer (KYC) obligations.</li>
            <li>Violate any applicable law or regulation.</li>
          </ul>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            jurisdiction in which the operator is incorporated, without regard to conflict of law
            principles. Any disputes shall be resolved through binding arbitration.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We reserve the right to update these Terms at any time. Continued use of the Platform
            after a change constitutes acceptance of the revised Terms.
          </p>
        </Section>

        <div className="pt-4 border-t border-border text-xs text-muted-foreground">
          For questions about these terms, see our{' '}
          <Link href="/risk-disclosure" className="underline hover:text-foreground">Risk Disclosure</Link>{' '}
          and{' '}
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
