// import { NextResponse } from "next/server";
// import { isDev } from "./lib/utils";

// const BASE_URL = 'https://www.angsar-aben.kz'
// const SUPPORTED_LANGS = ['en', 'ru', 'kz']

// export async function proxy(request) {
//   const dev = isDev();
//   const { pathname } = request.nextUrl

//   if (pathname.startsWith("/api")) {
//     const api_key = request.headers.get("x-api-key");
//     if (!dev) {
//       if (api_key !== process.env.API_KEY) {
//         return NextResponse.json({
//           success: false,
//           message: "Invalid api key",
//         });
//       } else {
//         return NextResponse.next();
//       }
//     }
//   }

//   const langCookie = request.cookies.get("lang")?.value
//   const acceptLanguage = request.headers.get("accept-language")
//   const headerLang = acceptLanguage ? acceptLanguage.split(",")[0].split("-")[0] : 'en'
//   const detectedLang = (SUPPORTED_LANGS.includes(langCookie) ? langCookie : null)
//     ?? (SUPPORTED_LANGS.includes(headerLang) ? headerLang : 'en')

//   const response = NextResponse.next()

//   if (!langCookie) {
//     response.cookies.set("lang", detectedLang)
//   }

//   // Dynamic serving signals for search engines
//   const pageUrl = `${BASE_URL}${pathname}`
//   response.headers.set('Content-Language', detectedLang)
//   response.headers.set(
//     'Link',
//     [...SUPPORTED_LANGS.map(l => `<${pageUrl}>; rel="alternate"; hreflang="${l}"`),
//       `<${pageUrl}>; rel="alternate"; hreflang="x-default"`].join(', ')
//   )

//   return response
// }

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
//   ],
// };

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { isDev } from "./lib/utils";

export async function proxy(request) {
  const dev = isDev();

  if (request.nextUrl.pathname.startsWith("/api")) {
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

  const headersList = await headers();
  const acceptLanguage = headersList
      .get("accept-language")
  if (acceptLanguage) {
    const headerLanguage = acceptLanguage
      .split(",")[0]
      .split("-")[0];
    const response = NextResponse.next();

    const language = request.cookies.get("lang");

    if (!language) {
      response.cookies.set("lang", headerLanguage);
      return response;
    } else {
      return response;
    }
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};