export interface PlanConfig {
  name: string;
  description: string;
  features: string[];
  limits: {
    readingsPerDay: number;
    spreadsAccess: "basic" | "all";
    journalEntries: number | "unlimited";
    aiInterpretations: boolean;
  };
}

export const PLANS: Record<string, PlanConfig> = {
  FREE: {
    name: "Free",
    description: "Get started with basic tarot readings",
    features: [
      "3 readings per day",
      "Basic spreads only",
      "50 journal entries",
      "Community access",
    ],
    limits: {
      readingsPerDay: 3,
      spreadsAccess: "basic",
      journalEntries: 50,
      aiInterpretations: false,
    },
  },
  PREMIUM: {
    name: "Premium",
    description: "Unlock advanced spreads and AI interpretations",
    features: [
      "Unlimited readings",
      "All spread types",
      "Unlimited journal entries",
      "AI-powered interpretations",
      "Priority support",
    ],
    limits: {
      readingsPerDay: Infinity,
      spreadsAccess: "all",
      journalEntries: "unlimited",
      aiInterpretations: true,
    },
  },
  PRO: {
    name: "Pro",
    description: "Everything in Premium plus exclusive features",
    features: [
      "Everything in Premium",
      "Custom spreads",
      "Export readings",
      "API access",
      "White-label readings",
      "Dedicated support",
    ],
    limits: {
      readingsPerDay: Infinity,
      spreadsAccess: "all",
      journalEntries: "unlimited",
      aiInterpretations: true,
    },
  },
};

export const STRIPE_PRICES = {
  PREMIUM: {
    monthly: process.env.STRIPE_PRICE_MONTHLY || "",
    yearly: process.env.STRIPE_PRICE_YEARLY || "",
  },
  PREMIUM_READING: process.env.STRIPE_PRICE_PREMIUM_READING || "",
};

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
