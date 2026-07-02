import type {
  DrawnCard,
  ReadingType,
  AIInterpretation,
  CardAnalysis,
  MoodType,
} from "@/types/tarot";
import openai from "./openai";
import { buildReadingPrompt, buildYesNoPrompt } from "./prompts";

// ============================================
// Main Interpretation Function
// ============================================

export async function interpretReading(
  drawnCards: DrawnCard[],
  readingType: ReadingType,
  question?: string,
  userName?: string,
  zodiacSign?: string
): Promise<AIInterpretation> {
  try {
    // Build the appropriate prompt
    const isYesNo = readingType === "yes-no" && question;
    const { systemPrompt, userPrompt } = isYesNo
      ? buildYesNoPrompt(drawnCards[0], question)
      : buildReadingPrompt({
          drawnCards,
          readingType,
          question,
          userName,
          zodiacSign,
        });

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.85,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      console.error("OpenAI returned empty response");
      return generateFallbackInterpretation(drawnCards, readingType, question);
    }

    // Parse and validate the response
    const parsed = JSON.parse(content) as AIInterpretation;
    return validateAndNormalize(parsed, drawnCards);
  } catch (error) {
    console.error("AI interpretation error:", error);
    return generateFallbackInterpretation(drawnCards, readingType, question);
  }
}

// ============================================
// Response Validation & Normalization
// ============================================

const VALID_MOODS: MoodType[] = [
  "hopeful",
  "cautious",
  "transformative",
  "peaceful",
  "challenging",
  "joyful",
  "reflective",
  "empowering",
  "mysterious",
  "balanced",
];

function validateAndNormalize(
  parsed: AIInterpretation,
  drawnCards: DrawnCard[]
): AIInterpretation {
  return {
    summary: parsed.summary || "The cards have spoken, revealing a path of insight and possibility.",
    detailedAnalysis: Array.isArray(parsed.detailedAnalysis)
      ? parsed.detailedAnalysis.slice(0, drawnCards.length)
      : drawnCards.map((dc) => ({
          cardName: dc.card.name,
          position: dc.position.name,
          isReversed: dc.isReversed,
          interpretation: dc.isReversed ? dc.card.reversedMeaning : dc.card.uprightMeaning,
          advice: "Reflect on this card's message and how it applies to your current situation.",
        })),
    actionSteps: Array.isArray(parsed.actionSteps) && parsed.actionSteps.length > 0
      ? parsed.actionSteps
      : ["Take time to meditate on the cards' messages.", "Journal about your feelings and insights.", "Trust your intuition as you move forward."],
    warnings: Array.isArray(parsed.warnings) && parsed.warnings.length > 0
      ? parsed.warnings
      : ["Be mindful of rushing important decisions during this time."],
    positiveInsights: Array.isArray(parsed.positiveInsights) && parsed.positiveInsights.length > 0
      ? parsed.positiveInsights
      : ["The cards indicate underlying strength and resilience in your situation."],
    futurePossibilities: Array.isArray(parsed.futurePossibilities) && parsed.futurePossibilities.length > 0
      ? parsed.futurePossibilities
      : ["New opportunities may emerge as you align with the cards' guidance."],
    confidenceScore: typeof parsed.confidenceScore === "number"
      ? Math.max(0, Math.min(1, parsed.confidenceScore))
      : 0.75,
    moodAnalysis: VALID_MOODS.includes(parsed.moodAnalysis)
      ? parsed.moodAnalysis
      : determineMood(drawnCards),
    spiritualAdvice: parsed.spiritualAdvice || "Trust in the divine timing of your journey. The universe is guiding you toward your highest good.",
    personalizedAdvice: parsed.personalizedAdvice || "Focus on what you can control, and release what you cannot. Your path is unfolding exactly as it should.",
  };
}

// ============================================
// Mood Determination (Fallback)
// ============================================

function determineMood(drawnCards: DrawnCard[]): MoodType {
  const reversedCount = drawnCards.filter((dc) => dc.isReversed).length;
  const reversedRatio = reversedCount / drawnCards.length;

  // Check for specific Major Arcana that strongly influence mood
  const majorCards = drawnCards.map((dc) => dc.card.id);

  if (majorCards.includes("major-10") || majorCards.includes("major-13")) {
    return "transformative";
  }
  if (majorCards.includes("major-17") || majorCards.includes("major-19")) {
    return "hopeful";
  }
  if (majorCards.includes("major-18") || majorCards.includes("major-12")) {
    return "mysterious";
  }
  if (majorCards.includes("major-06") || majorCards.includes("major-03")) {
    return "joyful";
  }
  if (majorCards.includes("major-11") || majorCards.includes("major-21")) {
    return "balanced";
  }

  if (reversedRatio > 0.6) return "cautious";
  if (reversedRatio < 0.2) return "empowering";

  return "reflective";
}

// ============================================
// Fallback Interpretation Generator
// ============================================

