"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown, AlertTriangle, CheckCircle, Lightbulb, Shield, BarChart3, Heart } from "lucide-react";
import type { AIInterpretation, DrawnCard } from "@/types/tarot";

interface InterpretationViewProps {
  interpretation: AIInterpretation;
  cards: DrawnCard[];
}

const moodColors: Record<string, string> = {
  hopeful: "bg-green-500/20 text-green-300 border-green-500/30",
  cautious: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  transformative: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  peaceful: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  challenging: "bg-red-500/20 text-red-300 border-red-500/30",
  joyful: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  reflective: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  empowering: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  mysterious: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  balanced: "bg-teal-500/20 text-teal-300 border-teal-500/30",
};

export function InterpretationView({ interpretation, cards }: InterpretationViewProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-foreground">Reading Summary</h3>
          {interpretation.moodAnalysis && (
            <span className={`ml-auto px-3 py-1 text-xs font-medium rounded-full border ${moodColors[interpretation.moodAnalysis] || moodColors.reflective}`}>
              {interpretation.moodAnalysis}
            </span>
          )}
        </div>
        <p className="text-muted-foreground leading-relaxed">{interpretation.summary}</p>

        {/* Confidence Score */}
        {interpretation.confidenceScore && (
          <div className="mt-4 flex items-center gap-3">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted-foreground">Confidence</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${interpretation.confidenceScore * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              />
            </div>
            <span className="text-xs text-purple-300 font-medium">{Math.round(interpretation.confidenceScore * 100)}%</span>
          </div>
        )}
      </motion.div>

      {/* Per-Card Analysis */}
      {interpretation.detailedAnalysis && interpretation.detailedAnalysis.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-400" />
            Card-by-Card Analysis
          </h3>
          <div className="space-y-2">
            {interpretation.detailedAnalysis.map((analysis, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-sm font-medium text-foreground">{analysis.cardName}</span>
                      {analysis.isReversed && <span className="ml-2 text-[10px] text-amber-400 font-medium">REVERSED</span>}
                      <p className="text-xs text-muted-foreground">{analysis.position}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedCard === i ? "rotate-180" : ""}`} />
                </button>
                {expandedCard === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 border-t border-white/5"
                  >
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{analysis.interpretation}</p>
                    {analysis.advice && (
                      <p className="text-sm text-purple-300 mt-2 italic">💡 {analysis.advice}</p>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action Steps, Warnings, Insights grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Action Steps */}
        {interpretation.actionSteps?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" /> Action Steps
            </h4>
            <ul className="space-y-2">
              {interpretation.actionSteps.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-green-400 shrink-0">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Positive Insights */}
        {interpretation.positiveInsights?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Positive Insights
            </h4>
            <ul className="space-y-2">
              {interpretation.positiveInsights.map((insight, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-amber-400 shrink-0">✦</span>
                  {insight}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Warnings */}
        {interpretation.warnings?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 border-amber-500/10">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Cautions
            </h4>
            <ul className="space-y-2">
              {interpretation.warnings.map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-amber-200/70">
                  <span className="text-amber-400 shrink-0">⚠</span>
                  {w}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Spiritual Advice */}
        {interpretation.spiritualAdvice && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-card p-5">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-purple-400" /> Spiritual Guidance
            </h4>
            <p className="text-sm text-muted-foreground italic leading-relaxed">{interpretation.spiritualAdvice}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
