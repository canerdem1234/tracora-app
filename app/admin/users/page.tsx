import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminUsersPage() {
  const admin = createAdminClient();

  // Auth kullanıcı listesi
  const { data: authData } = await admin.auth.admin.listUsers({ perPage: 100 });
  const authUsers = authData?.users ?? [];

  // Subscription bilgileri
  const { data: subs } = await admin
    .from("subscriptions")
    .select("user_id, plan, query_limit_daily, valid_until, created_at");

  // Brand ve query sayıları
  const { data: brandCounts } = await admin
    .from("brands")
    .select("user_id")
    .eq("is_active", true);

  const { data: queryCounts } = await admin
    .from("queries")
    .select("user_id");

  const subMap = new Map((subs ?? []).map((s: any) => [s.user_id, s]));
  const brandCountMap = (brandCounts ?? []).reduce((acc: Record<string, number>, b: any) => {
    acc[b.user_id] = (acc[b.user_id] ?? 0) + 1;
    return acc;
  }, {});
  const queryCountMap = (queryCounts ?? []).reduce((acc: Record<string, number>, q: any) => {
    acc[q.user_id] = (acc[q.user_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Kullanıcılar</h1>
        <p className="text-slate-400 mt-1 text-sm">Kayıtlı tüm kullanıcılar — toplam {authUsers.length}</p>
      </div>

      <div className="bg-white/3 border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">E-posta</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Plan</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Marka</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Sorgu</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Doğrulama</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Kayıt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {authUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">Henüz kullanıcı yok.</td>
                </tr>
              ) : (
                authUsers.map((u) => {
                  const sub = subMap.get(u.id) as any;
                  const brands = brandCountMap[u.id] ?? 0;
                  const queries = queryCountMap[u.id] ?? 0;
                  const confirmed = !!u.email_confirmed_at;
                  return (
                    <tr key={u.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white">{u.email}</p>
                          <p className="text-slate-600 text-xs font-mono">{u.id.slice(0, 8)}...</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${
                          sub?.plan === "pro" ? "bg-indigo-500/20 text-indigo-300" :
                          sub?.plan === "enterprise" ? "bg-amber-500/20 text-amber-300" :
                          "bg-white/5 text-slate-400"
                        }`}>
                          {sub?.plan ?? "free"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{brands}</td>
                      <td className="py-3 px-4 text-slate-300">{queries}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${confirmed ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                          {confirmed ? "Doğrulandı" : "Bekliyor"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs">
                        {new Date(u.created_at).toLocaleDateString("tr-TR")}
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
