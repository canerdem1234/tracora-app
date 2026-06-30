import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

    // Şimdilik console'a log at (ilerleyen aşamada email servisi eklenecek)
    console.log("[CONTACT FORM]", { name, email, subject, message: message.slice(0, 100) });

    // TODO: Resend veya Nodemailer ile hello@tracora.ai'ya ilet
    // Şimdilik 200 dön
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
