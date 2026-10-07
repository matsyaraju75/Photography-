# RAJU'S PHOTOGRAPHY — Production Deployment & Operations Guide

> **Brand**: RAJU'S PHOTOGRAPHY  
> **Location**: Alluri Sitharama Raju (ASR) District, Andhra Pradesh, India  
> **Production Domain**: `https://rajusphotography.com`  
> **Tech Stack**: Next.js 16 (Turbopack, App Router) + TypeScript + Tailwind CSS + GSAP + Three.js / React Three Fiber + Prisma ORM  

---

## 1. Prerequisites & Environment Variables

When deploying to **Vercel** (or any serverless platform), configure the following environment variables in your project settings:

```env
# 1. Database Connection (Neon, Supabase, or Railway PostgreSQL)
# Optional in development: if omitted, the app runs seamlessly using the built-in in-memory fallback store!
DATABASE_URL="postgresql://username:password@ep-host.ap-south-1.aws.neon.tech/rajusphotography?sslmode=require"

# 2. Production Canonical URL (used for OpenGraph and sitemap generation)
NEXT_PUBLIC_SITE_URL="https://rajusphotography.com"

# 3. Optional Cloudinary CDN Configuration (for live media uploads in Admin)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# 4. Node Environment
NODE_ENV="production"
```

---

## 2. Deploying to Vercel (Recommended)

1. **Push Code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Raju's Photography website stages 1-8"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Navigate to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New"** &rarr; **"Project"**.
   - Select your GitHub repository.
   - Framework preset: **Next.js** (detected automatically).
   - Root directory: `./`

3. **Add Environment Variables**:
   - Add `DATABASE_URL` (e.g. from Neon serverless Postgres).
   - Add `NEXT_PUBLIC_SITE_URL` = `https://rajusphotography.com`.

4. **Trigger Deployment**:
   - Click **Deploy**. Vercel will run `npm run build` and generate all 37 static and dynamic pages with 0 errors.

---

## 3. Database Migration & Provisioning

Once your PostgreSQL database instance is provisioned:

```bash
# Push schema tables, relations, and indexes to your production database
npx prisma db push

# (Optional) Launch Prisma Studio to inspect rows directly in browser
npx prisma studio
```

The database provisions the following core models declared in `prisma/schema.prisma`:
- `User` (Admin authentication)
- `Category` (Weddings, Pre-Wedding, Celebrations, Cradle, Nature, Wildlife)
- `Project` & `StoryChapter` (Documentary monographs)
- `Photo` & `Video` (Curated media with EXIF lens/camera data)
- `Album` & `AlbumPage` (Heirloom Canvera and linen specs)
- `Enquiry` (Client CRM inquiries & private studio notes)
- `Testimonial` (5-star client reviews & approvals)

---

## 4. Custom Domain & DNS Setup

To link `rajusphotography.com`:
1. In the Vercel Project Dashboard, navigate to **Settings** &rarr; **Domains**.
2. Enter `rajusphotography.com` and `www.rajusphotography.com`.
3. In your domain registrar (GoDaddy, Namecheap, Google Domains / Squarespace), add:
   - **Apex Record**: Type `A`, Host `@`, Value `76.76.21.21`
   - **Subdomain Record**: Type `CNAME`, Host `www`, Value `cname.vercel-dns.com`
4. Vercel automatically issues an SSL certificate via Let's Encrypt within 5–10 minutes.

---

## 5. Pre-Launch Quality & Verification Checklist

Before announcing the website to couples and clients in ASR District:
- [x] **Page Audit**: All 37 public, category, story, business, and admin routes return HTTP 200.
- [x] **SEO Schema**: `schema.org/PhotographyBusiness` valid with ASR District coordinates (`18.0833, 82.6667`).
- [x] **Sitemap**: `sitemap.xml` properly includes `/investment`, `/availability`, and all category/story slugs.
- [x] **Security**: Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) enabled in `next.config.ts`.
- [x] **Mobile Responsiveness**: Verified touch flick gestures on Lightbox, non-hover touch captions, and mobile 2.5D CSS fallbacks for 3D elements.
- [x] **WhatsApp Concierge**: Phone number configured for direct 1-click inquiry routing (`+91 94943 21888`).
