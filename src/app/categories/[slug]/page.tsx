import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PhotoGrid } from "@/components/portfolio/PhotoGrid";
import { CATEGORIES, CURATED_GALLERY_PHOTOS, FEATURED_STORIES, STUDIO_CONFIG } from "@/lib/constants";
import { PhotoAsset } from "@/types";
import { ArrowLeft, ArrowRight, Camera, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return { title: "Discipline Not Found" };

  return {
    title: `${category.title} Photography — ${STUDIO_CONFIG.name}`,
    description: category.description,
    openGraph: {
      title: `${category.title} Photography | ${STUDIO_CONFIG.name}`,
      description: category.description,
      images: [{ url: category.heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Find stories matching this category
  const categoryStories = FEATURED_STORIES.filter(
    (story) => story.category === category.slug
  );

  // Curate all authentic photos matching this category / service
  const categoryGalleryPhotos = CURATED_GALLERY_PHOTOS.filter(
    (photo) => photo.category === category.slug
  );

  const displayPhotos: PhotoAsset[] =
    categoryGalleryPhotos.length > 0
      ? categoryGalleryPhotos
      : [
          {
            id: `${category.slug}-p1`,
            url: category.coverImage,
            alt: `${category.title} Frame 01`,
            width: 1600,
            height: 1067,
            aspectRatio: "landscape",
          },
          {
            id: `${category.slug}-p2`,
            url: category.heroImage,
            alt: `${category.title} Frame 02`,
            width: 1200,
            height: 1600,
            aspectRatio: "portrait",
          },
        ];

  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Category Hero Banner */}
      <section className="relative min-h-[65vh] sm:min-h-[72vh] flex items-end overflow-hidden pb-14 pt-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={category.heroImage}
            alt={category.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-black/40 to-black/60" />
        </div>

        <Container size="wide" className="relative z-10">
          <Link
            href="/#categories"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-cream hover:text-sand-light transition-colors mb-6 drop-shadow-sm font-medium"
          >
            <ArrowLeft size={14} />
            <span>All Categories</span>
          </Link>

          <div className="max-w-3xl text-cream drop-shadow-md">
            <Badge variant="gold" className="mb-3 bg-cream/90 text-forest border-cream font-medium">
              {category.subtitle}
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cream font-normal leading-tight mb-4">
              {category.title}
            </h1>

            <p className="font-sans text-sm sm:text-base text-cream/90 font-light leading-relaxed max-w-2xl">
              {category.description}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Featured Stories in this Category */}
      {categoryStories.length > 0 && (
        <section className="py-20 border-b border-earth/20 bg-cream-paper">
          <Container size="wide">
            <div className="mb-12">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-2 font-semibold">
                Photo Essays
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Featured Stories in this Discipline
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryStories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group bg-cream border border-earth/20 hover:border-forest/50 transition-all duration-300 overflow-hidden flex flex-col shadow-xs"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30">
                    <Image
                      src={story.coverImage.url}
                      alt={story.coverImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 text-xs text-cream font-medium">
                      {story.location}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[0.6875rem] font-sans uppercase tracking-wider text-forest font-semibold block mb-1">
                      {story.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal font-medium mb-2 group-hover:text-forest transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-charcoal/80 leading-relaxed font-sans mb-4">
                      {story.summary}
                    </p>
                    <span className="inline-flex items-center text-xs font-semibold text-forest uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      Read Complete Story &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Curated Master Photo Grid */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-earth/20">
            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-1 font-semibold">
                Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Curated Frames
              </h2>
            </div>
            <span className="text-xs text-charcoal-muted font-mono mt-2 md:mt-0">
              Showing {displayPhotos.length} Curated {category.title} Photographs
            </span>
          </div>

          <PhotoGrid photos={displayPhotos} />
        </Container>
      </section>

      {/* 4. Category Booking Callout */}
      <section className="py-20 text-center bg-cream-paper">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            Inquire for {category.title}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Interested in booking Raju for {category.title.toLowerCase()}? Get in touch to check date availability and discuss details.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Check Date Availability
            </Button>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hello Raju! I am inquiring about ${category.title} photography availability.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-xs px-6 py-3.5 bg-cream border border-forest text-forest hover:bg-forest hover:text-cream transition-all shadow-xs"
            >
              <MessageCircle size={15} className="mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
