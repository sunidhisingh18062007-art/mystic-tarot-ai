import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Section } from "@/components/shared/GlassCard";
import type { Metadata } from "next";

const blogData: Record<string, { title: string; category: string; date: string; readTime: string; content: string; tags: string[] }> = {
  "beginners-guide-to-tarot": {
    title: "A Beginner's Guide to Tarot Reading",
    category: "Guides", date: "Jun 28, 2026", readTime: "8 min",
    tags: ["beginner", "guide", "tarot basics"],
    content: `Tarot reading is an ancient practice that uses a deck of 78 cards to gain insight into the past, present, and future. Whether you're drawn to tarot for spiritual growth, self-reflection, or curiosity, this guide will help you get started with confidence.\n\n## Understanding the Deck\n\nA standard tarot deck consists of 78 cards divided into two main groups:\n\n**Major Arcana (22 cards):** These represent major life themes, spiritual lessons, and significant transitions. Cards like The Fool, The Magician, and The World carry powerful archetypal energy.\n\n**Minor Arcana (56 cards):** Divided into four suits — Wands (fire/passion), Cups (water/emotions), Swords (air/intellect), and Pentacles (earth/material) — these cards address day-to-day experiences.\n\n## Preparing for a Reading\n\n1. **Find a quiet space** where you can focus without distractions\n2. **Clear your mind** with a few deep breaths or brief meditation\n3. **Formulate your question** — open-ended questions work best\n4. **Shuffle the deck** while focusing on your question\n5. **Draw your cards** according to your chosen spread\n\n## Your First Spread: Three Cards\n\nThe three-card spread is perfect for beginners. Draw three cards and place them left to right:\n\n- **Card 1 (Left):** The Past — influences that led to the current situation\n- **Card 2 (Center):** The Present — your current state and challenges\n- **Card 3 (Right):** The Future — potential outcomes and advice\n\n## Tips for Better Readings\n\n- Trust your intuition when interpreting cards\n- Keep a journal to track your readings and insights\n- Don't fear "negative" cards — they offer valuable guidance\n- Practice regularly to build your connection with the cards\n- Consider both upright and reversed meanings for depth\n\nRemember, tarot is a mirror for self-reflection. The cards don't predict a fixed future — they illuminate possibilities and help you make more conscious choices.`,
  },
  "major-arcana-explained": {
    title: "The Major Arcana: 22 Cards That Shape Your Journey",
    category: "Card Meanings", date: "Jun 25, 2026", readTime: "12 min",
    tags: ["major arcana", "meanings", "symbolism"],
    content: `The Major Arcana represents the most powerful and transformative forces in tarot. These 22 cards tell the story of The Fool's Journey — a metaphor for our own path through life.\n\n## The Fool's Journey\n\nStarting with The Fool (0), who represents innocence and new beginnings, the journey moves through increasingly complex life experiences until reaching The World (21), symbolizing completion and wholeness.\n\n## Key Cards Explained\n\n**The Fool (0):** New beginnings, spontaneity, and taking a leap of faith. This card encourages you to embrace the unknown.\n\n**The Magician (I):** Manifestation, skill, and willpower. You have all the tools you need.\n\n**The High Priestess (II):** Intuition, mystery, and inner wisdom. Listen to your inner voice.\n\n**The Empress (III):** Abundance, nurturing, and creative expression.\n\n**The Emperor (IV):** Structure, authority, and stability.\n\n**The Hierophant (V):** Tradition, spiritual guidance, and conformity.\n\n**The Lovers (VI):** Partnership, choices, and alignment of values.\n\n**The Chariot (VII):** Determination, willpower, and triumph.\n\n**Strength (VIII):** Inner strength, courage, and patience.\n\n**The Hermit (IX):** Solitude, introspection, and inner guidance.\n\n**Wheel of Fortune (X):** Cycles, destiny, and turning points.\n\n**Justice (XI):** Fairness, truth, and accountability.\n\n**The Hanged Man (XII):** Surrender, new perspective, and letting go.\n\n**Death (XIII):** Transformation, endings, and rebirth — not literal death.\n\n**Temperance (XIV):** Balance, moderation, and patience.\n\n**The Devil (XV):** Shadow self, attachment, and materialism.\n\n**The Tower (XVI):** Sudden change, revelation, and breaking free.\n\n**The Star (XVII):** Hope, inspiration, and renewal.\n\n**The Moon (XVIII):** Illusion, fear, and the subconscious.\n\n**The Sun (XIX):** Joy, success, and vitality.\n\n**Judgement (XX):** Rebirth, inner calling, and absolution.\n\n**The World (21):** Completion, integration, and accomplishment.\n\nEach Major Arcana card carries profound lessons. When they appear in readings, pay special attention — they signal significant themes in your life.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData[slug];
  return {
    title: post?.title || "Blog Post",
    description: post?.content?.substring(0, 160) || "Read this article on Mystic Tarot AI blog.",
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    return (
      <main>
        <Section>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-purple-400 hover:text-purple-300">← Back to Blog</Link>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-purple-300 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="glass-card p-8 md:p-10">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>

            <div className="prose prose-invert prose-purple max-w-none text-muted-foreground leading-relaxed">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-xl font-semibold text-foreground mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("**")) {
                  return <p key={i} className="mb-3" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />;
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={i} className="list-disc list-inside space-y-1 mb-4 ml-4">
                      {paragraph.split("\n").map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d\./)) {
                  return (
                    <ol key={i} className="list-decimal list-inside space-y-1 mb-4 ml-4">
                      {paragraph.split("\n").map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="mb-4">{paragraph}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-muted-foreground">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
