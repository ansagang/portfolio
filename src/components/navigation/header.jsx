"use client"

import Image from "next/image"
import Button from "@/components/ui/button"
import NavLink from "@/components/ui/nav-link"
import Link from "next/link"
import { languages } from "@/config/languages"
import { languageDecode } from "@/lib/utils"
import DownloadLink from "@/components/ui/download-link"
import useScrollPosition from "@/hooks/use-scroll-position"
import { useEffect, useState } from "react"

export default function Header({ language }) {
    // const pathname = usePathname()

    const [active, isActive] = useState(false)
    // const [option, setOption] = useState(language)
    // const [isPending, startTransition] = useTransition()

    // const notification = responseHandler()

    // useEffect(() => {
    //     isActive(false)
    // }, [pathname])

    const scroll = useScrollPosition()

    useEffect(() => {
        if (scroll.scrollY !== 0){
            isActive(true)
        }

        return () => {
            isActive(false)
        }
    }, [scroll.scrollY])

    // async function setActiveOption(option) {
    //     try {
    //         startTransition(async () => {
    //             if (user) {
    //                 const res = await updateLanguage({ locale: option.code })
    //                 if (res) {
    //                     const newLanguage = await languageDefiner({ locale: option.code })
    //                     notification({ message: res.message, type: res.success ? "success" : "error", language: newLanguage })
    //                 }
    //             } else {
    //                 const res = await updateLanguage({ locale: language.lang })
    //                 if (res) {
    //                     notification({ message: res.message, type: res.success ? "success" : "error", language: language })
    //                 }
    //             }
    //         })
    //     } catch (err) {
    //         notification({ message: err.message, type: "error", language: language })
    //     }
    // }
    return (
        <>
            <header className={active ? "header active" : "header"}>
                <div className="container__fluid">
                    <div className="header__inner">
                        <nav className="header__nav">
                            <Link href={'/'} className="header__nav-logo"><span>{language.app.meta.title}</span></Link>
                            <ol className="header__nav-ol links">
                                <li className="header__nav-li">
                                    <NavLink exact={true} href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                                </li>
                                <li className="header__nav-li">
                                    <NavLink href={'/portfolio'}><span>{language.app.pages.portfolio.meta.title}</span></NavLink>
                                </li>
                                <li className="header__nav-li">
                                    <NavLink href={'/blog'}><span>{language.app.pages.blog.meta.title}</span></NavLink>
                                </li>
                                <li className="header__nav-li">
                                    <NavLink href={'/contact'}><span>{language.app.pages.contact.meta.title}</span></NavLink>
                                </li>
                            </ol>
                        </nav>
                        <nav className="header__nav">
                            <ol className="header__nav-ol links">
                                <li className="header__nav-li">
                                    <DownloadLink file={language.app.files.cv}><span>{language.app.labels.downloadCV}</span></DownloadLink>
                                </li>
                                <li className="header__nav-li">
                                    <NavLink href={'/about'}><span>{language.app.labels.requestProject}</span></NavLink>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </header >
            {/* <div className={active ? 'menu active' : 'menu'}>
                <div className="menu__inner">
                    <nav className="menu__nav">
                        <ol className="menu__nav-ol links">
                            <div className="menu__nav-li">
                                <Select text={language.app.buttons.selectLanguage} activeOption={languageDecode(user?.lang)} setActiveOption={updateLanguage} options={languages} />
                            </div>
                            <li className="menu__nav-li">
                                <NavLink exact={true} href={'/'}><span>{language.app.pages.main.meta.title}</span></NavLink>
                            </li>
                            <li className="menu__nav-li">
                                <NavLink href={'/diabetes'}><span>{language.app.pages.diabetes.meta.title}</span></NavLink>
                            </li>
                            <li className="menu__nav-li">
                                <NavLink href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                            </li>
                            <li className="menu__nav-li">
                                {
                                    user ?
                                        (
                                            <NavLink href={'/account'}><span>{language.app.pages.account.meta.title}</span></NavLink>
                                        )
                                        :
                                        (
                                            <NavLink href={'/login'}><span>{language.app.pages.login.meta.title}</span></NavLink>
                                        )
                                }
                            </li>
                        </ol>
                    </nav>
                </div>
            </div > */}
        </>
    )
}