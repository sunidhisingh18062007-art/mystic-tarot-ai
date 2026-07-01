import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { updateProfileSchema } from "@/lib/validation/schemas";
import prisma from "@/lib/db/prisma";

/**
 * GET /api/users/profile — Get current user's profile
 */
export async function GET() {
  try {
    const user = await requireAuth();

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      include: { subscription: true },
    });

    if (!profile) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("GET /api/users/profile error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PUT /api/users/profile — Update current user's profile
 */
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validated = updateProfileSchema.parse(body);

    // Check username uniqueness if updating
    if (validated.username) {
      const existing = await prisma.user.findFirst({
        where: { username: validated.username, NOT: { id: user.id } },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: "Username is already taken" },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...validated,
        birthDate: validated.birthDate ? new Date(validated.birthDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("PUT /api/users/profile error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
