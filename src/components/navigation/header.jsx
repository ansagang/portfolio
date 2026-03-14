"use client"

import NavLink from "@/components/ui/nav-link"
import DownloadLink from "@/components/ui/download-link"
import useScrollPosition from "@/hooks/use-scroll-position"
import { useEffect, useState, useCallback, useRef } from "react"
import useScrollMovement from "@/hooks/use-scroll-movement"
import Link from "next/link"

export default function Header({ language }) {

    const [active, isActive] = useState(false)
    const [sticky, setSticky] = useState(true)
    const [show, setShow] = useState(false)
    const [theme, setTheme] = useState("light") // "light" or "dark"
    const navRef = useRef(null)

    const scroll = useScrollPosition()

    useScrollMovement(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== sticky) setSticky(isShow)
        },
        [sticky]
    )

    // Detect if navbar overlaps a .black section
    const updateTheme = useCallback(() => {
        if (!navRef.current) return

        const navRect = navRef.current.getBoundingClientRect()
        const navCenter = navRect.top + navRect.height / 2

        const blackSections = document.querySelectorAll('.white')
        let onDark = false

        blackSections.forEach((section) => {
            const rect = section.getBoundingClientRect()
            if (rect.top <= navCenter && rect.bottom >= navCenter) {
                onDark = true
            }
        })

        setTheme(onDark ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        if (scroll.scrollY === 0) {
            isActive(false)
            setSticky(true)
        } else {
            isActive(true)
        }

        updateTheme()

        return () => {
            isActive(true)
        }
    }, [scroll, updateTheme])

    // Also update theme on resize
    useEffect(() => {
        window.addEventListener('resize', updateTheme, { passive: true })
        return () => window.removeEventListener('resize', updateTheme)
    }, [updateTheme])

    const headerClasses = [
        'header',
        sticky ? 'sticky' : '',
        active ? 'active' : '',
        theme === 'dark' ? 'header--dark' : 'header--light',
    ].filter(Boolean).join(' ')

    return (
        <>
            <header ref={navRef} className={headerClasses}>
                <div className="container__fluid">
                    <div className="header__inner">
                        <div className="header__nav">
                            <Link href={'/'} className="header__nav-logo link"><span>{language.app.meta.title}</span></Link>
                        </div>
                        <nav className="header__nav">
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
                            <div className="header__nav-link">
                                <DownloadLink download={'CV.pdf'} href={`/api/cv?lang=${language.lang}`}><span>{language.app.labels.downloadCV}</span></DownloadLink>
                            </div>
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
            </header>
            <div className={show ? 'menu active' : 'menu'}>
                <div className="menu__inner">
                    <nav className="menu__nav">
                        <ol className="menu__nav-ol links">
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
            </div>
        </>
    )
}
