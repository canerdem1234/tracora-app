"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import type { Metadata } from "next";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Mesaj gönderilemedi. Lütfen doğrudan hello@tracora.ai adresine yazın.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-300">
      <header className="border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={30} />
            <span className="text-white font-bold text-lg">Tracora</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">İletişim</h1>
          <p className="text-slate-400">Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşın.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sol: İletişim bilgileri */}
          <div className="space-y-6">
            <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white font-medium text-sm mb-1">E-posta</p>
              <p className="text-slate-400 text-sm">hello@tracora.ai</p>
              <p className="text-slate-500 text-xs mt-1">Destek: support@tracora.ai</p>
            </div>

            <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white font-medium text-sm mb-1">Yanıt Süresi</p>
              <p className="text-slate-400 text-sm">Genellikle 24 saat içinde</p>
              <p className="text-slate-500 text-xs mt-1">Hafta içi 09:00–18:00</p>
            </div>

            <div className="bg-white/3 border border-white/5 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-white font-medium text-sm mb-1">Güvenlik</p>
              <p className="text-slate-400 text-sm">security@tracora.ai</p>
              <p className="text-slate-500 text-xs mt-1">Güvenlik açıkları için</p>
            </div>
          </div>

          {/* Sağ: Form */}
          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-white font-bold text-xl mb-2">Mesajınız İletildi</h2>
                <p className="text-slate-400 text-sm">En kısa sürede size dönüş yapacağız.</p>
                <button
                  onClick={() => { setSent(false); setName(""); setEmail(""); setSubject(""); setMessage(""); }}
                  className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/3 border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">Ad Soyad <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız"
                      maxLength={100}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">E-posta <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@email.com"
                      maxLength={254}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">Konu</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm appearance-none"
                  >
                    <option value="" className="bg-[#111118]">Konu seçin</option>
                    <option value="Genel Soru" className="bg-[#111118]">Genel Soru</option>
                    <option value="Teknik Destek" className="bg-[#111118]">Teknik Destek</option>
                    <option value="Fiyatlandırma" className="bg-[#111118]">Fiyatlandırma</option>
                    <option value="Enterprise Plan" className="bg-[#111118]">Enterprise Plan</option>
                    <option value="Ortaklık" className="bg-[#111118]">Ortaklık / İş Birliği</option>
                    <option value="Diğer" className="bg-[#111118]">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">Mesaj <span className="text-red-400">*</span></label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    maxLength={2000}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
                  />
                  <p className="text-slate-600 text-xs mt-1 text-right">{message.length} / 2000</p>
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
