import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/helpers";
import prisma from "@/lib/db/prisma";
import { createCommentSchema, paginationSchema } from "@/lib/validation/schemas";
import { rateLimit } from "@/lib/rate-limit";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/blog/[slug]/comments — List comments for a blog post
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);

    const post = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true } });
    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const { page, limit } = paginationSchema.parse({
      page: searchParams.get("page") || 1,
      limit: searchParams.get("limit") || 20,
    });

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { postId: post.id },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { firstName: true, lastName: true, avatar: true } },
        },
      }),
      prisma.comment.count({ where: { postId: post.id } }),
    ]);

    const data = comments.map((c: any) => ({
      id: c.id,
      content: c.content,
      user: {
        name: [c.user.firstName, c.user.lastName].filter(Boolean).join(" ") || "Anonymous",
        avatar: c.user.avatar,
      },
      createdAt: c.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/blog/[slug]/comments error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/blog/[slug]/comments — Add a comment to a blog post
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { slug } = await params;

    // Rate limit: 5 comments per minute
    const rl = rateLimit(`comment:${user.id}`, { windowMs: 60_000, max: 5 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many comments. Please slow down." },
        { status: 429 }
      );
    }

    const post = await prisma.blogPost.findUnique({ where: { slug }, select: { id: true, published: true } });
    if (!post || !post.published) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    const body = await request.json();
    const { content } = createCommentSchema.parse(body);

    const comment = await prisma.comment.create({
      data: {
        postId: post.id,
        userId: user.id,
        content,
      },
      include: {
        user: { select: { firstName: true, lastName: true, avatar: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: comment.id,
        content: comment.content,
        user: {
          name: [comment.user.firstName, comment.user.lastName].filter(Boolean).join(" ") || "Anonymous",
          avatar: comment.user.avatar,
        },
        createdAt: comment.createdAt.toISOString(),
      },
    }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("POST /api/blog/[slug]/comments error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
