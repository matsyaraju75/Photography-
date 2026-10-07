"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Clean, dedicated full-bleed admin layout without public header & footer
    return <div className="min-h-screen w-full bg-cream">{children}</div>;
  }

  // Standard public customer-facing layout with header, main content, and footer
  return (
    <>
      <Header />
      <main className="flex-1 w-full pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
