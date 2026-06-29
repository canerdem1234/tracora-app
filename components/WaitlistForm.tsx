"use client";

import { useState } from "react";

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Harika! Erken erişim listendesin. Yakında haber vereceğiz.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Bir hata oluştu, tekrar dene.");
      }
    } catch {
      setStatus("error");
      setMessage("Bağlantı hatası. Lütfen tekrar dene.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-3">🎉</div>
        <p className="text-emerald-400 font-semibold text-lg">{message}</p>
        <p className="text-slate-400 text-sm mt-2">
          İlk 100 kullanıcıya özel indirim uygulanacak.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "flex gap-2" : "flex flex-col sm:flex-row gap-3"}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-posta adresiniz"
        required
        className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors ${compact ? "py-2.5 text-sm" : "py-3.5"}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary whitespace-nowrap"
      >
        {status === "loading" ? "Ekleniyor..." : "Erken Erişim Al"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2 w-full">{message}</p>
      )}
    </form>
  );
}
