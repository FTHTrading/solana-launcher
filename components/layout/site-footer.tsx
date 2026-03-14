import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { appConfig } from '@/lib/config/app-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 font-semibold">
              <Rocket className="h-4 w-4 text-brand-500" />
              <span>{appConfig.app.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A simple, transparent tool for creating Solana SPL tokens. 
              No technical knowledge required.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Network: {appConfig.solana.network}
            </p>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link href="/launch" className="hover:text-foreground transition-colors">Launch Token</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/risk-disclosure" className="hover:text-foreground transition-colors">Risk Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/30 space-y-3">
          <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-3xl">
            <strong>Risk Disclosure:</strong> Launching tokens on public blockchains carries
            significant financial and legal risks. This tool is provided as infrastructure
            software only. You are solely responsible for ensuring your token launch complies
            with all applicable laws and regulations in your jurisdiction. Token launchers
            may have regulatory implications depending on how tokens are marketed, sold, or
            distributed. This is not financial or legal advice.
          </p>
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-3xl">
            <strong>Jurisdictional Notice:</strong> The regulatory treatment of digital tokens
            varies by country. Users in Kuwait should be aware of CBK Circular No. 2/RB/336/2014
            and related guidance from the Capital Markets Authority. Users across the Gulf and MENA
            region should independently verify compliance with local laws before proceeding.
          </p>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} {appConfig.app.name}. Not affiliated with Solana Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}
