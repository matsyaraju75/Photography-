import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once globally in client environment
let isRegistered = false;

export function registerGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

/**
 * Checks if visitor has requested reduced motion in OS settings
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth upward fade reveal for editorial headings, pull-quotes, and sections
 */
export function fadeUpOnScroll(
  element: HTMLElement | string,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
    trigger?: HTMLElement | string;
    start?: string;
  }
) {
  registerGSAP();
  if (prefersReducedMotion()) return null;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: options?.y ?? 28,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1.1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: options?.trigger ?? target,
        start: options?.start ?? "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
}

/**
 * Staggered fade reveal for lists, cards, and team grids
 */
export function staggerOnScroll(
  elements: HTMLElement[] | NodeListOf<Element> | string,
  options?: {
    stagger?: number;
    delay?: number;
    duration?: number;
    y?: number;
    trigger?: HTMLElement | string;
    start?: string;
  }
) {
  registerGSAP();
  if (prefersReducedMotion()) return null;

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options?.y ?? 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 0.9,
      stagger: options?.stagger ?? 0.12,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: options?.trigger ?? (typeof elements === "string" ? elements : (elements as HTMLElement[])[0]),
        start: options?.start ?? "top 86%",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
}

/**
 * Subtle parallax scroll effect for editorial photos and textures
 * Creates quiet depth without nauseating movement
 */
export function parallaxScroll(
  element: HTMLElement | string,
  options?: {
    speed?: number; // 0.1 to 0.3 is optimal for natural editorial feel
    trigger?: HTMLElement | string;
    start?: string;
    end?: string;
  }
) {
  registerGSAP();
  if (prefersReducedMotion()) return null;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  const speed = options?.speed ?? 0.15;
  const yOffset = speed * 100; // e.g. 15px to 25px offset

  return gsap.fromTo(
    target,
    {
      y: -yOffset,
    },
    {
      y: yOffset,
      ease: "none",
      scrollTrigger: {
        trigger: options?.trigger ?? target,
        start: options?.start ?? "top bottom",
        end: options?.end ?? "bottom top",
        scrub: 1.2,
      },
    }
  );
}

/**
 * Gentle image entrance reveal (subtle zoom out from 1.06 to 1.0 + opacity)
 * Gives photographs a museum-grade unveiling
 */
export function imageEntranceReveal(
  element: HTMLElement | string,
  options?: {
    duration?: number;
    delay?: number;
    trigger?: HTMLElement | string;
  }
) {
  registerGSAP();
  if (prefersReducedMotion()) return null;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  return gsap.fromTo(
    target,
    {
      opacity: 0,
      scale: 1.05,
    },
    {
      opacity: 1,
      scale: 1.0,
      duration: options?.duration ?? 1.4,
      delay: options?.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: options?.trigger ?? target,
        start: "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
}

/**
 * Gentle exhibition drift for Photo Wall frames
 * Creates the feeling of strolling through a physical gallery
 */
export function galleryFrameFloat(
  element: HTMLElement | string,
  options?: {
    offset?: number;
    duration?: number;
  }
) {
  registerGSAP();
  if (prefersReducedMotion()) return null;

  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return null;

  return gsap.to(target, {
    y: options?.offset ?? -8,
    duration: options?.duration ?? 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}
