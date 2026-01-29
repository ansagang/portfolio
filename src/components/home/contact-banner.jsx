"use client"

import Image from "next/image"
import Button from "./button"
import { useRouter } from "next/navigation"
import { Icons } from "@/config/icons"
import useInView from "@/hooks/use-in-view"

export default function ContactBanner({ language, ...props }) {

    const router = useRouter()
    const [bannerRef, bannerInView] = useInView(false)

    return (
        <div ref={bannerRef} className={bannerInView ? 'contact__banner active' : 'contact__banner'} {...props}>
            <div className="contact__banner-left">
                <div className="contact__banner-content">
                    <div className="contact__banner-title title">
                        <h2>{language.app.pages.contact.sections.banner.title}</h2>
                    </div>
                    <div className="contact__banner-info title">
                        <h4>{language.app.pages.contact.sections.banner.info}</h4>
                    </div>
                </div>
                <div className="contact__banner-buttons">
                    <Button onClick={() => router.push('/contact')} className={'contact__banner-button'} type="primary">{language.app.buttons.leaveRequest}<Icons.arrow /></Button>
                    <Button onClick={() => router.push('/about')} className={'contact__banner-button'} type="secondary">{language.app.buttons.moreAbout}</Button>
                </div>
            </div>
            <div className="contact__banner-visual">
                <Image width={1} height={1} unoptimized={true} src={'/images/contact-banner2.png'} />
            </div>
        </div>
    )
}