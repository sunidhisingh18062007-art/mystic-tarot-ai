import type { DrawnCard, ReadingType } from "@/types/tarot";

// ============================================
// Prompt Building Parameters
// ============================================

export interface ReadingPromptParams {
  drawnCards: DrawnCard[];
  readingType: ReadingType;
  question?: string;
  userName?: string;
  zodiacSign?: string;
  birthDate?: string;
}

// ============================================
// System Prompt
// ============================================

const SYSTEM_PROMPT = `You are Mystic Tarot AI — a wise, empathetic, and deeply intuitive tarot reader with decades of experience in the mystical arts. You blend traditional Rider-Waite tarot symbolism with modern psychological insight and spiritual wisdom.

Your voice is warm yet authoritative, poetic yet practical. You speak with the gravitas of an oracle and the compassion of a trusted counselor. You never predict doom without offering hope, and you never sugarcoat truth when honesty serves the querent's growth.

Core principles:
- Honor the querent's free will — the cards reveal energies and possibilities, not fixed fate
- Consider card interactions and how they tell a story together across positions
- Reversed cards are not "bad" — they indicate blocked, internalized, or delayed energy
- Use the specific position meaning to contextualize each card's message
- Weave in elemental, astrological, and numerological connections when relevant
- Provide actionable, grounded advice alongside spiritual insight
- Be sensitive to potentially difficult readings — frame challenges as growth opportunities

You respond ONLY in valid JSON format as specified in the user prompt.`;

// ============================================
// Card Description Builder
// ============================================

function buildCardDescription(drawnCard: DrawnCard): string {
  const { card, position, isReversed } = drawnCard;
  const orientation = isReversed ? "REVERSED" : "UPRIGHT";
  const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;

  return `
📍 Position: "${position.name}" — ${position.meaning}
🃏 Card: ${card.name} (${orientation})
🔮 Keywords: ${card.keywords.join(", ")}
📖 Core Meaning: ${meaning}
💕 Love Aspect: ${card.loveMeaning}
💼 Career Aspect: ${card.careerMeaning}
💰 Financial Aspect: ${card.financeMeaning}
🏥 Health Aspect: ${card.healthMeaning}
🌍 Element: ${card.element} | Planet: ${card.planet} | Astrology: ${card.astrology}
🔢 Numerology: ${card.numerology}
📝 Description: ${card.description}`.trim();
}

// ============================================
// Reading Type Context
// ============================================

function getReadingTypeContext(readingType: ReadingType): string {
  const contexts: Record<string, string> = {
    "single-card":
      "This is a single-card pull for quick, focused guidance. Provide a concise but meaningful interpretation that speaks directly to the card's energy and message.",
    "three-card":
      "This is a classic three-card spread. Pay attention to the narrative flow between the cards and how they tell a story together from past to present to future.",
    "past-present-future":
      "This spread focuses on the timeline of a situation. Emphasize the causal chain — how the past has shaped the present and how current energies point toward the future.",
    "five-card-cross":
      "This cross-shaped spread examines a situation from multiple angles. Consider how the central card interacts with the surrounding positions to create a complete picture.",
    "seven-card":
      "This comprehensive spread covers all aspects of a situation. Look for patterns, elemental balances, and the overall story the cards tell together.",
    "celtic-cross":
      "This is the iconic Celtic Cross — the most thorough spread in tarot. Analyze the cross section (positions 1-6) as the querent's current journey, and the staff section (positions 7-10) as the broader context and outcome. Look for card pairs and thematic threads throughout.",
    "love":
      "This is a love-focused reading. Emphasize emotional energies, relationship dynamics, heart-centered guidance, and the querent's capacity to give and receive love. Be gentle but honest.",
    "relationship":
      "This spread examines a specific relationship from both perspectives. Balance your analysis equally between partners, and pay special attention to the connection card and how it bridges the two energies.",
    "soulmate":
      "This is a soulmate reading — deeply spiritual and hopeful in nature. Speak to soul-level connections, karmic bonds, and divine timing while remaining grounded in practical guidance.",
    "career":
      "This is a career-focused reading. Provide practical professional advice alongside spiritual insight. Address ambition, skills, workplace dynamics, and professional growth.",
    "yes-no":
      "This is a yes-or-no reading. Provide a clear leaning (yes, no, or maybe with conditions), then explain the nuance behind the answer. Upright generally leans yes, reversed generally leans no, but consider the specific card's energy.",
    "shadow-work":
      "This is a shadow work spread — deeply psychological and transformative. Be compassionate but unflinching in addressing hidden aspects, repressed emotions, and the path to integration and wholeness.",
    "decision":
      "This spread helps with a specific decision. Clearly compare the two paths, highlight pros and cons of each, and offer guidance without making the decision for the querent. Respect their autonomy.",
    "birthday":
      "This is a birthday year-ahead spread. Give each month a distinct energy and theme. Create a narrative arc for the year that shows growth, challenges, and celebrations.",
    "new-moon":
      "This is a new moon intention-setting spread. Focus on beginnings, planting seeds, releasing old patterns, and setting powerful intentions for the lunar cycle.",
    "full-moon":
      "This is a full moon spread. Focus on illumination, harvest, release, gratitude, and the completion of cycles. The full moon reveals what was hidden.",
    "year-ahead":
      "This is a year-ahead forecast. Provide distinct monthly themes while weaving a cohesive narrative for the entire year. Note significant turning points and seasons of growth.",
    "past-life":
      "This is a past-life exploration spread. Speak to karmic patterns, soul memories, and how past-life energies echo in the present. Be imaginative yet grounded in tarot symbolism.",
    custom:
      "This is a custom reading. Adapt your interpretation to the specific positions and context provided.",
  };

  return contexts[readingType] || contexts.custom;
}

