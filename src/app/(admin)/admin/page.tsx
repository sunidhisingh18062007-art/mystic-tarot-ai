"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { Users, BookOpen, CreditCard, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then(r => r.json()).then(d => setAnalytics(d.data)).catch(() => {});
  }, []);

  const stats = [
    { label: "Total Users", value: analytics?.totalUsers || 0, icon: Users, color: "text-purple-400", bg: "bg-purple-500/10", change: "+12%" },
    { label: "Total Readings", value: analytics?.totalReadings || 0, icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10", change: "+8%" },
    { label: "Revenue", value: `$${analytics?.revenue || 0}`, icon: CreditCard, color: "text-green-400", bg: "bg-green-500/10", change: "+23%" },
    { label: "Active Subs", value: analytics?.activeSubscriptions || 0, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10", change: "+5%" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-green-400 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-purple-400" /> Recent Activity</h3>
          <div className="space-y-3">
            {["New user registration", "Premium subscription purchased", "Celtic Cross reading completed", "Blog post published", "User feedback received"].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <p className="text-sm text-muted-foreground flex-1">{activity}</p>
                <span className="text-xs text-muted-foreground">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Popular Reading Types</h3>
          <div className="space-y-3">
            {[
              { name: "Three Card", pct: 35 },
              { name: "Celtic Cross", pct: 25 },
              { name: "Love Reading", pct: 20 },
              { name: "Yes/No", pct: 12 },
              { name: "Single Card", pct: 8 },
            ].map(item => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="text-foreground font-medium">{item.pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
