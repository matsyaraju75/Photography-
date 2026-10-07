# Cinematic Motion & Animation Guide
### Physics Scrolling, GSAP & ScrollTrigger Implementation

This document explains how animations are structured to ensure 60fps performance and adhere to our core principle:
> **"The technology should disappear behind the photography."**

---

## 1. Lenis Smooth Scrolling
- **Implementation**: Managed globally inside `src/components/providers/SmoothScrollProvider.tsx`.
- **Inertia Curve**: Uses cubic deceleration (`easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`) to provide smooth, heavy publication inertia.
- **Syncing with GSAP**: `lenis.on('scroll', ScrollTrigger.update)` keeps GSAP's scroll detection aligned with Lenis's RAF cycle.

---

## 2. GSAP ScrollTrigger
- **Global Registration**: Registered once inside `src/lib/animations.ts` to prevent duplicate plugin warnings.
- **Trigger Bounds**: Reveals trigger at `start: "top 90%"` with `once: true`, ensuring content appears naturally before the user scrolls past.

---

## 3. Accessibility & Reduced Motion
- When a user's operating system requests reduced motion (`window.matchMedia('(prefers-reduced-motion: reduce)')`), Lenis scrolling is completely disabled and GSAP animations immediately resolve to static, visible elements with zero transitions.
