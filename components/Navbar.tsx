"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Tracora
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Özellikler
          </a>
          <a
            href="#motors"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            AI Motorları
          </a>
          <a
            href="#pricing"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Fiyatlar
          </a>
        </div>

        {/* CTA */}
        <button
          onClick={scrollToWaitlist}
          className="btn-primary text-sm px-5 py-2.5"
        >
          Erken Erişim Al
        </button>
      </div>
    </nav>
  );
}
