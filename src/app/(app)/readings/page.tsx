"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { spreads } from "@/lib/tarot/spreads";
import { Lock, Crown, ArrowRight } from "lucide-react";

export default function ReadingsPage() {
  const categories = [...new Set(spreads.map(s => s.category))];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Choose Your Reading</h1>
        <p className="text-muted-foreground mt-1">Select a spread type to begin your tarot journey</p>
      </div>

      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-lg font-semibold text-foreground capitalize mb-4">{category} Readings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spreads.filter(s => s.category === category).map((spread, i) => (
              <motion.div key={spread.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/readings/${spread.id}`}>
                  <GlassCard className="p-5 h-full group cursor-pointer" hover>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{spread.icon}</span>
                      {spread.isPremium && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                          <Crown className="w-3 h-3" /> Premium
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-purple-300 transition-colors">{spread.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{spread.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-xs text-purple-300">{spread.cardCount} card{spread.cardCount > 1 ? "s" : ""}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
