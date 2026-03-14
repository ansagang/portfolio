"use client"

import { Icons } from "@/config/icons"
import { languages } from "@/config/languages"
import changeLanguage from "@/actions/actions"
import { usePathname } from "next/navigation"

export default function Translator({ language }) {

    const pathname = usePathname()

    return (
        <div className="translator">
            <div className="translator__options">
                <div className="translator__option">
                    {
                        languages.map((lang, key) => (
                            <span key={key} onClick={() => {
                                const segments = pathname.split('/').slice(2).join('/')
                                const pathWithoutLang = segments ? `/${segments}` : '/'
                                changeLanguage({ lang: lang.code, path: pathWithoutLang })
                            }} className={language.lang === lang.code ? "active" : null}>{lang.title_short}</span>
                        ))
                    }
                </div>
            </div>
            <div className="translator__icon white">
                <Icons.translate />
            </div>
        </div>
    )
}
