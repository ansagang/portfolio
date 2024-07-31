import { cookies } from "next/headers"
import languageDefiner from "./language-definer"

export async function getLanguage({ locale }) {
    const cookiesList = cookies()
    const lang = cookiesList.get("lang")?.value

    const language = await languageDefiner({locale: locale, headerLanguage: lang})

    return language
}