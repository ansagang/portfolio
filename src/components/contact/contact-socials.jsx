"use client"

import { socials } from "@/config/socials"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

export default function ContactSocials({ language }) {

    return (
        <div className="contact__social">
            <div className="contact__social-links">
                {
                    socials ?
                        socials.length !== 0 ?
                            socials.map((social, k) => (
                                social.link.startsWith('http') ?
                                    (

                                        <Link key={k} title={social.title} className="contact__social-link" href={social.link}>
                                            <Image alt={social.title} width={1} height={1} unoptimized src={social.logo} />
                                        </Link>
                                    )
                                    :
                                    (

                                        <div key={k} onClick={() => {
                                            navigator.clipboard.writeText(social.link)
                                            toast(language.res.linkCopied, {
                                                icon: <Icons.success />
                                            })
                                        }} title={social.title} className="contact__social-link">
                                            <Image alt={social.title} width={1} height={1} unoptimized src={social.logo} />
                                        </div>
                                    )
                            ))
                            :
                            null
                        :
                        null
                }
            </div>
        </div>
    )
}