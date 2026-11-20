"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ALBUM_PROCESS_STEPS, ALBUMS, STUDIO_CONFIG } from "@/lib/constants";
import { BookOpen, Check, Layers, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export default function AlbumsPage() {
  const [selectedSwatch, setSelectedSwatch] = useState("earth-leather");
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);

  const swatches = [
    { id: "earth-leather", label: "Earth Brown Leather", color: "#765B43", type: "Full-Grain Leather" },
    { id: "forest-leather", label: "Forest Green Leather", color: "#2F4A3A", type: "Full-Grain Leather" },
    { id: "sand-linen", label: "Natural Woven Linen", color: "#D8C9B3", type: "Textured Linen" },
    { id: "charcoal-cloth", label: "Charcoal Book Cloth", color: "#252525", type: "Archival Cloth" },
  ];

  const albumSpreads = [
    {
      title: "Cover & Spine Embossing",
      caption: "Handcrafted cover with deep blind debossing of your names, date, and venue.",
      image: "/images/weddings/ricky-and-micky-wedding.jpg",
    },
    {
      title: "Ceremony Opening Spread",
      caption: "180-degree seamless lay-flat opening allowing full-width panoramic wedding vistas without a center gap.",
      image: "/images/weddings/bride-and-groom.webp",
    },
    {
      title: "Festive Banquet & Family Spread",
      caption: "Printed on heavy 250gsm fine-art matte paper that absorbs ambient room light and resists fingerprints.",
      image: "/images/celebrations/celebrations-sparklers.jpg",
    },
  ];

  const prevSpread = () => {
    setActiveSpreadIndex((prev) => (prev === 0 ? albumSpreads.length - 1 : prev - 1));
  };

  const nextSpread = () => {
    setActiveSpreadIndex((prev) => (prev === albumSpreads.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative min-h-screen bg-cream text-charcoal pb-28">
      {/* 1. Header Banner */}
      <section className="py-20 sm:py-28 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <Badge variant="gold" className="mb-4">
            Supporting Service
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-tight mb-4">
            From Photo to Album
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-forest max-w-2xl font-light leading-relaxed">
            In a world of fleeting smartphone screens, we bind your memories in handcrafted, lay-flat books made to be held by grandchildren.
          </p>
        </Container>
      </section>

      {/* 2. Handcrafted Albums Showcase */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {ALBUMS.map((album) => (
              <div
                key={album.id}
                className="bg-cream-paper border border-earth/20 p-7 sm:p-10 flex flex-col justify-between shadow-xs group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand/30 mb-6">
                    <Image
                      src={album.coverImage}
                      alt={album.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[0.625rem] font-sans uppercase tracking-widest text-cream bg-black/60 px-2.5 py-1 backdrop-blur-xs font-semibold">
                        Lay-Flat Heirloom
                      </span>
                    </div>
                  </div>

                  <span className="font-sans text-xs uppercase tracking-widest text-forest font-semibold block mb-1">
                    {album.subtitle}
                  </span>

                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium mb-3">
                    {album.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans mb-6">
                    {album.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-earth/15 text-xs text-charcoal-muted">
                    <div className="flex items-center space-x-2">
                      <Check size={13} className="text-forest shrink-0" />
                      <span>{album.material}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check size={13} className="text-forest shrink-0" />
                      <span>{album.pagesCount} Thick Photographic Lay-Flat Pages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check size={13} className="text-forest shrink-0" />
                      <span>True 180&deg; Gutter-Free Panoramic Spreads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. The 5-Step Crafting Journey */}
      <section className="py-20 border-b border-earth/20 bg-cream-paper">
        <Container size="wide">
          <div className="mb-14">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-forest block mb-1 font-semibold">
              The Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Capture &rarr; Select &rarr; Edit &rarr; Design &rarr; Album
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mt-2 font-sans">
              Every heirloom book is curated with care, giving your story room to breathe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ALBUM_PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-5 bg-cream border border-earth/20 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-2xl text-forest font-medium">
                      {step.number}
                    </span>
                    <span className="text-[0.625rem] font-sans uppercase tracking-widest text-earth">
                      Phase
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal font-medium mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Interactive Lay-Flat Spread Preview */}
      <section className="py-20 border-b border-earth/20">
        <Container size="wide">
          <div className="bg-cream-paper border border-earth/25 p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-earth/15 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-forest font-semibold flex items-center">
                  <BookOpen size={14} className="mr-1.5" />
                  Interactive Spread Viewer
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium mt-1">
                  {albumSpreads[activeSpreadIndex].title}
                </h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-charcoal-muted font-mono">
                  Spread {activeSpreadIndex + 1} of {albumSpreads.length}
                </span>
                <button
                  onClick={prevSpread}
                  className="p-2 border border-earth/25 bg-cream text-charcoal hover:bg-forest hover:text-cream transition-colors"
                  aria-label="Previous spread"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSpread}
                  className="p-2 border border-earth/25 bg-cream text-charcoal hover:bg-forest hover:text-cream transition-colors"
                  aria-label="Next spread"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/20 border border-earth/20 shadow-inner">
              <Image
                src={albumSpreads[activeSpreadIndex].image}
                alt={albumSpreads[activeSpreadIndex].title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain sm:object-cover"
              />
              <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/25 to-black/15 pointer-events-none hidden sm:block opacity-40" />
            </div>

            <p className="mt-4 text-xs sm:text-sm text-charcoal-muted text-center italic font-serif">
              &ldquo;{albumSpreads[activeSpreadIndex].caption}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* 5. Material Swatches */}
      <section className="py-20 border-b border-earth/20 bg-cream-paper">
        <Container size="narrow" className="text-center">
          <Badge variant="gold" className="mb-3">
            Cover Materials
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            Handpicked Leathers &amp; Linens
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Select from natural earth-tone leathers and organic textured fabrics suited for family archives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {swatches.map((swatch) => (
              <button
                key={swatch.id}
                onClick={() => setSelectedSwatch(swatch.id)}
                className={`p-3 bg-cream border transition-all text-left flex items-center space-x-3 cursor-pointer ${
                  selectedSwatch === swatch.id
                    ? "border-forest ring-1 ring-forest shadow-xs"
                    : "border-earth/20 hover:border-earth/40"
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: swatch.color }}
                />
                <div>
                  <span className="block text-xs font-semibold text-charcoal">{swatch.label}</span>
                  <span className="text-[0.65rem] text-charcoal-muted font-sans">{swatch.type}</span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Booking Callout */}
      <section className="py-20 text-center">
        <Container size="narrow">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal mb-3">
            Include an Album in Your Booking
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto mb-8 font-sans leading-relaxed">
            Every wedding or ceremony package can include a handcrafted lay-flat album. Ask Raju about sample bindings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/#contact">
              Inquire About Albums
            </Button>
            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Hello Raju! I'd like to ask about including a handcrafted photo album with my session."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] text-xs px-6 py-3.5 bg-cream-paper border border-forest text-forest hover:bg-forest hover:text-cream transition-all shadow-xs"
            >
              <MessageCircle size={15} className="mr-2" />
              WhatsApp Inquiry
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
