import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const admin = createAdminClient();

  const [
    { count: totalUsers },
    { count: totalWaitlist },
    { count: totalBrands },
    { count: totalQueries },
    { count: todayQueries },
    { data: recentUsers },
    { data: planDist },
  ] = await Promise.all([
    admin.from("subscriptions").select("id", { count: "exact", head: true }),
    admin.from("waitlist").select("id", { count: "exact", head: true }),
    admin.from("brands").select("id", { count: "exact", head: true }).eq("is_active", true),
    admin.from("queries").select("id", { count: "exact", head: true }),
    admin.from("queries").select("id", { count: "exact", head: true })
      .gte("created_at", new Date(new Date().setHours(0,0,0,0)).toISOString()),
    admin.from("subscriptions")
      .select("user_id, plan, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    admin.from("subscriptions").select("plan"),
  ]);

  const planCounts = (planDist ?? []).reduce((acc: Record<string, number>, row: any) => {
    acc[row.plan] = (acc[row.plan] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Toplam Kullanıcı", value: totalUsers ?? 0, color: "from-indigo-500 to-indigo-600", icon: "👥" },
    { label: "Waitlist", value: totalWaitlist ?? 0, color: "from-cyan-500 to-cyan-600", icon: "📋" },
    { label: "Aktif Marka", value: totalBrands ?? 0, color: "from-violet-500 to-violet-600", icon: "🏷️" },
    { label: "Toplam Sorgu", value: totalQueries ?? 0, color: "from-emerald-500 to-emerald-600", icon: "⚡" },
    { label: "Bugünkü Sorgu", value: todayQueries ?? 0, color: "from-amber-500 to-amber-600", icon: "📊" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Genel Bakış</h1>
        <p className="text-slate-400 mt-1 text-sm">Tracora platform istatistikleri</p>
      </div>

      {/* İstatistik kartları */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-3xl font-bold text-white">{s.value}</p>
            <p className="text-white/70 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan dağılımı */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Plan Dağılımı</h2>
          <div className="space-y-3">
            {Object.entries(planCounts).length === 0 ? (
              <p className="text-slate-500 text-sm">Henüz kullanıcı yok.</p>
            ) : (
              Object.entries(planCounts).map(([plan, count]) => {
                const total = totalUsers ?? 1;
                const pct = Math.round(((count as number) / total) * 100);
                return (
                  <div key={plan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300 capitalize">{plan}</span>
                      <span className="text-white font-medium">{count as number} kullanıcı</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Son kayıt olan kullanıcılar */}
        <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Son Kayıtlar</h2>
          {!recentUsers?.length ? (
            <p className="text-slate-500 text-sm">Henüz kullanıcı yok.</p>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((u: any) => (
                <div key={u.user_id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                      ?
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm font-mono text-xs">{u.user_id.slice(0, 8)}...</p>
                      <span className="text-xs bg-white/5 text-slate-500 px-1.5 py-0.5 rounded capitalize">{u.plan}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">{new Date(u.created_at).toLocaleDateString("tr-TR")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
