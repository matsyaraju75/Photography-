import {
  AchievementItem,
  AlbumItem,
  AvailableServiceType,
  BeforeAfterItem,
  CategoryItem,
  PhotoAsset,
  ProcessStep,
  ProjectStory,
  TeamMember,
  TestimonialItem,
} from "@/types";

export const STUDIO_CONFIG = {
  name: "RAJU'S PHOTOGRAPHY",
  tagline: "Stories of Life. Moments of Nature.",
  heroHook:
    "Photography inspired by people, places and moments from the hills, forests and communities around us.",
  aboutManifesto:
    "I believe good photographs are not always planned. Sometimes they are found in a quiet morning, a smile, a family moment, a wedding ritual, or a bird sitting silently in the forest.",
  shortDescription:
    "Personal photography based in Alluri Sitharama Raju (ASR) District, capturing celebrations, love stories, weddings, family beginnings, nature and wildlife across South India.",
  location: "Alluri Sitharama Raju (ASR) District, Andhra Pradesh, India",
  address: "ASR District, Andhra Pradesh, India",
  phone: "+91 94940 00000", // [REPLACE_WITH_REAL_PHONE]
  phoneDisplay: "+91 [REPLACE_WITH_REAL_PHONE]",
  whatsappNumber: "919494000000", // [REPLACE_WITH_REAL_WHATSAPP]
  whatsappMessage:
    "Hello Raju! I visited your photography website and would love to inquire about availability for my upcoming event/shoot.",
  contactEmail: "raju@rajuphotography.com", // [REPLACE_WITH_REAL_EMAIL]
  social: {
    instagram: "https://instagram.com/rajusphotography", // [REPLACE_WITH_REAL_INSTAGRAM]
    youtube: "https://youtube.com/@rajusphotography",
  },
  // Real craft-focused facets (No fake awards or inflated numbers)
  craftHighlights: [
    { label: "Core Inspiration", value: "People, Hills & Wildlife" },
    { label: "Home Base", value: "ASR District, Andhra Pradesh" },
    { label: "Style", value: "Warm, Natural & True-to-Life" },
    { label: "Heirloom Craft", value: "Handcrafted Print Albums" },
  ],
};

