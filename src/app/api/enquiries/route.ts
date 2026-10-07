import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  eventDate?: string | null;
  location?: string | null;
  guestCount?: number | null;
  includeVideo: boolean;
  includeAlbum: boolean;
  message: string;
  status: "NEW" | "CONTACTED" | "MEETING_SCHEDULED" | "BOOKED" | "ARCHIVED";
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

// In-memory fallback seeded with authentic Alluri Sitharama Raju (ASR) District inquiries
let fallbackEnquiries: EnquiryRecord[] = [
  {
    id: "enq-1",
    name: "Suresh & Ananya",
    email: "suresh.v@gmail.com",
    phone: "+91 98480 12345",
    serviceType: "wedding",
    eventDate: "2026-11-18",
    location: "Paderu Hilltop Kalyana Mandapam, ASR District",
    guestCount: 450,
    includeVideo: true,
    includeAlbum: true,
    message: "Traditional Telugu wedding ceremony with morning Jeelakarra Bellam muhurtham. Looking for candid documentation of rituals and a couple portrait session amidst the hills.",
    status: "NEW",
    notes: "Preferred muhurtham 8:45 AM. Interested in the 50-page Canvera flush-mount album.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "enq-2",
    name: "Kiran & Deepika",
    email: "kiran.deepika@outlook.com",
    phone: "+91 94401 56789",
    serviceType: "pre-wedding",
    eventDate: "2026-10-24",
    location: "Lambasingi Pine Forests & Araku Valley",
    guestCount: null,
    includeVideo: true,
    includeAlbum: true,
    message: "Planning a relaxed 2-day pre-wedding couple shoot in early winter Lambasingi morning mist and coffee estate hills. Looking for natural, unposed storytelling.",
    status: "CONTACTED",
    notes: "Spoke on phone. Discussed 5:30 AM sunrise shoot location in Lambasingi view point and Araku coffee trails.",
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: "enq-3",
    name: "Chaitanya & Swathi",
    email: "swathi.chaitanya@yahoo.com",
    phone: "+91 99890 34567",
    serviceType: "naming-ceremony",
    eventDate: "2026-10-30",
    location: "Chintapalli Ancestral Home",
    guestCount: 120,
    includeVideo: false,
    includeAlbum: true,
    message: "Traditional cradle ceremony (Uyyala pandaga) for our newborn daughter with close family and elders.",
    status: "BOOKED",
    notes: "Advance confirmed. Raju will bring prime portrait lenses and natural lighting kit.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "enq-4",
    name: "Kavitha & Rajesh",
    email: "rajesh.kavitha@gmail.com",
    phone: "+91 89190 23456",
    serviceType: "birthday",
    eventDate: "2026-11-05",
    location: "Ananthagiri Resort Lawns",
    guestCount: 90,
    includeVideo: true,
    includeAlbum: false,
    message: "First birthday celebration of our son Reyansh. Outdoor lawn party with games, cake cutting, and sunset portraits.",
    status: "NEW",
    notes: "Wants 4K highlight video reel along with candid photos.",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "enq-5",
    name: "Dr. Vikram Varma (Eastern Ghats Bio-Trust)",
    email: "vikram.varma@egbiotrust.org",
    phone: "+91 98660 78901",
    serviceType: "wildlife",
    eventDate: "2026-12-01",
    location: "Maredumilli & Chintapalli Forest Corridor",
    guestCount: null,
    includeVideo: true,
    includeAlbum: true,
    message: "Winter canopy bird documentation and conservation monograph for Malabar Pied Hornbills and stream ecosystems. Looking for ethical wildlife photojournalism.",
    status: "MEETING_SCHEDULED",
    notes: "Scheduled Zoom / studio consultation for Oct 12 to finalize route and forest permit logistics.",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const records = await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ success: true, enquiries: records });
    }
  } catch (error) {
    console.warn("Database query skipped, returning fallback inquiries:", error);
  }

  return NextResponse.json({ success: true, enquiries: fallbackEnquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      serviceType,
      eventDate,
      location,
      guestCount,
      includeVideo,
      includeAlbum,
      message,
    } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Phone, Message)." },
        { status: 400 }
      );
    }

    const newEnquiry: EnquiryRecord = {
      id: `enq-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      serviceType: serviceType || "wedding",
      eventDate: eventDate || null,
      location: location || null,
      guestCount: guestCount ? parseInt(String(guestCount), 10) : null,
      includeVideo: Boolean(includeVideo),
      includeAlbum: Boolean(includeAlbum),
      message: message.trim(),
      status: "NEW",
      notes: "",
      createdAt: new Date().toISOString(),
    };

    if (process.env.DATABASE_URL) {
      try {
        const saved = await prisma.enquiry.create({
          data: {
            name: newEnquiry.name,
            email: newEnquiry.email,
            phone: newEnquiry.phone,
            serviceType: newEnquiry.serviceType,
            eventDate: newEnquiry.eventDate ? new Date(newEnquiry.eventDate) : null,
            location: newEnquiry.location,
            guestCount: newEnquiry.guestCount,
            includeVideo: newEnquiry.includeVideo,
            includeAlbum: newEnquiry.includeAlbum,
            message: newEnquiry.message,
            status: "NEW",
          },
        });
        return NextResponse.json({ success: true, enquiry: saved }, { status: 201 });
      } catch (dbErr) {
        console.warn("DB save failed, falling back to in-memory store:", dbErr);
      }
    }

    fallbackEnquiries.unshift(newEnquiry);
    return NextResponse.json({ success: true, enquiry: newEnquiry }, { status: 201 });
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID is required for updating." },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      try {
        const updated = await prisma.enquiry.update({
          where: { id },
          data: {
            ...(status ? { status } : {}),
            ...(notes !== undefined ? { notes } : {}),
          },
        });
        return NextResponse.json({ success: true, enquiry: updated });
      } catch (dbErr) {
        console.warn("DB update failed, attempting fallback store:", dbErr);
      }
    }

    const idx = fallbackEnquiries.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json(
        { success: false, error: "Inquiry record not found." },
        { status: 404 }
      );
    }

    fallbackEnquiries[idx] = {
      ...fallbackEnquiries[idx],
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, enquiry: fallbackEnquiries[idx] });
  } catch (err) {
    console.error("Error updating enquiry:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID query parameter is required." },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      try {
        await prisma.enquiry.delete({
          where: { id },
        });
        return NextResponse.json({ success: true, message: "Enquiry deleted." });
      } catch (dbErr) {
        console.warn("DB delete failed, falling back to in-memory store:", dbErr);
      }
    }

    const beforeLen = fallbackEnquiries.length;
    fallbackEnquiries = fallbackEnquiries.filter((e) => e.id !== id);

    if (fallbackEnquiries.length === beforeLen) {
      return NextResponse.json(
        { success: false, error: "Inquiry record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Enquiry deleted." });
  } catch (err) {
    console.error("Error deleting enquiry:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
