import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getUserJournals, createJournal } from "@/lib/db/queries";
import { createJournalSchema, paginationSchema } from "@/lib/validation/schemas";

/**
 * GET /api/journal — List user's journal entries with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);

    const { page, limit } = paginationSchema.parse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
    });

    const result = await getUserJournals(user.id, page, limit);

    return NextResponse.json({
      success: true,
      data: result.journals,
      pagination: { page, limit, total: result.total, totalPages: result.totalPages },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/journal error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/journal — Create a new journal entry
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validated = createJournalSchema.parse(body);

    const journal = await createJournal(user.id, validated);

    return NextResponse.json({ success: true, data: journal }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("POST /api/journal error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
