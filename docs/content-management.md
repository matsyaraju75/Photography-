# Studio Content Management Guide
### Operating The Lumen & Grain Admin Portal

The studio owner and team can manage projects, incoming client leads, and bookbinding specifications directly without editing source code.

---

## 1. Accessing The Dashboard
Navigate to:
```
http://localhost:3000/admin (Local Development)
https://lumenandgrain.com/admin (Production)
```

---

## 2. Managing Inquiries (`/admin/enquiries`)
1. **Reviewing New Leads**: Incoming briefs appear in real time with client contact information, event dates, requested disciplines, and inclusions.
2. **Updating Pipeline Status**: Use the inline dropdown to move leads from `NEW` &rarr; `CONTACTED` &rarr; `MEETING_SCHEDULED` &rarr; `BOOKED`.
3. **Instant WhatsApp Concierge**: Click the **"Launch WhatsApp Concierge"** button to open a pre-formatted message directly to the client's telephone.

---

## 3. Publishing New Story Monographs (`/admin/projects`)
1. Click **"+ Publish New Monograph"**.
2. Input the project title, client names, category, event date, venue location, and story summary.
3. Provide the high-resolution cover image URL from your CDN (Cloudinary / Supabase).
4. Click **"Publish Story"** to immediately make the monograph live on `/stories`.

---

## 4. Managing Handcrafted Albums (`/admin/albums`)
Review and configure lay-flat album specifications, cover material options (Italian Vachetta, Belgian Linen), and page spreads.
