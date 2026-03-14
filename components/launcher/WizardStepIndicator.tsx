'use client';

import { cn } from '@/lib/utils/utils';
import type { WizardStep, WizardStepConfig } from '@/types';

interface WizardStepIndicatorProps {
  steps: WizardStepConfig[];
  currentStep: WizardStep;
}

export function WizardStepIndicator({ steps, currentStep }: WizardStepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((s, idx) => {
        const isDone = s.step < currentStep;
        const isActive = s.step === currentStep;

        return (
          <div key={s.step} className="flex items-center flex-1">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all',
                  isDone &&
                    'bg-brand-500 border-brand-500 text-white',
                  isActive &&
                    'border-brand-500 text-brand-500 bg-brand-500/10',
                  !isDone &&
                    !isActive &&
                    'border-border text-muted-foreground bg-background'
                )}
              >
                {isDone ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.step
                )}
              </div>
              <span
                className={cn(
                  'text-xs hidden sm:block text-center truncate max-w-[80px]',
                  isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                {s.title}
              </span>
            </div>

            {/* Connector */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px mx-2 -mt-5',
                  isDone ? 'bg-brand-500' : 'bg-border'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
