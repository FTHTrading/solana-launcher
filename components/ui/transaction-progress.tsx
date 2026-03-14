'use client';

import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface Step {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'success' | 'error';
}

interface TransactionProgressProps {
  steps: Step[];
  currentStep?: string;
  className?: string;
}

export function TransactionProgress({ steps, className }: TransactionProgressProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {step.status === 'success' && (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            )}
            {step.status === 'active' && (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            )}
            {step.status === 'error' && (
              <XCircle className="h-5 w-5 text-destructive" />
            )}
            {step.status === 'pending' && (
              <Circle className="h-5 w-5 text-muted-foreground/40" />
            )}
          </div>
          <span
            className={cn(
              'text-sm',
              step.status === 'active' && 'text-foreground font-medium',
              step.status === 'success' && 'text-muted-foreground line-through',
              step.status === 'pending' && 'text-muted-foreground/60',
              step.status === 'error' && 'text-destructive'
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
