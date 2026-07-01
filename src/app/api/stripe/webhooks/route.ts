import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe/client";
import { handleWebhookEvent } from "@/lib/stripe/helpers";

/**
 * POST /api/stripe/webhooks — Handle Stripe webhook events
 * Verifies webhook signature before processing.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { success: false, error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }

    await handleWebhookEvent(event);

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("POST /api/stripe/webhooks error:", error);
    return NextResponse.json({ success: false, error: "Webhook handler failed" }, { status: 500 });
  }
}
