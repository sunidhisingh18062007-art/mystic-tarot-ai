"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, Grid3X3, BookHeart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { tarotDeck } from "@/lib/tarot/deck";
import { spreads } from "@/lib/tarot/spreads";

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open logic would be handled by parent, but we can assume it's controlled
          // We just need to listen for escape to close
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, onClose]);

  const cards = tarotDeck.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
  const readingTypes = spreads.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg glass-card rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cards, readings, journal..."
                className="flex-1 bg-transparent border-none text-foreground focus:outline-none placeholder-muted-foreground"
              />
              <button onClick={onClose} className="p-1 rounded-md text-muted-foreground hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query === "" ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  Start typing to search...
                </div>
              ) : (
                <>
                  {cards.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-1.5 text-xs font-semibold text-purple-400">Cards</h3>
                      {cards.map(card => (
                        <button
                          key={card.id}
                          onClick={() => handleSelect('/deck')}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/5 rounded-lg transition-colors text-left"
                        >
                          <Grid3X3 className="w-4 h-4 text-muted-foreground" />
                          <span>{card.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground capitalize">{card.suit || card.arcana}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {readingTypes.length > 0 && (
                    <div className="mb-4">
                      <h3 className="px-3 py-1.5 text-xs font-semibold text-purple-400">Readings</h3>
                      {readingTypes.map(spread => (
                        <button
                          key={spread.id}
                          onClick={() => handleSelect(`/readings/${spread.id}`)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/5 rounded-lg transition-colors text-left"
                        >
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span>{spread.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{spread.cardCount} cards</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Static links based on query */}
                  <div className="mb-2">
                    <h3 className="px-3 py-1.5 text-xs font-semibold text-purple-400">Pages</h3>
                    {["Dashboard", "Journal", "Favorites", "Daily Card"].filter(p => p.toLowerCase().includes(query.toLowerCase())).map(page => (
                      <button
                        key={page}
                        onClick={() => handleSelect(`/${page.toLowerCase().replace(" ", "")}`)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-white/5 rounded-lg transition-colors text-left"
                      >
                        <Sparkles className="w-4 h-4 text-muted-foreground" />
                        <span>{page}</span>
                      </button>
                    ))}
                  </div>

                  {cards.length === 0 && readingTypes.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No results found for "{query}"
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className="px-4 py-2 border-t border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">Use <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded">↓</kbd> to navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white/10 rounded">Enter</kbd> to select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
