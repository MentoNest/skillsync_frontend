// components/ui/CategoryBadge.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-purple-600 text-white hover:bg-purple-700',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        gray: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
        subtle: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

export interface CategoryBadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function CategoryBadge({
  className,
  variant,
  size,
  children,
  asChild,
  ...props
}: CategoryBadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
