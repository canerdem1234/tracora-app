"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Brand {
  id: string;
  name: string;
  keywords: string[];
}

interface QueryResult {
  id: string;
  ai_engine: string;
  prompt: string;
  status: string;
  created_at: string;
  brands: { name: string } | null;
  results: {
    ai_response: string;
    brand_mentioned: boolean;
    mention_count: number;
    sentiment: string;
  }[];
}

const AI_ENGINES = [
  { id: "chatgpt", label: "ChatGPT", color: "from-emerald-500 to-teal-500" },
  { id: "perplexity", label: "Perplexity", color: "from-indigo-500 to-blue-500" },
  { id: "gemini", label: "Gemini", color: "from-blue-500 to-cyan-500" },
  { id: "claude", label: "Claude", color: "from-orange-500 to-amber-500" },
  { id: "grok", label: "Grok", color: "from-slate-500 to-zinc-500" },
];

const SENTIMENT_LABEL: Record<string, { label: string; cls: string }> = {
  positive: { label: "Olumlu", cls: "bg-emerald-500/20 text-emerald-400" },
  neutral:  { label: "Nötr",   cls: "bg-slate-500/20 text-slate-400" },
  negative: { label: "Olumsuz",cls: "bg-red-500/20 text-red-400" },
};

export default function QueriesPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [pastQueries, setPastQueries] = useState<QueryResult[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("chatgpt");
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastResult, setLastResult] = useState<QueryResult | null>(null);

  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [{ data: brandData }, { data: queryData }] = await Promise.all([
      supabase
        .from("brands")
        .select("id, name, keywords")
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
      supabase
        .from("queries")
        .select("id, ai_engine, prompt, status, created_at, brands(name), results(ai_response, brand_mentioned, mention_count, sentiment)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    setBrands(brandData ?? []);
    setPastQueries((queryData as unknown as QueryResult[]) ?? []);
    if (brandData && brandData.length > 0 && !selectedBrand) {
      setSelectedBrand(brandData[0].id);
    }
    setLoadingData(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleRunQuery() {
    setFormError("");
    if (!selectedBrand) { setFormError("Bir marka seçin."); return; }
    if (!prompt.trim()) { setFormError("Sorgu metni girin."); return; }
    if (prompt.trim().length > 500) { setFormError("Sorgu en fazla 500 karakter olabilir."); return; }

    setRunning(true);
    setLastResult(null);
    try {
      const res = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandId: selectedBrand, aiEngine: selectedEngine, prompt: prompt.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Sorgu başarısız oldu.");
        return;
      }
      await fetchData();
      setPrompt("");
      const fresh = pastQueries.find((q) => q.id === data.queryId);
      setLastResult(fresh ?? null);
    } catch {
      setFormError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setRunning(false);
    }
  }

  const selectedBrandObj = brands.find((b) => b.id === selectedBrand);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AI Sorgular</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Seçtiğiniz marka için AI motorlarında görünürlük analizi yapın
        </p>
      </div>

      {/* Sorgu formu */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-5">Yeni Sorgu</h2>

        {loadingData ? (
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            Yükleniyor...
          </div>
        ) : brands.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400 text-sm">Henüz marka eklemediniz.</p>
            <a
              href="/dashboard/brands"
              className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Marka eklemek için tıklayın →
            </a>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Marka seçimi */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Marka</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm appearance-none cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b.id} value={b.id} className="bg-[#111118]">
                    {b.name}
                  </option>
                ))}
              </select>
              {selectedBrandObj && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedBrandObj.keywords.slice(0, 6).map((kw) => (
                    <span key={kw} className="text-xs bg-white/5 text-slate-500 px-2 py-0.5 rounded-md">
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* AI Motor seçimi */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">AI Motoru</label>
              <div className="flex flex-wrap gap-2">
                {AI_ENGINES.map((engine) => (
                  <button
                    key={engine.id}
                    onClick={() => setSelectedEngine(engine.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedEngine === engine.id
                        ? `bg-gradient-to-r ${engine.color} text-white shadow-lg`
                        : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/8 border border-white/5"
                    }`}
                  >
                    {engine.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Sorgu
                <span className="text-slate-500 font-normal ml-1">(bir kullanıcı gibi soru sorun)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="örn. En iyi elektrikli araba markası hangisi? / Hangi CRM yazılımını öneririm? / E-ticaret için en iyi platform?"
                rows={3}
                maxLength={500}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
              />
              <p className="text-slate-600 text-xs mt-1 text-right">{prompt.length} / 500</p>
            </div>

            {formError && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                {formError}
              </p>
            )}

            <button
              onClick={handleRunQuery}
              disabled={running}
              className="btn-primary px-6 py-3 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {running ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analiz ediliyor...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Sorguyu Çalıştır
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Son Sonuç */}
      {pastQueries.length > 0 && pastQueries[0].results?.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Son Analiz Sonucu
          </h2>
          {(() => {
            const q = pastQueries[0];
            const r = q.results[0];
            const eng = AI_ENGINES.find((e) => e.id === q.ai_engine);
            const sent = SENTIMENT_LABEL[r.sentiment] ?? SENTIMENT_LABEL.neutral;
            return (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`px-2.5 py-1 rounded-full font-medium bg-gradient-to-r ${eng?.color ?? "from-slate-500 to-slate-600"} text-white`}>
                    {eng?.label ?? q.ai_engine}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full ${sent.cls}`}>{sent.label}</span>
                  <span className={`px-2.5 py-1 rounded-full ${r.brand_mentioned ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                    {r.brand_mentioned ? `Marka geçti (${r.mention_count}x)` : "Marka geçmedi"}
                  </span>
                </div>
                <div className="bg-black/30 rounded-xl p-4 text-slate-300 text-sm leading-relaxed max-h-48 overflow-y-auto">
                  {r.ai_response}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Geçmiş Sorgular */}
      <div className="bg-white/3 border border-white/5 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-5">Sorgu Geçmişi</h2>
        {loadingData ? (
          <div className="text-slate-500 text-sm">Yükleniyor...</div>
        ) : pastQueries.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-6">Henüz sorgu yok.</p>
        ) : (
          <div className="space-y-3">
            {pastQueries.map((q) => {
              const r = q.results?.[0];
              const eng = AI_ENGINES.find((e) => e.id === q.ai_engine);
              const sent = r ? (SENTIMENT_LABEL[r.sentiment] ?? SENTIMENT_LABEL.neutral) : null;
              return (
                <div
                  key={q.id}
                  className="border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium bg-gradient-to-r ${eng?.color ?? "from-slate-500 to-slate-600"} text-white`}>
                          {eng?.label ?? q.ai_engine}
                        </span>
                        <span className="text-xs text-slate-500">{(q.brands as any)?.name}</span>
                        {sent && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${sent.cls}`}>
                            {sent.label}
                          </span>
                        )}
                        {r && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${r.brand_mentioned ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                            {r.brand_mentioned ? `${r.mention_count}x` : "Geçmedi"}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300 text-sm truncate">{q.prompt}</p>
                      {r && (
                        <p className="text-slate-500 text-xs mt-1 line-clamp-1">{r.ai_response}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-slate-500 text-xs">
                        {new Date(q.created_at).toLocaleDateString("tr-TR")}
                      </p>
                      <p className="text-slate-600 text-xs">
                        {new Date(q.created_at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
