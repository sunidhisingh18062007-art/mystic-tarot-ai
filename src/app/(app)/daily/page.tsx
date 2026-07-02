"use client";

import { motion } from "framer-motion";
import { GlassCard, AnimatedContainer } from "@/components/shared/GlassCard";
import { TarotCard } from "@/components/cards/TarotCard";
import { tarotDeck } from "@/lib/tarot/deck";
import { getDailyCard, getLuckyNumber, getLuckyColor, getAffirmation } from "@/lib/tarot/utils";
import { getMoonPhase } from "@/lib/utils";
import { Sparkles, Sun, Moon, Hash, Palette, Quote } from "lucide-react";
import { useState } from "react";

export default function DailyPage() {
  const daily = getDailyCard(tarotDeck);
  const moonPhase = getMoonPhase();
  const luckyNum = getLuckyNumber();
  const luckyColor = getLuckyColor();
  const affirmation = getAffirmation();
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text">Your Daily Card</h1>
        <p className="text-muted-foreground mt-1">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
      </div>

      {/* Card */}
      <AnimatedContainer className="flex justify-center">
        <div className="text-center">
          <TarotCard card={daily.card} isReversed={daily.isReversed} isFlipped={flipped} onClick={() => setFlipped(!flipped)} size="lg" />
          {!flipped && <p className="text-sm text-purple-300 mt-4 animate-pulse">Tap to reveal your card</p>}
        </div>
      </AnimatedContainer>

      {flipped && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Card info */}
          <GlassCard className="p-6 text-center">
            <h2 className="text-xl font-bold text-foreground">{daily.card.name}</h2>
            {daily.isReversed && <span className="text-sm text-amber-400 font-medium">Reversed</span>}
            <p className="text-muted-foreground mt-3 leading-relaxed">{daily.isReversed ? daily.card.reversedMeaning : daily.card.uprightMeaning}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {daily.card.keywords.map(k => (
                <span key={k} className="px-3 py-1 text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full">{k}</span>
              ))}
            </div>
          </GlassCard>

          {/* Daily extras grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <GlassCard className="p-4 text-center">
              <Hash className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-foreground">{luckyNum}</p>
              <p className="text-[10px] text-muted-foreground">Lucky Number</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <Palette className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-sm font-bold text-foreground capitalize">{luckyColor}</p>
              <p className="text-[10px] text-muted-foreground">Lucky Color</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <Moon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <p className="text-lg">{moonPhase.emoji}</p>
              <p className="text-[10px] text-muted-foreground">{moonPhase.phase}</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <Sun className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-sm font-medium text-foreground">{daily.card.element}</p>
              <p className="text-[10px] text-muted-foreground">Element</p>
            </GlassCard>
          </div>

          {/* Affirmation */}
          <GlassCard className="p-6 text-center">
            <Quote className="w-6 h-6 text-amber-400 mx-auto mb-3" />
            <p className="text-lg italic text-foreground leading-relaxed">&ldquo;{affirmation}&rdquo;</p>
            <p className="text-xs text-muted-foreground mt-3">Today&apos;s Affirmation</p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
