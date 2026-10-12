import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[12px] text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#3B82F6] text-white shadow-[0_4px_16px_rgba(124,58,237,0.25)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.35)] hover:opacity-95",
        secondary:
          "bg-[var(--surface-hover)] text-[var(--foreground)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface-hover)] hover:border-[#7C3AED]/40",
        ghost:
          "text-[var(--foreground)] hover:bg-[var(--surface-hover)] hover:text-[#7C3AED]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        glow:
          "bg-[var(--card)] text-[var(--foreground)] border border-[var(--border-subtle)] shadow-[0_4px_16px_rgba(20,18,43,0.06)] hover:border-[#7C3AED]/50 hover:shadow-[0_8px_24px_rgba(124,58,237,0.12)]",
      },
      size: {
        default: "h-[44px] px-5 py-2.5",
        sm: "h-[36px] px-3.5 text-xs rounded-[10px]",
        lg: "h-[48px] px-6 text-base rounded-[14px]",
        icon: "h-[44px] w-[44px]",
        iconSm: "h-[36px] w-[36px] rounded-[10px]",
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
