'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, AlertTriangle } from 'lucide-react';

const DISMISSED_KEY = 'compliance_banner_dismissed_v1';

export function ComplianceBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="banner"
      className="w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs"
    >
      <div className="container flex items-start gap-3 py-2.5">
        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500" />
        <p className="flex-1 leading-relaxed">
          <strong>Regulatory Notice:</strong> Digital token creation may be subject to legal
          restrictions in your jurisdiction, including Kuwait (CBK Circular 2/RB/336/2014),
          the GCC, and other MENA countries. This Platform is infrastructure software only
          and does not constitute financial advice. You are responsible for local compliance.{' '}
          <Link href="/risk-disclosure" className="underline hover:opacity-80">
            Read full disclosure
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss regulatory notice"
          className="flex-shrink-0 p-0.5 rounded hover:bg-amber-500/20 transition-colors mt-0.5"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
