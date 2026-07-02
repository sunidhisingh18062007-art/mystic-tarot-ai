"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/shared/GlassCard";
import { ArrowLeft, Save, Loader2, X } from "lucide-react";
import Link from "next/link";

const moods = ["😊", "😌", "🤔", "😔", "😍", "💪", "🙏", "✨", "🌙", "🔮"];

export default function NewJournalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, mood, tags }),
      });
      if (res.ok) router.push("/journal");
    } catch {}
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>

      <GlassCard className="p-6 md:p-8 space-y-5">
        <h1 className="text-xl font-bold gradient-text">New Journal Entry</h1>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Entry title..." className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">How are you feeling?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => (
              <button key={m} onClick={() => setMood(mood === m ? "" : m)} className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${mood === m ? "bg-purple-500/20 border-purple-500/40 scale-110" : "bg-white/5 hover:bg-white/10"} border border-white/10`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your thoughts..." rows={10} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tags</label>
          <div className="flex gap-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
            <button onClick={addTag} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground">Add</button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20">
                  {tag}
                  <button onClick={() => setTags(tags.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleSave} disabled={saving || !title.trim() || !content.trim()} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </GlassCard>
    </div>
  );
}
