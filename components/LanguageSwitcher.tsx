"use client";

import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "tr", name: "Türkçe", path: "/" },
  { code: "en", name: "English", path: "/en" },
  { code: "es", name: "Español", path: "/es" },
  { code: "pt", name: "Português", path: "/pt" },
  { code: "fr", name: "Français", path: "/fr" },
  { code: "de", name: "Deutsch", path: "/de" },
  { code: "ar", name: "العربية", path: "/ar" },
  { code: "ja", name: "日本語", path: "/ja" },
  { code: "zh", name: "中文", path: "/zh" },
  { code: "hi", name: "हिंदी", path: "/hi" },
];

export default function LanguageSwitcher({ currentLocale = "tr" }: { currentLocale?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
        aria-label="Change language"
      >
        <span>🌐</span>
        <span className="uppercase font-medium">{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 bg-[#13131a] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
          {LANGUAGES.map((lang) => (
            <a
              key={lang.code}
              href={lang.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                lang.code === currentLocale
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-300"
              }`}
            >
              <span className="uppercase text-xs font-bold text-slate-500 w-6">{lang.code}</span>
              <span>{lang.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
