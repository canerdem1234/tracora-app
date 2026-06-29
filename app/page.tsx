import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";
import ScrollButton from "@/components/ScrollButton";

const features = [
  {
    icon: "🔍",
    title: "10+ AI Motoru İzleme",
    desc: "ChatGPT, Perplexity, Gemini, Claude, Grok, DeepSeek, Meta AI ve daha fazlasında markanız nasıl görünüyor, tek panelde izleyin.",
    badge: "Rakipte yok",
  },
  {
    icon: "🔔",
    title: "Slack & Teams Bildirimi",
    desc: "Görünürlüğünüz değiştiğinde veya rakibiniz öne geçtiğinde Slack ya da Teams kanalınıza anında bildirim gelir.",
    badge: "Sadece Tracora'da",
  },
  {
    icon: "🔗",
    title: "HubSpot & Salesforce",
    desc: "AI görünürlük veriniz doğrudan CRM'inize akar. Satış ekibiniz de bu veriyi görür, ayrı araç açmak zorunda kalmaz.",
    badge: "Sadece Tracora'da",
  },
  {
    icon: "📊",
    title: "Rakip Karşılaştırma",
    desc: "Rakiplerinizin her AI motorundaki skorunu izleyin. Kimin öne geçtiğini, nerede geride kaldığınızı gerçek zamanlı görün.",
    badge: "Gelişmiş",
  },
  {
    icon: "🎭",
    title: "Sentiment Analizi",
    desc: "AI motorları markanızı nasıl anlatıyor? Pozitif mi, negatif mi? Hangi konularda olumsuz bahsedildiğini tespit edin.",
    badge: "Gelişmiş",
  },
  {
    icon: "💡",
    title: "İçerik Optimizasyon",
    desc: "AI'da daha çok görünmek için hangi içerikleri yazmanız gerektiğini, mevcut içeriklerinizin ne kadar atıf aldığını gösteririz.",
    badge: "Sadece Tracora'da",
  },
  {
    icon: "📈",
    title: "AI → Satış Atıfı",
    desc: "GA4 entegrasyonuyla AI motorlarından gelen trafiğin satışa etkisini somut olarak ölçün. ROI'yi kanıtlayın.",
    badge: "Gelişmiş",
  },
  {
    icon: "🏷️",
    title: "White-label Raporlar",
    desc: "Ajanslar için: müşterilerinize kendi markanızla sunum kalitesinde raporlar oluşturun. Tracora arka planda çalışır.",
    badge: "Agency",
  },
  {
    icon: "⚡",
    title: "Gerçek Zamanlı API",
    desc: "Kendi sistemlerinize Tracora verilerini entegre edin. Zapier, Make ve REST API ile 5.000+ uygulamaya bağlanın.",
    badge: "Agency",
  },
];

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

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/ay",
    desc: "Bireysel pazarlamacılar ve küçük işletmeler için",
    color: "from-slate-700 to-slate-800",
    features: [
      "7 AI Motoru",
      "1 Marka + 3 Rakip",
      "Slack Bildirimi",
      "GA4 Entegrasyonu",
      "Aylık PDF Raporu",
      "Email Desteği",
    ],
    cta: "Başla",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/ay",
    desc: "Büyüyen ekipler ve profesyonel pazarlamacılar için",
    color: "from-indigo-600 to-cyan-600",
    features: [
      "10+ AI Motoru (tam liste)",
      "5 Marka + 10 Rakip",
      "Slack + Teams Bildirimi",
      "HubSpot Entegrasyonu",
      "Sentiment Analizi",
      "Attribution Modeli",
      "Kaynak Atıf Analizi",
    ],
    cta: "En Popüler",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$399",
    period: "/ay",
    desc: "Dijital ajanslar ve çoklu müşteri yönetimi için",
    color: "from-purple-700 to-indigo-700",
    features: [
      "10+ AI Motoru",
      "Sınırsız Marka & Rakip",
      "White-label Raporlama",
      "Salesforce Entegrasyonu",
      "REST API Erişimi",
      "Müşteri Portalı",
      "Dedicated Account Manager",
    ],
    cta: "Ajans Planı",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Tracora rakip araçlardan nasıl farklı?",
    a: "Rakip araçlarda olmayan 3 kritik özellik sunuyoruz: Slack/Teams gerçek zamanlı bildirimi, HubSpot + Salesforce CRM entegrasyonu ve 10+ AI motoru (Claude, Grok, DeepSeek, Meta AI dahil). Hiçbir rakip bu 3'ünü birden sunmuyor.",
  },
  {
    q: "Veriler ne sıklıkla güncelleniyor?",
    a: "Starter ve Pro planlarda günlük otomatik tarama yapılıyor. Agency ve Enterprise planlarda saatlik tarama mevcut. Anlık değişiklikler Slack/Teams bildirimiyle anında iletilir.",
  },
  {
    q: "AI motorlarına gerçekten sorgu atılıyor mu?",
    a: "Evet. Tracora, belirlediğiniz anahtar kelimelerle her AI motoruna gerçek sorgular gönderir ve yanıtları analiz eder. Simüle edilmiş veri değil, gerçek zamanlı ölçüm.",
  },
  {
    q: "Ajanslar için white-label nasıl çalışıyor?",
    a: "Agency planında raporlara kendi logonuzu, renk paletinizi ve domain'inizi ekleyebilirsiniz. Müşterileriniz Tracora'nun varlığından haberdar olmaz.",
  },
];

