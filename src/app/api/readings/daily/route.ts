import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

// Simple list of Major Arcana for daily card
const MAJOR_ARCANA = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World",
];

const AFFIRMATIONS = [
  "I trust the journey the universe has laid before me.",
  "I am open to receiving cosmic wisdom and guidance.",
  "Today, I embrace transformation and growth.",
  "The stars illuminate my path forward.",
  "I am aligned with my highest purpose.",
  "I welcome the magic that today brings.",
  "My intuition is my greatest compass.",
  "I release what no longer serves me.",
];

const LUCKY_COLORS = [
  "Amethyst Purple", "Moonlight Silver", "Celestial Gold", "Mystic Teal",
  "Rose Quartz Pink", "Sapphire Blue", "Emerald Green", "Starlight White",
];

function getMoonPhase() {
  const LUNAR_CYCLE = 29.530588853;
  const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime();
  const diff = Date.now() - KNOWN_NEW_MOON;
  const days = diff / (1000 * 60 * 60 * 24);
  const phase = ((days % LUNAR_CYCLE) / LUNAR_CYCLE) * 8;
  const phaseIndex = Math.round(phase) % 8;
  const phases = [
    { phase: "New Moon", emoji: "🌑" },
    { phase: "Waxing Crescent", emoji: "🌒" },
    { phase: "First Quarter", emoji: "🌓" },
    { phase: "Waxing Gibbous", emoji: "🌔" },
    { phase: "Full Moon", emoji: "🌕" },
    { phase: "Waning Gibbous", emoji: "🌖" },
    { phase: "Last Quarter", emoji: "🌗" },
    { phase: "Waning Crescent", emoji: "🌘" },
  ];
  return phases[phaseIndex];
}

/**
 * GET /api/readings/daily — Get today's daily card
 * Uses date as seed for consistent daily result.
 */
export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const seed = today.split("-").reduce((a, b) => a + parseInt(b), 0);

    // Try to get card from DB first
    let card = null;
    const cards = await prisma.card.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });

    if (cards.length > 0) {
      card = cards[seed % cards.length];
    }

    const cardIndex = seed % MAJOR_ARCANA.length;
    const isReversed = seed % 3 === 0;

    const dailyCard = {
      card: card || {
        id: `daily-${cardIndex}`,
        name: MAJOR_ARCANA[cardIndex],
        arcana: "MAJOR",
        number: cardIndex,
        image: `/cards/${MAJOR_ARCANA[cardIndex].toLowerCase().replace(/\s+/g, "-")}.jpg`,
        description: `The ${MAJOR_ARCANA[cardIndex]} represents a key archetype in the Major Arcana.`,
        keywords: [],
        uprightMeaning: "Profound wisdom awaits.",
        reversedMeaning: "Reflect on inner truths.",
      },
      isReversed,
      luckyNumber: (seed % 9) + 1,
      luckyColor: LUCKY_COLORS[seed % LUCKY_COLORS.length],
      moonPhase: getMoonPhase(),
      affirmation: AFFIRMATIONS[seed % AFFIRMATIONS.length],
      date: today,
    };

    return NextResponse.json({ success: true, data: dailyCard });
  } catch (error) {
    console.error("GET /api/readings/daily error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
