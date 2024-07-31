"use client"

import { Icons } from "@/config/icons"
import { languages } from "@/config/languages"
import changeLanguage from "@/actions/actions"

export default function Translator({ language }) {
    return (
        <div className="translator">
            <div className="translator__options">
                <div className="translator__option">
                    {
                        languages.map((lang) => (
                            <span onClick={() => changeLanguage({lang: lang.code})} className={language.lang === lang.code ? "active" : null}>{lang.title_short}</span>
                        ))
                    }
                </div>
            </div>
            <div className="translator__icon">
                <Icons.translate />
            </div>
        </div>
    )
}