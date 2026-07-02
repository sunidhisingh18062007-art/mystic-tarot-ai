"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><BarChart3 className="w-7 h-7" /> Analytics</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Readings Over Time</h3>
          <div className="h-48 flex items-end gap-1">
            {[40, 65, 50, 80, 55, 90, 70, 85, 95, 60, 75, 88].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-purple-500/50 to-purple-500/10 rounded-t transition-all hover:from-purple-400/60" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
          <div className="h-48 flex items-end gap-1">
            {[20, 30, 35, 45, 50, 60, 55, 70, 75, 80, 90, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500/50 to-indigo-500/10 rounded-t transition-all hover:from-indigo-400/60" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Revenue by Month</h3>
        <div className="h-48 flex items-end gap-1">
          {[30, 45, 40, 55, 70, 65, 80, 75, 90, 85, 95, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-green-500/50 to-green-500/10 rounded-t transition-all hover:from-green-400/60" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
      </GlassCard>
    </div>
  );
}
