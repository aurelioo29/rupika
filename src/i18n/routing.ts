import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",

  // ID jadi default tanpa prefix:
  // /login, /register, /dashboard
  //
  // EN pakai prefix:
  // /en/login, /en/register, /en/dashboard
  localePrefix: "as-needed",
});
