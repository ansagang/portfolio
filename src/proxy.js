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

  if (pathname.startsWith("/api")) {
    if (!dev && !pathname.startsWith("/api/cv")) {
      const api_key = request.headers.get("x-api-key");
      if (api_key !== process.env.API_KEY) {
        return NextResponse.json({ success: false, message: "Invalid api key" });
      }
    }
    return NextResponse.next();
  }

  const isBot = /bot|crawler|spider|googlebot|bingbot|slurp|duckduckbot/i.test(
    request.headers.get("user-agent") || ""
  );

  const urlLang = languages_codes.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  // URL has a valid locale — always serve directly, it is the source of truth
  // Bots: pass through as-is, no cookie touching
  // Users: sync cookie so future "/" redirects stay consistent
  if (urlLang) {
    if (isBot) return NextResponse.next();
    const langCookie = request.cookies.get("lang")?.value;
    if (langCookie !== urlLang) {
      const response = NextResponse.next();
      response.cookies.set("lang", urlLang);
      return response;
    }
    return NextResponse.next();
  }

  // URL has no locale — detect preferred language and redirect
  // Bots: always redirect to default "en", no cookie logic
  // Users: cookie → browser language → fallback "en"
  const langCookie = request.cookies.get("lang")?.value;
  const acceptLanguage = request.headers.get("accept-language");
  const browserLang = acceptLanguage?.split(",")[0].split("-")[0];

  const preferredLang = isBot
    ? "en"
    : (languages_codes.includes(langCookie) ? langCookie : null) ??
      (languages_codes.includes(browserLang) ? browserLang : "en");

  const rest = pathname === "/" ? "" : pathname;
  const redirect = NextResponse.redirect(new URL(`/${preferredLang}${rest}`, request.url));
  if (!isBot && !langCookie) redirect.cookies.set("lang", preferredLang);
  return redirect;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|xml|txt)$).*)",
  ],
};
