"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface NavLabels {
  features: string;
  motors: string;
  pricing: string;
  login: string;
  cta: string;
}

const TR_DEFAULT: NavLabels = {
  features: "Özellikler",
  motors: "AI Motorları",
  pricing: "Fiyatlar",
  login: "Giriş Yap",
  cta: "Erken Erişim Al",
};

interface NavbarProps {
  locale?: string;
  nav?: NavLabels;
}

export default function Navbar({ locale = "tr", nav = TR_DEFAULT }: NavbarProps) {
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
        <div className="flex items-center gap-2.5">
          <Logo size={34} />
          <span className="text-white font-bold text-xl tracking-tight">Tracora</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-400 hover:text-white text-sm transition-colors">
            {nav.features}
          </a>
          <a href="#motors" className="text-slate-400 hover:text-white text-sm transition-colors">
            {nav.motors}
          </a>
          <a href="#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">
            {nav.pricing}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <a href="/login" className="text-slate-400 hover:text-white text-sm transition-colors px-2">
            {nav.login}
          </a>
          <button onClick={scrollToWaitlist} className="btn-primary text-sm px-5 py-2.5">
            {nav.cta}
          </button>
        </div>
      </div>
    </nav>
  );
}
