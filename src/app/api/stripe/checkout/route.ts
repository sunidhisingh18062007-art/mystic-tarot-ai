import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import { createCheckoutSession } from "@/lib/stripe/helpers";
import { STRIPE_PRICES } from "@/lib/stripe/config";
import { z } from "zod";

const checkoutSchema = z.object({
  priceId: z.string().min(1).optional(),
  plan: z.enum(["monthly", "yearly"]).optional().default("monthly"),
});

/**
 * POST /api/stripe/checkout — Create a Stripe Checkout session
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const { priceId, plan } = checkoutSchema.parse(body);

    const finalPriceId = priceId || STRIPE_PRICES.PREMIUM[plan];
    if (!finalPriceId) {
      return NextResponse.json(
        { success: false, error: "Price ID not configured" },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      priceId: finalPriceId,
      customerId: user.subscription?.stripeCustomerId || undefined,
    });

    return NextResponse.json({ success: true, data: { url: session.url } });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    console.error("POST /api/stripe/checkout error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
