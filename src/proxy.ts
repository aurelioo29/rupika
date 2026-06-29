import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const publicPages = ["/", "/login", "/register"];

function getLocaleFromPathname(pathname: string) {
  const segments = pathname.split("/");
  const locale = segments[1];

  if ((routing.locales as readonly string[]).includes(locale)) {
    return locale;
  }

  return null;
}

function getPathnameWithoutLocale(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname;
  }

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

  return pathnameWithoutLocale || "/";
}

function getRedirectPath(locale: string, pathname: string) {
  if (locale === routing.defaultLocale) {
    return pathname;
  }

  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const locale = getLocaleFromPathname(pathname) ?? routing.defaultLocale;

  const isLoggedIn = !!request.auth;
  const isPublicPage = publicPages.includes(pathnameWithoutLocale);

  // Belum login, tapi akses halaman private
  if (!isLoggedIn && !isPublicPage) {
    const loginPath = getRedirectPath(locale, "/login");
    const loginUrl = new URL(loginPath, request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Sudah login, tapi akses login/register
  if (isLoggedIn && ["/login", "/register"].includes(pathnameWithoutLocale)) {
    const dashboardPath = getRedirectPath(locale, "/dashboard");

    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return handleI18nRouting(request);
});

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
