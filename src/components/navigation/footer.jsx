import Image from "next/image"
import NavLink from "@/components/ui/nav-link"
import { slugify } from "@/lib/utils"
import { Suspense } from "react"
import Input from "../ui/input"

export default function Footer({ language }) {

    return (
        <footer className="footer">
            <div className="container__fluid">
                <div className="footer__inner">
                    <div className="footer__logo">
                        <div className="footer__logo-img">
                            <Image loading='lazy' height={1} width={1} unoptimized={true} title={'logo'} src={'/images/icon.ico'} alt={'logo'} />
                        </div>
                    </div>
                    <nav className="footer__nav">
                        <ol className="footer__nav-ol">
                            <li className="footer__nav-ol_title">
                                <p>{language.app.meta.title}</p>
                            </li>
                            <li className="footer__nav-li">
                                <span>{language.app.meta.description}</span>
                            </li>
                        </ol>
                        <ol className="footer__nav-ol">
                            <li className="footer__nav-ol_title">
                                <p>{language.app.labels.links}</p>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink exact={true} href={'/'}><span>{language.app.pages.home.meta.title}</span></NavLink>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink exact={true} href={'/about'}><span>{language.app.pages.about.meta.title}</span></NavLink>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink href={'/bins'}><span>{language.app.pages.bins.meta.title}</span></NavLink>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink href={'/blog'}><span>{language.app.pages.blog.meta.title}</span></NavLink>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink href={'/leaderboard'}><span>{language.app.pages.leaderboard.meta.title}</span></NavLink>
                            </li>
                        </ol>
                        <ol className="footer__nav-ol">
                            <li className="footer__nav-ol_title">
                                <p>{language.app.labels.socials}</p>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink href={'https://instagram.com/bin-go'}><span>{language.app.labels.instagram}</span></NavLink>
                            </li>
                            <li className="footer__nav-li">
                                <NavLink href={'tel:+77010999445'}><span>{language.app.labels.phone}</span></NavLink>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </footer>
    )
}