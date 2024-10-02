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
import useScrollMovement from "@/hooks/use-scroll-movement"
import { usePathname } from "next/navigation"

export default function Header({ language }) {
    const pathname = usePathname()

    const [active, isActive] = useState(false)
    const [sticky, setSticky] = useState(true)
    // const [option, setOption] = useState(language)
    // const [isPending, startTransition] = useTransition()

    // const notification = responseHandler()

    const scroll = useScrollPosition()

    useScrollMovement(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== sticky) setSticky(isShow)
        },
        [sticky]
    )

    useEffect(() => {
        if (scroll.scrollY === 0) {
            setSticky(true)
        }
    }, [sticky])

    useEffect(() => {
        if (window.scrollY !== 0) {
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
            <header className={active ? (sticky ? "header sticky active" : "header active") : sticky ? "header sticky" : "header"}>
                <div className="container__fluid">
                    <div className="header__inner">
                        <nav className="header__nav">
                            <Link href={'/'} className="header__nav-logo link"><span>{language.app.meta.title}</span></Link>
                            <ol className="header__nav-ol links">
                                <li className="header__nav-li">
                                    <NavLink href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                                </li>
                                <li className="header__nav-li">
                                    <NavLink href={'/projects'}><span>{language.app.pages.projects.meta.title}</span></NavLink>
                                </li>
                                {/* <li className="header__nav-li">
                                    <NavLink href={'/services'}><span>{language.app.pages.services.meta.title}</span></NavLink>
                                </li> */}
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
                                    {/* <div className="link"><span>Available</span></div> */}
                                    <div className="header__nav-status white">
                                        <span>{language.app.global.available}</span>
                                    </div>
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