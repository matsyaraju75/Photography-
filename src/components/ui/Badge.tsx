import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "subtle" | "dark";
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = "subtle",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: "text-forest border-forest/30 bg-forest/10",
    subtle: "text-earth border-earth/25 bg-earth/10",
    dark: "text-charcoal-muted border-earth/20 bg-cream-paper",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[0.65rem] tracking-[0.18em] uppercase border font-sans font-medium backdrop-blur-xs",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
