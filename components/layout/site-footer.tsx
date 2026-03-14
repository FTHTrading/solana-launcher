'use client';

import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { appConfig } from '@/lib/config/app-config';
import { useTranslation } from '@/lib/i18n/i18n-context';

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <Rocket className="h-4 w-4 text-brand-500" />
              <span>{appConfig.app.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t.footer_desc}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {t.footer_network}: {appConfig.solana.network}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">{t.footer_product}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">{t.nav_features}</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground transition-colors">{t.nav_howItWorks}</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition-colors">{t.nav_faq}</Link></li>
              <li><Link href="/launch" className="hover:text-foreground transition-colors">{t.footer_launchToken}</Link></li>
            </ul>
          </div>

          {/* Proof */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">{t.footer_proof}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="https://launch.unykorn.org" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer_liveApp}</a></li>
              <li><a href="https://github.com/FTHTrading/solana-launcher" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer_sourceCode}</a></li>
              <li><a href="https://github.com/FTHTrading/solana-launcher/blob/main/SETUP.md" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer_setupGuide}</a></li>
              <li><a href="https://github.com/FTHTrading/solana-launcher/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer_architecture}</a></li>
              <li><a href="https://github.com/FTHTrading/solana-launcher/blob/main/BID_PROPOSAL.md" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t.footer_verification}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">{t.footer_legal}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">{t.footer_terms}</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">{t.footer_privacy}</Link></li>
              <li><Link href="/risk-disclosure" className="hover:text-foreground transition-colors">{t.footer_riskDisclosure}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/30 space-y-3">
          <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-3xl">
            {t.footer_riskText}
          </p>
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-3xl">
            {t.footer_jurisdictionText}
          </p>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} {appConfig.app.name}. {t.common_notAffiliated}
          </p>
        </div>
      </div>
    </footer>
  );
}
