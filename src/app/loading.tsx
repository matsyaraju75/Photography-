import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream text-charcoal text-center p-8">
      <div className="w-10 h-10 border-2 border-forest/20 border-t-forest rounded-full animate-spin mb-4" />
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal-muted">
        Loading Photographs...
      </span>
    </div>
  );
}
