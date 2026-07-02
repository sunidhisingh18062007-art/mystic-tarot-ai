"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Section, SectionHeader, AnimatedContainer } from "@/components/shared/GlassCard";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@mystictarot.ai", href: "mailto:support@mystictarot.ai" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: null },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main>
      <Section>
        <SectionHeader
          badge="Contact"
          title="Get In Touch"
          description="Have a question or feedback? We'd love to hear from you."
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Contact info cards */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <AnimatedContainer key={i} delay={i * 0.1}>
                <div className="glass-card p-5">
                  <item.icon className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-foreground hover:text-purple-300 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </AnimatedContainer>
            ))}
          </div>

          {/* Contact form */}
          <AnimatedContainer delay={0.2} className="md:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              {status === "sent" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-400 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Message sent! We&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </AnimatedContainer>
        </div>
      </Section>
    </main>
  );
}
