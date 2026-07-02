"use client";

import { use } from "react";
import { ReadingFlow } from "@/components/readings/ReadingFlow";
import { spreads } from "@/lib/tarot/spreads";
import { notFound } from "next/navigation";

export default function ReadingTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const spread = spreads.find(s => s.id === type);

  if (!spread) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-4">
      <ReadingFlow spread={spread} />
    </div>
  );
}
