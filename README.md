# RAJU'S PHOTOGRAPHY

> **"Stories of Life. Moments of Nature."**  
> Personal photography website for Raju — an independent photographer based in **Alluri Sitharama Raju (ASR) District, Andhra Pradesh, India**.

Inspired by: **People + Celebrations + Nature + Wildlife + Stories**

---

## 🌿 Brand Direction & Aesthetic

- **Design Philosophy**: Warm, human, natural, editorial, and authentic. Strictly avoids generic dark luxury corporate agency styles, neon glows, and 3D gimmicks.
- **Palette**:
  - Cream: `#F5F1E8`
  - Paper: `#FAF7F0`
  - Forest Green: `#2F4A3A`
  - Earth Brown: `#765B43`
  - Soft Sand: `#D8C9B3`
  - Charcoal: `#252525`
- **Typography**:
  - Cormorant Garamond (Editorial Serif)
  - Plus Jakarta Sans (Clean Modern Sans)

---

## 📷 Photography Disciplines

1. **Telugu Wedding & Marriage Photography** (Sacred Jeelakarra Bellam muhurthams & emotional documentary rituals)
2. **Pre-Wedding Photography** (Lambasingi morning mist, pine forests & Araku coffee estate trails)
3. **Birthday Photography** (1st Birthday celebrations & joyful family milestones)
4. **Naming Ceremony Photography** (Traditional Uyyala Pandaga in ancestral homes)
5. **Nature Photography** (Misty valleys, seasonal streams & waterfalls)
6. **Wildlife Photography** (Eastern Ghats bio-canopy, hornbills & ethical field documentation)

---

## 🛠️ Complete Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom editorial design tokens
- **Animations**: GSAP + ScrollTrigger + Lenis smooth scrolling (with `prefers-reduced-motion` compliance)
- **Spatial 3D**: Three.js + React Three Fiber + Drei (subtle depth-based floating wall with mobile 2.5D fallback)
- **Database & ORM**: PostgreSQL + Prisma ORM (with automatic in-memory fallback store)
- **Icons**: Lucide React
- **SEO & Structured Data**: JSON-LD `schema.org/PhotographyBusiness`, dynamic sitemap.xml, and robots.txt

---

## 🚀 Roadmap Execution (All 8 Stages Complete)

- ✅ **Stage 1: Brand + UX + Architecture**: Warm natural theme tokens, folder architecture, domain models, and full-site navigation.
- ✅ **Stage 2: Frontend UI & Sub-Pages**: 13 homepage sections, category sub-pages, story monograph viewer, behind-the-lens breakdown, and editorial journal.
- ✅ **Stage 3: Real Photography & Responsive Design**: 22 curated authentic ASR district photography assets with real camera EXIF data and touch gesture Lightbox modal with 1-click WhatsApp inquiry.
- ✅ **Stage 4: Animations (GSAP + ScrollTrigger + Lenis)**: Word reveals, scrubbed parallax, coordinated section transitions, and accessibility reduced-motion compliance.
- ✅ **Stage 5: Lightweight 3D (Floating Depth Wall)**: Spatial 3D cluster using `@react-three/fiber` and `@react-three/drei` with mouse rotation lerping and mobile 2.5D CSS fallback (<768px).
- ✅ **Stage 6: Backend + Admin Studio Suite**: Inquiries CRM pipeline with status updates (`NEW`, `CONTACTED`, `BOOKED`), private studio notes, story CMS, Canvera album specs, and 1-click WhatsApp quick reply.
- ✅ **Stage 7: Business Features**: Interactive Investment & Package Calculator with line-item estimates, real-time seasonal availability calendar with Telugu muhurtham highlights, 5-star review submission modal, and dedicated `/investment` and `/availability` pages.
- ✅ **Stage 8: Testing + SEO + Performance + Deployment**: Full 37-route audit passing with HTTP 200, schema.org JSON-LD structured data, sitemap prioritization, security headers, and production deployment documentation.

---

## 💻 Getting Started Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live website.

### 3. Access Admin Studio Dashboard
Open [http://localhost:3000/admin](http://localhost:3000/admin) to manage inquiries, stories, albums, availability calendar dates, and client reviews.

### 4. Production Build & Verification
```bash
npm run build
npm run start
```

---

## 📁 Key Routes

- `/` — Homepage (Hero, About Raju, Categories, Stories, ASR Gallery, 3D Wall, Behind The Lens, Team, Albums, Investment Preview, Testimonials, Contact)
- `/investment` — Interactive Investment & Package Calculator
- `/availability` — Seasonal Booking & Telugu Muhurtham Calendar
- `/stories` & `/stories/[slug]` — Narrative Photo Essays
- `/categories/[slug]` — Photography Categories Showcase
- `/albums` — Handcrafted Canvera & Linen Heirloom Albums
- `/behind-the-lens` — Technical Gear, Lighting & RAW-to-Final Breakdown
- `/journal` & `/journal/[slug]` — Field Notes & Forest Journals
- `/admin` — Studio Dashboard (CRM, Stories, Albums, Dates, Reviews, Settings)
- `/sitemap.xml` & `/robots.txt` — SEO Crawl Manifests
