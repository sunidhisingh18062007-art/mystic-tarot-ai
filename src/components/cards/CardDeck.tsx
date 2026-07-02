"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import type { TarotCard } from "@/types/tarot";

interface CardDeckProps {
  deck: TarotCard[];
  cardCount: number;
  onCardsDrawn: (cards: { card: TarotCard; isReversed: boolean }[]) => void;
}

export function CardDeck({ deck, cardCount, onCardsDrawn }: CardDeckProps) {
  const [phase, setPhase] = useState<"idle" | "shuffling" | "selecting" | "done">("idle");
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);

  const displayCount = Math.min(21, deck.length);

  const shuffle = () => {
    setPhase("shuffling");
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setShuffledDeck(shuffled);
    setTimeout(() => setPhase("selecting"), 1500);
  };

  const selectCard = (index: number) => {
    if (phase !== "selecting" || selectedIndices.includes(index)) return;
    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length >= cardCount) {
      setPhase("done");
      const drawn = newSelected.map((i) => ({
        card: shuffledDeck[i],
        isReversed: Math.random() < 0.3,
      }));
      setTimeout(() => onCardsDrawn(drawn), 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {phase === "idle" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-muted-foreground mb-6">Focus on your question, then shuffle the deck</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shuffle}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/25 text-lg"
          >
            <Shuffle className="w-5 h-5" />
            Shuffle the Deck
          </motion.button>
        </motion.div>
      )}

      {phase === "shuffling" && (
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative w-48 h-64 mx-auto mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-xl border border-purple-500/30 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900"
                animate={{
                  x: [0, (i - 2) * 40, 0],
                  y: [0, Math.sin(i) * 20, 0],
                  rotate: [0, (i - 2) * 15, 0],
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ zIndex: 5 - i }}
              />
            ))}
          </div>
          <p className="text-purple-300 animate-pulse">Shuffling the deck...</p>
        </motion.div>
      )}

      {phase === "selecting" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-muted-foreground mb-2">
            Select {cardCount} card{cardCount > 1 ? "s" : ""} — {cardCount - selectedIndices.length} remaining
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-6">
            {shuffledDeck.slice(0, displayCount).map((_, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => selectCard(i)}
                disabled={selectedIndices.includes(i)}
                className={`w-14 h-20 md:w-16 md:h-24 rounded-lg border transition-all duration-300 ${
                  selectedIndices.includes(i)
                    ? "border-amber-400/50 bg-amber-500/10 scale-95 opacity-50"
                    : "border-purple-500/30 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-indigo-900/80 hover:border-purple-400/60 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] cursor-pointer"
                }`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {selectedIndices.includes(i) ? (
                    <span className="text-amber-400 text-xs font-bold">{selectedIndices.indexOf(i) + 1}</span>
                  ) : (
                    <span className="text-purple-400/30 text-xs">✦</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="text-purple-300 animate-pulse">Revealing your cards...</p>
        </motion.div>
      )}
    </div>
  );
}
