"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { User, Mail, Calendar, Star, BookOpen, Save, Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getZodiacSign } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [bio, setBio] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/users/profile").then(r => r.json()).then(d => {
      if (d.data) { setProfile(d.data); setBio(d.data.bio || ""); setBirthDate(d.data.birthDate?.split("T")[0] || ""); }
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bio, birthDate: birthDate || undefined }),
      });
    } catch {}
    setSaving(false);
  };

  const zodiac = birthDate ? getZodiacSign(new Date(birthDate)) : profile?.zodiacSign || "Unknown";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text flex items-center gap-2"><User className="w-7 h-7" /> Profile</h1>

      {/* Avatar & Info */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-4">
          {user?.imageUrl ? (
            <img src={user.imageUrl} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-purple-500/30" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center"><User className="w-8 h-8 text-purple-300" /></div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user?.fullName || user?.username || "Seeker"}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" />{user?.primaryEmailAddress?.emailAddress}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><Star className="w-3 h-3 text-amber-400" />{zodiac}</p>
          </div>
        </div>
      </GlassCard>

      {/* Edit Profile */}
      <GlassCard className="p-6 space-y-5">
        <h3 className="font-semibold text-foreground">Edit Profile</h3>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." rows={3} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Birth Date</label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
          {birthDate && <p className="text-xs text-purple-300 mt-1">♈ Zodiac: {zodiac}</p>}
        </div>
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </GlassCard>

      {/* Stats */}
      {profile && (
        <GlassCard className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className="text-2xl font-bold text-purple-300">{profile.totalReadings || 0}</p><p className="text-xs text-muted-foreground">Readings</p></div>
            <div><p className="text-2xl font-bold text-amber-300">{profile.dailyStreak || 0}</p><p className="text-xs text-muted-foreground">Day Streak</p></div>
            <div><p className="text-2xl font-bold text-pink-300">♈</p><p className="text-xs text-muted-foreground">{zodiac}</p></div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
