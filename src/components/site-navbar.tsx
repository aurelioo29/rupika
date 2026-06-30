import { getTranslations } from "next-intl/server";

import LanguageSwitcher from "@/components/language-switcher";
import { Link } from "@/i18n/navigation";

export default async function SiteNavbar() {
  const t = await getTranslations("Nav");

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#050507]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center bg-[#6c63ff] text-sm font-bold text-white">
            R
          </div>

          <span className="text-sm font-bold tracking-wide text-white">
            Rupika
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            {t("features")}
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            {t("pricing")}
          </a>

          <a
            href="#faq"
            className="text-sm font-medium text-white/60 transition hover:text-white"
          >
            {t("faq")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Link
            href="/login"
            className="hidden text-sm font-semibold text-white/70 transition hover:text-white sm:block"
          >
            {t("login")}
          </Link>

          <Link
            href="/register"
            className="bg-[#6c63ff] px-4 py-2 text-sm font-bold text-white shadow-[0_0_30px_rgba(108,99,255,0.35)] transition hover:bg-[#7a73ff]"
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </header>
  );
}
