import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isExternal,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest cursor-pointer";

    const variantStyles = {
      primary:
        "bg-forest text-cream font-medium hover:bg-forest-dark active:scale-[0.98] shadow-xs",
      secondary:
        "bg-cream-paper text-charcoal border border-earth/25 hover:border-forest hover:text-forest active:scale-[0.98]",
      outline:
        "bg-transparent text-charcoal border border-charcoal/30 hover:border-forest hover:text-forest hover:bg-forest/5 active:scale-[0.98]",
      ghost:
        "bg-transparent text-charcoal-muted hover:text-charcoal hover:bg-black/5",
      gold:
        "bg-earth text-cream hover:bg-forest active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "text-[0.6875rem] px-4 py-2.5 rounded-none",
      md: "text-xs px-6 py-3.5 rounded-none",
      lg: "text-xs px-8 py-4 rounded-none",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
