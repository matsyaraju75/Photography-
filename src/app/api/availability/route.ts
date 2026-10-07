import { NextResponse } from "next/server";

export interface AvailabilityDate {
  date: string; // YYYY-MM-DD
  status: "AVAILABLE" | "LIMITED" | "BOOKED";
  note?: string;
  location?: string;
  isMuhurtham?: boolean;
}

// Initialized with authentic ASR District seasonal wedding & pre-wedding dates for 2026-2027
let availabilityRecords: AvailabilityDate[] = [
  // October 2026
  { date: "2026-10-18", status: "LIMITED", note: "1 evening slot remaining", location: "Araku Valley", isMuhurtham: true },
  { date: "2026-10-24", status: "BOOKED", note: "Kiran & Deepika Pre-Wedding", location: "Lambasingi & Araku", isMuhurtham: false },
  { date: "2026-10-25", status: "BOOKED", note: "Lambasingi Morning Session", location: "Lambasingi Pine Forests", isMuhurtham: false },
  { date: "2026-10-30", status: "BOOKED", note: "Chaitanya & Swathi Naming Ceremony", location: "Chintapalli", isMuhurtham: true },
  
  // November 2026 (Peak Karthika Masam Telugu Wedding Season)
  { date: "2026-11-05", status: "BOOKED", note: "Reyansh 1st Birthday Celebration", location: "Ananthagiri", isMuhurtham: false },
  { date: "2026-11-12", status: "LIMITED", note: "Morning Muhurtham Available", location: "Paderu / ASR", isMuhurtham: true },
  { date: "2026-11-18", status: "BOOKED", note: "Suresh & Ananya Wedding", location: "Paderu Hilltop Mandapam", isMuhurtham: true },
  { date: "2026-11-19", status: "LIMITED", note: "Post-Wedding Couple Session", location: "Araku Coffee Trails", isMuhurtham: false },
  { date: "2026-11-25", status: "BOOKED", note: "Traditional Telugu Wedding", location: "Chodavaram / ASR border", isMuhurtham: true },
  { date: "2026-11-28", status: "LIMITED", note: "1 afternoon slot remaining", location: "Lambasingi", isMuhurtham: true },

  // December 2026 (Winter Mist Season)
  { date: "2026-12-01", status: "BOOKED", note: "Eastern Ghats Bio-Trust Wildlife Tour", location: "Maredumilli Corridor", isMuhurtham: false },
  { date: "2026-12-02", status: "BOOKED", note: "Eastern Ghats Bio-Trust Wildlife Tour", location: "Maredumilli Corridor", isMuhurtham: false },
  { date: "2026-12-10", status: "LIMITED", note: "Auspicious Muhurtham Day", location: "Paderu", isMuhurtham: true },
  { date: "2026-12-15", status: "BOOKED", note: "Tarun & Sneha Destination Wedding", location: "Araku Valley Resort", isMuhurtham: true },
  { date: "2026-12-24", status: "LIMITED", note: "Winter Holiday Session", location: "Lambasingi", isMuhurtham: false },
  { date: "2026-12-25", status: "BOOKED", note: "Winter Family Gathering", location: "Araku Valley", isMuhurtham: false },

  // January 2027 (Sankranti & Winter Peak)
  { date: "2027-01-14", status: "BOOKED", note: "Sankranti Village Festival Documentation", location: "Paderu Tribal Villages", isMuhurtham: false },
  { date: "2027-01-20", status: "LIMITED", note: "Magha Masam Muhurtham", location: "ASR District", isMuhurtham: true },
  { date: "2027-01-26", status: "BOOKED", note: "Pre-Wedding Couple Shoot", location: "Katiki Waterfalls & Ananthagiri", isMuhurtham: false },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    dates: availabilityRecords,
    totalDates: availabilityRecords.length,
    activeRegion: "Alluri Sitharama Raju (ASR) District, Andhra Pradesh",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, status, note, location, isMuhurtham } = body;

    if (!date || !status) {
      return NextResponse.json(
        { success: false, error: "Date (YYYY-MM-DD) and status are required." },
        { status: 400 }
      );
    }

    const existingIndex = availabilityRecords.findIndex((r) => r.date === date);
    const updatedRecord: AvailabilityDate = {
      date,
      status: status || "AVAILABLE",
      note: note || "",
      location: location || "ASR District",
      isMuhurtham: Boolean(isMuhurtham),
    };

    if (existingIndex >= 0) {
      availabilityRecords[existingIndex] = updatedRecord;
    } else {
      availabilityRecords.push(updatedRecord);
    }

    return NextResponse.json({ success: true, record: updatedRecord }, { status: 201 });
  } catch (err) {
    console.error("Availability update error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ success: false, error: "Date parameter is required" }, { status: 400 });
    }

    availabilityRecords = availabilityRecords.filter((r) => r.date !== date);
    return NextResponse.json({ success: true, message: "Date unblocked and restored to available" });
  } catch (err) {
    console.error("Availability delete error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
