import { createClient } from "@/lib/supabase/server";

const PLANS = [
  {
    name: "Starter",
    price: "₺490",
    period: "/ay",
    queries: "50 sorgu/gün",
    brands: "3 marka",
    engines: "5 AI motoru",
    features: ["E-posta bildirimleri", "Temel raporlama", "CSV dışa aktarma"],
    cta: "Başla",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₺1.490",
    period: "/ay",
    queries: "300 sorgu/gün",
    brands: "15 marka",
    engines: "10 AI motoru",
    features: ["Slack + Teams bildirimleri", "Gelişmiş analizler", "API erişimi", "HubSpot entegrasyonu"],
    cta: "Pro'ya Geç",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Özel",
    period: "",
    queries: "Sınırsız sorgu",
    brands: "Sınırsız marka",
    engines: "Tüm AI motorları",
    features: ["Özel entegrasyonlar", "White-label seçenek", "Öncelikli destek", "SLA garantisi"],
    cta: "Bizimle İletişime Geç",
    highlight: false,
  },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan, query_limit_daily, valid_until")
    .eq("user_id", user!.id)
    .single();

  const currentPlan = subscription?.plan ?? "free";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Abonelik</h1>
        <p className="text-slate-400 mt-1 text-sm">Mevcut planınız ve yükseltme seçenekleri</p>
      </div>

      {/* Mevcut plan */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-slate-400 text-sm mb-1">Mevcut Plan</p>
          <p className="text-white font-bold text-2xl capitalize">{currentPlan}</p>
          {subscription?.valid_until && (
            <p className="text-slate-500 text-xs mt-1">
              Yenileme: {new Date(subscription.valid_until).toLocaleDateString("tr-TR")}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Günlük Sorgu Limiti</p>
          <p className="text-white font-bold text-2xl">{subscription?.query_limit_daily ?? 10}</p>
        </div>
      </div>

      {/* Plan kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 flex flex-col ${
              plan.highlight
                ? "bg-gradient-to-b from-indigo-500/20 to-cyan-500/10 border border-indigo-500/30"
                : "bg-white/3 border border-white/5"
            }`}
          >
            {plan.highlight && (
              <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full w-fit mb-3">
                Popüler
              </span>
            )}
            <h3 className="text-white font-bold text-xl">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              <span className="text-slate-400 text-sm">{plan.period}</span>
            </div>

            <div className="space-y-2 mb-5">
              {[plan.queries, plan.brands, plan.engines].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <a
                href={plan.name === "Enterprise" ? "mailto:hello@tracora.ai?subject=Enterprise Plan" : "mailto:hello@tracora.ai?subject=" + plan.name + " Plan"}
                className={`w-full py-2.5 rounded-xl text-sm font-medium text-center block transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90"
                    : "border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 text-sm text-slate-400">
        <p>
          Ödeme sistemi entegrasyonu yakında aktif olacaktır. Şu an için plan yükseltme taleplerinizi
          <a href="mailto:hello@tracora.ai" className="text-indigo-400 hover:text-indigo-300 mx-1">hello@tracora.ai</a>
          adresine iletebilirsiniz.
        </p>
      </div>
    </div>
  );
}
