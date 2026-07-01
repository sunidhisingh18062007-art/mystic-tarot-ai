import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email/sender";

/**
 * POST /api/contact — Submit contact form
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP: 3 submissions per 10 minutes
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const rl = rateLimit(`contact:${ip}`, { windowMs: 600_000, max: 3 });
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    // Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER || "admin@mystictarot.ai",
      subject: `[Contact Form] ${validated.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validated.name} (${validated.email})</p>
        <p><strong>Subject:</strong> ${validated.subject}</p>
        <hr />
        <p>${validated.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json(
      { success: true, data: { message: "Your message has been sent. We'll get back to you soon!" } },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ success: false, error: "Validation error", details: error }, { status: 400 });
    }
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
