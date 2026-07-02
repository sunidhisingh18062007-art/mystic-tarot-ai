import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { z } from "zod";

const searchSchema = z.object({
  q: z.string().min(1).max(200),
  type: z.enum(["all", "card", "reading", "blog", "journal"]).optional().default("all"),
});

/**
 * GET /api/search — Global search across cards, readings, blog posts, journals
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const { q, type } = searchSchema.parse({
      q: searchParams.get("q"),
      type: searchParams.get("type") || "all",
    });

    const query = q.toLowerCase();
    const results: Array<{
      type: string;
      id: string;
      title: string;
      description: string;
      url: string;
    }> = [];

    // Search cards
    if (type === "all" || type === "card") {
      const cards = await prisma.card.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { keywords: { hasSome: [query] } },
          ],
        },
        take: 10,
      });

      results.push(
        ...cards.map((c: any) => ({
          type: "card" as const,
          id: c.id,
          title: c.name,
          description: c.description.substring(0, 150),
          url: `/cards/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
        }))
      );
    }

    // Search blog posts
    if (type === "all" || type === "blog") {
      const posts = await prisma.blogPost.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
        select: { id: true, slug: true, title: true, excerpt: true },
      });

      results.push(
        ...posts.map((p: any) => ({
          type: "blog" as const,
          id: p.id,
          title: p.title,
          description: p.excerpt?.substring(0, 150) || "",
          url: `/blog/${p.slug}`,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      data: results,
      meta: { query: q, total: results.length },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Invalid search query" }, { status: 400 });
    }
    console.error("GET /api/search error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
