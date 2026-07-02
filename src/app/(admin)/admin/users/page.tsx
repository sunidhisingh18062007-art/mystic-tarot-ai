"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { Users, Search, Shield, UserCheck } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users").then(r => r.json()).then(d => { if (d.data) setUsers(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()) || u.username?.toLowerCase().includes(search.toLowerCase()));

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = { ADMIN: "bg-amber-500/20 text-amber-300 border-amber-500/30", MODERATOR: "bg-blue-500/20 text-blue-300 border-blue-500/30", USER: "bg-white/5 text-muted-foreground border-white/10" };
    return <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${colors[role] || colors.USER}`}>{role}</span>;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><Users className="w-7 h-7" /> User Management</h1>
          <p className="text-sm text-muted-foreground">{users.length} total users</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 transition-all" />
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Role</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Readings</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/5"><td className="p-4" colSpan={5}><div className="h-4 bg-white/5 rounded animate-pulse" /></td></tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td className="p-8 text-center text-muted-foreground" colSpan={5}>No users found</td></tr>
              ) : (
                filtered.map(user => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">
                          {(user.firstName || user.email)?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-foreground">{user.username || user.firstName || "User"}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">{roleBadge(user.role)}</td>
                    <td className="p-4 text-muted-foreground">{user.totalReadings || 0}</td>
                    <td className="p-4 text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