export const AVAILABLE_SERVICES: {
  id: AvailableServiceType;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}[] = [
  {
    id: "photography",
    title: "Photography",
    tagline: "Preserving Authentic Emotion",
    description:
      "Documentary and editorial coverage of weddings, birthdays, naming ceremonies, and candid family celebrations.",
    deliverables: ["Curated High-Res Gallery", "True-to-Life Color Grading", "Digital Web Delivery"],
  },
  {
    id: "cinematography",
    title: "Cinematography",
    tagline: "Moving Visual Poetry",
    description:
      "Short cinematic films and event highlights that preserve the authentic sound, laughter, and rituals of your celebration.",
    deliverables: ["Cinematic Teaser Reel", "Full Ceremony Film", "4K Master Delivery"],
  },
  {
    id: "drone-photography",
    title: "Drone Photography",
    tagline: "Perspectives from the Sky",
    description:
      "Sweeping aerial perspectives of outdoor wedding venues, rural landscapes, hill ranges, and open-air gatherings.",
    deliverables: ["Aerial 4K Stills", "High-Altitude Video Clips", "Landscape Panoramas"],
  },
  {
    id: "photo-editing",
    title: "Photo Editing",
    tagline: "True-to-Life Color & Tone",
    description:
      "Careful handcrafted color correction that respects natural skin tones, morning mist, and the warm earth colors of ASR.",
    deliverables: ["Manual White Balance", "Skin Tone Preservation", "Archival Color Grading"],
  },
  {
    id: "album-design",
    title: "Album Design",
    tagline: "Handcrafted Family Heirlooms",
    description:
      "Physical photo albums designed page-by-page and bound with lay-flat photographic papers for generations to hold.",
    deliverables: ["Custom Layout Curation", "Cover Material Selection", "Heirloom Box Binding"],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Raju", href: "/#about" },
  { label: "Categories", href: "/#categories" },
  { label: "Stories", href: "/#stories" },
  { label: "Stories from ASR", href: "/#asr" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Investment", href: "/investment" },
  { label: "Availability", href: "/availability" },
  { label: "Albums", href: "/#albums" },
  { label: "Behind The Lens", href: "/#behind-the-lens" },
  { label: "Contact", href: "/#contact" },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-celebrations",
    slug: "celebrations",
    title: "Celebrations",
    subtitle: "Birthday Photography & Joyful Milestones",
    description:
      "Lively, candid moments of milestone birthdays and festive family joy — from a child's first candle to family jubilees.",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1920&q=85",
    count: 42,
  },
  {
    id: "cat-love-stories",
    slug: "love-stories",
    title: "Love Stories",
    subtitle: "Pre-Wedding Photography",
    description:
      "Unscripted love stories set against quiet hill tracks, forest edges, morning golden hours, and misty water streams.",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1920&q=85",
    count: 56,
  },
  {
    id: "cat-weddings",
    slug: "weddings",
    title: "Weddings",
    subtitle: "Marriage and Wedding Rituals",
    description:
      "Sacred Vedic ceremonies, emotional glances, joyful turmeric rituals, and family gatherings preserved with reverence.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=85",
    count: 88,
  },
  {
    id: "cat-family",
    slug: "family",
    title: "Family Beginnings",
    subtitle: "Naming Ceremony Photography",
    description:
      "Tender beginnings, traditional cradle rites, and multi-generational blessings as a new soul is welcomed home.",
    coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1920&q=85",
    count: 34,
  },
  {
    id: "cat-nature",
    slug: "nature",
    title: "Nature",
    subtitle: "Hills, Forests, Rain & Village Landscapes",
    description:
      "Morning mist drifting across hill valleys, rain washing over forest canopies, rural red-soil roads, and quiet streams.",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85",
    count: 95,
  },
  {
    id: "cat-wildlife",
    slug: "wildlife",
    title: "Wildlife",
    subtitle: "Animals, Birds & Forest Life",
    description:
      "Patient observational field photography of birds, insects, and forest creatures living freely across the Eastern Ghats.",
    coverImage: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1600&q=85",
    heroImage: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1920&q=85",
    count: 48,
  },
];

export const ASR_STORIES = [
  {
    id: "asr-1",
    title: "Morning Mist Over Araku Hills",
    location: "Araku Valley, ASR District",
    category: "Hills & Mist",
    description:
      "Before sunrise, quiet layers of fog settle gently over the terraced coffee estates and winding hill slopes.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "asr-2",
    title: "Monsoon Along the Forest Stream",
    location: "Maredumilli Forests, ASR District",
    category: "Forests & Rain",
    description:
      "Fresh raindrops glistening on teak leaves as natural forest waterfalls come alive with monsoon streams.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "asr-3",
    title: "The Weekly Village Shandy (Santalu)",
    location: "Paderu, ASR District",
    category: "People & Culture",
    description:
      "Vibrant rural markets where local farmers trade forest honey, turmeric roots, and woven baskets.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "asr-4",
    title: "Hornbills in the Canopy",
    location: "Eastern Ghats Forest Belt",
    category: "Forest Wildlife",
    description:
      "A quiet dawn encounter with native canopy birds feeding among old-growth fig trees.",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=85",
  },
];

export const FEATURED_STORIES: ProjectStory[] = [
  {
    id: "story-monsoon-wedding",
    slug: "suresh-and-ananya-monsoon-wedding",
    title: "Suresh & Ananya — A Wedding in the Hills",
    clientName: "Suresh & Ananya",
    category: "weddings",
    categoryLabel: "Wedding Story",
    eventDate: "November 14, 2025",
    location: "Paderu, ASR District",
    isFromASR: true,
    summary:
      "A soulful traditional wedding celebrated amidst misty hill vistas, marigold garlands, and family blessings.",
    featured: true,
    coverImage: {
      id: "sa-cover",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      alt: "Suresh and Ananya traditional wedding ritual in the hills",
      width: 1600,
      height: 1067,
      aspectRatio: "landscape",
      location: "Paderu, ASR District",
      exif: { camera: "Sony A7 IV", lens: "85mm f/1.4", aperture: "f/1.8", shutterSpeed: "1/400s", iso: "160" },
    },
    chapters: [
      {
        id: "sa-ch1",
        title: "Morning Preparations",
        description: "Soft dawn light breaking through the courtyard as turmeric paste was applied with prayers.",
        order: 1,
        photos: [
          {
            id: "sa-p1",
            url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
            alt: "Turmeric ritual and floral decorations",
            width: 1200,
            height: 1600,
            aspectRatio: "portrait",
          },
        ],
      },
      {
        id: "sa-ch2",
        title: "The Sacred Vows",
        description: "Family elders gathering around the mandap as sacred mantras resonated across the valley.",
        order: 2,
        photos: [
          {
            id: "sa-p2",
            url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85",
            alt: "Sacred fire ritual",
            width: 1600,
            height: 1067,
            aspectRatio: "landscape",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Raju captured the heartfelt emotion of our families without ever making us feel posed. Every photo feels true to who we are.",
      author: "Suresh & Ananya [REPLACE_WITH_REAL_TESTIMONIAL]",
    },
  },
  {
    id: "story-araku-love",
    slug: "kiran-and-deepika-araku-prewedding",
    title: "Kiran & Deepika — Golden Hour in the Valley",
    clientName: "Kiran & Deepika",
    category: "love-stories",
    categoryLabel: "Love Story",
    eventDate: "October 08, 2025",
    location: "Araku Valley, ASR District",
    isFromASR: true,
    summary:
      "A quiet pre-wedding walk along coffee trails and red earth roads bathed in warm autumn light.",
    featured: true,
    coverImage: {
      id: "kd-cover",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      alt: "Kiran and Deepika walking together along the forest edge at sunset",
      width: 1600,
      height: 1067,
      aspectRatio: "landscape",
      location: "Araku Valley",
      exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/2.0", shutterSpeed: "1/800s", iso: "100" },
    },
    chapters: [],
  },
  {
    id: "story-eastern-ghats-wildlife",
    slug: "forest-canopy-eastern-ghats",
    title: "Whispers of the Forest Canopy",
    category: "wildlife",
    categoryLabel: "Wildlife Observation",
    eventDate: "September 2025",
    location: "Eastern Ghats, ASR District",
    isFromASR: true,
    summary:
      "Quiet dawn mornings observing Malabar pied hornbills, drongos, and morning dew across the canopy.",
    featured: true,
    coverImage: {
      id: "egw-cover",
      url: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
      alt: "Forest bird perched on a dewy branch in the morning mist",
      width: 1600,
      height: 1067,
      aspectRatio: "landscape",
      location: "Eastern Ghats",
      exif: { camera: "Sony A7 IV", lens: "200-600mm G", aperture: "f/6.3", shutterSpeed: "1/1600s", iso: "640" },
    },
    chapters: [],
  },
];

export const BEHIND_THE_LENS_STEPS = [
  {
    step: "01",
    title: "SETUP",
    headline: "Preparation & Equipment Check",
    description:
      "Selecting the right lenses, dual memory card redundancies, and calibrating gear before stepping out into the field.",
  },
  {
    step: "02",
    title: "SHOOT",
    headline: "Patience & Gentle Direction",
    description:
      "Working with quiet presence. Waiting for the genuine smile, unscripted tear, or the perfect slant of natural morning light.",
  },
  {
    step: "03",
    title: "EDIT",
    headline: "True-to-Life Color Grading",
    description:
      "Individual RAW processing to maintain authentic skin tones and the natural earthy depth of our surrounding forests.",
  },
  {
    step: "04",
    title: "FINAL PHOTO",
    headline: "The Complete Frame",
    description:
      "An enduring image ready for digital delivery or hand-bound archival albums that can be held for generations.",
  },
];

export const ALBUM_PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "CAPTURE",
    headline: "Moments in the Field",
    description: "Every celebration and quiet frame is captured with print resolution and tonal range in mind.",
  },
  {
    number: "02",
    title: "SELECT",
    headline: "The Narrative Edit",
    description: "Carefully picking the strongest frames that build an emotional rhythm and tell the whole story.",
  },
  {
    number: "03",
    title: "EDIT",
    headline: "Archival Color Grading",
    description: "Adjusting shadows, highlights, and natural colors specifically calibrated for physical paper absorption.",
  },
  {
    number: "04",
    title: "DESIGN",
    headline: "Book Page Architecture",
    description: "Custom spread layouts with generous negative space, allowing key portraits room to breathe.",
  },
  {
    number: "05",
    title: "ALBUM",
    headline: "Handcrafted Print & Binding",
    description: "Heirloom lay-flat binding with fine-art matte paper and durable leather or raw linen covers.",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-raju",
    name: "Raju",
    role: "Lead Photographer & Founder",
    bio: "Passionate photographer from ASR District. Raju believes that photography is about feeling the moment rather than staging it. Whether documenting a wedding or tracking birds in the forest, he seeks simple honesty in every frame.",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85", // [REPLACE_WITH_REAL_TEAM_MEMBER]
    yearsOfExperience: 7,
    featuredGear: ["Sony A7 IV", "35mm f/1.4 GM", "85mm f/1.8", "70-200mm f/4 G"],
  },
  {
    id: "team-cinematographer",
    name: "Team Cinematographer",
    role: "Second Shooter & Cinematographer",
    bio: "Focuses on cinematic motion, capturing candid video snippets, family laughter, and event highlights that complement the still photography.",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85", // [REPLACE_WITH_REAL_TEAM_MEMBER]
    yearsOfExperience: 5,
    featuredGear: ["DJI Ronin Gimbal", "Sony FX30", "Wireless Audio Mics"],
  },
  {
    id: "team-drone",
    name: "Drone Operator & Assistant",
    role: "Aerial Specialist & Lighting Assistant",
    bio: "Ensures safety and sweeping aerial perspectives for outdoor celebrations, hills, and rural landscapes.",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85", // [REPLACE_WITH_REAL_TEAM_MEMBER]
    yearsOfExperience: 4,
    featuredGear: ["DJI Air Series Drone", "Reflectors & Continuous LED Fill"],
  },
];

export const ALBUMS: AlbumItem[] = [
  {
    id: "album-classic-heirloom",
    title: "The Earth & Leather Heirloom",
    subtitle: "Flush-Mount Hardcover Album",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85",
    material: "Textured Earth Brown Leather with Blind Embossing",
    pagesCount: 50,
    description:
      "Handcrafted with lay-flat 250gsm photographic paper. Allows 2-page panorama wedding spreads without gutter crease.",
    spreads: [
      {
        id: "sp-1",
        pageNumber: 1,
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85",
        title: "Cover & Title Embossing",
      },
    ],
  },
  {
    id: "album-raw-linen",
    title: "The Natural Linen Book",
    subtitle: "Organic Textured Cotton Cover",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85",
    material: "Woven Sand Linen with Debossed Names",
    pagesCount: 40,
    description:
      "Warm, tactile texture inspired by natural fabrics. Fine art matte paper that prevents reflections.",
    spreads: [],
  },
];

export const BEFORE_AFTER_SAMPLES: BeforeAfterItem[] = [
  {
    id: "ba-wedding-mandap",
    title: "Traditional Mandap Lighting",
    category: "Weddings",
    description:
      "Preserving the warm glow of oil lamps and yellow marigold flowers while gently lifting natural shadows on faces.",
    rawImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=50",
    finalImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=90",
    techniques: ["Warm Tone Balancing", "Natural Skin Luminance", "Highlight Rolloff"],
  },
  {
    id: "ba-forest-mist",
    title: "Misty Araku Morning",
    category: "Nature",
    description:
      "Recovering the soft morning gradient across the hills without over-saturating the lush greenery.",
    rawImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=50",
    finalImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=90",
    techniques: ["Atmospheric Depth", "True Green Calibration", "Shadow Clarity"],
  },
];

// Truthful Testimonials Placeholder (No fake clients or fake awards)
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Suresh & Ananya",
    eventType: "Traditional Wedding in Paderu",
    location: "ASR District",
    date: "November 2025",
    quote:
      "Raju made us and our families feel completely at ease. He captured all the rituals with patience, and the album is something our grandparents cherish every day.",
    rating: 5,
  },
  {
    id: "test-2",
    clientName: "Kiran & Deepika",
    eventType: "Pre-Wedding Session in Araku",
    location: "Araku Valley",
    date: "October 2025",
    quote:
      "We didn't want stiff city poses. Raju showed us quiet places in the hills during golden hour, and the photographs feel so natural and peaceful.",
    rating: 5,
  },
];

