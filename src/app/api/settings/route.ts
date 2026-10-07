import { NextResponse } from "next/server";
import { STUDIO_CONFIG } from "@/lib/constants";

let studioSettings = {
  name: STUDIO_CONFIG.name,
  tagline: STUDIO_CONFIG.tagline,
  heroHook: STUDIO_CONFIG.heroHook,
  shortDescription: STUDIO_CONFIG.shortDescription,
  location: STUDIO_CONFIG.location,
  address: STUDIO_CONFIG.address,
  phone: STUDIO_CONFIG.phone,
  whatsappNumber: STUDIO_CONFIG.whatsappNumber,
  whatsappMessage: STUDIO_CONFIG.whatsappMessage,
  contactEmail: STUDIO_CONFIG.contactEmail,
  instagram: STUDIO_CONFIG.social.instagram,
  youtube: STUDIO_CONFIG.social.youtube,
  craftYears: "8+",
  activeRegion: "Alluri Sitharama Raju (ASR) District & Eastern Ghats",
};

export async function GET() {
  return NextResponse.json({ success: true, settings: studioSettings });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    studioSettings = {
      ...studioSettings,
      ...body,
    };
    return NextResponse.json({ success: true, settings: studioSettings });
  } catch (err) {
    console.error("Error updating settings:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
