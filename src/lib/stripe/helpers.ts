import Stripe from "stripe";
import stripe from "./client";
import { APP_URL } from "./config";
import prisma from "@/lib/db/prisma";

/**
 * Create a Stripe Checkout Session for a subscription.
 */
export async function createCheckoutSession({
  userId,
  email,
  priceId,
  customerId,
}: {
  userId: string;
  email: string;
  priceId: string;
  customerId?: string;
}) {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${APP_URL}/pricing?canceled=true`,
    metadata: { userId },
    subscription_data: {
      metadata: { userId },
    },
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else {
    sessionParams.customer_email = email;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session;
}

/**
 * Create a Stripe Customer Portal session.
 */
export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${APP_URL}/dashboard/settings`,
  });
  return session;
}

/**
 * Handle Stripe webhook events.
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutComplete(session);
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdate(subscription);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentSucceeded(invoice);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await handlePaymentFailed(invoice);
      break;
    }

    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
  }
}

// ---- Internal webhook handlers ----

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId) return;

  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      plan: "PREMIUM",
      status: "ACTIVE",
    },
    update: {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      plan: "PREMIUM",
      status: "ACTIVE",
    },
  });
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  const statusMap: Record<string, "ACTIVE" | "CANCELED" | "PAST_DUE" | "INCOMPLETE" | "TRIALING"> = {
    active: "ACTIVE",
    canceled: "CANCELED",
    past_due: "PAST_DUE",
    incomplete: "INCOMPLETE",
    trialing: "TRIALING",
  };

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      plan: "PREMIUM",
      status: statusMap[subscription.status] || "ACTIVE",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
    update: {
      status: statusMap[subscription.status] || "ACTIVE",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  if (!userId) return;

  await prisma.subscription.update({
    where: { userId },
    data: {
      plan: "FREE",
      status: "CANCELED",
      cancelAtPeriodEnd: false,
    },
  });
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const sub = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!sub) return;

  await prisma.payment.create({
    data: {
      userId: sub.userId,
      stripePaymentId: invoice.payment_intent as string,
      amount: invoice.amount_paid,
      currency: invoice.currency,
      status: "SUCCEEDED",
      description: `Subscription payment – ${invoice.lines.data[0]?.description || "Premium"}`,
      receiptUrl: invoice.hosted_invoice_url || undefined,
    },
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const sub = await prisma.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!sub) return;

  await prisma.payment.create({
    data: {
      userId: sub.userId,
      stripePaymentId: invoice.payment_intent as string,
      amount: invoice.amount_due,
      currency: invoice.currency,
      status: "FAILED",
      description: "Payment failed",
    },
  });
}
