const languages = {
    en: () => import('../config/lang/en.json').then((module) => module.default),
    ru: () => import('../config/lang/ru.json').then((module) => module.default),
    kz: () => import('../config/lang/kz.json').then((module) => module.default)
}

export default async function languageDefiner({ locale, headerLanguage }) {

    if (locale) {
        return languages[locale]()
    } else {
        return languages[headerLanguage]()
    }
}