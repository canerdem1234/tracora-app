import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: brands }, { data: subscription }, { data: recentQueries }] =
    await Promise.all([
      supabase.from("brands").select("id").eq("is_active", true),
      supabase.from("subscriptions").select("plan, query_limit_daily").eq("user_id", user!.id).single(),
      supabase
        .from("queries")
        .select("id, ai_engine, status, created_at, brands(name)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { count: todayQueryCount } = await supabase
    .from("queries")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", todayStart.toISOString());

  const queryLimit = subscription?.query_limit_daily ?? 10;
  const queryUsed = todayQueryCount ?? 0;
  const queryPercent = Math.min((queryUsed / queryLimit) * 100, 100);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">AI görünürlüğünü izle ve analiz et</p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Aktif Markalar</p>
          <p className="text-3xl font-bold text-white mt-1">{brands?.length ?? 0}</p>
          <a href="/dashboard/brands" className="text-indigo-400 text-xs mt-2 inline-block hover:text-indigo-300">
            Marka ekle +
          </a>
        </div>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Günlük Sorgu</p>
          <p className="text-3xl font-bold text-white mt-1">
            {queryUsed} <span className="text-slate-500 text-lg font-normal">/ {queryLimit}</span>
          </p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${queryPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Plan</p>
          <p className="text-3xl font-bold text-white mt-1 capitalize">
            {subscription?.plan ?? "Free"}
          </p>
          <a href="/dashboard/billing" className="text-indigo-400 text-xs mt-2 inline-block hover:text-indigo-300">
            Yükselt
          </a>
        </div>
      </div>

      {/* Son sorgular */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Son Sorgular</h2>
          <a href="/dashboard/queries" className="text-indigo-400 text-sm hover:text-indigo-300">
            Tümünü gör
          </a>
        </div>

        {!recentQueries?.length ? (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">Henüz sorgu yok.</p>
            <a href="/dashboard/queries" className="text-indigo-400 text-sm mt-2 inline-block hover:text-indigo-300">
              İlk sorguyu oluştur
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {recentQueries.map((q: any) => (
              <div key={q.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md uppercase font-mono">
                    {q.ai_engine}
                  </span>
                  <span className="text-slate-300 text-sm">{(q.brands as any)?.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    q.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                    q.status === "failed" ? "bg-red-500/20 text-red-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {q.status === "completed" ? "Tamamlandı" :
                     q.status === "failed" ? "Başarısız" : "Bekliyor"}
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(q.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
