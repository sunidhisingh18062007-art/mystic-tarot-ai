"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { Compass, Heart } from "lucide-react";

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
const signEmojis: Record<string, string> = { Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓" };

const compatibility: Record<string, Record<string, { score: number; desc: string }>> = {
  Aries: { Aries: { score: 75, desc: "Two fire signs create intense passion but may clash over leadership." }, Taurus: { score: 60, desc: "Different paces — Aries is impulsive, Taurus is steady. Patience is key." }, Gemini: { score: 85, desc: "Exciting and dynamic! Both love adventure and intellectual stimulation." }, Cancer: { score: 45, desc: "Emotional differences can cause friction, but deep care exists." }, Leo: { score: 95, desc: "A power couple! Mutual admiration and fiery chemistry." }, Virgo: { score: 50, desc: "Different approaches but can learn a lot from each other." }, Libra: { score: 70, desc: "Opposites attract — balance of action and harmony." }, Scorpio: { score: 65, desc: "Intense and magnetic, but power struggles may arise." }, Sagittarius: { score: 90, desc: "Adventure partners! Freedom-loving and optimistic together." }, Capricorn: { score: 55, desc: "Cardinal clash — both want to lead. Respect is essential." }, Aquarius: { score: 80, desc: "Innovative and exciting — both value independence." }, Pisces: { score: 60, desc: "Fire meets water — steamy but requires understanding." } },
};

// Fill compatibility for all pairs symmetrically
signs.forEach(s1 => {
  if (!compatibility[s1]) compatibility[s1] = {};
  signs.forEach(s2 => {
    if (!compatibility[s1][s2]) {
      const reverse = compatibility[s2]?.[s1];
      if (reverse) {
        compatibility[s1][s2] = reverse;
      } else {
        compatibility[s1][s2] = { score: 65 + Math.floor(Math.random() * 30), desc: `${s1} and ${s2} share a unique connection that grows with mutual understanding and respect.` };
      }
    }
  });
});

export default function CompatibilityPage() {
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");

  const result = sign1 && sign2 ? compatibility[sign1]?.[sign2] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold gradient-text flex items-center justify-center gap-2"><Compass className="w-7 h-7" /> Zodiac Compatibility</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover your cosmic connection</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <GlassCard className="p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">Your Sign</h3>
          <div className="grid grid-cols-3 gap-1.5">
            {signs.map(s => (
              <button key={s} onClick={() => setSign1(s)} className={`p-2 text-xs rounded-lg transition-all ${sign1 === s ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"}`}>
                {signEmojis[s]} {s}
              </button>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">Their Sign</h3>
          <div className="grid grid-cols-3 gap-1.5">
            {signs.map(s => (
              <button key={s} onClick={() => setSign2(s)} className={`p-2 text-xs rounded-lg transition-all ${sign2 === s ? "bg-pink-500/20 text-pink-300 border border-pink-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"}`}>
                {signEmojis[s]} {s}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-6 text-center" glow="purple">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">{signEmojis[sign1]}</span>
              <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
              <span className="text-3xl">{signEmojis[sign2]}</span>
            </div>
            <h2 className="text-lg font-bold text-foreground">{sign1} & {sign2}</h2>
            <div className="mt-4">
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${result.score}%` }} transition={{ duration: 1 }}
                  className={`h-full rounded-full ${result.score >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-500" : result.score >= 60 ? "bg-gradient-to-r from-amber-500 to-yellow-500" : "bg-gradient-to-r from-red-500 to-orange-500"}`}
                />
              </div>
              <p className="text-2xl font-bold mt-2 gradient-text">{result.score}%</p>
              <p className="text-xs text-muted-foreground">Compatibility Score</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{result.desc}</p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
