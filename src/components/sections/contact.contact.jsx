"use client"

import { useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import { getIcon } from "@/lib/utils"
import { socials } from "@/config/socials"
import Link from "next/link"
import Image from "next/image"
import responseHandler from "@/lib/response-handler"

export default function Contact({ language }) {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const notification = responseHandler()

    return (
        <section className="contact">
            <div className="container">
                <div className="contact__inner inner">
                    <div className="contact__content">
                        <div className="contact__title title">
                            <h2>{language.app.pages.contact.sections.contact.title}</h2>
                        </div>
                        <div className="contact__info info">
                            <p>{language.app.pages.contact.sections.contact.info}</p>
                        </div>
                    </div>
                    <div className="contact__container">
                        <form action="" className="contact__form">
                            <div className="contact__form-inputs">
                                <div className="contact__form-input">
                                    <label>{language.app.labels.firstName}</label>
                                    <Input value={firstname} placeholder={language.app.labels.firstNamePlaceholder} type={'text'} />
                                </div>
                                <div className="contact__form-input">
                                    <label>{language.app.labels.lastName}</label>
                                    <Input value={lastname} placeholder={language.app.labels.lastNamePlaceholder} type={'text'} />
                                </div>
                            </div>
                            <div className="contact__form-input">
                                <label>{language.app.labels.email}</label>
                                <Input value={email} placeholder={language.app.labels.emailPlaceholder} type={'email'} />
                            </div>
                            <div className="contact__form-input">
                                <label>{language.app.labels.message}</label>
                                <textarea placeholder={language.app.labels.messagePlaceholder} value={message} />
                            </div>
                            <Button form={true} className={'contact__form-button'} type={'primary'}>Send</Button>
                        </form>
                        <div className="contact__social">
                            <div className="contact__social-links">
                                {
                                    socials ?
                                        socials.length !== 0 ?
                                            socials.map((social) => (
                                                social.link.startsWith('http') ?
                                                    (

                                                        <Link title={social.title} className="contact__social-link" href={social.link}>
                                                            <Image width={1} height={1} unoptimized src={social.logo} />
                                                        </Link>
                                                    )
                                                    :
                                                    (

                                                        <div onClick={() => {
                                                            navigator.clipboard.writeText(social.link)
                                                            notification({message: language.res.linkCopied, language: language})
                                                        }} title={social.title} className="contact__social-link">
                                                            <Image width={1} height={1} unoptimized src={social.logo} />
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
                    </div>
                </div>
            </div>
        </section>
    )
}