// Truthful Recognition / Achievements Placeholder
export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    year: "2024",
    title: "Regional Photography Exhibition",
    issuer: "ASR District Visual Collective [REPLACE_WITH_REAL_ACHIEVEMENT]",
    description: "Honored for documentary work preserving local tribal shandies and mist-covered forest trails.",
  },
  {
    id: "ach-2",
    year: "2023",
    title: "Eastern Ghats Wildlife Documentation",
    issuer: "Nature & Forest Photography Forum [REPLACE_WITH_REAL_ACHIEVEMENT]",
    description: "Recognized for ethical field craft documenting endemic bird species of the forest canopy.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = ALBUM_PROCESS_STEPS;

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  coverImage: string;
  content: string[];
}

export const JOURNAL_POSTS: JournalArticle[] = [
  {
    id: "jp-1",
    slug: "chasing-the-morning-mist-araku-valley",
    title: "Chasing the Morning Mist: Photographing Araku Valley at Dawn",
    category: "Field Notes & Nature",
    author: "Raju",
    authorRole: "Lead Photographer",
    readTime: "5 min read",
    publishDate: "November 2025",
    excerpt:
      "Why early morning light in the Eastern Ghats holds a softness unlike any other, and how we plan landscape frames around morning fog.",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    content: [
      "In the hills of ASR District, the morning does not arrive all at once. It filters through layers of quiet mist that roll off the ridges and settle over coffee leaves.",
      "When photographing nature here, patience is everything. We hike out well before first light, set up quietly on the valley rim, and wait for the sun to lift the fog just enough to reveal the contours of the red-soil trails below.",
      "Natural morning light gives photographs an unhurried, painterly quality that no artificial filter can recreate.",
    ],
  },
  {
    id: "jp-2",
    slug: "preserving-sacred-rituals-quiet-wedding-documentation",
    title: "Preserving Sacred Rituals: The Art of Quiet Wedding Documentation",
    category: "Wedding Journal",
    author: "Raju",
    authorRole: "Lead Photographer",
    readTime: "6 min read",
    publishDate: "October 2025",
    excerpt:
      "How to document intimate family ceremonies and traditional Vedic vows without disrupting the sacred atmosphere.",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    content: [
      "A wedding ceremony is first and foremost a sacred family rite, not a commercial photoshoot.",
      "Our approach is to work with quiet presence — using silent shutters, gentle prime lenses, and moving unobtrusively around the mandap. We never step between an elder and a blessing.",
      "When people forget that a camera is nearby, their expressions soften. The tears, the nervous laughter, and the gentle touch of a mother's hand become timeless.",
    ],
  },
  {
    id: "jp-3",
    slug: "forest-canopy-ethical-wildlife-eastern-ghats",
    title: "Forest Canopy: Ethical Bird & Wildlife Photography in the Eastern Ghats",
    category: "Wildlife Field Notes",
    author: "Raju",
    authorRole: "Lead Photographer",
    readTime: "7 min read",
    publishDate: "September 2025",
    excerpt:
      "Field ethics in observing hornbills and forest creatures: silence, non-disturbance, and deep respect for the wild.",
    coverImage: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
    content: [
      "In wildlife photography, no frame is worth stressing an animal or disturbing a bird's nesting territory.",
      "The true discipline of field work is patience. We sit silently beneath the forest canopy for hours in the pre-dawn chill, letting the woods awaken around us naturally.",
      "When you respect the rhythm of the forest, the birds and animals reward you with quiet, authentic gestures of life.",
    ],
  },
];

