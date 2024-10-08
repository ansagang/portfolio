"use client"

import { Icons } from "@/config/icons";

import useInView from "@/hooks/use-in-view"
import Button from "../ui/button";
import ContactBanner from "../ui/contact-banner";

export default function Contact({ language }) {

    const [bannerRef, inView] = useInView(false)


    return (
        <section className="block">
            <div className="container__fluid">
                <div className="block__inner inner">
                    <div className="block__heading">
                        <div className="block__heading-title title">
                            <h2>{language.app.pages.contact.meta.title}</h2>
                        </div>
                    </div>
                    <div className="block__content">
                        <ContactBanner language={language} ref={bannerRef} className={inView ? "block__content-banner active": "block__content-banner active"} />
                    </div>
                </div>
            </div>
        </section>
    )
}