import { NextResponse } from "next/server";
import { isDev } from "./lib/utils";
import { languages_codes } from "./config/languages";

const CRAWLABLE_PATHS = ["/sitemap.xml", "/robots.txt"];

export async function proxy(request) {
  const dev = isDev();
  const { pathname } = request.nextUrl;

  if (CRAWLABLE_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const langCookie = request.cookies.get("lang")?.value;
  const acceptLanguage = request.headers.get("accept-language");
  const headerLang = acceptLanguage
    ? acceptLanguage.split(",")[0].split("-")[0]
    : "en";
  const detectedLang =
    (languages_codes.includes(langCookie) ? langCookie : null) ??
    (languages_codes.includes(headerLang) ? headerLang : "en");

  const response = NextResponse.next();

  if (!langCookie) {
    response.cookies.set("lang", detectedLang);
  }

  const matchedLang = languages_codes.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  const isBot = /bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot/i.test(
    request.headers.get("user-agent") || "",
  );

  if (pathname.startsWith("/api")) {
    const api_key = request.headers.get("x-api-key");
    if (!dev) {
      if (api_key !== process.env.API_KEY) {
        return NextResponse.json({
          success: false,
          message: "Invalid api key",
        });
      } else {
        return NextResponse.next();
      }
    }
  } else {
    if (matchedLang) {
      if (!isBot && matchedLang !== detectedLang) {
        const rest = pathname.slice(`/${matchedLang}`.length) || "/";
        const redirect = NextResponse.redirect(
          new URL(`/${detectedLang}${rest}`, request.url),
        );
        if (!langCookie) redirect.cookies.set("lang", detectedLang);
        return redirect;
      } else {
        return NextResponse.next();
      }
    } else {
      const redirect = NextResponse.redirect(
        new URL(`/${detectedLang}${pathname === "/" ? "" : pathname}`, request.url),
      );
      if (!langCookie) redirect.cookies.set("lang", detectedLang);
      return redirect;
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)",
  ],
};
