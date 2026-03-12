"use server";

import { cookies, headers } from "next/headers";
import languageDefiner from "./language-definer";

export async function getLanguage({ locale }) {
  const headersList = await headers();

  const acceptLanguage = headersList.get("accept-language")
  if (acceptLanguage) {
    const headerLanguage = acceptLanguage.split(",")[0].split("-")[0];
    const cookiesList = await cookies();
    const lang = cookiesList.get("lang")
      ? cookiesList.get("lang").value
      : headerLanguage;

    return languageDefiner({ locale: locale, headerLanguage: lang });
  } else {
    return languageDefiner({ locale: "en" });
  }
}
