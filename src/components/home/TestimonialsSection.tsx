"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/constants";
import { ReviewSubmissionModal } from "@/components/business/ReviewSubmissionModal";
import { Star, Quote, MapPin, MessageSquarePlus, ArrowRight } from "lucide-react";

export function TestimonialsSection() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-cream relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              Client Stories &bull; Real Words
            </Badge>
            <TextReveal
              text="Words of Trust"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm leading-relaxed font-sans">
              The greatest honor is being welcomed into a family&apos;s sacred rituals, preserving memories that outlive us all.
            </p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-cream-paper hover:bg-cream border border-earth/25 hover:border-forest text-xs font-mono uppercase tracking-wider text-forest font-semibold rounded-xs transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              <MessageSquarePlus size={14} />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS.map((test, idx) => (
            <Reveal
              key={test.id}
              delay={idx * 0.15}
              className="p-8 sm:p-10 bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all duration-300 flex flex-col justify-between shadow-xs group rounded-xs"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 mb-5 text-amber-500">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <Quote size={20} className="text-forest/30 mb-3" />

                <p className="font-serif italic text-base sm:text-lg text-charcoal/90 leading-relaxed mb-6">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-earth/15">
                <h3 className="font-serif text-lg text-charcoal font-medium">
                  {test.clientName}
                </h3>
                <div className="flex items-center space-x-2 text-[0.7rem] text-charcoal-muted font-sans mt-1">
                  <span>{test.eventType}</span>
                  <span>&bull;</span>
                  <span className="flex items-center space-x-1 text-forest">
                    <MapPin size={11} className="mr-0.5" />
                    <span>{test.location}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Banner to Business Features */}
        <div className="mt-16 p-6 sm:p-8 bg-cream-paper border border-earth/20 rounded-xs shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-earth font-semibold block mb-1">
              Ready to Plan Your Celebration?
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-semibold">
              Explore Collections &amp; Check Calendar Dates
            </h3>
            <p className="text-xs text-charcoal-muted mt-1 max-w-md leading-relaxed">
              Use our interactive investment estimator or check live seasonal availability across ASR District.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="sm" href="/investment">
              <span>View Packages</span>
              <ArrowRight size={13} className="ml-1" />
            </Button>
            <Button variant="secondary" size="sm" href="/availability">
              <span>Check Dates</span>
            </Button>
          </div>
        </div>
      </Container>

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
}
