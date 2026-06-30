import { getTranslations } from "next-intl/server";

import SiteNavbar from "@/components/site-navbar";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("Home");

  const stats = [
    {
      label: t("income"),
      value: "Rp5.000.000",
    },
    {
      label: t("expense"),
      value: "Rp2.350.000",
    },
    {
      label: t("balance"),
      value: "Rp2.650.000",
    },
    {
      label: t("budget"),
      value: "68%",
    },
  ];

  const features = [
    {
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <SiteNavbar />

      <section className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#6c63ff]/20 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 border border-[#6c63ff]/40 bg-[#6c63ff]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#9d97ff]">
              {t("badge")}
            </div>

            <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-[-0.06em] text-white sm:text-5xl md:text-7xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="bg-[#6c63ff] px-7 py-3 text-sm font-bold text-white shadow-[0_0_40px_rgba(108,99,255,0.45)] transition hover:bg-[#7a73ff]"
              >
                {t("primaryButton")}
              </Link>

              <Link
                href="/login"
                className="border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                {t("secondaryButton")}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-4xl border border-white/10 bg-[#0c0c10] p-3 shadow-2xl">
            <div className="border border-white/10 bg-[#111116]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-3 rounded-full bg-red-500" />
                <span className="size-3 rounded-full bg-yellow-500" />
                <span className="size-3 rounded-full bg-green-500" />

                <div className="ml-4 flex-1 bg-white/[0.04] px-3 py-1 text-center text-xs text-white/35">
                  rupika.app/dashboard
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
                  <p className="text-sm text-white/50">
                    {t("previewSubtitle")}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {t("previewTitle")}
                  </h2>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="border border-white/10 bg-white/[0.03] p-4"
                      >
                        <p className="text-xs text-white/45">{item.label}</p>
                        <p className="mt-2 text-xl font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-bold">Transactions</p>
                    <p className="text-xs text-[#9d97ff]">This Month</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["Makanan", "-Rp45.000"],
                      ["Freelance", "+Rp1.500.000"],
                      ["Transport", "-Rp25.000"],
                      ["Hosting", "-Rp150.000"],
                    ].map(([name, amount]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <span className="text-sm text-white/70">{name}</span>
                        <span className="text-sm font-bold">{amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/10 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            {t("featuresTitle")}
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-6 flex size-10 items-center justify-center bg-[#6c63ff] text-sm font-bold">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-white/55">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
