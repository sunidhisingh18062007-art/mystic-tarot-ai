import { z } from "zod";

// ============================================
// Reading Schemas
// ============================================
export const createReadingSchema = z.object({
  type: z.string().min(1, "Reading type is required"),
  spread: z.string().min(1, "Spread is required"),
  question: z.string().max(500).optional(),
  cards: z.array(
    z.object({
      cardId: z.string(),
      position: z.string(),
      isReversed: z.boolean(),
    })
  ).min(1, "At least one card is required"),
  interpretation: z.string().optional(),
  summary: z.string().optional(),
  actionSteps: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
  positiveInsights: z.array(z.string()).optional(),
  confidenceScore: z.number().min(0).max(1).optional(),
  moodAnalysis: z.string().optional(),
  spiritualAdvice: z.string().optional(),
  futurePossibilities: z.string().optional(),
});

// ============================================
// Journal Schemas
// ============================================
export const createJournalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(10000),
  mood: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
  readingId: z.string().optional(),
});

export const updateJournalSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(10000).optional(),
  mood: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

// ============================================
// Profile Schemas
// ============================================
export const updateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
  birthDate: z.string().optional(),
  zodiacSign: z.string().optional(),
  language: z.string().max(5).optional(),
  theme: z.enum(["dark", "light", "system"]).optional(),
  notifyEmail: z.boolean().optional(),
  notifyPush: z.boolean().optional(),
  notifyInApp: z.boolean().optional(),
  readingPreference: z.string().optional(),
});

// ============================================
// Comment Schemas
// ============================================
export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(2000),
});

// ============================================
// Contact Form Schema
// ============================================
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

// ============================================
// Blog Schemas
// ============================================
export const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1).max(200).optional(),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  published: z.boolean().optional(),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  slug: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().url().optional().nullable(),
  category: z.string().max(50).optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  published: z.boolean().optional(),
});

// ============================================
// Pagination Schema
// ============================================
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});
