import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JOURNAL_POSTS, STUDIO_CONFIG } from "@/lib/constants";
import { ArrowLeft, Clock, Calendar, User, Quote, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} — ${STUDIO_CONFIG.name} Journal`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${STUDIO_CONFIG.name}`,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Article Header */}
      <section className="pt-24 pb-14 bg-cream-paper border-b border-earth/20">
        <Container size="narrow">
          <Link
            href="/journal"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-forest hover:text-forest-dark transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={14} />
            <span>The Journal</span>
          </Link>

          <div>
            <Badge variant="gold" className="mb-3">
              {post.category}
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-muted font-mono pt-3 border-t border-earth/15">
              <span className="flex items-center text-charcoal font-medium">
                <User size={13} className="mr-1 text-forest" />
                {post.author} ({post.authorRole})
              </span>
              <span>&bull;</span>
              <span className="flex items-center">
                <Calendar size={13} className="mr-1 text-forest" />
                {post.publishDate}
              </span>
              <span>&bull;</span>
              <span className="flex items-center">
                <Clock size={13} className="mr-1 text-forest" />
                {post.readTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Hero Image */}
      <section className="py-12 border-b border-earth/20">
        <Container size="narrow">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30 border border-earth/25 shadow-xs">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* 3. Article Content */}
      <section className="py-12">
        <Container size="narrow">
          {/* Excerpt callout */}
          <div className="p-6 bg-cream-paper border-l-2 border-forest mb-10 text-base sm:text-lg font-serif italic text-charcoal/90 leading-relaxed">
            &ldquo;{post.excerpt}&rdquo;
          </div>

          <div className="space-y-6 text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Author Footnote */}
          <div className="mt-16 pt-8 border-t border-earth/20 flex items-center justify-between">
            <div>
              <span className="font-serif text-lg text-charcoal font-medium block">
                {post.author}
              </span>
              <span className="text-xs text-charcoal-muted font-sans">
                {post.authorRole} &bull; Based in ASR District
              </span>
            </div>
            <Link
              href="/#contact"
              className="text-xs uppercase tracking-wider text-forest font-semibold hover:underline"
            >
              Get in Touch &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </article>
  );
}
