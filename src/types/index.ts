export type PhotographyCategoryType =
  | "celebrations"      // Birthday photography
  | "love-stories"      // Pre-wedding photography
  | "weddings"          // Wedding & marriage photography
  | "family"            // Naming ceremony photography
  | "nature"            // Hills, forests, rain, villages, roads, landscapes
  | "wildlife"          // Animals, birds and forest life
  // Backwards compatibility aliases
  | "birthday"
  | "pre-wedding"
  | "wedding"
  | "naming-ceremony";

export type AvailableServiceType =
  | "photography"
  | "cinematography"
  | "drone-photography"
  | "photo-editing"
  | "album-design";

export interface CategoryItem {
  id: string;
  slug: PhotographyCategoryType;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  heroImage: string;
  count: number;
}

export interface PhotoAsset {
  id: string;
  url: string;
  blurDataUrl?: string;
  alt: string;
  category?: PhotographyCategoryType;
  caption?: string;
  width: number;
  height: number;
  aspectRatio?: "portrait" | "landscape" | "square";
  isCover?: boolean;
  isFavoriteFrame?: boolean;
  isFromASR?: boolean;
  location?: string;
  exif?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
}

export interface StoryChapter {
  id: string;
  title: string; // e.g. "Morning in the Hills", "Sacred Vows", "Village Celebration"
  subtitle?: string;
  description?: string;
  order: number;
  photos: PhotoAsset[];
}

export interface ProjectStory {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  category: PhotographyCategoryType;
  categoryLabel: string;
  eventDate: string;
  location: string;
  isFromASR?: boolean;
  summary: string;
  featured: boolean;
  coverImage: PhotoAsset;
  heroVideoUrl?: string;
  chapters: StoryChapter[];
  testimonial?: {
    quote: string;
    author: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  portrait: string;
  actionPhoto?: string;
  yearsOfExperience: number;
  featuredGear?: string[];
  socialLinks?: {
    instagram?: string;
    phone?: string;
  };
}

export interface AlbumSpread {
  id: string;
  pageNumber: number;
  imageUrl: string;
  title?: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  material: string; // e.g. "Full-Grain Leather", "Raw Textured Linen"
  pagesCount: number;
  description: string;
  spreads: AlbumSpread[];
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  rawImage: string;
  finalImage: string;
  techniques: string[]; // e.g. ["True-to-life tone curve", "Skin warmth preservation", "Highlight recovery"]
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  issuer: string;
  description: string;
  badgeUrl?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  eventType: string;
  location: string;
  date: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
  projectSlug?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  headline: string;
  description: string;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  eventDate?: string;
  location?: string;
  guestCount?: number;
  includeVideo?: boolean;
  includeAlbum?: boolean;
  message: string;
}
