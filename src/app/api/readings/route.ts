import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getUserReadings, createReading } from "@/lib/db/queries";
import { createReadingSchema, paginationSchema } from "@/lib/validation/schemas";
import { rateLimit } from "@/lib/rate-limit";

/**
 * GET /api/readings — List user's readings with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const { page, limit } = paginationSchema.parse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
    });
    const type = searchParams.get("type") || undefined;

    const result = await getUserReadings(user.id, page, limit, type);

    return NextResponse.json({
      success: true,
      data: result.readings,
      pagination: { page, limit, total: result.total, totalPages: result.totalPages },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/readings error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/readings — Create a new reading
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Rate limit: 20 readings per minute
    const rl = rateLimit(`reading:${user.id}`, { windowMs: 60_000, max: 20 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = createReadingSchema.parse(body);

    const reading = await createReading(user.id, {
      ...validated,
      cards: validated.cards,
    });

    return NextResponse.json({ success: true, data: reading }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("POST /api/readings error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
