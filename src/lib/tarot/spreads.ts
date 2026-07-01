import type { SpreadConfig } from "@/types/tarot";

export const spreads: SpreadConfig[] = [
  // ============================================
  // General Spreads
  // ============================================
  {
    id: "single-card",
    name: "Single Card",
    description:
      "A quick, focused pull for daily guidance or a simple answer to a straightforward question. Perfect for beginners and daily practice.",
    cardCount: 1,
    positions: [
      { name: "The Card", meaning: "The core message or energy for your question", index: 0 },
    ],
    category: "general",
    icon: "🃏",
    isPremium: false,
  },
  {
    id: "three-card",
    name: "Three Card Spread",
    description:
      "A versatile spread offering insight into the flow of a situation. Commonly read as Past, Present, and Future or Mind, Body, Spirit.",
    cardCount: 3,
    positions: [
      { name: "Past", meaning: "Influences and events from the past shaping the current situation", index: 0 },
      { name: "Present", meaning: "The current state of affairs and energies at play right now", index: 1 },
      { name: "Future", meaning: "The likely outcome or direction things are heading", index: 2 },
    ],
    category: "general",
    icon: "🔮",
    isPremium: false,
  },
  {
    id: "past-present-future",
    name: "Past, Present, Future",
    description:
      "Explore the timeline of your situation with clarity. Understand how past events influence your present and what the future may hold.",
    cardCount: 3,
    positions: [
      { name: "The Past", meaning: "Events and energies that have led to where you are now", index: 0 },
      { name: "The Present", meaning: "Current circumstances, challenges, and opportunities", index: 1 },
      { name: "The Future", meaning: "What is likely to unfold based on the current trajectory", index: 2 },
    ],
    category: "time",
    icon: "⏳",
    isPremium: false,
  },
  {
    id: "five-card-cross",
    name: "Five Card Cross",
    description:
      "A cross-shaped spread that explores a situation from multiple angles — the heart of the matter, challenges, influences, advice, and outcome.",
    cardCount: 5,
    positions: [
      { name: "Present Situation", meaning: "The core of your current situation", index: 0 },
      { name: "Challenge", meaning: "The primary obstacle or challenge you face", index: 1 },
      { name: "Past Influence", meaning: "A past event or energy still affecting the situation", index: 2 },
      { name: "Advice", meaning: "Guidance and recommended action to take", index: 3 },
      { name: "Outcome", meaning: "The most likely outcome if you follow this path", index: 4 },
    ],
    category: "general",
    icon: "✝️",
    isPremium: false,
  },
  {
    id: "seven-card",
    name: "Seven Card Spread",
    description:
      "A comprehensive week-ahead or situational spread that provides deep insight into all facets of a complex question.",
    cardCount: 7,
    positions: [
      { name: "The Past", meaning: "Recent past events that set the stage", index: 0 },
      { name: "The Present", meaning: "Where you stand right now", index: 1 },
      { name: "The Future", meaning: "Short-term developments ahead", index: 2 },
      { name: "You", meaning: "Your inner state, feelings, and attitude", index: 3 },
      { name: "Environment", meaning: "External influences and people around you", index: 4 },
      { name: "Hopes & Fears", meaning: "What you hope for or fear about the outcome", index: 5 },
      { name: "Final Outcome", meaning: "The ultimate resolution of the matter", index: 6 },
    ],
    category: "general",
    icon: "🌟",
    isPremium: false,
  },
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    description:
      "The most iconic and comprehensive tarot spread. Ten cards reveal the full picture — from the heart of the matter to the final outcome, including hidden influences and hopes.",
    cardCount: 10,
    positions: [
      { name: "Present", meaning: "The current situation and primary energy around you", index: 0 },
      { name: "Challenge", meaning: "The immediate challenge or obstacle crossing you", index: 1 },
      { name: "Foundation", meaning: "The underlying basis or root cause of the situation", index: 2 },
      { name: "Recent Past", meaning: "Energies and events that are just passing", index: 3 },
      { name: "Crown", meaning: "The best possible outcome or your conscious goal", index: 4 },
      { name: "Near Future", meaning: "What is about to come into play", index: 5 },
      { name: "Self", meaning: "Your attitude, perspective, and how you see yourself in this", index: 6 },
      { name: "Environment", meaning: "External influences — people, situations, energies around you", index: 7 },
      { name: "Hopes & Fears", meaning: "Your innermost hopes and deepest fears about the outcome", index: 8 },
      { name: "Final Outcome", meaning: "The culmination — where this path ultimately leads", index: 9 },
    ],
    category: "general",
    icon: "☘️",
    isPremium: true,
  },
  {
    id: "yes-no",
    name: "Yes or No",
    description:
      "A single card pull designed for yes-or-no questions. Upright leans toward yes, reversed leans toward no, with nuance from the card's meaning.",
    cardCount: 1,
    positions: [
      { name: "Answer", meaning: "The universe's response to your yes-or-no question", index: 0 },
    ],
    category: "general",
    icon: "❓",
    isPremium: false,
  },

  // ============================================
  // Love & Relationship Spreads
  // ============================================
  {
    id: "love",
    name: "Love Spread",
    description:
      "Explore your romantic life with this focused five-card spread. Understand your heart's desires, blocks to love, and the romantic energy surrounding you.",
    cardCount: 5,
    positions: [
      { name: "Your Heart", meaning: "Your current emotional state regarding love", index: 0 },
      { name: "What You Want", meaning: "Your conscious or unconscious desires in love", index: 1 },
      { name: "What Blocks You", meaning: "Obstacles preventing you from finding or deepening love", index: 2 },
      { name: "Advice", meaning: "Guidance from the universe on your love journey", index: 3 },
      { name: "Love Outcome", meaning: "Where your love life is heading", index: 4 },
    ],
    category: "love",
    icon: "💕",
    isPremium: false,
  },
  {
    id: "relationship",
    name: "Relationship Spread",
    description:
      "A seven-card spread that examines both partners' perspectives, the connection between them, challenges, strengths, and the relationship's potential.",
    cardCount: 7,
    positions: [
      { name: "You", meaning: "Your role, energy, and feelings in the relationship", index: 0 },
      { name: "Your Partner", meaning: "Your partner's role, energy, and feelings", index: 1 },
      { name: "The Connection", meaning: "The nature and quality of your bond", index: 2 },
      { name: "Strengths", meaning: "What makes this relationship strong", index: 3 },
      { name: "Challenges", meaning: "Areas of friction or growth needed", index: 4 },
      { name: "Advice", meaning: "What the relationship needs most right now", index: 5 },
      { name: "Future of the Relationship", meaning: "Where the relationship is heading", index: 6 },
    ],
    category: "love",
    icon: "💑",
    isPremium: true,
  },
  {
    id: "soulmate",
    name: "Soulmate Spread",
    description:
      "Discover insights about your soulmate connection. This six-card spread explores who your soulmate may be, when you might meet, and what lessons await.",
    cardCount: 6,
    positions: [
      { name: "Your Soul Energy", meaning: "The energy you radiate that attracts your soulmate", index: 0 },
      { name: "Soulmate Qualities", meaning: "Key traits or energies of your soulmate", index: 1 },
      { name: "Where or How You'll Meet", meaning: "Clues about the circumstances of meeting", index: 2 },
      { name: "Lesson Together", meaning: "The karmic or spiritual lesson you'll share", index: 3 },
      { name: "Obstacles to Union", meaning: "What stands between you and your soulmate", index: 4 },
      { name: "Outcome", meaning: "The potential of this soulmate connection", index: 5 },
    ],
    category: "love",
    icon: "🔥",
    isPremium: true,
  },

  // ============================================
  // Career & Finance Spreads
  // ============================================
  {
    id: "career",
    name: "Career Spread",
    description:
      "Navigate your professional path with this focused five-card spread. Gain clarity on your career direction, challenges, hidden talents, and next steps.",
    cardCount: 5,
    positions: [
      { name: "Current Career Energy", meaning: "The overall energy surrounding your work life right now", index: 0 },
      { name: "Strengths & Talents", meaning: "Skills and gifts you should leverage", index: 1 },
      { name: "Challenges at Work", meaning: "Professional obstacles or areas for growth", index: 2 },
      { name: "Hidden Opportunity", meaning: "An opportunity you may not be seeing", index: 3 },
      { name: "Career Outcome", meaning: "Where your professional path is leading", index: 4 },
    ],
    category: "career",
    icon: "💼",
    isPremium: false,
  },

  // ============================================
  // Spiritual & Self-Discovery Spreads
  // ============================================
  {
    id: "shadow-work",
    name: "Shadow Work Spread",
    description:
      "Confront and integrate your shadow self. This five-card spread illuminates hidden aspects of your personality, repressed emotions, and the path to wholeness.",
    cardCount: 5,
    positions: [
      { name: "Your Conscious Self", meaning: "How you present yourself to the world", index: 0 },
      { name: "Your Shadow", meaning: "The hidden or repressed part of yourself", index: 1 },
      { name: "Root Cause", meaning: "Where this shadow originated — a past wound or belief", index: 2 },
      { name: "How to Integrate", meaning: "Steps to accept and heal this shadow aspect", index: 3 },
      { name: "Gift of the Shadow", meaning: "The strength or wisdom that comes from doing this work", index: 4 },
    ],
    category: "spiritual",
    icon: "🌑",
    isPremium: true,
  },
  {
    id: "past-life",
    name: "Past Life Spread",
    description:
      "Explore the echoes of past lives that influence your present journey. Uncover karmic patterns, past-life talents, and soul lessons.",
    cardCount: 5,
    positions: [
      { name: "Past Life Identity", meaning: "Who you were in a significant past life", index: 0 },
      { name: "Past Life Lesson", meaning: "The main lesson from that lifetime", index: 1 },
      { name: "Karmic Pattern", meaning: "A pattern you've carried into this life", index: 2 },
      { name: "How It Affects You Now", meaning: "How this past life influences your current reality", index: 3 },
      { name: "Path to Resolution", meaning: "How to resolve and transcend this karmic energy", index: 4 },
    ],
    category: "spiritual",
    icon: "🔄",
    isPremium: true,
  },

  // ============================================
  // Decision Spreads
  // ============================================
  {
    id: "decision",
    name: "Decision Spread",
    description:
      "Facing a crossroads? This five-card spread compares two paths, showing the pros, cons, and likely outcomes of each choice to guide your decision.",
    cardCount: 5,
    positions: [
      { name: "The Core Issue", meaning: "The heart of the decision you're facing", index: 0 },
      { name: "Path A", meaning: "The energy and likely outcome of the first option", index: 1 },
      { name: "Path B", meaning: "The energy and likely outcome of the second option", index: 2 },
      { name: "What You Need to Know", meaning: "Hidden information or factors to consider", index: 3 },
      { name: "Recommended Path", meaning: "Guidance on which direction serves your highest good", index: 4 },
    ],
    category: "decision",
    icon: "⚖️",
    isPremium: false,
  },

  // ============================================
  // Celestial & Time-Based Spreads
  // ============================================
  {
    id: "birthday",
    name: "Birthday Spread",
    description:
      "A twelve-card spread representing each month of the year ahead. Pull this on or near your birthday for guidance throughout your personal new year.",
    cardCount: 12,
    positions: [
      { name: "Month 1", meaning: "Themes and energy for the first month", index: 0 },
      { name: "Month 2", meaning: "Themes and energy for the second month", index: 1 },
      { name: "Month 3", meaning: "Themes and energy for the third month", index: 2 },
      { name: "Month 4", meaning: "Themes and energy for the fourth month", index: 3 },
      { name: "Month 5", meaning: "Themes and energy for the fifth month", index: 4 },
      { name: "Month 6", meaning: "Themes and energy for the sixth month", index: 5 },
      { name: "Month 7", meaning: "Themes and energy for the seventh month", index: 6 },
      { name: "Month 8", meaning: "Themes and energy for the eighth month", index: 7 },
      { name: "Month 9", meaning: "Themes and energy for the ninth month", index: 8 },
      { name: "Month 10", meaning: "Themes and energy for the tenth month", index: 9 },
      { name: "Month 11", meaning: "Themes and energy for the eleventh month", index: 10 },
      { name: "Month 12", meaning: "Themes and energy for the twelfth month", index: 11 },
    ],
    category: "time",
    icon: "🎂",
    isPremium: true,
  },
  {
    id: "new-moon",
    name: "New Moon Spread",
    description:
      "Harness the energy of the new moon for intention-setting and new beginnings. This six-card spread helps you plant seeds for the lunar cycle ahead.",
    cardCount: 6,
    positions: [
      { name: "Current Energy", meaning: "The energy you carry into this new moon", index: 0 },
      { name: "What to Release", meaning: "What you need to let go of to make space for the new", index: 1 },
      { name: "Intention to Set", meaning: "The ideal intention or goal for this lunar cycle", index: 2 },
      { name: "Support Available", meaning: "Resources, people, or energies supporting your intention", index: 3 },
      { name: "Potential Challenge", meaning: "A hurdle that may arise as you pursue your intention", index: 4 },
      { name: "Manifestation Outcome", meaning: "What may manifest by the full moon", index: 5 },
    ],
    category: "spiritual",
    icon: "🌑",
    isPremium: true,
  },
  {
    id: "full-moon",
    name: "Full Moon Spread",
    description:
      "Embrace the illuminating energy of the full moon. This six-card spread reveals what has come to fruition, what to release, and how to move forward with clarity.",
    cardCount: 6,
    positions: [
      { name: "What Is Illuminated", meaning: "What the full moon's light is revealing to you", index: 0 },
      { name: "What Has Come to Fruition", meaning: "Results and manifestations from the current cycle", index: 1 },
      { name: "What to Release", meaning: "Emotions, habits, or situations to let go of now", index: 2 },
      { name: "Gratitude Focus", meaning: "What you should be grateful for right now", index: 3 },
      { name: "Healing Message", meaning: "A healing insight or message for your soul", index: 4 },
      { name: "Moving Forward", meaning: "Guidance for the waning moon phase ahead", index: 5 },
    ],
    category: "spiritual",
    icon: "🌕",
    isPremium: true,
  },
  {
    id: "year-ahead",
    name: "Year Ahead Spread",
    description:
      "A grand twelve-card spread, one for each month of the coming year. Ideal for New Year's or any time you want a comprehensive annual forecast.",
    cardCount: 12,
    positions: [
      { name: "January", meaning: "Themes, energy, and focus for January", index: 0 },
      { name: "February", meaning: "Themes, energy, and focus for February", index: 1 },
      { name: "March", meaning: "Themes, energy, and focus for March", index: 2 },
      { name: "April", meaning: "Themes, energy, and focus for April", index: 3 },
      { name: "May", meaning: "Themes, energy, and focus for May", index: 4 },
      { name: "June", meaning: "Themes, energy, and focus for June", index: 5 },
      { name: "July", meaning: "Themes, energy, and focus for July", index: 6 },
      { name: "August", meaning: "Themes, energy, and focus for August", index: 7 },
      { name: "September", meaning: "Themes, energy, and focus for September", index: 8 },
      { name: "October", meaning: "Themes, energy, and focus for October", index: 9 },
      { name: "November", meaning: "Themes, energy, and focus for November", index: 10 },
      { name: "December", meaning: "Themes, energy, and focus for December", index: 11 },
    ],
    category: "time",
    icon: "📅",
    isPremium: true,
  },
];

/**
 * Get a spread configuration by its ID.
 */
export function getSpreadById(id: string): SpreadConfig | undefined {
  return spreads.find((spread) => spread.id === id);
}

/**
 * Get all free spreads.
 */
export function getFreeSpreads(): SpreadConfig[] {
  return spreads.filter((spread) => !spread.isPremium);
}

/**
 * Get all premium spreads.
 */
export function getPremiumSpreads(): SpreadConfig[] {
  return spreads.filter((spread) => spread.isPremium);
}

/**
 * Get spreads by category.
 */
export function getSpreadsByCategory(category: string): SpreadConfig[] {
  return spreads.filter((spread) => spread.category === category);
}
