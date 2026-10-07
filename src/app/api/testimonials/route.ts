import { NextResponse } from "next/server";
import { TESTIMONIALS } from "@/lib/constants";

export interface ReviewRecord {
  id: string;
  clientName: string;
  eventType: string;
  location: string;
  date: string;
  quote: string;
  rating: number;
  status: "APPROVED" | "PENDING" | "ARCHIVED";
  createdAt: string;
}

// In-memory testimonials store initialized from authentic client reviews
let reviewsStore: ReviewRecord[] = TESTIMONIALS.map((t, idx) => ({
  id: `rev-${idx + 1}`,
  clientName: t.clientName,
  eventType: t.eventType,
  location: t.location,
  date: t.date,
  quote: t.quote,
  rating: t.rating || 5,
  status: "APPROVED" as const,
  createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 10).toISOString(),
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeAll = searchParams.get("all") === "true";

  const results = includeAll
    ? reviewsStore
    : reviewsStore.filter((r) => r.status === "APPROVED");

  return NextResponse.json({
    success: true,
    reviews: results,
    total: results.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, eventType, location, date, quote, rating } = body;

    if (!clientName || !eventType || !quote) {
      return NextResponse.json(
        { success: false, error: "Client name, celebration type, and your review are required." },
        { status: 400 }
      );
    }

    const newReview: ReviewRecord = {
      id: `rev-${Date.now()}`,
      clientName: clientName.trim(),
      eventType: eventType.trim(),
      location: location?.trim() || "ASR District",
      date: date?.trim() || "2026 Celebration",
      quote: quote.trim(),
      rating: Number(rating) || 5,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    reviewsStore.unshift(newReview);
    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (err) {
    console.error("Review submission error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Review ID and status required" }, { status: 400 });
    }

    const idx = reviewsStore.findIndex((r) => r.id === id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

    reviewsStore[idx] = {
      ...reviewsStore[idx],
      status,
    };

    return NextResponse.json({ success: true, review: reviewsStore[idx] });
  } catch (err) {
    console.error("Review moderation error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Review ID required" }, { status: 400 });
    }

    reviewsStore = reviewsStore.filter((r) => r.id !== id);
    return NextResponse.json({ success: true, message: "Review deleted" });
  } catch (err) {
    console.error("Review delete error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
