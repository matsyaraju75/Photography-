"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  speed?: number; // 0.05 to 0.25 (default 0.12)
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  aspectRatio = "aspect-[4/3]",
  speed = 0.12,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className,
  imageClassName,
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerGSAP();

    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!container || !imageWrapper) return;

    const yDistance = Math.round(speed * 120); // subtle 10px-25px translation

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapper,
        { y: -yDistance },
        {
          y: yDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", aspectRatio, className)}
    >
      <div
        ref={imageWrapperRef}
        className="absolute -top-[12%] -bottom-[12%] inset-x-0 w-full h-[124%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover object-center", imageClassName)}
        />
      </div>
      {children}
    </div>
  );
}
