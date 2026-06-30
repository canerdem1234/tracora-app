import { createAdminClient } from "@/lib/supabase/server";

const ENGINE_COLORS: Record<string, string> = {
  chatgpt:    "from-emerald-500 to-teal-500",
  perplexity: "from-indigo-500 to-blue-500",
  gemini:     "from-blue-500 to-cyan-500",
  claude:     "from-orange-500 to-amber-500",
  grok:       "from-slate-500 to-zinc-500",
};

const SENTIMENT_CLS: Record<string, string> = {
  positive: "bg-emerald-500/20 text-emerald-400",
  neutral:  "bg-slate-500/20 text-slate-400",
  negative: "bg-red-500/20 text-red-400",
  "":       "bg-slate-500/20 text-slate-400",
};

export default async function AdminQueriesPage() {
  const admin = createAdminClient();

  const { data: queries, count } = await admin
    .from("queries")
    .select("id, user_id, ai_engine, prompt, status, created_at, brands(name), results(brand_mentioned, mention_count, sentiment)", { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(100);

  const rows = (queries as any[]) ?? [];

  const engineStats = rows.reduce((acc: Record<string, number>, q) => {
    acc[q.ai_engine] = (acc[q.ai_engine] ?? 0) + 1;
    return acc;
  }, {});

  const mentioned = rows.filter((q) => q.results?.[0]?.brand_mentioned).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Tüm Sorgular</h1>
        <p className="text-slate-400 mt-1 text-sm">Son 100 sorgu — toplam {count ?? 0}</p>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/3 border border-white/5 rounded-2xl p-4">
          <p className="text-slate-400 text-xs mb-1">Toplam Sorgu</p>
          <p className="text-2xl font-bold text-white">{count ?? 0}</p>
        </div>
        <div className="bg-white/3 border border-white/5 rounded-2xl p-4">
          <p className="text-slate-400 text-xs mb-1">Marka Geçti</p>
          <p className="text-2xl font-bold text-emerald-400">{mentioned}</p>
        </div>
        <div className="bg-white/3 border border-white/5 rounded-2xl p-4">
          <p className="text-slate-400 text-xs mb-1">Görünürlük Oranı</p>
          <p className="text-2xl font-bold text-white">{rows.length > 0 ? Math.round((mentioned / rows.length) * 100) : 0}%</p>
        </div>
        <div className="bg-white/3 border border-white/5 rounded-2xl p-4">
          <p className="text-slate-400 text-xs mb-2">En Çok Kullanılan Motor</p>
          <p className="text-sm font-bold text-white capitalize">
            {Object.entries(engineStats).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-"}
          </p>
        </div>
      </div>

      {/* Motor dağılımı */}
      {Object.keys(engineStats).length > 0 && (
        <div className="bg-white/3 border border-white/5 rounded-2xl p-5 mb-6">
          <p className="text-white font-medium text-sm mb-3">Motor Dağılımı</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(engineStats).sort((a, b) => b[1] - a[1]).map(([engine, cnt]) => (
              <div key={engine} className={`bg-gradient-to-r ${ENGINE_COLORS[engine] ?? "from-slate-500 to-slate-600"} text-white text-xs px-3 py-1.5 rounded-lg font-medium`}>
                {engine} ({cnt})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tablo */}
      <div className="bg-white/3 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Motor</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Marka</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Sorgu</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Sonuç</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">Henüz sorgu yok.</td>
                </tr>
              ) : (
                rows.map((q) => {
                  const r = q.results?.[0];
                  const sentCls = SENTIMENT_CLS[r?.sentiment ?? ""] ?? SENTIMENT_CLS[""];
                  return (
                    <tr key={q.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md text-white bg-gradient-to-r ${ENGINE_COLORS[q.ai_engine] ?? "from-slate-500 to-slate-600"}`}>
                          {q.ai_engine}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-xs">{q.brands?.name ?? "-"}</td>
                      <td className="py-3 px-4 text-slate-400 max-w-xs">
                        <p className="truncate text-xs">{q.prompt}</p>
                      </td>
                      <td className="py-3 px-4">
                        {r ? (
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${r.brand_mentioned ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                              {r.brand_mentioned ? `${r.mention_count}x` : "Yok"}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${sentCls}`}>
                              {r.sentiment === "positive" ? "Olumlu" : r.sentiment === "negative" ? "Olumsuz" : "Nötr"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs">
                        {new Date(q.created_at).toLocaleDateString("tr-TR")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
