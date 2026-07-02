'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Check, X, ArrowRight, Sparkles, Crown, Zap,
  Star, HelpCircle, Plus
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
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const tiers = [
  {
    name: 'Seeker',
    icon: Star,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for beginners exploring the world of tarot. Start your journey with essential features at no cost.',
    features: [
      { name: '3 readings per day', included: true },
      { name: 'Daily card draw', included: true },
      { name: 'Basic AI interpretations', included: true },
      { name: '3 spread types', included: true },
      { name: '7-day reading history', included: true },
      { name: 'Community forum access', included: true },
      { name: 'Unlimited readings', included: false },
      { name: 'Advanced AI interpretations', included: false },
      { name: 'All 12+ spread types', included: false },
      { name: 'Personalized daily guidance', included: false },
      { name: 'Reading exports (PDF)', included: false },
      { name: 'Astrological integration', included: false },
    ],
    cta: 'Start Free',
    href: '/sign-up',
    popular: false,
    color: 'white',
  },
  {
    name: 'Premium',
    icon: Sparkles,
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    description: 'For dedicated seekers who want unlimited readings and deeper, more personalized AI interpretations.',
    features: [
      { name: 'Unlimited readings', included: true },
      { name: 'Daily card draw', included: true },
      { name: 'Advanced AI interpretations', included: true },
      { name: 'All 12+ spread types', included: true },
      { name: 'Unlimited reading history', included: true },
      { name: 'Community forum access', included: true },
      { name: 'Personalized daily guidance', included: true },
      { name: 'Custom card themes', included: true },
      { name: 'Priority support', included: true },
      { name: 'Reading exports (PDF)', included: true },
      { name: 'Astrological integration', included: false },
      { name: 'Multi-question sessions', included: false },
    ],
    cta: 'Go Premium',
    href: '/sign-up?plan=premium',
    popular: true,
    color: 'purple',
  },
  {
    name: 'Mystic Pro',
    icon: Crown,
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    description: 'The ultimate experience for serious practitioners. Every feature unlocked, plus exclusive pro-only tools.',
    features: [
      { name: 'Unlimited readings', included: true },
      { name: 'Daily card draw', included: true },
      { name: 'Advanced AI interpretations', included: true },
      { name: 'All 12+ spread types', included: true },
      { name: 'Unlimited reading history', included: true },
      { name: 'Community forum access', included: true },
      { name: 'Personalized daily guidance', included: true },
      { name: 'Custom card themes', included: true },
      { name: 'Priority support', included: true },
      { name: 'Reading exports (PDF)', included: true },
      { name: 'Astrological integration', included: true },
      { name: 'Multi-question sessions', included: true },
    ],
    cta: 'Unlock Pro',
    href: '/sign-up?plan=pro',
    popular: false,
    color: 'amber',
  },
];

const pricingFaqs = [
  {
    question: 'Can I switch between plans?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you\'ll be charged the prorated difference immediately. When downgrading, the change takes effect at the end of your current billing cycle.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! Both Premium and Mystic Pro come with a 7-day free trial. You won\'t be charged until the trial ends, and you can cancel anytime before that. No credit card is required to start the trial.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through Stripe.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel anytime from your account settings. When you cancel, you\'ll retain access to your paid features until the end of your current billing period. After that, your account will revert to the free Seeker plan.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with your experience, contact our support team within 30 days of your purchase for a full refund.',
  },
  {
    question: 'Is the yearly plan worth it?',
    answer: 'The yearly plan saves you approximately 20% compared to monthly billing. For Premium, that\'s a savings of $24 per year. For Mystic Pro, you save $48 annually. Plus, you lock in your rate for the full year.',
  },
  {
    question: 'What happens to my readings if I downgrade?',
    answer: 'Your reading history is always preserved, regardless of your plan. However, on the free Seeker plan, you\'ll only be able to view the most recent 7 days of history. Upgrading again restores access to your full history.',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300">
              Pricing
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Simple, Transparent </span>
              <span className="gradient-text">Pricing</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Start free and upgrade as your spiritual journey deepens. All plans include a 7-day free trial. No surprises, no hidden fees.
            </motion.p>

            {/* Billing toggle */}
            <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 rounded-full bg-white/10 border border-white/20 transition-colors hover:border-purple-500/30"
                aria-label="Toggle yearly billing"
              >
                <motion.div
                  animate={{ x: isYearly ? 28 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mt-0.5"
                />
              </button>
              <span className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {isYearly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                >
                  Save 20%
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {tiers.map((tier, i) => {
              const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
              const displayPrice = price === 0 ? 'Free' : `$${price.toFixed(2)}`;

              return (
                <motion.div
                  key={tier.name}
                  variants={scaleIn}
                  custom={i}
                  className={`relative rounded-2xl p-1 ${
                    tier.popular
                      ? 'bg-gradient-to-b from-purple-500/50 via-indigo-500/30 to-purple-500/50'
                      : 'bg-transparent'
                  }`}
                >
                  <div className={`relative h-full p-6 lg:p-8 bg-background rounded-[calc(1rem-2px)] border transition-all duration-300 ${
                    tier.popular
                      ? 'border-transparent shadow-[0_0_40px_rgba(168,85,247,0.2)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg">
                        Most Popular
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tier.popular
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-500'
                          : tier.color === 'amber'
                            ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                            : 'bg-white/10'
                      }`}>
                        <tier.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold text-foreground">{displayPrice}</span>
                      {price > 0 && (
                        <span className="text-muted-foreground">/{isYearly ? 'mo' : 'month'}</span>
                      )}
                    </div>
                    {isYearly && price > 0 && (
                      <p className="text-xs text-muted-foreground mb-1">
                        Billed ${(price * 12).toFixed(2)}/year
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

                    <Link
                      href={tier.href}
                      className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 mb-8 ${
                        tier.popular
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                          : tier.color === 'amber'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-lg shadow-amber-500/25'
                            : 'bg-white/5 hover:bg-white/10 text-foreground border border-white/10 hover:border-purple-500/30'
                      }`}
                    >
                      {tier.cta}
                    </Link>

                    <div className="space-y-3">
                      {tier.features.map((feature) => (
                        <div key={feature.name} className="flex items-start gap-2.5">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-foreground/80' : 'text-white/30'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            All plans include a 7-day free trial • No credit card required • Cancel anytime
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Pricing FAQ
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-lg text-muted-foreground">
              Everything you need to know about our plans and billing
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="space-y-3"
          >
            {pricingFaqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-foreground font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="w-5 h-5 text-purple-400 shrink-0" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? 'auto' : 0,
                    opacity: openFaq === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
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
              Still Unsure? <span className="gradient-text">Try It Free</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="relative z-10 text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Start with our free Seeker plan and experience the magic of AI-powered tarot. Upgrade when you&apos;re ready.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="relative z-10">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
