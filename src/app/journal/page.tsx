import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { JOURNAL_POSTS, STUDIO_CONFIG } from "@/lib/constants";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `The Journal & Field Notes — ${STUDIO_CONFIG.name}`,
  description:
    "Reflections on morning light in Araku, quiet wedding documentation, and ethical wildlife photography from Raju in ASR District.",
};

export default function JournalIndexPage() {
  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* Header Banner */}
      <section className="py-20 sm:py-28 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <Badge variant="gold" className="mb-4">
            Field Notes &amp; Reflections
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight mb-4">
            The Journal &amp; Field Notes
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-forest max-w-2xl font-light leading-relaxed">
            Personal observations on natural morning light, sacred ceremony rhythm, and observing wildlife in the Eastern Ghats.
          </p>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {JOURNAL_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/journal/${post.slug}`}
                className="group flex flex-col bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all duration-300 overflow-hidden shadow-xs"
              >
                {/* Article Cover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-cream bg-black/60 px-2.5 py-1 backdrop-blur-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-3 text-xs text-charcoal-muted mb-2 font-mono">
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1 text-forest" />
                        {post.publishDate}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1 text-forest" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl text-charcoal font-medium leading-snug mb-3 group-hover:text-forest transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-xs text-charcoal/80 leading-relaxed font-sans line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-earth/15 flex items-center justify-between text-xs text-forest font-semibold uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
