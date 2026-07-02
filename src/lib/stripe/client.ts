import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("⚠️ STRIPE_SECRET_KEY is not defined. Stripe features will not work.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "dummy-key-to-prevent-build-crash", {
  apiVersion: "2026-06-24.dahlia",
  typescript: true,
});

export default stripe;
