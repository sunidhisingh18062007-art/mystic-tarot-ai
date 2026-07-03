# 🔮 Mystic Tarot AI

> AI-powered tarot readings for love, career, and life guidance

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://prisma.io)

A production-ready SaaS tarot reading web application featuring AI-powered interpretations, a complete 78-card Rider-Waite deck, 18+ reading types, user dashboards, journals, Stripe subscriptions, and an admin panel.

---

## ✨ Features

- **🃏 Complete 78-Card Deck** — Full Rider-Waite deck with detailed meanings
- **🤖 AI Interpretations** — OpenAI-powered personalized readings
- **🎴 18+ Reading Types** — Celtic Cross, Love, Career, Three Card, and more
- **📊 User Dashboard** — Track readings, streaks, favorites, mood
- **📔 Journal System** — Write notes, attach readings, search, export
- **💳 Stripe Payments** — Monthly/yearly subscriptions, premium readings
- **🔐 Clerk Authentication** — Google, GitHub, Magic Link, email sign-up
- **👑 Admin Panel** — Manage users, blog, analytics, subscriptions
- **📝 Blog System** — SEO-optimized with comments and categories
- **🌙 Extras** — Daily card, meditation timer, zodiac compatibility, crystals
- **📱 PWA** — Installable, offline support
- **♿ Accessible** — ARIA labels, keyboard nav, screen reader support

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or [Neon](https://neon.tech)/[Supabase](https://supabase.com) free tier)
- [Clerk](https://clerk.com) account (free)
- [OpenAI](https://platform.openai.com) API key
- [Stripe](https://stripe.com) account (test mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mystic-tarot-ai.git
cd mystic-tarot-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database (optional)
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | ✅ |
| `CLERK_SECRET_KEY` | Clerk secret key | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | For payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | For payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | For payments |
| `NEXT_PUBLIC_APP_URL` | App URL | ✅ |

See `.env.example` for all variables.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Sign-in, sign-up pages
│   ├── (marketing)/        # Public pages (landing, pricing, blog)
│   ├── (app)/              # Protected app pages (dashboard, readings)
│   ├── (admin)/            # Admin panel
│   └── api/                # API routes
├── components/             # Reusable components
│   ├── cards/              # Tarot card components
│   ├── readings/           # Reading flow components
│   ├── dashboard/          # Dashboard widgets
│   ├── layout/             # Header, footer, sidebar
│   └── shared/             # StarField, Particles, GlassCard
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & integrations
│   ├── ai/                 # OpenAI integration
│   ├── db/                 # Prisma client
│   ├── stripe/             # Stripe integration
│   ├── tarot/              # Deck data & spreads
│   └── email/              # Email templates
└── types/                  # TypeScript definitions
```

---

## 🎴 Reading Types

| Reading | Cards | Description |
|---------|-------|-------------|
| Single Card | 1 | Quick daily guidance |
| Three Card | 3 | Past, Present, Future |
| Celtic Cross | 10 | Comprehensive life reading |
| Love | 5 | Romance & relationships |
| Career | 5 | Professional guidance |
| Finance | 5 | Financial outlook |
| Soulmate | 6 | Deep soul connection |
| Yes/No | 1 | Simple yes or no answer |
| Shadow Work | 5 | Inner shadow exploration |
| Year Ahead | 12 | One card per month |
| + 10 more... | | |

---

## 🗄️ Database Schema

11 models: User, Card, Reading, Journal, Favorite, Subscription, Payment, BlogPost, Comment, Notification, Analytics

See `prisma/schema.prisma` for the complete schema.

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

```bash
# Build for production
npm run build

# Preview production build
npm start
```

### Stripe Webhook

After deploying, set up the Stripe webhook:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
3. Listen for: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with 💜 and ✨ magic
</p>

<!-- Trigger Vercel Build -->
