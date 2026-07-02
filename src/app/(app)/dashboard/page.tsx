"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Flame, Heart, Star, BookOpen, Calendar, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { tarotDeck } from "@/lib/tarot/deck";
import { getDailyCard, getLuckyNumber, getLuckyColor } from "@/lib/tarot/utils";
import { getMoonPhase } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useUser();
  const [stats, setStats] = useState({ totalReadings: 0, dailyStreak: 0, favoriteCount: 0, journalCount: 0 });
  const daily = getDailyCard(tarotDeck);
  const moonPhase = getMoonPhase();

  useEffect(() => {
    fetch("/api/users/stats").then(r => r.json()).then(d => { if (d.data) setStats(d.data); }).catch(() => {});
  }, []);

  const statCards = [
    { label: "Total Readings", value: stats.totalReadings, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Daily Streak", value: `${stats.dailyStreak} days`, icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Favorites", value: stats.favoriteCount, icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10" },
    { label: "Journal Entries", value: stats.journalCount, icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, <span className="gradient-text">{user?.firstName || "Seeker"}</span> ✨
        </h1>
        <p className="text-muted-foreground mt-1">Here&apos;s your mystical overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Daily Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GlassCard className="p-6 h-full" glow="purple">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="font-semibold text-foreground">Today&apos;s Card</h2>
            </div>
            <div className="text-center py-4">
              <div className="w-24 h-36 mx-auto rounded-lg bg-gradient-to-br from-purple-600/30 via-indigo-500/20 to-amber-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="font-semibold text-foreground">{daily.card.name}</h3>
              {daily.isReversed && <span className="text-xs text-amber-400">Reversed</span>}
              <p className="text-xs text-muted-foreground mt-2">{daily.card.keywords.slice(0, 4).join(" • ")}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 text-center">
              <div><p className="text-lg font-bold text-purple-300">{getLuckyNumber()}</p><p className="text-[10px] text-muted-foreground">Lucky #</p></div>
              <div><p className="text-lg">🎨</p><p className="text-[10px] text-muted-foreground">{getLuckyColor()}</p></div>
              <div><p className="text-lg">{moonPhase.emoji}</p><p className="text-[10px] text-muted-foreground">{moonPhase.phase}</p></div>
            </div>
            <Link href="/daily" className="block mt-4 text-center text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View Full Daily Reading →
            </Link>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <h2 className="font-semibold text-foreground mb-4">Quick Readings</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { href: "/readings/single-card", label: "Single Card", icon: "🎴", desc: "Quick guidance" },
                { href: "/readings/three-card", label: "Three Card", icon: "🃏", desc: "Past / Present / Future" },
                { href: "/readings/love", label: "Love Reading", icon: "❤️", desc: "Romance & relationships" },
                { href: "/readings/career", label: "Career Reading", icon: "💼", desc: "Professional path" },
                { href: "/readings/yes-no", label: "Yes / No", icon: "✅", desc: "Quick answer" },
                { href: "/readings/celtic-cross", label: "Celtic Cross", icon: "✦", desc: "Deep insight" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.06] transition-all">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-sm font-medium text-foreground mt-2 group-hover:text-purple-300 transition-colors">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent Readings placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Readings</h2>
            <Link href="/readings/history" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All →</Link>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No readings yet. Start your first reading!</p>
            <Link href="/readings" className="inline-block mt-3 px-4 py-2 text-sm bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
              Browse Readings
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
