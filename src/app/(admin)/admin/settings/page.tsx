"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { Settings, Globe, Bell, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Settings className="w-7 h-7" /> Admin Settings</h1>
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-purple-400" /> Site Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Site Name</label>
            <input defaultValue="Mystic Tarot AI" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Site Description</label>
            <textarea defaultValue="AI-powered tarot readings for love, career, and life guidance" rows={2} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-purple-500/50 transition-all resize-none" />
          </div>
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-purple-400" /> Email Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2"><div><p className="text-sm text-foreground">Daily Card Emails</p><p className="text-xs text-muted-foreground">Send daily card to subscribed users</p></div><button className="w-11 h-6 rounded-full bg-purple-500 relative"><div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-5.5" /></button></div>
          <div className="flex items-center justify-between py-2"><div><p className="text-sm text-foreground">Welcome Emails</p><p className="text-xs text-muted-foreground">Send welcome email on registration</p></div><button className="w-11 h-6 rounded-full bg-purple-500 relative"><div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-5.5" /></button></div>
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-purple-400" /> Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2"><div><p className="text-sm text-foreground">Rate Limiting</p><p className="text-xs text-muted-foreground">Limit API requests per user</p></div><button className="w-11 h-6 rounded-full bg-purple-500 relative"><div className="w-5 h-5 rounded-full bg-white absolute top-0.5 left-5.5" /></button></div>
          <div><label className="block text-sm font-medium text-foreground mb-1.5">Free Tier Daily Limit</label><input type="number" defaultValue="3" className="w-24 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-purple-500/50" /></div>
        </div>
      </GlassCard>
      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20">Save Settings</button>
    </div>
  );
}
