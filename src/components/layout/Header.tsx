"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Menu, X, Moon, Sun, User, LogOut, 
  LayoutDashboard, BookOpen, Heart, Settings,
  CreditCard, Search
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/deck", label: "Tarot Deck" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const userMenuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/readings", label: "Readings", icon: BookOpen },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/40 transition-all" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              Mystic Tarot AI
            </span>
            <span className="text-xl font-bold gradient-text sm:hidden">
              Mystic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-purple-300 bg-purple-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <button
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Search (Ctrl+K)"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                document.dispatchEvent(event);
              }}
            >
              <Search className="w-5 h-5" />
            </button>

            {!user && (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20"
                >
                  Get Started
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  href="/daily"
                  className="hidden sm:inline-flex px-3 py-2 text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all"
                >
                  ✨ Daily Card
                </Link>
                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="User menu"
                  >
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-8 h-8 rounded-full border border-purple-500/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-purple-300" />
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 glass rounded-xl overflow-hidden z-50 border border-white/10 shadow-xl shadow-black/20"
                        >
                          <div className="p-3 border-b border-white/5">
                            <p className="text-sm font-medium text-foreground truncate">
                              {user?.fullName || user?.username || "User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.primaryEmailAddress?.emailAddress}
                            </p>
                          </div>
                          <div className="p-1">
                            {userMenuItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setUserMenuOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="p-1 border-t border-white/5">
                            <button
                              onClick={() => signOut()}
                              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/5 glass overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-purple-300 bg-purple-500/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-center text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-center text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
              {user && (
                <div className="pt-3 border-t border-white/5 space-y-1">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
