import { notFound } from "next/navigation";

const LOCALES = ["en", "es", "pt", "fr", "de", "ar", "ja", "zh", "hi"];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  return <>{children}</>;
}
