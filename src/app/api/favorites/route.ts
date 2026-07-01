import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getUserFavorites, toggleFavorite } from "@/lib/db/queries";
import { paginationSchema } from "@/lib/validation/schemas";
import { z } from "zod";

/**
 * GET /api/favorites — List user's favorites
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const { page, limit } = paginationSchema.parse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
    });

    const result = await getUserFavorites(user.id, page, limit);

    return NextResponse.json({
      success: true,
      data: result.favorites,
      pagination: { page, limit, total: result.total, totalPages: result.totalPages },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/favorites error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

const toggleFavoriteSchema = z.object({
  readingId: z.string().min(1, "Reading ID is required"),
});

/**
 * POST /api/favorites — Toggle favorite on a reading
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { readingId } = toggleFavoriteSchema.parse(body);

    const result = await toggleFavorite(user.id, readingId);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("POST /api/favorites error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
