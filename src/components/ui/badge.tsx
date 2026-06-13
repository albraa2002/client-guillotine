import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-guillotine-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-100 dark:bg-noir-800 text-gray-700 dark:text-noir-200",
        terminate: "bg-red-50 dark:bg-profit-negative/15 text-profit-negative border border-red-200 dark:border-profit-negative/20",
        reprice: "bg-amber-50 dark:bg-profit-warning/15 text-profit-warning border border-amber-200 dark:border-profit-warning/20",
        keep: "bg-emerald-50 dark:bg-profit-positive/15 text-profit-positive border border-emerald-200 dark:border-profit-positive/20",
        outline: "border border-gray-300 dark:border-noir-700 text-gray-500 dark:text-noir-400",
        cyber: "bg-cyan-50 dark:bg-cyber-teal/10 text-cyber-teal border border-cyan-200 dark:border-cyber-teal/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
