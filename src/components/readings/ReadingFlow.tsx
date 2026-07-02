"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { CardDeck } from "@/components/cards/CardDeck";
import { CardSpread } from "@/components/cards/CardSpread";
import { InterpretationView } from "./InterpretationView";
import { ReadingActions } from "./ReadingActions";
import { tarotDeck } from "@/lib/tarot/deck";
import type { SpreadConfig, DrawnCard, AIInterpretation, TarotCard } from "@/types/tarot";

interface ReadingFlowProps {
  spread: SpreadConfig;
}

type Phase = "question" | "shuffle" | "reveal" | "interpreting" | "result";

export function ReadingFlow({ spread }: ReadingFlowProps) {
  const [phase, setPhase] = useState<Phase>("question");
  const [question, setQuestion] = useState("");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [interpretation, setInterpretation] = useState<AIInterpretation | null>(null);
  const [readingId, setReadingId] = useState<string | null>(null);

  const handleStartShuffle = () => {
    setPhase("shuffle");
  };

  const handleCardsDrawn = useCallback((cards: { card: TarotCard; isReversed: boolean }[]) => {
    const drawn: DrawnCard[] = cards.map((c, i) => ({
      card: c.card,
      position: spread.positions[i] || { name: `Card ${i + 1}`, meaning: "", index: i },
      isReversed: c.isReversed,
    }));
    setDrawnCards(drawn);
    setPhase("reveal");
  }, [spread.positions]);

  const handleCardReveal = (index: number) => {
    if (revealedIndices.includes(index)) return;
    const newRevealed = [...revealedIndices, index];
    setRevealedIndices(newRevealed);

    // When all cards are revealed, start interpreting
    if (newRevealed.length >= drawnCards.length) {
      setTimeout(() => interpretReading(), 800);
    }
  };

  const interpretReading = async () => {
    setPhase("interpreting");
    try {
      const res = await fetch("/api/readings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: spread.id,
          spread: spread.name,
          question: question || undefined,
          cards: drawnCards.map((dc) => ({
            cardId: dc.card.id,
            cardName: dc.card.name,
            position: dc.position.name,
            positionMeaning: dc.position.meaning,
            isReversed: dc.isReversed,
            uprightMeaning: dc.card.uprightMeaning,
            reversedMeaning: dc.card.reversedMeaning,
            keywords: dc.card.keywords,
          })),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          // Look for the interpretation either at root level (new) or on the data object (old fallback)
          const interpData = json.interpretation || json.data.interpretation;
          if (interpData) {
            setInterpretation(interpData);
          } else {
            setInterpretation(getFallbackInterpretation(drawnCards));
          }
          setReadingId(json.data.id);
        } else {
          setInterpretation(getFallbackInterpretation(drawnCards));
        }
      } else {
        // Fallback interpretation
        setInterpretation(getFallbackInterpretation(drawnCards));
      }
    } catch {
      setInterpretation(getFallbackInterpretation(drawnCards));
    }
    setPhase("result");
  };

  const steps = [
    { key: "question", label: "Question" },
    { key: "shuffle", label: "Shuffle" },
    { key: "reveal", label: "Reveal" },
    { key: "result", label: "Interpret" },
  ];

  const currentStep = phase === "interpreting" ? 3 : steps.findIndex((s) => s.key === phase);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i <= currentStep
                ? "bg-purple-500/30 border border-purple-400/50 text-purple-300"
                : "bg-white/5 border border-white/10 text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i <= currentStep ? "text-purple-300" : "text-muted-foreground"}`}>
              {step.label}
            </span>
            {i < steps.length - 1 && <div className={`w-8 h-px ${i < currentStep ? "bg-purple-500/50" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Question Phase */}
        {phase === "question" && (
          <motion.div key="question" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <h2 className="text-2xl font-bold gradient-text mb-2">{spread.name}</h2>
            <p className="text-muted-foreground mb-8">{spread.description}</p>
            <div className="max-w-md mx-auto glass-card p-6">
              <label htmlFor="question" className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                What would you like to ask the cards?
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question or leave blank for general guidance..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartShuffle}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
              >
                Begin Reading
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Shuffle Phase */}
        {phase === "shuffle" && (
          <motion.div key="shuffle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <CardDeck deck={tarotDeck} cardCount={spread.cardCount} onCardsDrawn={handleCardsDrawn} />
          </motion.div>
        )}

        {/* Reveal Phase */}
        {phase === "reveal" && (
          <motion.div key="reveal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <p className="text-muted-foreground mb-6">
              Click each card to reveal it ({revealedIndices.length}/{drawnCards.length})
            </p>
            <CardSpread cards={drawnCards} revealedIndices={revealedIndices} onCardClick={handleCardReveal} />
          </motion.div>
        )}

        {/* Interpreting Phase */}
        {phase === "interpreting" && (
          <motion.div key="interpreting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-4" />
            <p className="text-lg text-purple-300">The cards are speaking...</p>
            <p className="text-sm text-muted-foreground mt-2">Our AI is interpreting your reading</p>
          </motion.div>
        )}

        {/* Result Phase */}
        {phase === "result" && interpretation && (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <CardSpread cards={drawnCards} revealedIndices={drawnCards.map((_, i) => i)} onCardClick={() => {}} />
            </div>
            <InterpretationView interpretation={interpretation} cards={drawnCards} />
            <ReadingActions readingId={readingId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getFallbackInterpretation(cards: DrawnCard[]): AIInterpretation {
  return {
    summary: `The cards reveal a powerful message through this ${cards.length}-card spread. ${cards.map((c) => c.card.name).join(", ")} come together to offer guidance on your path forward. The energy present suggests a time of transition and growth.`,
    detailedAnalysis: cards.map((dc) => ({
      cardName: dc.card.name,
      position: dc.position.name,
      isReversed: dc.isReversed,
      interpretation: dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning,
      advice: `Reflect on the energy of ${dc.card.name} in the context of ${dc.position.name.toLowerCase()}.`,
    })),
    actionSteps: [
      "Take time to meditate on the messages revealed in this reading",
      "Journal about any emotions or thoughts that arose during the reading",
      "Look for synchronicities related to these card themes in your daily life",
    ],
    warnings: cards.some((c) => c.isReversed) ? ["Some reversed cards suggest areas where energy may be blocked or misdirected. Pay attention to these themes."] : [],
    positiveInsights: ["The universe is guiding you toward growth and self-discovery", "Trust your intuition as you navigate the path ahead"],
    futurePossibilities: ["New opportunities aligned with your highest good are approaching", "Embrace change as a catalyst for personal evolution"],
    confidenceScore: 0.78,
    moodAnalysis: "reflective",
    spiritualAdvice: "Take time to sit in stillness and listen to your inner wisdom. The cards have illuminated your path — now trust yourself to walk it with courage and grace.",
    personalizedAdvice: "Consider how the themes of these cards relate to your current life circumstances. The patterns they reveal can offer guidance for the decisions ahead.",
  };
}
