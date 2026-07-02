"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Section, SectionHeader, AnimatedContainer } from "@/components/shared/GlassCard";

const faqs = [
  { q: "What is Mystic Tarot AI?", a: "Mystic Tarot AI is a modern tarot reading platform powered by artificial intelligence. We combine the wisdom of the traditional 78-card Rider-Waite deck with advanced AI to deliver personalized, insightful readings for love, career, finances, health, and more." },
  { q: "How does AI tarot reading work?", a: "When you select a reading type, our system shuffles the virtual deck and draws cards based on your chosen spread. Each card's position, orientation (upright or reversed), and meaning are then analyzed by our AI engine, which considers all these factors along with your question to create a deeply personalized interpretation." },
  { q: "Is tarot reading accurate?", a: "Tarot is a tool for self-reflection and guidance, not prediction. Our AI provides thoughtful interpretations based on traditional card meanings and your specific situation. Many users find the insights valuable for gaining new perspectives on their challenges and decisions." },
  { q: "What reading types are available?", a: "We offer 18+ reading types including Single Card, Three Card (Past/Present/Future), Celtic Cross, Love, Career, Finance, Health, Soulmate, Relationship, Yes/No, Shadow Work, Decision Making, Birthday, New Moon, Full Moon, Year Ahead, and more." },
  { q: "What is the Celtic Cross spread?", a: "The Celtic Cross is one of the most comprehensive tarot spreads, using 10 cards to explore your current situation, challenges, past influences, future possibilities, hopes, fears, and final outcome. It provides a thorough overview of any life situation." },
  { q: "Can I save my readings?", a: "Yes! All registered users can save readings to their personal history, bookmark favorites, and even attach readings to journal entries. Premium users can also export readings as PDF and share them." },
  { q: "What's included in the free plan?", a: "The free plan includes 3 readings per day, access to basic spreads (Single Card, Three Card, Yes/No), daily card with insights, and your personal reading history. It's a great way to explore the platform." },
  { q: "What do Premium and Pro plans offer?", a: "Premium ($9.99/month) unlocks unlimited readings, all spread types, the journal system, mood tracking, and PDF exports. Pro ($19.99/month) adds priority AI processing, advanced analytics, API access, and dedicated support." },
  { q: "Can I cancel my subscription?", a: "Absolutely. You can cancel anytime from your account settings. Your premium features remain active until the end of your current billing period. No questions asked, no hidden fees." },
  { q: "Is my personal data safe?", a: "Yes. We take privacy seriously. All data is encrypted in transit and at rest. We never share your personal information or reading history with third parties. You can delete your account and all associated data at any time." },
  { q: "What are reversed cards?", a: "When a tarot card appears upside-down (reversed), it modifies the card's meaning — often indicating blocked energy, internal aspects, or the opposite of the upright meaning. Our AI considers card orientation in every interpretation." },
  { q: "How does the Daily Card feature work?", a: "Each day, you receive a personalized card based on the date and your unique profile. Along with the card, you get a lucky number, lucky color, current moon phase, and an affirmation to start your day with intention." },
  { q: "What is the Journal feature?", a: "The journal lets you record your thoughts, feelings, and reflections alongside your tarot readings. You can tag entries, track your mood over time, and search through past entries. It's a powerful tool for personal growth." },
  { q: "Do you offer refunds?", a: "Yes, we offer a 7-day money-back guarantee on all subscription plans. If you're not satisfied, contact our support team within 7 days of purchase for a full refund." },
  { q: "Can I use Mystic Tarot AI on my phone?", a: "Yes! Our app is fully responsive and works beautifully on all devices. You can also install it as a Progressive Web App (PWA) on your phone for a native app-like experience with offline support." },
  { q: "How does the meditation timer work?", a: "Our built-in meditation timer features customizable durations with a beautiful circular animation. It's designed to help you center yourself before or after a reading for deeper spiritual connection." },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedContainer delay={index * 0.05}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left glass-card p-5 group"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="font-medium text-foreground group-hover:text-purple-300 transition-colors">
            {q}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 text-sm text-muted-foreground leading-relaxed"
          >
            {a}
          </motion.p>
        )}
      </button>
    </AnimatedContainer>
  );
}

export default function FaqPage() {
  return (
    <main>
      <Section>
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about Mystic Tarot AI"
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            <HelpCircle className="w-4 h-4" />
            Contact Support
          </a>
        </div>
      </Section>
    </main>
  );
}
