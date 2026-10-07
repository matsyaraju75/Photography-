"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  stagger?: number;
  delay?: number;
  duration?: number;
  className?: string;
  triggerStart?: string;
}

export function TextReveal({
  text,
  as: Component = "h2",
  stagger = 0.035,
  delay = 0,
  duration = 0.85,
  className,
  triggerStart = "top 90%",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const container = containerRef.current;
    if (!container) return;

    const wordElements = container.querySelectorAll(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: triggerStart,
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stagger, delay, duration, triggerStart]);

  return (
    <Component
      ref={containerRef as any}
      className={cn("inline-block", className)}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <span className="reveal-word inline-block will-change-transform will-change-opacity">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
