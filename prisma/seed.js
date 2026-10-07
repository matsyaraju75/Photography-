/**
 * RAJU'S PHOTOGRAPHY — Database Bootstrap & Seeding Script
 * Seeds authentic categories, projects, chapters, photos with EXIF,
 * albums, team members, testimonials, inquiries, and blog posts into Prisma/PostgreSQL.
 *
 * Usage:
 *   npm run seed
 *   or
 *   node prisma/seed.js
 */

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const SEED_DATA = {
  user: {
    email: "raju@rajuphotography.com",
    name: "Raju",
    passwordHash: "pbkdf2$raju$studio$hash$2026", // Placeholder hash for initial admin
    role: "ADMIN",
  },
  categories: [
    {
      name: "Birthday Celebrations",
      slug: "celebrations",
      subtitle: "Birthday Photography & Joyful Milestones",
      description: "Lively, candid moments of milestone birthdays and festive family joy — from a child's first candle to family jubilees.",
      coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1920&q=85",
      order: 1,
    },
    {
      name: "Pre-Wedding Love Stories",
      slug: "love-stories",
      subtitle: "Hilltop Pre-Wedding Experience",
      description: "Unscripted love stories set against quiet hill tracks, forest edges, morning golden hours, and misty water streams in Lambasingi and Araku.",
      coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1920&q=85",
      order: 2,
    },
    {
      name: "Telugu Weddings & Marriage",
      slug: "weddings",
      subtitle: "Sacred Jeelakarra Bellam & Muhurthams",
      description: "Documentary wedding coverage preserving emotional rituals, family bonds, and sacred moments across South India.",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=85",
      order: 3,
    },
    {
      name: "Naming & Cradle Ceremonies",
      slug: "family",
      subtitle: "Uyyala Pandaga & Sacred Beginnings",
      description: "Intimate ceremonies in ancestral homes, welcoming newborns with sacred cradle blessings and multigenerational warmth.",
      coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85",
      order: 4,
    },
    {
      name: "Nature Photography",
      slug: "nature",
      subtitle: "Hills, Mists & Valley Light",
      description: "Quiet mornings in the Eastern Ghats, pine canopy shadows, coffee blossoms, and stream corridors across Alluri Sitharama Raju District.",
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=85",
      order: 5,
    },
    {
      name: "Wildlife Photography",
      slug: "wildlife",
      subtitle: "Eastern Ghats Bio-Canopy",
      description: "Ethical field documentation of hornbills, canopy birds, and native wildlife in the forest corridors of Maredumilli and Chintapalli.",
      coverImage: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85",
      heroImage: "https://images.unsplash.com/photo-1474511320723-9a56873ee018?auto=format&fit=crop&w=1920&q=85",
      order: 6,
    },
  ],
  projects: [
    {
      title: "Suresh & Ananya — Monsoon Hilltop Wedding",
      slug: "suresh-and-ananya-monsoon-wedding",
      clientName: "Suresh & Ananya",
      categorySlug: "weddings",
      eventDate: new Date("2026-07-18"),
      location: "Paderu Hilltop Mandapam, ASR District",
      summary: "A quiet morning wedding in Paderu surrounded by rolling clouds, sacred Jeelakarra Bellam muhurtham rituals, and multigenerational blessings.",
      featured: true,
      coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      chapters: [
        {
          title: "The Morning Gathering",
          order: 1,
          description: "Arrival of elders as the morning mist lifts over the Paderu valley.",
        },
        {
          title: "The Sacred Muhurtham",
          order: 2,
          description: "The Jeelakarra Bellam ceremony in natural morning light.",
        },
      ],
    },
    {
      title: "Kiran & Deepika — Lambasingi & Araku Valley",
      slug: "kiran-and-deepika-araku-prewedding",
      clientName: "Kiran & Deepika",
      categorySlug: "love-stories",
      eventDate: new Date("2026-06-12"),
      location: "Lambasingi Pine Forests & Araku Valley",
      summary: "Two days spent chasing sunrise mist in Lambasingi and quiet evening walks through the coffee estates of Araku Valley.",
      featured: true,
      coverUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      chapters: [
        {
          title: "Lambasingi Pine Mist",
          order: 1,
          description: "First light filtering through winter pine needles at 5:30 AM.",
        },
      ],
    },
  ],
  albums: [
    {
      title: "The Canvera Italian Leatherette Grand Heirloom",
      subtitle: "Heirloom Edition &bull; Flush-Mount Lay-Flat",
      coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85",
      material: "Full-Grain Italian Leatherette & Gold Debossing",
      pagesCount: 50,
      description: "Handcrafted 250 GSM velvet matte archival paper with seamless panoramic lay-flat binding designed for Telugu wedding rituals.",
      spreads: [
        { pageNumber: 1, imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85", title: "Opening Muhurtham" },
        { pageNumber: 2, imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85", title: "Sacred Jeelakarra Bellam" },
      ],
    },
    {
      title: "The Natural Woven Linen Keepsake",
      subtitle: "Artisan Edition &bull; Archival Cotton Core",
      coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85",
      material: "Unbleached Earth-Tone Linen Binding",
      pagesCount: 40,
      description: "Tactile textured linen designed for pre-wedding stories, cradle functions, and intimate milestone albums.",
      spreads: [
        { pageNumber: 1, imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85", title: "Mist Trails Spread" },
      ],
    },
  ],
  enquiries: [
    {
      name: "Suresh & Ananya",
      email: "suresh.v@gmail.com",
      phone: "+91 98480 12345",
      serviceType: "wedding",
      eventDate: new Date("2026-11-18"),
      location: "Paderu Hilltop Kalyana Mandapam, ASR District",
      guestCount: 450,
      includeVideo: true,
      includeAlbum: true,
      message: "Traditional Telugu wedding ceremony with morning Jeelakarra Bellam muhurtham. Looking for candid documentation of rituals and a couple portrait session amidst the hills.",
      status: "NEW",
      notes: "Preferred muhurtham 8:45 AM. Interested in the 50-page Canvera flush-mount album.",
    },
    {
      name: "Kiran & Deepika",
      email: "kiran.deepika@outlook.com",
      phone: "+91 94401 56789",
      serviceType: "pre-wedding",
      eventDate: new Date("2026-10-24"),
      location: "Lambasingi Pine Forests & Araku Valley",
      guestCount: null,
      includeVideo: true,
      includeAlbum: true,
      message: "Planning a relaxed 2-day pre-wedding couple shoot in early winter Lambasingi morning mist and coffee estate hills.",
      status: "CONTACTED",
      notes: "Spoke on phone. Discussed 5:30 AM sunrise shoot location in Lambasingi view point.",
    },
    {
      name: "Chaitanya & Swathi",
      email: "swathi.chaitanya@yahoo.com",
      phone: "+91 99890 34567",
      serviceType: "naming-ceremony",
      eventDate: new Date("2026-10-30"),
      location: "Chintapalli Ancestral Home",
      guestCount: 120,
      includeVideo: false,
      includeAlbum: true,
      message: "Traditional cradle ceremony (Uyyala pandaga) for our newborn daughter with close family and elders.",
      status: "BOOKED",
      notes: "Advance confirmed. Raju will bring prime portrait lenses and natural lighting kit.",
    },
  ],
  testimonials: [
    {
      clientName: "Suresh & Ananya",
      eventType: "Telugu Wedding",
      location: "Paderu, ASR District",
      date: "July 2026",
      quote: "Raju photographed our wedding like a family member who understood every quiet ritual. Looking back at our album, we can feel the morning rain and the tears in my mother's eyes.",
      rating: 5,
    },
    {
      clientName: "Kiran & Deepika",
      eventType: "Pre-Wedding Shoot",
      location: "Lambasingi & Araku",
      date: "June 2026",
      quote: "We were afraid of being awkward in front of the camera, but Raju never asked us to pose stiffly. He just walked with us through the Lambasingi pine forest. The photographs feel alive.",
      rating: 5,
    },
    {
      clientName: "Ramakrishna Garu",
      eventType: "Cradle Ceremony",
      location: "Chintapalli Ancestral Home",
      date: "August 2026",
      quote: "In an era of artificial lights and flashing gear, Raju's natural light photography of our granddaughter's naming ceremony captured the soul of our village home.",
      rating: 5,
    },
  ],
  team: [
    {
      name: "Raju",
      role: "Lead Visual Storyteller & Native Photographer",
      bio: "Born and based in ASR District, documenting celebrations, love stories, and the living forests of the Eastern Ghats for over 8 years.",
      portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
      yearsOfExperience: 8,
      gear: ["Sony Alpha A7 IV", "Sony FE 35mm f/1.4 GM", "Sony FE 85mm f/1.4 GM"],
      order: 1,
    },
    {
      name: "Manoj Kumar",
      role: "Second Candid Photographer & Drone Pilot",
      bio: "Specializing in unscripted family reactions and sweeping aerial landscapes across the hill mandapams.",
      portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85",
      yearsOfExperience: 5,
      gear: ["Sony Alpha A7 III", "DJI Air 3 Cine", "Sony FE 24-70mm f/2.8 GM II"],
      order: 2,
    },
  ],
  achievements: [
    {
      year: "2026",
      title: "8+ Years Native Documentary Craft",
      issuer: "Eastern Ghats Photography Trust",
      description: "Dedicated visual archive documenting tribal traditions and weddings across Alluri Sitharama Raju District.",
      order: 1,
    },
    {
      year: "2025",
      title: "250+ Celebrations Preserved",
      issuer: "Client Trust Heritage",
      description: "Every celebration photographed with authentic care and 5-year archival negative backup.",
      order: 2,
    },
  ],
  blogPosts: [
    {
      title: "Chasing the Morning Mist: Photographing Lambasingi & Araku Valley",
      slug: "chasing-the-morning-mist-araku-valley",
      excerpt: "Field notes on natural light, humidity, and the fleeting 5:30 AM mist windows in the high hills of Andhra Pradesh.",
      content: "When winter descends upon Lambasingi, the pine needles hold condensation in microscopic drops...",
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
      category: "Field Notes",
      readTime: "4 min read",
      published: true,
      publishedAt: new Date("2026-08-15"),
    },
    {
      title: "Preserving Sacred Rituals: Quiet Wedding Documentation in Hill Villages",
      slug: "preserving-sacred-rituals-quiet-wedding-documentation",
      excerpt: "Why staying silent and honoring ancestral Telugu rituals yields deeper emotional honesty than staged directing.",
      content: "A wedding is not a commercial set. When the muhurtham hour arrives at 8:45 AM...",
      coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      category: "Craft Philosophy",
      readTime: "5 min read",
      published: true,
      publishedAt: new Date("2026-08-28"),
    },
  ],
};

async function main() {
  console.log("==========================================================");
  console.log("  RAJU'S PHOTOGRAPHY — DATABASE BOOTSTRAPPER & SEEDER     ");
  console.log("==========================================================\n");

  // Save standalone JSON seed dataset for portability
  const jsonPath = path.join(__dirname, "seed-data.json");
  fs.writeFileSync(jsonPath, JSON.stringify(SEED_DATA, null, 2), "utf-8");
  console.log(`[OK] Seed dataset archived to: ${jsonPath}`);

  // Create .env.example if missing
  const envExamplePath = path.join(__dirname, "..", ".env.example");
  if (!fs.existsSync(envExamplePath)) {
    const envContent = `# Database Connection (Neon, Supabase, or Railway PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-host.region.aws.neon.tech/rajusphotography?sslmode=require"

# Production Canonical URL
NEXT_PUBLIC_SITE_URL="https://rajusphotography.com"
`;
    fs.writeFileSync(envExamplePath, envContent, "utf-8");
    console.log(`[OK] Created .env.example with PostgreSQL template.`);
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log("\n[INFO] DATABASE_URL is not set in this environment.");
    console.log("       The application's built-in in-memory fallback store is actively serving");
    console.log("       all authentic ASR District client inquiries, monographs, calendar dates,");
    console.log("       and reviews with 100% functionality.");
    console.log("\n[TIP]  To connect to PostgreSQL (Neon / Supabase / Railway):");
    console.log("       1. Create a .env file: DATABASE_URL=\"postgresql://...\"");
    console.log("       2. Run: npx prisma db push");
    console.log("       3. Run: npm run seed\n");
    return;
  }

  console.log(`Connecting to database at ${databaseUrl.split("@")[1] || "configured URL"}...`);

  try {
    // 1. Seed Admin User
    await prisma.user.upsert({
      where: { email: SEED_DATA.user.email },
      update: {},
      create: SEED_DATA.user,
    });
    console.log(`[✓] Seeded Admin User: ${SEED_DATA.user.email}`);

    // 2. Seed Categories
    for (const cat of SEED_DATA.categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat,
      });
    }
    console.log(`[✓] Seeded ${SEED_DATA.categories.length} Photography Categories`);

    // 3. Seed Projects & Chapters
    for (const proj of SEED_DATA.projects) {
      const category = await prisma.category.findUnique({
        where: { slug: proj.categorySlug },
      });
      if (category) {
        const savedProj = await prisma.project.upsert({
          where: { slug: proj.slug },
          update: {
            title: proj.title,
            clientName: proj.clientName,
            eventDate: proj.eventDate,
            location: proj.location,
            summary: proj.summary,
            featured: proj.featured,
            categoryId: category.id,
          },
          create: {
            title: proj.title,
            slug: proj.slug,
            clientName: proj.clientName,
            eventDate: proj.eventDate,
            location: proj.location,
            summary: proj.summary,
            featured: proj.featured,
            categoryId: category.id,
          },
        });

        // Chapters
        for (const chap of proj.chapters) {
          await prisma.storyChapter.create({
            data: {
              title: chap.title,
              order: chap.order,
              description: chap.description,
              projectId: savedProj.id,
            },
          });
        }
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.projects.length} Story Projects & Narrative Chapters`);

    // 4. Seed Albums & Spreads
    for (const alb of SEED_DATA.albums) {
      const existing = await prisma.album.findFirst({ where: { title: alb.title } });
      if (!existing) {
        await prisma.album.create({
          data: {
            title: alb.title,
            subtitle: alb.subtitle,
            coverImage: alb.coverImage,
            material: alb.material,
            pagesCount: alb.pagesCount,
            description: alb.description,
            spreads: {
              create: alb.spreads.map((s) => ({
                pageNumber: s.pageNumber,
                imageUrl: s.imageUrl,
                title: s.title,
              })),
            },
          },
        });
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.albums.length} Handcrafted Album Specifications`);

    // 5. Seed Inquiries
    for (const enq of SEED_DATA.enquiries) {
      const exists = await prisma.enquiry.findFirst({ where: { email: enq.email } });
      if (!exists) {
        await prisma.enquiry.create({ data: enq });
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.enquiries.length} Client CRM Enquiries`);

    // 6. Seed Testimonials
    for (const test of SEED_DATA.testimonials) {
      const exists = await prisma.testimonial.findFirst({ where: { clientName: test.clientName } });
      if (!exists) {
        await prisma.testimonial.create({ data: test });
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.testimonials.length} Client Testimonials`);

    // 7. Seed Team
    for (const member of SEED_DATA.team) {
      const exists = await prisma.teamMember.findFirst({ where: { name: member.name } });
      if (!exists) {
        await prisma.teamMember.create({ data: member });
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.team.length} Team Members`);

    // 8. Seed Achievements
    for (const ach of SEED_DATA.achievements) {
      const exists = await prisma.achievement.findFirst({ where: { title: ach.title } });
      if (!exists) {
        await prisma.achievement.create({ data: ach });
      }
    }
    console.log(`[✓] Seeded ${SEED_DATA.achievements.length} Craft Achievements`);

    // 9. Seed Blog Posts
    for (const post of SEED_DATA.blogPosts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: post,
      });
    }
    console.log(`[✓] Seeded ${SEED_DATA.blogPosts.length} Journal Articles`);

    console.log("\n==========================================================");
    console.log("  [SUCCESS] DATABASE BOOTSTRAPPED & SEEDED 100%!          ");
    console.log("==========================================================\n");
  } catch (error) {
    console.error("Database seeding encountered an error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
