'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, Brain, Shield, Zap, Heart, Clock, Star,
  ChevronRight, ArrowRight, ChevronDown, Users, BookOpen,
  Layers, Eye, Sun, Moon, CreditCard, Check, Quote,
  HelpCircle, Minus, Plus
} from 'lucide-react';
import { useState } from 'react';

// ─── Animation Variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// ─── Data ─────────────────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Advanced neural networks trained on thousands of tarot interpretations deliver deeply personal readings that evolve with your journey.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Layers,
    title: 'Full 78-Card Deck',
    description: 'Experience the complete Rider-Waite tarot deck with stunning digital artwork. Every Major and Minor Arcana card, faithfully rendered.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Heart,
    title: 'Love & Relationships',
    description: 'Explore the depths of your romantic connections with specialized love spreads designed to illuminate partnership dynamics.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your readings are encrypted and private. We never share your personal data or reading history with third parties.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Clock,
    title: 'Daily Guidance',
    description: 'Start each day with a personalized daily card draw and cosmic guidance tailored to your zodiac sign and life circumstances.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Instant Readings',
    description: 'Get profound, detailed readings in seconds. No waiting, no appointments — the wisdom of the cards is always at your fingertips.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

const steps = [
  {
    step: '01',
    title: 'Choose Your Spread',
    description: 'Select from over 12 unique tarot spreads — from a quick single-card pull to the powerful Celtic Cross. Each spread is crafted for specific life questions.',
    icon: BookOpen,
  },
  {
    step: '02',
    title: 'Focus Your Intention',
    description: 'Set your intention and ask your question. Our AI tunes into the energy of your inquiry to deliver the most relevant card interpretations.',
    icon: Eye,
  },
  {
    step: '03',
    title: 'Receive Your Reading',
    description: 'Watch as the cards reveal themselves with beautiful animations. Each card comes with a deep, personalized interpretation powered by AI.',
    icon: Sparkles,
  },
];

const readingTypes = [
  {
    title: 'Celtic Cross',
    cards: '10 cards',
    description: 'The most comprehensive spread for deep life questions. Reveals past influences, present circumstances, and future possibilities.',
    emoji: '🔮',
    color: 'purple',
  },
  {
    title: 'Three Card Spread',
    cards: '3 cards',
    description: 'Past, present, and future — a classic reading that offers clarity and insight into the trajectory of any situation.',
    emoji: '🃏',
    color: 'indigo',
  },
  {
    title: 'Love Reading',
    cards: '6 cards',
    description: 'Explore romantic connections, partnership dynamics, and the spiritual bonds that tie hearts together.',
    emoji: '💕',
    color: 'pink',
  },
  {
    title: 'Career Path',
    cards: '5 cards',
    description: 'Navigate professional crossroads with guidance on opportunities, challenges, and your true calling.',
    emoji: '⭐',
    color: 'amber',
  },
  {
    title: 'Yes or No',
    cards: '1 card',
    description: 'Quick, decisive guidance when you need a clear answer. Let the cards cut through uncertainty with a single pull.',
    emoji: '✨',
    color: 'emerald',
  },
  {
    title: 'Soulmate Reading',
    cards: '7 cards',
    description: 'Discover the cosmic connections that bind soulmates. Understand karmic bonds and spiritual partnerships.',
    emoji: '🌙',
    color: 'violet',
  },
];

const testimonials = [
  {
    name: 'Aria Moonstone',
    role: 'Yoga Instructor',
    text: 'Mystic Tarot AI has become an essential part of my morning ritual. The daily card readings are incredibly accurate and help me set my intention for the day. The AI interpretations feel deeply personal.',
    rating: 5,
    avatar: 'A',
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    text: 'I was skeptical at first, but the Celtic Cross reading I received about my career transition was remarkably insightful. It highlighted things I had been avoiding and gave me the courage to make a change.',
    rating: 5,
    avatar: 'M',
  },
  {
    name: 'Elena Vasquez',
    role: 'Life Coach',
    text: 'I recommend Mystic Tarot AI to all my clients as a reflection tool. The depth of the AI-generated interpretations rivals what you would get from an experienced human reader. Absolutely extraordinary.',
    rating: 5,
    avatar: 'E',
  },
];

