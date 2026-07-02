"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { BookHeart, Plus, Search, Calendar, Tag, Smile } from "lucide-react";
import Link from "next/link";

const moods = ["😊", "😌", "🤔", "😔", "😍", "💪", "🙏", "✨"];

export default function JournalPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/journal?limit=50").then(r => r.json()).then(d => { if (d.data) setEntries(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = entries.filter(e => e.title?.toLowerCase().includes(search.toLowerCase()) || e.content?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text flex items-center gap-2"><BookHeart className="w-7 h-7" /> Journal</h1>
          <p className="text-sm text-muted-foreground">Record your thoughts and reflections</p>
        </div>
        <Link href="/journal/new" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20">
          <Plus className="w-4 h-4" /> New Entry
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search journal..." className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="glass-card p-5 animate-pulse"><div className="h-4 bg-white/5 rounded w-1/3 mb-2" /><div className="h-3 bg-white/5 rounded w-2/3" /></div>)}</div>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <BookHeart className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-40" />
          <p className="text-muted-foreground">{search ? "No entries match your search" : "Start your journal journey"}</p>
          <Link href="/journal/new" className="inline-block mt-3 px-4 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">Write First Entry</Link>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry, i) => (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link href={`/journal/${entry.id}`}>
                <GlassCard className="p-5 hover:border-purple-500/30 cursor-pointer" hover>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {entry.mood && <span className="text-lg">{entry.mood}</span>}
                        <h3 className="font-medium text-foreground truncate">{entry.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.content}</p>
                      {entry.tags?.length > 0 && (
                        <div className="flex gap-1 mt-2">{entry.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] bg-white/5 text-muted-foreground rounded-full">{tag}</span>
                        ))}</div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-3">{new Date(entry.createdAt).toLocaleDateString()}</span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
