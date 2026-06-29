import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Geçerli bir email girin." }, { status: 400 });
    }

    // Supabase henüz bağlanmadıysa, email'i logla (geliştirme aşaması)
    if (!supabaseUrl || supabaseUrl.includes("xxxxx")) {
      console.log("Waitlist email (Supabase bağlı değil):", email);
      return NextResponse.json({ success: true, message: "Listeye eklendi." });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Bu email zaten listede." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Sunucu hatası. Lütfen tekrar dene." },
      { status: 500 }
    );
  }
}
