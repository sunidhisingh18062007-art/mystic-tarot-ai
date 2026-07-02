"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid3X3 } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import { TarotCard } from "@/components/cards/TarotCard";
import { tarotDeck } from "@/lib/tarot/deck";
import Link from "next/link";

const filters = [
  { value: "all", label: "All Cards" },
  { value: "major", label: "Major Arcana" },
  { value: "wands", label: "Wands" },
  { value: "cups", label: "Cups" },
  { value: "swords", label: "Swords" },
  { value: "pentacles", label: "Pentacles" },
];

export default function DeckPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return tarotDeck.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) ||
        card.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "major" && card.arcana === "major") ||
        (card.suit === activeFilter);
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const selected = selectedCard ? tarotDeck.find(c => c.id === selectedCard) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold gradient-text flex items-center gap-2">
          <Grid3X3 className="w-7 h-7" /> Tarot Deck
        </h1>
        <p className="text-muted-foreground mt-1">Explore all 78 cards of the Rider-Waite deck</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cards by name or keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeFilter === f.value
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} cards</p>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {filtered.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.01 }}
            className="flex flex-col items-center"
          >
            <TarotCard
              card={card}
              isFlipped={true}
              onClick={() => setSelectedCard(card.id)}
              size="sm"
            />
            <p className="text-[10px] text-muted-foreground mt-1 text-center truncate max-w-[100px]">{card.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Card Detail Modal */}
      {selected && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setSelectedCard(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-background/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-y-auto z-50 p-6"
          >
            <button onClick={() => setSelectedCard(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-lg">✕</button>
            <div className="text-center mb-6">
              <span className="text-xs text-purple-400 font-medium uppercase">{selected.arcana} Arcana{selected.suit ? ` • ${selected.suit}` : ""}</span>
              <h2 className="text-2xl font-bold text-foreground mt-1">{selected.name}</h2>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {selected.keywords.map(k => (
                  <span key={k} className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">{k}</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{selected.description}</p>
            <div className="space-y-4">
              {[
                { label: "Upright Meaning", text: selected.uprightMeaning, color: "text-green-300" },
                { label: "Reversed Meaning", text: selected.reversedMeaning, color: "text-amber-300" },
                { label: "Love", text: selected.loveMeaning, color: "text-pink-300" },
                { label: "Career", text: selected.careerMeaning, color: "text-blue-300" },
                { label: "Finance", text: selected.financeMeaning, color: "text-emerald-300" },
                { label: "Health", text: selected.healthMeaning, color: "text-cyan-300" },
              ].map(section => (
                <div key={section.label} className="bg-white/[0.03] rounded-xl p-4">
                  <h3 className={`text-xs font-semibold ${section.color} mb-1.5`}>{section.label}</h3>
                  <p className="text-sm text-muted-foreground">{section.text}</p>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 text-center">
                {[
                  { label: "Element", value: selected.element },
                  { label: "Planet", value: selected.planet },
                  { label: "Astrology", value: selected.astrology },
                  { label: "Numerology", value: selected.numerology },
                ].map(item => (
                  <div key={item.label} className="bg-white/[0.03] rounded-xl p-3">
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
