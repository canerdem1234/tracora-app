import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { querySchema } from "@/lib/validations";
import { runAiQuery } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
    }

    // Günlük limit kontrolü
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("query_limit_daily")
      .eq("user_id", user.id)
      .single();

    const limit = subscription?.query_limit_daily ?? 10;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("queries")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", todayStart.toISOString());

    if ((count ?? 0) >= limit) {
      return NextResponse.json(
        { error: `Günlük sorgu limitine ulaştınız (${limit}). Planınızı yükseltin.` },
        { status: 429 }
      );
    }

    // Girdi doğrulama
    const body = await req.json();
    const result = querySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { brandId, aiEngine, prompt } = result.data;

    // Markanın bu kullanıcıya ait olduğunu doğrula (RLS bunu zaten engeller ama çift kontrol)
    const { data: brand } = await supabase
      .from("brands")
      .select("id, name, keywords")
      .eq("id", brandId)
      .eq("user_id", user.id)
      .single();

    if (!brand) {
      return NextResponse.json({ error: "Marka bulunamadı." }, { status: 404 });
    }

    // Sorguyu kaydet
    const { data: query, error: queryError } = await supabase
      .from("queries")
      .insert({
        user_id: user.id,
        brand_id: brandId,
        ai_engine: aiEngine,
        prompt,
        status: "running",
      })
      .select()
      .single();

    if (queryError) throw queryError;

    // AI sorgusunu çalıştır
    const aiResult = await runAiQuery({
      brandName: brand.name,
      keywords: brand.keywords,
      prompt,
      engine: aiEngine,
    });

    // Sonucu kaydet
    await supabase.from("results").insert({
      query_id: query.id,
      user_id: user.id,
      ai_response: aiResult.response,
      brand_mentioned: aiResult.brandMentioned,
      mention_count: aiResult.mentionCount,
      sentiment: aiResult.sentiment,
    });

    // Sorgu durumunu güncelle
    await supabase
      .from("queries")
      .update({ status: "completed" })
      .eq("id", query.id);

    return NextResponse.json({
      success: true,
      result: aiResult,
      queryId: query.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Sorgu çalıştırılamadı. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
