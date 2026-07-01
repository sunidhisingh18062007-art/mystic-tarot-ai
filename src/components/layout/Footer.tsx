import Link from "next/link";
import { Sparkles, Github, Twitter, Heart, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/readings", label: "Readings" },
    { href: "/deck", label: "Tarot Deck" },
    { href: "/daily", label: "Daily Card" },
    { href: "/blog", label: "Blog" },
  ],
  readings: [
    { href: "/readings/love", label: "Love Reading" },
    { href: "/readings/career", label: "Career Reading" },
    { href: "/readings/celtic-cross", label: "Celtic Cross" },
    { href: "/readings/three-card", label: "Three Card" },
    { href: "/readings/yes-no", label: "Yes/No" },
    { href: "/readings/soulmate", label: "Soulmate" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/30" role="contentinfo">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 md:py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold gradient-text">Mystic Tarot AI</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Unlock the mysteries of your future with AI-powered tarot readings.
              Personalized insights for love, career, and life.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-purple-400 hover:bg-white/5 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-purple-400 hover:bg-white/5 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@mystictarot.ai"
                className="p-2 rounded-lg text-muted-foreground hover:text-purple-400 hover:bg-white/5 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Readings links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Readings</h3>
            <ul className="space-y-2.5">
              {footerLinks.readings.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mystic Tarot AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400" /> and ✨ magic
          </p>
        </div>
      </div>
    </footer>
  );
}
