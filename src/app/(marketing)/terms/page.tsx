import { Section, SectionHeader } from "@/components/shared/GlassCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service", description: "Mystic Tarot AI terms of service — rules and guidelines for using our platform." };

export default function TermsPage() {
  return (
    <main>
      <Section>
        <SectionHeader badge="Legal" title="Terms of Service" description="Last updated: July 1, 2026" />
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using Mystic Tarot AI (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p>Mystic Tarot AI is an entertainment and self-reflection platform that provides AI-generated tarot card readings. Our readings are for entertainment and personal insight purposes only. They are not a substitute for professional advice in medical, legal, financial, or psychological matters.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. User Accounts</h2>
              <p>You must be at least 13 years old to create an account. You are responsible for maintaining the confidentiality of your account and for all activities under your account. Notify us immediately of any unauthorized use.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Subscriptions & Payments</h2>
              <p>Paid subscriptions are billed monthly or annually through Stripe. You may cancel at any time; access continues until the end of your billing period. We offer a 7-day money-back guarantee on new subscriptions. Prices may change with 30 days&apos; notice.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Acceptable Use</h2>
              <p>You agree not to: use the Service for illegal purposes, harass or abuse other users, attempt to reverse-engineer our AI systems, scrape or data-mine the Service, create multiple accounts for abuse, or impersonate others.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Intellectual Property</h2>
              <p>All content, design, and code of Mystic Tarot AI are owned by us. Your personal reading data and journal entries belong to you. You grant us a license to store and process your data to provide the Service.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Disclaimer</h2>
              <p>Tarot readings are provided for entertainment and self-reflection only. We make no claims about the accuracy of readings or their predictive capabilities. Do not make important life decisions based solely on tarot readings. The Service is provided &quot;as is&quot; without warranties of any kind.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Mystic Tarot AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Termination</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time through the Settings page.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Changes</h2>
              <p>We may modify these terms at any time. Continued use after changes constitutes acceptance. Material changes will be communicated via email.</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Contact</h2>
              <p>Questions about these terms? Contact us at <a href="mailto:legal@mystictarot.ai" className="text-purple-400 hover:text-purple-300">legal@mystictarot.ai</a>.</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
