"use client";

import { motion } from "framer-motion";
import type { TarotCard as TarotCardType } from "@/types/tarot";
import { cn } from "@/lib/utils";

interface TarotCardProps {
  card: TarotCardType;
  isReversed?: boolean;
  isFlipped?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: "w-28", height: "h-44", text: "text-xs" },
  md: { width: "w-36", height: "h-56", text: "text-sm" },
  lg: { width: "w-48", height: "h-72", text: "text-base" },
};

export function TarotCard({ card, isReversed = false, isFlipped = false, onClick, size = "md", className }: TarotCardProps) {
  const s = sizeMap[size];

  return (
    <motion.div
      className={cn("tarot-card cursor-pointer select-none", s.width, s.height, className)}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <motion.div
        className="tarot-card-inner w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div className="tarot-card-front absolute inset-0 backface-hidden rounded-xl overflow-hidden border border-purple-500/30">
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 flex items-center justify-center relative">
            {/* Decorative pattern */}
            <div className="absolute inset-3 border border-amber-500/30 rounded-lg" />
            <div className="absolute inset-5 border border-purple-400/20 rounded-lg" />
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 to-purple-500/40 rounded-full animate-pulse-glow" />
              <div className="absolute inset-2 border border-amber-400/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">✦</span>
              </div>
            </div>
            {/* Corner stars */}
            <span className="absolute top-3 left-3 text-amber-400/40 text-xs">✧</span>
            <span className="absolute top-3 right-3 text-amber-400/40 text-xs">✧</span>
            <span className="absolute bottom-3 left-3 text-amber-400/40 text-xs">✧</span>
            <span className="absolute bottom-3 right-3 text-amber-400/40 text-xs">✧</span>
          </div>
        </div>

        {/* Card Front */}
        <div
          className="tarot-card-back absolute inset-0 rounded-xl overflow-hidden border border-white/20"
          style={{ backfaceVisibility: "hidden", transform: `rotateY(180deg)${isReversed ? " rotate(180deg)" : ""}` }}
        >
          <div className="w-full h-full bg-gradient-to-br from-[#0a0520] to-[#1a0a3e] flex flex-col items-center justify-between p-3 relative">
            {/* Top section */}
            <div className="text-center w-full">
              <p className={cn("font-bold text-foreground truncate", s.text)}>{card.name}</p>
              {isReversed && <span className="text-[10px] text-amber-400 font-medium">REVERSED</span>}
            </div>

            {/* Card image area */}
            {/* Card image area */}
            <div className="flex-1 w-full my-2 rounded-lg overflow-hidden relative bg-black/40">
              {card.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    // Fallback to gradient if image is not found locally
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-purple-600/20', 'via-indigo-500/10', 'to-amber-500/10');
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-500/10 to-amber-500/10 flex items-center justify-center">
                  <span className="text-3xl opacity-60">
                    {card.arcana === "major" ? "🌟" : card.suit === "wands" ? "🔥" : card.suit === "cups" ? "💧" : card.suit === "swords" ? "🌬️" : "🪙"}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom */}
            <div className="text-center w-full">
              <p className="text-[10px] text-muted-foreground truncate">{card.keywords.slice(0, 3).join(" • ")}</p>
            </div>

            {/* Subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
