import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutMeSection } from "@/components/home/AboutMeSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { SignatureWorkSection } from "@/components/home/SignatureWorkSection";
import { AsrStoriesSection } from "@/components/home/AsrStoriesSection";
import { MasonryGallerySection } from "@/components/home/MasonryGallerySection";
import { FloatingGallerySection } from "@/components/home/FloatingGallerySection";
import { BehindTheLensSection } from "@/components/home/BehindTheLensSection";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { TeamSection } from "@/components/home/TeamSection";
import { AlbumDesignSection } from "@/components/home/AlbumDesignSection";
import { FavoriteFramesSection } from "@/components/home/FavoriteFramesSection";
import { InvestmentPreviewSection } from "@/components/home/InvestmentPreviewSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-cream text-charcoal">
      {/* 1. Hero: Stories of Life. Moments of Nature. */}
      <HeroSection />

      {/* 2. About the Photographer: A Little About Me */}
      <AboutMeSection />

      {/* 3. Photography Categories: 6 Visual Worlds */}
      <CategoryShowcase />

      {/* 4. Featured Stories: Narrative Photo Essays */}
      <SignatureWorkSection />

      {/* 5. Regional Identity: Stories from ASR */}
      <AsrStoriesSection />

      {/* 6. Photo Wall & Gallery: Interactive Masonry Exhibition */}
      <MasonryGallerySection />

      {/* 7. Spatial 3D Depth Exhibition: Subtle Depth-Based Floating Wall */}
      <FloatingGallerySection />

      {/* 8. Behind the Lens: Setup -> Shoot -> Edit -> Final Photo */}
      <BehindTheLensSection />

      {/* 8. RAW <-> Final Editing Comparison */}
      <BeforeAfterSlider />

      {/* 8. Team: The Team Behind the Stories */}
      <TeamSection />

      {/* 9. Supporting Service: From Photo to Album */}
      <AlbumDesignSection />

      {/* 10. Curated Eye: My Favorite Frames */}
      <FavoriteFramesSection />

      {/* 11. Investment & Packages: Transparent Pricing & Live Calculator */}
      <InvestmentPreviewSection />

      {/* 12. Testimonials / Client Stories */}
      <TestimonialsSection />

      {/* 13. Contact: Booking & Consultation Form */}
      <ContactSection />
    </div>
  );
}
