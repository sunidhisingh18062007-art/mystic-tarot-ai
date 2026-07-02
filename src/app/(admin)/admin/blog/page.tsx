"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { BookOpen, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => { fetch("/api/admin/blog").then(r => r.json()).then(d => { if (d.data) setPosts(d.data); }).catch(() => {}); }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><BookOpen className="w-7 h-7" /> Blog Management</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/20"><Plus className="w-4 h-4" /> New Post</button>
      </div>
      <GlassCard className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5"><th className="text-left p-4 text-xs font-medium text-muted-foreground">Title</th><th className="text-left p-4 text-xs font-medium text-muted-foreground">Status</th><th className="text-left p-4 text-xs font-medium text-muted-foreground">Views</th><th className="text-left p-4 text-xs font-medium text-muted-foreground">Date</th><th className="text-right p-4 text-xs font-medium text-muted-foreground">Actions</th></tr></thead>
          <tbody>
            {posts.length === 0 ? (
              <tr><td className="p-8 text-center text-muted-foreground" colSpan={5}>No blog posts yet</td></tr>
            ) : posts.map(post => (
              <tr key={post.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-4 font-medium text-foreground">{post.title}</td>
                <td className="p-4">{post.published ? <span className="flex items-center gap-1 text-green-400 text-xs"><Eye className="w-3 h-3" /> Published</span> : <span className="flex items-center gap-1 text-muted-foreground text-xs"><EyeOff className="w-3 h-3" /> Draft</span>}</td>
                <td className="p-4 text-muted-foreground">{post.views || 0}</td>
                <td className="p-4 text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right"><div className="flex items-center justify-end gap-2"><button className="p-1.5 text-muted-foreground hover:text-foreground"><Edit className="w-4 h-4" /></button><button className="p-1.5 text-muted-foreground hover:text-red-400"><Trash2 className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
