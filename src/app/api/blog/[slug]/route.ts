import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/db/queries";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/blog/[slug] — Get a single published blog post
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const post = await getPostBySlug(slug);
    if (!post || !post.published) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const data = {
      ...post,
      author: {
        name: [post.author.firstName, post.author.lastName].filter(Boolean).join(" ") || "Anonymous",
        avatar: post.author.avatar,
      },
      commentCount: post._count.comments,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET /api/blog/[slug] error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
