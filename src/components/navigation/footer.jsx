import Image from "next/image"
import NavLink from "@/components/ui/nav-link"
import { slugify } from "@/lib/utils"
import { Suspense } from "react"
import Input from "../ui/input"
import Link from "next/link"

export default function Footer({ language }) {

    return (
        <footer className="footer">
            <div className="container__fluid">
                <div className="footer__inner">
                    <div className="footer__upper">
                        <Link href={'/'} className="footer__logo"><span>{language.app.meta.title}</span></Link>
                        <nav className="footer__nav">
                            <ol className="footer__nav-ol links">
                                <li className="footer__nav-li">
                                    <NavLink exact={true} href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                                </li>
                                <li className="footer__nav-li">
                                    <NavLink href={'/projects'}><span>{language.app.pages.projects.meta.title}</span></NavLink>
                                </li>
                                {/* <li className="header__nav-li">
                                    <NavLink href={'/services'}><span>{language.app.pages.services.meta.title}</span></NavLink>
                                </li> */}
                                <li className="footer__nav-li">
                                    <NavLink href={'/blog'}><span>{language.app.pages.blog.meta.title}</span></NavLink>
                                </li>
                                <li className="footer__nav-li">
                                    <NavLink href={'/contact'}><span>{language.app.pages.contact.meta.title}</span></NavLink>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="footer__lower">
                        <div className="footer__copyright info">
                            <p>&#169; {new Date().getFullYear()} {language.app.meta.title}. All rights reserved.</p>
                        </div>
                        <div className="footer__details info">
                            <p>Some details</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}