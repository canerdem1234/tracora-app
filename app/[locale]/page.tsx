import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollButton from "@/components/ScrollButton";
import Logo from "@/components/Logo";

const LOCALES = ["en", "es", "pt", "fr", "de", "ar", "ja", "zh", "hi"];

const motors = [
  { name: "ChatGPT", color: "#10a37f" },
  { name: "Perplexity", color: "#20b2aa" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Claude", color: "#d97706" },
  { name: "Grok", color: "#e5e5e5" },
  { name: "DeepSeek", color: "#4f46e5" },
  { name: "Meta AI", color: "#0668e1" },
  { name: "Copilot", color: "#00a4ef" },
  { name: "AI Overviews", color: "#ea4335" },
  { name: "Bing AI", color: "#008373" },
];

const BADGE_STYLES: Record<string, string> = {
  exclusive: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
  notAtComp: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  advanced: "bg-slate-700/50 text-slate-400",
  agency: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
};

type Messages = {
  nav: { features: string; motors: string; pricing: string; login: string; cta: string };
  hero: { badge: string; title1: string; title2: string; subtitle: string; discount: string; noCard: string; waitlistBtn: string };
  stats: { s1v: string; s1l: string; s2v: string; s2l: string; s3v: string; s3l: string; s4v: string; s4l: string };
  problem: { emoji: string; title: string; titleRed: string; desc: string; pain1: string; pain2: string; pain3: string };
  motors: { badge: string; title: string; titleGrad: string; desc: string };
  features: { badge: string; title: string; titleGrad: string; desc: string; badges: Record<string, string> };
  featureList: Array<{ icon: string; title: string; desc: string; badge: string }>;
  comparison: { badge: string; title: string; titleGrad: string; desc: string; features: string[]; headers: string[]; prices: string[] };
  pricing: { badge: string; title: string; desc: string; period: string; enterprise: string; enterpriseDesc: string; enterpriseCta: string; plans: Array<{ name: string; price: string; desc: string; features: string[]; cta: string }> };
  faq: { badge: string; title: string; items: Array<{ q: string; a: string }> };
  finalCta: { title: string; desc: string; waitlistBtn: string; noCard: string };
  footer: { copy: string; privacy: string; terms: string; agreement: string; contact: string };
};

const COMPARISON_DATA = [
  ["6", "5", "9", "10+"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "✗", "✓"],
  ["✗", "✗", "$799+", "$399+"],
];

const PLAN_COLORS = [
  "from-slate-700 to-slate-800",
  "from-indigo-600 to-cyan-600",
  "from-purple-700 to-indigo-700",
];

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();

  const m: Messages = (await import(`@/messages/${locale}.json`)).default;

  const stats = [
    { value: m.stats.s1v, label: m.stats.s1l },
    { value: m.stats.s2v, label: m.stats.s2l },
    { value: m.stats.s3v, label: m.stats.s3l },
    { value: m.stats.s4v, label: m.stats.s4l },
  ];

  const isRtl = locale === "ar";

  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar locale={locale} nav={m.nav} />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="section-badge mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          {m.hero.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl glow-text animate-fade-up">
          <span className="text-white">{m.hero.title1}</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {m.hero.title2}
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-up">
          {m.hero.subtitle}
        </p>

        <div className="w-full max-w-lg animate-fade-up" id="waitlist">
          <WaitlistForm />
          <p className="text-slate-500 text-sm mt-3">
            <span className="text-indigo-400 font-medium">{m.hero.discount}</span>. {m.hero.noCard}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl w-full">
          {stats.map((s) => (
            <div key={s.value} className="text-center">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-slate-500 text-xs mt-1 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-8 md:p-12 text-center">
            <div className="text-5xl mb-6">{m.problem.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {m.problem.title}{" "}
              <span className="text-red-400">{m.problem.titleRed}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">{m.problem.desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[m.problem.pain1, m.problem.pain2, m.problem.pain3].map((text, i) => (
                <div key={i} className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-left">
                  <div className="text-2xl mb-2">{["❓", "😵", "📉"][i]}</div>
                  <p className="text-slate-300 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI MOTORS */}
      <section id="motors" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-badge mb-6">{m.motors.badge}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {m.motors.title}{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {m.motors.titleGrad}
            </span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">{m.motors.desc}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {motors.map((motor) => (
              <div key={motor.name} className="gradient-border px-5 py-3 flex items-center gap-2.5 card-hover cursor-default">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: motor.color }} />
                <span className="text-white font-medium text-sm">{motor.name}</span>
              </div>
            ))}
            <div className="gradient-border px-5 py-3 flex items-center gap-2 card-hover cursor-default">
              <span className="text-slate-400 text-sm">+ More</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge mb-6">{m.features.badge}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {m.features.title}{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {m.features.titleGrad}
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">{m.features.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {m.featureList.map((f) => (
              <div key={f.title} className="gradient-border p-6 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{f.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${BADGE_STYLES[f.badge] ?? "bg-slate-700/50 text-slate-400"}`}>
                    {m.features.badges[f.badge]}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-badge mb-6">{m.comparison.badge}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {m.comparison.title}{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                {m.comparison.titleGrad}
              </span>
            </h2>
          </div>

          <div className="gradient-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">—</th>
                    {m.comparison.headers.map((h, i) => (
                      <th key={h} className="py-4 px-4 font-medium text-sm text-center">
                        {i === m.comparison.headers.length - 1 ? (
                          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                            {h}
                          </span>
                        ) : (
                          <span className="text-slate-400">{h}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-6 text-slate-600 text-xs"></td>
                    {m.comparison.prices.map((p, i) => (
                      <td key={i} className={`py-2 px-4 text-center text-xs ${i === m.comparison.prices.length - 1 ? "text-emerald-400 font-semibold" : "text-slate-600"}`}>
                        {p}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.comparison.features.map((feat, rowIdx) => (
                    <tr key={feat} className="border-b border-white/5 hover:bg-white/2">
                      <td className="py-3.5 px-6 text-slate-300 text-sm">{feat}</td>
                      {COMPARISON_DATA[rowIdx].map((val, i) => (
                        <td key={i} className="py-3.5 px-4 text-center text-sm">
                          {i === COMPARISON_DATA[rowIdx].length - 1 ? (
                            <span className={val === "✓" ? "text-emerald-400 font-bold text-base" : "text-emerald-400 font-semibold text-xs"}>
                              {val}
                            </span>
                          ) : (
                            <span className={val === "✗" ? "text-red-500" : "text-slate-300"}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge mb-6">{m.pricing.badge}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{m.pricing.title}</h2>
            <p className="text-slate-400">{m.pricing.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {m.pricing.plans.map((plan, idx) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  idx === 1
                    ? "bg-gradient-to-b from-indigo-600/20 to-cyan-600/10 border border-indigo-500/40"
                    : "gradient-border"
                }`}
              >
                {idx === 1 && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.cta}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{m.pricing.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="text-emerald-400 text-base">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <ScrollButton
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    idx === 1
                      ? "btn-primary"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {idx === 1 ? m.hero.waitlistBtn : plan.cta}
                </ScrollButton>
              </div>
            ))}
          </div>

          <div className="mt-6 gradient-border p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">{m.pricing.enterprise}</h3>
              <p className="text-slate-400 text-sm mt-1">{m.pricing.enterpriseDesc}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-black text-2xl">$999+</span>
              <a
                href="/contact"
                className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
              >
                {m.pricing.enterpriseCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-badge mb-6">{m.faq.badge}</div>
            <h2 className="text-3xl font-bold text-white mb-3">{m.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {m.faq.items.map((item) => (
              <div key={item.q} className="gradient-border p-6">
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 relative">
        <div className="orb" style={{ width: 300, height: 300, background: "rgba(99,102,241,0.12)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", position: "absolute", pointerEvents: "none" }} />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {m.finalCta.title}
            </span>
          </h2>
          <p className="text-slate-400 mb-8 text-lg">{m.finalCta.desc}</p>
          <div className="w-full max-w-lg mx-auto" id="waitlist-bottom">
            <WaitlistForm />
            <p className="text-slate-500 text-sm mt-3">{m.finalCta.noCard}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={28} />
            <span className="text-white font-bold">Tracora</span>
          </div>
          <p className="text-slate-600 text-sm">{m.footer.copy}</p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{m.footer.privacy}</a>
            <a href="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{m.footer.terms}</a>
            <a href="/user-agreement" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{m.footer.agreement}</a>
            <a href="/contact" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">{m.footer.contact}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
