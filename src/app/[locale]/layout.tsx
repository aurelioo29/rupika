import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import "@/app/brand-colors.css";
import ThemeRegistry from "@/components/theme-registry";
import { routing } from "@/i18n/routing";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rupika",
    template: "%s | Rupika",
  },
  description:
    "A web-based personal finance application for tracking income, expenses, wallets, budgets, and financial reports.",
  applicationName: "Rupika",
  keywords: [
    "Rupika",
    "personal finance",
    "expense tracker",
    "budget tracker",
    "wallet tracker",
    "finance dashboard",
  ],
  authors: [{ name: "Rupika" }],
  creator: "Rupika",
  publisher: "Rupika",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rupika",
    title: "Rupika — Track. Understand. Grow.",
    description:
      "Track income, expenses, wallets, budgets, and personal finance reports in one clean dashboard.",
    images: [
      {
        url: "/og/rupika-og-image.png",
        width: 1200,
        height: 630,
        alt: "Rupika personal finance dashboard",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rupika — Track. Understand. Grow.",
    description:
      "Track income, expenses, wallets, budgets, and personal finance reports in one clean dashboard.",
    images: ["/og/rupika-og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
