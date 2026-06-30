"use client";

import { useLocale } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center border border-white/10 bg-white/[0.03]">
      <Link
        href={pathname}
        locale="id"
        className={`px-3 py-1.5 text-xs font-semibold transition ${
          locale === "id"
            ? "bg-white text-black"
            : "text-white/60 hover:text-white"
        }`}
      >
        ID
      </Link>

      <Link
        href={pathname}
        locale="en"
        className={`px-3 py-1.5 text-xs font-semibold transition ${
          locale === "en"
            ? "bg-white text-black"
            : "text-white/60 hover:text-white"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
