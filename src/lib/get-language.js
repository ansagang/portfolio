"use server";

import { cookies, headers } from "next/headers";
import languageDefiner from "./language-definer";

export async function getLanguage({ locale }) {
  const headersList = await headers();

  const acceptLanguage = headersList
    .get("accept-language")
  if (acceptLanguage) {
    const headerLanguage = acceptLanguage.split(",")[0]
    .split("-")[0];
    const cookiesList = await cookies();
    const lang = cookiesList.get("lang")
      ? cookiesList.get("lang").value
      : headerLanguage;

    const language = await languageDefiner({
      locale: locale,
      headerLanguage: lang,
    });

    return language;
  } else {
    const language = await languageDefiner({
      locale: "en",
    });
    return language;
  }
}
