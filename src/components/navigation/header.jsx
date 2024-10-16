"use client"

import NavLink from "@/components/ui/nav-link"
import Link from "next/link"
import DownloadLink from "@/components/ui/download-link"
import useScrollPosition from "@/hooks/use-scroll-position"
import { useEffect, useState } from "react"
import useScrollMovement from "@/hooks/use-scroll-movement"
import { usePathname } from "next/navigation"
import Chip from "../ui/chip"

export default function Header({ language, status }) {

    const [active, isActive] = useState(true)
    const [sticky, setSticky] = useState(true)
    const [show, setShow] = useState(false)

    const scroll = useScrollPosition()

    useScrollMovement(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== sticky) setSticky(isShow)
        },
        [sticky]
    )

    useEffect(() => {

        if (scroll.scrollY == 0) {
            isActive(false)
            setSticky(true)
        } else {
            isActive(true)
        }
    }, [scroll])

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
                                    {
                                        status ?
                                            <div className="header__nav-status white">{status.status}</div>
                                            :
                                            null
                                    }
                                </li>
                            </ol>
                            <div className="header__nav-menu">
                                <div className={show ? "header__nav-menu_icon active" : "header__nav-menu_icon"} onClick={() => setShow(!show)}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header >
            <div className={show ? 'menu active' : 'menu'}>
                <div className="menu__inner">
                    <nav className="menu__nav">
                        <ol className="menu__nav-ol links">
                            <li className="menu__nav-li">
                                {
                                    status ?
                                        <div className="header__nav-status white">{status.status}</div>
                                        :
                                        null
                                }
                            </li>
                            <li className="menu__nav-li">
                                <DownloadLink file={'/files/' + language.app.files.cv}><span>{language.app.labels.downloadCV}</span></DownloadLink>
                            </li>
                            <li className="menu__nav-li">
                                <NavLink onClick={() => setShow(false)} href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                            </li>
                            <li className="menu__nav-li">
                                <NavLink onClick={() => setShow(false)} href={'/projects'}><span>{language.app.pages.projects.meta.title}</span></NavLink>
                            </li>
                            <li className="menu__nav-li">
                                <NavLink onClick={() => setShow(false)} href={'/contact'}><span>{language.app.pages.contact.meta.title}</span></NavLink>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div >
        </>
    )
}