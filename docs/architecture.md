# Architecture & Design System Guide
### Lumen & Grain — Fine Art Photography & Visual Storytelling

## 1. Architectural Philosophy
Our architecture is designed around one core principle:
> **"The technology should disappear behind the photography."**

Every technical decision prioritizes fast initial rendering, high photographic fidelity, and an unhurried, luxury editorial reading experience.

---

## 2. Technology Choices & Justification

### Next.js App Router (React 19 & TypeScript)
- **Why**: Allows combining fast Server Components (for instant SEO and initial HTML delivery) with interactive Client Components (for image zoom, modal lightboxes, and 3D camera canvas).
- **Zero-Layout Shift**: All photography containers declare explicit aspect ratios to ensure zero Cumulative Layout Shift (CLS = 0).

### Tailwind CSS (v4)
- **Design Tokens**: Configured with custom CSS theme variables (`--color-studio-black`, `--color-studio-gold`, `--font-serif`, etc.).
- **Typography**: 
  - `Cormorant Garamond`: High-end editorial serif for emotive headlines.
  - `Plus Jakarta Sans`: Crisp, modern sans-serif for UI labels, badges, and body readability.

### Image Optimization
- Next.js native `<Image />` component with `next.config.ts` remote patterns.
- Automatic conversion to modern **AVIF** and **WebP** formats for maximum bandwidth savings without visual compression artifacts.

---

## 3. Directory Layout
- `src/app/`: Next.js pages, layouts, and route handlers.
- `src/components/ui/`: Reusable atomic UI elements (`Button`, `Badge`, `Container`).
- `src/components/layout/`: Global structural navigation (`Header`, `Footer`).
- `src/lib/`: Constants, brand data, and utility functions (`cn`, formatting helpers).
- `src/types/`: Full TypeScript data models and interfaces.
