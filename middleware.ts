import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Basit in-memory rate limiter (production'da Upstash Redis kullanılacak)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

// Bellek sızıntısını önlemek için eski kayıtları temizle
function cleanupRateLimit() {
  const now = Date.now();
  for (const [key, entry] of rateLimit.entries()) {
    if (now > entry.resetAt) rateLimit.delete(key);
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Periyodik temizlik (her 100 istekte bir)
  if (Math.random() < 0.01) cleanupRateLimit();

  // API rate limiting
  if (pathname.startsWith("/api/")) {
    const allowed = checkRateLimit(`api:${ip}`, 100, 60_000); // 100 istek/dakika
    if (!allowed) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bekleyin." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  // Waitlist endpoint'i için sıkı limit
  if (pathname === "/api/waitlist") {
    const allowed = checkRateLimit(`waitlist:${ip}`, 5, 3_600_000); // 5 istek/saat
    if (!allowed) {
      return NextResponse.json(
        { error: "Çok fazla istek. 1 saat sonra tekrar deneyin." },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }
  }

  // Admin ve Dashboard rotaları için auth kontrolü
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Giriş yapmış kullanıcıları auth sayfalarından yönlendir
  if (pathname === "/login" || pathname === "/signup") {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const response = NextResponse.next();

  // Cookie'ler için güvenlik ayarları (production'da)
  if (process.env.NODE_ENV === "production") {
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
    "/signup",
    "/api/:path*",
  ],
};
