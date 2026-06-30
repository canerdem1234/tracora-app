import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validations";
import { sendWaitlistConfirmation, sendWaitlistAdminNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const supabase = await createClient();
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Bu email zaten listede." },
          { status: 409 }
        );
      }
      throw error;
    }

    // Toplam kayıt sayısını al (admin bildirimi için)
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Email'leri paralel gönder (hata olsa bile kaydı bozmadan devam et)
    await Promise.allSettled([
      sendWaitlistConfirmation(email),
      sendWaitlistAdminNotification(email, count ?? undefined),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası. Lütfen tekrar dene." },
      { status: 500 }
    );
  }
}
