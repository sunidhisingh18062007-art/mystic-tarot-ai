"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Section, SectionHeader, AnimatedContainer } from "@/components/shared/GlassCard";

const posts = [
  { slug: "beginners-guide-to-tarot", title: "A Beginner's Guide to Tarot Reading", excerpt: "Learn the basics of tarot reading, from understanding the deck structure to performing your first reading with confidence.", category: "Guides", date: "Jun 28, 2026", readTime: "8 min", tags: ["beginner", "guide"] },
  { slug: "major-arcana-explained", title: "The Major Arcana: 22 Cards That Shape Your Journey", excerpt: "Dive deep into the 22 Major Arcana cards and discover the powerful archetypal forces that influence our life path.", category: "Card Meanings", date: "Jun 25, 2026", readTime: "12 min", tags: ["major arcana", "meanings"] },
  { slug: "celtic-cross-mastery", title: "Mastering the Celtic Cross Spread", excerpt: "The Celtic Cross is the most comprehensive tarot spread. Learn each position's significance and how to interpret the full picture.", category: "Spreads", date: "Jun 20, 2026", readTime: "10 min", tags: ["celtic cross", "spread"] },
  { slug: "tarot-and-astrology", title: "How Tarot and Astrology Work Together", excerpt: "Discover the deep connections between tarot cards and astrological signs, planets, and elements for richer readings.", category: "Astrology", date: "Jun 15, 2026", readTime: "7 min", tags: ["astrology", "zodiac"] },
  { slug: "reversed-cards-meaning", title: "Understanding Reversed Tarot Cards", excerpt: "Reversed cards can feel intimidating, but they offer valuable nuance. Learn how to interpret upside-down cards with confidence.", category: "Card Meanings", date: "Jun 10, 2026", readTime: "6 min", tags: ["reversed", "interpretation"] },
  { slug: "daily-tarot-practice", title: "Building a Daily Tarot Practice", excerpt: "Consistency is key to deepening your tarot intuition. Here's how to build a meaningful daily practice that fits your lifestyle.", category: "Practice", date: "Jun 5, 2026", readTime: "5 min", tags: ["daily", "practice"] },
];

const categories = ["All", "Guides", "Card Meanings", "Spreads", "Astrology", "Practice"];

export default function BlogPage() {
  return (
    <main>
      <Section>
        <SectionHeader
          badge="Blog"
          title="Mystic Insights"
          description="Explore tarot wisdom, guides, card meanings, and spiritual practices"
        />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                cat === "All"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedContainer key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  {/* Gradient cover */}
                  <div className="h-40 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-background flex items-center justify-center">
                    <span className="text-4xl">🔮</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-medium text-purple-400 mb-2">{post.category}</span>
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      </Section>
    </main>
  );
}
