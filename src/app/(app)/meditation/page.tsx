"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { Moon, Play, Pause, RotateCcw } from "lucide-react";

const presets = [
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 },
];

export default function MeditationPage() {
  const [duration, setDuration] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => setRemaining(r => r - 1), 1000);
    } else if (remaining <= 0) {
      setRunning(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining]);

  const reset = () => { setRunning(false); setRemaining(duration); };
  const toggle = () => setRunning(!running);
  const selectDuration = (secs: number) => { setDuration(secs); setRemaining(secs); setRunning(false); };

  const progress = 1 - remaining / duration;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="max-w-lg mx-auto space-y-8 text-center">
      <div>
        <h1 className="text-2xl font-bold gradient-text flex items-center justify-center gap-2"><Moon className="w-7 h-7" /> Meditation Timer</h1>
        <p className="text-sm text-muted-foreground mt-1">Center yourself before or after your reading</p>
      </div>

      {/* Presets */}
      <div className="flex justify-center gap-2">
        {presets.map(p => (
          <button key={p.seconds} onClick={() => selectDuration(p.seconds)} className={`px-4 py-2 text-sm rounded-lg transition-all ${duration === p.seconds ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"}`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Circle Timer */}
      <div className="relative w-64 h-64 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 260 260">
          <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle
            cx="130" cy="130" r="120" fill="none" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-foreground tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground mt-1">{running ? "breathing..." : remaining === 0 ? "complete ✨" : "ready"}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button onClick={toggle} className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20">
          {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {running ? "Pause" : remaining === duration ? "Start" : "Resume"}
        </button>
        <button onClick={reset} className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-muted-foreground transition-all">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <GlassCard className="p-5 text-left">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          🕯️ Find a comfortable position. Close your eyes. Breathe deeply in through your nose for 4 counts, hold for 4, and exhale through your mouth for 6. Let the mystical energies guide your meditation.
        </p>
      </GlassCard>
    </div>
  );
}
