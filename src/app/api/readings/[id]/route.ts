import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getReadingById, deleteReading } from "@/lib/db/queries";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/readings/[id] — Get a single reading
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const reading = await getReadingById(id, user.id);
    if (!reading) {
      return NextResponse.json({ success: false, error: "Reading not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { ...reading, isFavorite: reading.favorites.length > 0 },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/readings/[id] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/readings/[id] — Delete a reading
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const result = await deleteReading(id, user.id);
    if (result.count === 0) {
      return NextResponse.json({ success: false, error: "Reading not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("DELETE /api/readings/[id] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
