import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { getUserStats } from "@/lib/db/queries";

/**
 * GET /api/users/stats — Get user statistics
 */
export async function GET() {
  try {
    const user = await requireAuth();
    const stats = await getUserStats(user.id);

    if (!stats) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/users/stats error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
