import type { TarotCard, DrawnCard, CardPosition } from "@/types/tarot";

// ============================================
// Seeded Random Number Generator (Mulberry32)
// ============================================

function mulberry32(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeed(date?: Date): number {
  const d = date || new Date();
  const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

// ============================================
// Deck Manipulation
// ============================================

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the deck.
 */
export function shuffleDeck(deck: TarotCard[]): TarotCard[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draw a specified number of cards from the deck.
 * Each card is assigned a position and a random reversed state.
 */
export function drawCards(
  deck: TarotCard[],
  count: number,
  positions?: CardPosition[]
): DrawnCard[] {
  const shuffled = shuffleDeck(deck);
  const drawn: DrawnCard[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    drawn.push({
      card: shuffled[i],
      position: positions?.[i] ?? {
        name: `Position ${i + 1}`,
        meaning: "General reading",
        index: i,
      },
      isReversed: getRandomReversed(),
    });
  }

  return drawn;
}

/**
 * Returns true ~35% of the time to simulate reversed cards.
 */
export function getRandomReversed(): boolean {
  return Math.random() < 0.35;
}

// ============================================
// Daily Card (Deterministic by Date)
// ============================================

/**
 * Returns a deterministic daily card seeded by today's date.
 * The same card is returned for the same day.
 */
export function getDailyCard(deck: TarotCard[]): {
  card: TarotCard;
  isReversed: boolean;
} {
  const seed = dateSeed(new Date());
  const rng = mulberry32(seed);
  const index = Math.floor(rng() * deck.length);
  const isReversed = rng() < 0.35;

  return {
    card: deck[index],
    isReversed,
  };
}

// ============================================
// Lucky Attributes (Deterministic by Date)
// ============================================

const LUCKY_COLORS = [
  "Crimson Red",
  "Royal Purple",
  "Ocean Blue",
  "Emerald Green",
  "Golden Yellow",
  "Moonlit Silver",
  "Sunset Orange",
  "Mystic Violet",
  "Rose Pink",
  "Midnight Black",
  "Sky Blue",
  "Forest Green",
  "Coral",
  "Lavender",
  "Turquoise",
  "Amber",
  "Ivory",
  "Sapphire Blue",
  "Bronze",
  "Pearl White",
  "Magenta",
  "Teal",
  "Indigo",
  "Marigold",
  "Copper",
  "Jade Green",
  "Dusty Rose",
  "Cobalt Blue",
];

const AFFIRMATIONS = [
  "I trust the universe to guide my path with wisdom and love.",
  "I am open to receiving the abundance that flows toward me.",
  "My intuition is a powerful compass that leads me to my highest good.",
  "I release what no longer serves me and welcome new beginnings.",
  "I am worthy of love, success, and all the blessings life offers.",
  "I embrace change as a doorway to growth and transformation.",
  "I am connected to the ancient wisdom that flows through all things.",
  "My inner light shines brightly, illuminating the path ahead.",
  "I trust in divine timing and know that everything unfolds perfectly.",
  "I am grounded, centered, and aligned with my true purpose.",
  "The universe conspires in my favor, bringing opportunities for joy.",
  "I honor my emotions as sacred messengers guiding my journey.",
  "I stand in my power and create the reality I desire.",
  "I am surrounded by loving energy that protects and nurtures me.",
  "Every ending is a new beginning in disguise, and I welcome it.",
  "I am a channel for creativity, wisdom, and healing light.",
  "I forgive freely and release the weight of the past.",
  "My heart is open to giving and receiving love without limits.",
  "I am resilient, brave, and capable of overcoming any challenge.",
  "I attract positive energy and radiate peace to those around me.",
  "I celebrate my uniqueness and honor the gifts I bring to the world.",
  "I am at peace with the mystery of life and trust the journey.",
  "Each day is a fresh canvas, and I paint it with intention and joy.",
  "I am aligned with the rhythms of nature and the cycles of the moon.",
  "I choose courage over fear and faith over doubt.",
  "The stars align in my favor, and I step forward with confidence.",
  "I am a vessel of love, and my presence uplifts those around me.",
  "I surrender control and trust that the universe has a greater plan.",
  "I am grateful for every experience that has shaped who I am today.",
  "My spirit is free, my mind is clear, and my heart is full.",
];

/**
 * Returns a lucky number for today (1-99).
 */
export function getLuckyNumber(date?: Date): number {
  const seed = dateSeed(date);
  const rng = mulberry32(seed + 42);
  return Math.floor(rng() * 99) + 1;
}

/**
 * Returns a lucky color for today.
 */
export function getLuckyColor(date?: Date): string {
  const seed = dateSeed(date);
  const rng = mulberry32(seed + 77);
  return LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)];
}

/**
 * Returns a daily affirmation.
 */
export function getAffirmation(date?: Date): string {
  const seed = dateSeed(date);
  const rng = mulberry32(seed + 111);
  return AFFIRMATIONS[Math.floor(rng() * AFFIRMATIONS.length)];
}

// ============================================
// Moon Phase
// ============================================

/**
 * Calculates the approximate moon phase for a given date.
 */
export function getMoonPhase(date?: Date): { phase: string; emoji: string } {
  const d = date || new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  // Conway's moon phase algorithm (approximate)
  let r = year % 100;
  r %= 19;
  if (r > 9) r -= 19;
  r = ((r * 11) % 30) + month + day;
  if (month < 3) r += 2;
  r -= year < 2000 ? 4 : 8.3;
  r = Math.floor(r + 0.5) % 30;
  if (r < 0) r += 30;

  const phases: { phase: string; emoji: string }[] = [
    { phase: "New Moon", emoji: "🌑" },
    { phase: "Waxing Crescent", emoji: "🌒" },
    { phase: "First Quarter", emoji: "🌓" },
    { phase: "Waxing Gibbous", emoji: "🌔" },
    { phase: "Full Moon", emoji: "🌕" },
    { phase: "Waning Gibbous", emoji: "🌖" },
    { phase: "Last Quarter", emoji: "🌗" },
    { phase: "Waning Crescent", emoji: "🌘" },
  ];

  const index = Math.floor((r / 30) * 8) % 8;
  return phases[index];
}

// ============================================
// Zodiac Sign
// ============================================

/**
 * Returns the zodiac sign for a given birth date.
 */
export function getZodiacSign(
  birthDate: Date
): { sign: string; emoji: string; element: string } {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const signs: { sign: string; emoji: string; element: string; start: [number, number]; end: [number, number] }[] = [
    { sign: "Capricorn", emoji: "♑", element: "Earth", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", emoji: "♒", element: "Air", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", emoji: "♓", element: "Water", start: [2, 19], end: [3, 20] },
    { sign: "Aries", emoji: "♈", element: "Fire", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", emoji: "♉", element: "Earth", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", emoji: "♊", element: "Air", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", emoji: "♋", element: "Water", start: [6, 21], end: [7, 22] },
    { sign: "Leo", emoji: "♌", element: "Fire", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", emoji: "♍", element: "Earth", start: [8, 23], end: [9, 22] },
    { sign: "Libra", emoji: "♎", element: "Air", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", emoji: "♏", element: "Water", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", emoji: "♐", element: "Fire", start: [11, 22], end: [12, 21] },
  ];

  for (const z of signs) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;

    if (sm > em) {
      // Wraps around year boundary (Capricorn)
      if ((month === sm && day >= sd) || (month === em && day <= ed)) {
        return { sign: z.sign, emoji: z.emoji, element: z.element };
      }
    } else {
      if (
        (month === sm && day >= sd) ||
        (month === em && day <= ed) ||
        (month > sm && month < em)
      ) {
        return { sign: z.sign, emoji: z.emoji, element: z.element };
      }
    }
  }

  return { sign: "Capricorn", emoji: "♑", element: "Earth" };
}
