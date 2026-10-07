import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream text-charcoal text-center py-24">
      <Container size="narrow" className="flex flex-col items-center">
        <Badge variant="gold" className="mb-4">
          Error 404 &bull; Unexposed Frame
        </Badge>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal font-normal leading-none mb-4">
          Frame Not Found
        </h1>

        <div className="w-12 h-[1.5px] bg-forest my-4" />

        <p className="text-xs sm:text-sm text-charcoal-muted font-sans max-w-md mb-8 leading-relaxed">
          The requested page, story, or category cannot be found or has moved within Raju&apos;s Photography website.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button variant="primary" size="md" href="/">
            <span className="flex items-center space-x-2">
              <ArrowLeft size={14} />
              <span>Return to Homepage</span>
            </span>
          </Button>
          <Button variant="secondary" size="md" href="/stories">
            Explore Stories Archive
          </Button>
        </div>
      </Container>
    </div>
  );
}
