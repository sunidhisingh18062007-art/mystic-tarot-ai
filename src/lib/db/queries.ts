import prisma from "./prisma";

// ============================================
// Readings
// ============================================

export async function getUserReadings(
  userId: string,
  page = 1,
  limit = 10,
  type?: string
) {
  const where = { userId, ...(type ? { type } : {}) };
  const [readings, total] = await Promise.all([
    prisma.reading.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { favorites: { where: { userId } } },
    }),
    prisma.reading.count({ where }),
  ]);

  return {
    readings: readings.map((r: any) => ({
      ...r,
      isFavorite: r.favorites.length > 0,
    })),
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getReadingById(id: string, userId: string) {
  return prisma.reading.findFirst({
    where: { id, userId },
    include: { favorites: { where: { userId } } },
  });
}

export async function createReading(
  userId: string,
  data: {
    type: string;
    spread: string;
    question?: string;
    cards: unknown;
    interpretation?: string;
    summary?: string;
    actionSteps?: string[];
    warnings?: string[];
    positiveInsights?: string[];
    confidenceScore?: number;
    moodAnalysis?: string;
    spiritualAdvice?: string;
    futurePossibilities?: string | string[];
  }
) {
  const reading = await prisma.reading.create({
    data: {
      userId,
      type: data.type,
      spread: data.spread,
      question: data.question,
      cards: data.cards as never,
      interpretation: data.interpretation,
      summary: data.summary,
      actionSteps: data.actionSteps || [],
      warnings: data.warnings || [],
      positiveInsights: data.positiveInsights || [],
      confidenceScore: data.confidenceScore,
      moodAnalysis: data.moodAnalysis,
      spiritualAdvice: data.spiritualAdvice,
      futurePossibilities: Array.isArray(data.futurePossibilities) 
        ? data.futurePossibilities.join("\n\n") 
        : data.futurePossibilities,
    },
  });

  // Update user stats
  await prisma.user.update({
    where: { id: userId },
    data: {
      totalReadings: { increment: 1 },
      lastReadingDate: new Date(),
    },
  });

  return reading;
}

export async function deleteReading(id: string, userId: string) {
  return prisma.reading.deleteMany({ where: { id, userId } });
}

// ============================================
// Journals
// ============================================

export async function getUserJournals(
  userId: string,
  page = 1,
  limit = 10
) {
  const [journals, total] = await Promise.all([
    prisma.journal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { reading: { select: { id: true, type: true, spread: true } } },
    }),
    prisma.journal.count({ where: { userId } }),
  ]);

  return { journals, total, totalPages: Math.ceil(total / limit) };
}

export async function getJournalById(id: string, userId: string) {
  return prisma.journal.findFirst({
    where: { id, userId },
    include: { reading: true },
  });
}

export async function createJournal(
  userId: string,
  data: { title: string; content: string; mood?: string; tags?: string[]; readingId?: string }
) {
  return prisma.journal.create({
    data: {
      userId,
      title: data.title,
      content: data.content,
      mood: data.mood,
      tags: data.tags || [],
      readingId: data.readingId,
    },
  });
}

export async function updateJournal(
  id: string,
  userId: string,
  data: { title?: string; content?: string; mood?: string; tags?: string[] }
) {
  return prisma.journal.updateMany({
    where: { id, userId },
    data,
  });
}

export async function deleteJournal(id: string, userId: string) {
  return prisma.journal.deleteMany({ where: { id, userId } });
}

// ============================================
// Favorites
// ============================================

export async function getUserFavorites(userId: string, page = 1, limit = 10) {
  const [favorites, total] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { reading: true },
    }),
    prisma.favorite.count({ where: { userId } }),
  ]);

  return { favorites, total, totalPages: Math.ceil(total / limit) };
}

export async function toggleFavorite(userId: string, readingId: string) {
  const existing = await prisma.favorite.findUnique({
    where: { userId_readingId: { userId, readingId } },
  });
  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return false;
  }
  await prisma.favorite.create({ data: { userId, readingId } });
  return true;
}

// ============================================
// User Stats
// ============================================

export async function getUserStats(userId: string) {
  const [user, favoriteCount, journalCount, readingsThisMonth] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.favorite.count({ where: { userId } }),
      prisma.journal.count({ where: { userId } }),
      prisma.reading.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

  if (!user) return null;

  // Find most-used spread
  const spreadStats = await prisma.reading.groupBy({
    by: ["spread"],
    where: { userId },
    _count: { spread: true },
    orderBy: { _count: { spread: "desc" } },
    take: 1,
  });

  return {
    totalReadings: user.totalReadings,
    favoriteCount,
    journalCount,
    dailyStreak: user.dailyStreak,
    longestStreak: user.dailyStreak, // simplified
    mostReadSpread: spreadStats[0]?.spread || "None",
    readingsThisMonth,
    joinedDaysAgo: Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    ),
  };
}

// ============================================
// Blog Posts
// ============================================

export async function getPublishedPosts(page = 1, limit = 10, category?: string) {
  const where = {
    published: true,
    ...(category ? { category } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { firstName: true, lastName: true, avatar: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, total, totalPages: Math.ceil(total / limit) };
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: { select: { firstName: true, lastName: true, avatar: true } },
      _count: { select: { comments: true } },
    },
  });

  if (post) {
    // Increment views
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
  }

  return post;
}