function generateFallbackInterpretation(
  drawnCards: DrawnCard[],
  readingType: ReadingType,
  question?: string
): AIInterpretation {
  const detailedAnalysis: CardAnalysis[] = drawnCards.map((dc) => {
    const { card, position, isReversed } = dc;
    const meaning = isReversed ? card.reversedMeaning : card.uprightMeaning;
    const orientation = isReversed ? "reversed" : "upright";
    const kw1 = card.keywords?.[0]?.toLowerCase() || "mystery";
    const kw2 = card.keywords?.[1]?.toLowerCase() || "fate";
    const keywordsList = card.keywords?.slice(0, 3).join(", ") || "the unknown";

    return {
      cardName: card.name,
      position: position.name,
      isReversed,
      interpretation: `The ${card.name} appears ${orientation} in the "${position.name}" position. ${meaning} In the context of ${(position.meaning || "this position").toLowerCase()}, this card suggests that ${isReversed ? "there may be blocked or internalized energy around" : "you are being called to embrace"} the themes of ${keywordsList}. The ${card.element} element brings ${card.element === "Fire" ? "passionate, action-oriented" : card.element === "Water" ? "emotional, intuitive" : card.element === "Air" ? "intellectual, communicative" : "practical, material"} energy to this area of your reading.`,
      advice: `Reflect on how ${kw1} and ${kw2} manifest in your life. ${isReversed ? "Consider what internal blocks might be preventing this energy from flowing freely." : "Lean into this energy and allow it to guide your next steps."}`,
    };
  });

  // Generate contextual summary
  const mainThemes = drawnCards
    .flatMap((dc) => dc.card.keywords.slice(0, 2))
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4);

  const reversedCount = drawnCards.filter((dc) => dc.isReversed).length;
  const energyBalance =
    reversedCount > drawnCards.length / 2
      ? "Your reading carries significant reversed energy, suggesting a time of introspection and internal work."
      : "The predominantly upright energy in your reading points to active, outward-flowing forces at work in your life.";

  const summary = `${question ? `In response to your question about "${question}," the` : "The"} cards reveal a reading woven with themes of ${mainThemes.join(", ")}. ${energyBalance} The ${drawnCards[0].card.name} ${drawnCards[0].isReversed ? "(reversed)" : ""} sets the tone for this reading, ${drawnCards[0].isReversed ? "asking you to look inward before taking action" : "inviting you to step forward with confidence"}. ${drawnCards.length > 1 ? `Together with the ${drawnCards[drawnCards.length - 1].card.name}, the cards paint a picture of a journey that, while not without its challenges, holds genuine promise for growth and understanding.` : "Trust in the message this card brings and allow it to illuminate your path."}`;

  // Generate action steps based on card elements
  const elements = drawnCards.map((dc) => dc.card.element);
  const actionSteps: string[] = [];

  if (elements.includes("Fire")) {
    actionSteps.push(
      "Channel your inner fire: Take bold, decisive action on something you've been putting off."
    );
  }
  if (elements.includes("Water")) {
    actionSteps.push(
      "Honor your emotions: Set aside quiet time for meditation, journaling, or a heart-to-heart conversation."
    );
  }
  if (elements.includes("Air")) {
    actionSteps.push(
      "Clarify your thoughts: Write down your goals, have an important discussion, or seek new perspectives."
    );
  }
  if (elements.includes("Earth")) {
    actionSteps.push(
      "Ground yourself: Focus on practical matters — finances, health routines, or creating tangible plans."
    );
  }
  if (actionSteps.length < 3) {
    actionSteps.push(
      "Trust the process and remain open to signs and synchronicities in the coming days.",
      "Practice gratitude by acknowledging three things you are thankful for today."
    );
  }

  return {
    summary,
    detailedAnalysis,
    actionSteps: actionSteps.slice(0, 4),
    warnings: [
      reversedCount > 0
        ? "The reversed cards in your reading suggest areas where energy may be blocked or misdirected. Pay attention to patterns that keep repeating — they hold important lessons."
        : "While the reading is generally positive, avoid complacency. Stay proactive and attentive to the guidance the cards offer.",
    ],
    positiveInsights: [
      `The presence of ${drawnCards[0].card.name} in your reading brings the gift of ${drawnCards[0].card.keywords[0].toLowerCase()}, reminding you of your innate strength.`,
      drawnCards.length > 1
        ? `The interplay between ${drawnCards[0].card.element} and ${drawnCards[drawnCards.length - 1].card.element} elements suggests a dynamic, evolving situation with room for growth.`
        : "This card's energy is a powerful ally on your journey forward.",
    ],
    futurePossibilities: [
      "A period of transformation is on the horizon — remain open to unexpected changes that serve your highest good.",
      "New connections or opportunities may emerge that align with the themes revealed in this reading.",
    ],
    confidenceScore: 0.72,
    moodAnalysis: determineMood(drawnCards),
    spiritualAdvice:
      "The cards serve as mirrors, reflecting the energies already within and around you. Trust your intuition — it is the bridge between the wisdom of the cards and the wisdom of your soul. Take what resonates, release what doesn't, and know that you hold the power to shape your own destiny.",
    personalizedAdvice: question
      ? `Regarding your question about "${question}," the cards encourage you to approach this matter with both openness and discernment. Pay attention to the themes that emerged — they are signposts pointing you toward clarity and resolution.`
      : "This reading invites you to pause and reflect on where you are and where you wish to go. The cards have laid a map before you — it is up to you to take the first step on this illuminated path.",
  };
}
