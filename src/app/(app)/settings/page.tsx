"use client";

import { useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Settings as SettingsIcon, Bell, Palette, Globe, CreditCard, Trash2 } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [notifications, setNotifications] = useState({ email: true, push: true, inApp: true });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold gradient-text flex items-center gap-2"><SettingsIcon className="w-7 h-7" /> Settings</h1>

      {/* Notifications */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Bell className="w-5 h-5 text-purple-400" /> Notifications</h3>
        <div className="space-y-3">
          {[
            { key: "email", label: "Email Notifications", desc: "Daily card, weekly digest, payment receipts" },
            { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
            { key: "inApp", label: "In-App Notifications", desc: "Notifications within the app" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                className={`w-11 h-6 rounded-full transition-all ${notifications[item.key as keyof typeof notifications] ? "bg-purple-500" : "bg-white/10"} relative`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${notifications[item.key as keyof typeof notifications] ? "left-5.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Appearance */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Palette className="w-5 h-5 text-purple-400" /> Appearance</h3>
        <div className="flex items-center justify-between py-2">
          <div><p className="text-sm font-medium text-foreground">Theme</p><p className="text-xs text-muted-foreground">Choose dark or light mode</p></div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg">Dark</button>
            <button className="px-3 py-1.5 text-xs bg-white/5 text-muted-foreground border border-white/10 rounded-lg hover:bg-white/10">Light</button>
          </div>
        </div>
      </GlassCard>

      {/* Language */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-purple-400" /> Language</h3>
        <select className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:border-purple-500/50 transition-all">
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="pt">Português</option>
        </select>
      </GlassCard>

      {/* Subscription */}
      <GlassCard className="p-6">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><CreditCard className="w-5 h-5 text-purple-400" /> Subscription</h3>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Current Plan: <span className="text-purple-300">Free</span></p><p className="text-xs text-muted-foreground">3 readings per day</p></div>
          <Link href="/pricing" className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all">Upgrade</Link>
        </div>
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard className="p-6 border-red-500/10">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4"><Trash2 className="w-5 h-5 text-red-400" /> Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Delete Account</p><p className="text-xs text-muted-foreground">This action cannot be undone</p></div>
          <button className="px-4 py-2 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium">Delete</button>
        </div>
      </GlassCard>
    </div>
  );
}
