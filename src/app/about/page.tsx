import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS, STUDIO_CONFIG } from "@/lib/constants";
import { Camera, MapPin, Heart, ArrowRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Raju — ${STUDIO_CONFIG.name}`,
  description:
    "Learn about Raju, an independent photographer from Alluri Sitharama Raju (ASR) District, documenting celebrations, weddings, nature, and wildlife.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Header Banner */}
      <section className="py-20 sm:py-28 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <Badge variant="gold" className="mb-4">
            The Photographer
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight mb-4">
            A Little About Me
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl text-forest max-w-2xl font-light leading-relaxed">
            &ldquo;{STUDIO_CONFIG.aboutManifesto}&rdquo;
          </p>
        </Container>
      </section>

      {/* 2. Raju's Personal Journey */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Portrait Frame */}
            <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden bg-sand/30 border border-earth/25 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85"
                alt="Raju, Photographer from ASR District"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <span className="font-serif text-2xl font-medium block">Raju</span>
                <span className="font-sans text-xs uppercase tracking-widest text-sand-light">
                  Photographer &bull; ASR District, AP
                </span>
              </div>
            </div>

            {/* Narrative text */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-forest font-semibold">
                Roots &amp; Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-medium leading-snug">
                I photograph the place and people around me.
              </h2>
              <div className="w-12 h-[1.5px] bg-forest" />
              <div className="space-y-4 text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                <p>
                  I was born and raised in the hills of the <strong>Alluri Sitharama Raju (ASR) District</strong> in Andhra Pradesh.
                  Growing up among terraced coffee hills, mist-shrouded valleys, quiet tribal shandies, and ancient teak canopies,
                  I developed a natural reverence for natural light and quiet moments.
                </p>
                <p>
                  Photography to me is not about commanding people to pose or creating artificial spectacle. It is about patience.
                  It is watching the unspoken pride in a father&apos;s face during a wedding, the uncontainable laughter of children in a
                  village courtyard, the tender hands blessing a newborn in a cradle, or a hornbill perching silently on an old fig branch at dawn.
                </p>
                <p>
                  Whether documenting a marriage ceremony or exploring the forest canopy, I strive to deliver photographs that feel
                  as honest and warm as the memory itself.
                </p>
              </div>

              {/* Truthful Craft Highlights */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-earth/20">
                <div>
                  <span className="block text-2xl font-serif text-forest font-medium">ASR District</span>
                  <span className="text-xs text-charcoal-muted uppercase tracking-wider font-sans">Home &amp; Inspiration</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-forest font-medium">True-to-Life</span>
                  <span className="text-xs text-charcoal-muted uppercase tracking-wider font-sans">Color Philosophy</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-forest font-medium">Fine Art Prints</span>
                  <span className="text-xs text-charcoal-muted uppercase tracking-wider font-sans">Heirloom Quality</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. The Team Behind the Stories */}
      <section className="py-20 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <div className="mb-14">
            <Badge variant="gold" className="mb-3">
              The Crew
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
              The Team Behind the Stories
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mt-2 font-sans">
              For larger weddings and multi-day celebrations, Raju works alongside dedicated second shooters and cinematographers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="group bg-cream border border-earth/20 overflow-hidden shadow-xs hover:border-forest/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream">
                      <span className="font-sans text-[0.625rem] tracking-wider uppercase bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                        {member.yearsOfExperience} Yrs Craft
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-forest font-semibold block mb-1">
                      {member.role}
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal font-medium mb-2.5 group-hover:text-forest transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-charcoal/80 leading-relaxed font-sans mb-4">
                      {member.bio}
                    </p>

                    {member.featuredGear && member.featuredGear.length > 0 && (
                      <div className="pt-3 border-t border-earth/15">
                        <div className="flex items-center space-x-1.5 text-[0.6875rem] text-earth font-medium uppercase tracking-wider mb-2">
                          <Camera size={12} className="text-forest" />
                          <span>Primary Gear</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.featuredGear.map((g) => (
                            <span
                              key={g}
                              className="text-[0.65rem] bg-cream-paper px-2 py-0.5 border border-earth/20 text-charcoal-muted font-mono"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Booking & Connection CTA */}
      <section className="py-20 text-center">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-4">
            Planning a celebration or shoot?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            I would love to hear about your plans, venue, and vision. Let&apos;s create photographs you and your family will cherish forever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Check Date Availability
            </Button>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                STUDIO_CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-xs px-6 py-3.5 bg-cream-paper border border-forest text-forest hover:bg-forest hover:text-cream transition-all shadow-xs"
            >
              <MessageCircle size={15} className="mr-2" />
              Direct WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
