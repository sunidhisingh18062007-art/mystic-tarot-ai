// ============================================
// Tarot Card Types
// ============================================

export type ArcanaType = "major" | "minor";
export type SuitType = "wands" | "cups" | "swords" | "pentacles";
export type ElementType = "fire" | "water" | "air" | "earth";

export interface TarotCard {
  id: string;
  name: string;
  arcana: ArcanaType;
  suit?: SuitType;
  number: number;
  image: string;
  description: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  financeMeaning: string;
  healthMeaning: string;
  element: string;
  planet: string;
  astrology: string;
  numerology: string;
}

// ============================================
// Card Position & Spread Types
// ============================================

export interface CardPosition {
  name: string;
  meaning: string;
  index: number;
}

export interface DrawnCard {
  card: TarotCard;
  position: CardPosition;
  isReversed: boolean;
}

export interface SpreadConfig {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: CardPosition[];
  category: SpreadCategory;
  icon: string;
  isPremium: boolean;
}

export type SpreadCategory =
  | "general"
  | "love"
  | "career"
  | "finance"
  | "health"
  | "spiritual"
  | "decision"
  | "time";

// ============================================
// Reading Types
// ============================================

export type ReadingType =
  | "single-card"
  | "three-card"
  | "five-card"
  | "seven-card"
  | "ten-card"
  | "celtic-cross"
  | "love"
  | "career"
  | "finance"
  | "health"
  | "relationship"
  | "soulmate"
  | "yes-no"
  | "past-present-future"
  | "shadow-work"
  | "decision"
  | "birthday"
  | "new-moon"
  | "full-moon"
  | "year-ahead"
  | "past-life"
  | "custom";

export interface ReadingResult {
  id: string;
  type: ReadingType;
  spread: string;
  question?: string;
  drawnCards: DrawnCard[];
  interpretation: AIInterpretation;
  createdAt: string;
  isFavorite?: boolean;
}

// ============================================
// AI Interpretation Types
// ============================================

export interface AIInterpretation {
  summary: string;
  detailedAnalysis: CardAnalysis[];
  actionSteps: string[];
  warnings: string[];
  positiveInsights: string[];
  futurePossibilities: string[];
  confidenceScore: number;
  moodAnalysis: MoodType;
  spiritualAdvice: string;
  personalizedAdvice: string;
}

export interface CardAnalysis {
  cardName: string;
  position: string;
  isReversed: boolean;
  interpretation: string;
  advice: string;
}

export type MoodType =
  | "hopeful"
  | "cautious"
  | "transformative"
  | "peaceful"
  | "challenging"
  | "joyful"
  | "reflective"
  | "empowering"
  | "mysterious"
  | "balanced";

// ============================================
// User Types
// ============================================

export interface UserProfile {
  id: string;
  clerkId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  birthDate?: string;
  zodiacSign?: string;
  language: string;
  theme: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  notifyEmail: boolean;
  notifyPush: boolean;
  notifyInApp: boolean;
  readingPreference?: string;
  dailyStreak: number;
  lastReadingDate?: string;
  totalReadings: number;
  createdAt: string;
}

export interface UserStats {
  totalReadings: number;
  favoriteCount: number;
  journalCount: number;
  dailyStreak: number;
  longestStreak: number;
  mostReadSpread: string;
  favoriteCard?: string;
  readingsThisMonth: number;
  joinedDaysAgo: number;
}

// ============================================
// Journal Types
// ============================================

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  readingId?: string;
  reading?: ReadingResult;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Blog Types
// ============================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  published: boolean;
  publishedAt?: string;
  views: number;
  commentCount?: number;
  createdAt: string;
}

export interface BlogComment {
  id: string;
  content: string;
  user: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

// ============================================
// Subscription & Payment Types
// ============================================

export type PlanType = "FREE" | "PREMIUM" | "PRO";

export interface SubscriptionInfo {
  plan: PlanType;
  status: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  highlighted?: boolean;
  stripePriceId?: {
    monthly: string;
    yearly: string;
  };
}

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ============================================
// Search Types
// ============================================

export interface SearchResult {
  type: "card" | "reading" | "blog" | "journal";
  id: string;
  title: string;
  description: string;
  url: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Daily Card Types
// ============================================

export interface DailyCardInfo {
  card: TarotCard;
  isReversed: boolean;
  luckyNumber: number;
  luckyColor: string;
  moonPhase: { phase: string; emoji: string };
  affirmation: string;
  date: string;
}
