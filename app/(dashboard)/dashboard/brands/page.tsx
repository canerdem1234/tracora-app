"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { brandSchema } from "@/lib/validations";

interface Brand {
  id: string;
  name: string;
  keywords: string[];
  is_active: boolean;
  created_at: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [name, setName] = useState("");
  const [keywordsRaw, setKeywordsRaw] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("brands")
      .select("id, name, keywords, is_active, created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    setBrands(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBrands(); }, [fetchBrands]);

  function openAdd() {
    setEditingBrand(null);
    setName("");
    setKeywordsRaw("");
    setFormError("");
    setShowForm(true);
  }

  function openEdit(brand: Brand) {
    setEditingBrand(brand);
    setName(brand.name);
    setKeywordsRaw(brand.keywords.join(", "));
    setFormError("");
    setShowForm(true);
  }

  async function handleSave() {
    setFormError("");
    const keywords = keywordsRaw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    const parsed = brandSchema.safeParse({ name, keywords });
    if (!parsed.success) {
      setFormError(parsed.error.issues[0].message);
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (editingBrand) {
        const { error } = await supabase
          .from("brands")
          .update({ name: parsed.data.name, keywords: parsed.data.keywords })
          .eq("id", editingBrand.id)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("brands")
          .insert({ user_id: user.id, name: parsed.data.name, keywords: parsed.data.keywords });
        if (error) throw error;
      }

      setShowForm(false);
      await fetchBrands();
    } catch {
      setFormError("Kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu markayı silmek istediğinizden emin misiniz?")) return;
    setDeletingId(id);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("brands")
        .update({ is_active: false })
        .eq("id", id)
        .eq("user_id", user.id);
      await fetchBrands();
    }
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Markalar</h1>
          <p className="text-slate-400 mt-1 text-sm">AI motorlarında takip etmek istediğiniz markaları ekleyin</p>
        </div>
        <button
          onClick={openAdd}
          className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Marka Ekle
        </button>
      </div>

      {/* Marka listesi */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 text-sm mt-3">Yükleniyor...</p>
        </div>
      ) : brands.length === 0 ? (
        <div className="text-center py-20 bg-white/3 border border-white/5 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <p className="text-white font-medium">Henüz marka eklenmedi</p>
          <p className="text-slate-400 text-sm mt-1">AI motorlarında takip etmek istediğiniz ilk markayı ekleyin</p>
          <button onClick={openAdd} className="btn-primary px-6 py-2.5 text-sm mt-5">
            İlk Markayı Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {brand.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{brand.name}</p>
                    <p className="text-slate-500 text-xs">
                      {new Date(brand.created_at).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(brand)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    title="Düzenle"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    disabled={deletingId === brand.id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                    title="Sil"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {brand.keywords.slice(0, 5).map((kw) => (
                  <span
                    key={kw}
                    className="text-xs bg-white/5 text-slate-400 px-2 py-0.5 rounded-md"
                  >
                    {kw}
                  </span>
                ))}
                {brand.keywords.length > 5 && (
                  <span className="text-xs text-slate-600 px-2 py-0.5">
                    +{brand.keywords.length - 5} daha
                  </span>
                )}
              </div>

              <a
                href="/dashboard/queries"
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-indigo-500/30 text-indigo-400 text-sm hover:bg-indigo-500/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Sorgu Çalıştır
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-lg">
                {editingBrand ? "Markayı Düzenle" : "Yeni Marka Ekle"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">
                  Marka Adı <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="örn. Apple, Tesla, Şirket Adı"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1.5">
                  Anahtar Kelimeler <span className="text-red-400">*</span>
                  <span className="text-slate-500 font-normal ml-1">(virgülle ayırın, max 10)</span>
                </label>
                <textarea
                  value={keywordsRaw}
                  onChange={(e) => setKeywordsRaw(e.target.value)}
                  placeholder="örn. apple, iphone, macbook, ios, apple watch"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                />
                <p className="text-slate-600 text-xs mt-1">
                  {keywordsRaw.split(",").filter((k) => k.trim()).length} / 10 anahtar kelime
                </p>
              </div>

              {formError && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Kaydediliyor..." : editingBrand ? "Güncelle" : "Ekle"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
