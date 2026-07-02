import { Section, SectionHeader } from "@/components/shared/GlassCard";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "Mystic Tarot AI privacy policy — how we collect, use, and protect your data." };

export default function PrivacyPage() {
  return (
    <main>
      <Section>
        <SectionHeader badge="Legal" title="Privacy Policy" description="Last updated: July 1, 2026" />
        <div className="max-w-3xl mx-auto prose prose-invert prose-purple">
          <div className="glass-card p-8 md:p-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>When you create an account, we collect your name, email address, and profile information you choose to provide (such as birth date and avatar). When you use our services, we collect data about the readings you request, journal entries you create, and your usage patterns.</p>
              <p className="mt-2"><strong className="text-foreground">Account Data:</strong> Email, name, profile picture (via Google/GitHub OAuth or uploaded), birth date, and preferences.</p>
              <p className="mt-2"><strong className="text-foreground">Reading Data:</strong> Your questions, selected cards, AI-generated interpretations, and reading history.</p>
              <p className="mt-2"><strong className="text-foreground">Payment Data:</strong> Processed securely through Stripe. We never store your full credit card number.</p>
              <p className="mt-2"><strong className="text-foreground">Usage Data:</strong> Pages visited, features used, device information, and IP address for analytics and security.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p>We use your information to provide and improve our services, personalize your experience, process payments, send important notifications, and maintain the security of our platform. We use AI (OpenAI) to generate tarot interpretations based on your questions and selected cards.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Sharing</h2>
              <p>We do not sell your personal data. We share data only with essential service providers: Clerk (authentication), Stripe (payments), OpenAI (AI interpretations), and Cloudinary (image storage). Each provider has their own privacy policy and is contractually obligated to protect your data.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures including encryption in transit (TLS/SSL), encrypted data at rest, secure authentication via Clerk, and regular security audits. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data at any time. You can export your reading history and journal entries. To delete your account and all associated data, visit Settings → Account → Delete Account, or contact us at privacy@mystictarot.ai.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h2>
              <p>We use essential cookies for authentication and session management. We use analytics cookies to understand how our service is used. You can control cookie settings through your browser preferences.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Children&apos;s Privacy</h2>
              <p>Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children. If we learn that we have collected data from a child under 13, we will delete it promptly.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any material changes via email or in-app notification. Your continued use of the service after changes constitutes acceptance of the updated policy.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Contact Us</h2>
              <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:privacy@mystictarot.ai" className="text-purple-400 hover:text-purple-300">privacy@mystictarot.ai</a>.</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
