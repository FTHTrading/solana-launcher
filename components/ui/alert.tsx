'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/utils';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/5',
        success:
          'border-emerald-500/30 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 [&>svg]:text-emerald-600',
        warning:
          'border-amber-500/30 text-amber-800 dark:text-amber-300 bg-amber-500/10 [&>svg]:text-amber-600',
        info:
          'border-blue-500/30 text-blue-800 dark:text-blue-300 bg-blue-500/10 [&>svg]:text-blue-600',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const ICONS = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle2,
  warning: TriangleAlert,
  info: Info,
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, showIcon = true, children, ...props }, ref) => {
    const Icon = ICONS[variant ?? 'default'];
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {showIcon && <Icon className="h-4 w-4" />}
        <div>
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
          )}
          <div className="text-sm [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    );
  }
);
Alert.displayName = 'Alert';

export { Alert };

