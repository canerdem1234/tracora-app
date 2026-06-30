import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr", "es", "pt", "fr", "de", "ar", "ja", "zh", "hi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
