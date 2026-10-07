"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  triggerStart?: string;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 1.0,
  y = 28,
  direction = "up",
  triggerStart = "top 90%",
  className,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const el = elementRef.current;
    if (!el) return;

    let initialProps: gsap.TweenVars = { opacity: 0 };

    switch (direction) {
      case "up":
        initialProps = { opacity: 0, y: y };
        break;
      case "down":
        initialProps = { opacity: 0, y: -y };
        break;
      case "left":
        initialProps = { opacity: 0, x: y };
        break;
      case "right":
        initialProps = { opacity: 0, x: -y };
        break;
      case "scale":
        initialProps = { opacity: 0, scale: 0.96 };
        break;
      case "fade":
      default:
        initialProps = { opacity: 0 };
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        initialProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [delay, duration, y, direction, triggerStart]);

  return (
    <div
      ref={elementRef}
      className={cn("will-change-transform will-change-opacity", className)}
      {...props}
    >
      {children}
    </div>
  );
}
