"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings, Shield, ChevronLeft } from "lucide-react";
import { StarField } from "@/components/shared/StarField";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background relative">
      <StarField count={60} />

      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-56 glass border-r border-white/5 z-40 hidden lg:flex flex-col">
        <div className="p-4 border-b border-white/5">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-300 text-sm">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {adminLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-amber-500/15 text-amber-300 border border-amber-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to App
          </Link>
        </div>
      </aside>

      {/* Mobile admin nav */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-white/5 px-4 py-2 flex items-center gap-4 overflow-x-auto">
        <Shield className="w-4 h-4 text-amber-400 shrink-0" />
        {adminLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} className={`text-xs font-medium whitespace-nowrap transition-colors ${isActive ? "text-amber-300" : "text-muted-foreground hover:text-foreground"}`}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <main className="lg:pl-56 pt-12 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
