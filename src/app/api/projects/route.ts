import { NextResponse } from "next/server";
import { FEATURED_STORIES } from "@/lib/constants";
import { ProjectStory } from "@/types";

// In-memory project stories initialized from authentic constants
let storiesStore: ProjectStory[] = [...FEATURED_STORIES];

export async function GET() {
  return NextResponse.json({
    success: true,
    projects: storiesStore,
    total: storiesStore.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, clientName, category, eventDate, location, summary, coverImageUrl } = body;

    if (!title || !category || !location || !summary) {
      return NextResponse.json(
        { success: false, error: "Title, category, location, and summary are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProject: ProjectStory = {
      id: `story-${Date.now()}`,
      slug: slug || `story-${Date.now()}`,
      title: title.trim(),
      clientName: clientName?.trim() || title.trim(),
      category: category,
      categoryLabel: `${category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")} Story`,
      eventDate: eventDate?.trim() || "2026 Documentation",
      location: location.trim(),
      summary: summary.trim(),
      featured: true,
      coverImage: {
        id: `cov-${Date.now()}`,
        url: coverImageUrl?.trim() || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        alt: title.trim(),
        width: 1600,
        height: 1067,
        aspectRatio: "landscape",
      },
      chapters: [
        {
          id: `chap-${Date.now()}-1`,
          title: "The Morning Gathering",
          description: "Quiet preparations and arrival of family members in the misty valley.",
          order: 1,
          photos: [],
        },
      ],
    };

    storiesStore.unshift(newProject);
    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Error creating project:", err);
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
        { success: false, error: "Project ID is required." },
        { status: 400 }
      );
    }

    const beforeLen = storiesStore.length;
    storiesStore = storiesStore.filter((p) => p.id !== id);

    if (storiesStore.length === beforeLen) {
      return NextResponse.json(
        { success: false, error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Project deleted." });
  } catch (err) {
    console.error("Error deleting project:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
