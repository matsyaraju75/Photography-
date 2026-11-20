"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Camera, MapPin, X } from "lucide-react";

interface FavoriteFrame {
  id: string;
  title: string;
  subject: string;
  location: string;
  imageUrl: string;
  note: string;
  exif: string;
}

const FAVORITE_FRAMES: FavoriteFrame[] = [
  {
    id: "ff-1",
    title: "Eastern Ghats Mountain Ridge Vista",
    subject: "Nature & Hills",
    location: "Paderu Heights",
    imageUrl: "/images/nature/mountain-ridge-view.jpg",
    note: "Taken at early dawn before the morning fog lifted. The layered mountain ridges stretched endlessly toward the horizon.",
    exif: "Sony A7 IV • 24-70mm f/2.8 • 1/200s • ISO 100",
  },
  {
    id: "ff-2",
    title: "Ricky & Micky — Sacred Vows",
    subject: "Telugu Wedding",
    location: "Paderu Mandapam",
    imageUrl: "/images/weddings/ricky-and-micky-wedding.jpg",
    note: "Between sacred chants and the amber glow of the holy fire, this pivotal moment of union captured the sacred soul of the wedding.",
    exif: "Sony A7 IV • 35mm f/1.4 GM • 1/500s • ISO 160",
  },
  {
    id: "ff-3",
    title: "Autumn Woods & Forest Canopy",
    subject: "Forest & Trees",
    location: "Maredumilli",
    imageUrl: "/images/nature/autumn-woods-landscape.jpg",
    note: "Quiet walking path under the canopy. Golden autumn leaves carpeting the earth beneath soft morning light.",
    exif: "Sony A7 IV • 35mm f/1.4 GM • 1/250s • ISO 160",
  },
  {
    id: "ff-4",
    title: "Evening Sparklers & Joyful Laughter",
    subject: "Celebrations & Milestones",
    location: "Paderu Hills",
    imageUrl: "/images/celebrations/celebrations-sparklers.jpg",
    note: "Golden sparks dancing in the night air, lighting up genuine smiles during an unforgettable family celebration.",
    exif: "Sony A7 IV • 35mm f/1.4 GM • 1/250s • ISO 800",
  },
  {
    id: "ff-5",
    title: "Turquoise Kingfisher by the Stream",
    subject: "Wildlife",
    location: "Maredumilli Stream",
    imageUrl: "/images/wildlife/kingfisher-perched.jpg",
    note: "Hours of silent waiting rewarded with brilliant turquoise plumage gleaming against running mountain waters.",
    exif: "Sony A7 IV • 200-600mm f/6.3 • 1/1600s • ISO 500",
  },
  {
    id: "ff-6",
    title: "Traditional Cradle & Naming Ceremony",
    subject: "Family Beginnings",
    location: "Paderu, ASR District",
    imageUrl: "/images/family/naming-ceremony-photoshoot.jpg",
    note: "Hands of family elders gently decorating the floral cradle to welcome the newest generation.",
    exif: "Sony A7 IV • 35mm f/1.4 GM • 1/400s • ISO 320",
  },
];

import { TextReveal } from "@/components/ui/TextReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function FavoriteFramesSection() {
  const [selectedFrame, setSelectedFrame] = useState<FavoriteFrame | null>(null);

  return (
    <section id="favorite-frames" className="py-24 sm:py-32 bg-cream-paper relative border-t border-earth/15 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Curated Personal Eye
            </Badge>
            <TextReveal
              text="My Favorite Frames"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            Photographs I hold dear — not because they were planned, but because they carry a quiet honesty that stays in the memory.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FAVORITE_FRAMES.map((frame) => (
            <div
              key={frame.id}
              onClick={() => setSelectedFrame(frame)}
              className="group cursor-pointer flex flex-col bg-cream border border-earth/20 overflow-hidden shadow-xs hover:border-forest/50 transition-all duration-300"
            >
              <div className="relative aspect-[3/2] sm:aspect-[4/3] w-full overflow-hidden bg-sand/30">
                <ParallaxImage
                  src={frame.imageUrl}
                  alt={frame.title}
                  aspectRatio="aspect-[3/2] sm:aspect-[4/3]"
                  speed={0.08}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[0.625rem] font-sans uppercase tracking-wider text-cream bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                      {frame.subject}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-cream text-[0.6875rem] pointer-events-none">
                    <span className="inline-flex items-center">
                      <MapPin size={12} className="text-sand mr-1" />
                      {frame.location}
                    </span>
                    <span className="text-[0.625rem] opacity-80 font-mono">
                      {frame.exif.split("•")[1]?.trim()}
                    </span>
                  </div>
                </ParallaxImage>
              </div>

              <div className="p-4 sm:p-5 flex flex-col space-y-2">
                <h3 className="font-serif text-lg text-charcoal font-medium group-hover:text-forest transition-colors">
                  {frame.title}
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed font-sans line-clamp-2 italic">
                  &ldquo;{frame.note}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Selected Frame */}
        {selectedFrame && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedFrame(null)}
          >
            <div
              className="bg-cream-paper max-w-3xl w-full border border-sand overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedFrame(null)}
                className="absolute top-3 right-3 z-10 p-2 bg-black/60 text-cream hover:bg-forest transition-colors"
                aria-label="Close frame preview"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={selectedFrame.imageUrl}
                  alt={selectedFrame.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between text-xs text-forest font-medium uppercase tracking-wider">
                  <span>{selectedFrame.subject} &bull; {selectedFrame.location}</span>
                  <span className="font-mono text-charcoal-muted text-[0.6875rem]">{selectedFrame.exif}</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {selectedFrame.title}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-charcoal/85 leading-relaxed">
                  &ldquo;{selectedFrame.note}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
