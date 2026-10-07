import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PhotoGrid } from "@/components/portfolio/PhotoGrid";
import { FEATURED_STORIES, STUDIO_CONFIG } from "@/lib/constants";
import { ArrowLeft, Calendar, MapPin, Camera, Quote, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return FEATURED_STORIES.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = FEATURED_STORIES.find((s) => s.slug === slug);

  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} — ${story.categoryLabel}`,
    description: story.summary,
    openGraph: {
      title: `${story.title} | ${STUDIO_CONFIG.name}`,
      description: story.summary,
      images: [{ url: story.coverImage.url, width: 1200, height: 630 }],
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = FEATURED_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  // Aggregate all photos across chapters
  const allStoryPhotos = [
    story.coverImage,
    ...story.chapters.flatMap((ch) => ch.photos),
  ];

  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Story Hero Banner */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-end overflow-hidden pb-14 pt-28">
        <div className="absolute inset-0 z-0">
          <Image
            src={story.coverImage.url}
            alt={story.coverImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.6] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-black/40 to-black/60" />
        </div>

        <Container size="wide" className="relative z-10">
          <Link
            href="/stories"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-cream hover:text-sand-light transition-colors mb-6 drop-shadow-sm font-medium"
          >
            <ArrowLeft size={14} />
            <span>All Stories</span>
          </Link>

          <div className="max-w-3xl text-cream drop-shadow-md">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
              <Badge variant="gold" className="bg-cream/90 text-forest border-cream font-medium">
                {story.categoryLabel}
              </Badge>
              <span className="inline-flex items-center text-sand-light">
                <MapPin size={12} className="mr-1" />
                {story.location}
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center text-sand-light">
                <Calendar size={12} className="mr-1" />
                {story.eventDate}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cream font-normal leading-tight mb-4">
              {story.title}
            </h1>

            <p className="font-sans text-sm sm:text-base text-cream/90 font-light leading-relaxed max-w-2xl">
              {story.summary}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Story Chapters & Narrative Breakdown */}
      {story.chapters.length > 0 && (
        <section className="py-20 border-b border-earth/20 bg-cream-paper">
          <Container size="wide">
            <div className="space-y-24">
              {story.chapters.map((chapter) => (
                <div key={chapter.id} className="space-y-8">
                  <div className="max-w-2xl">
                    <span className="text-xs font-mono uppercase tracking-widest text-forest font-semibold block mb-1">
                      Chapter 0{chapter.order}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium mb-3">
                      {chapter.title}
                    </h2>
                    {chapter.description && (
                      <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                        {chapter.description}
                      </p>
                    )}
                  </div>

                  {chapter.photos.length > 0 && (
                    <PhotoGrid photos={chapter.photos} columns={chapter.photos.length === 1 ? 2 : 3} />
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Client Quote if available */}
      {story.testimonial && (
        <section className="py-20 border-b border-earth/20 bg-cream">
          <Container size="narrow" className="text-center">
            <Quote size={28} className="text-forest/30 mx-auto mb-4" />
            <p className="font-serif italic text-xl sm:text-2xl text-charcoal leading-relaxed mb-4">
              &ldquo;{story.testimonial.quote}&rdquo;
            </p>
            <p className="font-sans text-xs uppercase tracking-widest text-forest font-semibold">
              &mdash; {story.testimonial.author}
            </p>
          </Container>
        </section>
      )}

      {/* 4. Complete Story Frames Gallery */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-earth/20">
            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-1 font-semibold">
                Photo Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                All Captured Frames
              </h2>
            </div>
            <span className="text-xs text-charcoal-muted font-mono mt-2 md:mt-0">
              {allStoryPhotos.length} Master Frames
            </span>
          </div>

          <PhotoGrid photos={allStoryPhotos} />
        </Container>
      </section>

      {/* 5. Booking Callout */}
      <section className="py-20 text-center bg-cream-paper">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            Inspired by this story?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Every celebration has its own heartbeat. Let&apos;s talk about documenting yours with simple honesty and true-to-life colors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Check Date Availability
            </Button>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                `Hello Raju! I just viewed the '${story.title}' story on your website and would love to check availability.`
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