export const CURATED_GALLERY_PHOTOS: PhotoAsset[] = [
  // 1. Weddings
  {
    id: "gal-wed-1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    alt: "Traditional wedding ceremony with marigold garlands in Paderu",
    category: "weddings",
    caption: "Pasupu ceremony and traditional blessings beneath the morning sky",
    location: "Paderu, ASR District",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/1.8", shutterSpeed: "1/500s", iso: "100" },
  },
  {
    id: "gal-wed-2",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
    alt: "Emotional glance between family elders during wedding vows",
    category: "weddings",
    caption: "A quiet moment of reflection before the sacred mantras begin",
    location: "Paderu, ASR District",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/2.0", shutterSpeed: "1/400s", iso: "160" },
  },
  {
    id: "gal-wed-3",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85",
    alt: "Sacred fire and floral offerings at dusk",
    category: "weddings",
    caption: "Warm amber glow illuminating the mandap during evening rituals",
    location: "Araku Valley",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "50mm f/1.8", aperture: "f/2.2", shutterSpeed: "1/250s", iso: "400" },
  },
  {
    id: "gal-wed-4",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
    alt: "Bridal portrait in soft natural window light",
    category: "weddings",
    caption: "Gentle natural morning light illuminating the bridal silk",
    location: "Chintapalli",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/1.8", shutterSpeed: "1/640s", iso: "100" },
  },

  // 2. Love Stories (Pre-Wedding)
  {
    id: "gal-love-1",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    alt: "Pre-wedding golden hour walk along Araku valley trails",
    category: "love-stories",
    caption: "Unposed moments along the quiet coffee trails as the sun dips behind the ridge",
    location: "Araku Valley",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/2.0", shutterSpeed: "1/800s", iso: "100" },
  },
  {
    id: "gal-love-2",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85",
    alt: "Couple walking through mist at Ananthagiri viewpoint",
    category: "love-stories",
    caption: "Layers of cool morning mist rolling over the hills during sunrise",
    location: "Ananthagiri Hills",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/2.8", shutterSpeed: "1/1000s", iso: "160" },
  },
  {
    id: "gal-love-3",
    url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=85",
    alt: "Laughter by the stream under forest canopies",
    category: "love-stories",
    caption: "A spontaneous laugh by the clear water streams of Maredumilli",
    location: "Maredumilli",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/1.8", shutterSpeed: "1/500s", iso: "200" },
  },
  {
    id: "gal-love-4",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85",
    alt: "Couple sharing a quiet glance against the sunset ridges",
    category: "love-stories",
    caption: "Subtle sunset tones over the ridges of Paderu during dusk",
    location: "Paderu Hills",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/2.0", shutterSpeed: "1/640s", iso: "100" },
  },

  // 3. Celebrations (Birthdays)
  {
    id: "gal-cel-1",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85",
    alt: "Child's birthday celebration with festive laughter",
    category: "celebrations",
    caption: "Candid joy and excitement as family gathers for the first birthday",
    location: "Paderu",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/2.0", shutterSpeed: "1/640s", iso: "250" },
  },
  {
    id: "gal-cel-2",
    url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85",
    alt: "Birthday milestone sweet moments in the courtyard",
    category: "celebrations",
    caption: "Joyous expressions in natural ambient light",
    location: "Araku",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "50mm f/1.8", aperture: "f/1.8", shutterSpeed: "1/400s", iso: "200" },
  },
  {
    id: "gal-cel-3",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85",
    alt: "Family laughing together during courtyard celebration",
    category: "celebrations",
    caption: "Unrehearsed laughter as grandparents and cousins share sweets",
    location: "Chintapalli",
    width: 1200,
    height: 1200,
    aspectRatio: "square",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/2.2", shutterSpeed: "1/500s", iso: "320" },
  },

  // 4. Family Beginnings (Naming Ceremony)
  {
    id: "gal-fam-1",
    url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=85",
    alt: "Naming ceremony cradle rituals surrounded by flowers",
    category: "family",
    caption: "Grandparents placing the newborn gently into the traditional decorated cradle",
    location: "Paderu, ASR District",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/2.2", shutterSpeed: "1/320s", iso: "320" },
  },
  {
    id: "gal-fam-2",
    url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85",
    alt: "A mother tenderly holding newborn baby during cradle ceremony",
    category: "family",
    caption: "Gentle motherly warmth captured in soft room light",
    location: "Ananthagiri",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/2.0", shutterSpeed: "1/500s", iso: "200" },
  },
  {
    id: "gal-fam-3",
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=85",
    alt: "Generational blessings: hands resting softly on infant",
    category: "family",
    caption: "Three generations of family hands joined in ritual blessings",
    location: "Maredumilli",
    width: 1200,
    height: 1200,
    aspectRatio: "square",
    exif: { camera: "Sony A7 IV", lens: "50mm f/1.8", aperture: "f/2.8", shutterSpeed: "1/320s", iso: "400" },
  },

  // 5. Nature
  {
    id: "gal-nat-1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
    alt: "Morning mist settling over Araku valley hills and coffee plantations",
    category: "nature",
    caption: "Early dawn light washing over the terraced coffee hills of Araku Valley",
    location: "Araku Valley",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "24-70mm f/2.8", aperture: "f/8.0", shutterSpeed: "1/125s", iso: "100" },
  },
  {
    id: "gal-nat-2",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
    alt: "Fresh monsoon rain glistening on teak leaves in Maredumilli",
    category: "nature",
    caption: "Dewdrops and fresh rainwater running off old-growth forest leaves",
    location: "Maredumilli",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "70-200mm f/4 G", aperture: "f/4.0", shutterSpeed: "1/320s", iso: "250" },
  },
  {
    id: "gal-nat-3",
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1600&q=85",
    alt: "Sunlight filtering through the canopy of the Eastern Ghats",
    category: "nature",
    caption: "Golden morning rays cutting through tall forest trees",
    location: "Chintapalli Belt",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "35mm f/1.4 GM", aperture: "f/5.6", shutterSpeed: "1/200s", iso: "100" },
  },
  {
    id: "gal-nat-4",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    alt: "Winding ghat road disappearing into early winter fog",
    category: "nature",
    caption: "Quiet winter chill and descending mist on the Lambasingi mountain curves",
    location: "Lambasingi",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "24-70mm f/2.8", aperture: "f/4.0", shutterSpeed: "1/250s", iso: "125" },
  },

  // 6. Wildlife
  {
    id: "gal-wild-1",
    url: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
    alt: "Hornbill perched silently in the forest canopy at dawn",
    category: "wildlife",
    caption: "A quiet morning encounter with a canopy hornbill in the Eastern Ghats",
    location: "Eastern Ghats Forest Belt",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "200-600mm G", aperture: "f/6.3", shutterSpeed: "1/1600s", iso: "640" },
  },
  {
    id: "gal-wild-2",
    url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1200&q=85",
    alt: "Forest bird watching the morning sunrise from bamboo grove",
    category: "wildlife",
    caption: "Patience rewarded: bird resting quietly on a dewy branch",
    location: "Maredumilli Forests",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "200-600mm G", aperture: "f/6.3", shutterSpeed: "1/1250s", iso: "500" },
  },
  {
    id: "gal-wild-3",
    url: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=85",
    alt: "Forest butterfly resting on wild flora in the hills",
    category: "wildlife",
    caption: "Macro detail of native forest flora and fauna",
    location: "Ananthagiri",
    width: 1600,
    height: 1067,
    aspectRatio: "landscape",
    exif: { camera: "Sony A7 IV", lens: "85mm f/1.8", aperture: "f/2.8", shutterSpeed: "1/1000s", iso: "200" },
  },
  {
    id: "gal-wild-4",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
    alt: "Forest canopy predator perched quietly on high lookout branch",
    category: "wildlife",
    caption: "Patient waiting along the high ridge trails of Paderu",
    location: "Paderu Forest Range",
    width: 1200,
    height: 1600,
    aspectRatio: "portrait",
    exif: { camera: "Sony A7 IV", lens: "200-600mm G", aperture: "f/7.1", shutterSpeed: "1/2000s", iso: "800" },
  },
];
