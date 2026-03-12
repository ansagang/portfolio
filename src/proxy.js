import { NextResponse } from "next/server";
import { isDev } from "./lib/utils";

const BASE_URL = 'https://www.angsar-aben.kz'
const SUPPORTED_LANGS = ['en', 'ru', 'kz']

export async function proxy(request) {
  const dev = isDev();
  const { pathname } = request.nextUrl

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
  }

  const langCookie = request.cookies.get("lang")?.value
  const acceptLanguage = request.headers.get("accept-language")
  const headerLang = acceptLanguage ? acceptLanguage.split(",")[0].split("-")[0] : 'en'
  const detectedLang = (SUPPORTED_LANGS.includes(langCookie) ? langCookie : null)
    ?? (SUPPORTED_LANGS.includes(headerLang) ? headerLang : 'en')

  const response = NextResponse.next()

  if (!langCookie) {
    response.cookies.set("lang", detectedLang)
  }

  // Dynamic serving signals for search engines
  const pageUrl = `${BASE_URL}${pathname}`
  response.headers.set('Content-Language', detectedLang)
  response.headers.set(
    'Link',
    [...SUPPORTED_LANGS.map(l => `<${pageUrl}>; rel="alternate"; hreflang="${l}"`),
      `<${pageUrl}>; rel="alternate"; hreflang="x-default"`].join(', ')
  )

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
