"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, BookOpen, Sparkles, Grid3X3, BookHeart, Heart,
  User, Settings, Moon, Compass, Gem, Menu, X, ChevronLeft
} from "lucide-react";
import { useState } from "react";
import { StarField } from "@/components/shared/StarField";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/readings", label: "Readings", icon: BookOpen },
  { href: "/daily", label: "Daily Card", icon: Sparkles },
  { href: "/deck", label: "Tarot Deck", icon: Grid3X3 },
  { href: "/journal", label: "Journal", icon: BookHeart },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { divider: true },
  { href: "/meditation", label: "Meditation", icon: Moon },
  { href: "/compatibility", label: "Compatibility", icon: Compass },
  { href: "/crystals", label: "Crystals", icon: Gem },
  { divider: true },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      <StarField count={100} />

      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      } glass border-r border-white/5`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="font-bold gradient-text">Mystic Tarot</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground">
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {sidebarLinks.map((link, i) => {
            if ("divider" in link) return <div key={i} className="my-2 border-t border-white/5" />;
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                title={collapsed ? link.label : undefined}
              >
                <link.icon className="w-4.5 h-4.5 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/5 px-2 py-1.5 flex items-center justify-around">
        {[sidebarLinks[0], sidebarLinks[1], sidebarLinks[2], sidebarLinks[3], sidebarLinks[4]].map((link) => {
          if ("divider" in link) return null;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] transition-all ${
                isActive ? "text-purple-300" : "text-muted-foreground"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
          More
        </button>
      </nav>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 glass z-50 lg:hidden p-4 space-y-1 overflow-y-auto border-r border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold gradient-text">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-1 text-muted-foreground"><X className="w-5 h-5" /></button>
            </div>
            {sidebarLinks.map((link, i) => {
              if ("divider" in link) return <div key={i} className="my-2 border-t border-white/5" />;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${isActive ? "bg-purple-500/15 text-purple-300" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                  <link.icon className="w-4.5 h-4.5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Main content */}
      <main className={`transition-all duration-300 min-h-screen ${collapsed ? "lg:pl-16" : "lg:pl-60"} pb-20 lg:pb-0`}>
        <div className="p-4 md:p-6 lg:p-8 relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
