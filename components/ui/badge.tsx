import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#7C3AED]/20 dark:text-[#A78BFA]",
        secondary:
          "border-transparent bg-[var(--surface-hover)] text-[var(--foreground-secondary)]",
        outline:
          "border-[var(--border)] text-[var(--foreground)]",
        gradient:
          "border-transparent bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white",
        success:
          "border-transparent bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
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
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
