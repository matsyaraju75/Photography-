# Database Architecture Guide
### Prisma ORM & PostgreSQL Schema Specification

This document details the complete relational data model designed for **LUMEN & GRAIN**.

---

## 1. Overview
The database layer uses **Prisma ORM** connecting to a **PostgreSQL** database (such as Neon, Supabase, or AWS RDS).

---

## 2. Relational Models

### `User`
Manages studio administrators with encrypted passwords and role-based permissions (`ADMIN`, `EDITOR`).

### `Category`
Represents the 5 core photography disciplines:
- `wedding` (Wedding & Marriage)
- `pre-wedding` (Pre-Wedding & Elopement)
- `birthday` (Birthday Milestones)
- `naming-ceremony` (Naming Ceremony & New Life)
- `wildlife` (Wildlife & Nature Expeditions)

### `Project` (Story Monographs)
Holds complete client story monographs:
- Fields: `title`, `slug`, `clientName`, `location`, `eventDate`, `summary`, `featured`, `categoryId`.
- Relationships: Has many `Photo`, has many `StoryChapter`, has many `Video`, has one `Testimonial`.

### `StoryChapter`
Divides a project into chronological emotional chapters:
- E.g., *Chapter 01: The Morning Whisper*, *Chapter 02: The Sacred Vows*, *Chapter 03: Candlelit Twilight*.
- Related to `Project` with cascading deletion.

### `Photo`
Stores individual master frames:
- Fields: `url`, `blurDataUrl`, `altText`, `width`, `height`, `aspectRatio` (portrait, landscape, square), `isCover`.
- EXIF Metadata: `exifCamera`, `exifLens`, `exifAperture`, `exifShutter`, `exifIso`.

### `Album` & `AlbumPage`
Manages physical handcrafted heirloom books:
- `Album`: title, material (Full-Grain Italian Vachetta, Belgian Linen), page count, description.
- `AlbumPage`: page number, lay-flat spread image URL, caption.

### `Enquiry`
Tracks client consultation leads through the studio CRM pipeline:
- Statuses: `NEW`, `CONTACTED`, `MEETING_SCHEDULED`, `BOOKED`, `ARCHIVED`.
- Fields: name, email, phone, discipline, eventDate, location, guestCount, inclusions (video, album), message.

### `BlogPost`
Editorial articles and photography planning advice in the `/journal`.
