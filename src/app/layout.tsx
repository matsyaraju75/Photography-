import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { STUDIO_CONFIG } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F1E8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rajusphotography.com"),
  title: {
    default: `${STUDIO_CONFIG.name} — ${STUDIO_CONFIG.tagline}`,
    template: `%s | ${STUDIO_CONFIG.name}`,
  },
  description: STUDIO_CONFIG.shortDescription,
  keywords: [
    "Raju's Photography",
    "ASR District Photography",
    "Alluri Sitharama Raju Photographer",
    "Wedding Photography ASR",
    "Telugu Wedding Photographer",
    "Araku Valley Pre-Wedding Shoot",
    "Lambasingi Winter Mist Photography",
    "Paderu Wedding Photography",
    "Birthday Photography",
    "Naming Ceremony Photography",
    "Nature Photography Eastern Ghats",
    "Wildlife Photography South India",
    "Handcrafted Canvera Album Design",
  ],
  authors: [{ name: "Raju", url: "https://rajusphotography.com" }],
  creator: "Raju",
  publisher: STUDIO_CONFIG.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rajusphotography.com",
    siteName: STUDIO_CONFIG.name,
    title: `${STUDIO_CONFIG.name} — ${STUDIO_CONFIG.tagline}`,
    description: STUDIO_CONFIG.shortDescription,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: `${STUDIO_CONFIG.name} — Stories of Life. Moments of Nature.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${STUDIO_CONFIG.name} — ${STUDIO_CONFIG.tagline}`,
    description: STUDIO_CONFIG.shortDescription,
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": "https://rajusphotography.com/#business",
    name: STUDIO_CONFIG.name,
    description: STUDIO_CONFIG.shortDescription,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
    url: "https://rajusphotography.com",
    telephone: STUDIO_CONFIG.phone,
    email: STUDIO_CONFIG.contactEmail,
    priceRange: "₹₹ (₹20,000 - ₹1,65,000 INR)",
    currenciesAccepted: "INR",
    paymentAccepted: "UPI, Net Banking, Cash, Bank Transfer",
    openingHours: "Mo-Su 07:00-21:00",
    founder: {
      "@type": "Person",
      name: "Raju",
      jobTitle: "Lead Visual Storyteller & Photographer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paderu",
        addressRegion: "Alluri Sitharama Raju District, Andhra Pradesh",
        addressCountry: "IN",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Paderu / Araku Valley",
      addressLocality: "Paderu",
      addressRegion: "Andhra Pradesh",
      postalCode: "531024",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.0833",
      longitude: "82.6667",
    },
    areaServed: [
      { "@type": "Place", name: "Alluri Sitharama Raju District" },
      { "@type": "Place", name: "Paderu" },
      { "@type": "Place", name: "Araku Valley" },
      { "@type": "Place", name: "Lambasingi" },
      { "@type": "Place", name: "Chintapalli" },
      { "@type": "Place", name: "Ananthagiri" },
      { "@type": "Place", name: "Visakhapatnam" },
      { "@type": "Place", name: "Andhra Pradesh" },
      { "@type": "Place", name: "South India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography & Cinematography Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Telugu Wedding & Marriage Photography",
            description: "Full documentary coverage of traditional rituals, Jeelakarra Bellam muhurtham, and candid family portraits.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hilltop Pre-Wedding Shoot",
            description: "Unscripted couple photography in Lambasingi morning mist and Araku coffee estate trails.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Naming & Cradle Ceremony Photography",
            description: "Traditional Uyyala Pandaga celebrations in ancestral homes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Birthday & Milestone Celebration Photography",
            description: "Candid celebration coverage with families and children.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Eastern Ghats Nature & Wildlife Documentation",
            description: "Ethical bio-documentation of forests, bird canopy, and native wildlife.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Canvera Flush-Mount Heirloom Album Design",
            description: "Handcrafted 250 GSM archival velvet matte lay-flat albums.",
          },
        },
      ],
    },
    sameAs: [
      STUDIO_CONFIG.social.instagram,
      STUDIO_CONFIG.social.youtube,
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} antialiased bg-cream text-charcoal`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col selection:bg-forest selection:text-cream bg-cream text-charcoal">
        <SmoothScrollProvider>
          <AppShell>
            {children}
          </AppShell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
