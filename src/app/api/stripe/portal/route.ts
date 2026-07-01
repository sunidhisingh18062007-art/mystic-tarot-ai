import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { createPortalSession } from "@/lib/stripe/helpers";

/**
 * POST /api/stripe/portal — Create a Stripe Customer Portal session
 */
export async function POST() {
  try {
    const user = await requireAuth();

    if (!user.subscription?.stripeCustomerId) {
      return NextResponse.json(
        { success: false, error: "No active subscription found" },
        { status: 400 }
      );
    }

    const session = await createPortalSession(user.subscription.stripeCustomerId);

    return NextResponse.json({ success: true, data: { url: session.url } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/stripe/portal error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
