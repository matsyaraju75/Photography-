"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  }) {
  useEffect(() => {
    console.error("Client Error Boundary caught exception:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-cream text-charcoal text-center py-24">
      <Container size="narrow" className="flex flex-col items-center">
        <Badge variant="gold" className="mb-4">
          Temporary Interruption
        </Badge>

        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal leading-snug mb-3">
          Something Went Wrong
        </h1>

        <div className="w-12 h-[1.5px] bg-forest my-4" />

        <p className="text-xs sm:text-sm text-charcoal-muted font-sans max-w-md mb-8 leading-relaxed">
          The page encountered an unexpected issue while loading. Please try refreshing or return to the homepage.
        </p>

        <div className="flex items-center space-x-4">
          <Button variant="primary" size="md" onClick={() => reset()}>
            <span className="flex items-center space-x-2">
              <RefreshCw size={14} />
              <span>Try Again</span>
            </span>
          </Button>
          <Button variant="secondary" size="md" href="/">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
