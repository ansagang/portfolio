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
