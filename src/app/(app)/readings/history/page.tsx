"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { BookOpen, Calendar, Search, Filter } from "lucide-react";
import Link from "next/link";

interface HistoryReading {
  id: string;
  type: string;
  spread: string;
  question?: string;
  summary?: string;
  createdAt: string;
}

export default function ReadingHistoryPage() {
  const [readings, setReadings] = useState<HistoryReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/readings?limit=50")
      .then(r => r.json())
      .then(d => { if (d.data) setReadings(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = readings.filter(r =>
    r.spread.toLowerCase().includes(search.toLowerCase()) ||
    r.question?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Reading History</h1>
          <p className="text-sm text-muted-foreground">{readings.length} readings total</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search readings..."
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all"
        />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-5 animate-pulse"><div className="h-4 bg-white/5 rounded w-1/3 mb-2" /><div className="h-3 bg-white/5 rounded w-2/3" /></div>
        ))}</div>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <BookOpen className="w-8 h-8 mx-auto text-muted-foreground mb-3 opacity-40" />
          <p className="text-muted-foreground">{search ? "No readings match your search" : "No readings yet"}</p>
          <Link href="/readings" className="inline-block mt-3 px-4 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
            Start a Reading
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((reading, i) => (
            <motion.div key={reading.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <GlassCard className="p-5 hover:border-purple-500/30 cursor-pointer" hover>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-purple-400">{reading.spread}</span>
                    <h3 className="font-medium text-foreground mt-1">{reading.question || "General reading"}</h3>
                    {reading.summary && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{reading.summary}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" />
                    {new Date(reading.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
