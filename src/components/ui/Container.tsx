import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide" | "full";
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function Container({
  children,
  size = "default",
  className,
  ref,
  ...props
}: ContainerProps) {
  const sizeStyles = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    full: "max-w-full",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
