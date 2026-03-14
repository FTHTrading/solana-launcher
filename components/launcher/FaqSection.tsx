'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { appConfig } from '@/lib/config/app-config';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { interpolate } from '@/lib/i18n';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { t } = useTranslation();

  const feeVars = {
    creationFee: String(appConfig.fees.creationFeeSOL),
    networkFee: String(appConfig.fees.estimatedNetworkFeeSOL),
  };

  return (
    <div className="space-y-2">
      {t.faq_items.map((item, idx) => (
        <div
          key={idx}
          className="border border-border rounded-xl overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            aria-expanded={openIdx === idx}
          >
            <span>{item.q}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200',
                openIdx === idx && 'rotate-180'
              )}
            />
          </button>
          {openIdx === idx && (
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {interpolate(item.a, feeVars)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
