import { cookies, headers } from "next/headers"
import languageDefiner from "./language-definer"

export async function getLanguage({ locale }) {
    const headersList = headers()
    const headerLanguage = headersList.get("accept-language").split(",")[0].split("-")[0]
    const cookiesList = cookies()
    const lang = cookiesList.get("lang") ? cookiesList.get("lang").value : headerLanguage

    const language = await languageDefiner({locale: locale, headerLanguage: lang})

    return language
}