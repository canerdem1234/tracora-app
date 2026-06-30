import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).toLowerCase().trim(),
  subject: z.string().max(100).trim().optional().default(""),
  message: z.string().min(1).max(2000).trim(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Geçersiz form verisi." }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    const { error } = await sendContactEmail({ name, email, subject, message });
    if (error) {
      console.error("[CONTACT EMAIL ERROR]", error);
      return NextResponse.json({ error: "Mail gönderilemedi. Lütfen tekrar deneyin." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
