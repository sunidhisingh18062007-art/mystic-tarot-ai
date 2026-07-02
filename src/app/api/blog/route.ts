import { NextRequest, NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/db/queries";
import { paginationSchema } from "@/lib/validation/schemas";

/**
 * GET /api/blog — List published blog posts with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const { page, limit } = paginationSchema.parse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 10,
    });
    const category = searchParams.get("category") || undefined;

    const result = await getPublishedPosts(page, limit, category);

    const posts = result.posts.map((post: any) => ({
      ...post,
      author: {
        name: [post.author.firstName, post.author.lastName].filter(Boolean).join(" ") || "Anonymous",
        avatar: post.author.avatar,
      },
      commentCount: post._count.comments,
    }));

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: { page, limit, total: result.total, totalPages: result.totalPages },
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
