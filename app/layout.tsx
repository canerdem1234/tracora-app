import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tracora — AI'da Markanız Ne Kadar Görünür?",
  description:
    "ChatGPT, Perplexity, Gemini, Claude, Grok ve 10+ AI motorunda marka görünürlüğünüzü izleyin, rakiplerinizle kıyaslayın ve büyütün.",
  keywords: [
    "AI brand tracking",
    "GEO monitoring",
    "AI search visibility",
    "brand monitoring AI",
    "ChatGPT brand tracking",
    "Perplexity visibility",
  ],
  openGraph: {
    title: "Tracora — Track Your AI Presence",
    description:
      "10+ AI motorunda marka görünürlüğünüzü izleyin ve rakiplerinizi geçin.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
