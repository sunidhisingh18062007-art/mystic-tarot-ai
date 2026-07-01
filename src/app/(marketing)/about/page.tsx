'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, Heart, Globe, Shield, Eye, Users,
  ArrowRight, Star, BookOpen, Lightbulb, Target,
  Compass, Flame
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const values = [
  {
    icon: Eye,
    title: 'Authentic Insight',
    description: 'Every interpretation is rooted in centuries of tarot tradition. We honor the depth and complexity of the cards while making them accessible to all.',
  },
  {
    icon: Shield,
    title: 'Sacred Privacy',
    description: 'Your spiritual journey is deeply personal. We treat your data with the same reverence you bring to your readings — absolute privacy, always.',
  },
  {
    icon: Heart,
    title: 'Compassionate Guidance',
    description: 'Our AI is trained to deliver interpretations with empathy and care. We believe guidance should empower, never frighten or manipulate.',
  },
  {
    icon: Globe,
    title: 'Universal Accessibility',
    description: 'Spiritual tools should be available to everyone, regardless of background, experience level, or budget. Our free tier ensures no one is excluded.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'We\'re constantly improving our AI, adding new spreads, and enhancing the user experience. The cards evolve, and so do we.',
  },
  {
    icon: Compass,
    title: 'Ethical Technology',
    description: 'We use AI responsibly, with transparent practices and a commitment to never exploit emotional vulnerability. Technology should serve human growth.',
  },
];

const team = [
  {
    name: 'Luna Devereaux',
    role: 'Founder & CEO',
    bio: 'Former AI researcher at Stanford with a lifelong passion for tarot and esoteric traditions. Luna founded Mystic Tarot AI to bridge ancient wisdom with modern technology.',
    avatar: 'L',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'Orion Blake',
    role: 'CTO',
    bio: 'Machine learning expert with 12 years of experience in NLP and generative AI. Orion built the neural network that powers our personalized interpretations.',
    avatar: 'O',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Celeste Moreau',
    role: 'Head of Tarot Content',
    bio: 'Professional tarot reader with 20 years of practice and author of three bestselling tarot guidebooks. Celeste ensures every interpretation honors tarot tradition.',
    avatar: 'C',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Kai Nakamura',
    role: 'Lead Designer',
    bio: 'Award-winning UI/UX designer who previously led design at two meditation apps. Kai creates the visual magic that makes every reading feel like a sacred ritual.',
    avatar: 'K',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const milestones = [
  { year: '2023', title: 'The Spark', description: 'Luna draws her first AI-generated tarot interpretation and realizes the technology could make spiritual guidance accessible to millions.' },
  { year: '2023', title: 'Building the Foundation', description: 'The core team assembles. Orion begins training the AI on thousands of professional tarot interpretations. Celeste provides expert oversight.' },
  { year: '2024', title: 'Public Beta', description: 'Mystic Tarot AI launches in beta with 3 spread types and the full 78-card deck. 5,000 beta testers provide invaluable feedback.' },
  { year: '2024', title: 'Full Launch', description: 'The platform launches publicly with 12 spread types, daily guidance, and premium plans. 50,000 seekers join in the first three months.' },
  { year: '2025', title: 'Growing Community', description: 'Astrological integration, multi-language support, and the mobile app launch. Over 2 million readings delivered worldwide.' },
  { year: '2026', title: 'The Future', description: 'Expanding into astrology charts, numerology readings, and guided meditation — while staying true to our core mission of accessible spiritual growth.' },
];

export default function AboutPage() {
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
              <Heart className="w-3.5 h-3.5" />
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Where Ancient Wisdom Meets </span>
              <span className="gradient-text">Modern AI</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              We believe everyone deserves access to meaningful spiritual guidance. Mystic Tarot AI was born from a simple idea: what if the wisdom of the tarot could be understood and delivered by an AI that truly cares?
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center p-10 md:p-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
            <motion.div variants={fadeUp} className="relative z-10">
              <Flame className="w-10 h-10 text-amber-400 mx-auto mb-6" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="relative z-10 text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Mission
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="relative z-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To democratize spiritual guidance by combining the timeless wisdom of tarot with the accessibility and personalization of artificial intelligence — making meaningful self-reflection available to anyone, anywhere, anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="relative py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">
              Our Journey
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              The Road So Far
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-indigo-500/50 to-amber-500/50 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-purple-500 border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-sm font-semibold text-purple-400">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-foreground mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300">
              Our Values
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              What We Stand For
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make, from AI training to product design
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={scaleIn}
                custom={i}
                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
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
              Our Team
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              The Minds Behind the Magic
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A diverse team of technologists, tarot practitioners, and designers united by a shared vision
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                custom={i}
                className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-center hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
              >
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-lg`}>
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-purple-400 mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Join Our <span className="gradient-text">Growing Community</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="relative z-10 text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Be part of the 50,000+ seekers who have made Mystic Tarot AI their trusted companion for spiritual growth.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:scale-105 flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 text-lg font-medium text-foreground bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300"
              >
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
