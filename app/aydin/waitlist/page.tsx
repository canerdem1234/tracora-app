import { createAdminClient } from "@/lib/supabase/server";

export default async function AdminWaitlistPage() {
  const admin = createAdminClient();

  const { data: waitlist, count } = await admin
    .from("waitlist")
    .select("id, email, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  const rows = waitlist ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Waitlist</h1>
          <p className="text-slate-400 mt-1 text-sm">Erken erişim için kayıt yaptıran e-postalar — toplam {count ?? 0}</p>
        </div>
        {rows.length > 0 && (
          <button
            onClick={undefined}
            className="text-sm text-slate-400 border border-white/10 px-4 py-2 rounded-xl hover:text-white hover:border-white/20 transition-colors"
            title="CSV olarak indir"
          >
            CSV İndir
          </button>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="text-center py-16 bg-white/3 border border-white/5 rounded-2xl">
          <p className="text-slate-500">Henüz waitlist kaydı yok.</p>
        </div>
      ) : (
        <div className="bg-white/3 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/2">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">#</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">E-posta</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Kayıt Tarihi</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Saat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row: any, i: number) => (
                <tr key={row.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4 text-slate-600 text-xs">{i + 1}</td>
                  <td className="py-3 px-4 text-white">{row.email}</td>
                  <td className="py-3 px-4 text-slate-400">{new Date(row.created_at).toLocaleDateString("tr-TR")}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">
                    {new Date(row.created_at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
