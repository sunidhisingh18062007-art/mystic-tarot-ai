"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, AnimatedContainer } from "@/components/shared/GlassCard";
import { Gem, Search } from "lucide-react";

const crystals = [
  { name: "Amethyst", emoji: "💜", color: "Purple", element: "Air", chakra: "Crown", meaning: "Spiritual awareness, intuition, and inner peace. Enhances meditation and psychic abilities.", uses: "Place under pillow for vivid dreams, hold during meditation, carry for stress relief." },
  { name: "Rose Quartz", emoji: "💗", color: "Pink", element: "Water", chakra: "Heart", meaning: "Unconditional love, self-love, and emotional healing. Opens the heart to giving and receiving love.", uses: "Wear as jewelry for love attraction, place in bedroom for romance, hold during self-care." },
  { name: "Clear Quartz", emoji: "💎", color: "Clear", element: "All", chakra: "Crown", meaning: "Master healer and energy amplifier. Enhances clarity of thought and purpose.", uses: "Program with intentions, pair with other crystals to amplify their energy, use in crystal grids." },
  { name: "Black Tourmaline", emoji: "🖤", color: "Black", element: "Earth", chakra: "Root", meaning: "Protection and grounding. Absorbs negative energy and electromagnetic frequencies.", uses: "Place at front door for protection, carry during stressful situations, use during grounding meditation." },
  { name: "Citrine", emoji: "🧡", color: "Yellow", element: "Fire", chakra: "Solar Plexus", meaning: "Abundance, prosperity, and personal power. Known as the merchant's stone.", uses: "Place in wallet or cash register, carry for confidence, meditate with for manifestation." },
  { name: "Lapis Lazuli", emoji: "💙", color: "Blue", element: "Water", chakra: "Third Eye", meaning: "Truth, wisdom, and self-awareness. Enhances intellectual ability and honesty.", uses: "Wear near throat for communication, use during study, meditate for self-discovery." },
  { name: "Moonstone", emoji: "🤍", color: "White", element: "Water", chakra: "Sacral", meaning: "New beginnings, intuition, and inner growth. Connected to moon cycles and feminine energy.", uses: "Carry during new moon for intentions, wear for fertility and hormonal balance, use in divination." },
  { name: "Tiger's Eye", emoji: "🟤", color: "Golden Brown", element: "Fire", chakra: "Solar Plexus", meaning: "Courage, personal power, and protection. Helps with decision-making and focus.", uses: "Carry for courage before important events, place on desk for focus, wear as a talisman." },
  { name: "Selenite", emoji: "🤍", color: "White", element: "Air", chakra: "Crown", meaning: "Cleansing, peace, and higher consciousness. One of the few self-cleansing crystals.", uses: "Wave over body for aura cleansing, place on windowsill to charge, use to cleanse other crystals." },
  { name: "Obsidian", emoji: "⚫", color: "Black", element: "Earth", chakra: "Root", meaning: "Deep healing and truth-seeking. Acts as a psychic shield against negativity.", uses: "Use for shadow work, place in sacred space for protection, scry with obsidian mirror." },
  { name: "Carnelian", emoji: "🔴", color: "Orange-Red", element: "Fire", chakra: "Sacral", meaning: "Creativity, motivation, and vitality. Boosts confidence and passion.", uses: "Carry for creative projects, wear during performances, place in studio or workspace." },
  { name: "Labradorite", emoji: "🌈", color: "Iridescent", element: "Water", chakra: "Third Eye", meaning: "Transformation, magic, and intuition. Known as the stone of mystics.", uses: "Wear during tarot readings, carry for synchronicities, meditate for spiritual awakening." },
];

export default function CrystalsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = crystals.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.meaning.toLowerCase().includes(search.toLowerCase()));
  const detail = selected ? crystals.find(c => c.name === selected) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text flex items-center gap-2"><Gem className="w-7 h-7" /> Crystal Guide</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover healing crystals and their mystical properties</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search crystals..." className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((crystal, i) => (
          <AnimatedContainer key={crystal.name} delay={i * 0.05}>
            <GlassCard className="p-5 cursor-pointer" hover onClick={() => setSelected(crystal.name)}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{crystal.emoji}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{crystal.name}</h3>
                  <p className="text-xs text-muted-foreground">{crystal.color} • {crystal.element}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{crystal.meaning}</p>
              <p className="text-xs text-purple-400 mt-2">Chakra: {crystal.chakra}</p>
            </GlassCard>
          </AnimatedContainer>
        ))}
      </div>

      {detail && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] bg-background/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl z-50 p-6">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">✕</button>
            <div className="text-center mb-4">
              <span className="text-5xl">{detail.emoji}</span>
              <h2 className="text-xl font-bold text-foreground mt-2">{detail.name}</h2>
              <div className="flex justify-center gap-3 mt-2 text-xs text-muted-foreground">
                <span>{detail.color}</span>•<span>{detail.element}</span>•<span>{detail.chakra} Chakra</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/[0.03] rounded-xl p-4">
                <h3 className="text-xs font-semibold text-purple-300 mb-1.5">Meaning</h3>
                <p className="text-sm text-muted-foreground">{detail.meaning}</p>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4">
                <h3 className="text-xs font-semibold text-amber-300 mb-1.5">How to Use</h3>
                <p className="text-sm text-muted-foreground">{detail.uses}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
