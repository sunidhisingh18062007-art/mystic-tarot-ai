import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StarField } from '@/components/shared/StarField';
import { FloatingParticles } from '@/components/shared/Particles';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Animated background layers */}
      <StarField count={150} />
      <FloatingParticles count={25} />

      {/* Fixed gradient orbs for ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <Header />

      {/* Main content with header offset */}
      <main className="relative z-10 pt-16">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
