"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { Heart, BookOpen, Calendar, Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites").then(r => r.json()).then(d => { if (d.data) setFavorites(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const removeFavorite = async (readingId: string) => {
    await fetch("/api/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ readingId }) });
    setFavorites(favorites.filter(f => f.readingId !== readingId));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold gradient-text flex items-center gap-2"><Heart className="w-7 h-7" /> Favorites</h1>
        <p className="text-sm text-muted-foreground">Your saved readings</p>
      </div>
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass-card p-5 animate-pulse"><div className="h-4 bg-white/5 rounded w-1/3 mb-2" /><div className="h-3 bg-white/5 rounded w-2/3" /></div>)}</div>
      ) : favorites.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <Heart className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-40" />
          <p className="text-muted-foreground">No favorites yet. Save a reading to see it here!</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {favorites.map((fav, i) => (
            <motion.div key={fav.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <GlassCard className="p-5 flex items-center justify-between" hover>
                <div>
                  <span className="text-xs text-purple-400 font-medium">{fav.reading?.spread || "Reading"}</span>
                  <h3 className="font-medium text-foreground mt-0.5">{fav.reading?.question || "General reading"}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{new Date(fav.createdAt).toLocaleDateString()}</p>
                </div>
                <button onClick={() => removeFavorite(fav.readingId)} className="p-2 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