// ============================================
// Main Prompt Builder
// ============================================

export function buildReadingPrompt(params: ReadingPromptParams): {
  systemPrompt: string;
  userPrompt: string;
} {
  const { drawnCards, readingType, question, userName, zodiacSign } = params;

  const cardDescriptions = drawnCards
    .map((dc, i) => `\n--- Card ${i + 1} of ${drawnCards.length} ---\n${buildCardDescription(dc)}`)
    .join("\n");

  const readingContext = getReadingTypeContext(readingType);

  const personalContext = [
    userName ? `The querent's name is ${userName}.` : "",
    zodiacSign ? `Their zodiac sign is ${zodiacSign}.` : "",
    question ? `Their question is: "${question}"` : "No specific question was asked — provide general guidance.",
  ]
    .filter(Boolean)
    .join(" ");

  const userPrompt = `
## TAROT READING REQUEST

**Reading Type:** ${readingType}
**Number of Cards:** ${drawnCards.length}

### Context
${readingContext}

### Querent Information
${personalContext}

### Cards Drawn
${cardDescriptions}

---

## INSTRUCTIONS

Analyze the cards drawn above and provide a comprehensive tarot reading. Consider:
1. Each card's individual meaning in its specific position
2. How cards interact with and influence each other
3. Elemental dignities and astrological connections between cards
4. The overall narrative arc told by the spread
5. Reversed cards as blocked, internalized, or delayed energy (not simply "negative")
6. The querent's specific question or situation

You MUST respond with ONLY valid JSON in exactly this format (no markdown, no code fences):

{
  "summary": "A deep, comprehensive, and mystical 8-10 sentence overview of the entire reading that captures the main themes and energy in profound detail. Write as if speaking directly to the querent in a deeply personal reading.",
  "detailedAnalysis": [
    {
      "cardName": "Name of the card",
      "position": "Name of the position",
      "isReversed": true/false,
      "interpretation": "A highly detailed, poetic, and profound 8-10 sentence interpretation of this card in this position. Dive deep into its symbolism, considering its orientation and relationship to other cards in the spread.",
      "advice": "3-5 sentences of specific, actionable advice based on this card's deep message."
    }
  ],
  "actionSteps": [
    "Specific, practical action step 1 the querent can take",
    "Specific, practical action step 2",
    "Specific, practical action step 3"
  ],
  "warnings": [
    "Any cautionary messages or areas requiring careful attention (include at least 1)"
  ],
  "positiveInsights": [
    "Encouraging observation about the reading",
    "Another source of hope or strength revealed by the cards"
  ],
  "futurePossibilities": [
    "A possibility that may unfold based on the current energy",
    "Another potential development to be aware of"
  ],
  "confidenceScore": 0.85,
  "moodAnalysis": "One of: hopeful, cautious, transformative, peaceful, challenging, joyful, reflective, empowering, mysterious, balanced",
  "spiritualAdvice": "2-3 sentences of deeper spiritual or soul-level guidance drawn from the card symbolism.",
  "personalizedAdvice": "2-3 sentences of practical, personalized advice tailored to the querent's specific question or situation."
}

IMPORTANT:
- The "detailedAnalysis" array MUST have exactly ${drawnCards.length} entries, one for each card drawn.
- The "confidenceScore" should be a number between 0.0 and 1.0 reflecting how clearly the cards speak to the question.
- The "moodAnalysis" MUST be exactly one of: hopeful, cautious, transformative, peaceful, challenging, joyful, reflective, empowering, mysterious, balanced.
- All text should be written in second person ("you"), speaking directly to the querent.
- Be specific and avoid generic platitudes. Reference the actual cards and their symbolism.
`.trim();

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
  };
}

// ============================================
// Yes/No Prompt (Specialized)
// ============================================

export function buildYesNoPrompt(
  drawnCard: DrawnCard,
  question: string
): { systemPrompt: string; userPrompt: string } {
  const cardDesc = buildCardDescription(drawnCard);

  const userPrompt = `
## YES/NO TAROT READING

**Question:** "${question}"

### Card Drawn
${cardDesc}

---

## INSTRUCTIONS

Based on this single card, provide a clear yes/no/maybe answer with nuanced interpretation.

Traditional yes/no tarot guidelines:
- Upright cards generally lean toward "yes"
- Reversed cards generally lean toward "no"
- However, the specific card's energy matters — some upright cards (like The Tower, 10 of Swords) may still suggest "no" or "not yet"

Respond with ONLY valid JSON:

{
  "summary": "A 2-3 sentence answer that gives a clear yes/no/maybe leaning and explains why.",
  "detailedAnalysis": [
    {
      "cardName": "${drawnCard.card.name}",
      "position": "Answer",
      "isReversed": ${drawnCard.isReversed},
      "interpretation": "3-4 sentences interpreting this card as an answer to the question.",
      "advice": "1-2 sentences of advice based on the answer."
    }
  ],
  "actionSteps": ["One key action to take based on the answer"],
  "warnings": ["One caution to keep in mind"],
  "positiveInsights": ["One encouraging observation"],
  "futurePossibilities": ["One possibility to watch for"],
  "confidenceScore": 0.75,
  "moodAnalysis": "appropriate mood from the allowed list",
  "spiritualAdvice": "1-2 sentences of spiritual guidance.",
  "personalizedAdvice": "1-2 sentences tailored to the specific question asked."
}
`.trim();

  return {
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
  };
}
