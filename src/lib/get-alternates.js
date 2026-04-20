import { languages_codes, languages_og } from "@/config/languages"
import { BASE_URL } from "@/lib/base-url"

/**
 * @param {string} lang - current lang segment (e.g. 'en')
 * @param {string} [path] - path after lang (e.g. '/projects/my-slug'), defaults to ''
 */
export function getAlternates(lang, path = '') {
    const languages = Object.fromEntries(
        languages_codes.map(code => [code, `${BASE_URL}/${code}${path}`])
    )
    languages['x-default'] = `${BASE_URL}/en${path}`

    return {
        openGraph: {
            locale: languages_og[lang] || 'en_US',
        },
        alternates: {
            canonical: `${BASE_URL}/${lang}${path}`,
            languages,
        },
    }
}
