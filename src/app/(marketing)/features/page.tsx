'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Layers, Heart, Shield, Clock, Zap, Sun, Moon,
  BookOpen, Sparkles, Eye, Users, Globe, Palette, Download,
  BarChart3, MessageCircle, Smartphone, ArrowRight, Star, Check
} from 'lucide-react';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' as any },
  }),
};

const stagger: any = { visible: { transition: { staggerChildren: 0.1 } } };

const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const coreFeatures = [
  {
    icon: Brain,
    title: 'Advanced AI Engine',
    description: 'Our proprietary neural network is trained on thousands of authentic tarot interpretations spanning centuries of tradition. It understands card relationships, spread positions, and the subtle nuances that make each reading unique.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Layers,
    title: 'Complete 78-Card Deck',
    description: 'Experience the full Rider-Waite tarot deck — 22 Major Arcana and 56 Minor Arcana cards. Each card features stunning digital artwork with authentic symbolism and meticulous attention to detail.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: BookOpen,
    title: '12+ Spread Types',
    description: 'From the classic three-card past-present-future spread to the comprehensive Celtic Cross, our library of spreads covers every type of question. Each spread is optimized for specific life areas.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Heart,
    title: 'Love & Relationship Focus',
    description: 'Specialized love spreads designed to illuminate romantic connections, partnership dynamics, soulmate bonds, and the energies that attract and sustain relationships.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Sun,
    title: 'Daily Card Ritual',
    description: 'Begin each day with a personalized card draw aligned to your zodiac sign and the current cosmic energies. Set morning intentions with AI-crafted guidance tailored to the day ahead.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Eye,
    title: 'Intuitive Card Reveal',
    description: 'Watch cards reveal themselves with beautiful flip animations. Each reveal builds anticipation and mirrors the experience of a physical tarot reading, enhanced with digital magic.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Your readings are yours alone. We use industry-standard encryption to protect your data at rest and in transit. Reading histories are never shared or used for advertising.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Reading Analytics',
    description: 'Track recurring themes, card patterns, and spiritual growth over time. Our analytics dashboard reveals deeper patterns in your reading history that you might miss on your own.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: MessageCircle,
    title: 'Follow-Up Questions',
    description: 'After your reading, ask the AI follow-up questions to dig deeper into specific cards or aspects of your spread. Have a conversation with your reading for maximum insight.',
    gradient: 'from-rose-500 to-pink-500',
  },
];

const detailedSections = [
  {
    badge: 'AI Intelligence',
    title: 'Readings That Truly Understand You',
    description: 'Our AI doesn\'t just recite card meanings. It weaves together your question, the specific cards drawn, their positions in the spread, and their relationships to one another — creating an interpretation that feels genuinely personal.',
    features: [
      'Context-aware interpretations that consider your full question',
      'Card relationship analysis across the entire spread',
      'Position-specific meanings for maximum accuracy',
      'Emotional tone detection for empathetic responses',
      'Multi-language support for global seekers',
    ],
    icon: Brain,
    gradient: 'from-purple-600 to-indigo-600',
    align: 'left' as const,
  },
  {
    badge: 'Personalization',
    title: 'Your Journey, Your Way',
    description: 'Mystic Tarot AI learns from your preferences and reading history to deliver increasingly personalized experiences. The more you use it, the more attuned it becomes to your spiritual language.',
    features: [
      'Personalized daily guidance based on your zodiac sign',
      'Custom reading themes and visual preferences',
      'Reading history with searchable tags and notes',
      'Favorite cards and spreads for quick access',
      'Private journal with AI-powered reflection prompts',
    ],
    icon: Sparkles,
    gradient: 'from-amber-500 to-orange-500',
    align: 'right' as const,
  },
  {
    badge: 'Accessibility',
    title: 'Guidance Anytime, Anywhere',
    description: 'Whether you\'re at home, commuting, or traveling, Mystic Tarot AI is always with you. Our responsive design ensures a seamless experience across every device, from desktop to mobile.',
    features: [
      'Fully responsive design — works beautifully on any screen',
      'Offline mode for readings without internet',
      'PDF exports to save and share your readings',
      'Quick-draw widget for instant card pulls',
      'Dark mode optimized for comfortable nighttime readings',
    ],
    icon: Smartphone,
    gradient: 'from-emerald-500 to-teal-500',
    align: 'left' as const,
  },
];

const stats = [
  { value: '50K+', label: 'Active Seekers', icon: Users },
  { value: '2M+', label: 'Readings Delivered', icon: BookOpen },
  { value: '78', label: 'Tarot Cards', icon: Layers },
  { value: '4.9', label: 'User Rating', icon: Star },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              Platform Features
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Everything You Need for </span>
              <span className="gradient-text">Spiritual Clarity</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Mystic Tarot AI combines centuries of tarot wisdom with cutting-edge artificial intelligence to create the most powerful and personal tarot reading experience available.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                custom={i}
                className="text-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
              >
                <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">
              Core Features
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              Powerful Tools for Deep Insight
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature is designed to enhance your tarot experience and deepen your self-understanding
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                custom={i}
                className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Feature Sections */}
      {detailedSections.map((section, idx) => (
        <section key={section.title} className="relative py-20 md:py-28">
          {idx % 2 === 0 && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
          )}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${section.align === 'right' ? 'lg:flex-row-reverse' : ''}`}
            >
              <motion.div variants={fadeUp} className={section.align === 'right' ? 'lg:order-2' : ''}>
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
                  {section.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{section.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{section.description}</p>
                <ul className="space-y-3">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-foreground/80">
                      <Check className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={scaleIn} className={section.align === 'right' ? 'lg:order-1' : ''}>
                <div className={`relative p-8 bg-gradient-to-br ${section.gradient} rounded-3xl shadow-2xl`}>
                  <div className="absolute inset-0 bg-black/40 rounded-3xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center py-16">
                    <section.icon className="w-24 h-24 text-white/80 mb-6" />
                    <div className="text-2xl font-bold text-white">{section.badge}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center p-10 md:p-16 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-purple-900/50 border border-purple-500/20 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]" />
            <motion.h2 variants={fadeUp} className="relative z-10 text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience Every Feature <span className="gradient-text">Free</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="relative z-10 text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Start with our free Seeker plan. No credit card required. Upgrade when you&apos;re ready for unlimited cosmic wisdom.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:scale-105 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 text-lg font-medium text-foreground bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
              >
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
