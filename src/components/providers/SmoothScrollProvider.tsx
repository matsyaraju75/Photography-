"use client";

import React, { useEffect, createContext, useContext, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP, prefersReducedMotion } from "@/lib/animations";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback((target: string | HTMLElement, offset: number = -85) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    // Respect user's motion preferences
    if (prefersReducedMotion()) return;

    registerGSAP();

    // Initialize Lenis with optimized responsive settings
    const lenis = new Lenis({
      duration: 0.95, // Responsive and fluid, avoids sluggish float
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05, // Crisp, natural mouse wheel response
      touchMultiplier: 1.1,
      syncTouch: false, // Prevents fighting native touch scroll on mobile
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Connect RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation handler
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      const isCurrentPageAnchor =
        (href.startsWith("/#") && window.location.pathname === "/") ||
        href.startsWith("#");

      if (isCurrentPageAnchor) {
        const hash = href.includes("#") ? href.split("#")[1] : "";
        if (!hash) return;
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: -85,
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

