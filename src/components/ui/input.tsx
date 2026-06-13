import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-300 dark:border-noir-700 bg-white dark:bg-noir-900/50 px-3 py-2 text-sm text-gray-700 dark:text-noir-100 placeholder:text-gray-400 dark:placeholder:text-noir-400 focus:outline-none focus:ring-2 focus:ring-guillotine-500/50 focus:border-guillotine-500/50 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
