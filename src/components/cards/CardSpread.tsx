"use client";

import { motion } from "framer-motion";
import { TarotCard } from "./TarotCard";
import type { DrawnCard } from "@/types/tarot";

interface CardSpreadProps {
  cards: DrawnCard[];
  revealedIndices: number[];
  onCardClick: (index: number) => void;
}

export function CardSpread({ cards, revealedIndices, onCardClick }: CardSpreadProps) {
  if (cards.length === 1) {
    return (
      <div className="flex justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
          <TarotCard
            card={cards[0].card}
            isReversed={cards[0].isReversed}
            isFlipped={revealedIndices.includes(0)}
            onClick={() => onCardClick(0)}
            size="lg"
          />
          <p className="text-center text-xs text-muted-foreground mt-2">{cards[0].position.name}</p>
        </motion.div>
      </div>
    );
  }

  if (cards.length <= 5) {
    return (
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((dc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring" }}
            className="flex flex-col items-center"
          >
            <TarotCard
              card={dc.card}
              isReversed={dc.isReversed}
              isFlipped={revealedIndices.includes(i)}
              onClick={() => onCardClick(i)}
              size="md"
            />
            <p className="text-center text-xs text-muted-foreground mt-2 max-w-[140px]">{dc.position.name}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  // Celtic Cross or large spreads — grid layout
  if (cards.length === 10) {
    return (
      <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto items-center justify-items-center">
        {/* Row 1: empty, card 5, empty, card 10 */}
        <div />
        <SpreadCard dc={cards[4]} i={4} revealed={revealedIndices} onClick={onCardClick} />
        <div />
        <SpreadCard dc={cards[9]} i={9} revealed={revealedIndices} onClick={onCardClick} />
        {/* Row 2: card 4, cards 1+2 (crossed), card 6, card 9 */}
        <SpreadCard dc={cards[3]} i={3} revealed={revealedIndices} onClick={onCardClick} />
        <div className="relative">
          <SpreadCard dc={cards[0]} i={0} revealed={revealedIndices} onClick={onCardClick} />
          <div className="absolute inset-0 flex items-center justify-center rotate-90 opacity-80">
            <TarotCard card={cards[1].card} isReversed={cards[1].isReversed} isFlipped={revealedIndices.includes(1)} onClick={() => onCardClick(1)} size="sm" />
          </div>
        </div>
        <SpreadCard dc={cards[5]} i={5} revealed={revealedIndices} onClick={onCardClick} />
        <SpreadCard dc={cards[8]} i={8} revealed={revealedIndices} onClick={onCardClick} />
        {/* Row 3: empty, card 3, empty, card 8 */}
        <div />
        <SpreadCard dc={cards[2]} i={2} revealed={revealedIndices} onClick={onCardClick} />
        <div />
        <SpreadCard dc={cards[7]} i={7} revealed={revealedIndices} onClick={onCardClick} />
        {/* Row 4: empty, empty, empty, card 7 */}
        <div />
        <div />
        <div />
        <SpreadCard dc={cards[6]} i={6} revealed={revealedIndices} onClick={onCardClick} />
      </div>
    );
  }

  // Default: multi-row grid
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {cards.map((dc, i) => (
        <SpreadCard key={i} dc={dc} i={i} revealed={revealedIndices} onClick={onCardClick} />
      ))}
    </div>
  );
}

function SpreadCard({ dc, i, revealed, onClick }: { dc: DrawnCard; i: number; revealed: number[]; onClick: (i: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.1, type: "spring" }}
      className="flex flex-col items-center"
    >
      <TarotCard card={dc.card} isReversed={dc.isReversed} isFlipped={revealed.includes(i)} onClick={() => onClick(i)} size="sm" />
      <p className="text-center text-[10px] text-muted-foreground mt-1 max-w-[100px] line-clamp-1">{dc.position.name}</p>
    </motion.div>
  );
}
