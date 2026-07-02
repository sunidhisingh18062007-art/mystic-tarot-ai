"use client";

import { useState } from "react";
import { Heart, Share2, Printer, Download, Check } from "lucide-react";

interface ReadingActionsProps {
  readingId: string | null;
}

export function ReadingActions({ readingId }: ReadingActionsProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFavorite = async () => {
    if (!readingId) return;
    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readingId }),
      });
      setSaved(true);
    } catch {}
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "My Tarot Reading — Mystic Tarot AI", url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-white/5">
      <button
        onClick={handleFavorite}
        disabled={saved}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          saved ? "bg-pink-500/20 text-pink-300 border border-pink-500/30" : "bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10"
        }`}
      >
        <Heart className={`w-4 h-4 ${saved ? "fill-pink-400" : ""}`} />
        {saved ? "Saved" : "Save"}
      </button>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 transition-all"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
        {copied ? "Copied!" : "Share"}
      </button>
      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 transition-all"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
    </div>
  );
}
