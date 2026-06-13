import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-guillotine-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-noir-950 disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        default: "bg-guillotine-600 text-white hover:bg-guillotine-500 shadow-lg shadow-guillotine-500/20",
        destructive: "bg-profit-negative text-white hover:bg-profit-negative/90 shadow-lg shadow-profit-negative/20",
        outline: "border border-gray-300 dark:border-noir-700 bg-transparent hover:bg-gray-100 dark:hover:bg-noir-800 text-gray-700 dark:text-noir-200",
        secondary: "bg-gray-100 dark:bg-noir-800 text-gray-700 dark:text-noir-200 hover:bg-gray-200 dark:hover:bg-noir-700",
        ghost: "hover:bg-gray-100 dark:hover:bg-noir-800 text-gray-500 dark:text-noir-400 hover:text-gray-700 dark:hover:text-noir-200",
        link: "text-guillotine-500 dark:text-guillotine-400 underline-offset-4 hover:underline",
        cyber: "border border-cyber-teal/30 bg-cyber-teal/5 text-cyber-teal hover:bg-cyber-teal/10 hover:border-cyber-teal/50 shadow-[0_0_10px_rgba(0,240,255,0.05)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
