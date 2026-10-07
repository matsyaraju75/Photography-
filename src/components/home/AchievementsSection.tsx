import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ACHIEVEMENTS } from "@/lib/constants";
import { AchievementItem } from "@/types";
import { Award, Trophy } from "lucide-react";

export function AchievementsSection() {
  return (
    <section className="py-28 sm:py-36 bg-cream relative border-t border-earth/20 grain-overlay">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-4">
              Exhibitions &bull; Recognition
            </Badge>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
              Recognition
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-6 md:mt-0 leading-relaxed font-sans">
            Honored for documentary work preserving local tribal traditions, weddings, and Eastern Ghats nature.
          </p>
        </div>

        {/* Recognition Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {ACHIEVEMENTS.map((item: AchievementItem) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 bg-studio-card border border-studio-border hover:border-studio-gold/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl text-studio-gold font-light">
                    {item.year}
                  </span>
                  <Trophy size={18} className="text-studio-gold/60 group-hover:text-studio-gold transition-colors" />
                </div>

                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.2em] text-studio-muted block mb-2 font-medium">
                  {item.issuer}
                </span>

                <h3 className="font-serif text-2xl text-studio-sand font-normal mb-4 group-hover:text-studio-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-studio-muted leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-studio-border/50 text-[0.65rem] uppercase tracking-widest text-studio-sand/70">
                Juried Guild Recognition
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