const pricingTiers = [
  {
    name: 'Seeker',
    price: 'Free',
    period: '',
    description: 'Begin your tarot journey with essential features',
    features: [
      '3 readings per day',
      'Daily card draw',
      'Basic AI interpretations',
      '3 spread types',
      'Reading history (7 days)',
    ],
    cta: 'Start Free',
    href: '/sign-up',
    popular: false,
    gradient: 'from-white/5 to-white/[0.02]',
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    description: 'Unlock deeper insights and unlimited readings',
    features: [
      'Unlimited readings',
      'All 12+ spread types',
      'Advanced AI interpretations',
      'Reading history (unlimited)',
      'Personalized daily guidance',
      'Priority support',
      'Custom card themes',
    ],
    cta: 'Go Premium',
    href: '/sign-up?plan=premium',
    popular: true,
    gradient: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    name: 'Mystic Pro',
    price: '$19.99',
    period: '/month',
    description: 'The ultimate tarot experience for true seekers',
    features: [
      'Everything in Premium',
      'Relationship compatibility',
      'Astrological integration',
      'Multi-question sessions',
      'PDF reading exports',
      'Private journal with AI insights',
      'Early access to new features',
      'Dedicated support channel',
    ],
    cta: 'Unlock Pro',
    href: '/sign-up?plan=pro',
    popular: false,
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
];

const faqs = [
  {
    question: 'How does AI-powered tarot work?',
    answer: 'Our AI draws from thousands of traditional tarot interpretations and combines them with modern natural language understanding. When you pull a card, the AI considers the card meaning, its position in the spread, your question, and the context of surrounding cards to create a deeply personalized reading.',
  },
  {
    question: 'Is my reading data private?',
    answer: 'Absolutely. All readings are encrypted end-to-end. We never share your personal information or reading history with third parties. You can delete your data at any time from your account settings.',
  },
  {
    question: 'Can I use Mystic Tarot AI for free?',
    answer: 'Yes! Our Seeker plan is completely free and includes 3 readings per day, a daily card draw, and access to 3 spread types. Upgrade anytime for unlimited readings and premium features.',
  },
  {
    question: 'How accurate are the readings?',
    answer: 'Our AI provides interpretations rooted in centuries of tarot tradition. While tarot is a tool for reflection and guidance rather than prediction, our users consistently report that their readings feel remarkably relevant and insightful.',
  },
  {
    question: 'What tarot deck do you use?',
    answer: 'We use the classic Rider-Waite tarot system — the most widely recognized and studied deck in the world. All 78 cards (22 Major Arcana and 56 Minor Arcana) are available, with stunning digital artwork.',
  },
];

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.1)_0%,transparent_60%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Tarot Readings
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
          >
            <span className="block text-foreground">Unlock Your</span>
            <span className="block gradient-text">Destiny</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Discover what the universe has in store for you with AI-powered tarot readings.
            Personalized insights for love, career, and the path ahead.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
              className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 flex items-center gap-2"
            >
              Get Your Free Reading
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/features"
              className="px-8 py-4 text-lg font-medium text-foreground bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              Explore Features
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['A', 'M', 'E', 'S'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>50,000+ seekers</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Encrypted & Private</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────
function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
            Features
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Why Choose Mystic Tarot AI
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the ancient art of tarot reimagined with cutting-edge artificial intelligence
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              custom={i}
              className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────
function HowItWorksSection() {
  return (
    <section className="relative py-20 md:py-28">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">
            How It Works
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Three Steps to Clarity
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey from question to cosmic insight takes just moments
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-purple-500/50 via-indigo-500/50 to-amber-500/50" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              custom={i}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 mb-6 relative">
                <step.icon className="w-8 h-8 text-purple-400" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reading Types ────────────────────────────────────────────
function ReadingTypesSection() {
  const colorMap: Record<string, string> = {
    purple: 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    indigo: 'border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
    pink: 'border-pink-500/30 hover:border-pink-500/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
    amber: 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    violet: 'border-violet-500/30 hover:border-violet-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300">
            Reading Types
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Discover Your Perfect Spread
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From quick daily pulls to comprehensive life readings, find the spread that speaks to your question
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {readingTypes.map((reading, i) => (
            <motion.div
              key={reading.title}
              variants={scaleIn}
              custom={i}
              className={`group p-6 bg-white/5 backdrop-blur-xl border rounded-2xl hover:bg-white/[0.08] transition-all duration-300 cursor-pointer ${colorMap[reading.color]}`}
            >
              <div className="text-4xl mb-4">{reading.emoji}</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">{reading.title}</h3>
                <span className="text-xs font-medium text-muted-foreground bg-white/5 px-2 py-1 rounded-full">
                  {reading.cards}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{reading.description}</p>
              <div className="mt-4 flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                Try this reading
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-300">
            Testimonials
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Loved by Seekers Worldwide
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have found clarity and guidance through our AI-powered readings
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={scaleIn}
              custom={i}
              className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-purple-500/30 mb-4" />
              <p className="text-foreground/90 leading-relaxed mb-6">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ──────────────────────────────────────────
function PricingSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300">
            Pricing
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Plans for Every Seeker
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as your journey deepens. Cancel anytime.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={scaleIn}
              custom={i}
              className={`relative p-6 bg-gradient-to-b ${tier.gradient} backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
                tier.popular
                  ? 'border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.2)] scale-[1.02] md:scale-105'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10 hover:border-purple-500/30'
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All plans include a 7-day free trial. No credit card required to start. {' '}
          <Link href="/pricing" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
            View full comparison →
          </Link>
        </motion.p>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
            FAQ
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Questions & Answers
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-foreground font-medium pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus className="w-5 h-5 text-purple-400 shrink-0" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/faq" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1">
            View all FAQs <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-purple-900/50 border border-purple-500/20 p-10 md:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]" />

          <motion.div variants={fadeUp} className="relative z-10">
            <Sun className="w-12 h-12 text-amber-400 mx-auto mb-6 animate-pulse-glow rounded-full" />
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ready to Discover What the
            <span className="gradient-text"> Stars Have Written</span>?
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="relative z-10 text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Join over 50,000 seekers who trust Mystic Tarot AI for daily guidance, life decisions, and spiritual growth.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 flex items-center gap-2"
            >
              Begin Your Journey — It&apos;s Free
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} custom={4} className="relative z-10 text-xs text-muted-foreground mt-4">
            No credit card required • Free forever plan available • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ReadingTypesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
