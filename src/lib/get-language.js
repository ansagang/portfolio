"use server";

import { cookies, headers } from "next/headers";
import languageDefiner from "./language-definer";
import { languages_codes } from "@/config/languages";

export async function getLanguage({ locale } = {}) {
  if (locale && languages_codes.includes(locale)) {
    return languageDefiner({ locale })
  }

  const cookiesList = await cookies()
  const cookieLang = cookiesList.get("lang")?.value
  if (cookieLang && languages_codes.includes(cookieLang)) {
    return languageDefiner({ locale: cookieLang })
  }

  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language")
  const headerLang = acceptLanguage?.split(",")[0].split("-")[0]

  return languageDefiner({ locale: languages_codes.includes(headerLang) ? headerLang : 'en' })
}
