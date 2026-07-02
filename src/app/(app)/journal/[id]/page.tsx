"use client";

import { use, useEffect, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";

export default function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/journal/${id}`).then(r => r.json()).then(d => { if (d.data) setEntry(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto"><GlassCard className="p-8 animate-pulse"><div className="h-6 bg-white/5 rounded w-1/3 mb-4" /><div className="h-4 bg-white/5 rounded w-full mb-2" /><div className="h-4 bg-white/5 rounded w-2/3" /></GlassCard></div>;
  if (!entry) return <div className="max-w-3xl mx-auto text-center py-20"><p className="text-muted-foreground">Entry not found</p><Link href="/journal" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">← Back to Journal</Link></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>
      <GlassCard className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          {entry.mood && <span className="text-2xl">{entry.mood}</span>}
          <div>
            <h1 className="text-xl font-bold text-foreground">{entry.title}</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(entry.createdAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        </div>
        {entry.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
            {entry.tags.map((tag: string) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/5 text-muted-foreground rounded-full border border-white/10"><Tag className="w-3 h-3" />{tag}</span>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
