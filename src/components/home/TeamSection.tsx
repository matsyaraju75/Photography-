import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TEAM_MEMBERS } from "@/lib/constants";
import { Camera } from "lucide-react";

export function TeamSection() {
  return (
    <section id="team" className="py-24 sm:py-32 bg-cream relative border-t border-earth/15">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-earth/20">
          <div>
            <Badge variant="gold" className="mb-3">
              People &amp; Cameras
            </Badge>
            <TextReveal
              text="The Team Behind the Stories"
              as="h2"
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal block"
            />
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mt-4 md:mt-0 leading-relaxed font-sans">
            A small, dedicated team working with quiet presence. We focus on capturing genuine moments without disrupting the natural flow of your day.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, idx) => (
            <Reveal
              key={member.id}
              delay={idx * 0.1}
              className="group bg-cream-paper border border-earth/20 hover:border-forest/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Member Portrait */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand/30">
                  <Image
                    src={member.portrait}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-cream">
                    <span className="font-sans text-[0.625rem] tracking-wider uppercase bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                      {member.yearsOfExperience} Yrs Craft
                    </span>
                    <span className="text-[0.625rem] text-sand-light">
                      [REPLACE_WITH_REAL_TEAM_MEMBER]
                    </span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-forest font-semibold block mb-1">
                    {member.role}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal font-medium mb-2.5 group-hover:text-forest transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans mb-5">
                    {member.bio}
                  </p>

                  {/* Gear List */}
                  {member.featuredGear && member.featuredGear.length > 0 && (
                    <div className="pt-4 border-t border-earth/15">
                      <div className="flex items-center space-x-1.5 text-[0.6875rem] text-earth font-medium uppercase tracking-wider mb-2">
                        <Camera size={12} className="text-forest" />
                        <span>Core Gear</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.featuredGear.map((g) => (
                          <span
                            key={g}
                            className="text-[0.65rem] bg-cream px-2 py-0.5 border border-earth/20 text-charcoal-muted font-mono"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
