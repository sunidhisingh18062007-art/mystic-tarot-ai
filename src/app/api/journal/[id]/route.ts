import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getJournalById, updateJournal, deleteJournal } from "@/lib/db/queries";
import { updateJournalSchema } from "@/lib/validation/schemas";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/journal/[id] — Get a single journal entry
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const journal = await getJournalById(id, user.id);
    if (!journal) {
      return NextResponse.json({ success: false, error: "Journal entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: journal });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/journal/[id] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/journal/[id] — Update a journal entry
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const body = await request.json();
    const validated = updateJournalSchema.parse(body);

    const result = await updateJournal(id, user.id, validated);
    if (result.count === 0) {
      return NextResponse.json({ success: false, error: "Journal entry not found" }, { status: 404 });
    }

    const updated = await getJournalById(id, user.id);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("PUT /api/journal/[id] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/journal/[id] — Delete a journal entry
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const result = await deleteJournal(id, user.id);
    if (result.count === 0) {
      return NextResponse.json({ success: false, error: "Journal entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("DELETE /api/journal/[id] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