const stats = [
  { value: "%73", label: "B2B web sitesi 2025'te organik trafik kaybetti" },
  { value: "4.4x", label: "AI trafiği SEO'dan daha yüksek dönüşüm sağlıyor" },
  { value: "%67", label: "Fortune 500 şirketi 2026'da GEO'yu öncelik yapıyor" },
  { value: "$7.3B", label: "AI izleme pazar büyüklüğü tahmini 2030" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <Navbar />

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        {/* Orb background */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Badge */}
        <div className="section-badge mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          Erken Erişim Listesi Açık
        </div>

        {/* Başlık */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl glow-text animate-fade-up">
          <span className="text-white">AI'da Markanız</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Ne Kadar Görünür?
          </span>
        </h1>

        {/* Alt başlık */}
        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-up">
          ChatGPT, Perplexity, Gemini, Claude, Grok ve 10+ AI motorunda
          markanızın görünürlüğünü izleyin, rakiplerinizle kıyaslayın ve
          büyütün. Slack bildirimi + CRM entegrasyonu ile tam kontrol.
        </p>

        {/* Waitlist Formu */}
        <div className="w-full max-w-lg animate-fade-up" id="waitlist">
          <WaitlistForm />
          <p className="text-slate-500 text-sm mt-3">
            İlk 100 kullanıcıya <span className="text-indigo-400 font-medium">%40 ömür boyu indirim</span>. Kredi kartı gerekmez.
          </p>
        </div>

        {/* Stats */}
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

      {/* ───────────── SORUN ───────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border p-8 md:p-12 text-center">
            <div className="text-5xl mb-6">😰</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Müşterileriniz AI'a soruyor,{" "}
              <span className="text-red-400">rakibinizin adını alıyorlar.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Google aramalarının %40'ı artık AI Overviews gösteriyor. ChatGPT ve
              Perplexity milyarlarca ürün ve hizmet sorusu yanıtlıyor. Siz bu
              yanıtlarda görünüyor musunuz? Görmüyorsanız, kaybediyorsunuz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: "❓", text: "AI'daki görünürlüğünüzü hiç ölçemediniz" },
                { icon: "😵", text: "Rakibiniz nerede öne geçiyor bilmiyorsunuz" },
                { icon: "📉", text: "Organik trafiğiniz düşüyor ama sebebi belirsiz" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-left"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── AI MOTORLARI ───────────── */}
      <section id="motors" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-badge mb-6">10+ AI Motoru</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tüm AI Motorlarını Tek Yerden İzleyin
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            Rakipler maksimum 6-9 motor izliyor. Biz Grok, DeepSeek ve Meta AI
            dahil piyasanın en geniş kapsamını sunuyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {motors.map((m) => (
              <div
                key={m.name}
                className="gradient-border px-5 py-3 flex items-center gap-2.5 card-hover cursor-default"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: m.color }}
                />
                <span className="text-white font-medium text-sm">{m.name}</span>
              </div>
            ))}
            <div className="gradient-border px-5 py-3 flex items-center gap-2 card-hover cursor-default">
              <span className="text-slate-400 text-sm">+ Daha fazlası</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── ÖZELLİKLER ───────────── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge mb-6">Özellikler</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rakiplerde Olan Her Şey + Olmayan Daha Fazlası
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Piyasadaki her GEO aracını inceledik. Eksiklerini bulduk ve
              hepsini Tracora'ya ekledik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="gradient-border p-6 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{f.icon}</div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      f.badge === "Sadece Tracora'da"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : f.badge === "Rakipte yok"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-slate-700/50 text-slate-400"
                    }`}
                  >
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── KARŞILAŞTIRMA ───────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-badge mb-6">Karşılaştırma</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rakiplerde Ne Var, Tracora'da Ne Var?
            </h2>
          </div>

          <div className="gradient-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium text-sm">Özellik</th>
                    <th className="py-4 px-4 text-slate-400 font-medium text-sm text-center">Rank Prompt</th>
                    <th className="py-4 px-4 text-slate-400 font-medium text-sm text-center">Peekaboo</th>
                    <th className="py-4 px-4 text-slate-400 font-medium text-sm text-center">Brand24</th>
                    <th className="py-4 px-4 font-bold text-sm text-center">
                      <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Tracora</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Motor Sayısı", "6", "5", "9", "10+"],
                    ["Slack Bildirimi", "✗", "✗", "✗", "✓"],
                    ["Teams Bildirimi", "✗", "✗", "✗", "✓"],
                    ["HubSpot", "✗", "✗", "✗", "✓"],
                    ["Salesforce", "✗", "✗", "✗", "✓"],
                    ["Grok İzleme", "✗", "✗", "✗", "✓"],
                    ["DeepSeek İzleme", "✗", "✗", "✗", "✓"],
                    ["İçerik Önerileri", "✗", "✗", "✗", "✓"],
                    ["Rakip Spike Alarmı", "✗", "✗", "✗", "✓"],
                    ["White-label", "✗", "✗", "$799+", "$399'dan"],
                  ].map(([feat, r1, r2, r3, lumio]) => (
                    <tr key={feat} className="border-b border-white/5 hover:bg-white/2">
                      <td className="py-3.5 px-6 text-slate-300 text-sm">{feat}</td>
                      {[r1, r2, r3].map((val, i) => (
                        <td key={i} className="py-3.5 px-4 text-center text-sm">
                          <span className={val === "✗" ? "text-red-500" : "text-slate-300"}>
                            {val}
                          </span>
                        </td>
                      ))}
                      <td className="py-3.5 px-4 text-center text-sm">
                        <span className={lumio === "✓" ? "text-emerald-400 font-bold text-base" : "text-emerald-400 font-semibold text-xs"}>
                          {lumio}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FİYATLANDIRMA ───────────── */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-badge mb-6">Fiyatlandırma</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Her Ölçekteki İşletme İçin
            </h2>
            <p className="text-slate-400">
              Ücretsiz başla, işin büyüdükçe planını yükselt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-indigo-600/20 to-cyan-600/10 border border-indigo-500/40"
                    : "gradient-border"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm">{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                  <p className="text-slate-500 text-xs mt-1">Yıllık ödemede 2 ay bedava</p>
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
                    plan.highlight
                      ? "btn-primary"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  Erken Erişim Al
                </ScrollButton>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-6 gradient-border p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg">Enterprise</h3>
              <p className="text-slate-400 text-sm mt-1">
                SSO, SOC2 uyumluluğu, SLA garantisi, özel AI motor ekleme ve dedicated destek.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-black text-2xl">$999+</span>
              <ScrollButton className="btn-primary text-sm px-6 py-3 whitespace-nowrap">
                Teklif Al
              </ScrollButton>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── SSS ───────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Sık Sorulan Sorular</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="gradient-border p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SON CTA ───────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="orb" style={{width:300,height:300,background:"rgba(99,102,241,0.12)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",position:"absolute",pointerEvents:"none"}} />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 relative">
            AI Çağında{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Görünür Ol.
            </span>
          </h2>
          <p className="text-slate-400 mb-8 text-lg relative">
            Rakibiniz şu an AI'da öne geçiyor. Ölçmeden büyütemezsiniz.
          </p>
          <div className="w-full max-w-lg mx-auto relative" id="waitlist-bottom">
            <WaitlistForm />
            <p className="text-slate-500 text-sm mt-3">
              Ücretsiz başla. İlk 100 kullanıcıya{" "}
              <span className="text-indigo-400">%40 ömür boyu indirim.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
            <span className="text-white font-bold">Tracora</span>
          </div>
          <p className="text-slate-600 text-sm">© 2026 Tracora. Track Your AI Presence.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Gizlilik</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Kullanım Şartları</a>
            <a href="mailto:hello@tracora.ai" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
